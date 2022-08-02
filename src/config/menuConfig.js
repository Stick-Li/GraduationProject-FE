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
    getItem('角色管理', 'role', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', 'test2'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8')
    ]),
    getItem('Files', '9', <FileOutlined />),
];

export default items;