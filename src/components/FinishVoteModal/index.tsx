import { useRouter } from 'next/router'
import { ArrowForward } from '../Icon/ArrowForward'

export const FinishVoteModal: React.FC = () => {
  const router = useRouter()
  return (
    <>
      <div className="flex max-w-[550px] flex-col justify-center gap-10 font-IBM">
        <header className="mb-2 flex w-full ">
          <h3 className="text-2xl font-bold">Well done</h3>
        </header>

        <p className="text-center text-xl font-bold">
          There are new areas that have been unlocked for ranking!
        </p>
        <button
          className={
            'flex h-12 w-fit items-center self-center rounded-full bg-black px-4 py-2  text-white'
          }
          onClick={() => router.push('/galaxy')}>
          {`Let's explore them`} <ArrowForward className="ml-2" />
        </button>
      </div>
    </>
  )
}
