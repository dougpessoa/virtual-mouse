import type { ProjectConfigurationsBoard } from "@/contexts/useProjects/types";

export type Project = {
	id?: string;
	name: string;
	user_id: string;
	sample_interval: number;
	created_at?: Date;
	last_updated_at?: Date;
	active?: boolean;
	startingPoint?: string;
};

export type Board = {
	id?: string; // uuid auto generated
	project_id?: string;
	product_code: number;
	type_code: number;
	alias: string;
	mac_address: number;
	board_order: number;
	wifi: boolean;
};

export type Sensor = {
	id?: string; // uuid auto generated
	board_id?: string;
	sensor_id?: string;
	alias: string;
	color: string;
	type: number;
	physical_offset: number;
	visible?: 1 | 0;
};

export type BoardSensors = {
	id?: string; // uuid auto generated
	project_id?: string;
	product_code: number;
	type_code: number;
	alias: string;
	prefix_on_sensors?: 1 | 0;
	gateway_id?: string;
	mac_address: number;
	board_order: number;
	visible?: boolean;
	sensors?: Sensor[];
	wifi?: boolean;
};

export interface ProjectComplete extends Project {
	boards: BoardSensors[];
}

export type ProjectData = {
	project: Project;
	boards: ProjectConfigurationsBoard[];
};

export type ProjectReturn = {
	project: Project;
	boards: BoardSensors[];
};
