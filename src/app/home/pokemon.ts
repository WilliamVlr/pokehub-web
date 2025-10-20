export interface Pokemon {
    id: BigInt,
    name: string,
    order: BigInt,
    types: {
      slot: number,
      type: Type  
    }[],

}

export interface Type {
    name: string
}