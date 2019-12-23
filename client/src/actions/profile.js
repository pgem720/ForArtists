import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_PROFILES,
	SEARCH_PROFILE
} from '../actions/types';

export const getUserProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/mypage');
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

export const getProfiles = () => async dispatch => {
	dispatch({ type: CLEAR_PROFILE });

	try {
		const res = await axios.get('/api/profile');

		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const createProfile = (
	data,
	history,
	edit = false
) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post('/api/profile', data, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});

		dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
		if (!edit) {
			history.push('/dashboard');
		}
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

export const addEducation = (data, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.put('/api/profile/education', data, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Education added', 'success'));

		history.push('/dashboard');
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

export const addExperience = (data, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.put('/api/profile/experience', data, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert('Experience added', 'success'));

		history.push('/dashboard');
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

//Delete experience
export const deleteExperience = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Experience deleted', 'success'));
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

//Delete education
export const deleteEducation = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Education deleted', 'success'));
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};

//DELETE ACCOUNT/PROFILE
export const deleteAccount = id => async dispatch => {
	if (window.confirm('Are you sure?')) {
		try {
			await axios.delete('/api/profile/');
			dispatch({
				type: CLEAR_PROFILE
			});
			dispatch({
				type: ACCOUNT_DELETED
			});

			dispatch(setAlert('Account deleted'));
		} catch (error) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	}
};

//search profile
export const searchProfile = text => async dispatch => {
	try {
		const res = await axios.get(`/api/profile?q=${text}`);
		dispatch({
			type: SEARCH_PROFILE,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		});
	}
};
