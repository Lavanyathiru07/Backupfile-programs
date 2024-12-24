module.exports = {
	chrome: [{
		browserName: 'chrome',
		maxInstances: 3,
		acceptInsecureCerts: true,
		'goog:chromeOptions': {
			args: ['--ignore-certificate-errors','--enable-automation','--disable-gpu'],
			prefs: {
				'profile.managed_default_content_settings.popups' : 2,
				'profile.managed_default_content_settings.notifications' : 2,
			}
		},

		path: '/wd/hub'
	}],
	firefox: [{
		browserName: 'firefox',
		maxInstances: 5

	}],
	safari: [{
		browserName: 'safari',
		maxInstances: 5
	}],
	ie: [{
		browserName: 'internet explorer'
	}],
	edge: [{
		browserName: 'MicrosoftEdge',
		maxInstances: 1 // must be 1 for EdgeHtml, can be more for ChromiumEdge.
	}],
	phantomjs: [{
		browserName: 'phantomjs',
		platform: '',
		version: '',
		maxInstances: 5
	}],
	chromeFirefox: [{
		browserName: 'chrome',
		maxInstances: 5
	}, {
		browserName: 'firefox',
		maxInstances: 5
	}],
	chromeFirefoxSafari: [{
		browserName: 'chrome',
		maxInstances: 5
	}, {
		browserName: 'firefox',
		maxInstances: 5
	}, {
		browserName: 'safari',
		maxInstances: 5
	}],
	remoteFirefox: [{
		browserName: 'firefox',
		port: 4444
	}]
};
