import {store} from '../store';

import * as actions from '../actions/preloader';

const {dispatch:d} = store;

export const showPreloader = () => {
    const act = actions.showPreloader();

    d(act);
};

export const hidePreloader = () => {
    const act = actions.hidePreloader();

    d(act);
};