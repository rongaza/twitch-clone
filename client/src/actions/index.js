import streams from '../apis/streams';
import history from '../history';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
} from '../actions/types';

export const signIn = userId => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};
// action creators using RESTful conventions
// async action creator requires redux-thunk

// create a record
export const createStream = formValues => {
	// when returning a function from an action creator
	// function gets automatically called from redux-thunk with two arguments
	// dispatch() and getState()
	return async (dispatch, getState) => {
		const { userId } = getState().auth;
		// const { userId } = getState.auth;
		// adding new item to api with post
		const response = await streams.post('/streams', { ...formValues, userId });

		dispatch({ type: CREATE_STREAM, payload: response.data });
		history.push('/');
	};
};

// fetch a list of records
export const fetchStreams = () => async dispatch => {
	const response = await streams.get('/streams');

	dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// fetch a record
export const fetchStream = id => async dispatch => {
	const response = await streams.get(`/streams/${id}`);

	dispatch({ type: FETCH_STREAM, payload: response.data });
};

// edit a record using patch
export const editStream = (id, formValues) => async dispatch => {
	const response = await streams.patch(`/streams/${id}`, formValues);

	dispatch({ type: EDIT_STREAM, payload: response.data });
	history.push('/');
};

// delete a record
export const deleteStream = id => async dispatch => {
	await streams.delete(`/streams/${id}`);

	dispatch({ type: DELETE_STREAM, payload: id });
	history.push('/');
};
