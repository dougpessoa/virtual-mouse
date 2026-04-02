// Tipagens de retorno para funções que salvam projetos online

export interface CreateProjectApiResponse {
	success: boolean;
	data?: {
		project: ProjectResponse;
		boards?: BoardResponse[];
		success: boolean;
	};
}

export interface ProjectResponse {
	name: string;
	user_id: string;
	sample_interval: number;
	id: string;
	last_updated_at: string;
}

export interface BoardResponse {
	project_id: string;
	type_code: number;
	alias: string;
	mac_address: number;
	gateway_id: string;
	product_code: number;
	visible: boolean;
	wifi: boolean;
	prefix: boolean;
	sensors: SensorResponse[];
	id: string;
}

export interface SensorResponse {
	project_id: string;
	board_id: string;
	sensor_id: string;
	alias: string;
	color: string;
	physical_offset: number;
	type: number;
	visible: boolean;
	id: string;
}

// Tipagens da resposta para listagem de projetos
export interface ListProjectsApiResponse {
	success: boolean;
	data?: {
		projects: ListProjectItem[];
	};
}

export interface ListProjectItem {
	sample_interval: number;
	user_id: string;
	id: string;
	name: string;
	last_updated_at: string;
	created_at: string;
}

// Tipagem da resposta para GET /projects/:id
export interface GetProjectByIdApiResponse {
	success: boolean;
	data?: {
		sample_interval: number;
		user_id: string;
		created_at: string;
		id: string;
		name: string;
		last_updated_at: string;
		boards: BoardResponse[];
		active: boolean;
		startingPoint: string;
	};
}

// Tipagem da resposta para atualização de projeto
export interface UpdateProjectApiResponse {
	success: boolean;
	data?: {
		project: ProjectResponse | null;
		boards?: BoardResponse[];
		success: boolean;
	};
}
