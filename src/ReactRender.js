import { reconcile } from './ReactReconcile'

let rootInstance = null

export function render(element, container) {
  console.log('element is:', element)
  const prevInstance = rootInstance
  console.log('prevInstance is:', prevInstance)
  const nextInstance = reconcile(container, prevInstance, element)
  console.log('nextInstance is:', nextInstance)
  rootInstance = nextInstance
}
