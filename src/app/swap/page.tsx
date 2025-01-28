import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchTokensDailog from "../dex/searchTokensDialog";
import { TabsContent } from "@radix-ui/react-tabs";
import CurrenciesOverlapIcons from "@/components/shared/currenciesOverlapIcons";
import { ReactNode } from "react";
function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <h4 className="text-neutral-300 text-sm">{title}</h4>
      <h4 className="text-neutral-100">{value}</h4>
    </div>
  );
}
export default function Home() {
  return (
    <div className="min-h-screen px-4 w-screen font-geistMono pt-4 ">
      <div className="mx-auto w-[1600px] gap-2 space-y-4">
        <Card className="p-4 items-center gap-x-4 flex">
          <div className="flex items-center gap-x-2">
            <CurrenciesOverlapIcons
              tokenOne={{
                alt: "",
                address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
              }}
              tokenTwo={{
                alt: "",
                address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
              }}
            />
            <h2 className="text-neutral-100">ETH/USDC</h2>
          </div>
          <div className="h-10 w-[2px] bg-neutral-700"></div>
          <Stat title="24hr High" value="3145.24" />
          <div className="h-10 w-[2px] bg-neutral-700"></div>
          <Stat title="24hr Low" value="3145.24" />
          <div className="h-10 w-[2px] bg-neutral-700"></div>
          <Stat title="TVL" value="3145.24" />
        </Card>
        <div className="flex gap-2">
          <Card className="flex-grow">
            <Tabs defaultValue="transaction">
              <TabsList colors="transparent">
                <TabsTrigger
                  className="rounded-b-none rounded-tr-none"
                  value="transaction"
                >
                  Transaction
                </TabsTrigger>
                <TabsTrigger className="rounded-none" value="limits">
                  Limits
                </TabsTrigger>
                <TabsTrigger className="rounded-none" value="liquidity">
                  Liquidity
                </TabsTrigger>
                <TabsTrigger className="rounded-none" value="info">
                  Info
                </TabsTrigger>
              </TabsList>
              <TabsContent value="transaction">
                <div className="border-t border-neutral-800">
                  <caption className="h-0 overflow-hidden">Test</caption>
                  <table className="w-full">
                    <thead className="grid grid-cols-12 p-4 w-full font-normal text-neutral-600 text-sm">
                      <th className="col-span-2 text-left">Date</th>
                      <th className="col-span-2 text-left">Transaction id</th>
                      <th>Wallet</th>
                      <th>Side</th>
                      <th>Type</th>
                      <th>Price</th>
                      <th>Value</th>
                      <th>ETH</th>
                      <th>USDC</th>
                      <th>TXN</th>
                    </thead>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          <div className="w-[400px] h-10 border-neutral-700 border rounded-md">
            <div className="border-b border-neutral-700"></div>
          </div>
        </div>
      </div>
      <SearchTokensDailog />
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
    <div
      className={
        "border-neutral-700 bg-neutral-950 border rounded-md " + className
      }
    >
      {children}
    </div>
  );
}
