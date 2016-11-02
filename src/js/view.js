import $ from 'jquery'
import jade from 'jade'

export default class {

  constructor() {
    this.components = {}
  }
  mount(target, component, variables) {
    let fuga = ''
    Object.keys(this.components).map( (key) => {
      if (component.template.search(key) !== -1 ) {
        const position = component.template.search(key)
        let indent = ''
        for (let i = 1 ; i < component.template.length ; ++i ) {
          if (!component.template.substring(position - i, position).match(/\n/)) {
            indent = indent + ' '
          }
        }
        const hoge = this.components[key].replace(/\n/g,`\n${indent}`)
        fuga = component.template.replace(key, hoge)
      }
    })
    $(target).append(jade.render(fuga, variables));
  }
  component(el, component) {
    this.components[el] = component.template
  }
}
