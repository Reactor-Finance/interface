import React, { ReactNode } from "react";

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
  return <h1 className={`font-medium text-2xl`}>{children}</h1>;
}
const Headers = {
  GradiantHeaderOne,
  InfoHeaderTwo,
};
export default Headers;
