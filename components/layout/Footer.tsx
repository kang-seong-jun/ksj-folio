export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Seong-Jun Kang, PhD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

