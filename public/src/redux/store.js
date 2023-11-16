import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { loginModalSlice } from './slices/loginModalSlice';

export default configureStore({
	reducer: {
		[authSlice.name]: authSlice.reducer,
		[loginModalSlice.name]: loginModalSlice.reducer,
	},
});
