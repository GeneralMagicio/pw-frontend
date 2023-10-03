import { NothingYetBox } from './NothingYetBox'

const valueCalculator = (percentage: number) => {
  const val = percentage * 3 * 1000000
  return val.toFixed(2)
}
export const StrategicRanking: React.FC<{data: {name: string, share: number}[], settled: boolean}> = ({data, settled}) => {
  if (!settled)
    return (
      <div className="relative flex h-full items-center justify-center">
        <img
          alt="expertise ranking"
          className="absolute h-[90%] w-full self-start"
          src="/images/expertise-blurred.png"
        />
        <div className="z-10">
          <NothingYetBox />
        </div>
      </div>
    )

  return (
    <div className='max-h-[320px] overflow-x-hidden overflow-y-scroll'>
      {data.map((item, index) => (
        <div
          className={`mx-2 mt-4 ${index === 0 ? 'mt-0' : ''} flex w-full justify-between border-b pb-4`}
          key={item.name}>
          <p className="w-[50px] font-semibold"> {`#${index + 1}`}</p>
          <p className="w-[225px] font-semibold"> {item.name} </p>
          <div className="w-[100px]">
            <span className="text-[8px] text-red">%</span>
            <span> {(item.share * 100).toFixed(2)} </span>
          </div>
          <div className="w-[150px]">
            <span> {`${valueCalculator(item.share)}`} </span>
            <span className="mb-1 ml-1 align-super text-[8px] text-red">
              OP
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
