import { call, put, select } from "redux-saga/effects";
import api from "../../services/api";

import { Actions as reducersActions } from "../ducks/reducers";

export function* addRepo(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.repository}`);

    const isDuplicated = yield select(state =>
      state.reducers.repos.find(repository => repository.id === data.id)
    );

    if (isDuplicated) {
      yield put(reducersActions.addRepositoryFailure("Usuário Duplicado"));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.name,
        login: data.login,
        avatar: data.avatar_url,
        url: data.html_url
      };
      yield put(
        reducersActions.addRepositorySuccess(
          repositoryData,
          action.payload.lat,
          action.payload.long
        )
      );
    }
  } catch (err) {
    yield put(reducersActions.addRepositoryFailure("Usuário não encontrado"));
  }
}
