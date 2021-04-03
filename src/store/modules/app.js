import {setTokenIntoStorage, getTokenFromStorage} from "../../utils/storage";

const state = {
  userName: '',
  token: getTokenFromStorage()
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_TOKEN(state, token) {
    state.token = token;
    setTokenIntoStorage(token);
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  }
}
export default {
  state,
  mutations,
  actions
}
