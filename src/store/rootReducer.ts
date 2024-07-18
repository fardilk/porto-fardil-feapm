import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import config from './slices/config';

export const rootPersist = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
};

export const rootReducer = combineReducers({
  config,
});
