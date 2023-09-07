import { FC } from "react";
import { Tick } from "../Icon/Tick";
import { ArrowForward } from "../Icon/ArrowForward";

interface Props {
  name: string;
  onClick: () => void;
  showVotingButton: boolean;
}

export const GalaxyCenterPlanet: FC<Props> = ({name, showVotingButton, onClick}) => {


  return (
    <div className="flex flex-col items-center justify-center">
      <img alt="center planet" className="mt-[-100px]" src="/images/center-galaxy.png" width={450}/>
      <p className="mt-[-75px] text-2xl font-medium text-black"> {name} </p>
      {showVotingButton && <button
        className="mt-6 flex items-center gap-2 whitespace-nowrap rounded-3xl border-6 bg-black px-4 py-2 font-Inter text-xl font-medium text-white"
        onClick={onClick}>
        Start voting
        <ArrowForward />
      </button>}
    </div>
  )
}