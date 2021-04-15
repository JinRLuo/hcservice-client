import {setTokenIntoStorage, setUserInfoIntoStorage, getUserInfoFromStorage, getTokenFromStorage} from "../../utils/storage";

const state = {
  userInfo: getUserInfoFromStorage(),
  token: getTokenFromStorage(),
  orderId: ''
}
const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
    setUserInfoIntoStorage(userInfo);
  },
  SET_TOKEN(state, token) {
    state.token = token;
    setTokenIntoStorage(token);
  },
  SET_ORDER_ID(state, orderId) {
    state.orderId = orderId;
  },
  CLEAR_USER_INFO(state) {
    state.userInfo = '';
    localStorage.removeItem('userInfo');
  },
  CLEAR_TOKEN(state) {
    state.token = '';
    localStorage.removeItem('token');
  },
}
const actions = {
  setUserInfo({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo);
  }

}
export default {
  state,
  mutations,
  actions
}
