export interface IProductInfo {
    name: string
    price: number
    ownerHashId: string
    updatedAt: string
    hashId?: string
    imageUrl: string
}

export const DefaultProductInfo: IProductInfo = {
    name: "",
    price: 0,
    ownerHashId: "",
    updatedAt: "",
    imageUrl: ""
}