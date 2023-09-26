// import puppeteer from 'puppeteer';
// import fs from 'fs';
// class BrowserHandler {
// 	constructor(wsEndpoint) {
// 		this.browser = false;
// 		this.wsEndpoint = wsEndpoint;
// 		this.isLaunching = false;
// 		this.isConnected = false;
// 		this.resumeSessionFromFile('session.json').catch(() =>
// 			this.launchBrowser(),
// 		);
// 	}
// 	async saveToJSONFile(data, file) {
// 		return new Promise((resolve, reject) => {
// 			fs.truncate(file, 0, (err) => {
// 				if (err) reject(err);
// 				fs.writeFile(file, JSON.stringify(data), (err) => {
// 					if (err) reject(err);
// 					else resolve(file);
// 				});
// 			});
// 		});
// 	}
// 	async getFileContents(file) {
// 		return new Promise((resolve, reject) => {
// 			fs.readFile(file, (err, data) => {
// 				if (err) reject(err);
// 				else resolve(JSON.parse(data));
// 			});
// 		});
// 	}
// 	async launchBrowser() {
// 		if (this.isLaunching || this.isConnected) return;
// 		this.isLaunching = true;
// 		try {
// 			if (this.wsEndpoint) {
// 				this.browser = await puppeteer.connect({
// 					browserWSEndpoint: this.wsEndpoint,
// 				});
// 				console.log(
// 					'Connected to existing browser at endpoint:',
// 					this.wsEndpoint,
// 				);
// 			} else {
// 				throw new Error('No WebSocket endpoint provided');
// 			}
// 		} catch (error) {
// 			console.error(
// 				'Failed to connect to existing browser, launching a new one...',
// 				error,
// 			);
// 			this.browser = await puppeteer.launch({
// 				headless: false,
// 				// slowMo: 2100,
// 				args: ['--no-sandbox', '--disable-setuid-sandbox'],
// 				timeout: 60000,
// 			});
// 			await this.saveToJSONFile(
// 				{ endpoint: this.browser.wsEndpoint() },
// 				'session.json',
// 			);
// 			console.log('Websocket endpoint JSON has been successfully saved');
// 		} finally {
// 			this.isLaunching = false;
// 		}
// 		const pages = await this.browser.pages();
// 		const blankPage = pages.find((page) => page.url() === 'about:blank');
// 		if (blankPage && !blankPage.isClosed()) {
// 			await blankPage.close();
// 		}
// 	}
// 	async resumeSessionFromFile(file) {
// 		let setSession = (wsEndpointObj) => {
// 			console.log(
// 				'Connecting to websocket endpoint: ',
// 				wsEndpointObj.endpoint,
// 			);
// 			return puppeteer.connect({
// 				browserWSEndpoint: wsEndpointObj.endpoint,
// 			});
// 		};
// 		return this.getFileContents(file)
// 			.then(setSession)
// 			.then((browser) => {
// 				console.log('Session file contents:', wsEndpointObj);
// 				console.log(
// 					'Successfully connected to previous session, using websocket URL from file ' +
// 						file,
// 				);
// 				this.isConnected = true;
// 				return browser;
// 			});
// 	}
// }
// const browserHandler = new BrowserHandler();
// browserHandler
// 	.resumeSessionFromFile('session.json')
// 	.catch(() => browserHandler.launchBrowser());
// export default async function handler(req, res) {
// 	const { phoneNumber, message } = req.body;
// 	const waitForBrowser = () =>
// 		new Promise((resolve) => {
// 			const checkBrowser = setInterval(() => {
// 				if (browserHandler.browser) {
// 					clearInterval(checkBrowser);
// 					resolve();
// 				}
// 			}, 100);
// 		});
// 	await waitForBrowser();
// 	if (browserHandler.browser?.isConnected()) {
// 		let page;
// 		const pages = await browserHandler.browser.pages();
// 		const whatsappPage = pages.find((page) =>
// 			page.url().includes('https://web.whatsapp.com/'),
// 		);
// 		if (whatsappPage) {
// 			page = whatsappPage;
// 		} else {
// 			page = await browserHandler.browser.newPage();
// 			await page.goto('https://web.whatsapp.com/');
// 			await page.waitForTimeout(100);
// 		}
// 		try {
// 			const newChatButton = await page.waitForSelector(
// 				'div[data-tab="2"][title="New chat"]',
// 				{ timeout: 60000 },
// 			);
// 			await newChatButton.click();
// 			await page.waitForTimeout(100);
// 			const searchBox = await page.waitForSelector(
// 				'div[role="textbox"][data-tab="3"]',
// 				{ timeout: 60000 },
// 			);
// 			await searchBox.click();
// 			await page.keyboard.type(`+${phoneNumber}`);
// 			await page.waitForTimeout(100);
// 			await page.keyboard.press('Enter');
// 			const listItem = await page.waitForSelector('div[role="listitem"]', {
// 				timeout: 60000,
// 			});
// 			await listItem.click();
// 			await page.waitForTimeout(100);
// 			const messageBox = await page.waitForSelector(
// 				'div[role="textbox"][data-tab="10"]',
// 				{ timeout: 60000 },
// 			);
// 			await messageBox.focus();
// 			await page.keyboard.type(message);
// 			await page.keyboard.press('Enter');
// 			res.json({ status: 'Message sent' });
// 			console.log('Message sent');
// 		} catch (error) {
// 			console.error('Failed to perform operation on page:', error);
// 		}
// 	} else {
// 		console.error('Browser is not connected');
// 	}
// }
import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';

