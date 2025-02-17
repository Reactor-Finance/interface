"use client";
import Image from "next/image";
import React from "react";
import reactor from "@/assets/reactor.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CustomConnectButton } from "./customConnectButton";
export default function Header() {
  return (
    <div className="h-[88px] px-4 items-center grid grid-cols-3">
      <div>
        <Image src={reactor} alt="" />
      </div>
      <div>
        <ul className="grid justify-center grid-cols-4 place-items-center text-[14px]">
          <NavLink href="/swap">Swap</NavLink>
          <NavLink href="/lock">Lock</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/liquidity">Liquidity</NavLink>
        </ul>
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
