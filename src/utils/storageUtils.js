// 进行web存储管理的工具函数的存放
import store from 'store'

const USER_KEY = 'user_key'

const storageUtils =  {

    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY, user)
    },

    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        // return store.get(USER_KEY) || {}
        return store.get(USER_KEY)
    },

    removeUser() {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}
export default storageUtils;