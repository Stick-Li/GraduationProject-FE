import { Tree } from 'antd';
import React, { useState } from 'react';
const treeData = [
    {
        // title: '0-0',
        title: '所有',
        key: '0-0',
        children: [
            {
                title: '首页',
                key: '0-0-0',
                // #region
                // children: [
                //   {
                //     title: '0-0-0-0',
                //     key: '0-0-0-0',
                //   },
                //   {
                //     title: '0-0-0-1',
                //     key: '0-0-0-1',
                //   },
                //   {
                //     title: '0-0-0-2',
                //     key: '0-0-0-2',
                //   },
                // ],
                // #endregion
            },
            {
                title: '管理',
                key: '0-0-1',
                children: [
                    {
                        title: '角色管理',
                        key: '0-0-1-0',
                    },
                    {
                        title: '用户管理',
                        key: '0-0-1-1',
                    },
                ],
            },
            // {
            //   title: '0-0-2',
            //   key: '0-0-2',
            // },
        ],
    },
    // #region
    // {
    //   title: '0-1',
    //   key: '0-1',
    //   children: [
    //     {
    //       title: '0-1-0-0',
    //       key: '0-1-0-0',
    //     },
    //     {
    //       title: '0-1-0-1',
    //       key: '0-1-0-1',
    //     },
    //     {
    //       title: '0-1-0-2',
    //       key: '0-1-0-2',
    //     },
    //   ],
    // },
    // {
    //   title: '0-2',
    //   key: '0-2',
    // },
    // #endregion
];

const RolePower = () => {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand：打印展开的节点', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        console.log('onCheck：打印选中的节点', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect：点击某节点', info);
        setSelectedKeys(selectedKeysValue);
    };

    return (
        <Tree
            checkable
            onExpand={onExpand}   // 展开/收起节点时触发
            expandedKeys={expandedKeys}   //（受控）展开指定的树节点
            autoExpandParent={autoExpandParent} // 是否自动展开父节点
            onCheck={onCheck}   // 点击复选框触发
            checkedKeys={checkedKeys}   // （受控）选中复选框的树节点
            onSelect={onSelect}   // 点击树节点触发
            selectedKeys={selectedKeys}   // （受控）设置选中的树节点
            treeData={treeData}   // treeNodes 数据
        />
    );
};

export default RolePower;