/*
URL parameters are accessed by req.param
query strings are accessed by req.query
Access posted form data req.body
*/
const mongoose = require('mongoose');
const Pitch = mongoose.model('Pitch');

/**
 * Creates a pitch
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const pitchesCreate = function(req, res) {
	// Pitch.create(dataToSave, (error object, document saved in db))
	Pitch.create({
		name: req.body.name,
		address: req.body.address,
		// create array of facilities by splitting comma-separated list
		facilities: req.body.facilities.split(","),
		// parse coords from strings to numbers
		coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
		openingTimes: [{
			days: req.body.days1,
			opening: req.body.opening1,
			closing: req.body.closing1,
			closed: req.body.closed1,
		}, {
			days: req.body.days2,
			opening: req.body.opening2,
			closing: req.body.closing2,
			closed: req.body.closed2,
		}]
	}, (err, pitch) => { // callback function to deal with error & success
		if (err) {
			res
				.status(400)
				.json(err);
		} else {
			res
				.status(201)
				.json(pitch);
		}
	});
};

/**
 * Lists the pitches by distance
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const pitchesListByDistance = function(req, res) {
	// console.log("\n\n**pitchesListByDistance**\n\n");
	// Express puts values into query object - req.query.lng & req.query.lat - when URL with query string is passed 
	// api/pitches?lng=0.332&lat=32.544
	
	// constructing geoJSON point

	// converts from string to numbers
	const lng = parseFloat(req.query.lng);
	const lat = parseFloat(req.query.lat);
	let maxD = parseFloat(req.query.maxDistance);

	// error checking
	// if (!lng || !lat) {
	if ((!lng && lng !== 0) || (!lat && lat !== 0)) {
		res
			.status(404)
			.json({
				"message": "lng and lat query parameters are required"
			});
		return;
	}

	if ((!maxD && maxD !== 0)) {
		maxD = 63710000;
	}

	// geoJSON point - JSON object containing latitude and longitude in an array
	const point = {
		type: "Point",
		coordinates: [lng, lat]
	};

	// creating options
	const geoOptions = {
		spherical: true,
		maxDistance: maxD, // in metres
		num: 10 // limit number of results returned
	};


	// geoJSON geographical point, options, callback function - executed immediately
    // geoNear - returns array of objects with distance and entire document [{ dis: 10, obj: {...} }, {}, ...] - need to do processing
	// callback has 3 params - error, results & stats
	Pitch.geoNear(point, geoOptions, (err, results, stats) => {
		// holds processed data
		let pitches = [];
		if (err) {  // if geoNear returns an error
			res
				.status(404)
				.json(err);
		} 
		else {
			// loop through geoNear query results
			results.forEach((doc) => { // for each document in result
				// add required data
				pitches.push({
					distance: doc.dis,
					name: doc.obj.name,
					address: doc.obj.address,
					rating: doc.obj.rating,
					facilities: doc.obj.facilities,
					_id: doc.obj._id
				});
				// console.log(pitches);
		  });
		  res
		    .status(200)
		    .json(pitches);
		}
	});
};

/**
 * Reads a single pitch
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const pitchesReadOne = function(req, res) {
	// res
	// 	.status(200)
	// 	.json({"status" : "success"});
	// check pitch id exists in the parameters
	if (req.params && req.params.pitchId) {
		Pitch
		  // look for specific ID - tells what query will be
			// param object is attached to request - access pitchId
			.findById(req.params.pitchId)
			// executes the query when operation is complete
			.exec((err, pitch) => { // accepts error object and instance of found doc
				if (!pitch) { // if mongoose doesn't return pitch
					res
						.status(404)
						.json({
							"message": "pitchId not found"
						});
					return;
				} else if (err) { // if mongoose returned an error
					res
						.status(404)
						.json(err);
					return;
				}
				res // no error - mongoose return pitch
					.status(200)
					.json(pitch);
			});
	} else { // if no pitchId in parameters
		res
			.status(404)
			.json({
				"message" : "No pitchId in request"
			});
	}
};

/**
 * Updates pitch information
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const pitchesUpdateOne = function(req, res) {
	if (!req.params.pitchId) {
		res
			.status(404)
			.json({
				"message": "Not found, pitchId is required"
			});
		return;
	}
	Pitch
	// find doc to update
		.findById(req.params.pitchId)
		.select('-reviews -rating') // retrieve everything except reviews and rating
		.exec((err, pitch) => {
			if (!pitch) { // pitch not found
				res
					.json(404)
					.status({
						"message": "pitchId not found"
					});
				return;
			} else if (err) {
				res
					.status(400)
					.json(err);
				return;
			}
			// update paths - names etc - with values from submitted form
			pitch.name = req.body.name;
			pitch.address = req.body.address;
			pitch.facilities = req.body.facilities.split(',');
			pitch.coords = [
				parseFloat(req.body.lng),
				parseFloat(req.body.lat)
			];
			pitch.openingTimes = [{
				days: req.body.days1,
				opening: req.body.opening1,
				closing: req.body.closing1,
				closed: req.body.closed1,
			}, {
				days: req.body.days2,
				opening: req.body.opening2,
				closing: req.body.closing2,
				closed: req.body.closed2,
			}];
			pitch.save((err, pitch) => { // save and send appropriate response
				if (err) {
					res
						.status(404)
						.json(err);
				} else {
					res
						.status(200)
						.json(pitch);
				}
			});
		}
	);
};

/**
 * Deletes a pitch
 * 
 * @param req HTTP request object
 * @param res HTTP response object
 */
const pitchesDeleteOne = function(req, res) {
	const pitchId = req.params.pitchId;
	if (pitchId) {
		Pitch
			.findByIdAndRemove(pitchId)
			.exec((err, pitch) => {
				// respond with failure or success
				if (err) {
					res
						.status(404)
						.json(err);
					return;
				}
				res
					.status(204)
					.json(null);
			}
		);
	} else {
		res
			.status(404)
			.json({
				"message": "No pitchId"
			});
	}
};

module.exports = {
	pitchesListByDistance,
	pitchesCreate,
	pitchesReadOne,
	pitchesUpdateOne,
	pitchesDeleteOne
};
