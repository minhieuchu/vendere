import { IProductInfo } from '@/services/interfaces/IProduct'
import { IApiResponse } from '../vendereApi/vendereApiResponse/IApiResponse'

export const convertApiResponseProduct = (response: IApiResponse): IProductInfo => {
    const product: IProductInfo = {
        name: response.fields.name?.stringValue,
        price: +response.fields.price?.integerValue,
        owner: {"name": "John"},
        updatedAt: response.updateTime
    }
    return product
}