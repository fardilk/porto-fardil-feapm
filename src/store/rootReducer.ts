import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import config from './slices/config';
import app from './slices/app';

export const rootPersist = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
};

export const rootReducer = combineReducers({
  config,
  app,
});
