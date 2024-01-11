import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
	},
	reducers: {
		saveUser: (state, action) => {
			const user = action.payload;
			document.cookie = `auth=${user.email}`;

			state = {
				...state,
				user: user,
			};

			return state;
		},
		deleteUser: (state, action) => {
			state = {
				...state,
				user: null,
			};

			document.cookie = `auth=${state.user.email}; Max-Age=-1`

			return state;
		},
	},
});
