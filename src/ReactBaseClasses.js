import { updateInstance } from './ReactReconcile'

export class Component {
  constructor(props, context) {
    this.props = props
    this.context = context
    this.state = this.state || {}
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState)
    updateInstance(this.__internalInstance)
  }
}
