"use client";
import bg from "@/assets/bg-img.png";
import { Button } from "@/components/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useAccount } from "wagmi";
export default function Page() {
  const { isConnected } = useAccount();
  return (
    <div className="min-h-[calc(100vh-88px)] flex items-center relative justify-center">
      <div className="absolute left-0 w-full -z-10 h-full flex justify-center items-center">
        <Image className="w-full" src={bg} alt="bg" />
      </div>
      <div className="flex flex-col text-center mb-[88px] gap-y-4 w-[384px]">
        <h1 className="text-[32px] leading-[40px] text-primary-400">
          REACTOR EARLY ACCESS
        </h1>
        <p className="text-neutral-400 text-sm">
          [It’s opsional] Enter your invite code to access the platform and
          Increase your early airdrop by 10%
        </p>
        <div className="grid py-2 grid-cols-6 gap-x-3">
          <PinInput />
          <PinInput />
          <PinInput />
          <PinInput />
          <PinInput />
          <PinInput />
        </div>
        <Button className="py-4" size="md" variant={"primary"}>
          SKIP
        </Button>
        <div className="pt-6 text-sm flex flex-col space-y-2">
          <span>Already registered?</span>
          <button className="text-primary-400">Log in with your wallet.</button>
        </div>
      </div>
      {!isConnected && <ConnectView />}
    </div>
  );
}
function PinInput() {
  return (
    <div className="rounded-lg p-2 focus-within:ring ring-primary-400  border border-neutral-400">
      <input
        type="text"
        className="w-[24px] no-ring border-b-2 border-neutral-800 focus:ring-0 text-[30px] bg-transparent"
      />
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
