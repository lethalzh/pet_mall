/**
 * Created  @date 2021/4/12 21:50
 * @author zh_elk
 */
import request from '@/utils/request'
//获取用户信息
export function getuserInfo(params){
    return request({
        url: '/other/getuserInfo',
        method: 'post',
        params
    })
}


//修改用户信息
export function EdituserInfo(params){
    return request({
        url: '/other/EdituserInfo',
        method: 'post',
        params
    })
}


//修改用户密码
export function EditPassword(params){
    return request({
        url: '/other/EditPassword',
        method: 'post',
        params
    })
}
