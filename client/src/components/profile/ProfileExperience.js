import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
	experience: { space, location, to, from, description }
}) => {
	return (
		<div class='profile-exp bg-white p-2'>
			<div>
				<h3 class='text-dark'>{space}</h3>
				<p>{location}</p>
				<p>
					<Moment format='YYYY/MM'>{from}</Moment> -{' '}
					{!to ? ' Now' : <Moment format='YYYY/MM'>{to}</Moment>}
				</p>
				<p>
					<strong>Description: </strong>
					{description}
				</p>
			</div>
		</div>
	);
};

ProfileExperience.propTypes = {
	experience: PropTypes.array.isRequired
};

export default ProfileExperience;
