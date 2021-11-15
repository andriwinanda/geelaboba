import {
  setToken, getToken, removeToken, getDataUser, setDataUser, removeDataUser
} from './localstorage-helper'
import { createStore } from 'framework7/lite';
import axios from './axios-helper';


const store = createStore({
  state: {
  isLoggedIn: !!(getToken()),
  dataUser: getDataUser() || null,
  },
  getters: {
    user({ state }) {
      return state.dataUser;
    }
  },
  actions: {
    login({ commit, state }, DATA_LOGIN) {
      state.dataUser = DATA_LOGIN.dataUser
      state.isLoggedIn = true
      setToken(DATA_LOGIN.token)
      setDataUser(JSON.stringify(DATA_LOGIN.dataUser))
    },
    logout({ commit, state }) {
      state.dataUser = null
      state.isLoggedIn = false
      removeToken()
      removeDataUser()
      delete axios.defaults.headers['X-Auth-Token']
    },
  },
})
export default store;
