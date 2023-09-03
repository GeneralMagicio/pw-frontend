interface Props {
  activeStep: number
  steps: number
  changeStep: (step: number) => void
}

export const DotStepper: React.FC<Props> = ({
  activeStep,
  steps,
  changeStep,
}) => {
  return (
    <div className="flex gap-6">
      {Array(steps)
        .fill(0)
        .map((_, step) => (
          // eslint-disable-next-line tailwindcss/no-custom-classname
          <div
            className={`h-4 w-4 cursor-pointer rounded-full ${
              step + 1 <= activeStep ? `bg-[#000]` : `bg-[#ddd]`
            }`}
            key={step}
            onClick={() => changeStep(step + 1)}
          />
        ))}
    </div>
  )
}
