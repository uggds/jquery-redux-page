import { createAction } from 'redux-actions'

export const GET = 'GET'
export const SET_LIST = 'SET_LIST'
export const SET_PAGE = 'SET_PAGE'
export const get = createAction(GET)
export const setList = createAction(SET_LIST)
export const setPage = createAction(SET_PAGE)
