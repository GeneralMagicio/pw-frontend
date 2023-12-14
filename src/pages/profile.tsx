import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { ArrowBackward } from '@/components/Icon/ArrowBackward'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import { CollectionRanking } from '@/components/Poll/Rankings/edit-logic/edit'
import { StrategicRanking } from '@/components/Profile/StrategicRanking'
import { getRankings } from '@/utils/poll'
import router from 'next/router'
import { useEffect, useState } from 'react'

const convertToStrategicRankingFormat = (data: CollectionRanking) => {
  return data.ranking.map(({ share, name }) => ({ share, name }))
}

export default function Profile() {
  const [impactRanking, setImpactRanking] = useState<CollectionRanking>()

  useEffect(() => {
    const getData = async () => {
      const impactRanking = await getRankings()

      setImpactRanking(impactRanking)
    }

    getData()
  }, [])

  if (impactRanking === undefined) return <div></div>

  const impactButtonText = 'Edit importance'

  return (
    <div className="relative m-auto mt-32 flex w-auto max-w-[1158px] flex-col gap-6 rounded-[20px] bg-white px-20  py-10 font-IBM   text-black">
      <div className="flex flex-col items-center justify-center gap-6">
        <header className="flex w-full mb-2 ">
          <button
            className="p-2 px-6 text-lg text-black bg-white border-4 border-gray-100 rounded-xl"
            onClick={() => {
              router.back()
            }}>
            <ArrowBackward className="text-black" />
          </button>
        </header>
        <div className="flex justify-between w-full gap-10">
          <div className="flex h-[500px] w-[50%]  flex-col justify-between rounded-2xl p-6 shadow-card3">
            <h2 className="mb-4 text-2xl font-bold">Strategic Importance</h2>
            <div className="h-[70%]">
              <StrategicRanking
                data={convertToStrategicRankingFormat(impactRanking)}
                settled={true}
              />
            </div>
            <button
              className={
                'mt-4 flex h-12 w-fit min-w-[120px] items-center rounded-full bg-black px-4 py-2 text-sm text-white'
              }
              onClick={() => router.push(`/poll/root/ranking`)}>
              {impactButtonText} <ArrowForward className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
