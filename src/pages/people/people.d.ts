import { Effect } from 'dva'
import { Reducer } from 'redux'

interface PeopleAttribute {
    id: number
    role: string
    name: string
    password?: string
    phone: string
    activeCode: string
    wxId: string
    wxName: string
    isActive: number
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

export interface PeopleState {
    peoples: peopleAttribute[]
    tableOption: TableOption
    current: peopleAttribute
}