import { CollectionProgressStatus } from "@/components/Galaxy/types"

export interface PairType {
  id: number
  name: string
  url: string
  image: string
  description: string
  collection_id: number | null
  created_at: string
  numOfChildren: number
  childProjects?: Array<PairType>
  subProjects?: Array<PairType>
  parent_collection_id: number | null
  locked: boolean
  hasSubcollections: boolean,
  hasCompositeProjects: boolean,
  progress: CollectionProgressStatus,
  started: boolean,
  type: "collection" | "project" | "composite project"
}
