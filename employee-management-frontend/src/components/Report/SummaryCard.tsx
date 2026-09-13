interface SummaryCardProps {
  title: string;
  value: number;
}

function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-xs transition-colors">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default SummaryCard;