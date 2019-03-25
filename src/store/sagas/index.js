import { all, takeLatest } from 'redux-saga/effects';

import { Types as AnnotationTypes } from '~/store/ducks/annotations';
import { getAnnotationsRequest, addAnnotationRequest } from './annotations';

export default function* rootSaga() {
  return yield all([
    takeLatest(AnnotationTypes.GET_REQUEST, getAnnotationsRequest),
    takeLatest(AnnotationTypes.ADD_REQUEST, addAnnotationRequest),
  ]);
}
