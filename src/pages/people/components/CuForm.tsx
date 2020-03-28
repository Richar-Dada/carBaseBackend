import React, { SFC } from 'react'
import { Form, Modal, Input, InputNumber, DatePicker, Cascader, Select, Row, Col, Upload, Button, Icon, Radio } from 'antd'
import { FormComponentProps } from 'antd/es/form'

import { PeopleAttribute } from '../people'

const { Option } = Select

interface FormProps extends FormComponentProps {
    formType: string,
    current: PeopleAttribute,
    handleCancel: () => void,
    handleSubmit: (values: PeopleAttribute) => void
}


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
}

const CuForm: SFC<FormProps> = React.memo(({
    formType,
    current,
    form,
    handleCancel,
    handleSubmit
}) => {
    const { getFieldDecorator } = form

    const onOk = () => {
        form.validateFields((err, values) => {
            if (err) {
                throw err
                return
            }

            handleSubmit(values)
        })
    }

    return (
        <Modal
            width="1000px"
            title="新增用户"
            visible={!!formType}
            onOk={onOk}
            onCancel={handleCancel}
        >
            <Form
                autoComplete="false"
                {...formItemLayout}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item label="名字">
                            {getFieldDecorator('name', {
                                initialValue: current.name,
                                rules: [{ required: true, message: '请输入名字' }],
                            })(
                                <Input
                                    placeholder="请输入名字"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="密码">
                            {getFieldDecorator('password', {
                                initialValue: current.password,
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input
                                    placeholder="请输入密码"
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="手机号码">
                            {getFieldDecorator('phone', {
                                initialValue: current.phone,
                                rules: [{ required: true, message: '请输入手机号码' }],
                            })(
                                <Input
                                    placeholder="请输入手机号码"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="角色">
                            {getFieldDecorator('role', {
                                initialValue: current.role,
                                rules: [{ required: true, message: '请选择角色' }],
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择角色"
                                >
                                    <Option value="user">会员</Option>
                                    <Option value="admin">管理员</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                {
                    formType === 'edit' && (
                        <>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="激活码">
                                        {getFieldDecorator('activeCode', {
                                            initialValue: current.activeCode,
                                            rules: [{ required: true, message: '请输入激活码' }],
                                        })(
                                            <Input
                                                disabled
                                                placeholder="请输入激活码"
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="微信名">
                                        {getFieldDecorator('wxName', {
                                            initialValue: current.wxName,
                                        })(
                                            <Input
                                                disabled
                                                placeholder="请输入微信名"
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="是否已激活">
                                        {getFieldDecorator('isActive', {
                                            initialValue: current.isActive,
                                            rules: [{ required: true, message: '请选择是否已激活' }],
                                        })(
                                            <Radio.Group disabled>
                                                <Radio value={1}>激活</Radio>
                                                <Radio value={0}>未激活</Radio>
                                            </Radio.Group>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )
                }
            </Form>
        </Modal>
    )
})

export default Form.create<FormProps>({})(CuForm)