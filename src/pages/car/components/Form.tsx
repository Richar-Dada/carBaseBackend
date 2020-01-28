import React, { SFC } from 'react'
import { Form, Modal, Input, InputNumber, DatePicker, Cascader, Select, Row, Col, Upload, Button, Icon } from 'antd'
import { FormComponentProps } from 'antd/es/form'

import SingleUpload from './SingleUpload'
import MultiUpload from './MultiUpload'
import { addressAdapter } from '../data'

const addr = addressAdapter()
const  { Option } = Select

interface FormProps extends FormComponentProps {
    isShow: boolean,
    handleCancel: () => void,
    handleSubmit: () => void
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

const CarForm: SFC<FormProps> = React.memo(({
    isShow, 
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
            console.log('values', values)
            handleSubmit()
        })
    }

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    const handleThumbnailChange = (file: any) => {
        console.log('handleThumbnailChange', file)
    }

    return (
        <Modal
            width="1000px"
            title="新增车辆"
            visible={isShow}
            onOk={onOk}
            onCancel={handleCancel}
        >
            <Form 
                autoComplete="false" 
                {...formItemLayout}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item label="车型">
                            {getFieldDecorator('carType', {
                                rules: [{ required: true, message: '请输入车型' }],
                            })(
                                <Input
                                    placeholder="如：本田飞度"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="注册时间">
                            {getFieldDecorator('regDate', {
                                rules: [{ required: true, message: '请输入注册时间' }],
                            })(
                                <DatePicker style={{width: '100%'}}/>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="上牌地">
                            {getFieldDecorator('licenceAddress', {
                                rules: [{ required: true, message: '请输入上牌地' }],
                            })(
                                <Cascader options={addr}></Cascader>
                            )}
                        </Form.Item>     
                    </Col>
                    <Col span={12}>
                        <Form.Item label="变速箱">
                            {getFieldDecorator('gearBox', {
                                rules: [{ required: true, message: '请输入变速箱' }],
                            })(
                                <Input
                                    placeholder="如：6AT"
                                />
                            )}
                        </Form.Item>   
                    </Col>
                </Row>
                <Row>
                   <Col span={12}>
                    <Form.Item label="排放标准">
                            {getFieldDecorator('effluentStandard', {
                                rules: [{ required: true, message: '请输入排放标准' }],
                            })(
                                <Select style={{ width: '100%' }}>
                                    <Option value="国六">国六</Option>
                                    <Option value="国五">国五</Option>
                                    <Option value="国四">国四</Option>
                                    <Option value="国三">国三</Option>
                                    <Option value="国二">国二</Option>
                                    <Option value="国一">国一</Option>
                                </Select>
                            )}
                        </Form.Item>    
                   </Col> 
                   <Col span={12}>
                    <Form.Item label="排量(L)">
                            {getFieldDecorator('outputVolume', {
                                rules: [{ required: true, message: '请输入排量' }],
                            })(
                                <InputNumber
                                    style={{width: '100%'}}
                                    placeholder="如：2.5"
                                />
                            )}
                        </Form.Item>    
                   </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="表显里程(KM)">
                            {getFieldDecorator('mileage', {
                                rules: [{ required: true, message: '请输入表显里程' }],
                            })(
                                <InputNumber
                                    style={{width: '100%'}}
                                    placeholder="如：10"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="价格">
                            {getFieldDecorator('price', {
                                rules: [{ required: true, message: '请输入价格' }],
                            })(
                                <InputNumber
                                    style={{width: '100%'}}
                                    placeholder="如：10000"
                                />
                            )}
                        </Form.Item>   
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="描述">
                            {getFieldDecorator('description', {
                                rules: [{ required: false, message: '请输入描述' }],
                            })(
                                <Input.TextArea
                                    placeholder="增加描述 方便了解车辆情况"
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="缩略图">
                            {getFieldDecorator('thumbnail', {
                                valuePropName: 'fileList',
                                rules: [{ required: true, message: '请上传缩略图' }],
                            })(
                                <SingleUpload 
                                actionUrl="http://localhost:7002/api/v1/upload"
                                />
                            )}
                        </Form.Item>        
                    </Col>
                    <Col span={12}>
                        <Form.Item label="车辆图片">
                            {getFieldDecorator('images', {
                                valuePropName: 'fileList',
                                rules: [{ required: true, message: '请上传车辆图片' }],
                            })(
                                <MultiUpload 
                                actionUrl="http://localhost:7002/api/v1/upload"
                                />
                            )}
                        </Form.Item>    
                    </Col>
                </Row>
                
            </Form>
        </Modal>
    )
})

export default Form.create<FormProps>({

})(CarForm)