import { Button } from "@/components/ui/button";
import { inviteCodeAtom } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";

export default function PointsAccess() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [selected, setSelected] = useState(0);
  const [isFilled, setIsFilled] = useState(false);
  // hook that checks if all pin are filled
  useEffect(() => {
    if (pin.every((p) => p !== "")) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [pin]);
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      if (pin[index] === "") {
        setSelected(index - 1);
      }
    }
  };
  const [inviteCode, setInviteCode] = useAtom(inviteCodeAtom);
  const router = useRouter();
  useEffect(() => {
    if (inviteCode.length > 0) {
      router.push("/points");
    }
  }, [inviteCode, router]);
  const { address } = useAccount();
  const { mutateAsync } = useMutation({
    mutationFn: async (inviteCode: string) => {
      const payload = {
        inviteCode,
        address,
      };
      fetch("api/users/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return;
    },
  });
  const handleSubmit = () => {
    if (isFilled) {
      setInviteCode(pin.join(""));
      mutateAsync(pin.join("")).then(() => {
        router.push("/points");
      });
    } else {
      router.push("/points");
    }
  };
  return (
    inviteCode.length === 0 && (
      <div className="flex flex-col text-center mb-[88px] gap-y-4 w-[384px]">
        <h1 className="text-[32px] leading-[40px] text-primary-400">
          REACTOR EARLY ACCESS
        </h1>
        <p className="text-neutral-400 text-sm">
          [It’s opsional] Enter your invite code to access the platform and
          Increase your early airdrop by 10%
        </p>
        <div className="grid py-2 grid-cols-6 gap-x-3">
          {pin.map((_, i) => (
            <PinInput
              setSelection={setSelected}
              onKeyDown={(e) => handleKeyDown(e, i)}
              index={i}
              selected={selected}
              value={pin[i]}
              onChange={(e) => {
                if (e !== "") {
                  setSelected(i + 1);
                }
                if (e.length > 1) return;
                setPin((prev) => {
                  const newArr = [...prev];
                  newArr[i] = e;
                  return newArr;
                });
              }}
              key={i}
            />
          ))}
        </div>
        <Button
          onClick={handleSubmit}
          className="py-4"
          size="md"
          variant={"primary"}
        >
          {isFilled ? "Continue" : "Skip"}
        </Button>
        <div className="pt-6 text-sm flex flex-col space-y-2">
          <span>Already registered?</span>
          <button className="text-primary-400">Log in with your wallet.</button>
        </div>
      </div>
    )
  );
}
interface PinInputProps {
  value: string;
  setSelection: (index: number) => void;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  selected: number;
  index: number;
}
const PinInput = ({
  index,
  value,
  onKeyDown,
  setSelection,
  onChange,
  selected,
}: PinInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  console.log(selected);

  useEffect(() => {
    if (selected === index) {
      ref.current?.focus();
    }
  }, [index, selected]);
  return (
    <div className="rounded-lg p-2 focus-within:ring ring-primary-400 border border-neutral-400">
      <input
        onFocus={() => setSelection(index)}
        onKeyDown={onKeyDown}
        ref={ref}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type="text"
        className=" text-center w-[24px] no-ring border-b-2 border-neutral-800 focus:ring-0 text-[30px] bg-transparent"
        value={value}
      />
    </div>
  );
};
PinInput.displayName = "input";
