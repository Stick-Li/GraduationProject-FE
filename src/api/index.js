import ajax from "./ajax";

const BASIC_URL = 'http://127.0.0.1'

export const reqLogin = (values) => ajax('POST', BASIC_URL + '/login', values)

export const reqAddRole = (values) => ajax('POST', BASIC_URL + '/addrole', values)

export const reqGetRoles = () => ajax('GET', BASIC_URL + '/getroles')

export const reqGetPower = (values) => ajax('POST', BASIC_URL + '/getpower', values)