import { useEffect, useState } from "react";

export function useAtomicDate() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentDateTime(new Date()),
      1_000 * 20
    );
    return () => clearInterval(interval);
  }, []);
  return currentDateTime;
}
