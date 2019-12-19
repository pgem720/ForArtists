import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
	const [data, setData] = useState({
		website: '',
		location: '',
		creativeskills: '',
		tools: '',
		bio: '',
		groups: '',
		youtube: '',
		facebook: '',
		twitter: '',
		instagram: '',
		meetup: ''
	});

	const {
		website,
		location,
		creativeskills,
		tools,
		bio,
		groups,
		youtube,
		facebook,
		twitter,
		instagram,
		meetup
	} = data;

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	const onChange = e =>
		setData({
			...data,
			[e.target.name]: e.target.value
		});

	const onSubmit = e => {
		e.preventDefault();
		createProfile(data, history);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Create Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Tell us a little something about you!
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={e => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Website'
						name='website'
						value={website}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Could be your own or a company website
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						City & state suggested (eg. Brooklyn, NY)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* CreativeSkills'
						name='creativeskills'
						value={creativeskills}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Please use comma separated values (eg. painting, drawing, dance,
						theatre)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Tools'
						name='tools'
						value={tools}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Please use comma separated values (eg. paint, computer, wood)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='SocialGroups'
						name='groups'
						value={groups}
						onChange={e => onChange(e)}
					/>
					<small className='form-text'>
						Please use comma separated values (eg. MoMa, NYCCreativeSalon)
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short bio of yourself'
						name='bio'
						value={bio}
						onChange={e => onChange(e)}
					></textarea>
					<small className='form-text'>Tell us a little about yourself</small>
				</div>

				<div className='my-2'>
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>

				{displaySocialInputs && (
					<Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x'></i>
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x'></i>
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x'></i>
							<input
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								value={youtube}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-meetup fa-2x'></i>
							<input
								type='text'
								placeholder='Meetup'
								name='meetup'
								value={meetup}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x'></i>
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={e => onChange(e)}
							/>
						</div>
					</Fragment>
				)}
				<input type='submit' className='btn btn-primary my-1' />
				<a className='btn btn-light my-1' href='dashboard.html'>
					Go Back
				</a>
			</form>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.object.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
