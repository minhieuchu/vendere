import { IProductInfo } from '@/services/interfaces/IProduct';

import { ISellerReview } from '../interfaces/ISellerReview';
import { IUserInfo } from '../interfaces/IUser';
import { IApiResponse, IApiResponseDocument } from '../vendereApi/vendereApiResponse/IApiResponse';

export const firestoreQueryOperators = {
    EQUAL: "EQUAL"
}

export interface IFirestoreFieldFilter {
    fieldPath: string
    value: string
    op: string
}

export const convertApiResponseProduct = (
    response: any
): IProductInfo => {
    const imageUrls = [] as string[]
    for (const imageUrl of response.fields.imageUrls.arrayValue.values) {
        imageUrls.push(imageUrl.stringValue)
    }
    const product: IProductInfo = {
        name: response.fields.name.stringValue,
        price: +response.fields.price.integerValue,
        description: response.fields.description.stringValue,
        category: response.fields.category.stringValue,
        condition: response.fields.condition.stringValue,
        sellerUID: response.fields.sellerUID.stringValue,
        updatedAt: response.updateTime,
        imageUrls: imageUrls,
        hashId: response.name.split("/").slice(-1)[0],
    }
    return product
}

export const convertApiResponseSellerReviews = (
    response: Array<IApiResponseDocument>
): Array<ISellerReview> => {
    const sellerReviews = response.map(
        (review: IApiResponseDocument): ISellerReview => {
            const sellerReview: ISellerReview = {
                targetSellerUID:
                    review.document.fields.targetSellerUID.stringValue,
                reviewUserUID: review.document.fields.reviewUserUID.stringValue,
                content: review.document.fields.content.stringValue,
            };
            return sellerReview
        }
    )
    return sellerReviews
}

export const convertApiResponseUser = (response: IApiResponse): IUserInfo => {
    const user: IUserInfo = {
        uid: response.fields.uid.stringValue,
        name: response.fields.name.stringValue,
        averageReview: +response.fields.averageReview.doubleValue,
        numOfReviews: +response.fields.numOfReviews.integerValue,
        imageUrl: response.fields.imageUrl.stringValue,
    }
    return user
}

const createFirestoreFieldFilter = (fieldFilter: IFirestoreFieldFilter) => {
    return {
        fieldFilter: {
            field: {
                fieldPath: fieldFilter.fieldPath,
            },
            op: fieldFilter.op,
            value: {
                stringValue: fieldFilter.value,
            },
        },
    }
}

type FirestoreFormattedFieldFilter = ReturnType<typeof createFirestoreFieldFilter>

export const createFirestoreRequestBody = (collectionName: string, fieldFilters: Array<IFirestoreFieldFilter>) => {
    const firestoreRequestBody = {
        structuredQuery: {
            from: [{ collectionId: collectionName }],
            where: {
                compositeFilter: {
                    filters: [] as Array<FirestoreFormattedFieldFilter>,
                    op: "AND",
                },
            },
        },
    }
    fieldFilters.forEach(fieldFilter => {
        const formattedFieldFilter = createFirestoreFieldFilter(fieldFilter)
        firestoreRequestBody.structuredQuery.where.compositeFilter.filters.push(formattedFieldFilter)
    })
    return firestoreRequestBody
}
// Reference: https://www.jeansnyman.com/posts/google-firestore-rest-api-examples/
