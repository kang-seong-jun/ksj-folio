import type { ResearchInterest } from '@/types/content';

interface ResearchInterestCardProps {
  interest: ResearchInterest;
  index: number;
}

export default function ResearchInterestCard({ interest, index }: ResearchInterestCardProps) {
  const icons = ['🧬', '🔬', '🧠', '💤', '🤖'];

  return (
    <div className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="mb-3 text-2xl">{icons[index % icons.length]}</div>
      <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
        {interest.title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {interest.description}
      </p>
    </div>
  );
}

