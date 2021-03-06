import axios from 'axios'
import Router from 'vue-router'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import { getState, setState } from '../store' 
// create an axios instance
axios.Cancel;

const service = axios.create({
  //  10.76.28.30:8000
  baseURL:'http://localhost:3000/',// process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers.Animal = getState('cache', 'Animal')||sessionStorage.getItem('Animal')||'dog';
     console.log( getState('cache', 'Animal'),'--------------',sessionStorage.getItem('Animal'));
    config.headers.token = getState('user', 'token')||sessionStorage.getItem('token');
    if (typeof config.params == 'string' || typeof config.params == 'number') {
      config.url = `${config.url}/${config.params}`;
      delete config.params
    }
    if (!(config.urlParam === null || config.urlParam === undefined)) {
      if (typeof config.urlParam == 'object')
        for (var i in config.urlParam) {
          config.url = config.url.replace('{' + i + '}', config.urlParam[i])
        } else {
        config.url = config.url.substr(0, config.url.indexOf('{')) + config.urlParam + config.url.substr(config.url.indexOf('}') + 1)
      }
      delete config.urlParam
    }
    if (["post", "put", "delete"].indexOf(config.method.toLocaleLowerCase()) != -1) {
      config.data = config.params;
      delete config.params
    } else {
      var query = "";
      for (var i in config.params) {
        query += `&${i}=${config.params[i]}`
      }
      if (query) {
        query = query.substr(1);
        config.url += (config.url.indexOf("?") == -1 ? "?" : '') + query
      }
      delete config.params
    }
    console.log('++++++', config);
    return config
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error)
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log(">>>>", response)
    const res = response.data;
    console.log('>>>???????????????',res);
    if(res===null||res===undefined||typeof res=='string'){
      return res
    }
    // ??????????????????????????????????????????rc???????????????????????????
    if (res.rc === undefined) {
      res.rc = 0
    }
    if (response.status != 200)
      res.rc = -1;
    switch (res.rc) {
      // ??????????????????????????????????????????????????????
      case 0:
        // ????????????res??????????????????
        // if(typeof response.config.configOptions.globalHandle === 'function') {
        //     response.config.configOptions.globalHandle(response, getState, setState)
        // }
        return res;
      // token?????????????????????????????????
      case 1:
        sessionStorage.getItem('token') && Message.error('token????????????????????????');
        window.$$vue.$router.replace("/login");
        setState('cache', 'uploadStack', []);
        // login()
        sessionStorage.clear();
        throw res;
      // ??????????????????????????????
      case 2:
        Message.error('??????????????????????????????');
        throw res;
      default:
        throw res
    }
  },
  error => {
    console.log('err' + error); // for debug
    let errMsg = '';
    //  1.??????????????????
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      errMsg = '????????????!'
    } else {
      errMsg = error.message
    }

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });

    if (error.response) {
      const data = error.response.data;
      if (error.response.status === 400
        && data.code === 40240001) {
        window.$$vue.$router.replace("/login")
      }
    }
    return Promise.reject(error)
  }
);

export default service
