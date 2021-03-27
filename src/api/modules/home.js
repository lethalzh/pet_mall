import request from '@/utils/request'


export function getProducts_num(){
	return request({
		url: '/products_num',
		method: 'get',
	})
}
export function getCarousels(){
	return request({
		url: '/carousel',
		method: 'get',
	})
}

export function getNavData(urlParam){
	return request({
		url: '/navdata/{Animal}',
		method: 'get',
		urlParam,
	})
}

export function Login(params){

	return request({
		url: '/user/login',
		method: 'post',
		params
	})
}

export function Register(params){
    return request({
        url: '/user/register',
        method: 'post',
        params
    })
}
//获取收货地址
export function getAddress(params){
	return request({
		url: '/user/getaddress',
		method: 'post',
		params
	})
}
//添加收货地址
export function AddAddress(params) {
	return request({
		url: '/user/addaddress',
		method: 'post',
		params
	})
}
//删除收货地址
export function delectAddress(params) {
	return request({
		url: '/user/delectaddress',
		method: 'post',
		params
	})
}
//修改收货地址
export function eidtAddress(params) {
	return request({
		url: '/user/editaddress',
		method: 'post',
		params
	})
}
// export function getProducts_num(urlParam){
// 	return request({
// 		url: '/products_num/{Animal}',
// 		method: 'get',
// 		urlParam,
// 	})
// }
// //获取
// export function getCompanyInfo(params) {
// 	var id = params.companyNo
//     return request({
//         url: '/safety/company/get-company/{companyNo}',
//         method: 'get',
//         params,
// 		urlParam: {companyNo:id}
//     })
// }












