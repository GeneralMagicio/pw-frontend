import { Close } from '@/components/Icon/Close'

interface AbstainProps {
  selected?: boolean
}

export const Abstain: React.FC<
  AbstainProps & React.HTMLProps<HTMLDivElement>
> = (props) => (
  <div
    {...props}
    className="-mt-24 group flex h-[198px] w-[196px] cursor-pointer flex-col items-center gap-5 rounded-2xl border-4 border-[#FFF4D] bg-white px-5 pb-10 pt-4 transition-all duration-300 hover:scale-110">
    <Close className="shrink-0" />
    <div className="flex  flex-col items-center gap-2 text-black shrink-0">
      <span>Neither</span>
      <p className="text-xs opacity-0 transition-opacity group-hover:opacity-100">
        {`Choose neither if it is too close to call or you don't want to give OP
        to either project.`}
      </p>
    </div>
  </div>
)
