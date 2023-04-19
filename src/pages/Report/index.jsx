import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row, message } from 'antd';
import React from 'react';
import memoryUtils from '../../utils/memoryUtils';
import Teacher from './Teacher'
import Director from './Director'

const { userRole, userInstitute, userSubject } = memoryUtils.user
const Index = () => {
    // console.log('userRolevvvvvv',userRole)

    return (
        <>
            {
                userRole === '老师' ? <Teacher /> : <Director />

            }
        </>

    );
}

export default Index;
