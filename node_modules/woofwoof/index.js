/* jshint node:true */
/* jshint esversion:6 */
'use strict';

const os = require('os');
const path = require('path');
const camelcaseKeys = require('camelcase-keys');
const decamelizeKeys = require('decamelize-keys');
const trimNewlines = require('trim-newlines');
const redent = require('redent');
const readPkgUp = require('read-pkg-up');
const loudRejection = require('loud-rejection');
const normalizePackageData = require('normalize-package-data');
const nconf = require('@nwaltham/nconf');
const mkdirp = require('mkdirp');

// prevent caching of this module so module.parent is always accurate
delete require.cache[__filename];
const parentDir = path.dirname(module.parent.filename);

module.exports = (opts, minimistOpts) => {
	loudRejection();

	if (Array.isArray(opts) || typeof opts === 'string') {
		opts = {
			help: opts
		};
	}

	opts = Object.assign({
		pkg: readPkgUp.sync({
			cwd: parentDir,
			normalize: false
		}).pkg,
		argv: process.argv.slice(2),
		inferType: false
	}, opts);

	minimistOpts = Object.assign({
		string: ['_']
	}, minimistOpts);

	minimistOpts.default = decamelizeKeys(minimistOpts.default || {}, '-');

	const index = minimistOpts.string.indexOf('_');

	if (opts.inferType === false && index === -1) {
		minimistOpts.string.push('_');
	} else if (opts.inferType === true && index !== -1) {
		minimistOpts.string.splice(index, 1);
	}

	const pkg = opts.pkg;
	/* instrumentation */
	/*
    console.log('"opts"');
    console.log(JSON.stringify(opts, null, 4));
    console.log('"minimistOpts"');
    console.log(JSON.stringify(minimistOpts, null, 4));
    //const argv = minimist(opts.argv, minimistOpts);
*/

	const settingsdir = '.' + opts.pkg.name;

	/* instrumentation */
	// console.log(os.homedir());
	const configpath = path.join(os.homedir(), settingsdir);
	const settingsfile = path.join(configpath, 'settings.json');
	mkdirp.sync(configpath);

	const nconfArgv = {};
	if (opts.argv) {
		nconfArgv.argv = opts.argv;
	}
	if (minimistOpts.alias) {
		Object.keys(minimistOpts.alias).forEach(x => {
			if (nconfArgv[x]) {
				nconfArgv[x].alias = minimistOpts.alias[x];
			} else {
				nconfArgv[x] = {alias: minimistOpts.alias[x]};
			}
		});
	}

	const argv = nconf.argv(nconfArgv)
		.env(opts.env)
		.file({
			file: settingsfile
		}).defaults(minimistOpts.default);

	// instrumentation
	// console.log(JSON.stringify(nconf, null, 4));

	let help = redent(trimNewlines((opts.help || '').replace(/\t+\n*$/, '')), 2);

	normalizePackageData(pkg);

	process.title = pkg.bin ? Object.keys(pkg.bin)[0] : pkg.name;

	let description = opts.description;
	if (!description && description !== false) {
		description = pkg.description;
	}

	help = (description ? `\n  ${description}\n` : '') + (help ? `\n${help}\n` : '\n');

	const showHelp = code => {
		console.log(help);
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(typeof code === 'number' ? code : 2);
	};

	const saveSettings = code => {
		console.log('Saving Settings');
		const newargs = nconf.stores.argv.store;
		// just save the newly specified arguments
		delete newargs._;
		delete newargs['save-settings'];
		delete newargs.saveSettings;
		delete newargs.$0;
		// instrumentation
		// console.log(Object.keys(newargs));
		const keys = Object.keys(newargs);
		const keysl = keys.length;
		for (let i = 0; i < keysl; i++) {
			const k = keys[i];
			nconf.set(k, nconf.get(k));
		}
		nconf.save(settingsfile);
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(typeof code === 'number' ? code : 2);
	};

	if (argv.get('version') && opts.version !== false) {
		console.log(typeof opts.version === 'string' ? opts.version : pkg.version);
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit();
	}

	if (argv.get('help') && opts.help !== false) {
		showHelp(0);
	}

	if (argv.get('save-settings') && opts['save-settings'] !== false) {
		saveSettings(0);
	}

	const input = argv.get('_');
	// delete argv._;
	const arfv = argv.get();
	delete arfv._;

	const flags = camelcaseKeys(arfv, {
		exclude: ['--', /^\w$/]
	});

	return {
		input,
		flags,
		pkg,
		help,
		showHelp
	};
};
