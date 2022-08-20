import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            cartList: {
                // //第一层级是商铺的id，
                // shopName: '',
                // productList: {},
                // // shopId:{
                // //     //第二层是商品id，内容是商品内容以及购物数量
                // //     productId:{
                // //         count:10
                // //     }
                // // }

            }
        }
    },
    mutations: {
        changeCartItemInfo(state, { shopId, productId, productInfo, num }) {
            console.log(111);
            let shopInfo = state.cartList[shopId] || {
                shopName: '',
                productList: {}
            }

            let product = shopInfo.productList[productId]
            if (!product) {
                product.count = 0
                product = productInfo
            }
            console.log(222);
            product.count += num
            if (num > 0) {
                product.check = true
            }
            if (product.count < 0) {
                product.count = 0
            }
            shopInfo.productList[productId] = product
            state.cartList[shopId] = shopInfo
        },
        changeCartItemChecked(state, { shopId, productId }) {
            const product = state.cartList[shopId][productId]
            product.check = !product.check
        },
        cleanCartProducts(state, { shopId }) {
            state.cartList[shopId] = {}
        },
        setCartItemsChecked(state, { shopId }) {
            const products = state.cartList[shopId]
            if (products) {
                for (let i in products) {
                    const product = products[i]
                    product.check = true
                }
            }


        },
        changeShopName(state, { shopId, shopName }) {
            const shopInfo = state.cartList[shopId] || {
                shopName: '',
                productList: {}
            }
            shopInfo.shopName = shopName
            state.cartList[shopId] = shopId
        }
    },
    getters: {
        totalNum(state, { shopId }) {
            let totalNum = 0
            for (const i of state.cartList[shopId]) {
                totalNum += i.count
            }
            return totalNum
        },
        totalPrice(state) {
            let totalPrice = 0
            for (const book of state.books) {
                totalPrice += book.price * book.count
            }
            return totalPrice
        }
    }
})

export default store
