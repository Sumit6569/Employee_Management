interface SummaryCardProps {
  title: string;
  value: number;
}

function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-xs transition-colors">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default SummaryCard;
