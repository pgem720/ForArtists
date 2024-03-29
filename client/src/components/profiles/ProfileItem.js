import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
	profile: {
		user: { _id, name, avatar },
		website,
		location,
		creativeskills
	}
}) => {
	return (
		<div className='profile bg-light'>
			<img src={avatar} alt='' className='square-img' />
			<div>
				<h2>{name}</h2>
				<a href={website}>website</a>
				<p className='my-1'>{location && <span>{location}</span>}</p>
				<Link to={`/profile/${_id}`} className='btn btn-primary'>
					View Profile
				</Link>
			</div>
			<ul>
				{creativeskills.slice(0, 4).map((creativeskill, index) => (
					<li key={index} className='text-primary'>
						<i className='far fa-star' /> {creativeskill}
					</li>
				))}
			</ul>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
