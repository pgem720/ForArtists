import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
	profile: {
		website,
		social,
		user: { name, avatar }
	}
}) => {
	return (
		<div className='profile-top p-2'>
			<img className='square-img my-1' src={avatar} alt='' />
			<h2 className='lead'>{name}</h2>
			<div className='icons my-1'>
				{website && (
					<a href={website}>
						<i className='fas fa-globe fa-2x' />
					</a>
				)}
				{social && social.twitter && (
					<a href={social.twitter}>
						<i className='fab fa-twitter fa-2x' />
					</a>
				)}
				{social && social.facebook && (
					<a href={social.facebook}>
						<i className='fab fa-facebook fa-2x' />
					</a>
				)}
				{social && social.linkedin && (
					<a href={social.linkedin}>
						<i className='fab fa-linkedin fa-2x' />
					</a>
				)}
				{social && social.youtube && (
					<a href={social.youtube}>
						<i className='fab fa-youtube fa-2x' />
					</a>
				)}
				{social && social.instagram && (
					<a href={social.instagram}>
						<i className='fab fa-instagram fa-2x' />
					</a>
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileTop;
