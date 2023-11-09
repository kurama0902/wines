import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';

export default configureStore({
	reducer: {
		[authSlice.name]: authSlice.reducer,
	},
});
