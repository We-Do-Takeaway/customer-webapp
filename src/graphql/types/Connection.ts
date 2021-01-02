interface Edge<T> {
  cursor: string
  Node: T
}

interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
}

export interface Connection<T> {
  pageInfo: PageInfo
  edges: Edge<T>[]
  nodes: T[]
}
