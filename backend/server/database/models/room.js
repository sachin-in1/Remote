const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const roomSchema = new Schema({

	username: { 
		type: String,
		unique: true, 
		required: [true, 'Username is required.'],
		minlength:5 },
	name: { 
			type: String,
			unique: true, 
			required: [true, 'Username is required.'],
			minlength:5 },
	users: { 
		type: [String], 
		unique: false,
		required: false },

},{
	timestamps:true,
})

// Define schema methods
// userSchema.methods = {
// 	checkPassword: function (inputPassword) {
// 		return bcrypt.compareSync(inputPassword, this.password)
// 	},
// 	hashPassword: plainTextPassword => {
// 		return bcrypt.hashSync(plainTextPassword, 10)
// 	}
// }

// Define hooks for pre-saving
// userSchema.pre('save', function (next) {
// 	if (!this.password) {
// 		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
// 		next()
// 	} else {
// 		console.log('models/user.js hashPassword in pre save');
		
// 		this.password = this.hashPassword(this.password)
// 		next()
// 	}
// })

const Room = mongoose.model('Room', roomSchema)
module.exports = Room