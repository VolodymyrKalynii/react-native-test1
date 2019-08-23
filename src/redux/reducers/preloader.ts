import {ActionTypes} from '../action-types';
import {MODES} from '../constants';

const initialState = {
    isShowingPreloader: true
};

export const preloaderReducer = (state = initialState, action:any) => {
        switch (action.type) {
        case ActionTypes.SHOW_PRELOADER: {
            return Object.assign({}, state, {isShowingPreloader:true})
        }
        case ActionTypes.HIDE_PRELOADER: {
            return Object.assign({}, state, {isShowingPreloader:false})
        }
        default:
            return state
    }
};