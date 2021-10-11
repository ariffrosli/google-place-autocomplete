import { SAVE_PLACE, REMOVE_PLACE } from "./actionConstant";

export const savePlaces = (content) => ({
    type: SAVE_PLACE,
    payload: {
        name: content.term
    }
});

export const removePlaces = (content) => ({
    type: REMOVE_PLACE,
    payload: content
});