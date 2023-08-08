import { Close } from '@/components/Icon/Close'

interface AbstainProps {
  selected?: boolean
}

export const Abstain: React.FC<
  AbstainProps & React.HTMLProps<HTMLDivElement>
> = (props) => (
  <div
    {...props}
    className="-mt-24 flex h-[198px] w-[196px] cursor-pointer flex-col items-center gap-6 rounded-2xl border-4 border-[#FFF4D] bg-white px-5 py-10 transition-all duration-300 hover:scale-110">
    <Close className="shrink-0" />
    <div className="flex shrink-0 flex-col items-center gap-2 text-black">
      <span className="font-bold">Abstain</span>
      <span className="whitespace-nowrap">Decline to vote!</span>
    </div>
  </div>
)
