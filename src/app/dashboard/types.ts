export type FormAction = {
  onSubmit: () => void;
  errorMessage: string | null;
  isValid: boolean;
  max: number;
};
