"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useAccount } from "wagmi";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import useRegister from "../__hooks__/useRegister";
import usePointsAccount from "../__hooks__/usePointsAccount";
import ImageWithFallback from "@/components/shared/imageWithFallback";

export default function PointsHeaders() {
  const [copied, setCopied] = useState(false);

  const { address } = useAccount();
  const { data } = usePointsAccount();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(data?.result?.invitationCode ?? "")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
      });
  };
  const [inviteCode, setInviteCode] = useState("");

  const { mutate, error } = useRegister({ inviteCode });
  const handleSubmit = () => {
    if (inviteCode.length !== 6 || !address) {
      return;
    }
    mutate();
  };
  return (
    <div className="mt-8 px-4 md:px-8 lg:px-16">
      <div className=" flex flex-col md:flex-row items-center gap-y-4 md:items-stretch justify-between md:space-x-4">
        <Card
          bg="1000"
          className="w-[300px] md:w-auto  rounded-lg p-6 flex-1 flex flex-col"
        >
          <div className="grid grid-cols-3 w-full  items-start">
            <div className="col-span-2 flex gap-x-4">
              <ImageWithFallback
                src="https://i.ibb.co/0pDryFGv/image.png"
                alt="Avatar"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex justify-center">
                <h3 className="text-white text-lg font-semibold self-center">
                  My Position
                </h3>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xl text-white font-bold">
                {data?.result.rank}
              </span>
              <span className="text-xs text-gray-400 uppercase">RANK</span>
            </div>
          </div>

          <div className="mt-auto w-full flex justify-between text-center pt-4">
            <div className="flex flex-col items-start ">
              <p className="text-xs text-gray-400 uppercase">BOOST</p>
              {/* <p className="text-[#836EF9] font-bold text-sm">x2.5</p> */}
              <p className=" font-bold text-sm">1x</p>
            </div>
            <div className="h-full w-[2px] bg-neutral-600"></div>
            <div className="flex flex-col items-center ">
              <p className="text-xs text-gray-400 uppercase">REFERRAL</p>
              <p className="text-white font-bold text-sm">
                {data?.result.countOfReferred}
              </p>
            </div>
            <div className="h-full w-[2px] bg-neutral-600"></div>
            <div className="flex flex-col items-end">
              <p className="text-xs text-gray-400 uppercase">TOTAL POINTS</p>
              <p className="text-white font-bold text-sm">
                {data?.result.totalPoints}
              </p>
            </div>
          </div>
        </Card>
        <WaysToEarn />
        <Card
          bg="1000"
          className="rounded-lg w-[300px] md:w-auto p-6 flex-1 flex flex-col"
        >
          <div className="flex items-center space-x-2 mb-2">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="text-gray-300"
            >
              <path
                d="M12 4.5c1.933 0 3.5 1.567 3.5 3.5S13.933 11.5 12 11.5 8.5 9.933 8.5 8s1.567-3.5 3.5-3.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 19.5c0-3.038 3.19-5.5 6.5-5.5s6.5 2.462 6.5 5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-white text-lg font-semibold uppercase">
              Invite Your Friends
            </h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            You earn <span className="text-[#836EF9]">10%</span> of the points
            your friends make.
          </p>
          {data?.result.invitationCode ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <span className="text-[24px] text-primary-400">
                  {data.result.invitationCode}
                </span>
                <button className="text-neutral-400" onClick={handleCopy}>
                  {!copied && <Copy size={16} />}
                  {copied && <Check className="text-success-400" size={16} />}
                </button>
              </div>
              <Button size={"md"} variant={"primary"}>
                Share on X
              </Button>
            </div>
          ) : (
            <>
              <div className="flex space-x-2 mt-auto">
                <Input
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Enter referral code"
                />
                {/* <input */}
                {/*   type="text" */}
                {/*   className="bg-[#303136] border border-[#333333] rounded-lg px-3 py-2 w-full focus:outline-none placeholder-gray-500 text-sm" */}
                {/* /> */}
                <button
                  onClick={handleSubmit}
                  className="bg-[#836EF9] text-white px-4 py-2 rounded-lg text-sm"
                >
                  Submit
                </button>
              </div>
              <span className="text-red-400 text-[12px] pt-1">
                {error ? "Invalid Code!" : ""}
              </span>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function WaysToEarn() {
  return (
    <Card
      bg="1000"
      className=" w-[300px] md:w-auto  rounded-lg p-6 flex-1 flex flex-col "
    >
      <h3 className="text-white font-semibold text-lg uppercase mb-2">
        Ways to Earn
      </h3>
      <ul className="list-none text-gray-300 space-y-2 text-sm">
        <li className="flex items-center space-x-2">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2054_47862)">
              <path
                opacity="0.2"
                d="M15.3333 8.25C15.3333 9.4925 13.0945 10.5 10.3333 10.5C9.10825 10.5 7.98575 10.3019 7.11638 9.9725C9.50575 9.80312 11.3333 8.875 11.3333 7.75V6.045C13.6158 6.25375 15.3333 7.16125 15.3333 8.25ZM11.3333 5.25C11.3333 4.0075 9.0945 3 6.33325 3C3.572 3 1.33325 4.0075 1.33325 5.25C1.33325 6.4925 3.572 7.5 6.33325 7.5C9.0945 7.5 11.3333 6.4925 11.3333 5.25Z"
                fill="#9FA4B1"
              />
              <path
                d="M11.8333 5.59812V5.25C11.8333 3.6825 9.46888 2.5 6.33325 2.5C3.19763 2.5 0.833252 3.6825 0.833252 5.25V7.75C0.833252 9.05562 2.47388 10.0931 4.83325 10.4038V10.75C4.83325 12.3175 7.19763 13.5 10.3333 13.5C13.4689 13.5 15.8333 12.3175 15.8333 10.75V8.25C15.8333 6.95625 14.2445 5.9175 11.8333 5.59812ZM14.8333 8.25C14.8333 9.07625 12.9089 10 10.3333 10C10.1001 10 9.86888 9.99188 9.64075 9.97688C10.9889 9.48563 11.8333 8.6875 11.8333 7.75V6.60875C13.7001 6.88687 14.8333 7.64188 14.8333 8.25ZM4.83325 9.39062V7.90375C5.33062 7.96851 5.83169 8.00066 6.33325 8C6.83482 8.00066 7.33589 7.96851 7.83325 7.90375V9.39062C7.33663 9.46399 6.83526 9.50055 6.33325 9.5C5.83124 9.50055 5.32987 9.46399 4.83325 9.39062ZM10.8333 6.87063V7.75C10.8333 8.27437 10.0576 8.8375 8.83325 9.17937V7.71875C9.64013 7.52313 10.3233 7.23187 10.8333 6.87063ZM6.33325 3.5C8.90888 3.5 10.8333 4.42375 10.8333 5.25C10.8333 6.07625 8.90888 7 6.33325 7C3.75763 7 1.83325 6.07625 1.83325 5.25C1.83325 4.42375 3.75763 3.5 6.33325 3.5ZM1.83325 7.75V6.87063C2.34325 7.23187 3.02638 7.52313 3.83325 7.71875V9.17937C2.60888 8.8375 1.83325 8.27437 1.83325 7.75ZM5.83325 10.75V10.4894C5.99763 10.4956 6.16388 10.5 6.33325 10.5C6.57575 10.5 6.81263 10.4919 7.04513 10.4781C7.30342 10.5706 7.56651 10.649 7.83325 10.7131V12.1794C6.60888 11.8375 5.83325 11.2744 5.83325 10.75ZM8.83325 12.3906V10.9C9.33045 10.9668 9.83158 11.0002 10.3333 11C10.8348 11.0007 11.3359 10.9685 11.8333 10.9038V12.3906C10.8386 12.5364 9.82794 12.5364 8.83325 12.3906ZM12.8333 12.1794V10.7188C13.6401 10.5231 14.3233 10.2319 14.8333 9.87062V10.75C14.8333 11.2744 14.0576 11.8375 12.8333 12.1794Z"
                fill="#9FA4B1"
              />
            </g>
            <defs>
              <clipPath id="clip0_2054_47862">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0.333252)"
                />
              </clipPath>
            </defs>
          </svg>

          <span>Trade</span>
        </li>
        <li className="flex items-center space-x-2">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.93335 7.19922C5.93335 6.77487 6.10192 6.36791 6.40198 6.06785C6.70204 5.76779 7.109 5.59922 7.53335 5.59922C7.9577 5.59922 8.36466 5.76779 8.66472 6.06785C8.96478 6.36791 9.13335 6.77487 9.13335 7.19922C9.13335 7.62357 8.96478 8.03053 8.66472 8.33059C8.36466 8.63065 7.9577 8.79922 7.53335 8.79922C7.109 8.79922 6.70204 8.63065 6.40198 8.33059C6.10192 8.03053 5.93335 7.62357 5.93335 7.19922ZM7.53335 6.39922C7.32118 6.39922 7.11769 6.4835 6.96766 6.63353C6.81764 6.78356 6.73335 6.98705 6.73335 7.19922C6.73335 7.41139 6.81764 7.61487 6.96766 7.7649C7.11769 7.91493 7.32118 7.99922 7.53335 7.99922C7.74552 7.99922 7.94901 7.91493 8.09903 7.7649C8.24906 7.61487 8.33335 7.41139 8.33335 7.19922C8.33335 6.98705 8.24906 6.78356 8.09903 6.63353C7.94901 6.4835 7.74552 6.39922 7.53335 6.39922ZM3.13335 3.19922C2.81509 3.19922 2.50987 3.32565 2.28482 3.55069C2.05978 3.77573 1.93335 4.08096 1.93335 4.39922V9.99922C1.93335 10.3175 2.05978 10.6227 2.28482 10.8477C2.50987 11.0728 2.81509 11.1992 3.13335 11.1992H7.55095C7.57538 10.9285 7.62493 10.6607 7.69895 10.3992H5.13335V9.59922C5.13335 9.17487 4.96478 8.76791 4.66472 8.46785C4.36466 8.16779 3.9577 7.99922 3.53335 7.99922H2.73335V6.39922H3.53335C3.9577 6.39922 4.36466 6.23065 4.66472 5.93059C4.96478 5.63053 5.13335 5.22357 5.13335 4.79922V3.99922H9.93335V4.79922C9.93335 5.22357 10.1019 5.63053 10.402 5.93059C10.702 6.23065 11.109 6.39922 11.5333 6.39922H12.3334V7.21682C12.604 7.24134 12.8718 7.29088 13.1333 7.36482V4.39922C13.1333 4.08096 13.0069 3.77573 12.7819 3.55069C12.5568 3.32565 12.2516 3.19922 11.9333 3.19922H3.13335ZM2.73335 4.39922C2.73335 4.29313 2.77549 4.19139 2.85051 4.11638C2.92552 4.04136 3.02726 3.99922 3.13335 3.99922H4.33335V4.79922C4.33335 5.01139 4.24906 5.21487 4.09904 5.3649C3.94901 5.51493 3.74552 5.59922 3.53335 5.59922H2.73335V4.39922ZM10.7333 3.99922H11.9333C12.0394 3.99922 12.1412 4.04136 12.2162 4.11638C12.2912 4.19139 12.3334 4.29313 12.3334 4.39922V5.59922H11.5333C11.3212 5.59922 11.1177 5.51493 10.9677 5.3649C10.8176 5.21487 10.7333 5.01139 10.7333 4.79922V3.99922ZM4.33335 10.3992H3.13335C3.02726 10.3992 2.92552 10.3571 2.85051 10.2821C2.77549 10.207 2.73335 10.1053 2.73335 9.99922V8.79922H3.53335C3.74552 8.79922 3.94901 8.8835 4.09904 9.03353C4.24906 9.18356 4.33335 9.38705 4.33335 9.59922V10.3992ZM3.60135 11.9992H7.55095C7.57547 12.2699 7.62502 12.5377 7.69895 12.7992H4.73335C4.48509 12.7993 4.2429 12.7225 4.04016 12.5792C3.83742 12.4359 3.6841 12.2333 3.60135 11.9992ZM14.7333 5.99922V8.20482C14.4866 8.00109 14.2183 7.82485 13.9333 7.67922V4.86722C14.1674 4.94997 14.37 5.10328 14.5133 5.30603C14.6566 5.50877 14.7335 5.75096 14.7333 5.99922ZM9.98535 9.15362C10.043 9.35892 10.059 9.57367 10.0324 9.78525C10.0058 9.99682 9.93724 10.201 9.83066 10.3856C9.72408 10.5703 9.58166 10.7319 9.41177 10.8607C9.24187 10.9896 9.04793 11.0832 8.84135 11.136L8.47175 11.2304C8.44524 11.5009 8.44793 11.7734 8.47975 12.0432L8.75975 12.1096C8.97185 12.1598 9.17147 12.2527 9.34636 12.3828C9.52125 12.5129 9.66772 12.6773 9.77679 12.866C9.88586 13.0547 9.95523 13.2637 9.98064 13.4802C10.006 13.6966 9.98696 13.916 9.92455 14.1248L9.82295 14.4624C10.0294 14.6256 10.2525 14.7648 10.4909 14.8768L10.7509 14.6016C10.9006 14.4431 11.0811 14.3169 11.2813 14.2307C11.4816 14.1444 11.6973 14.1 11.9153 14.1002C12.1333 14.1003 12.349 14.145 12.5491 14.2315C12.7492 14.318 12.9295 14.4445 13.0789 14.6032L13.3485 14.8896C13.5821 14.7816 13.8029 14.648 14.0061 14.4912L13.8813 14.0464C13.8236 13.8411 13.8075 13.6262 13.834 13.4146C13.8605 13.2029 13.9291 12.9987 14.0357 12.8139C14.1423 12.6291 14.2847 12.4675 14.4547 12.3386C14.6247 12.2097 14.8187 12.1161 15.0253 12.0632L15.3934 11.9696C15.4201 11.6989 15.4174 11.4261 15.3854 11.156L15.1069 11.0904C14.8948 11.0403 14.6951 10.9473 14.5201 10.8172C14.3451 10.687 14.1986 10.5225 14.0895 10.3338C13.9805 10.145 13.9111 9.93587 13.8858 9.71931C13.8604 9.50275 13.8796 9.2833 13.9421 9.07442L14.0429 8.73762C13.8368 8.57424 13.6127 8.43494 13.3749 8.32242L13.115 8.59762C12.9653 8.75616 12.7849 8.88246 12.5847 8.96875C12.3845 9.05505 12.1688 9.09952 11.9508 9.09945C11.7328 9.09937 11.5171 9.05475 11.317 8.96832C11.1168 8.88188 10.9365 8.75547 10.787 8.59682L10.5173 8.31042C10.2843 8.41809 10.064 8.55145 9.86055 8.70802L9.98535 9.15362ZM11.9325 12.4C11.7204 12.4 11.5169 12.3157 11.3669 12.1657C11.2168 12.0157 11.1325 11.8122 11.1325 11.6C11.1325 11.3878 11.2168 11.1844 11.3669 11.0343C11.5169 10.8843 11.7204 10.8 11.9325 10.8C12.1447 10.8 12.3482 10.8843 12.4982 11.0343C12.6483 11.1844 12.7325 11.3878 12.7325 11.6C12.7325 11.8122 12.6483 12.0157 12.4982 12.1657C12.3482 12.3157 12.1447 12.4 11.9325 12.4Z"
              fill="#9FA4B1"
            />
          </svg>

          <span>Providing Liquidity</span>
        </li>
        <li className="flex items-center space-x-2">
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99984 9.33271V10.666H0.666504V9.33271C0.666504 9.33271 0.666504 6.66604 5.33317 6.66604C9.99984 6.66604 9.99984 9.33271 9.99984 9.33271ZM7.6665 2.99937C7.6665 2.53788 7.52966 2.08676 7.27327 1.70304C7.01688 1.31933 6.65246 1.02026 6.2261 0.843655C5.79974 0.66705 5.33058 0.620842 4.87796 0.710875C4.42534 0.800907 4.00958 1.02314 3.68325 1.34946C3.35693 1.67578 3.1347 2.09154 3.04467 2.54416C2.95464 2.99679 3.00085 3.46594 3.17745 3.8923C3.35406 4.31866 3.65313 4.68308 4.03684 4.93947C4.42055 5.19586 4.87168 5.33271 5.33317 5.33271C5.95201 5.33271 6.5455 5.08687 6.98309 4.64929C7.42067 4.2117 7.6665 3.61821 7.6665 2.99937ZM9.95984 6.66604C10.3697 6.98321 10.705 7.38633 10.9423 7.84705C11.1796 8.30776 11.313 8.81488 11.3332 9.33271V10.666H13.9998V9.33271C13.9998 9.33271 13.9998 6.91271 9.95984 6.66604ZM9.33317 0.66604C8.87436 0.663906 8.4257 0.801061 8.0465 1.05937C8.45147 1.6252 8.66921 2.30356 8.66921 2.99937C8.66921 3.69518 8.45147 4.37355 8.0465 4.93937C8.4257 5.19769 8.87436 5.33484 9.33317 5.33271C9.95201 5.33271 10.5455 5.08687 10.9831 4.64929C11.4207 4.2117 11.6665 3.61821 11.6665 2.99937C11.6665 2.38054 11.4207 1.78704 10.9831 1.34946C10.5455 0.911873 9.95201 0.66604 9.33317 0.66604Z"
              fill="#9FA4B1"
            />
          </svg>

          <span>Refer + friends</span>
        </li>
      </ul>
      <div className="mt-auto"></div>
    </Card>
  );
}
