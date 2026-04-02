import type { SamplesFullTypes } from "@/contexts/useCommunication/types";
import { apiIot } from "../../api";
import type {
	Board,
	BoardSensors,
	Project,
	ProjectData,
	ProjectReturn,
} from "../models.types";
import type {
	CreateProjectApiResponse,
	GetProjectByIdApiResponse,
	ListProjectsApiResponse,
	UpdateProjectApiResponse,
} from "./types";

export async function saveAProjectOnline(
	projectData: ProjectData,
): Promise<CreateProjectApiResponse> {
	const { project, boards } = projectData;

	const payload = {
		name: project.name.includes("DLK") ? project.name : undefined,
		sample_interval: project.sample_interval,
		startingPoint: project.startingPoint,
		boards: boards.map((board) => ({
			product_code:
				(board as any).productCode ??
				(board as any).typeCode ??
				board.productCode,
			type_code: (board as any).typeCode ?? board.productCode,
			alias: board.alias,
			mac_address: board.id,
			gateway_id: String(boards[0].id),
			visible: true,
			wifi: board.wifi,
			sensors: board.sensors.map((sensor) => ({
				sensor_id: sensor.id,
				alias: sensor.alias,
				color: sensor.color,
				physical_offset: sensor.physicalOffset,
				type: sensor.type,
			})),
		})),
	};

	const { data } = await apiIot.post<CreateProjectApiResponse>(
		"/projects",
		payload,
	);
	return data;
}

export async function getAllProjectsFromOnline(
	nameFilter = "",
	page = 1,
	limit = 10,
): Promise<ListProjectsApiResponse> {
	const { data } = await apiIot.get<ListProjectsApiResponse>("/projects", {
		params: {
			limit,
			page,
			query: nameFilter,
		},
	});
	return data;
}

export async function getProjectsSizeFromLocalStorage(): Promise<number> {
	const allProjects = JSON.parse(localStorage?.getItem("projects") || "[]");
	return allProjects.length;
}

export async function getProjectOnline(
	projectId: string,
): Promise<ProjectReturn> {
	const { data } = await apiIot.get<GetProjectByIdApiResponse>(
		`/projects/${projectId}`,
	);
	if (!data?.success || !data.data) {
		throw new Error("Failed to fetch project");
	}

	const apiProject = data.data;
	const project: Project = {
		id: apiProject.id,
		name: apiProject.name,
		user_id: apiProject.user_id,
		sample_interval: apiProject.sample_interval,
		created_at: apiProject.created_at
			? new Date(apiProject.created_at)
			: undefined,
		last_updated_at: apiProject.last_updated_at
			? new Date(apiProject.last_updated_at)
			: undefined,
		active: apiProject.active,
		startingPoint: apiProject.startingPoint,
	};

	const boardsMapped: BoardSensors[] = (apiProject.boards || []).map(
		(b, idx) => ({
			id: b.id,
			project_id: b.project_id,
			product_code: b.product_code,
			type_code: b.type_code,
			alias: b.alias,
			prefix_on_sensors: b.prefix ? 1 : 0,
			gateway_id: b.gateway_id,
			mac_address: b.mac_address,
			board_order: idx,
			visible: b.visible,
			wifi: b.wifi,
			sensors: (b.sensors || []).map((s) => ({
				id: s.id,
				board_id: s.board_id,
				sensor_id: s.sensor_id,
				alias: s.alias,
				color: s.color,
				type: s.type,
				physical_offset: s.physical_offset,
				visible: s.visible ? 1 : 0,
				project_id: s.project_id,
			})),
		}),
	);

	return { project, boards: boardsMapped };
}

export async function deleteProjectOnline(projectId: string): Promise<void> {
	await apiIot.delete(`/projects/${projectId}`);
}

export async function deleteProjectsOnline(
	projectIds: string[],
): Promise<void> {
	if (projectIds.length === 0) return;
	await apiIot.delete("/projects/multiple", {
		data: { ids: projectIds },
	});
}

export async function exportProjectOnline(data: any) {
	const { data: response } = await apiIot.post("/projects/export", data);
	return response;
}

export async function isExportingJobCompleted(exportingJobId: string) {
	const { data: response } = await apiIot.get(
		`/projects/export/status/${exportingJobId}`,
	);
	return response;
}

export async function eraseProjectFromLocalStorage(_: string): Promise<void> {
	// remove
}

export async function updateProjectNameOnline(
	projectName: string,
	projectId: string,
): Promise<void> {
	await apiIot.put(`/projects/${projectId}`, {
		name: projectName,
	});
}

export async function updateProjectActive(
	projectId: string,
	active: boolean,
): Promise<void> {
	await apiIot.put(`/projects/${projectId}`, {
		active,
	});
}

