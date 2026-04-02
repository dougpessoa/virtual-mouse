import type { Translations } from "..";

export const ptBr: Translations = {
	global: {
		project: "Projeto",
		projects: "Projetos",
		modules: "Módulos",
		run: "Executar",
		active: "Ativo",
		open: "Abrir",
		stopCollection: "Parar coleta",
		deleting: "Apagando",
		delete: "Apagar",
		cancel: "Cancelar",
		login: "Login",
		close: "Fechar",
		wifi: "Wi-Fi",
		board: "Dispositivo",
		password: "Senha",
		ssid: "SSID",
		change: "Alterar",
		erase: "Apagar",
		exportData: "Exportar dados",
		exporting: "Exportando",
		export: "Exportar",
		showAll: "Mostrar tudo",
		hideAll: "Ocultar tudo",
		activeProject: "Projeto ativo",
		done: "Concluído",
		reorder: "Reordenar",
		show: "Mostrar",
		hide: "Ocultar",
		noResults: "Sem resultados",
		previous: "Anterior",
		next: "Próximo",
		selected: "selecionado(s)",
		rows: "linha(s)",
		details: "Detalhes",
		edit: "Editar",
		actions: "Ações",
		save: "Salvar",
		user: "Usuário",
		port: "Porta",
		yes: "Sim",
		no: "Não",
		haveAccount: "Já tem uma conta?",
		createAccount: "Criar uma conta",
		restrictedMode: "Modo restrito",
		typeThePassword: "Digite a senha",
		submit: "Enviar",
		and: "e",
		welcome: "Bem-vindo",

		time: {
			miliseconds: "milissegundos",
			seconds: "segundos",
			second: "segundo",
			minutes: "minutos",
			hours: "horas",
			days: "dias",
		},

		table: {
			productName: "Nome do produto",
			macAddress: "Número de série",
			productCode: "Código do produto",
			actions: "Ações",
			unregister: "Remover da conta",
			register: "Salvar na conta",
			wifiConfiguration: "Configuração Wi-Fi",
			testConnection: "Testar conexão",
			noWifiModulesAvailable: "Nenhum módulo Wi-Fi disponível.",
			noModulesAvailable: "Nenhum módulo disponível.",
		},

		wifiSettings: {
			configurationTitle: "Configuração do dispositivo Wi-Fi",
			configurationDescription:
				"Digite as configurações do seu dispositivo Wi-Fi abaixo",
			set: "Configurar",
			setting: "Configurando...",
			updatedSuccessfully: "Configurações do Wi-Fi atualizadas com sucesso!",
			notUpdated: "As configurações do Wi-Fi não foram atualizadas!",
			ssidTooShort: "O SSID deve ter pelo menos 1 caractere.",
			passwordTooShort: "A senha deve ter pelo menos 1 caractere.",
		},

		differencesModulesDialog: {
			modified: "Modificado",
			new: "Novo",
			removed: "Removido",
			fromDevice: "Do dispositivo",
			runAnyway: "Executar assim mesmo",
		},

		graph: {
			resizing: "Redimensionando gráfico",
			resetZoom: "Redefinir zoom",
			zoom: "Zoom",
			screenshotSaved: "Captura de tela salva",
			gettingScreenshot: "Obtendo captura de tela",
			paused: "Pausado",
			live: "Ao vivo",
			speed: "Velocidade do gráfico",
			labels: "Rótulos",
			panZoom: "Pan e zoom",
			panZoomEnabled: "Pan e zoom - Ativado",
			panZoomDisabled: "Pan e zoom - Desativado",
			screenshot: "Captura de tela",
			deleteProjectData: "Apagar dados do projeto",
			exitFullscreen: "Sair da tela cheia",
			fullScreen: "Tela cheia",
			dots: "pontos",
			dotsTooltip: "Este é o número de pontos de dados visíveis no gráfico.",
			dotsTooltip2: "Depende de:",
			dotsTooltip3: "Número de traços",
			dotsTooltip4: "Intervalo de amostragem",
			speedTooltip:
				"Quanto tempo leva para um ponto de dado atravessar o gráfico.",
			day: "dia",
			days: "dias",
			hour: "hora",
			hours: "horas",
			minute: "minuto",
			minutes: "minutos",
			second: "segundo",
			seconds: "segundos",
		},
		cards: {
			onGraph: "no Gráfico",
			selectType: "Selecione o tipo",
			selectCorrectionFactor: "Selecione o fator de correção",
		},
		colorPicker: {
			addColor: "Adicionar uma cor",
		},
		mobileConnection: {
			scanTheQrCode:
				"Escaneie o QR code com o App SensorComms para conectar à sala ou digite o código abaixo.",
			closeConnection: "Fechar conexão",
		},
		loginDialog: {
			login: "Login",
			register: "Registrar",
			email: "E-mail",
			password: "Senha",
			passwordAgain: "Confirmar senha",
			companyName: "Nome da empresa (opcional)",
			fullName: "Nome completo",
			enterEmailAndPassword: "Digite seu e-mail e senha para entrar.",
			fillFields:
				"Preencha os campos abaixo para criar sua conta. Campos marcados com * são obrigatórios.",
			signIn: "Entrar",
			registering: "Registrando...",
			signingIn: "Entrando...",
			createNewAccount: "Criar nova conta",
			alreadyHaveAccount: "Já tem uma conta? Entre",
			validateYourAccount: "Valide sua conta",
			weSentACodeToYourEmail:
				"Enviamos um código para seu e-mail ({email}) para validar sua conta.",
			validate: "Validar",
			resendCode: "Reenviar código",
			resending: "Reenviando...",
			validating: "Validando...",
			schema: {
				companyMin: "A empresa deve ter pelo menos 2 caracteres.",
				nameMin: "O nome deve ter pelo menos 2 caracteres.",
				emailInvalid: "Formato de e-mail inválido.",
				passwordMin: "A senha deve ter pelo menos 6 caracteres.",
				passwordAgainMin: "Por favor, confirme sua senha.",
				passwordMatch: "As senhas não coincidem.",
			},
		},
		sidebar: {
			platform: "Plataforma",
			dashboard: "Painel",
			enterprise: "Empresa",
			home: "Início",
			projects: "Projetos",
			whiteboard: "Quadro branco",
			settings: "Configurações",
			profile: "Perfil",
			logout: "Sair",
			measurements: "Medições",
			graph: "Gráfico",
			samples: "Amostras",
			visualization: "Visualização",
			networks: "Redes",
			seeAll: "Ver tudo",
			documentation: "Documentação",
			introduction: "Introdução",
			getStarted: "Começar",
			tutorials: "Tutoriais",
			changelog: "Registro de alterações",
			sampleInterval: "Intervalo de amostragem",
			projectDeletation: {
				title: "Confirmar deleção",
				description:
					'Tem certeza que deseja apagar o projeto "{{name}}"?\nEsta ação não pode ser desfeita.',
				warning: "Você não pode apagar o projeto que você está editando.",
			},
			more: "Mais",
			viewProject: "Ver projeto",
			shareProject: "Compartilhar projeto",
			deleteProject: "Apagar projeto",
			stopCollection: "Parar coleta",
			stopCollectionTooltip:
				"O projeto irá parar de coletar dados e você será redirecionado para a página inicial",
			goHomeTooltip: "Ir para início",
			goHomeTooltipTooltip:
				"O projeto irá continuar coletando dados em segundo plano",
		},
	},
	home: {
		start: "Iniciar",
		continueLastProject: "Continue com o último projeto usado",
		continue: "Ou continue",
		connectSensorComms: "Conecte um módulo SensorComms para começar.",
		startAProject: "Inicie um novo projeto",
		confirmDeletionTitle: "Confirmar deleção",
		confirmDeletionDescription:
			'Tem certeza que deseja apagar o projeto "{{name}}"?\nEsta ação não pode ser desfeita.',
		confirmRunDescription: 'Tem certeza em executar o projeto "{{name}}"?',
		modules: {
			connectedTitle: "Módulos registrados",
			loginToGetWifiModules: "Faça login para acessar os módulos Wi-Fi",
		},
		loading: {
			mappingBoards: "Mapeando módulo{{plural}}...",
			testingConnection: "Testando conexão...",
			analyzingModules: "Analisando módulos...",
			mappingWifiBoards: "Mapeando módulo{{plural}} Wi-Fi...",
		},
		success: {
			stopCollection: "Coleta parada com sucesso",
		},
		error: {
			stopCollection: "Falha ao parar coleta. Por favor, tente novamente.",
			verifyConnection: {
				title: "Verifique sua conexão",
				description:
					"Não conseguimos estabelecer uma conexão com os módulos Wi-Fi.",
			},
			userOffline:
				"Você precisa estar conectado para realizar uma conexão com os módulos",
			boardNotConnected:
				"Você selecionou um ou mais dispositivos que não conseguiram se conectar.",
			failedToStartProject:
				"Falha ao iniciar o projeto. Por favor, tente novamente.",
			unexpectedError: "Ocorreu um erro inesperado.",
			noModulesSelected: "Nenhum módulo foi selecionado.",
			modulesInUse: "Módulos já em uso",
			modulesInUseDescription:
				"Os seguintes módulos já fazem parte do projeto atual: {{modules}}",
		},
	},
	settings: {
		preferences: {
			title: "Preferências",
			language: "Idioma",
			selectLanguage: "Selecione o idioma",
			themeTitle: "Tema",
			theme: {
				light: "Claro",
				dark: "Escuro",
				system: "Sistema",
			},
		},
		profile: {
			editProfile: "Editar perfil",
			upgradePlan: "Atualizar plano",
		},
		database: {
			title: "Banco de dados",
			deleteProjectData: "Apagar dados do projeto",
			deleteProjectDataTooltip:
				'Isso irá apagar todos os dados do projeto "{{name}}" permanentemente.',
			deleteProjectDataWarning:
				"Aviso: Esta ação não pode ser desfeita. Certifique-se de exportar ou fazer backup de quaisquer dados importantes antes de prosseguir.",
			deleteData: "Apagar dados",
			factoryReset: "Restaurar padrão de fábrica",
			factoryResetTooltip:
				"Restaura o aplicativo e o banco de dados para o estado original.",
			factoryResetWarning:
				"Aviso: Esta ação não pode ser desfeita. Certifique-se de exportar ou fazer backup de quaisquer dados importantes antes de prosseguir.",
			factoryResetNote:
				"Nota: Esta ação é irreversível. Por favor, certifique-se de salvar as informações necessárias.",
			reset: "Redefinir",
		},
		logout: {
			title: "Deseja sair?",
			button: "Sair",
		},
		exportTo: {
			title: "Exportar para",
			button: "Exportar para",
			notification: {
				success: "Caminho selecionado e salvo com sucesso!",
				error: "Falha ao salvar o caminho selecionado, tente novamente.",
			},
		},
		restrictedMode: {
			title: "Modo restrito",
			active: "Ativo",
			activeTooltip:
				"Alternar para ativar ou desativar o modo restrito para este aplicativo.",
			password: "Senha",
			change: "Alterar",
			set: "Definir",
			defaultProject: "Projeto padrão",
			defaultProjectTooltip:
				"Escolha um projeto para iniciar automaticamente no modo restrito ao clicar em 'Iniciar'.",
			pages: "Páginas",
			pagesTooltip:
				"Selecione quais páginas exigem autenticação por senha ou são ocultas de usuários não administradores. Administradores sempre têm acesso total.",
			pagesPlaceholder: "Escolha as páginas para restringir",
			sampleInterval: "Intervalo de amostragem",
			sampleIntervalTooltip:
				"Ative para exigir senha sempre que alguém tentar alterar o intervalo de amostragem.",
			passwordTooltip: {
				update: "Atualize sua senha do modo restrito para maior segurança.",
				set: "Defina uma senha para ativar o modo restrito e proteger ações sensíveis.",
			},
		},
	},
	contexts: {
		useCommunications: {
			loading: "Analisando dispositivo...",
			success: {
				analysisCompleted:
					"Análise do dispositivo concluída e dispositivo conectado",
				analysisCompletedButton: "Ver detalhes",
				projectRunning: "Projeto {{projectName}} está em execução",
			},
			error: {
				analysisFailed: "Falha na análise do dispositivo",
				analysisFailedDescription:
					"A análise do dispositivo falhou, por favor remova e reconecte o dispositivo",
			},
			info: {
				disconnected: "Desconectado",
				disconnectedDescriptionOn:
					"O projeto foi pausado por segurança porque um dispositivo conectado foi desconectado inesperadamente.",
				disconnectedDescriptionOff: "O dispositivo foi desconectado.",
			},
		},
		useBroadcast: {
			error: {
				connectionError: "Ocorreu um erro de conexão.",
				connectionErrorDescription: "Ocorreu um erro na conexão.",
				connectionClosed: "Conexão encerrada",
				connectionClosedDescription: "A conexão foi encerrada.",
			},
			warning: {
				noInternet: "Sem conexão com a internet",
				noInternetDescription:
					"Por favor, verifique sua conexão com a internet.",
				backOnline: "Conexão restabelecida",
				backOnlineDescription: "Você está online novamente.",
			},
		},
		useIot: {
			loading: {
				registering: "Registrando dispositivo...",
				unregistering: "Removendo registro do dispositivo...",
				connecting: "Testando dispositivo...",
			},
			success: {
				registered: "Registrado com sucesso",
				unregistered: "Removido com sucesso",
				connected: "Conectado com sucesso",
				connectedDescription: "O dispositivo {{mac}} foi conectado com sucesso",
				registeredDescription: "O dispositivo foi registrado com sucesso.",
				unregisteredDescription: "O dispositivo foi removido com sucesso.",
			},
			error: {
				fetchingModules: "Erro ao buscar módulos",
				fetchingModulesDescription:
					"Não foi possível buscar os módulos online. Por favor, verifique sua conexão ou tente novamente mais tarde.",
				registeredFailed: "Falha ao registrar",
				unregisteredFailed: "Falha ao remover registro",
				connected: "Falha na conexão",
				connectedDescription:
					"Verifique a conexão do dispositivo {{mac}} ou sua internet e tente novamente.",
				requestFailed: "Falha na requisição",
				requestFailedDescription:
					"Por favor, verifique sua conexão ou tente novamente mais tarde.",
				macIsNotResponding: "não está respondendo.",
				deviceNotRespondingDescription:
					"Por favor, verifique a conexão de rede e o status de energia do dispositivo.",
				connectionLost:
					"O projeto foi interrompido devido à perda de conexão com sua máquina.",
				connectionLostCheck:
					"Por favor, verifique sua conexão com a internet e tente novamente.",
				connectionLostCloseOpenSoftware:
					"Se o problema persistir, feche e reabra o software.",
				wifiModuleError: "Erro no módulo Wi-Fi",
				wifiModuleErrorDescription:
					"Ocorreu um erro com o módulo Wi-Fi. Por favor, reinicie o módulo ou verifique sua configuração.",
			},
			info: {
				connectionLost: "Conexão perdida",
				connectionLostDescription:
					"Perdemos a conexão com o servidor. Por favor, verifique sua conexão com a internet ou os módulos Wi-Fi. Se o problema persistir, tente reconectar. #SC{{code}}E",
			},
		},
		useProjects: {
			loading: {
				startApplication: "Iniciando aplicação...",
				erasing: "Apagando",
				restarting: "Reiniciando",
				projectExporting: "O projeto está sendo exportado para a nuvem.",
			},
			success: {
				projectExported:
					"Projeto exportado com sucesso. Você pode encontrá-lo na pasta '{{folderName}}'.",
				sampleInvervalUpdated:
					"Intervalo de amostragem atualizado com sucesso.",
				projectDeleted: "Projeto apagado com sucesso.",
				selectedProjectsDeleted: "Projetos selecionados apagados com sucesso.",
				projectOnlineExported: "Projeto exportado com sucesso para a nuvem.",
				projectOnlineExportedButton: "Baixar",
			},
			error: {
				directoryDoesntExist: "O diretório especificado ({{path}}) não existe.",
				failedToExportProject:
					"Falha ao exportar o projeto. Por favor, tente novamente.",
			},
		},
		useRestrictedMode: {
			dialog: {
				title: "Senha do modo restrito",
				description: "Digite a senha para continuar.",
				password: "Senha",
				change: "Alterar",
				set: "Definir",
				restrictedArea: "Restrito",
				area: "área",
				action: "ação",
				unlock: "Desbloquear",
				typeAgainPassword: "Digite a senha novamente",
				oldPassword: "Digite a senha atual",
				newPassword: "Digite a nova senha",
			},
			success: {
				passwordChanged: "Senha alterada com sucesso.",
			},
			warning: {
				incorrectPassword: "A senha está incorreta.",
				currentIncorrentPassword: "A senha atual está incorreta.",
				newPasswordNotMatched: "As novas senhas não coincidem.",
			},
		},
		useUser: {
			success: {
				accountCreated: "Sua conta foi criada com sucesso!",
				accountCreatedDescription:
					"Enviamos um código para o seu e-mail para validar sua conta.",
				accountVerified: "Verificado com sucesso.",
				accountVerifiedDescription:
					"Sua conta foi verificada com sucesso. Agora você pode fazer login.",
				codeSent: "Código enviado",
				codeSentDescription:
					"Enviamos um código para o seu e-mail ({{email}}).",
			},
			error: {
				notAuthorized: "Não autorizado.",
				unexpectedError: "Ocorreu um erro inesperado ao tentar fazer login.",
				createFailed: "Erro ao criar conta.",
				createFailedDescription:
					"Ocorreu um erro ao processar sua solicitação.",
				invalidCode: "O código inserido é inválido.",
				verficationFailed: "Falha na verificação",
				verficationFailedDescription:
					"Sua tentativa de verificação não foi bem-sucedida. Por favor, tente novamente.",
				codeNotSent: "O código não foi enviado.",
				codeNotSentDescription:
					"Ocorreu um erro inesperado. Por favor, tente novamente.",
			},
			warning: {
				codeSent: "Enviamos um código para o seu e-mail.",
			},
		},
		useWhiteboard: {
			copy: "Copiado para a área de transferência!",
			errorToClipboard: "Erro ao copiar",
			errorToParseJSON: "Erro ao analisar JSON",
		},
	},

	// Refresh Token Components
	components: {
		AuthStatus: {
			notLoggedIn: "Não logado",
			checking: "Verificando...",
			valid: "Válido",
			invalid: "Inválido",
			needsRefresh: "Precisa de renovação",
			expiresIn: "Expira em",
			refresh: "Renovar",
		},

		StorePreferenceDialog: {
			title: "Local de amarzenamento de projetos e dados",
			description:
				"Escolha onde você deseja armazenar seus projetos e dados — no seu computador ou na nuvem.\nO <strong>armazenamento local</strong> permite usar seus dados mesmo sem conexão com a internet.\nO <strong>armazenamento em nuvem</strong> permite acessar seus dados de qualquer dispositivo com conexão à internet.\nSe você escolher armazenamento local, seus dados estarão disponíveis apenas neste computador. Para usar armazenamento em nuvem, certifique-se de estar conectado à internet e feito login na sua conta.",
			localStorage: "Armazenamento local",
			cloudStorage: "Armazenamento em nuvem",
			footerNote:
				"Você pode alterar isso a qualquer momento na página de Configurações.",
			tooltipDisabled:
				"Você não pode alterar a preferência de armazenamento enquanto um projeto estiver aberto.",
		},
	},

	// Refresh Token Hooks
	hooks: {
		useRefreshToken: {
			success: {
				tokensRefreshed: "Tokens renovados com sucesso",
			},
			error: {
				refreshFailed: "Falha ao renovar tokens",
			},
		},
	},

	project: {
		edit: "Editar projeto",
		details: "Detalhes do projeto",
		notFound: "Projeto não encontrado",
		table: {
			filterByName: "Filtrar por nome",
			removeSelectedProject: "Remover projeto selecionado",
			confirmDeletion: "Confirmar deleção",
			confirmDeletionDescription:
				'Tem certeza que deseja apagar o projeto "{{name}}"?\nEsta ação não pode ser desfeita.',
			confirmDeletionNote:
				"Esta ação é irreversível. Por favor, certifique-se de ter feito backup de quaisquer dados importantes antes de prosseguir.",
			confirmDeletionIrreversible:
				"Uma vez apagado o projeto, todos os dados associados serão permanentemente excluídos e não poderão ser recuperados.",
			name: "Nome",
			sampleInterval: "Intervalo de amostragem",
			createdAt: "Criado em",
			lastUpdatedAt: "Última atualização",
      status: "Status",
      pending: "Pendente",
      done: "Pronto"
		},
		form: {
			name: "Nome",
			owner: "Proprietário",
			email: "E-mail",
			companyName: "Nome da empresa",
			boards: "Dispositivos",
			macAddress: "Número de série",
			sensors: "Sensores",
			module: "Módulo",
			alias: "Apelido",
			color: "Cor",
			correctionFactor: "Fator de correção",
			type: "Tipo",
			visible: "Visível",
			prefix: "Prefixo",
			notifications: {
				projectUpdated: "Projeto atualizado.",
				error: "Erro ao salvar o projeto, tente novamente.",
				errorApplyingNewType: "Ocorreu um erro ao aplicar o novo tipo.",
				newTypeApplied: "O novo tipo foi aplicado.",
				sensorOffsetUpdated: "Offset do sensor atualizado.",
				applyingNewType: "Aplicando o novo tipo...",
				settingCorrectionFactor:
					"Definindo fator de correção no dispositivo...",
				correctionFactorSet: "Fator de correção definido.",
				errorSettingCorrectionFactor:
					"Ocorreu um erro ao definir o fator de correção.",
				validationErrors: "Há erros de validação no formulário.",
			},
			prefixTooltip:
				"Controla se o apelido deste dispositivo é precedido pelo apelido de todos os seus sensores.",
			schema: {
				nameMin: "O nome deve ter pelo menos 2 caracteres.",
				ownerMin: "O proprietário deve ter pelo menos 2 caracteres.",
				emailInvalid: "Formato de e-mail inválido.",
				companyMin: "A empresa deve ter pelo menos 2 caracteres.",
				aliasRequired: "Apelido é obrigatório.",
				minimumValue: "O valor mínimo é -10.",
				maximumValue: "O valor máximo é 10.",
				sensorTypeRequired: "Selecione um tipo de sensor.",
			},
			moduleSettings: {
				correctionFactorRange: "O fator de correção deve estar entre -10 e 10.",
			},
		},
		eraseConfirmation: {
			title: "Confirmação de deleção",
			description: "Tem certeza que deseja apagar o projeto?",
			note: "Nota: Esta ação é irreversível. Por favor, certifique-se de ter feito backup de quaisquer dados importantes antes de prosseguir.",
			irreversible:
				"Uma vez apagado o projeto, todos os dados associados serão permanentemente excluídos e não poderão ser recuperados.",
			proceed:
				"Se tiver certeza que deseja prosseguir, clique no botão 'Apagar' abaixo.",
			exportData:
				"Você também pode exportar os dados do projeto antes de apagar clicando no botão 'Exportar Dados'.",
		},
		exportDialog: {
			title: "Exportar projeto",
			description: "Exporte os dados do projeto para um arquivo.",
			fileName: "Nome do arquivo",
			exportData: "Exportar dados",
			numericId: "ID numérico",
			readableName: "Nome legível",
			thermocoupleType: "Formato do tipo termopar",
			savedAs: "Seu arquivo será salvo como:",
			fileType: "Tipo de arquivo",
			dataLayout: "Layout dos dados",
			groupedByTime: "Agrupado por tempo",
			sequentialList: "Lista sequencial",
			dataFormat: "Formato dos dados",
			groupedByTimeTooltip:
				"Cada linha é um ponto no tempo, com amostras em colunas. Melhor para comparar amostras lado a lado.",
			sequentialListTooltip:
				"Cada linha é uma única leitura de amostra. Melhor para análise estatística e uso em outros softwares.",
			readableNameTooltip:
				"Exibe o nome completo, como 'Termopar Tipo E'. Melhor para leitura manual.",
			numericIdTooltip:
				"Usa um código numérico para o tipo. Mais rápido para processar e ideal para importar em outros softwares.",
		},
		autoSaveInput: {
			warning: "Você deve fornecer um nome para salvar no projeto",
			tooltip: "Alterar o nome do projeto",
		},
	},
	whiteboard: {
		tabProjects: {
			title: "Projetos",
			add: "Adicionar",
			rename: "Renomear",
			confirmDeletion: "Confirmar deleção",
			confirmDeletionDescription:
				'Tem certeza que deseja apagar o quadro branco "{{name}}"?\nEsta ação não pode ser desfeita.',
		},
		contextMenu: {
			sendBackward: "Enviar para trás",
			bringForward: "Trazer para frente",
			fillShape: "Preencher forma",
			outlineOnly: "Somente contorno",
		},
		editBar: {
			strokeWidth: {
				thin: "Espessura do traço - Fino",
				bold: "Espessura do traço - Negrito",
				extraBold: "Espessura do traço - Extra negrito",
			},
		},
		menu: {
			handPanningTool: "Mão (ferramenta de pan) - [1]",
			selection: "Seleção - [2]",
			rectangle: "Retângulo - [3]",
			ellipse: "Elipse - [4]",
			triangle: "Triângulo",
			rhombus: "Losango",
			line: "Linha - [5]",
			corner: "Canto",
			cornerTopLeft: "Canto - Superior esquerdo",
			cornerTopRight: "Canto - Superior direito",
			cornerBottomLeft: "Canto - Inferior esquerdo",
			cornerBottomRight: "Canto - Inferior direito",
			draw: "Desenhar - [7]",
			text: "Texto - [6]",
			image: "Imagem [8]",
			shapes: "Formas",
			zoom: "Zoom",
			color: "Cor",
			strokeWidth: "Espessura do traço",
			sensor: "Sensor",
			module: "Módulo",
			templates: "Modelos",
			sensorComms: "Comunicação de Sensores",
			copy: "Copiar",
		},
		modulesDropdown: {
			name: "Nome",
			macAddress: "Número de série",
			productCode: "Código do produto",
		},
		templateCard: {
			add: "Adicionar",
		},
		templatesDialog: {
			allNetworks: "Todas as redes",
			quantityOfBoards: "Quantidade de dispositivos",
			quantityOfSensors: "Quantidade de sensores",
		},
		undoRedo: {
			undo: "Desfazer",
			redo: "Refazer",
		},
		zoomBar: {
			zoomOut: "Diminuir zoom",
			resetZoom: "Redefinir zoom",
			zoomIn: "Aumentar zoom",
		},
	},
	shadcn: {
		selectAll: "Selecionar todos",
	},
};
