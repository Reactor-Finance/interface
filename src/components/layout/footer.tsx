import React from "react";
import Reactor from "@/assets/reactor.svg";
import Image from "next/image";
import PageMarginContainer from "../ui/pageMarginContainer";
import Link from "next/link";
export default function Footer() {
  return (
    <PageMarginContainer>
      <footer className="py-4">
        <div className="grid grid-cols-4">
          <div className="flex flex-col justify-between">
            <div>
              <Image alt="logo" src={Reactor} />
            </div>
            <div>
              <span className="text-[12px]">
                2024 © Reactor Finance. All rights reserved.
              </span>
            </div>
          </div>
          <div>
            <h4>Features</h4>
            <ul className="space-y-4 pt-6">
              <li>
                <Link href="">Trade</Link>
              </li>
              <li>
                <Link href="">Trade</Link>
              </li>
              <li>
                <Link href="">Trade</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Features</h4>
            <ul className="space-y-4 pt-6">
              <li>
                <Link href="">Trade</Link>
              </li>
              <li>
                <Link href="">Trade</Link>
              </li>
              <li>
                <Link href="">Trade</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </PageMarginContainer>
  );
}
