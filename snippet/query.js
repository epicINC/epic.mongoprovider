const
	co = require('co')
	config = require('../test/conf.js'),
	Provider = require('../index')(config);



async function test() {
	let context = {}, provider;
	await Provider.bind(context)();
	provider = context.provider('test');

	await provider.insertOne({id:1, name:'1'});
	console.log(1);
	console.log(await provider.query({}, {project: {id:1, name:1}}));
}


test();