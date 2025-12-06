import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import type { ResearchArticle, ResearchFrontmatter } from '@/types/content';

const researchDirectory = path.join(process.cwd(), 'content/research');

export async function getResearchArticles(): Promise<ResearchFrontmatter[]> {
  if (!fs.existsSync(researchDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(researchDirectory);
  const allArticles = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(researchDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        title: data.title || '',
        author: data.author || '',
        date: data.date || '',
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        summary: data.summary || '',
        readingTime: data.readingTime || 5,
        slug: data.slug || fileName.replace(/\.md$/, ''),
        category: data.category || 'Research',
      } as ResearchFrontmatter;
    });

  // Sort by date (newest first)
  return allArticles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getResearchBySlug(slug: string): Promise<ResearchArticle | null> {
  if (!fs.existsSync(researchDirectory)) {
    return null;
  }

  const fileNames = fs.readdirSync(researchDirectory);

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;

    const fullPath = path.join(researchDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const articleSlug = data.slug || fileName.replace(/\.md$/, '');

    if (articleSlug === slug) {
      const processedContent = await remark()
        .use(gfm)
        .use(html)
        .process(content);

      return {
        title: data.title || '',
        author: data.author || '',
        date: data.date || '',
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        summary: data.summary || '',
        readingTime: data.readingTime || 5,
        slug: articleSlug,
        category: data.category || 'Research',
        content: processedContent.toString(),
      };
    }
  }

  return null;
}

export async function getAllResearchSlugs(): Promise<string[]> {
  if (!fs.existsSync(researchDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(researchDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(researchDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return data.slug || fileName.replace(/\.md$/, '');
    });
}

