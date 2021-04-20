const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '65f879d4b8ee4d4d8d7b9b3f754cd176'
});

const handleApiCall = (req, res) => {
	app.models
	  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	  .then (data => {
	  	res.json(data);
	  })
	  .catch(err => res.json(400).json('unable to work with Api'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
  	res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage, /* ES6 Don't need the value */
	handleApiCall
}