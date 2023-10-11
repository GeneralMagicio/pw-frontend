import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import { CollectionRanking } from '@/components/Poll/Rankings/edit-logic/edit'
import { ExpertiseChart } from '@/components/Profile/RadarChart'
import { StrategicRanking } from '@/components/Profile/StrategicRanking'
import { FlowStatus } from '@/types/Flow'
import { RankingResponse } from '@/types/Ranking'
import { getFlowStatus } from '@/utils/flow'
import { getExpertiseRankings, getRankings } from '@/utils/poll'
import router from 'next/router'
import { useEffect, useState } from 'react'

const convertToRadarChartFormat = (data: RankingResponse) => {
  return data.ranking.map(({share, project}) => ({share, name: project.name})) 
}

const convertToStrategicRankingFormat = (data: CollectionRanking) => {
  return data.ranking.map(({share, name}) => ({share, name})) 
}

export default function Profile() {

  const [expertiseRanking, setExpertiseRanking] = useState<RankingResponse>()
  const [impactRanking, setImpactRanking] = useState<CollectionRanking>()
  const [status, setStatus] = useState<FlowStatus>()

  useEffect(() => {
    const getData = async () => {
      const [status, expertiseRanking, impactRanking] = await Promise.all([
        getFlowStatus(),
        getExpertiseRankings(),
        getRankings()
      ])

      setStatus(status)
      setExpertiseRanking(expertiseRanking)
      setImpactRanking(impactRanking)

    }

    getData()
  }, [])

  
  if (expertiseRanking === undefined || impactRanking === undefined || status === undefined) return <div></div>
  
  const expertiseButtonText = status.expertise ? "Edit expertise" : "Choose expertise"
  const impactButtonText = status.impact ? "Edit importance" : "Choose preferred fields"

  return (
    <div className="relative m-auto mt-32 flex w-auto max-w-[1158px] flex-col gap-6 rounded-[20px] bg-white px-20  py-10 font-IBM   text-black">
      <div className="flex flex-col items-center justify-center gap-6">
        <header className="mb-2 flex w-full ">
          <ConnectWalletButton className="h-12" />
        </header>
        <div className="flex w-full justify-between gap-10">
          <div className="flex h-[475px] w-[50%] flex-col justify-between rounded-2xl p-6 shadow-card3">
            <h2 className="mb-4 font-Inter text-2xl font-bold">
              Expertise Preference
            </h2>
            <div className='h-[70%]'>
              <ExpertiseChart data={convertToRadarChartFormat(expertiseRanking)} settled={status.expertise}/>
            </div>
            <button
              className={
                'mt-4 flex h-12 w-fit min-w-[120px] items-center rounded-full bg-black px-4 py-2  text-sm text-white'
              }
              onClick={() => router.push(`/poll/expertise`)}>
              {expertiseButtonText} <ArrowForward className="ml-2" />
            </button>
          </div>
          <div className="flex h-[475px] w-[50%]  flex-col justify-between rounded-2xl p-6 shadow-card3">
            <h2 className="mb-4 font-Inter text-2xl font-bold">
              Strategic Importance
            </h2>
            <div className='h-[70%]'>
              <StrategicRanking data={convertToStrategicRankingFormat(impactRanking)} settled={status.impact}/>
            </div>
            <button
              className={
                'mt-4 flex h-12 w-fit min-w-[120px] items-center rounded-full bg-black px-4 py-2 text-sm text-white'
              }
              onClick={() => router.push(`/poll/root`)}>
              {impactButtonText} <ArrowForward className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
