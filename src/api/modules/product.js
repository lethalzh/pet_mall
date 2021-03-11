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


//获取商品信息
export function getDetails(urlParam){
    return request({
        url: '/products/{pid}',
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
