import React from "react";
import { useCreateGauge } from "../../__hooks__/useCreateGauge";
import { TPair } from "../../types";
import SubmitButton from "@/components/shared/submitBtn";
interface Props {
  pairInfo: TPair;
}
export default function CreateGaugeSubmit({ pairInfo }: Props) {
  const createGauge = useCreateGauge({ pair: pairInfo.pair_address });
  return (
    <SubmitButton
      state={createGauge.buttonProps.state}
      isValid={createGauge.isValid}
      validationError={createGauge.errorMessage}
    >
      Create Gauge
    </SubmitButton>
  );
}
