import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('首页', 'home', <PieChartOutlined />),
    getItem('管理', 'manage', <DesktopOutlined />, [
        getItem('角色管理', 'role'),
        getItem('用户管理', 'user'),
        // getItem('Alex', '5'),
    ]),
    getItem('User', 'sub2', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub3', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8')
    ]),
    getItem('Files', 'test', <FileOutlined />),
];

// if()
// 对这里作判定，根据数据库用户的菜单path作判定，删选出合格的导出去
console.log('-----0.固定的每项菜单：', items)
// console.log('-----当前登录的用户信息', user)


export default items;