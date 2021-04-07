import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import { getState, setState } from './store'
import apiObjs from '@/api'
import Video from 'video.js'
import 'video.js/dist/video-js.css'



Vue.config.productionTip = false;
Vue.use(Element, {
  size: 'medium'
});
Vue.prototype.$apis = apiObjs;
// 事件总线
Vue.prototype.$bus = new Vue();
Vue.prototype.$getState = getState;
Vue.prototype.$setState = setState;
Vue.prototype.$video = Video;

window.$$vue = new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});




