const
  logger = require('../logger')('cursor');

class Cursor {

	constructor (cursor) {
		this.cursor = cursor;
	}

}

const methods = [
 	'addCursorFlag',
  'addQueryModifier',
  'batchSize',
  'clone',
  'close',
  'collation',
  'comment',
  'count',
  'explain',
  'filter',
  'forEach',
  'hasNext',
  'hint',
  'isClosed',
  'limit',
  'map',
  'max',
  'maxAwaitTimeMS',
  'maxScan',
  'maxTimeMS',
  'min',
  'next',
  'pause',
  'pipe',
  'project',
  'read',
  'resume',
  'returnKey',
  'rewind',
  'setCursorOption',
  'setEncoding',
  'setReadPreference',
  'showRecordId',
  'skip',
  'snapshot',
  'sort',
  'stream',
  'toArray',
  'unpipe',
  'unshift',
  'wrap'
];

const configMethods = [
	'addCursorFlag',
  'addQueryModifier',
  'batchSize',
  'collation',
  'comment',
  'filter',
  'hint',
  'limit',
  'map',
  'max',
  'maxAwaitTimeMS',
  'maxScan',
  'maxTimeMS',
  'min',
  'project',
  'returnKey',
  'setCursorOption',
  'setReadPreference',
  'showRecordId',
  'skip',
  'snapshot',
  'sort',
  'stream'
];

const isConfig = new Set(configMethods);

methods.forEach(method => {
	if (isConfig.has(method))
	Cursor.prototype[method] = function (...args) {
      this.cursor.then(e => e[method](...args)).catch(e => logger.error(e.description || e, args));
      return this;
		}
	else
		Cursor.prototype[method] = function (...args) {
      return this.cursor.then(e => e[method](...args)).catch(e => logger.error(e.description || e, args));
		}
});

module.exports = Cursor;
module.exports.methods = methods;
