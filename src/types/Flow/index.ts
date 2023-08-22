export interface FlowStatus {
  checkpoint: {
    type: 'project' | 'collection' | 'expertise' | 'initial'
    collectionId: number
  }
  impact: boolean
  expertise: boolean
}
