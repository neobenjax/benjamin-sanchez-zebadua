import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentType = "posts" | "pages" | "articles";

export interface ContentInfo {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags?: string[];
  type?: ContentType | "insight" | "story" | "page";
  contentType: ContentType;
}

export interface ContentData {
  frontMatter: ContentInfo;
  content: string;
}

function getContentDir(contentType: ContentType): string {
  return path.join(process.cwd(), "content", contentType);
}

function ensureDirectory(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Gets sorted metadata for entries in a specific content directory (posts, pages, or articles).
 */
export function getSortedContentByType(contentType: ContentType = "posts"): ContentInfo[] {
  const dir = getContentDir(contentType);
  ensureDirectory(dir);

  const fileNames = fs.readdirSync(dir);

  const allData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(dir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || "Untitled",
        date: matterResult.data.date ? `${matterResult.data.date}T00:00:00` : new Date().toISOString(),
        description: matterResult.data.description || "",
        category: matterResult.data.category || "General",
        tags: matterResult.data.tags || [],
        type: matterResult.data.type || contentType,
        contentType,
      };
    });

  return allData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Reads a single content entry by contentType and slug.
 */
export function getContentData(contentType: ContentType, slug: string): ContentData | null {
  try {
    const dir = getContentDir(contentType);
    const fullPath = path.join(dir, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      frontMatter: {
        slug,
        title: matterResult.data.title || "Untitled",
        date: matterResult.data.date ? `${matterResult.data.date}T00:00:00` : new Date().toISOString(),
        description: matterResult.data.description || "",
        category: matterResult.data.category || "General",
        tags: matterResult.data.tags || [],
        type: matterResult.data.type || contentType,
        contentType,
      },
      content: matterResult.content,
    };
  } catch {
    return null;
  }
}

/**
 * Backward-compatible helper for getSortedPostsData
 */
export function getSortedPostsData(excludeStories: boolean = false): ContentInfo[] {
  const posts = getSortedContentByType("posts");
  if (excludeStories) {
    return posts.filter((p) => p.type !== "story");
  }
  return posts;
}

/**
 * Backward-compatible helper searching across posts, pages, and articles for a slug.
 */
export function getPostData(slug: string): ContentData | null {
  const types: ContentType[] = ["posts", "articles", "pages"];
  for (const type of types) {
    const res = getContentData(type, slug);
    if (res) return res;
  }
  return null;
}
