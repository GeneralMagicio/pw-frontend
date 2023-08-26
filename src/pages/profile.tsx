import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import { ExpertiseChart } from '@/components/Profile/RadarChart'
import { StrategicRanking } from '@/components/Profile/StrategicRanking'
import router from 'next/router'

export default function Profile() {
  return (
    <div className="relative m-auto mt-32 flex w-auto max-w-[1158px] flex-col gap-6 rounded-[20px] bg-white px-20  py-10 font-IBM   text-black">
      <div className="flex flex-col items-center justify-center gap-6">
        <header className="mb-2 flex w-full ">
          <ConnectWalletButton className="h-12" />
        </header>
        <div className="flex w-full justify-between gap-10">
          <div className="h-[475px] w-[50%] rounded-2xl p-6 shadow-card3">
            <h2 className="mb-4 font-Inter text-2xl font-bold">
              Expertise Preference
            </h2>
            <div className='h-[75%]'>
              <ExpertiseChart />
            </div>
            <button
              className={
                'mt-4 flex h-12 min-w-[120px] items-center rounded-full bg-black px-4 py-2  text-sm text-white'
              }
              onClick={() => router.push(`/poll`)}>
              {`Choose expertise`} <ArrowForward className="ml-2" />
            </button>
          </div>
          <div className="h-[475px] w-[50%] rounded-2xl p-6 shadow-card3">
            <h2 className="mb-4 font-Inter text-2xl font-bold">
              Strategic Importance
            </h2>
            <div className='h-[75%]'>
              <StrategicRanking />
            </div>
            <button
              className={
                'mt-4 flex h-12 min-w-[120px] items-center rounded-full bg-black px-4 py-2 text-sm text-white'
              }
              onClick={() => router.push(`/poll`)}>
              {`Choose preferred fields`} <ArrowForward className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
