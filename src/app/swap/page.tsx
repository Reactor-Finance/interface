import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { TabsContent } from "@radix-ui/react-tabs";
import CurrenciesOverlapIcons from "@/components/shared/currenciesOverlapIcons";
import { ReactNode } from "react";
import { getLogoAsset } from "@/utils";
import { USDC_ADDRESS } from "@/data/constants";
import { LineChart } from "./lineChart";
import { Button } from "@/components/ui/button";
import CurrencyInputs from "./currencyInputs";
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
    <div className="min-h-screen px-4  font-geistMono pt-4 ">
      <div className=" gap-2 space-y-4">
        <Card className="p-4 items-center gap-x-4 flex">
          <div className="flex items-center gap-x-2 pr-6">
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
          <div className="flex-grow">
            <LineChart />

            <div className="pt-4"></div>
            <Card className="">
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
                    <table className="w-full">
                      <caption className="h-0 overflow-hidden">Test</caption>
                      <TransactionTableHeaders />
                      <tbody>
                        <TransactionTableRow />
                        <TransactionTableRow />
                        <TransactionTableRow />
                        <TransactionTableRow />
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
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
      </div>
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

function TransactionTableHeaders() {
  return (
    <thead>
      <tr className="grid grid-cols-13 p-4 w-full font-normal text-neutral-600 text-sm">
        <th className="col-span-2 text-left">Date</th>
        <th className="col-span-2 text-left">Transaction id</th>
        <th className="col-span-2 text-left">Wallet</th>
        <th className="text-left">Side</th>
        <th>Type</th>
        <th>Price</th>
        <th>Value</th>
        <th>ETH</th>
        <th>USDC</th>
        <th>TXN</th>
      </tr>
    </thead>
  );
}
function TransactionTableRow() {
  return (
    <tr className="grid grid-cols-13 items-center text-sm py-2 px-4 text-center">
      <td className="col-span-2 text-left text-neutral-100">
        Dec 26 03:52:59 PM
      </td>
      <td className="col-span-2 text-left text-neutral-200">
        0x35f013528x8721…
      </td>
      <td className="col-span-2 text-left text-neutral-200">0x5ffb6…22e1</td>
      <td className="text-success-400 text-left">Buy</td>
      <td className="text-success-400">Market</td>
      <td className="text-error-400">0.0180</td>
      <td className="text-neutral-300"> $3,400.00</td>

      <td className="flex gap-x-1 items-center justify-center">
        <Image
          width={20}
          height={20}
          className="h-5 w-5"
          src={getLogoAsset(USDC_ADDRESS)}
          alt="USDC"
        />
        0.1
      </td>
      <td className="flex gap-x-1 items-center justify-center">
        <Image
          width={20}
          height={20}
          className="h-5 w-5"
          src={getLogoAsset(USDC_ADDRESS)}
          alt="USDC"
        />
        134.01
      </td>
      <td>^</td>
    </tr>
  );
}
