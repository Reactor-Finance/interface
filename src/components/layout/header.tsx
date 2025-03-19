"use client";
import Image from "next/image";
import React from "react";
import reactor from "@/assets/reactor.svg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CustomConnectButton } from "./customConnectButton";
import { useAccount } from "wagmi";
import usePointsAccount from "@/app/points/__hooks__/usePointsAccount";
import SideNav from "./sideNav";
export default function Header() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { data } = usePointsAccount();
  return (
    <div className="h-[88px] px-2 lg:px-8 items-center flex justify-between lg:grid grid-cols-4">
      <button
        className="hidden lg:block"
        role="link"
        onClick={() => {
          if (!data?.result.invitationCode) {
            router.push("/");
          } else {
            router.push("/swap");
          }
        }}
      >
        <Image src={reactor} alt="" />
      </button>
      <SideNav />

      <div className="col-span-2 hidden lg:block">
        {isConnected && (
          <ul className="grid justify-center  grid-cols-5 place-items-center text-[14px]">
            <NavLink href="/swap">Swap</NavLink>
            <NavLink href="/liquidity">Liquidity</NavLink>
            <NavLink href="/voting">Vote</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/points">Points</NavLink>
          </ul>
        )}
      </div>
      <div className="flex justify-end items-center gap-x-3">
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
