import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Text, ResponsiveContainer } from "recharts"
import { NothingYetBox } from "./NothingYetBox";
import React from "react";

function renderPolarAngleAxis({ payload, x, y, cx, cy, settled, ...rest } : {payload: {value: string}, settled: boolean, x: number, y: number, cx: number, cy: number}) {
  return (
    <Text
      {...rest}
      className="font-IBM"
      fill= {settled ? "#000" : "#aaa"}
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


export const ExpertiseChart : React.FC<{data: {name: string, share: number}[], settled: boolean}> = ({data, settled}) => {
  const maxData = data.sort((a,b) => b.share - a.share)[0].share
  const notSettledData = data.map(({name}) => ({name}))

  return (
    <div className="relative h-full">
      {!settled ? <div className="absolute z-10 flex h-full w-full items-center justify-center">
        <NothingYetBox/>
      </div> : null}
      <ResponsiveContainer className={"mt-[-18px]"} height="100%" width="100%">

        <RadarChart data={settled ? data : notSettledData} outerRadius={100}>
          <defs>
          <linearGradient id="colorUv" x1="1" x2="0" y1="1" y2="0">
            <stop offset="25%" stopColor="#ffc3c8" stopOpacity={0.5} />
            <stop offset="60%" stopColor="#677df8" stopOpacity={0.5} />
          </linearGradient>
        </defs>
          <PolarGrid gridType="circle" stroke="#eee"/>
          <PolarAngleAxis  dataKey="name" tick={props => renderPolarAngleAxis({...props, settled})} />
          <PolarRadiusAxis axisLine={false} domain={[0, maxData * 1.2]} tick={false} />
          <Radar dataKey="share" fill="url(#colorUv)" fillOpacity={0.6} name="Mike" stroke="#f82c37" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}                      