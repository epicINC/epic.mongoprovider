// import * as mongodb from 'mongodb';
// import baseProvider from '../models/provider';
import { schema } from '../decorators'

// const connectionStrings = 'mongodb://192.168.16.151/LXTGroup';


interface IUser {
	hash: string
}

@schema.collection()
class User implements IUser {

	@schema.id
	hash: string
}



type UserDef = {
	hash: string
}


let u = new User()



console.log(u instanceof test)



/*

async function test () {
	let connection = mongodb.MongoClient.connect(connectionStrings);
	let provider = new baseProvider<User>(connection.then(e => e.collection('Userv4')));


	await provider.deleteMany({hash: {$eq: ''}});

	let r = await provider.insert({id: 'test'});
	console.log(r);

}
*/
// test();
