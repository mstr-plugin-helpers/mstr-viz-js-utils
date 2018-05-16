
export function getObjectName (obj) {
  return obj.hasOwnProperty('defn') && obj.defn.hasOwnProperty('n') ? obj.defn.n : ''
}

export function getObjectsFromModel (scriptClass, name) {
  return Object.values(mstrmojo.all).filter(function (obj) {
    return obj.scriptClass && obj.scriptClass === scriptClass && (getObjectName(obj) === name || !name)
  })
}

export function isDescendantOf (obj, scriptClass) {
  return getAncestors(obj).some(function (ancestor) {
    return ancestor.scriptClass && ancestor.scriptClass === scriptClass
  })
}

export function getParentPanel (obj) {
  return getAncestors(obj).filter(function (o) {
    return o.scriptClass && o.scriptClass === 'mstrmojo.vi.ui.rw.DocVIMainPanel'
  })[0]
}

export function isVisualisationObject (obj) {
  return isDescendantOf(obj, 'mstrmojo.vi.ui.rw.DocVIMainPanel')
}

export function getAncestors (obj) {
  var ancestors = []
  while (obj.parent) {
    obj = obj.parent
    ancestors.push(obj)
  }
  return ancestors
}
