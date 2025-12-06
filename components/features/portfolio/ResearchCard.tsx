import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ResearchFrontmatter } from '@/types/content';

interface ResearchCardProps {
  article: ResearchFrontmatter;
}

export default function ResearchCard({ article }: ResearchCardProps) {
  return (
    <Link href={`/research/${article.slug}`}>
      <Card className="group h-full transition-all hover:border-zinc-400 hover:shadow-md dark:hover:border-zinc-600">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{article.readingTime} min read</span>
          </div>
          <CardTitle className="line-clamp-2 text-lg leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="mb-4 line-clamp-3">
            {article.summary}
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

