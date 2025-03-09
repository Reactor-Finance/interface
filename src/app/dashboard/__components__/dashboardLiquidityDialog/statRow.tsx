export function StatRow({
  title,
  isLoading,
  value,
}: {
  isLoading?: boolean;
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between  text-sm">
      <span className=" text-neutral-300">{title}</span>
      {isLoading ? (
        <div className="bg-neutral-700/70 rounded-md animate-pulse">
          <span className="text-transparent">hello</span>
        </div>
      ) : (
        <span className="text-white">{value}</span>
      )}
    </div>
  );
}
