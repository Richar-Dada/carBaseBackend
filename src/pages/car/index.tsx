import React, { Component } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { connect } from 'dva'
import { Row, Col, Table, Divider, Button, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/es/table'

import { CarModelState } from './models/carMod'
import styles from './style.less'
import CarForm from './components/Form'
import DetailForm from './components/DetailForm'
import { FormType, CarInfoType } from './car'

const namespace: string = 'carMod'

interface carProps {
    dispatch: Dispatch<AnyAction>
    Car: CarModelState
}

interface carState {
    name: string,
}

class Car extends Component<carProps, carState> {
    state: carState = {
        name: 'car'
    }

    columns: ColumnProps<CarInfoType>[] = [
        {
            title: '车型',
            dataIndex: 'carType',
            key: 'carType',
        },
        {
            title: '注册时间',
            dataIndex: 'regDate',
            key: 'regDate',
        },
        {
            title: '上牌地',
            dataIndex: 'licenceAddress',
            key: 'licenceAddress',
        },
        {
            title: '变速箱',
            dataIndex: 'gearBox',
            key: 'gearBox',
        },
        {
            title: '排放标准',
            dataIndex: 'effluentStandard',
            key: 'effluentStandard',
        },
        {
            title: '排量',
            dataIndex: 'outputVolume',
            key: 'outputVolume',
        },
        {
            title: '表显里程',
            dataIndex: 'mileage',
            key: 'mileage',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.detail(record)}>详情</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.edit(record)}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="确定删除？"
                        okText="是"
                        cancelText="否"
                        onConfirm={() => this.del(record.id as number)}
                    >
                        <a >删除</a>
                    </Popconfirm>
                </span>
            )
        },
    ]

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: `${namespace}/fetchCar`
        })
    }

    edit = (record: CarInfoType) => {
        const { dispatch } = this.props
        dispatch({
            type: `${namespace}/updateStore`,
            payload: {
                currentCar: record,
                formType: 'edit'
            }
        })
    }

    detail = (record: CarInfoType) => {
        const { dispatch } = this.props
        dispatch({
            type: `${namespace}/fetchById`,
            payload: { id: record.id },
            callback: (res: CarInfoType) => {
                dispatch({
                    type: `${namespace}/updateStore`,
                    payload: {
                        currentCar: res,
                        formType: 'detail'
                    }
                })
            }
        })
    }

    del = (id: number) => {
        const { dispatch } = this.props
        dispatch({
            type: `${namespace}/delById`,
            payload: { id }
        })
    }

    handleClick = () => {
        const { dispatch } = this.props
        dispatch({
            type: `${namespace}/updateStore`,
            payload: {
                formType: 'add'
            }
        })
    }

    render() {
        const { dispatch, Car } = this.props
        const { formType, cars, tableOption, currentCar } = Car

        const carFormProps = {
            currentCar,
            formType: formType,
            handleSubmit: (values: FormType) => {
                if (formType === 'add') {
                    dispatch({
                        type: `${namespace}/addCar`,
                        payload: {
                            carInfo: values
                        }
                    })
                } else if (formType === 'edit') {
                    dispatch({
                        type: `${namespace}/editCar`,
                        payload: {
                            carInfo: values
                        }
                    })
                }
            },
            handleCancel: () => {
                dispatch({
                    type: `${namespace}/updateStore`,
                    payload: {
                        formType: '',
                        currentCar: {}
                    }
                })
            }
        }

        const detailFormProps = {
            current: currentCar,
            handleCancel: () => {
                dispatch({
                    type: `${namespace}/updateStore`,
                    payload: {
                        formType: '',
                        currentCar: {}
                    }
                })
            }
        }

        const tableProps = {
            rowKey: 'id',
            columns: this.columns,
            dataSource: cars,
            pagination: tableOption,
            onChange: (pagination: any) => {
                dispatch({
                    type: `${namespace}/fetchCar`,
                    payload: {
                        paginationOption: pagination
                    }
                })
                dispatch({
                    type: `${namespace}/updateStore`,
                    payload: {
                        paginationOption: pagination
                    }
                })
            }
        }

        return (
            <div className={styles.container}>
                <Row gutter={[8, 32]} type="flex" justify="end">
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <Button type="primary" size="large" onClick={this.handleClick}>新增车辆</Button>
                    </Col>
                </Row>
                <Row gutter={[8, 32]}>
                    <Col>
                        <Table {...tableProps} />
                    </Col>
                </Row>
                {formType !== '' && formType !== 'detail' && <CarForm {...carFormProps}></CarForm>}
                {formType === 'detail' && <DetailForm {...detailFormProps} />}
            </div>
        )
    }
}

export default connect(({ carMod }: { carMod: CarModelState }) => ({
    Car: carMod,
}))(Car);