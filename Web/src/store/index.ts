import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { IUserDisplay } from "@/interfaces/IDatabaseData";

Vue.use(Vuex);

interface StoreState {
  appName: string,
  loginState: {
    loggedIn: boolean,
    userInfo: IUserDisplay | null,
  }
}

const store: StoreOptions<StoreState> = {
  state: {
    appName: "POOL",
    loginState: {
      loggedIn: false,
      userInfo: null,
    },
  },
  mutations: {
    setLoggedIn(state, data: boolean) {
      state.loginState.loggedIn = data;
    },
    setLoginUserInfo(state, data: IUserDisplay) {
      state.loginState.userInfo = data;
    },
  },
  actions: {
    registerLoginState({ commit }, data: IUserDisplay) {
      commit("setLoggedIn", true);
      commit("setLoginUserInfo", data);
    },
    unreigsterLoginState({ commit }) {
      commit("setLoggedIn", false);
      commit("setLoginUserInfo", null);
    },
  },
  modules: { },
};

const storeInstance = new Vuex.Store(store);

export default storeInstance;
