import { getObjectsFromModel, isVisualisationObject } from './objects'

let setupDropdownHelper = function () {
  if (typeof mstrmojo.plugins.attachedListeners == "undefined") {
    mstrmojo.plugins.attachedListeners = {}
  }
  if (typeof mstrmojo.plugins.attachedListeners.references == 'undefined') {
    mstrmojo.plugins.attachedListeners.references = {}
  }
}

let getDropdownValue = function (d) {
  return typeof d.getSelectedItem === 'function' ? (d.getSelectedItem() ? d.getSelectedItem().n : undefined) : undefined
}

let setDropdownIndex = function (d, idx) {
  let list = d.getPopupList()
  list.render()
  list.itemsContainerNode.children[idx].click()
}

let setDropdownsByIdAndIndex = function (id, index) {
  getObjectsFromModel('mstrmojo.ui.Pulldown').filter(function (e) {
    return isVisualisationObject(e) && e.parent.defn.srcid === id
  }).forEach(function (d) {
    setDropdownIndex(d, index)
  })
}

let attachDropDownListener = function (d, func) {
  if (!mstrmojo.plugins.attachedListeners.references.hasOwnProperty(d.id)) {
    mstrmojo.plugins.attachedListeners.references[d.id] = d.attachEventListener("renderComplete", null, func)
  }
}

let dropDownListenerWrapper = function (func) {
  return function (msg) {
    if (msg.src) {
      func(msg.src)
    }
  }
}

let propagateDropDownValueToSpans = function (d) {
  var replacementValue = getDropdownValue(d)
  var attributesToProcess = mstrmojo.plugins.attachedListeners.attributesToProcess
  var srcid = d.parent.defn.srcid
  if (replacementValue && attributesToProcess[srcid]) {
    var parentPanel = getParentPanel(d)
    replaceSpans(parentPanel.domNode, attributesToProcess[srcid], replacementValue)
  }
}

export {
  attachDropDownListener,
  dropDownListenerWrapper,
  getDropdownValue,
  propagateDropDownValueToSpans,
  setDropdownIndex,
  setDropdownsByIdAndIndex,
  setupDropdownHelper
}