import { createSlice } from '@reduxjs/toolkit';

export const loginModalSlice = createSlice({
	name: 'loginModal',
	initialState: {
		show: false,
	},
	reducers: {
		showLoginModal: (state, action) => {
			state = {
				...state,
				show: true,
			};
		
			return state;
		},
		closeLoginModal: (state, action) => {
			state = {
				...state,
				show: false,
			};
		
			return state;
		}
	},
});

export const { showLoginModal, closeLoginModal } = loginModalSlice.actions;

export const isShowLoginModal = (state) => state.loginModal.show;