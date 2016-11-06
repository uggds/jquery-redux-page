import { handleActions } from 'redux-actions'

const reducer = handleActions({
  GET: (state, action) => ({
    checkList: state
  }),
  SET: (state, action) => ({
    checkList: action.payload.checkList
  }),
}, { checkList: [] })

export default reducer

