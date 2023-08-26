import { NothingYetBox } from './NothingYetBox'

// const data = [
//   {name: "Protocol Guild", percentage: 0.055730},
//   {name: "geth", percentage: 0.0230},
//   {name: "Solidity", percentage: 0.0217},
//   {name: "Ethers", percentage: 0.0209},
//   {name: "Ethers", percentage: 0.0209},
//   {name: "Ethers", percentage: 0.0209},
// ]

const data: null | unknown[] = null

const valueCalculator = (percentage: number) => {
  const val = percentage * 3 * 1000000
  return val.toFixed(2)
}
export const StrategicRanking: React.FC = () => {
  if (!data)
    return (
      <div className="relative flex h-full items-center justify-center">
        <img
          alt="expertise ranking"
          className="absolute self-start h-full blur-[4px]"
          src="/images/expertise-ranking-sample.png"
        />
        <div className="z-10">
          <NothingYetBox />
        </div>
      </div>
    )

  return (
    <div>
      {/* @ts-ignore */}
      {data.map((item, index) => (
        <div
          className="mt-2 flex w-full justify-between border-b pb-2"
          key={item.name}>
          <p className="w-[50px] font-semibold"> {`#${index + 1}`}</p>
          <p className="w-[175px] font-semibold"> {item.name} </p>
          <div className="w-[100px]">
            <span className="text-[8px] text-red">%</span>
            <span> {(item.percentage * 100).toFixed(2)} </span>
          </div>
          <div className="w-[150px]">
            <span> {`${valueCalculator(item.percentage)}`} </span>
            <span className="mb-1 ml-1 align-super text-[8px] text-red">
              OP
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
