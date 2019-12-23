import LeftNavData from './LeftNav.vue';
const LeftNav = {
  install: (Vue) => {
    // 注册并获取组件，然后在 main.js 中引入，并 Vue.use()挂载
    Vue.component('LeftNav', LeftNavData)
  }
};
export default LeftNav;