export async function updateSensorVisibilityOnline(
	visible: 1 | 0,
	sensorId: string,
	projectId: string,
): Promise<void> {
	await apiIot.put(`/projects/${projectId}/sensor/${sensorId}`, {
		visible: visible === 1,
	});
}

export async function updateBoardPrefixOnline(
	projectId: string,
	boardId: string,
	hasPrefix: 1 | 0,
): Promise<void> {
	await apiIot.put(`/projects/${projectId}/board/${boardId}`, {
		prefix: hasPrefix === 1,
	});
}

export async function updateProjectOnline(
	projectData: ProjectData,
): Promise<UpdateProjectApiResponse> {
	const { project, boards } = projectData;

	if (!project?.id) {
		throw new Error("Project ID is required");
	}

	const payload = {
		sample_interval: project.sample_interval,
		name: project.name,
		boards: boards.map((board, i) => ({
			// ProjectConfigurationsBoard não possui mac_address; usar id como fallback
			mac_address:
				(board as any).mac_address ?? (board as any).macAddress ?? board.id,
			alias: board.alias,
			// ProjectConfigurationsBoard não possui `visible`; default true
			visible: true,
			wifi: !!(board as any).wifi,
			sensors: (board.sensors || []).map((sensor) => ({
				alias: sensor.alias,
				// ProjectConfigurationsSensor não possui `visible`; default true
				visible: true,
				board_id: String((board as any).id ?? (board as any).board_id ?? ""),
				physical_offset: Number(
					(sensor as any).physical_offset ??
						(sensor as any).physicalOffset ??
						0,
				),
				sensor_id: (sensor as any).sensor_id ?? sensor.id,
				project_id: String(project.id),
				id: String(sensor.id),
				color: sensor.color,
				type: sensor.type,
			})),
			type_code:
				(board as any).type_code ??
				(board as any).typeCode ??
				(board as any).productCode ??
				1,
			// ProjectConfigurationsBoard não possui `prefix_on_sensors`; default false
			prefix: false,
			// ProjectConfigurationsBoard não possui `gateway_id`; default string vazia
			gateway_id: i === 0 ? "" : String(boards[0].id),
			project_id: String(project.id),
			id: String((board as any).id ?? ""),
		})),
	};

	const { data } = await apiIot.put<UpdateProjectApiResponse>(
		`/projects/${project.id}`,
		payload,
	);
	return data;
}

export async function updateSampleIntervalOnProjectOnline(
	project_id: string,
	sample_interval: number,
) {
	await apiIot.put(`/projects/${project_id}`, {
		sample_interval,
	});
}

export async function getProjectBoardsSizeFromLocalStorage(
	project_id: string,
): Promise<number> {
	//remove
	const boards: any[] = JSON.parse(localStorage.getItem("boards") || "[]");
	return boards.filter((b) => b.project_id === project_id).length;
}

export async function getProjectBoardFromLocalStorage(
	project_id: string,
	boardMacAddress: number,
): Promise<Board[]> {
	// remove
	const boards: any[] = JSON.parse(localStorage.getItem("boards") || "[]");
	return boards.filter(
		(b) => b.project_id === project_id && b.mac_address === boardMacAddress,
	);
}

export async function updateProjectBoardsOnline(
	project_id: string,
	boards: BoardSensors[],
): Promise<void> {
	if (!Array.isArray(boards) || boards.length === 0) return;

	await Promise.all(
		boards.map((board) => {
			if (!board.id) throw new Error("Board ID is required");
			const payload = {
				type_code: (board as any).type_code ?? (board as any).product_code ?? 1,
				alias: board.alias,
				mac_address: board.mac_address,
				gateway_id: (board as any).gateway_id ?? "",
				visible: (board as any).visible ?? true,
				sensors: (board.sensors || []).map((sensor) => ({
					alias: sensor.alias,
					board_id: String((board as any).id ?? (sensor as any).board_id ?? ""),
					physical_offset: Number((sensor as any).physical_offset ?? 0),
					visible:
						typeof sensor.visible === "number"
							? sensor.visible === 1
							: ((sensor as any).visible ?? true),
					sensor_id: (sensor as any).sensor_id ?? (sensor as any).id ?? "",
					project_id: String(project_id),
					color: sensor.color,
					type: sensor.type,
				})),
				prefix: ((board as any).prefix_on_sensors ?? 0) === 1,
				wifi: !!(board as any).wifi,
			};

			return apiIot.put(`/projects/${project_id}/board/${board.id}`, payload);
		}),
	);
}

export async function getSamplesFromLocalStorage(
	projectId: string,
): Promise<SamplesFullTypes[]> {
	const samples: any[] = JSON.parse(localStorage.getItem("samples") || "[]");
	const filtered = samples.filter((s) => s.project_id === projectId);
	if (!filtered.length) throw new Error("not found");
	return filtered;
}
