import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import useRegister from "../__hooks__/useRegister";
import usePointsAccount from "../__hooks__/usePointsAccount";
import { useAccountModal } from "@rainbow-me/rainbowkit";

export default function PointsAccess() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [selected, setSelected] = useState(0);
  const [isFilled, setIsFilled] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  useEffect(() => {
    if (!code) return;
    if (code.length > 6) return;
    code
      ?.trim()
      .split("")
      .forEach((char, i) => {
        if (i <= 5) {
          setPin((prev) => {
            const newArr = [...prev];
            newArr[i] = char;
            return newArr;
          });
        }
      });
  }, [code]);

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
  const router = useRouter();
  const { data } = usePointsAccount();
  useEffect(() => {
    if (data?.result.invitationCode) {
      router.push("/swap");
    }
  }, [data?.result.invitationCode, router]);
  const { mutateAsync } = useRegister({ inviteCode: pin.join("") });
  const handleSubmit = () => {
    if (isFilled) {
      mutateAsync().then(() => {
        router.push("/swap");
      });
    } else {
      router.push("/swap");
    }
  };
  const { openAccountModal } = useAccountModal();
  return (
    !data?.result.invitationCode && (
      <div className="flex flex-col text-center mb-[88px] gap-y-4 w-[384px]">
        <h1 className="text-[32px] leading-[40px] text-primary-400">
          REACTOR EARLY ACCESS
        </h1>
        <p className="text-neutral-400 text-sm">
          [It’s optional] Enter your invite code to access the platform and
          Increase your early airdrop by 10%
        </p>
        <div className="grid py-2 grid-cols-6 gap-x-3">
          {pin.map((_, i) => (
            <PinInput
              setSelection={setSelected}
              onKeyDown={(e) => handleKeyDown(e, i)}
              index={i}
              onPaste={(e) => {
                console.log(e);
                e.clipboardData
                  .getData("text")
                  .trim()
                  .split("")

                  .forEach((char, i) => {
                    if (i <= 5) {
                      setPin((prev) => {
                        const newArr = [...prev];
                        newArr[i] = char;
                        return newArr;
                      });
                    }
                  });
              }}
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
          <button
            onClick={() => openAccountModal?.()}
            className=" text-[12px] lg:text-[16px] text-primary-400"
          >
            Log in with your wallet.
          </button>
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
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  selected: number;
  index: number;
}
const PinInput = ({
  index,
  value,
  onKeyDown,
  setSelection,
  onChange,
  onPaste,
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
        onPaste={onPaste}
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
