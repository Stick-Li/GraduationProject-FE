import ajax from "./ajax";

const BASIC_URL = 'http://127.0.0.1'

export const reqLogin = (values) => ajax('POST', BASIC_URL + '/login', values)