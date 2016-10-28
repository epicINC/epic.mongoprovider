const
	co = require('co')
	config = require('../test/conf.js'),
	Provider = require('../index')(config);

co(function*() {
	let context = {}, provider;
	yield Provider.bind(context)();
	provider = context.provider('test');

	yield provider.insertOne({id:1, name:'1'});
	console.log(1);
	console.log(yield provider.query({}, {project: {id:1, name:1}}));

});