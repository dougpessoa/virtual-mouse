/**
 *  add on the component -  className="whitespace-pre" - for texts with "\n"
 */

export const en = {
	global: {
		project: "Project",
		projects: "Projects",
		modules: "Modules",
		run: "Run",
		active: "Active",
		open: "Open",
		stopCollection: "Stop collection",
		delete: "Delete",
		deleting: "Deleting",
		cancel: "Cancel",
		erase: "Erase",
		login: "Login",
		close: "Close",
		wifi: "Wi-Fi",
		board: "Device",
		password: "Password",
		ssid: "SSID",
		change: "Change",
		exportData: "Export data",
		exporting: "Exporting",
		export: "Export",
		showAll: "Show all",
		hideAll: "Hide all",
		done: "Done",
		reorder: "Reorder",
		show: "Show",
		hide: "Hide",
		noResults: "No results",
		previous: "Previous",
		next: "Next",
		activeProject: "Active project",
		selected: "selected",
		rows: "row(s)",
		details: "Details",
		edit: "Edit",
		actions: "Actions",
		save: "Save",
		user: "User",
		port: "Port",
		yes: "Yes",
		no: "No",
		haveAccount: "Have an account?",
		createAccount: "Create an account",
		restrictedMode: "Restricted mode",
		typeThePassword: "Type the password",
		submit: "Submit",
		and: "and",
		welcome: "Welcome",

		time: {
			miliseconds: "miliseconds",
			seconds: "seconds",
			second: "second",
			minutes: "minutes",
			hours: "hours",
			days: "days",
		},

		table: {
			productName: "Product name",
			macAddress: "Serial Number",
			productCode: "Product code",
			actions: "Actions",
			unregister: "Unregister",
			register: "Register",
			wifiConfiguration: "Wi-Fi configuration",
			testConnection: "Test connection",
			noWifiModulesAvailable: "No Wi-Fi modules available.",
			noModulesAvailable: "No modules available.",
		},

		wifiSettings: {
			configurationTitle: "Wi-Fi device configuration",
			configurationDescription: "Please configure your Wi-Fi settings below",
			set: "Set",
			setting: "Setting...",
			updatedSuccessfully: "Wi-Fi settings updated successfully!",
			notUpdated: "Wi-Fi settings haven't been updated!",
			ssidTooShort: "SSID must be at least 1 character.",
			passwordTooShort: "Password must be at least 1 character.",
		},

		differencesModulesDialog: {
			modified: "Modified",
			new: "New",
			removed: "Removed",
			fromDevice: "From the device",
			runAnyway: "Run anyway",
		},

		graph: {
			resizing: "Resizing graph",
			resetZoom: "Reset zoom",
			zoom: "Zoom",
			screenshotSaved: "Screenshot saved",
			gettingScreenshot: "Getting screenshot",
			paused: "Paused",
			live: "Live",
			speed: "Graph speed",
			labels: "Labels",
			panZoom: "Pan zoom",
			panZoomEnabled: "Pan zoom - On - Click to turn off",
			panZoomDisabled: "Pan zoom - Off - Click to turn on",
			screenshot: "Screenshot",
			deleteProjectData: "Delete project data",
			exitFullscreen: "Exit full screen",
			fullScreen: "Full screen",
			dots: "dots",
			dotsTooltip: "This is the number of data points visible on the graph.",
			dotsTooltip2: "It depends on:",
			dotsTooltip3: "Number of traces",
			dotsTooltip4: "Sample interval",
			speedTooltip:
				"How long it takes for a data point to move across the graph.",
			day: "day",
			days: "days",
			hour: "hour",
			hours: "hours",
			minute: "minute",
			minutes: "minutes",
			second: "second",
			seconds: "seconds",
		},

		cards: {
			onGraph: "on Graph",
			selectType: "Select type",
			selectCorrectionFactor: "Select correction factor",
		},
		colorPicker: {
			addColor: "Add a color",
		},
		mobileConnection: {
			scanTheQrCode:
				"Scan the QR code with the SensorComms App to connect to the room or type the code below.",
			closeConnection: "Close connection",
		},
		loginDialog: {
			login: "Login",
			register: "Register",
			email: "Email",
			password: "Password",
			passwordAgain: "Confirm password",
			companyName: "Company name (optional)",
			fullName: "Full name",
			enterEmailAndPassword:
				"Enter your email address and password to sign in.",
			fillFields:
				"Fill in the fields below to create your account. Fields marked with * are required.",
			signIn: "Sign in",
			registering: "Registering...",
			signingIn: "Signing in...",
			createNewAccount: "Create a new account",
			alreadyHaveAccount: "Already have an account? Sign in",
			validateYourAccount: "Validate your account",
			weSentACodeToYourEmail:
				"We sent a code to your email ({email}) to validate your account.",
			validate: "Validate",
			resendCode: "Resend code",
			resending: "Resending...",
			validating: "Validating...",
			schema: {
				companyMin: "Company must be at least 2 characters.",
				nameMin: "Name must be at least 2 characters.",
				emailInvalid: "Invalid email format.",
				passwordMin: "Password must be at least 6 characters.",
				passwordAgainMin: "Please confirm your password.",
				passwordMatch: "Passwords do not match.",
			},
		},

		sidebar: {
			platform: "Platform",
			dashboard: "Dashboard",
			enterprise: "Enterprise",
			home: "Home",
			projects: "Projects",
			whiteboard: "Whiteboard",
			settings: "Settings",
			profile: "Profile",
			logout: "Logout",
			measurements: "Measurements",
			graph: "Graph",
			samples: "Samples",
			visualization: "Visualisation",
			networks: "Networks",
			seeAll: "See all",
			documentation: "Documentation",
			introduction: "Introduction",
			getStarted: "Get started",
			tutorials: "Tutorials",
			changelog: "Changelog",
			sampleInterval: "Sample interval",
			projectDeletation: {
				title: "Confirm deletion",
				description:
					'Are you sure you want to delete the project "{{name}}"?\nThis action cannot be undone.',
				warning: "You cannot delete the project you are currently editing.",
			},
			more: "More",
			viewProject: "View Project",
			shareProject: "Share Project",
			deleteProject: "Delete Project",
			stopCollection: "Stop collection",
			stopCollectionTooltip:
				"The project will stop collecting data and you will be redirected to home page.",
			goHomeTooltip: "Go home",
			goHomeTooltipTooltip:
				"The project will continue collecting data in the background.",
		},
	},
	home: {
		start: "Start",
		continueLastProject: "Continue last project used",
		continue: "Or continue",
		connectSensorComms: "Connect a SensorComms module to start.",
		startAProject: "Start a new project",

		confirmDeletionTitle: "Confirm deletion",
		confirmDeletionDescription:
			'Are you sure you want to delete the project "{{name}}"?\nThis action cannot be undone.',
		confirmRunDescription: 'Are you sure to run the "{{name}}" project?',
		modules: {
			connectedTitle: "Modules registered",
			loginToGetWifiModules: "To list modules, you need to login first",
		},
		loading: {
			mappingBoards: "Mapping the device{{plural}}...",
			analyzingModules: "Analysing modules...",
			testingConnection: "Testing connection...",
			mappingWifiBoards: "Mapping Wi-Fi device{{plural}}...",
		},
		success: {
			stopCollection: "Collection stopped successfully",
		},

		error: {
			stopCollection: "Failed to stop collection. Please try again.",
			verifyConnection: {
				title: "Verify your local connection",
				description: "We can't make a connection with the devices.",
			},
			userOffline:
				"You need to be online to make a conection with the devices.",
			boardNotConnected:
				"You selected one or more devices that failed to connect.",
			failedToStartProject: "Failed to start the project. Please try again.",
			unexpectedError: "An unexpected error occurred.",
			noModulesSelected: "No modules were selected.",
			modulesInUse: "Modules already in use",
			modulesInUseDescription:
				"The following modules are already part of the current project: {{modules}}",
		},
	},
	settings: {
		preferences: {
			title: "Preferences",
			language: "Language",
			selectLanguage: "Select language",
			themeTitle: "Theme",
			theme: {
				light: "Light",
				dark: "Dark",
				system: "System",
			},
		},
		profile: {
			editProfile: "Edit profile",
			upgradePlan: "Upgrade plan",
		},
		database: {
			title: "Database Management",
			deleteProjectData: "Delete project data",
			deleteProjectDataTooltip:
				'This will permanently erase all data for the project "{{name}}".',
			deleteProjectDataWarning:
				"Warning: This action cannot be undone. Make sure you have exported or backed up any important data before proceeding.",
			deleteData: "Delete data",
			factoryReset: "Factory reset",
			factoryResetTooltip:
				"Restores the application and database to their original state.",
			factoryResetWarning:
				"Warning: This action cannot be undone. Make sure you have exported or backed up any important data before proceeding.",
			factoryResetNote:
				"Note: This action is irreversible. Please ensure you have saved any necessary information.",
			reset: "Reset",
		},
		logout: {
			title: "Do you want to log out?",
			button: "Logout",
		},
		exportTo: {
			title: "Export to",
			button: "Export to",
			notification: {
				success: "Path selected and saved successfully!",
				error: "Failed to save selected path, please try again.",
			},
		},
		restrictedMode: {
			title: "Restricted mode",
			active: "Active",
			activeTooltip:
				"Toggle to enable or disable restricted mode for this application.",
			password: "Password",
			change: "Change",
			set: "Set",
			defaultProject: "Default project",
			defaultProjectTooltip:
				"Choose a project to automatically launch in restricted mode when you click 'Start'.",
			pages: "Pages",
			pagesTooltip:
				"Select which pages require password authentication or are hidden from non-admin users. Administrators always have full access.",
			pagesPlaceholder: "Choose pages to restrict",
			sampleInterval: "Sample interval",
			sampleIntervalTooltip:
				"Enable this to require a password whenever someone tries to change the sample interval.",
			passwordTooltip: {
				update: "Update your restricted mode password for enhanced security.",
				set: "Set a password to enable restricted mode and protect sensitive actions.",
			},
		},
	},
	project: {
		edit: "Edit project",
		details: "Project details",
		notFound: "Project not found",
		table: {
			filterByName: "Filter by name",
			removeSelectedProject: "Remove selected project",
			confirmDeletion: "Confirm deletion",
			confirmDeletionDescription:
				'Are you sure you want to delete the project "{{name}}"?\nThis action cannot be undone.',
			confirmDeletionNote:
				"This action is irreversible. Please ensure that you have backed up any important data before proceeding.",
			confirmDeletionIrreversible:
				"Once you erase the project, all associated data will be permanently deleted and cannot be recovered.",
			name: "Name",
			sampleInterval: "Sample interval",
			createdAt: "Created at",
			lastUpdatedAt: "Last updated at",
      status: "Status",
      pending: "Pending",
      done: "Ready"
		},
		form: {
			name: "Name",
			owner: "Owner",
			email: "Email",
			companyName: "Company name",
			boards: "Boards",
			macAddress: "Serial Number",
			sensors: "Sensors",
			module: "Module",
			alias: "Alias",
			color: "Colour",
			correctionFactor: "Correction factor",
			type: "Type",
			visible: "Visible",
			prefix: "Prefix",
			notifications: {
				projectUpdated: "Project updated.",
				error: "Error to save project, try again.",
				errorApplyingNewType: "An error occurred while applying the new type.",
				newTypeApplied: "The new type has been applied.",
				sensorOffsetUpdated: "Sensor offset has been updated.",
				applyingNewType: "Applying the new type...",
				settingCorrectionFactor: "Setting correction factor into the device...",
				correctionFactorSet: "Correction factor has been set.",
				errorSettingCorrectionFactor:
					"An error occurred while setting the correction factor.",
				validationErrors: "There are validation errors in the form.",
			},
			prefixTooltip:
				"Controls whether this board's alias is prepended to the aliases of all its sensors.",
			schema: {
				nameMin: "Name must be at least 2 characters.",
				ownerMin: "Owner must be at least 2 characters.",
				emailInvalid: "Invalid email format.",
				companyMin: "Company must be at least 2 characters.",
				aliasRequired: "Alias is required.",
				minimumValue: "Minimum value is -10.",
				maximumValue: "Maximum value is 10.",
				sensorTypeRequired: "Please select a sensor type.",
			},
			moduleSettings: {
				correctionFactorRange: "Correction factor must be between -10 and 10.",
			},
		},
		eraseConfirmation: {
			title: "Erase confirmation",
			description: "Are you sure to erase the project?",
			note: "Note: This action is irreversible. Please ensure that you have backed up any important data before proceeding.",
			irreversible:
				"Once you erase the project, all associated data will be permanently deleted and cannot be recovered.",
			proceed:
				"If you are certain you want to proceed, click the 'Erase' button below.",
			exportData:
				"You can also export the project data before erasing it by clicking the 'Export Data' button.",
		},
		exportDialog: {
			title: "Export project",
			description: "Export the project data to a file.",
			fileName: "File name",
			exportData: "Export data",
			numericId: "Numeric ID",
			readableName: "Readable name",
			thermocoupleType: "Thermocouple type format",
			savedAs: "Your file will be saved as:",
			fileType: "File type",
			dataLayout: "Data layout",
			groupedByTime: "Grouped by time",
			sequentialList: "Sequential list",
			dataFormat: "Data format",
			groupedByTimeTooltip:
				"Each row is a time point, with samples in columns. Best for comparing samples side-by-side.",
			sequentialListTooltip:
				"Each row is a single sample reading. Best for statistical analysis and use in other software.",
			readableNameTooltip:
				"Displays the full name, like 'Thermocouple Type E'. Best for manual reading.",
			numericIdTooltip:
				"Uses a numeric code for the type. Faster to process and ideal for importing into other software.",
		},
		autoSaveInput: {
			warning: "You must provide a name to save in the project",
			tooltip: "Change the project's name",
		},
	},
	whiteboard: {
		tabProjects: {
			title: "Projects",
			add: "Add",
			rename: "Rename",
			confirmDeletion: "Confirm deletion",
			confirmDeletionDescription:
				'Are you sure you want to delete the whiteboard "{{name}}"?\nThis action cannot be undone.',
		},
		contextMenu: {
			sendBackward: "Send backward",
			bringForward: "Bring forward",
			fillShape: "Fill shape",
			outlineOnly: "Outline only",
		},
		editBar: {
			strokeWidth: {
				thin: "Stroke width - Thin",
				bold: "Stroke width - Bold",
				extraBold: "Stroke width - Extra bold",
			},
		},
		menu: {
			handPanningTool: "Hand (panning tool) - [1]",
			selection: "Selection - [2]",
			rectangle: "Rectangle - [3]",
			ellipse: "Ellipse - [4]",
			triangle: "Triangle",
			rhombus: "Rhombus",
			line: "Line - [5]",
			corner: "Corner",
			cornerTopLeft: "Corner - Top left",
			cornerTopRight: "Corner - Top right",
			cornerBottomLeft: "Corner - Bottom left",
			cornerBottomRight: "Corner - Bottom right",
			draw: "Draw - [7]",
			text: "Text - [6]",
			zoom: "Zoom",
			image: "Image [8]",
			color: "Color",
			strokeWidth: "Stroke width",
			sensor: "Sensor",
			shapes: "Shapes",
			module: "Module",
			templates: "Templates",
			sensorComms: "Sensor Comms",
			copy: "Copy",
		},
		modulesDropdown: {
			name: "Name",
			macAddress: "Serial Number",
			productCode: "Product code",
		},
		templateCard: {
			add: "Add",
		},
		templatesDialog: {
			allNetworks: "All networks",
			quantityOfBoards: "Quantity of boards",
			quantityOfSensors: "Quantity of sensors",
		},
		undoRedo: {
			undo: "Undo",
			redo: "Redo",
		},
		zoomBar: {
			zoomOut: "Zoom out",
			resetZoom: "Reset zoom",
			zoomIn: "Zoom in",
		},
	},

	contexts: {
		useCommunications: {
			loading: "Analysing device...",
			success: {
				analysisCompleted: "Device analysis completed and device connected",
				analysisCompletedButton: "Have a look",
				projectRunning: "Project {{projectName}} is running",
			},
			error: {
				analysisFailed: "Device analysis failed",
				analysisFailedDescription:
					"Device analysis failed, please remove and reconnect the device",
			},
			info: {
				disconnected: "Disconnected",
				disconnectedDescriptionOn:
					"The project has been paused for safety because a connected device was unexpectedly disconnected.",
				disconnectedDescriptionOff: "The device was disconnected.",
			},
		},
		useBroadcast: {
			error: {
				connectionError: "Connection error occurred",
				connectionErrorDescription: "There was an error through the connection",
				connectionClosed: "Connection closed",
				connectionClosedDescription: "The connection has been closed.",
			},
			warning: {
				noInternet: "No internet connection",
				noInternetDescription: "Please check your internet connection.",
				backOnline: "Back online",
				backOnlineDescription: "You are back online.",
			},
		},
		useIot: {
			loading: {
				registering: "Registering device...",
				unregistering: "Unregistering device...",
				connecting: "Testing device...",
			},
			success: {
				registered: "Successfully registered",
				unregistered: "Successfully unregistered",
				connected: "Successfully connected",
				connectedDescription:
					"The device {{mac}} has been successfully connected",
				registeredDescription: "The device has been successfully registered.",
				unregisteredDescription:
					"The device has been successfully unregistered.",
			},
			error: {
				fetchingModules: "Error fetching modules",
				fetchingModulesDescription:
					"Unable to fetch online modules. Please check your connection or try again later.",
				registeredFailed: "Registration failed",
				unregisteredFailed: "Unregistration failed",
				connected: "Connection failed",
				connectedDescription:
					"Check the connection of device {{mac}} or your internet and try it again.",
				requestFailed: "Request failed",
				requestFailedDescription:
					"Please check your connection or try again later.",
				macIsNotResponding: "is not responding.",
				deviceNotRespondingDescription:
					"Please check the device's network connection and power status.",
				connectionLost:
					"The project has been interrupted due to a lost connection from your machine.",
				connectionLostCheck:
					"Please check your internet connection and try again.",
				connectionLostCloseOpenSoftware:
					"If the issue persists, please close and reopen the software.",
				wifiModuleError: "Wi-Fi module error",
				wifiModuleErrorDescription:
					"An error occurred with the Wi-Fi module. Please restart the module or check its configuration.",
			},
			info: {
				connectionLost: "Connection Lost",
				connectionLostDescription: `We've lost connection to the server. Please check your internet connection or Wi-Fi modules. If the issue persists, try reconnecting. #SC{{code}}E`,
			},
		},
		useProjects: {
			loading: {
				startApplication: "Starting application...",
				erasing: "Erasing",
				restarting: "Restarting",
				projectExporting:
					"The project is being exported to the cloud.",
			},
			success: {
				projectExported:
					"Project exported successfully. You can find it in the '{{folderName}}' folder.",
				sampleInvervalUpdated: "Sample interval updated successfully.",
				projectDeleted: "Project deleted successfully.",
				selectedProjectsDeleted: "Selected projects deleted successfully.",
				projectOnlineExported: "Project exported successfully to the cloud.",
				projectOnlineExportedButton: "Download",
			},
			error: {
				directoryDoesntExist:
					"The specified directory ({{path}}) does not exist.",
				failedToExportProject:
					"Failed to export the project. Please try again.",
			},
		},
		useRestrictedMode: {
			dialog: {
				title: "Restricted mode password",
				description: "Enter the password to continue.",
				password: "Password",
				change: "Change",
				set: "Set",
				restrictedArea: "Restricted",
				area: "area",
				action: "action",
				unlock: "Unlock",
				typeAgainPassword: "Type again password",
				oldPassword: "Type the current password",
				newPassword: "Type the new password",
			},
			success: {
				passwordChanged: "Password changed successfully.",
			},
			warning: {
				incorrectPassword: "The password is incorrect.",
				currentIncorrentPassword: "Current password is incorrect.",
				newPasswordNotMatched: "New passwords do not match.",
			},
		},
		useUser: {
			success: {
				accountCreated: "Your account has been created successfully!",
				accountCreatedDescription:
					"We sent a code to your email to validate your account.",
				accountVerified: "Verified successfully.",
				accountVerifiedDescription:
					"Your account was succefully verified. Now you can sign in.",
				codeSent: "Code sent",
				codeSentDescription: "We sent a code to your email ({{email}}).",
			},
			error: {
				notAuthorized: "Not authorized.",
				unexpectedError: "An unexpected error occurred on trying to login.",
				createFailed: "Error to create account.",
				createFailedDescription:
					"An error occurred while processing your request.",
				invalidCode: "The code you entered is invalid.",
				verficationFailed: "Verification failed",
				verficationFailedDescription:
					"Your verification attempt was unsuccessful. Please try again.",
				codeNotSent: "The code was not sent.",
				codeNotSentDescription:
					"An unnexpected error occured. Please try again.",
			},
			warning: {
				codeSent: "We sent a code to your email.",
			},
		},
		useWhiteboard: {
			copy: "Copied to clipboard!",
			errorToClipboard: "Error to clipboard",
			errorToParseJSON: "Error to parse JSON",
		},
	},

	// Refresh Token Components
	components: {
		AuthStatus: {
			notLoggedIn: "Not logged in",
			checking: "Checking...",
			valid: "Valid",
			invalid: "Invalid",
			needsRefresh: "Needs refresh",
			expiresIn: "Expires in",
			refresh: "Refresh",
		},

		StorePreferenceDialog: {
			title: "Project and data storage location",
			description:
				"Choose where you would like to store your project and data — on your computer or in the cloud.\n<strong>Local storage</strong> lets you use your data even without an internet connection.\n<strong>Cloud storage</strong> allows you to access your data from any device with an internet connection.\nIf you pick local storage, your data will only be available on this computer. To use cloud storage, make sure you are signed in.",
			localStorage: "Local storage",
			cloudStorage: "Cloud storage",
			footerNote: "You can change this any time in the Settings page.",
			tooltipDisabled:
				"You cannot change the storage preference while a project is open.",
		},
	},

	// Refresh Token Hooks
	hooks: {
		useRefreshToken: {
			success: {
				tokensRefreshed: "Tokens refreshed successfully",
			},
			error: {
				refreshFailed: "Failed to refresh tokens",
			},
		},
	},

	shadcn: {
		selectAll: "Select all",
	},
};
