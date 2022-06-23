import { ISellerReview } from '../interfaces/ISellerReview';
import { IUserInfo } from '../interfaces/IUser';
import {
    convertApiResponseSellerReviews, convertApiResponseUser, createFirestoreRequestBody,
    firestoreQueryOperators, IFirestoreFieldFilter
} from '../utils/apiUtils';
import { VendereApiInstance, VendereQueryApiInstance } from './VendereApiBase';

export const getUserByHashId = async (hashId: string): Promise<IUserInfo> => {
    const res = await VendereApiInstance.get(`users/${hashId}`)
    return convertApiResponseUser(res.data)
}

export const getSellerReviews = async (
    sellerHashId: string
): Promise<Array<ISellerReview>> => {
    const fieldFilter: IFirestoreFieldFilter = {
        fieldPath: "targetSellerHashId",
        value: sellerHashId,
        op: firestoreQueryOperators.EQUAL
    }
    const sellerReviewsRequestBody = createFirestoreRequestBody("seller_review", [fieldFilter])
    const res = await VendereQueryApiInstance.post("", sellerReviewsRequestBody)

    return convertApiResponseSellerReviews(res.data)
}

export const getUsersByHashIds = async (hashIds: Array<string>): Promise<Array<IUserInfo>> => {
    const promiseArray = hashIds.map(hashId => getUserByHashId(hashId))
    return await Promise.all(promiseArray)
}

export const createUser = async (userData: IUserInfo): Promise<IUserInfo> => {
    const postParams = {
        fields: {
            uid: { stringValue: userData.uid },
            name: { stringValue: userData.name },
        }
    }
    const response = await VendereApiInstance.post('users', postParams)
    return convertApiResponseUser(response.data)
}
