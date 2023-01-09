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
        getItem('学院管理', 'department'),
        getItem('用户管理', 'user'),
        // getItem('Alex', '5'),
    ]),
    getItem('功能', 'fun', <UserOutlined />, [
        getItem('消息通知', 'declaration'),
        getItem('双向选择','selection')
        // getItem('课题申报', 'declaration'),
        // getItem('选题', '4'),
        // getItem('开题', '5'),
        // getItem('中期答辩', '6'),
        // getItem('申请答辩', '7'),
        // getItem('评审', '8'),
        // getItem('答辩', '9'),
    ]),
    // getItem('进度图解', 'sub3', <TeamOutlined />, [
    //     getItem('Team 1', '10'),
    //     getItem('Team 2', '11')
    // ]),
    getItem('草稿', 'test', <FileOutlined />),
    getItem('我的Hooks', 'myhooks', <FileOutlined />),
];

// if()
// 对这里作判定，根据数据库用户的菜单path作判定，删选出合格的导出去
// console.log('-----0.固定的每项菜单：', items)
// console.log('-----当前登录的用户信息', user)


export default items;