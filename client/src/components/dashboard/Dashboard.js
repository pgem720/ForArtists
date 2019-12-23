import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
	getUserProfile,
	profile: { profile, loading },
	auth: { user },
	deleteAccount
}) => {
	useEffect(() => {
		getUserProfile();
	}, [getUserProfile]);

	return (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>Welcome {user && user.name}</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className='my-2'>
						<button className='btn btn-danger' onClick={() => deleteAccount()}>
							<i className='fas fa-user'></i> Delete my account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	profile: PropTypes.object.isRequired,
	getUserProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});
export default connect(mapStateToProps, { getUserProfile, deleteAccount })(
	Dashboard
);
