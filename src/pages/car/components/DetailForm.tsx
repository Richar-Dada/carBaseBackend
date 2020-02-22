import React, { SFC } from 'react'
import { Modal, Descriptions, Upload } from 'antd'

import { CarInfoType } from '../car'


interface FormProps {
    current: CarInfoType
    handleCancel: () => void
}

interface FileListType {
    uid: string,
    name: string,
    status: string,
    url: string,
}

const DetailForm: SFC<FormProps> = React.memo(({
    current,
    handleCancel
}) => {

    let thumbnailFileList: FileListType[] = []
    let imagesFileList: FileListType[] = []

    thumbnailFileList = [{
        uid: '-1',
        name: 'thumbnail',
        status: 'done',
        url: current.thumbnail as string,
    }]

    const imagesStr: string = current.images as string
    const imagesArr: string[] = imagesStr.split(',')
    imagesArr.forEach((url: string, index: number) => {
        imagesFileList.push({
            uid: index.toString(),
            name: 'images' + index,
            status: 'done',
            url: url as string,
        })
    })

    return (
        <Modal
            width="1000px"
            title="车辆详情"
            visible={true}
            footer={null}
            onCancel={handleCancel}
        >
            <Descriptions>
                <Descriptions.Item label="车型">{current.carType}</Descriptions.Item>
                <Descriptions.Item label="注册时间">{current.regDate}</Descriptions.Item>
                <Descriptions.Item label="上牌地">{current.licenceAddress}</Descriptions.Item>
                <Descriptions.Item label="变速箱">{current.gearBox}</Descriptions.Item>
                <Descriptions.Item label="排放标准">{current.effluentStandard}</Descriptions.Item>
                <Descriptions.Item label="排量(L)">{current.outputVolume}</Descriptions.Item>
                <Descriptions.Item label="表显里程(KM)">{current.mileage}</Descriptions.Item>
                <Descriptions.Item label="价格">{current.price}</Descriptions.Item>
                <Descriptions.Item label="描述">{current.description}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{current.created_at}</Descriptions.Item>
                <Descriptions.Item label="创建来源">{current.source === 'backend' ? '后台' : '客户端'}</Descriptions.Item>
                <Descriptions.Item label=""></Descriptions.Item>
                <Descriptions.Item label="缩略图">
                    <Upload
                        actionUrl=''
                        listType="picture-card"
                        fileList={thumbnailFileList}
                        showUploadList={{ showRemoveIcon: false }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="车辆图片">
                    <Upload
                        actionUrl=''
                        listType="picture-card"
                        fileList={imagesFileList}
                        showUploadList={{ showRemoveIcon: false }}
                    />
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    )
})

export default DetailForm