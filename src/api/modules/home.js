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