class BrowserHandler {
	constructor(wsEndpoint) {
		this.browser = false;
		this.wsEndpoint = wsEndpoint;
		this.isLaunching = false;
		this.isConnected = false;
		this.resumeSessionFromFile('session.json').catch(() =>
			this.launchBrowser(),
		);
	}

	async saveToJSONFile(data, file) {
		await fs.writeFile(file, JSON.stringify(data));
		return file;
	}

	async getFileContents(file) {
		const data = await fs.readFile(file);
		return JSON.parse(data);
	}

	async launchBrowser() {
		if (this.isLaunching || this.isConnected) return;
		this.isLaunching = true;
		try {
			if (this.wsEndpoint) {
				this.browser = await puppeteer.connect({
					browserWSEndpoint: this.wsEndpoint,
				});
				console.log(
					'Connected to existing browser at endpoint:',
					this.wsEndpoint,
				);
			} else {
				throw new Error('No WebSocket endpoint provided');
			}
		} catch (error) {
			console.error(
				'Failed to connect to existing browser, launching a new one...',
				error,
			);
			this.browser = await puppeteer.launch({
				headless: false,
				args: ['--no-sandbox', '--disable-setuid-sandbox'],
				timeout: 60000,
			});
			await this.saveToJSONFile(
				{ endpoint: this.browser.wsEndpoint() },
				'session.json',
			);
			console.log('Websocket endpoint JSON has been successfully saved');
		} finally {
			this.isLaunching = false;
		}
		const pages = await this.browser.pages();
		const blankPage = pages.find((page) => page.url() === 'about:blank');
		if (blankPage && !blankPage.isClosed()) {
			await blankPage.close();
		}
	}

	async resumeSessionFromFile(file) {
		try {
			const wsEndpointObj = await this.getFileContents(file);
			console.log(
				'Connecting to websocket endpoint: ',
				wsEndpointObj.endpoint,
			);
			this.browser = await puppeteer.connect({
				browserWSEndpoint: wsEndpointObj.endpoint,
			});
			console.log(
				'Successfully connected to previous session, using websocket URL from file ' +
					file,
			);
			this.isConnected = true;
			return this.browser;
		} catch (error) {
			throw error;
		}
	}
}

const browserHandler = new BrowserHandler();
browserHandler
	.resumeSessionFromFile('session.json')
	.catch(() => browserHandler.launchBrowser());

export default async function handler(req, res) {
	const { phoneNumber, message } = req.body;
	while (!browserHandler.browser) {
		await new Promise((resolve) => setTimeout(resolve, 150));
	}
	if (browserHandler.browser?.isConnected()) {
		let page;
		const pages = await browserHandler.browser.pages();
		const whatsappPage = pages.find((page) =>
			page.url().includes('https://web.whatsapp.com/'),
		);
		if (whatsappPage) {
			page = whatsappPage;
		} else {
			page = await browserHandler.browser.newPage();
			await page.goto('https://web.whatsapp.com/');
			await page.waitForTimeout(100);
		}
		try {
			const newChatButton = await page.waitForSelector(
				'div[data-tab="2"][title="New chat"]',
				{ timeout: 60000 },
			);
			await newChatButton.click();
			await page.waitForTimeout(100);
			const searchBox = await page.waitForSelector(
				'div[role="textbox"][data-tab="3"]',
				{ timeout: 60000 },
			);
			await searchBox.click();
			await page.keyboard.type(`+${phoneNumber}`);
			await page.waitForTimeout(100);
			await page.keyboard.press('Enter');
			let listItem = await page
				.waitForSelector('div[role="button"]._199zF._3j691', {
					timeout: 500,
				})
				.catch(() => {
					console.log('new contact not found');
					return null;
				});
			if (listItem === null) {
				listItem = await page.waitForSelector('div[role="listitem"]', {
					timeout: 300,
				});
			}
			await listItem.click();
			await page.waitForTimeout(200);
			const messageBox = await page.waitForSelector(
				'div[role="textbox"][data-tab="10"]',
				{ timeout: 60000 },
			);
			await messageBox.focus();
			await page.keyboard.type(message);
			await page.keyboard.press('Enter');
			res.json({ status: 'Message sent' });
			console.log('Message sent');
		} catch (error) {
			console.error('Failed to perform operation on page:', error);
		}
	} else {
		console.error('Browser is not connected');
	}
}
