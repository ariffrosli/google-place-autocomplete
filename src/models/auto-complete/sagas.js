import { put, takeEvery, call, all } from 'redux-saga/effects';
import { SAVE_PLACE, SAVE_PLACE_SUCCESS, REMOVE_PLACE, REMOVE_PLACE_SUCCESS } from './actionConstant'

function* handler() {
    yield takeEvery(SAVE_PLACE, storeNewPlaces);
    yield takeEvery(REMOVE_PLACE, removePlaces);
}

function* storeNewPlaces(action) {
    try {
        yield put({ type: SAVE_PLACE_SUCCESS, payload: action.payload });
    } catch (err) {
        // Do nothing atm
    }
}

function* removePlaces(action) {
    try {
        yield put({ type: REMOVE_PLACE_SUCCESS, payload: action.payload });
    } catch (err) {
        // Do nothing atm      
    }
}


export { handler };