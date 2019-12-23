// import React, { useRef } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { searchProfile } from '../../actions/profile';

// const SearchBar = ({ searchProfile }) => {
// 	const text = useRef('');

// 	const onChange = e => {
// 		searchProfile(text.current.value);
// 	};

// 	return (
// 		<nav style={{ marginBottom: '30px' }}>
// 			<div className='nav-wrapper'>
// 				<form>
// 					<div className='input-field'>
// 						<input
// 							id='search'
// 							type='search'
// 							// placeholder='Search Profiles..'
// 							ref={text}
// 							onChange={onChange}
// 						/>
// 						<label className='label-icon' htmlFor='search'>
// 							<i className='material-icons'>search</i>
// 						</label>
// 						<i className='material-icons'>close</i>
// 					</div>
// 				</form>
// 			</div>
// 		</nav>
// 	);
// };

// SearchBar.propTypes = {
// 	searchProfile: PropTypes.func.isRequired
// };

// export default connect(null, { searchProfile })(SearchBar);
