import { createContext } from 'react';

export const AuthContext = createContext({
	authStore: null,
	authAction: () => {},
});
