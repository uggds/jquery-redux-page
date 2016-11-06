import { AccordionsView } from './accordions'
import store from './store'
import { set } from './actions'

export class AccordionsViewContainer extends AccordionsView {
  constructor(variables, store) {
    super(variables)
    this.setCheckList = function(checkList) {
      return store.dispatch(set(checkList))
    }
  }
}

