import PoolHeader from "@/components/shared/poolHeader";
import { TableRow } from "@/components/ui/table";
import { TPoolType } from "@/lib/types";
import React, { useMemo, useState } from "react";
import { useVoteProvider } from "./voteProvider";
import { inputPatternMatch } from "@/lib/utils";
interface Props {
  id: string;
}
export default function VoteRow({ id }: Props) {
  const [value, setValue] = useState("");
  const { setVote, totalPercent } = useVoteProvider();
  const percentLeft = useMemo(() => {
    const valuePercent = isFinite(parseFloat(value)) ? parseFloat(value) : 0;
    return 100 - (totalPercent - valuePercent);
  }, [totalPercent, value]);
  const handleMaxClick = () => {
    setValue(`${percentLeft}`);
    setVote({ [id]: percentLeft });
  };
  return (
    <TableRow cols="10" className="z-10">
      <td className="col-span-3">
        <PoolHeader
          poolType={TPoolType.CONCENTRATED}
          token0={{
            symbol: "ETH",
            address: "0x123",
            decimals: 18,
            logoURI: "https://example.com",
            name: "Ethereum",
            chainId: 1,
          }}
          token1={{
            symbol: "ETH",
            address: "0x123",
            decimals: 18,
            logoURI: "https://example.com",
            name: "Ethereum",
            chainId: 1,
          }}
        />
      </td>
      <td className="text-right">{id}</td>
      <td>11.22%</td>
      <td>~43,279.55</td>
      <td>131331</td>
      <td>131331</td>
      <td>131331</td>
      <td>
        <div className="bg-neutral-800 justify-between rounded-md p-2 flex gap-x-2">
          <div className="flex gap-x-1">
            <input
              placeholder="0"
              value={value}
              onChange={(e) => {
                if (inputPatternMatch(e.target.value)) {
                  let newValue = "";
                  if (parseFloat(e.target.value) < 0) {
                    return;
                  }
                  if (parseFloat(e.target.value) > percentLeft) {
                    newValue = `${percentLeft}`;
                  } else {
                    newValue = e.target.value;
                  }
                  setValue(newValue);
                  if (isFinite(parseFloat(newValue))) {
                    setVote({ [id]: parseFloat(newValue) });
                  } else {
                    setVote({ [id]: 0 });
                  }
                }
              }}
              className="w-[30px] focus:ring-transparent transition-all  bg-transparent"
            />
            <span className="text-neutral-400">%</span>
          </div>
          <button
            onClick={handleMaxClick}
            className="text-primary-400 disabled:text-neutral-500"
          >
            Max
          </button>
        </div>
      </td>
    </TableRow>
  );
}
