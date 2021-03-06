import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import { Dispatch, AnyAction } from 'redux'
import { Row, Col, Table, Divider, Button, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/es/table'

import { PeopleModel } from '@/pages/people/models/peopleMod'
import { PeopleState, PeopleAttribute } from '@/pages/people/people'
import styles from './style.less'
import CuForm from '@/pages/people/components/CuForm'
import DetailFrom from '@/pages/people/components/DetailForm'

interface PeopleProps {
    dispatch: Dispatch<AnyAction>
    people: PeopleState
}

const namespace: string = 'peopleMod'

const People: React.SFC<PeopleProps> = ({
    dispatch,
    people
}) => {
    const { tableOption, current, peoples } = people

    const [formType, setFormType] = useState('')

    const columns: ColumnProps<PeopleAttribute>[] = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '已激活',
            dataIndex: 'isActive',
            key: 'isActive',
        },
        {
            title: '激活码',
            dataIndex: 'activeCode',
            key: 'activeCode',
        },
        {
            title: '微信名',
            dataIndex: 'wxName',
            key: 'wxName',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <span>
                    <a onClick={() => detail(record)}>详情</a>
                    <Divider type="vertical" />
                    <a onClick={() => edit(record)}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="确定删除？"
                        okText="是"
                        cancelText="否"
                        onConfirm={() => del(record.id as number)}
                    >
                        <a >删除</a>
                    </Popconfirm>
                </span>
            )
        },
    ]

    const handleClick = () => {
        setFormType('create')
    }

    const edit = (record: PeopleAttribute) => {
        dispatch({
            type: `${namespace}/fetchById`,
            payload: { id: record.id },
            callback: (res: PeopleAttribute) => {
                dispatch({
                    type: `${namespace}/updateStore`,
                    payload: {
                        current: res
                    }
                })
                setFormType('edit')
            }
        })
    }

    const detail = (record: PeopleAttribute) => {
        dispatch({
            type: `${namespace}/fetchById`,
            payload: { id: record.id },
            callback: (res: PeopleAttribute) => {
                dispatch({
                    type: `${namespace}/updateStore`,
                    payload: {
                        current: res
                    }
                })
                setFormType('detail')
            }
        })
    }

    const del = (id: number) => {
        dispatch({
            type: `${namespace}/delById`,
            payload: { id }
        })
    }

    const tableProps = {
        columns,
        rowKey: 'id',
        dataSource: peoples,
        pagination: tableOption,
        onChange: (pagination: any) => {
            dispatch({
                type: `${namespace}/fetch`,
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

    const cuFormProps = {
        formType,
        current,
        handleCancel: () => {
            setFormType('')
            dispatch({
                type: `${namespace}/updateStore`,
                payload: {
                    current: {}
                }
            })
        },
        handleSubmit: (values: PeopleAttribute) => {
            if (formType === 'create') {
                dispatch({
                    type: `${namespace}/add`,
                    payload: { peopleAttribute: values },
                    callback: () => {
                        setFormType('')
                        dispatch({ type: `${namespace}/fetch` })
                    }
                })
            } else if (formType === 'edit') {
                dispatch({
                    type: `${namespace}/edit`,
                    payload: { peopleAttribute: values },
                    callback: () => {
                        setFormType('')
                        dispatch({ type: `${namespace}/fetch` })
                        dispatch({
                            type: `${namespace}/updateStore`,
                            payload: {
                                current: {}
                            }
                        })
                    }
                })
            }
        }
    }

    const detailProps = {
        current,
        handleCancel: () => {
            setFormType('')
            dispatch({
                type: `${namespace}/updateStore`,
                payload: {
                    current: {}
                }
            })
        }
    }

    useEffect(() => {
        dispatch({ type: `${namespace}/fetch` })
    }, [])

    return (
        <div className={styles.container}>
            <Row gutter={[8, 32]} type="flex" justify="end">
                <Col span={4} style={{ textAlign: 'right' }}>
                    <Button type="primary" size="large" onClick={handleClick}>新增用户</Button>
                </Col>
            </Row>
            <Row gutter={[8, 32]}>
                <Col>
                    <Table {...tableProps} />
                </Col>
            </Row>
            {formType !== '' && formType !== 'detail' && <CuForm {...cuFormProps}></CuForm>}
            {formType === 'detail' && <DetailFrom {...detailProps}></DetailFrom>}
        </div>
    )
}

export default connect(({ peopleMod }: { peopleMod: PeopleState }) => ({ people: peopleMod }))(People);