const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
	website: {
		type: String
	},
	location: {
		type: String
	},
	creativeskills: {
		type: [String],
		required: true
	},
	tools: {
		type: [String],
		required: false
	},
	bio: {
		type: String
	},
	groups: {
		type: [String],
		required: false
	},
	education: [
		{
			school: {
				type: String,
				required: true
			},
			degree: {
				type: String,
				required: true
			},
			fieldofstudy: {
				type: String,
				required: true
			},
			current: {
				type: Boolean,
				default: false
			}
		}
	],
	social: {
		youtube: {
			type: String
		},
		twitter: {
			type: String
		},
		facebook: {
			type: String
		},
		linkedin: {
			type: String
		},
		instagram: {
			type: String
		},
		meetup: {
			type: String
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
