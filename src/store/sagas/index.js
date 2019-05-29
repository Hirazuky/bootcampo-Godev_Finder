import { all, takeLatest } from "redux-saga/effects";

import { Types as callTypes } from "../ducks/reducers";
import { addRepo } from "./saga";

export default function* rootSaga() {
  //Pega apenas a ultima requisição enviada pelo usuário
  yield all([takeLatest(callTypes.ADD_REQUEST, addRepo)]);
}
