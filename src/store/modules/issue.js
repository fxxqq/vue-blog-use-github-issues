import { makeAction } from '../util'

const SET_LABELS = 'SET_LABELS'
const SET_ACTIVE_LABEL = 'SET_ACTIVE_LABEL'
const SET_WED_META = 'SET_WED_META'

const state = {
  labels: [],
  activeLabel: null
}

const mutations = {
  [SET_LABELS](state, labels) {
    state.labels = labels
  },
  [SET_ACTIVE_LABEL](state, label) {
    if ((state.activeLabel && label && label.name === state.activeLabel.name) || (!state.activeLabel && !label)) {
      return
    }

    state.activeLabel = label
  },
  [SET_WED_META](state, label) {
    console.log("SET_WED_META", state, label)
    document.title = `${label.title}`;
    document.querySelector('meta[name="keywords"]').setAttribute('content', label.keywords)
    document.querySelector('meta[name="description"]').setAttribute('content', label.description)
  }
}

const actions = {
  setLabels: makeAction(SET_LABELS),
  updateActiveLabel: makeAction(SET_ACTIVE_LABEL),
  setWebMeta: makeAction(SET_WED_META)
}

const getters = {
  labels(state) {
    return state.labels
  },
  activeLabel(state) {
    return state.activeLabel
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
