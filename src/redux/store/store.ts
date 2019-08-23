import {createStore} from 'redux';
import {preloaderReducer} from '../reducers';

export const store = createStore(preloaderReducer);

