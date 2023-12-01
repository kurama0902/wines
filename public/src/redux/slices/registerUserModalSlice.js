import { createSlice } from '@reduxjs/toolkit';

export const registerUserModalSlice = createSlice({
	name: 'registerUserModal',
	initialState: {
		show: false,
	},
	reducers: {
		showRegisterUserModal: (state, action) => {
			state = {
				...state,
				show: true,
			};
		
			return state;
		},
		closeRegisterUserModal: (state, action) => {
			state = {
				...state,
				show: false,
			};
		
			return state;
		}
	},
});

export const { showRegisterUserModal, closeRegisterUserModal } = registerUserModalSlice.actions;

export const isShowRegisterUserModal = (state) => state.registerUserModal.show;