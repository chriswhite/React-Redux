export const featureReducer = function(state = { name: '', email: '', response: '' }, action) {

	switch(action.type) {

		case 'FEATURE_FORM_CHANGED':

			const target = action.target;
			const name = target.name;
			const value = target.type == 'checkbox' ? target.checked : target.value;

			return Object.assign({}, state, { [name]: value });

		case 'FEATURE_SERVICE_RESPONDED':

			return Object.assign({}, state, { response: action.response });

	}

	return state;

}
