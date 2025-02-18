import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import CurrencyInputs from "./currencyInputs";
export default function Home() {
  return (
    <div className="min-h-screen px-4  font-geistMono pt-4 ">
      <Card className="min-w-[380px] p-4 border rounded-md">
        <Tabs defaultValue="swap">
          <TabsList size="md" colors="muted" display={"grow"}>
            <TabsTrigger display={"grow"} value="swap">
              Swap
            </TabsTrigger>
            <TabsTrigger display={"grow"} value="twap">
              TWAP
            </TabsTrigger>
            <TabsTrigger display={"grow"} value="limit">
              Limit
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="pt-4"></div>

        <CurrencyInputs />
        <div className="pt-4"></div>
        <Button className="w-full" size="md" variant="primary">
          Connect Wallet
        </Button>
      </Card>
    </div>
  );
}
function Card({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div className={"border-neutral-700  border rounded-md " + className}>
      {children}
    </div>
  );
}
