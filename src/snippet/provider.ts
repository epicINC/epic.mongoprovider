
import * as mongodb from 'mongodb';
import Provider from '../provider';
import {id, collection} from '../models/decorator';

const connectionStrings = 'mongodb://192.168.16.151/LXTGroup';



/*

@collection('Userv4')
class User {

	@id
	hash: string;
}

@collection('Groupv4')
class Group {

	@id
	id: string;
}

async function test () {
	let connection = mongodb.MongoClient.connect(connectionStrings);
	let provider = new Provider(connection.then(e => e.collection('Userv4')));


	await provider.deleteMany({id: 'test'});

	let r = await provider.insert({id: 'test'});
	console.log(r);

}

test();
*/