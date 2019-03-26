import { AsyncStorage } from 'react-native';

import { call, put } from 'redux-saga/effects';
import api from '~/services/api';

import { Creators as AnnotationActions } from '~/store/ducks/annotations';

import stringsUtil from '~/util/strings';

export function* addAnnotationRequest(action) {
  try {
    const { annotation } = action.payload;

    const response = yield call(
      api.post,
      '/472009/09rj5z/?email_key=vinicius.miguel182@gmail.com',
      {
        latitude: annotation.coordinate.latitude,
        longitude: annotation.coordinate.longitude,
        annotation: annotation.description,
        datetime: annotation.date,
      },
    );

    if (response !== null && response.status === 200) {
      try {
        let notes = yield AsyncStorage.getItem(stringsUtil.storage.markersSynchronized);
        if (notes !== null) {
          notes = JSON.parse(notes);
        } else {
          notes = [];
        }

        notes = [...notes, annotation];

        // Adiciona a nova entrada que foi sincronizada no storage de itens sincronizados
        yield AsyncStorage.setItem(stringsUtil.storage.markersSynchronized, JSON.stringify(notes));

        // Remove esse item, caso estava como não sincronizado e foi feita a sincronização
        const notSyncsJSON = yield AsyncStorage.getItem(stringsUtil.storage.markersNotSynchronized);
        if (notSyncsJSON !== null) {
          const notSyncsArray = JSON.parse(notSyncsJSON);
          const altered = notSyncsArray.filter(e => e.id !== annotation.id);
          AsyncStorage.setItem(stringsUtil.storage.markersNotSynchronized, JSON.stringify(altered));
        }

        yield put(AnnotationActions.addAnnotationSuccess(annotation));
      } catch (error) {
        if (__DEV__) {
          console.tron.error(error);
        }
      }
    }
  } catch (error) {
    yield put(
      AnnotationActions.addAnnotationError('Ocorreu um erro ao adicionar uma nova anotação!'),
    );
  }
}
