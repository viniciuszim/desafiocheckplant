import { all, spawn, takeLatest } from 'redux-saga/effects';

import { startWatchingNetworkConnectivity } from './offline';

import { Types as AnnotationTypes } from '~/store/ducks/annotations';
import { addAnnotationRequest } from './annotations';

export default function* rootSaga() {
  return yield all([
    spawn(startWatchingNetworkConnectivity),
    takeLatest(AnnotationTypes.ADD_REQUEST, addAnnotationRequest),
  ]);
}
