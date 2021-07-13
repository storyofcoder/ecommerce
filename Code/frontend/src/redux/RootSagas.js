import { fork } from 'redux-saga/effects';
import { Home } from "./home/Dispatch";
import { Dashboard } from "./dashboard/Dispatch";
import { Header } from "./header/Dispatch";
import { User } from "./user/Dispatch";

export default function* rootSaga() {
  yield fork(Header)
  yield fork(Home)
  yield fork(Dashboard)
  yield fork(User)
}