import React, { SFC } from 'react'
import { Form, Modal, Input, Select, Row, Col, Radio } from 'antd'
import { FormComponentProps } from 'antd/es/form'

import { BannerAttribute } from '@/pages/banner/banner'

const { Option } = Select

interface FormProps extends FormComponentProps {
    formType: string,
    current: BannerAttribute,
    handleCancel: () => void,
    handleSubmit: (values: BannerAttribute) => void
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
            title="新增Banner"
            visible={!!formType}
            onOk={onOk}
            onCancel={handleCancel}
        >
            <Form
                autoComplete="false"
                {...formItemLayout}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                initialValue: current.title,
                                rules: [{ required: true, message: '请输入标题' }],
                            })(
                                <Input
                                    placeholder="请输入标题"
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="目标地址">
                            {getFieldDecorator('target', {
                                initialValue: current.target,
                                rules: [{ required: true, message: '请输入目标地址' }],
                            })(
                                <Input
                                    placeholder="请输入目标地址"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Banner图路径">
                            {getFieldDecorator('imageUrl', {
                                initialValue: current.imageUrl,
                                rules: [{ required: true, message: '请输入Banner图路径' }],
                            })(
                                <Input
                                    placeholder="请输入Banner图路径"
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
})

export default Form.create<FormProps>({})(CuForm)