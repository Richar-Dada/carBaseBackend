import React, { SFC } from 'react'
import { Form, Modal, Input, Select, Row, Col, Radio } from 'antd'
import { FormComponentProps } from 'antd/es/form'

import { BannerAttribute } from '@/pages/banner/banner'
import SingleUpload from '@/components/Upload/SingleUpload'

const { Option } = Select

interface FormProps extends FormComponentProps {
    formType: string,
    current: BannerAttribute,
    handleCancel: () => void,
    handleSubmit: (values: BannerAttribute) => void
}

interface FileListType {
    uid: string,
    name: string,
    status: string,
    url: string,
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

    let thumbnailFileList: FileListType[] = []

    if (formType === 'edit') {
        thumbnailFileList = [{
            uid: '-1',
            name: 'thumbnail',
            status: 'done',
            url: current.imageUrl as string,
        }]
    }

    const onOk = () => {
        form.validateFields((err, values) => {
            if (err) {
                throw err
                return
            }

            values.imageUrl = values.imageUrl[0].response || values.imageUrl[0].url
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
                        <Form.Item label="Banner图">
                            {getFieldDecorator('imageUrl', {
                                valuePropName: 'fileList',
                                initialValue: thumbnailFileList,
                                rules: [{ required: true, message: '请上传缩略图' }],
                            })(
                                <SingleUpload
                                    actionUrl="http://localhost:7001/api/v1/upload"
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