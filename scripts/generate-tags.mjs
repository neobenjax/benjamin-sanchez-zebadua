import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectories = [
  path.join(process.cwd(), "content", "posts"),
  path.join(process.cwd(), "content", "pages"),
  path.join(process.cwd(), "content", "articles"),
];
const dataDirectory = path.join(process.cwd(), "src", "data");

function generateTags() {
  const tagMap = new Map();

  contentDirectories.forEach((dir) => {
    if (!fs.existsSync(dir)) return;
    const fileNames = fs.readdirSync(dir);

    fileNames.forEach((fileName) => {
      if (fileName.endsWith(".md")) {
        const fullPath = path.join(dir, fileName);
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
