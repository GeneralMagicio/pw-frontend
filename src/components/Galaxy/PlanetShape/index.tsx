import Image from 'next/image'
interface PlanetShapeProps {
  id: number
  locked?: boolean
}

export const PlanetShape: React.FC<PlanetShapeProps> = ({ locked, id }) => {
  return (
    <Image
      alt=""
      height={150}
      src={`/images/planets/S${id}-${locked ? 'locked' : 'unlocked'}.svg`}
      width={150}
    />
  )
}
