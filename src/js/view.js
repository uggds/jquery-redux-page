import jade from 'jade'

export default class {

  constructor() {
    this.childrenComponents = {}
    this.router = false
  }

  mount($target, component, variables) {
    // dom append
    $target.append(this._build(component.template, variables))
    // event resistration
   new component(variables)

    //if (this.router) {
    //  component.setRouter(this.router)
    //}
  }

  _build(template, variables) {
    Object.keys(this.childrenComponents).map((key) => {
      if (template.search(key) === -1 ) {
        return
      }
      const position = template.search(key)
      let indent = ''
      for (let i = 1 ; i < template.length ; ++i ) {
        if (!template.substring(position - i, position).match(/\n/)) {
          indent = indent + ' '
        }
      }
      const hoge = this.childrenComponents[key].replace(/\n/g,`\n${indent}`)
      template = template.replace(key, hoge)
    })
    return jade.render(template, variables)
  }
  setChildComponent(el, component) {
    this.childrenComponents[el] = component.template
  }
  setRouter(router) {
     this.router = router
  }
}
