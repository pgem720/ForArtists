import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
// import SearchBar from '../layout/SearchBar';

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);
	return (
		<Fragment>
			{/* <h1 className='medium text-primary'>Artists</h1> */}
			<p className='lead large text-primary'>
				<strong>
					<i className='fab fa-connectdevelop' /> C O N N E C T
				</strong>
			</p>
			{/* <SearchBar /> */}
			<div className='profiles'>
				{profiles.length > 0 ? (
					profiles.map(profile => (
						<ProfileItem key={profile._id} profile={profile} />
					))
				) : (
					<h4>No profiles found...</h4>
				)}
			</div>
		</Fragment>
	);
};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
