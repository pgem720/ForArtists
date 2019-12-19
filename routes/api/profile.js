const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/// GET request: fetch user profile(private)
router.get('/mypage', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

///GET request: fetch all profiles(public)
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

///GET request: fetch profile by id(public)
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server Error');
	}
});

/// POST request: create/update user profile(private)
router.post(
	'/',
	[
		auth,
		[
			check('creativeskills', 'CreativeSkills is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

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
		} = req.body;

		////create profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (creativeskills) {
			profileFields.creativeskills = creativeskills
				.split(',')
				.map(skill => skill.trim());
		}
		if (tools) {
			profileFields.tools = tools.split(',').map(skill => skill.trim());
		}
		if (groups) {
			profileFields.groups = groups.split(',').map(skill => skill.trim());
		}

		///initialize social
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (facebook) profileFields.social.facebook = facebook;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;
		if (meetup) profileFields.social.meetup = meetup;

		///async/await: include await with mongoose methods(returns a promise)
		try {
			//update
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}
			//create
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

///DELETE request: delete profile, user, posts(private)
router.delete('/', auth, async (req, res) => {
	try {
		//remove profile
		await Profile.findOneAndRemove({ user: req.user.id });

		//remove user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

///PUT request: add education
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'School is required')
				.not()
				.isEmpty(),
			check('degree', 'Degree is required')
				.not()
				.isEmpty(),
			check('fieldofstudy', 'Field of Study is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, fieldofstudy, current } = req.body;

		const newEdu = { school, degree, fieldofstudy, current };

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEdu);
			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

///DELETE request: delete education
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		});

		const removeIndex = profile.education
			.map(item => item.id)
			.indexOf(req.params.edu_id);

		profile.education.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

///add experience
router.put(
	'/experience',

	auth,
	// [
	// 	check('Space', 'Space is required')
	// 		.not()
	// 		.isEmpty(),
	// 	check('from', 'From date is required')
	// 		.not()
	// 		.isEmpty()
	// ]

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { space, location, from, to, description } = req.body;

		const newExp = {
			space,
			location,
			from,
			to,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.experience.unshift(newExp);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//delete experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const foundProfile = await Profile.findOne({ user: req.user.id });
		const expIds = foundProfile.experience.map(exp => exp._id.toString());
		const removeIndex = expIds.indexOf(req.params.exp_id);
		if (removeIndex === -1) {
			return res.status(500).json({ msg: 'Server error' });
		} else {
			console.log('expIds', expIds);
			console.log('typeof expIds', typeof expIds);
			console.log('req.params', req.params);
			console.log('removed', expIds.indexOf(req.params.exp_id));
			foundProfile.experience.splice(removeIndex, 1);
			await foundProfile.save();
			return res.status(200).json(foundProfile);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Server error' });
	}
});

module.exports = router;
