import { createAction } from 'redux-actions'
import * as api from './api'

const UPDATE_CUSTOM_TAG = 'UPDATE_CUSTOM_TAG'

export const updateCustomTag = createAction(UPDATE_CUSTOM_TAG, api.saveGitstarsGist)
