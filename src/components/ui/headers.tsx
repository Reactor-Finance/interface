import React, { ReactNode } from "react";
import Image from "next/image";
import questionMark from "@/assets/question-mark.svg";
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

function InfoHeaderTwo({ children }: { children: ReactNode }) {
  return (
    <h1 className={`flex items-center gap-x-2 font-medium text-2xl`}>
      <span>{children}</span>
      <Image src={questionMark} alt="question mark" />
    </h1>
  );
}
const Headers = {
  GradiantHeaderOne,
  InfoHeaderTwo,
};
export default Headers;
