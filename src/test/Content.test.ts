import { describe, it, expect } from 'vitest';
import { getSortedContentByType, getContentData } from '../lib/content';

describe('Content Engine & Multi-Directory Taxonomy', () => {
  it('loads posts from content/posts/ directory', () => {
    const posts = getSortedContentByType('posts');
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].contentType).toBe('posts');
  });

  it('loads pages from content/pages/ directory', () => {
    const pages = getSortedContentByType('pages');
    expect(pages.length).toBeGreaterThan(0);
    expect(pages.some((p) => p.slug === 'about-me')).toBe(true);
  });

  it('loads articles from content/articles/ directory', () => {
    const articles = getSortedContentByType('articles');
    expect(articles.length).toBeGreaterThan(0);
    expect(articles.some((a) => a.slug === 'cn-cycle-2025')).toBe(true);
  });

  it('fetches single entry data by slug', () => {
    const article = getContentData('articles', 'cn-cycle-2025');
    expect(article).not.toBeNull();
    expect(article?.frontMatter.title).toContain('CN Cycle for CHEO 2025');
    expect(article?.content).toContain('General Support');
  });
});
