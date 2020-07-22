// Packages
import 'colors';
import 'module-alias/register';

import { resolve } from 'path';
import { readFileSync } from 'fs';

import winston from 'winston';

import { Server, ServerOptions } from '@jadiewadie/simple-server';

// Logger
const logger = winston.createLogger({
	format: winston.format.cli(),
	transports: [new winston.transports.Console({ level: 'info' })]
});

(async function () {
	// HTTPS
	let https: ServerOptions['https'];
	try {
		https = {
			key: readFileSync(
				resolve(process.env.CERT_PATH!, `privkey.pem`),
				'utf8'
			),
			cert: readFileSync(
				resolve(process.env.CERT_PATH!, `cert.pem`),
				'utf8'
			),
			ca: readFileSync(
				resolve(process.env.CERT_PATH!, `chain.pem`),
				'utf8'
			)
		};
	} catch (err) {
		https = false;
	}
	logger.info(`using ${(https !== false ? 'https' : 'http').cyan}`);

	// Server
	const port = parseInt(process.env.PORT!) || 3000;
	const file = readFileSync(resolve(__dirname, '../client/index.html'), {
		encoding: 'utf8'
	});

	const server = new Server({
		https,
		statics: { paths: [resolve(__dirname, '../client')] },
		api: {
			prefix: '/api',
			routes: {
				folder: resolve(__dirname, './routes'),
				load: async filename => (await import(filename)).default
			}
		},
		error: async (req, res) => res.send(file)
	});
	server.start(port);

	logger.info(`port ${port.toString().yellow}`);
})();
