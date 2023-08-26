import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Radar, Text, ResponsiveContainer } from "recharts"
import { NothingYetBox } from "./NothingYetBox";

// const data = [
//   {
//     "subject": "Development",
//     "A": 120,
//     "fullMark": 150
//   },
//   {
//     "subject": "Infrastructure",
//     "A": 98,
//     "fullMark": 150
//   },
//   {
//     "subject": "Legal",
//     "A": 86,
//     "fullMark": 150
//   },
//   {
//     "subject": "Marketing",
//     "A": 99,
//     "fullMark": 150
//   },
//   {
//     "subject": "Social",
//     "A": 135,
//     "fullMark": 150
//   },
//   {
//     "subject": "Education",
//     "A": 85,
//     "fullMark": 150
//   },
// ]
const data = [
  {
    "subject": "Development",
  },
  {
    "subject": "Infrastructure",
  },
  {
    "subject": "Legal",
  },
  {
    "subject": "Marketing",
  },
  {
    "subject": "Social",
  },
  {
    "subject": "Education",
  },
]

function renderPolarAngleAxis({ payload, x, y, cx, cy, noData, ...rest } : {payload: {value: string}, noData: boolean, x: number, y: number, cx: number, cy: number}) {
  return (
    <Text
      {...rest}
      className="font-IBM"
      fill= {noData ? "#aaa" : "#000"}
      fontSize= {12}
      fontWeight= {500}
      verticalAnchor="middle"
      x={x + (x - cx) / 10}
      y={y + (y - cy) / 10}
    >
      {payload.value}
    </Text>
  );
}


export const ExpertiseChart = () => {
  const noData = true

  return (
    <div className="relative h-full">
      <div className="absolute z-10 flex h-full w-full items-center justify-center">
        <NothingYetBox/>
      </div>
      <ResponsiveContainer height="100%" width="100%">

        <RadarChart data={data} outerRadius={100}>
          <defs>
          <linearGradient id="colorUv" x1="1" x2="0" y1="1" y2="0">
            <stop offset="25%" stopColor="#ffc3c8" stopOpacity={0.5} />
            <stop offset="60%" stopColor="#677df8" stopOpacity={0.5} />
          </linearGradient>
        </defs>
          <PolarGrid gridType="circle" stroke="#eee"/>
          <PolarAngleAxis  dataKey="subject" tick={props => renderPolarAngleAxis({...props, noData})} />
          <PolarRadiusAxis axisLine={false} domain={[0, 150]} tick={false} />
          <Radar dataKey="A" fill="url(#colorUv)" fillOpacity={0.6} name="Mike" stroke="#f82c37" />
          {/* <Legend /> */}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}                      