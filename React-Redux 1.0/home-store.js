import { createStore, combineReducers } from 'redux';
import { featureReducer } from './feature-reducer.js';

const reducers = {
	feature: featureReducer
};

export const store = createStore(combineReducers(reducers));
