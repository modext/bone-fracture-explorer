import React from 'react';
import CustomButton from "@/components/Button"; 

interface ClassFilterProps {
  classFilterButtons: {
    label: string;
    btnColor: string;
    btnName: string;
    onclick: () => void;
  }[];
  selectedClassFilter: string[];
  handleSelectClassFilter: (btnName: string) => void;
}

const ClassFilter: React.FC<ClassFilterProps> = ({ classFilterButtons, selectedClassFilter, handleSelectClassFilter }) => {
  return (
    <div className="mt-3 flex-wrap gap-4 flex">
      {classFilterButtons.map((button, index) => (
        <CustomButton
          key={index}
          onClick={() => handleSelectClassFilter(button.btnName)}
          buttonColor={`${button.btnColor} ${selectedClassFilter.includes(button.btnName) ? "active" : ""}`}
          type="button"
        >
          {button.label}
        </CustomButton>
      ))}
    </div>
  );
};

export default ClassFilter;
