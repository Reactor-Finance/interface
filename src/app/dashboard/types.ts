import { ButtonState } from "@/components/shared/submitBtn";

export type FormAction = {
  onSubmit: () => void;
  errorMessage: string | null;
  isValid: boolean;
  buttonProps: {
    state: ButtonState;
    approveTokenSymbol?: string;
  };
};
