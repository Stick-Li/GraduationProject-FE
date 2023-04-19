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
        getItem('课题申报','report'),
        getItem('双向选择','selection'),
        getItem('指导记录', 'declaration'),
    ]),
    getItem('文档', 'files', <TeamOutlined />, [
        getItem('选题申报表', 'xuantishenbao'),
        getItem('开题报告表', 'kaitibaogao'),
        getItem('中期检查表', 'zhongqijiancha'),
        getItem('申请答辩表', 'shenqingdabian'),

        // getItem('题目统计表', '2'),
        // getItem('任务书', '3'),
        // getItem('指导记录', '5'),
        // getItem('申请答辩与评审表', '7'),
        // getItem('评阅表', '8'),
        // getItem('答辩记录表', '9'),
        // getItem('工作汇总表', '10'),
        // getItem('推荐表', '11'),
        // getItem('工作总结', '12'),
        // getItem('资格认证统计表', '13'),

    ]),
    // getItem('草稿', 'test', <FileOutlined />),
    // getItem('我的Hooks', 'myhooks', <FileOutlined />),
];

// if()
// 对这里作判定，根据数据库用户的菜单path作判定，删选出合格的导出去
// console.log('-----0.固定的每项菜单：', items)
// console.log('-----当前登录的用户信息', user)


export default items;