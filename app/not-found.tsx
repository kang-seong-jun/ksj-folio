import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h1 className="mb-2 text-6xl font-bold text-zinc-900 dark:text-zinc-100">404</h1>
      <h2 className="mb-4 text-xl font-medium text-zinc-600 dark:text-zinc-400">
        Page Not Found
      </h2>
      <p className="mb-8 text-center text-zinc-500 dark:text-zinc-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}

