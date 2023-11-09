// import puppeteer from 'puppeteer';
// import { promises as fs } from 'fs';

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
// 		await fs.writeFile(file, JSON.stringify(data));
// 		return file;
// 	}

// 	async getFileContents(file) {
// 		const data = await fs.readFile(file);
// 		return JSON.parse(data);
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
// 				timeout: 2147483647,
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
// 		try {
// 			const wsEndpointObj = await this.getFileContents(file);
// 			console.log(
// 				'Connecting to websocket endpoint: ',
// 				wsEndpointObj.endpoint,
// 			);
// 			this.browser = await puppeteer.connect({
// 				browserWSEndpoint: wsEndpointObj.endpoint,
// 			});
// 			console.log(
// 				'Successfully connected to previous session, using websocket URL from file ' +
// 					file,
// 			);
// 			this.isConnected = true;
// 			return this.browser;
// 		} catch (error) {
// 			throw error;
// 		}
// 	}
// }

// const browserHandler = new BrowserHandler();
// browserHandler
// 	.resumeSessionFromFile('session.json')
// 	.catch(() => browserHandler.launchBrowser());

// export default async function handler(req, res) {
// 	const { phoneNumber, message } = req.body;
// 	while (!browserHandler.browser) {
// 		await new Promise((resolve) => setTimeout(resolve, 150));
// 	}
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
// 			await page.waitForTimeout(150);
// 		}
// 		try {
// 			let retries = 5;
// 			let newChatButton;
// 			while (retries--) {
// 				try {
// 					newChatButton = await page.waitForSelector(
// 						'div[data-tab="2"][title="New chat"]',
// 						{ timeout: 2147483647 },
// 					);
// 					await newChatButton.click();
// 					break;
// 				} catch (err) {
// 					if (err.message.includes('Node is detached from document')) {
// 						console.log('Retrying click operation');
// 					} else {
// 						throw err;
// 					}
// 				}
// 			}
// 			await page.waitForTimeout(100);
// 			let retries2 = 5;
// 			while (retries2--) {
// 				try {
// 					const searchBox = await page.waitForSelector(
// 						'div[role="textbox"][data-tab="3"]',
// 						{ timeout: 2147483647 },
// 					);
// 					await searchBox.click();
// 					await page.keyboard.type(`+${phoneNumber}`);
// 					await page.keyboard.press('Enter');
// 					break;
// 				} catch (err) {
// 					if (err.message.includes('Node is detached from document')) {
// 						console.log('Retrying type operation');
// 					} else {
// 						throw err;
// 					}
// 				}
// 			}

// 			let retries3 = 5;
// 			let listItem;
// 			while (retries3--) {
// 				try {
// 					listItem = await page
// 						.waitForSelector('div[role="button"]._199zF._3j691', {
// 							timeout: 500,
// 						})
// 						.catch(() => {
// 							console.log('contact already added');
// 							return null;
// 						});
// 					if (listItem) {
// 						await listItem.click();
// 					}
// 					break;
// 				} catch (err) {
// 					if (err.message.includes('Node is detached from document')) {
// 						console.log('Retrying click operation');
// 					} else {
// 						throw err;
// 					}
// 				}
// 			}

// 			if (listItem === null || listItem === undefined) {
// 				let retries4 = 5;
// 				let searchBox2;
// 				while (retries4--) {
// 					try {
// 						searchBox2 = await page.waitForSelector(
// 							'div[role="textbox"][data-tab="3"]',
// 							{ timeout: 2147483647 },
// 						);
// 						await searchBox2.click();
// 						await page.keyboard.type(`+${phoneNumber}`);
// 						await page.waitForTimeout(150);
// 						await page.keyboard.press('Enter');
// 						listItem = await page.waitForSelector(
// 							'div[role="listitem"]',
// 							{
// 								timeout: 2147483647,
// 							},
// 						);
// 						await listItem.click();
// 						break;
// 					} catch (err) {
// 						if (err.message.includes('Node is detached from document')) {
// 							console.log('Retrying operation');
// 						} else {
// 							throw err;
// 						}
// 					}
// 				}
// 			}

// 			await page.waitForTimeout(150);
// 			let retries5 = 5;
// 			let messageBox;
// 			while (retries5--) {
// 				try {
// 					messageBox = await page.waitForSelector(
// 						'div[role="textbox"][data-tab="10"]',
// 						{ timeout: 2147483647 },
// 					);
// 					await messageBox.focus();
// 					await page.keyboard.type(message);
// 					await page.keyboard.press('Enter');
// 					break;
// 				} catch (err) {
// 					if (err.message.includes('Node is detached from document')) {
// 						console.log('Retrying operation');
// 					} else {
// 						throw err;
// 					}
// 				}
// 			}

// 			res.json({ status: 'Message sent' });
// 			console.log('Message sent');
// 		} catch (error) {
// 			console.error('Failed to perform operation on page:', error);
// 		}
// 	} else {
// 		console.error('Browser is not connected');
// 	}
// }
