"use client";
import Image from "next/image";
import React from "react";
import reactor from "@/assets/reactor.svg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CustomConnectButton } from "./customConnectButton";
import { useAccount } from "wagmi";
import { useAtom } from "jotai";
import { inviteCodeAtom } from "@/store";

export default function Header() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [inviteCode] = useAtom(inviteCodeAtom);
  return (
    <div className="h-[88px] px-8 items-center grid grid-cols-4">
      <button
        role="link"
        onClick={() => {
          if (inviteCode.length > 0) {
            router.push("/points");
          } else {
            router.push("/");
          }
        }}
      >
        <Image src={reactor} alt="" />
      </button>
      <div className="col-span-2">
        {isConnected && (
          <ul className="grid justify-center  grid-cols-3 place-items-center text-[14px]">
            <NavLink href="/swap">Swap</NavLink>
            {/* <NavLink href="/lock">Lock</NavLink> */}
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/liquidity">Liquidity</NavLink>
            {/* <NavLink href="/voting">Voting</NavLink> */}
            {/* <NavLink href="/uniswap">Faucet</NavLink> */}
          </ul>
        )}
      </div>
      <div className="flex justify-end">
        <CustomConnectButton />
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) {
  const path = usePathname();
  return (
    <li>
      <Link
        className='data-[active="active"]:text-white hover:text-white transition-colors text-neutral-500'
        data-active={path.includes(href) ? "active" : "inactive"}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
