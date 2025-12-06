'use client';

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article
      className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:mt-8 prose-h2:text-xl prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

