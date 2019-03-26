import { combineReducers } from 'redux';

import { reducer as offline } from 'redux-offline-queue';
import annotations from './annotations';

export default combineReducers({
  offline,
  annotations,
});
