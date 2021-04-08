/**
 * Created  @date 2021/4/6 9:04
 * @author zh_elk
 */
import request from '@/utils/request'


export function getVideoList(){
    return request({
        url: 'other/getVideoList',
        method: 'post',
    })
}


export function getNavData(urlParam){
    return request({
        url: '/navdata/{Animal}',
        method: 'get',
        urlParam,
    })
}

//获取aboutInfo img title
export function getAboutInfo(urlParam){
    return request({
        url: '/other/getAboutInfo/{mode}',
        method: 'get',
        urlParam,
    })
}












