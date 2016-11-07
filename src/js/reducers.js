import { handleActions } from 'redux-actions'

const reducer = handleActions({
  SET_LIST: (state, action) => (Object.assign({}, ...state, { checkList: action.payload.checkList })),
  SET_PAGE: (state, action) => (Object.assign({}, ...state, { page: action.payload.page })),
}, { checkList: [], page: '' })

export default reducer

