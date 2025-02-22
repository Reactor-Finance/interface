import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { SwapProvider } from "./swapProvider";
import SwapCards from "./swapCards";
import Image from "next/image";
import bg from "@/assets/bg-img.png";
export default function Home() {
  return (
    <SwapProvider>
      <div className="w-full -z-10 absolute top-0 opacity-70">
        <Image src={bg} alt="bg" />
      </div>
      <div className="min-h-[85vh] px-4 font-geistMono pt-4">
        <div className="mx-auto w-[440px]">
          <div className="pb-4">
            <div className="py-2 flex justify-between">
              <h1 className="text-primary-400 text-[36px]">Trade</h1>
            </div>
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
          </div>
          <Card className="min-w-[380px] p-0 rounded-md">
            <SwapCards />
          </Card>
        </div>
      </div>
    </SwapProvider>
  );
}
