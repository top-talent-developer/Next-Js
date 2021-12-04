import appReducer from './appReducer';

const rootReducer = (state, action) => {
	if (action.type === 'USER_LOGOUT') {
		return appReducer(undefined, action)
	}
	return appReducer(state, action)
}

export default rootReducer;
