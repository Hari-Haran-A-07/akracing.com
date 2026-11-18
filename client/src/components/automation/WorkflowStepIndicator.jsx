import React from 'react';

const WorkflowStepIndicator = ({ steps = [], currentStepIndex = 0 }) => {
  return (
    <div className=\"flex items-center justify-between w-full py-4\">
      {steps.map((step, idx) => {
        const isDone = idx < currentStepIndex;
        const isCurrent = idx === currentStepIndex;

        return (
          <React.Fragment key={step.name || idx}>
            <div className=\"flex flex-col items-center relative group\">
              <div
                className={w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 \}
              >
                {isDone ? 'âœ“' : idx + 1}
              </div>
              <span className={	ext-[11px] mt-2 font-mono uppercase tracking-wider \}>
                {step.title || step.name}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={lex-1 h-0.5 mx-2 transition-colors duration-500 \}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WorkflowStepIndicator;
