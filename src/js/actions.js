import { createAction } from 'redux-actions'

export const GET = 'GET'
export const SET = 'SET'
export const get = createAction(GET)
export const set = createAction(SET)
