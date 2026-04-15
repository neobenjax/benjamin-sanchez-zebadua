import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostInfo {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export interface PostContent {
  frontMatter: PostInfo;
  content: string;
}

/**
 * Ensures the content/posts directory exists to prevent crashes if it hasn't been created yet.
 */
function ensureDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

/**
 * Gets a sorted list of all posts (front-matter only).
 */
export function getSortedPostsData(): PostInfo[] {
  ensureDirectory();
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || "Untitled",
        date: matterResult.data.date ? `${matterResult.data.date}T00:00:00` : new Date().toISOString(),
        description: matterResult.data.description || "",
        category: matterResult.data.category || "General",
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Gets the static post data and content by slug.
 */
export function getPostData(slug: string): PostContent | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      frontMatter: {
        slug,
        title: matterResult.data.title || "Untitled",
        date: matterResult.data.date ? `${matterResult.data.date}T00:00:00` : new Date().toISOString(),
        description: matterResult.data.description || "",
        category: matterResult.data.category || "General",
      },
      content: matterResult.content,
    };
  } catch {
    return null; /* Return null safely to trigger a 404 block for missing markdown */
  }
}
