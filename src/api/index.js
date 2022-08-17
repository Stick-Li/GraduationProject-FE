import ajax from "./ajax";

const BASIC_URL = 'http://127.0.0.1'

export const reqLogin = (values) => ajax('POST', BASIC_URL + '/login', values)

export const reqAddRole = (values) => ajax('POST', BASIC_URL + '/addrole', values)

export const reqGetRoles = () => ajax('GET', BASIC_URL + '/getroles')

export const reqGetPower = (values) => ajax('POST', BASIC_URL + '/getpower', values)

export const reqAddOneUser = (values) => ajax('POST', BASIC_URL + '/addoneuser', values)

export const reqGetAllUsers = () => ajax('GET', BASIC_URL + '/getallusers')

export const reqGetMenuPath = (value) => ajax('GET', BASIC_URL + '/getmemu', value)

export const reqAddUsers = (value) => ajax('POST', BASIC_URL + '/addusers', value)