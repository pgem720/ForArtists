import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
	profile: {
		bio,
		creativeskills,
		user: { name }
	}
}) => {
	return (
		<div class='profile-about bg-light p-2'>
			{bio && (
				<Fragment>
					<h2 class='text-primary'>Bio</h2>
					<p>{bio}</p>
					<div class='line'></div>
				</Fragment>
			)}
			<h2 class='text-primary'>CreativeSkills</h2>
			<div class='skills'>
				{creativeskills.map((skill, idx) => (
					<div key={idx} className='p-1'>
						<i className='far fa-star'>{skill}</i>
					</div>
				))}
			</div>
		</div>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
