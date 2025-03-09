import DisplayFormattedNumber from "@/components/shared/displayFormattedNumber";
import { formatNumber } from "@/lib/utils";

export function StatRow({
  title,
  isLoading,
  value,
  formatNum,
}: {
  isLoading?: boolean;
  formatNum?: boolean;
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
        <span className="text-white">
          {!formatNum ? (
            value
          ) : (
            <DisplayFormattedNumber num={formatNumber(value, 5)} />
          )}
        </span>
      )}
    </div>
  );
}
