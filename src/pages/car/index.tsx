import React, { Component } from 'react'
import { Dispatch, AnyAction } from 'redux'
import { connect } from 'dva'
import { Row, Col, Table, Divider, Button } from 'antd'
import { ColumnProps } from 'antd/es/table'

import { CarModelState } from './models/carMod'
import styles from './style.less'
import CarForm from './components/Form'
import { FormType } from './car' 

const namespace: string = 'carMod'

interface carProps {
    dispatch: Dispatch<AnyAction>
    Car: CarModelState
}

interface carState {
    name: string,
}

interface CarInfo {
    key: number,
    carType: string
    render?: React.ReactDOM
}

const data: CarInfo[] = [
    {
      key: 1,
      carType: '本田',
    },
    {
      key: 2,
      carType: '丰田',
    },
];
  
  const columns: ColumnProps<CarInfo>[] = [
    {
      title: '车型',
      dataIndex: 'carType',
      key: 'carType',
    },
    {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text, record) => (
            <span>
                <a>编辑</a>
                <Divider type="vertical" />
                <a>删除</a>
            </span>
        )
    },
  ];

class Car extends Component<carProps, carState> {
    state: carState = {
        name: 'car'
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: `${namespace}/fetchCar`
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
        const { formType } = Car

        const carFormProps = {
            formType: formType,
            handleSubmit: (values: FormType) => {
                dispatch({
                    type: `${namespace}/addCar`,
                    payload: {
                        addInfo: values
                    }
                })
            },
            handleCancel: () => {
                dispatch({
                    type: `${namespace}/updateStore`,
                    payload: {
                        formType: ''
                    }
                })
            }
        }

        return (
            <div className={styles.container}>
                <Row gutter={[8, 32]} type="flex" justify="end">
                    <Col span={4} style={{textAlign: 'right'}}>
                        <Button type="primary" size="large" onClick={this.handleClick}>新增车辆</Button>
                    </Col>
                </Row>
                <Row gutter={[8, 32]}>
                    <Col>
                        <Table dataSource={data} columns={columns} />
                    </Col>
                </Row>
                <CarForm {...carFormProps}></CarForm>
            </div>
        )
    }
}

export default connect(({ carMod }: { carMod: CarModelState}) => ({
    Car: carMod,
}))(Car);