import React, { ReactNode } from "react";
import Image from "next/image";
import questionMark from "@/assets/question-mark.svg";
import { HoverCard } from "./hoverCard";
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
function GradiantHeaderOne({
  colorOne,
  colorTwo,
  children,
}: {
  colorOne: string;
  colorTwo: string;
  children: ReactNode;
}) {
  return (
    <h1
      className={`bg-clip-text text-transparent text-5xl inline-block font-medium`}
      style={{
        backgroundImage: `linear-gradient(to right, ${colorOne}, ${colorTwo})`,
      }}
    >
      {children}
    </h1>
  );
}

function InfoHeaderTwo({
  children,
  popupContent,
}: {
  children: ReactNode;
  popupContent: ReactNode;
}) {
  return (
    <h1 className={`flex items-center gap-x-2 font-medium text-2xl`}>
      <span>{children}</span>

      <HoverCard openDelay={0} closeDelay={20}>
        <HoverCardTrigger>
          <Image src={questionMark} alt="question mark" />
        </HoverCardTrigger>
        <HoverCardContent side="top" alignOffset={10}>
          <div className="max-w-[200px] rounded-md text-sm bg-white px-2 py-2 text-gray-800">
            {popupContent}
          </div>

          <HoverCardArrow className="fill-white" height={15} width={14} />
        </HoverCardContent>
      </HoverCard>
    </h1>
  );
}
const Headers = {
  GradiantHeaderOne,
  InfoHeaderTwo,
};
export default Headers;
