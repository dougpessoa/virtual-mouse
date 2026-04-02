import type {
	Board,
	BoardSensors,
	Project,
	ProjectData,
	ProjectReturn,
} from "./models.types";
import type { SamplesFullTypes } from "@/contexts/useCommunication/types";
import { willStoreLocally } from "@/utils/isTauri";
import * as tauri from "./tauri/projects";
import * as web from "./web/projects";

export async function saveAProject(
	projectData: ProjectData & { user_id: string },
): Promise<string | undefined> {
	if (willStoreLocally()) {
		return tauri.saveAProjectToDatabase(projectData);
	}

	const response = await web.saveAProjectOnline(projectData);
	return response.data?.project?.id;
}

export async function getAllProjects(
	nameFilter = "",
	page = 1,
	limit = 10,
): Promise<Project[]> {
	if (willStoreLocally()) {
		return tauri.getAllProjectsFromDatabase(nameFilter, page, limit);
	}

	const response = await web.getAllProjectsFromOnline(nameFilter, page, limit);
	return response.data?.projects as unknown as Project[];
}

export async function getProject(projectId: string): Promise<ProjectReturn> {
	if (willStoreLocally()) {
		return tauri.getProjectFromDatabase(projectId);
	}
	return web.getProjectOnline(projectId);
}

export async function deleteProject(projectId: string): Promise<void> {
	if (willStoreLocally()) {
		return tauri.deleteProjectFromDatabase(projectId);
	}
	return web.deleteProjectOnline(projectId);
}

export async function deleteProjects(projectIds: string[]): Promise<void> {
	if (willStoreLocally()) {
		return tauri.deleteProjectsFromDatabase(projectIds);
	}
	return web.deleteProjectsOnline(projectIds);
}

/**
 * Erase a project from the TAURI database
 */
export async function eraseProject(projectId: string): Promise<void> {
	return tauri.eraseProjectFromDatabase(projectId);
}

export async function updateProjectName(
	projectName: string,
	projectId: string,
): Promise<void> {
	if (willStoreLocally()) {
		return tauri.updateProjectNameFromDatabase(projectName, projectId);
	}
	return web.updateProjectNameOnline(projectName, projectId);
}

export async function updateSensorVisibility(
	visible: 1 | 0,
	sensorId: string,
	projectId: string,
): Promise<void> {
	if (willStoreLocally()) {
		return tauri.updateSensorVisibilityFromDatabase(visible, sensorId);
	}
	return web.updateSensorVisibilityOnline(visible, sensorId, projectId);
}

export async function updateBoardPrefix(
	boardId: string,
	hasPrefix: 1 | 0,
	projectId: string,
): Promise<void> {
	if (willStoreLocally()) {
		return tauri.updateBoardPrefixFromDatabase(boardId, hasPrefix);
	}
	return web.updateBoardPrefixOnline(projectId, boardId, hasPrefix);
}

export async function updateProject(projectData: ProjectData): Promise<void> {
	console.log({ projectData });
	if (willStoreLocally()) {
		await tauri.updateProjectFromDatabase(projectData);
		return;
	}
	await web.updateProjectOnline(projectData);
}

export async function updateSampleIntervalOnProject(
	project_id: string,
	sample_interval: number,
) {
	if (willStoreLocally()) {
		return tauri.updateSampleIntervalOnProjectFromDatabase(
			project_id,
			sample_interval,
		);
	}
	return web.updateSampleIntervalOnProjectOnline(project_id, sample_interval);
}

export async function getProjectBoardsSize(
	project_id: string,
): Promise<number> {
	if (willStoreLocally()) {
		return tauri.getProjectBoardsSizeFromDatabase(project_id);
	}
	return web.getProjectBoardsSizeFromLocalStorage(project_id);
}

export async function getProjectBoard(
	project_id: string,
	boardMacAddress: number,
): Promise<Board[]> {
	if (willStoreLocally()) {
		return tauri.getProjectBoardFromDatabase(project_id, boardMacAddress);
	}
	return web.getProjectBoardFromLocalStorage(project_id, boardMacAddress);
}

export async function updateProjectBoards(
	project_id: string,
	boards: BoardSensors[],
): Promise<void> {
	if (willStoreLocally()) {
		return tauri.updateProjectBoardsFromDatabase(project_id, boards);
	}
	return web.updateProjectBoardsOnline(project_id, boards);
}

export async function getSamples(
	projectId: string,
): Promise<SamplesFullTypes[]> {
	if (willStoreLocally()) {
		return tauri.getSamplesFromDatabase(projectId);
	}
	return web.getSamplesFromLocalStorage(projectId);
}

export async function getProjectsSize(): Promise<number> {
	if (willStoreLocally()) {
		return tauri.getProjectsSizeFromDatabase();
	}
	return web.getProjectsSizeFromLocalStorage();
}

export async function getModuleDefinitions(projectId?: string) {
	if (!projectId) return {} as any;

	try {
		const url = `https://sc-module-definitions.s3.eu-west-1.amazonaws.com/${projectId}.json`;
		const res = await fetch(url, { method: "GET" });
		if (!res.ok) return {} as any;
		const v = await res.json();
		return v;
	} catch (error) {
		console.log({ error });
		return {} as any;
	}
}
