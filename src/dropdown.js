import { getObjectsFromModel, isVisualisationObject, getParentPanel } from './objects'
import { replaceSpans } from './selector'

export function setupDropdownHelper () {
  if (mstrmojo.plugins.attachedListeners === undefined) {
    mstrmojo.plugins.attachedListeners = {}
  }
  if (mstrmojo.plugins.attachedListeners.references === undefined) {
    mstrmojo.plugins.attachedListeners.references = {}
  }
}

export function getDropdownValue (d) {
  return typeof d.getSelectedItem === 'function' ? (d.getSelectedItem() ? d.getSelectedItem().n : undefined) : undefined
}

export function setDropdownIndex (d, idx) {
  let list = d.getPopupList()
  list.render()
  list.itemsContainerNode.children[idx].click()
}

export function setDropdownsByIdAndIndex (id, index) {
  getObjectsFromModel('mstrmojo.ui.Pulldown').filter(function (e) {
    return isVisualisationObject(e) && e.parent.defn.srcid === id
  }).forEach(function (d) {
    setDropdownIndex(d, index)
  })
}

export function attachDropDownListener (d, func) {
  if (!mstrmojo.plugins.attachedListeners.references.hasOwnProperty(d.id)) {
    mstrmojo.plugins.attachedListeners.references[d.id] = d.attachEventListener('renderComplete', null, func)
  }
}

export function dropDownListenerWrapper (func) {
  return function (msg) {
    if (msg.src) {
      func(msg.src)
    }
  }
}

export function propagateDropDownValueToSpans (d) {
  var replacementValue = getDropdownValue(d)
  var attributesToProcess = mstrmojo.plugins.attachedListeners.attributesToProcess
  var srcid = d.parent.defn.srcid
  if (replacementValue && attributesToProcess[srcid]) {
    var parentPanel = getParentPanel(d)
    replaceSpans(parentPanel.domNode, attributesToProcess[srcid], replacementValue)
  }
}
