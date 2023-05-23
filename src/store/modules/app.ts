export default {
  namespace: "app",
  state: {
    leftMenuIsCollapse: false, // 左侧菜单是否折叠显示
  },
  mutations: {
    toggleMenuIsCollapse(state: { [key: string]: any }): void {
      state.leftMenuIsCollapse = !state.leftMenuIsCollapse;
    },
  },
};
