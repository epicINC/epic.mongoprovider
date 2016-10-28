
const
	assert = require('assert');

const
	debug = require('debug')('epic.provider:index'),
	Pool = require('./pool'),
	Provider = require('./lib/provider'),
	MutilProvider = require('./lib/mutilProvider');

class App {


	static modelConfig (config) {
		let result = {};
		for (let key in config) {
			if (config[key].dataSources)
				result[key] = App.dataSources(config[key]);
			else
				result[key] = Object.assign({}, config[key]);
		}
		return result;
	}

	static dataSources (configItem) {

		let result = {};
		configItem.selector && (result.selector = configItem.selector);
		configItem.collection && (result.collection = configItem.collection);
		result.dataSources = {};
		configItem.dataSources.forEach(item => {
			if (item.key) return result.dataSources[item.key] = item.dataSource;
			item.keys.forEach(key => result.dataSources[key] = item.dataSource);
		});
		return result;

	}

	static middleware (config) {
		let pool = Pool(config);
		let modelConfig = App.modelConfig(config['model-config']);
		let result = {};

		let getProvider = function(name, options) {
			assert(name, 'need provider name');
			debug('provider: %s', name);
			if (result[name]) return result[name];

			let cfg = modelConfig[name];
			if (!cfg) throw new Error(`provider '${name}' not found in model-config`);

			if (cfg.dataSources) {
				return result[name] = MutilProvider(cfg, this.connectionManager, options);
			} else
				return result[name] = new Provider(this.connection(cfg.dataSource).then(e => e.collection(cfg.collection)), this.connectionManager, options);
		};


		let ProviderNext = async (context, next) => {
			await pool(context);
			context.provider = getProvider.bind(context);
			next && await next();
		}
		
		return ProviderNext;
	}

}


module.exports = App.middleware;


