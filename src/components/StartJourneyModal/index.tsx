import { ArrowForward } from '@/components/Icon/ArrowForward'
import { Close } from '@/components/Icon/Close'
import { Lock } from '@/components/Icon/Lock'
import { useRouter } from 'next/router'
import { ColoredGrid } from '../Icon/ColoredGrid'
import { SadSun } from '../Icon/SadSun'
import { useSession } from '@/context/session'
import cn from 'classnames'
import { useEffect } from 'react'
import { PollType } from '@/types/Pairs'

interface StartJourneyModalProps {}
export const StartJourneyModal: React.FC<StartJourneyModalProps> = ({}) => {
  const router = useRouter()
  const { flowStatus, updateFlowStatus } = useSession()
  useEffect(() => {
    updateFlowStatus()
  }, [updateFlowStatus])
  useEffect(() => {
    if (flowStatus.expertise && flowStatus.impact) {
      router.replace('/galaxy')
    }
  }, [flowStatus, router])
  return (
    <>
      <div className="relative flex flex-col  gap-6   font-IBM">
        <div className="flex flex-col items-center justify-center gap-6">
          <header className="mb-2 flex w-full ">
            <h1 className="text-3xl font-bold">Starting the journey!</h1>
          </header>

          <h2 className="text-xl font-medium">
            We want to personalise your voting experience so you can start with
            things you have more experience with.
          </h2>
          <div className="mt-10 flex w-full justify-between">
            <div
              className={cn(
                'flex w-[440px] flex-col gap-2 rounded-2xl p-6 shadow-card2',
                { 'opacity-80': flowStatus.expertise }
              )}>
              <img
                alt={''}
                className="h-[170px] w-[392px] rounded-2xl border-0 object-cover"
                src={'/images/expertise.png'}></img>
              <h4 className="text-2xl">Expertise Preference</h4>
              <p className="">
                By indicating your expertise, we can customize your voting
                experience, ensuring your insights shine where you excel.
              </p>
              <button
                className="mt-5 flex h-12 min-w-[120px] items-center self-center  rounded-full bg-black px-8 font-bold text-white"
                disabled={flowStatus.expertise}
                onClick={() => {
                  router.push(`/poll/${PollType.EXPERTISE}`)
                }}>
                Choose expertise
                <ArrowForward className="ml-2" />
              </button>
            </div>
            <div
              className={cn(
                'flex w-[440px] flex-col gap-2 rounded-2xl p-6 shadow-card2',
                { 'opacity-80': !flowStatus.expertise }
              )}>
              <img
                alt={''}
                className="h-[170px] w-[392px] rounded-2xl border-0 object-cover"
                src={'/images/impact.png'}></img>
              <h4 className="text-2xl">Strategic Importance</h4>
              <p className="">
                Here are the biggest enterprise technology acquisitions of 2021
                so far. There are many variations of passages of Lorem Ipsum.
              </p>
              <button
                className="mt-5 flex h-12 min-w-[120px] items-center self-center  rounded-full bg-black px-8 font-bold text-white"
                disabled={!flowStatus.expertise}
                onClick={() => {
                  router.push(`/poll/${PollType.IMPACT}`)
                }}>
                Choose preferred fields
                {!flowStatus.expertise ? (
                  <Lock className="ml-2" />
                ) : (
                  <ArrowForward className="ml-2" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
