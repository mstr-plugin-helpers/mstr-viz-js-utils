
let getObjectName = function (obj) {
  return obj.hasOwnProperty('defn') && obj.defn.hasOwnProperty('n') ? obj.defn.n : ''
}

let getObjectsFromModel = function (scriptClass, name) {
  return Object.values(mstrmojo.all).filter(function (obj) {
    return obj.scriptClass && obj.scriptClass === scriptClass && (getObjectName(obj) === name || !name)
  })
}

let isDescendantOf = function (obj, scriptClass) {
  return getAncestors(obj).some(function (ancestor) {
    return ancestor.scriptClass && ancestor.scriptClass === scriptClass
  })
}

let getParentPanel = function (obj) {
  return getAncestors(obj).filter(function (o) {
    return o.scriptClass && o.scriptClass === 'mstrmojo.vi.ui.rw.DocVIMainPanel'
  })[0]
}

let isVisualisationObject = function (obj) {
  return isDescendantOf(obj, 'mstrmojo.vi.ui.rw.DocVIMainPanel')
}

let getAncestors = function (obj) {
  var ancestors = []
  while (obj.parent) {
    obj = obj.parent
    ancestors.push(obj)
  }
  return ancestors
}

export default {
  getObjectName,
  getObjectsFromModel,
  getParentPanel,
  isDescendantOf,
  isVisualisationObject,
  getAncestors
}
