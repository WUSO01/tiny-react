export function updateDomPorperties(dom, prevProps, nextProps) {
  const isEvent = name => name.startsWith('on')
  const isAttribute = name => !isEvent(name) && name != 'children'

  // 移除事件
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })

  // 移除属性
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach(name => (dom[name] = null))

  // 添加事件和属性
  Object.keys(nextProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name])
    })
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach(name => (dom[name] = nextProps[name]))
}
