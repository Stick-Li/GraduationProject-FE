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

export const reqUpdateOneUser = (value) => ajax('POST', BASIC_URL + '/updateoneuser', value)

export const reqDeleteOneUser = (value) => ajax('POST', BASIC_URL + '/deleteoneuser', value)

export const reqSendMessage = (value) => ajax('POST', BASIC_URL + '/sendmessage', value)

export const reqGetNoticeArr = (value) => ajax('GET', BASIC_URL + '/getnoticearr', value)

export const reqChangeIsReceiveRead = (value) => ajax('GET', BASIC_URL + '/changeisread', value)

export const reqSelectTeachers = (value) => ajax('POST', BASIC_URL + '/selectteachers', value)

export const reqIsHaveStuValue = (value) => ajax('GET', BASIC_URL + '/ishavestuval', value)

export const reqGetAllTeachers = (value) => ajax('GET', BASIC_URL + '/getallteachers', value)

export const reqGetSelectTeachers = (value) => ajax('GET', BASIC_URL + '/getselteachers', value)

export const reqGetAllStudents = (value) => ajax('GET', BASIC_URL + '/getallstus', value)

export const reqGetAllDept = (value) => ajax('GET', BASIC_URL + '/getalldept', value)

export const reqAddDepartment = (value) => ajax('POST', BASIC_URL + '/adddept', value)

export const reqUpdateDepartment = (value) => ajax('POST', BASIC_URL + '/updatedept', value)

export const reqGetAllMajor = (value) => ajax('GET', BASIC_URL + '/getallmajor', value)

export const reqAddMajor = (value) => ajax('POST', BASIC_URL + '/addmajor', value)


