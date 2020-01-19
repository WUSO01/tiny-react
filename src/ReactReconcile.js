import { updateDomPorperties } from './ReactUpdateDomProperties'

function instantiate(element) {
  const { type, props } = element
  const isDomElement = typeof type === 'string'
  if (isDomElement) {
    const isTextElement = type === 'TEXT_ELEMENT'
    const dom = isTextElement
      ? document.createTextNode('')
      : document.createElement(type)

    updateDomPorperties(dom, [], props)

    const childElements = props.children || []
    const childInstances = childElements.map(instantiate)
    const childDoms = childInstances.map(childInstance => childInstance.dom)
    childDoms.forEach(childDom => dom.appendChild(childDom))

    const instance = { dom, element, childInstances }

    return instance
  } else {
    const instance = {}
    const publicInstance = createPubilcInstance(element, instance)
    const childElement = publicInstance.render()
    const childInstance = instantiate(childElement)
    const dom = childInstance.dom

    Object.assign(instance, { dom, element, childInstance, publicInstance })
    return instance
  }
}

function reconcileChildren(instance, element) {
  const { dom, childInstances } = instance
  const nextChildElements = element.props.children || []
  const newChildInstances = []
  const count = Math.max(childInstances.length, nextChildElements.length)
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i]
    const childElement = nextChildElements[i]
    const newChildInstance = reconcile(dom, childInstance, childElement)
    newChildInstances.push(newChildInstance)
  }
  return newChildInstances
}

function createPubilcInstance(element, internalInstance) {
  const { type, props } = element
  const publicInstance = new type(props)
  publicInstance.__internalInstance = internalInstance
  return publicInstance
}

export function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentDom
  const element = internalInstance.element
  reconcile(parentDom, internalInstance, element)
}

export function reconcile(parentDom, instance, element) {
  if (instance === null) {
    // Create instance
    const newInstance = instantiate(element)
    parentDom.appendChild(newInstance.dom)
    return newInstance
  } else if (element === null) {
    parentDom.removeChild(instance.dom)
    return null
  } else if (instance.element.type !== element.type) {
    const newInstance = instantiate(element)
    parentDom.replaceChild(newInstance.dom, instance.dom)
    return newInstance
  } else if (typeof element.type === 'string') {
    // Update instance
    updateDomPorperties(instance.dom, instance.element.props, element.props)
    instance.childInstances = reconcileChildren(instance, element)
    instance.element = element
    return instance
  } else {
    // Update composite instance
    instance.publicInstance.props = element.props
    const childElement = instance.publicInstance.render()
    const oldChildInstance = instance.childInstance
    const childInstance = reconcile(parentDom, oldChildInstance, childElement)
    instance.dom = childInstance.dom
    instance.childInstance = childInstance
    instance.element = element
    return instance
  }
}
