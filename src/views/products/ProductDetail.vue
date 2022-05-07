<template>
    <div class="product-detail-container">
        <div class="product-image">
            <img src="../../assets/bike.png" alt="Product image">
        </div>
        <div class="product-description">
            <h2> {{ productDetail.name }} </h2>
            <h5 class="product-price"> {{ productDetail.price }} ¥</h5>
            <p> Uploaded by {{ productDetail.owner.name }} at {{ productDetail.updatedAt }} </p>
            <div class="custom-button add-to-cart-button">Add to cart</div>
            <div class="custom-button order-button">Buy now</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { getProductByHashId } from '@/services/vendereApi/VendereApiProduct'
import { DefaultProductInfo } from '@/services/interfaces/IProduct'

export default defineComponent({
    data() {
        const productDetail = DefaultProductInfo
        return {
            productDetail
        }
    },
    mounted() {
        const productHashId = this.$route.params.hashId as string
        getProductByHashId(productHashId).then(product => {
            this.productDetail = product
        })
    }
})
</script>

<style scoped>
.product-detail-container {
    display: flex;
    margin-top: 20px;
    padding: 15px;
}
.product-image {
    width: 55%;
}
.product-image > img {
    width: 100%;
}
.product-description {
    margin: 0 auto;
}
.product-price {
    color: brown;
    font-style: italic;
}
.product-description .custom-button {
    width: 75%;
    height: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: whitesmoke;
    margin: 0 auto;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;
}
.add-to-cart-button {
    background: blueviolet;
    border: 1px solid blueviolet;
}
.add-to-cart-button:hover {
    background: rgb(108, 24, 187);
    border-color: rgb(108, 24, 187);
}
.order-button {
    background: coral;
    border: 1px solid coral;
}
.order-button:hover {
    background: rgb(255, 110, 57);
    border-color: rgb(255, 110, 57);
}
</style>