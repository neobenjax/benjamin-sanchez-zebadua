import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const dataDirectory = path.join(process.cwd(), "src", "data");

function generateTags() {
  if (!fs.existsSync(postsDirectory)) return;

  const fileNames = fs.readdirSync(postsDirectory);
  const tagMap = new Map();

  fileNames.forEach((fileName) => {
    if (fileName.endsWith(".md") && /^\d{3}-/.test(fileName)) {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      const tags = matterResult.data.tags || [];
      tags.forEach((tag) => {
        const lowerTag = tag.toLowerCase();
        if (!tagMap.has(lowerTag)) {
          tagMap.set(lowerTag, tag);
        }
      });
    }
  });

  const uniqueTags = Array.from(tagMap.values()).sort((a, b) => a.localeCompare(b));

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  fs.writeFileSync(
    path.join(dataDirectory, "tags.json"),
    JSON.stringify(uniqueTags, null, 2)
  );

  console.log(`Generated ${uniqueTags.length} unique tags successfully.`);
}

generateTags();
