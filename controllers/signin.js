const handleSignin = (db, bcrypt) => (req, res) => {   /* optional advanced js way where we run the function with db & bcrypt then it returns another function (req, res) then returns the following... */
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('Incorrect form submission')
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash); // true
			if (isValid) {
				return db.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get user'))
				} else {
					res.status(400).json('wrong credentials')
				}
		})
		.catch(err=> res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
}