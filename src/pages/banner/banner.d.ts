import { Effect } from 'dva'
import { Reducer } from 'redux'

interface BannerAttribute {
    id: number
    target: string
    imageUrl: string
    title: string
    [propName: string]: any
}

interface TableOption {
    pageSize: number
    current: number
    total: number
}

export interface PaginationOption {
    pageSize: number,
    currentPage: number,
}

export interface BannerState {
    banners: BannerAttribute[]
    tableOption: TableOption
    current: peopleAttribute
}