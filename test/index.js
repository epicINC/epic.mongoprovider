const
	chai = require('chai'),
	expect = chai.expect;

const
	config = require('./conf.js'),
	Provider = require('../index')(config);

describe('Provider', () => {
	let context = {ids:[]}, provider;
	before(async () => {
			await Provider.bind(context)();
			provider = context.provider('test');
	});

	describe('#insert', () => {

		/* 
		CommandResult {
			result: { ok: 1, n: 1 },
			connection: Connection { },
			message: Response { },
			ops: [ { name: 'test', _id: 57d506e361294a2310f2ddf5 } ],
			insertedCount: 1,
			insertedId: 57d506e361294a2310f2ddf5 }
		*/
		it('insertOne', done => {
			provider.insertOne({name:'test1'}).then(ret => {
				expect(ret.result.ok).to.be.ok;
				expect(ret.result.n).to.be.eql(1);
				expect(ret.ops).to.have.lengthOf(1);
				expect(ret.insertedCount).to.be.eql(1);
				expect(ret).to.have.property('insertedId').that.is.a('object');
				context.ids.push(ret.insertedId);
				done();
			})
			.catch(err => console.log(err));
		});

		/*
		{ result: { ok: 1, n: 4 },
		  ops:
		   [ { name: 'test2', _id: 57d509cdab473c2cb02a81b8 },
		     { name: 'test3', _id: 57d509cdab473c2cb02a81b9 },
		     { name: 'test4', _id: 57d509cdab473c2cb02a81ba },
		     { name: 'test5', _id: 57d509cdab473c2cb02a81bb } ],
		  insertedCount: 4,
		  insertedIds:
		   [ 57d509cdab473c2cb02a81b8,
		     57d509cdab473c2cb02a81b9,
		     57d509cdab473c2cb02a81ba,
		     57d509cdab473c2cb02a81bb ] }
		*/
		it('insertMany', done => {
			provider.insertMany([{name:'test2'}, {name:'test3'}, {name:'test4'}, {name:'test5'}]).then(ret => {
				expect(ret.result.ok).to.be.ok;
				expect(ret.result.n).to.be.eql(4);
				expect(ret.ops).to.have.lengthOf(4);
				expect(ret.insertedCount).to.be.eql(4);
				expect(ret).to.have.property('insertedIds').that.is.a('array');
				expect(ret.insertedIds).to.have.lengthOf(4);
				context.ids.push(...ret.insertedIds);
				done();
			})
			.catch(err => console.log(err));
		});

	});



	describe('#update', () => {
		/*
		CommandResult {
		  result: { ok: 1, nModified: 1, n: 1 },
		  connection: Connection { },
		  message: Response { }
		  matchedCount: 1,
		  modifiedCount: 1,
		  upsertedId: null,
		  upsertedCount: 0 }
		*/
		it('updateOne', done => {
			provider.updateOne({_id: context.ids[0]}, {$set:{update:true}}).then(ret => {
				expect(ret.result.ok).to.be.ok;
				expect(ret.result.n).to.be.eql(1);
				expect(ret.result.nModified).to.be.eql(1);
				expect(ret.matchedCount).to.be.eql(1);
				expect(ret.modifiedCount).to.be.eql(1);
				done();
			})
			.catch(err => console.log(err));
		});

		/*
		CommandResult {
		  result: { ok: 1, nModified: 4, n: 5 },
		  connection: Connection { },
		  message: Response { },
		  matchedCount: 5,
		  modifiedCount: 4,
		  upsertedId: null,
		  upsertedCount: 0 }
		*/
		it('updateMany', done => {
			provider.updateMany({name: /test/}, {$set:{update:true}}).then(ret => {
				expect(ret.result.ok).to.be.ok;
				expect(ret.result.n).to.be.eql(5);
				expect(ret.result.nModified).to.be.eql(4);
				expect(ret.matchedCount).to.be.eql(5);
				expect(ret.modifiedCount).to.be.eql(4);
				done();
			})
			.catch(err => console.log(err));
		});

	});


	describe('#upsert', () => {

		/*
		CommandResult {
		  result: { ok: 1, nModified: 0, n: 1, upserted: [ { index: 0, _id: 'upsert' } ] },
		  connection: Connection { },
		  message: Response { },
		  matchedCount: 1,
		  modifiedCount: 0,
		  upsertedId: { index: 0, _id: 'upsert' },
		  upsertedCount: 1 }
		*/
		it('upsert one', done => {
			provider.updateOne({id: 'upsert'}, {$set:{name: 'test6'}}, {upsert: true}).then(ret => {
				expect(ret.result.ok).to.be.ok;
				expect(ret.result.n).to.be.eql(1);
				expect(ret.result.nModified).to.be.eql(0);
				expect(ret.result).to.have.property('upserted').that.is.a('array').to.have.lengthOf(1);
				expect(ret.matchedCount).to.be.eql(1);
				expect(ret.modifiedCount).to.be.eql(0);
				expect(ret).to.have.property('upsertedId').that.is.a('object');
				expect(ret.upsertedCount).to.be.eql(1);
				done();
			})
			.catch(err => console.log(err));
		});

		it('upsert many', done => {
			provider.updateOne({id: {$in: ['upsert1', 'upsert2']}}, {$set:{name: 'test7'}}, {upsert: true}).then(ret => {
				expect(ret.result.ok).to.be.ok;
				expect(ret.result.n).to.be.eql(1);
				expect(ret.result.nModified).to.be.eql(0);
				expect(ret.result).to.have.property('upserted').that.is.a('array').to.have.lengthOf(1);
				expect(ret.matchedCount).to.be.eql(1);
				expect(ret.modifiedCount).to.be.eql(0);
				expect(ret).to.have.property('upsertedId').that.is.a('object');
				expect(ret.upsertedCount).to.be.eql(1);
				done();
			})
			.catch(err => console.log(err));
		});

	});

	describe('#delete', () => {

		/*
		CommandResult {
		  result: { ok: 1, n: 1 },
		  connection: Connection { },
		  message: Response {  },
		  deletedCount: 1 }
		*/
		it('deleteOne', done => {
			provider.deleteOne({_id: context.ids[0]}).then(ret => {
				expect(ret.result.ok).to.be.ok;
				expect(ret.result.n).to.be.eql(1);
				expect(ret.deletedCount).to.be.eql(1);
				done();
			})
			.catch(err => console.log(err));
		});

		/*
		CommandResult {
		  result: { ok: 1, n: 4 },
		  connection: Connection { },
		  message: Response { },
		  deletedCount: 4 }
		*/
		it('deleteMany', done => {
			provider.deleteMany({name: /test/}).then(ret => {
				expect(ret.result.ok).to.be.ok;
				expect(ret.result.n).to.be.eql(5);
				expect(ret.deletedCount).to.be.eql(5);
				done();
			})
			.catch(err => console.log(err));
		});

	});


	describe('#bulkWrite', () => {

		/*
		BulkWriteResult {
		  ok: [Getter] 1,
		  nInserted: [Getter] 1,
		  nUpserted: [Getter] 2,
		  nMatched: [Getter] 1,
		  nModified: [Getter] 0,
		  nRemoved: [Getter] 0,
		  getInsertedIds: [Function] [ { index: 0, _id: 57d519eb94b1f5175072f90f } ],
		  getUpsertedIds: [Function] [ { index: 1, _id: 57d519e765ff5073f8ebbc96 }, { index: 5, _id: 57d519e765ff5073f8ebbc97 } ],
		  getUpsertedIdAt: [Function] undefined,
		  getRawResponse: [Function] { ok: 1, writeErrors: [], writeConcernErrors: [], insertedIds: [ { index: 0, _id: 57d519eb94b1f5175072f90f } ], nInserted: 1, nUpserted: 2, nMatched: 1, nModified: 0, nRemoved: 0, upserted: [ { index: 1, _id: 57d519e765ff5073f8ebbc96 }, { index: 5, _id: 57d519e765ff5073f8ebbc97 } ] },
		  hasWriteErrors: [Function] false,
		  getWriteErrorCount: [Function] 0,
		  getWriteErrorAt: [Function] null,
		  getWriteErrors: [Function] [],
		  getLastOp: [Function] undefined,
		  getWriteConcernError: [Function] null,
		  toJSON: [Function] { ok: 1, writeErrors: [], writeConcernErrors: [], insertedIds: [ { index: 0, _id: 57d519eb94b1f5175072f90f } ], nInserted: 1, nUpserted: 2, nMatched: 1, nModified: 0, nRemoved: 0, upserted: [ { index: 1, _id: 57d519e765ff5073f8ebbc96 }, { index: 5, _id: 57d519e765ff5073f8ebbc97 } ] },
		  isOk: [Function] true,
		  insertedCount: 1,
		  matchedCount: 1,
		  modifiedCount: 0,
		  deletedCount: 0,
		  upsertedCount: 2,
		  upsertedIds: { '1': 57d518d865ff5073f8ebbc8a, '5': 57d518d865ff5073f8ebbc8b },
		  insertedIds: { '0': 57d518dc1f0ef20ae86c17fc },
		  n: 1 }
		*/
		it('bulkWrite', done => {
			provider.bulkWrite(
			[
				{ insertOne: { document: { a: 1 } } },
				{ updateOne: { filter: {a:2}, update: {$set: {a:2}}, upsert:true } },
				{ updateMany: { filter: {a:2}, update: {$set: {a:2}}, upsert:true } },
				{ deleteOne: { filter: {c:1} } },
				{ deleteMany: { filter: {c:1} } },
				{ replaceOne: { filter: {c:3}, replacement: {c:4}, upsert:true}}
    	],
    	{ordered:true, w:1})
    	.then(ret => {
    		done();
    	})
			.catch(err => console.log(err));
		});

	});


	after(() => provider.drop());
});




