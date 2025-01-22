import SearchTokensDailog from "./dex/searchTokensDialog";
import Toggle from "@/components/ui/toggle";

export default function Home() {
  return (
    <div className="min-h-screen w-screen font-geistMono ">
      <SearchTokensDailog />
      <div className="flex items-center justify-between">
        <Toggle className="" label="Label" isDisabled={false} />
        <Toggle className="" label="Disabled_Label" isDisabled={true} />
        <Toggle className="" label="Label" isDisabled={false} />
        <Toggle className="" isDisabled={true} />
      </div>
    </div>
  );
}
