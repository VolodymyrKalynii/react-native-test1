import {ActionTypes} from '../action-types';
import {MODES} from '../constants';

const initialState = {
    mode: MODES.ARTICLES
};

export const appReducer = (state = initialState, action:any) => {

    console.log('action.type', action.type);
    // console.log('action.mode', action.payload.mode);

    switch (action.type) {
        case ActionTypes.CHANGE_MODE: {
            return Object.assign({}, state, {mode:action.payload.mode})
        }
        default:
            return state
    }
};