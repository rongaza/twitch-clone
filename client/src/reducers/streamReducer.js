import { CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		// use spread operator on _.mapKeys
		// mapKeys will iterate over array from payload and map them into object key:value
		case FETCH_STREAMS:
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case FETCH_STREAM:
			// using key interpolation adds key:value pair
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		// use omit from lodash library
		// payload just has id
		case DELETE_STREAM:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
