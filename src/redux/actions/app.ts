import {ActionTypes} from '../action-types';

export const changeMode = (mode:string) => ({
    type: ActionTypes.CHANGE_MODE,
    payload: {mode}
});