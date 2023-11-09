import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: JSON.parse(localStorage.getItem('auth')) || null,
	},
	reducers: {
		saveUser: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			console.log(action, ' save user');
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
