import { AsyncStorage } from 'react-native';

import { put, select } from 'redux-saga/effects';
import api from '~/services/api';

import { Creators as AnnotationActions } from '~/store/ducks/annotations';

import stringsUtil from '~/util/strings';

export function* getAnnotationsRequest() {
  try {
    yield AsyncStorage.clear();
    let annotationsSynchronized = yield AsyncStorage.getItem(
      stringsUtil.storage.markersSynchronized,
    );
    if (annotationsSynchronized !== null) {
      annotationsSynchronized = JSON.parse(annotationsSynchronized);
    } else {
      annotationsSynchronized = [];
    }

    let annotationsNotSynchronized = yield AsyncStorage.getItem(
      stringsUtil.storage.markersNotSynchronized,
    );
    if (annotationsNotSynchronized !== null) {
      annotationsNotSynchronized = JSON.parse(annotationsNotSynchronized);
    } else {
      annotationsNotSynchronized = [];
    }

    yield put(
      AnnotationActions.getAnnotationSuccess(annotationsSynchronized, annotationsNotSynchronized),
    );
  } catch (error) {
    yield put(AnnotationActions.getAnnotationError('Ocorreu um erro ao buscar no storage'));
  }
}

export function* addAnnotationRequest(action) {
  try {
    const { annotation } = action.payload;

    const hasInternet = false;

    if (hasInternet) {
      try {
        let notes = yield AsyncStorage.getItem(stringsUtil.storage.markersSynchronized);
        if (notes !== null) {
          notes = JSON.parse(notes);
        } else {
          notes = [];
        }

        annotation.id = notes.length;
        notes = [...notes, annotation];

        yield AsyncStorage.setItem(
          stringsUtil.storage.markersNotSynchronized,
          JSON.stringify(notes),
        );

        yield put(AnnotationActions.addAnnotationSucces(annotation));
      } catch (error) {
        console.tron.error(error);
      }
    } else {
      try {
        let notes = yield AsyncStorage.getItem(stringsUtil.storage.markersNotSynchronized);
        if (notes !== null) {
          notes = JSON.parse(notes);
        } else {
          notes = [];
        }

        annotation.id = notes.length;
        notes = [...notes, annotation];

        yield AsyncStorage.setItem(
          stringsUtil.storage.markersNotSynchronized,
          JSON.stringify(notes),
        );

        yield put(AnnotationActions.addAnnotationFailure(annotation));
      } catch (error) {
        console.tron.error(error);
      }
    }
  } catch (error) {
    yield put(
      AnnotationActions.addAnnotationError('Ocorreu um erro ao adicionar uma nova informação!'),
    );
  }
}
