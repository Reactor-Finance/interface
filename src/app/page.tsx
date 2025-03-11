"use client";
import bg from "@/assets/bg-img.png";
import { Button } from "@/components/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useAccount } from "wagmi";
import PointsAccess from "./points/__components__/pointsAccess";
export default function Page() {
  const { isConnected } = useAccount();
  return (
    <div className="min-h-[calc(100vh-88px)] flex items-center relative justify-center">
      <div className="absolute left-0 w-full -z-10 h-full flex justify-center items-center">
        <Image className="w-full" src={bg} alt="bg" />
      </div>
      {isConnected && <PointsAccess />}
      {!isConnected && <ConnectView />}
    </div>
  );
}
function ConnectView() {
  const { openConnectModal } = useConnectModal();
  return (
    <>
      <div className="flex flex-col mb-[88px] items-center gap-y-4 z-10">
        <h1 className="text-[36px] leading-[40px]">Connect your wallet</h1>
        <p className="text-neutral-400">Log In to check your ranks</p>
        <Button
          size="md"
          onClick={() => {
            openConnectModal?.();
          }}
          variant={"primary"}
        >
          Connect your wallet
        </Button>
      </div>
    </>
  );
}
