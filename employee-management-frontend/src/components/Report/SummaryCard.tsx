interface SummaryCardProps {
  title: string;
  value: number;
}
function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

export default SummaryCard;