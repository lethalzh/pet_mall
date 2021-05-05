/**
 * Created  @date 2021/3/4 17:18
 * @author zh_elk
 */
import request from '@/utils/request'


//获取商品列表

export function getProductList(params){
    return request({
        url: '/products/productList',
        method: 'post',
        params
    })
}
//获取折扣商品列表
export function getClearGoods(params){
    return request({
        url: '/products/getClearGoods',
        method: 'post',
        params
    })
}


//获取商品信息
export function getDetails(urlParam){
    return request({
        url: '/products/{pid}',
        method: 'get',
        urlParam
    })
}


//根据订单号获取商品
export function getOerderCart(urlParam){
    return request({
        url: '/products/getcart/{oid}',
        method: 'get',
        urlParam
    })
}

//获取购物车
export function getCart(params){
    return request({
        url: '/products/cart',
        method: 'post',
        params
    })
}
//添加购物车
export function addCart(params) {
    return request({
        url: '/products/addCart',
        method: 'post',
        params
    })
}
//删除购物车中商品
export function delectCart(urlParam){
    return request({
        url: '/products/cart_delect/{did}',
        method: 'get',
        urlParam
    })
}

//购物车结算
export function Settlement(params) {
    return request({
        url: '/products/settlement',
        method: 'post',
        params
    })
}

//再次支付

export function setPay(params) {
    return request({
        url: '/products/setPay',
        method: 'post',
        params
    })
}
//确认收货
export function setOrder(params) {
    return request({
        url: '/products/setOrder',
        method: 'post',
        params
    })
}

//获取热门商品
export function getHotList() {
    return request({
        url: '/products/getHotList',
        method: 'post',
    })
}