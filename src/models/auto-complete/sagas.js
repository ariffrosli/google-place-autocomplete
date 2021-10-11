import { put, takeEvery, call, all } from 'redux-saga/effects';
import { SAVE_PLACE } from './actionConstant'

function* handler() {
    yield takeEvery(SAVE_PLACE, storeNewPlaces);
    // yield takeEvery('REMOVE_PLACES', removePlaces);
}

function* storeNewPlaces(action) {
    console.log('try')
    try {
        yield put({ type: SAVE_PLACE, payload: action.payload });
    } catch (err) {
        // Do nothing atm
    }
}


function* removePlaces(action) {
    try {
        yield put({ type: 'REMOVE_PLACES', payload: action.payload });
    } catch (err) {
        // Do nothing atm      
    }
}


export { handler };