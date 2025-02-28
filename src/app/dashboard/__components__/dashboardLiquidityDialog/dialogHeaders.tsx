import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

export const WithdrawHeader = () => (
  <DialogHeader title="Withdraw your" desc="Withdraw your staked position" />
);
export const StakeHeader = () => (
  <DialogHeader title="Stake your" desc="Stake your position to earn" />
);
export const UnstakeHeader = () => (
  <DialogHeader
    title="Unstake your"
    desc="Unstake your position to stop earning"
  />
);
function DialogHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="py-3 px-4 border-b border-neutral-800">
      <DialogTitle className="text-lg">
        {title} <span className="text-primary-400">Position</span>
      </DialogTitle>
      <DialogDescription>{desc}</DialogDescription>
    </div>
  );
}
