import React, { SFC } from 'react'
import { Form, Modal, Input, InputNumber, DatePicker, Cascader, Select, Row, Col, Upload, Button, Icon } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import moment from 'moment'

import SingleUpload from './SingleUpload'
import MultiUpload from './MultiUpload'
import { addressAdapter } from '../data'
import { FormType, CarInfoType } from '../car'

const addr = addressAdapter()
const { Option } = Select

interface FormProps extends FormComponentProps {
    formType: string,
    currentCar: CarInfoType,
    handleCancel: () => void,
    handleSubmit: (values: FormType) => void
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

const CarForm: SFC<FormProps> = React.memo(({
    formType,
    currentCar,
    form,
    handleCancel,
    handleSubmit
}) => {
    const { getFieldDecorator } = form
    let initAddress: string[] = []
    let thumbnailFileList: FileListType[] = []
    let imagesFileList: FileListType[] = []
    if (formType === 'edit') {
        const tem: string = currentCar.licenceAddress as string
        initAddress = tem.split(',')

        thumbnailFileList = [{
            uid: '-1',
            name: 'thumbnail',
            status: 'done',
            url: currentCar.thumbnail as string,
        }]

        console.log('currentCar', currentCar)
        const imagesStr: string = currentCar.images as string
        const imagesArr: string[] = imagesStr.split(',')
        imagesArr.forEach((url: string, index: number) => {
            console.log('url', url)
            imagesFileList.push({
                uid: index.toString(),
                name: 'images' + index,
                status: 'done',
                url: url as string,
            })
        })
    }

    const onOk = () => {
        form.validateFields((err, values) => {
            if (err) {
                throw err
                return
            }

            values.regDate = values.regDate.format('YYYY-MM-DD')
            values.licenceAddress = values.licenceAddress.join(',')
            values.thumbnail = values.thumbnail[0].response || values.thumbnail[0].url
            const imagesArr: string[] = []
            values.images.forEach((item: any) => {
                imagesArr.push(item.response || item.url)
            })
            values.images = imagesArr.join(',')
            handleSubmit(values)
        })
    }

    return (
        <Modal
            width="1000px"
            title="新增车辆"
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
                        <Form.Item label="车型">
                            {getFieldDecorator('carType', {
                                initialValue: currentCar.carType,
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
                                initialValue: moment(currentCar.regDate),
                                rules: [{ required: true, message: '请输入注册时间' }],
                            })(
                                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="上牌地">
                            {getFieldDecorator('licenceAddress', {
                                initialValue: initAddress,
                                rules: [{ required: true, message: '请输入上牌地' }],
                            })(
                                <Cascader options={addr}></Cascader>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="变速箱">
                            {getFieldDecorator('gearBox', {
                                initialValue: currentCar.gearBox,
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
                                initialValue: currentCar.effluentStandard,
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
                                initialValue: currentCar.outputVolume,
                                rules: [{ required: true, message: '请输入排量' }],
                            })(
                                <InputNumber
                                    style={{ width: '100%' }}
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
                                initialValue: currentCar.mileage,
                                rules: [{ required: true, message: '请输入表显里程' }],
                            })(
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="如：10"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="价格">
                            {getFieldDecorator('price', {
                                initialValue: currentCar.price,
                                rules: [{ required: true, message: '请输入价格' }],
                            })(
                                <InputNumber
                                    style={{ width: '100%' }}
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
                                initialValue: currentCar.description,
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
                                initialValue: thumbnailFileList,
                                rules: [{ required: true, message: '请上传缩略图' }],
                            })(
                                <SingleUpload
                                    actionUrl="http://localhost:7001/api/v1/upload"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="车辆图片">
                            {getFieldDecorator('images', {
                                valuePropName: 'fileList',
                                initialValue: imagesFileList,
                                rules: [{ required: true, message: '请上传车辆图片' }],
                            })(
                                <MultiUpload
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

export default Form.create<FormProps>({

})(CarForm)