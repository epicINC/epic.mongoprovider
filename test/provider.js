const
	chai = require('chai'),
	expect = chai.expect;

const
	config = require('group.config')(__dirname),
	provider = require('../index')(config);

describe('Provider', () => {
	let context = {};
	before(done => {
		yield provider.bind(context)();
		

	});



});





co(function*()
{
	let option = {connectionString: 'mongodb://192.168.16.151:27017/LXTGroup', collection: 'message'};


	let provider = new Provider(option);


	let docs = yield provider.query({}, {sort: {ts:-1}, limit:2, project:{ts:1}});

	console.log(docs);

})
.catch(e => console.log(e));