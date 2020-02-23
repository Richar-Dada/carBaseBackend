import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import { Dispatch, AnyAction } from 'redux'
import { Row, Col, Table, Divider, Button, Popconfirm } from 'antd'
import { ColumnProps } from 'antd/es/table'

import { BannerState, BannerAttribute } from '@/pages/banner/banner'
import styles from './style.less'
import CuForm from '@/pages/banner/components/CuForm'

interface BannerProps {
    dispatch: Dispatch<AnyAction>
    banner: BannerState
}

const namespace: string = 'bannerMod'

const Banner: React.SFC<BannerProps> = ({
    dispatch,
    banner
}) => {
    const { tableOption, current, banners } = banner

    const [formType, setFormType] = useState('')

    const columns: ColumnProps<BannerAttribute>[] = [
        {
            title: '目标地址',
            dataIndex: 'target',
            key: 'target',
        },
        {
            title: 'Banner图路径',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (text, record) => (
                <span>
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

    const edit = (record: BannerAttribute) => {
        dispatch({
            type: `${namespace}/fetchById`,
            payload: { id: record.id },
            callback: (res: BannerAttribute) => {
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

    const del = (id: number) => {
        dispatch({
            type: `${namespace}/delById`,
            payload: { id }
        })
    }

    const tableProps = {
        columns,
        rowKey: 'id',
        dataSource: banners,
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
        handleSubmit: (values: BannerAttribute) => {
            if (formType === 'create') {
                dispatch({
                    type: `${namespace}/add`,
                    payload: { bannerAttribute: values },
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

    useEffect(() => {
        dispatch({ type: `${namespace}/fetch` })
    }, [])

    return (
        <div className={styles.container}>
            <Row gutter={[8, 32]} type="flex" justify="end">
                <Col span={4} style={{ textAlign: 'right' }}>
                    <Button type="primary" size="large" onClick={handleClick}>新增Banner</Button>
                </Col>
            </Row>
            <Row gutter={[8, 32]}>
                <Col>
                    <Table {...tableProps} />
                </Col>
            </Row>
            {formType !== '' && <CuForm {...cuFormProps}></CuForm>}
        </div>
    )
}

export default connect(({ bannerMod }: { bannerMod: BannerState }) => ({ banner: bannerMod }))(Banner);