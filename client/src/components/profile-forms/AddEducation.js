import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
	const [data, setData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		current: false
	});

	const { school, degree, fieldofstudy, current } = data;

	const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		addEducation(data, history);
	};

	return (
		<Fragment>
			<h1 class='large text-primary'>Add Your Education</h1>
			<p class='lead'>
				<i class='fas fa-graduation-cap'></i> Add any school, courses, etc that
				you have attended
			</p>
			<small>* = required field</small>
			<form class='form' onSubmit={e => onSubmit(e)}>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* School'
						name='school'
						onChange={e => onChange(e)}
						value={school}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
						onChange={e => onChange(e)}
						value={degree}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='Field Of Study'
						name='fieldofstudy'
						onChange={e => onChange(e)}
						value={fieldofstudy}
					/>
				</div>
				<div class='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							checked={current}
							onChange={e => {
								setData({ ...data, current: !current });
							}}
						/>{' '}
						Current School
					</p>
				</div>
				<input type='submit' class='btn btn-primary my-1' />
				<Link class='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
