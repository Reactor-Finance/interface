import { useMemo } from "react";

export default function DisplayFormattedNumber({ num }: { num: string }) {
  const { sig, exp } = useMemo(() => {
    if (num.includes("v")) {
      const split = num.split("v")[1];
      if (!split) return { sig: "0", exp: 0 };
      return { sig: split.slice(1, split.length), exp: split[0] };
    }
    return { sig: "0", exp: 0 };
  }, [num]);
  if (!num.includes("v")) {
    return num;
  }
  return (
    <>
      0.0
      <sub>{exp}</sub>
      {sig}
    </>
  );
}
