import { combineReducers } from 'redux';
import { notifier } from './notifier';
import { product } from './product';

export const appReducer = combineReducers({
  notifier,
  product,
});
