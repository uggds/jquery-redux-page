import jade from 'jade'

export default class {

  constructor() {
    this.components = {}
  }

  mount($target, component, variables) {
    // dom append
    $target.append(this._build(component.template, variables))
    // event resistration
    new component(variables)
  }

  _build(template, variables) {
    Object.keys(this.components).map((key) => {
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
      const hoge = this.components[key].replace(/\n/g,`\n${indent}`)
      template = template.replace(key, hoge)
    })
    return jade.render(template, variables)
  }
  component(el, component) {
    this.components[el] = component.template
  }
}
