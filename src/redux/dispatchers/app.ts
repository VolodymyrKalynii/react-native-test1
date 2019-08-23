import {store} from '../store';

import {changeMode as action} from '../actions';

const {dispatch:d} = store;

export const changeMode = (mode:string) => {
    const act = action(mode);

    d(act);
};