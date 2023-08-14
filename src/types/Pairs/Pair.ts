export interface PairType {
  id: number
  name: string
  url: string
  image: string
  description: string
  collection_id: number | null
  created_at: string
  numOfChildren: number
  childProjects?: Array<Array<PairType>>
}
