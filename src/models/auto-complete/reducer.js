import uuid from 'react-native-uuid';
import { ToastAndroid, Alert } from 'react-native';
import { SAVE_PLACE_SUCCESS, REMOVE_PLACE_SUCCESS } from './actionConstant';

const showNewPlaceToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}

const initialState = {
    searchItems: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_PLACE_SUCCESS: {
            const { name } = action.payload;
            return {
                ...state,
                searchItems: [...state.searchItems, 
                    {
                        id: uuid.v4(),
                        name: name
                    }
                ]
            };
        }
        
        case REMOVE_PLACE_SUCCESS: {
            const { id } = action.payload.item;
            let originalList =  [...state.searchItems];
            let indexToRmove = originalList.findIndex(x => { return x.id === id });

            if (indexToRmove !== -1 && originalList.length > 0){
                showNewPlaceToast("Place was deleted..");
                return {
                    ...state,
                    searchItems: [...state.searchItems.slice(0, indexToRmove), ...state.searchItems.slice(indexToRmove + 1)],
                };
            }
        }

        default:
            return state;
    }
}

export { reducer };