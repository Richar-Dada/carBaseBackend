import React, { SFC } from 'react'
import { Modal, Descriptions } from 'antd'

import { PeopleAttribute } from '../people'

interface FormProps {
    current: PeopleAttribute
    handleCancel: () => void
}

const DetailForm: SFC<FormProps> = React.memo(({
    current,
    handleCancel
}) => {
    return (
        <Modal
            width="1000px"
            title="用户详情"
            visible={true}
            footer={null}
            onCancel={handleCancel}
        >
            <Descriptions>
                <Descriptions.Item label="名字">{current.name}</Descriptions.Item>
                <Descriptions.Item label="密码">{current.password}</Descriptions.Item>
                <Descriptions.Item label="手机号码">{current.phone}</Descriptions.Item>
                <Descriptions.Item label="角色">{current.role}</Descriptions.Item>
                <Descriptions.Item label="激活码">{current.activeCode}</Descriptions.Item>
                <Descriptions.Item label="是否激活">{current.isActive === 0 ? '激活' : '已激活'}</Descriptions.Item>
                <Descriptions.Item label="微信名">{current.wxName}</Descriptions.Item>
                <Descriptions.Item label="微信ID">{current.wxId}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{current.created_at}</Descriptions.Item>
            </Descriptions>
        </Modal>
    )
})

export default DetailForm