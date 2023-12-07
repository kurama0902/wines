import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: JSON.parse(localStorage.getItem('auth')) || null,
	},
	reducers: {
		saveUser: (state, action) => {
			state = {
        ...state,
				user: action.payload,
			};
			localStorage.setItem('auth', JSON.stringify(action.payload));

      return state
		},
		deleteUser: (state, action) => {
			state = {
				...state,
				user: null,
			};

			console.log(action, ' delete user');

			localStorage.removeItem('auth');

      return state
		},
	},
});
