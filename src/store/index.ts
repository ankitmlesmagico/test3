import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/test/counter';
import authReducer from './features/auth/authslice';
import { apiSlice } from './features/apis/apiSlice';
import stepperReducer from './features/stepper/stepperSlice';

export const store = configureStore({
  reducer: {
    stepper: stepperReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: counterReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these specific action types
        ignoredActions: ['stepper/setPreviewData'],
        ignoredPaths: ['stepper.previewData'],
      },
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
