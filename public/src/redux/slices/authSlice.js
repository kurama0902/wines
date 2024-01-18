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
			document.cookie = `auth=${state.user.email}; Max-Age=-1`
			
			state = {
				...state,
				user: null,
			};


			return state;
		},
	},
});
