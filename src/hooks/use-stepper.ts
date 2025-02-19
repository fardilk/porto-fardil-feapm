import { useState } from 'react';
import { useNavigate } from 'react-router';

export type StepperType = {
  label: string;
  value: string;
  properties?: Record<string, any>;
};

export type useStepperProps = {
  initialSteps: StepperType[];
  onChangeFormSteps?: (param: StepperType[]) => void;
  onChangeCurrentPage?: (param: string) => void;
};

export function useStepper(props: useStepperProps) {
  const { initialSteps, onChangeFormSteps, onChangeCurrentPage } = props;

  const [formSteps, setFormSteps] = useState(initialSteps);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState<StepperType>(formSteps[0]);

  const navigate = useNavigate();

  const handleChangePage = ({
    action,
    newFormSteps,
    toSpecificPage,
  }: {
    action?: 'next' | 'previous';
    newFormSteps?: StepperType[];
    toSpecificPage?: string;
  }) => {
    if (action === 'previous' && currentPageIndex === 0) navigate('/', { replace: true });

    const tempFormSteps = newFormSteps || formSteps;
    if (newFormSteps) {
      setFormSteps(newFormSteps);
      onChangeFormSteps?.(newFormSteps);
    }

    if (toSpecificPage) {
      const specificPageIndex = tempFormSteps.findIndex((row) => row.value === toSpecificPage);

      if (specificPageIndex >= 0) {
        setCurrentPageIndex(specificPageIndex);
        setCurrentPage(tempFormSteps[specificPageIndex]);
        onChangeCurrentPage?.(tempFormSteps[specificPageIndex].value);
      }
    } else if (currentPageIndex >= 0 && currentPageIndex <= tempFormSteps.length) {
      const newCurrentPageIndex = currentPageIndex + (action === 'next' ? 1 : -1);
      setCurrentPageIndex(newCurrentPageIndex);
      setCurrentPage(tempFormSteps[newCurrentPageIndex]);
      onChangeCurrentPage?.(tempFormSteps[newCurrentPageIndex].value);
    }
  };

  return { formSteps, currentPage, currentPageIndex, handleChangePage };
}
