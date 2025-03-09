import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import NewSwapView from "./__components__/newSwapView";

export default function Swap() {
  return (
    <div className="min-h-[85vh] px-4 font-geistMono pt-12">
      <div className="mx-auto w-[440px]">
        <div className="py-4">
          <div className="py-2 flex justify-between">
            <h1 className="text-primary-400 text-[44px]">Trade</h1>
            <div></div>
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
          {/* <SwapView /> */}
          <NewSwapView />
        </Card>
      </div>
    </div>
  );
}
