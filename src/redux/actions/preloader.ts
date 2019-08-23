import {ActionTypes} from '../action-types';

export const showPreloader = () => ({
    type: ActionTypes.SHOW_PRELOADER,
});

export const hidePreloader = () => ({
    type: ActionTypes.HIDE_PRELOADER,
});