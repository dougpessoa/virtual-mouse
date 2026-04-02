import Database from "@tauri-apps/plugin-sql";
import type {
	Board,
	BoardSensors,
	Project,
	ProjectData,
	ProjectReturn,
} from "../models.types";
import { getUUID } from "@/backend";
import type { SamplesFullTypes } from "@/contexts/useCommunication/types";
import { isGatewayProductCode } from "@/contexts/useCommunication/modules";

export async function saveAProjectToDatabase(
	projectData: ProjectData,
): Promise<string | undefined> {
	const db = await Database.load("sqlite:sensorcomms.db");

	try {
		const { project, boards } = projectData;

		await db.execute("BEGIN TRANSACTION");

		const insertProjectQuery = `
      INSERT INTO projects (
        id, name, owner, email, company_name, 
        sample_interval, created_at, last_updated_at
      ) 
      VALUES (
        COALESCE(?, lower(hex(randomblob(16)))), ?, ?, ?, ?, 
        ?, ?, ?
      )`;

		const projectId = await getUUID();

		await db.execute(insertProjectQuery, [
			projectId,
			project.name,
			"",
			"",
			"",
			project.sample_interval,
			project.created_at?.toISOString() || new Date().toISOString(),
			project.last_updated_at?.toISOString() || new Date().toISOString(),
		]);

		let order = 0;
		const gatewayIds: string[] = [];
		for (const board of boards) {
			const insertBoardQuery = `
        INSERT INTO boards (
          id, project_id, product_code, type_code, 
          alias, mac_address, "board_order", "gateway_id", visible, wifi 
        ) 
        VALUES (
          COALESCE(?, lower(hex(randomblob(16)))), ?, ?, ?, 
          ?, ?, ?, ?, 1, ?
        )`;

			const isGateway = isGatewayProductCode(board.productCode);

			const boardId = await getUUID();

			if (isGateway) {
				gatewayIds.push(boardId);
				order = 0;
			}

			await db.execute(insertBoardQuery, [
				boardId,
				projectId,
				board.productCode,
				board.typeCode,
				board.alias,
				board.id,
				order,
				isGateway ? null : gatewayIds.at(-1),
				board.wifi,
			]);

			order += 1;

			for (const sensor of board.sensors) {
				const insertSensorQuery = `
          INSERT INTO sensors (
            id, board_id, sensor_id, alias, 
            color, type, physical_offset
          ) 
          VALUES (
            COALESCE(?, lower(hex(randomblob(16)))), ?, ?, ?, 
            ?, ?, ?
          )`;

				const sensorId = await getUUID();

				await db.execute(insertSensorQuery, [
					sensorId,
					boardId,
					sensor.id,
					sensor.alias,
					sensor.color,
					sensor.type,
					sensor.physicalOffset,
				]);
			}
		}

		await db.execute("COMMIT");

		return projectId;
	} catch (error) {
		await db.execute("ROLLBACK");
		console.error("Error saving project data:", error);
		throw error;
	}
}

export async function getAllProjectsFromDatabase(
	nameFilter = "",
	page = 1,
	limit = 10,
): Promise<Project[]> {
	const db = await Database.load("sqlite:sensorcomms.db");
	const offset = (page - 1) * limit;

	let query = "SELECT * FROM projects";
	const params: any[] = [];

	if (nameFilter) {
		query += " WHERE name LIKE ?";
		params.push(`%${nameFilter}%`);
	}

	query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
	params.push(limit, offset);

	const projects = await db.select<Project[]>(query, params);
	return projects;
}

export async function getProjectsSizeFromDatabase(): Promise<number> {
	const db = await Database.load("sqlite:sensorcomms.db");
	const query = "SELECT COUNT(*) as size FROM projects";
	const response = await db.select<{ size: number }[]>(query);
	return response[0].size;
}

export async function getProjectFromDatabase(
	projectId: string,
): Promise<ProjectReturn> {
	const db = await Database.load("sqlite:sensorcomms.db");
	const projectQuery = "SELECT * FROM projects WHERE id = ?";
	const projects = await db.select<Project[]>(projectQuery, [projectId]);
	if (!projects || projects.length === 0) {
		throw new Error("Projeto não encontrado");
	}
	const project = projects[0];
	const boardsQuery = "SELECT * FROM boards WHERE project_id = ?";
	const boards = await db.select<any[]>(boardsQuery, [projectId]);
	for (const board of boards) {
		const sensorsQuery = "SELECT * FROM sensors WHERE board_id = ?";
		const sensors = await db.select(sensorsQuery, [board.id]);
		board.sensors = sensors;
	}
	return { project, boards };
}

export async function deleteProjectFromDatabase(
	projectId: string,
): Promise<void> {
	const db = await Database.load("sqlite:sensorcomms.db");
	try {
		await db.execute("BEGIN TRANSACTION");
		const deleteSensorsQuery =
			"DELETE FROM sensors WHERE board_id IN (SELECT id FROM boards WHERE project_id = ?)";
		await db.execute(deleteSensorsQuery, [projectId]);
		const deleteBoardsQuery = "DELETE FROM boards WHERE project_id = ?";
		await db.execute(deleteBoardsQuery, [projectId]);
		const deleteProjectQuery = "DELETE FROM projects WHERE id = ?";
		await db.execute(deleteProjectQuery, [projectId]);
		await db.execute("COMMIT");
	} catch (error) {
		await db.execute("ROLLBACK");
		console.error("Error delete project:", error);
		throw error;
	}
}

export async function deleteProjectsFromDatabase(
	projectIds: string[],
): Promise<void> {
	if (projectIds.length === 0) return;
	const db = await Database.load("sqlite:sensorcomms.db");
	try {
		await db.execute("BEGIN TRANSACTION");
		const placeholders = projectIds.map(() => "?").join(", ");
		const deleteSensorsQuery = `DELETE FROM sensors WHERE board_id IN (SELECT id FROM boards WHERE project_id IN (${placeholders}))`;
		await db.execute(deleteSensorsQuery, projectIds);
		const deleteBoardsQuery = `DELETE FROM boards WHERE project_id IN (${placeholders})`;
		await db.execute(deleteBoardsQuery, projectIds);
		const deleteProjectsQuery = `DELETE FROM projects WHERE id IN (${placeholders})`;
		await db.execute(deleteProjectsQuery, projectIds);
		await db.execute("COMMIT");
	} catch (error) {
		await db.execute("ROLLBACK");
		console.error("Error to delete project", error);
		throw error;
	}
}

export async function eraseProjectFromDatabase(
	projectId: string,
): Promise<void> {
	const db = await Database.load("sqlite:sensorcomms.db");
	try {
		const eraseSamplesQuery = "DELETE FROM samples WHERE project_id = ?";
		await db.execute(eraseSamplesQuery, [projectId]);
	} catch (error) {
		await db.execute("ROLLBACK");
		console.error("Error erasing project:", error);
		throw error;
	}
}

export async function updateProjectNameFromDatabase(
	projectName: string,
	projectId: string,
): Promise<void> {
	const db = await Database.load("sqlite:sensorcomms.db");
	try {
		const updateProjectQuery = "UPDATE projects SET name = ? WHERE id = ?";
		await db.execute(updateProjectQuery, [projectName, projectId]);
	} catch (error) {
		console.log({ error });
		throw new Error("Error saving project name");
	}
}

export async function updateSensorVisibilityFromDatabase(
	visible: 1 | 0,
	sensorId: string,
): Promise<void> {
	const db = await Database.load("sqlite:sensorcomms.db");
	try {
		const updateProjectQuery = "UPDATE sensors SET visible = ? WHERE id = ?";
		await db.execute(updateProjectQuery, [visible, sensorId]);
	} catch (error) {
		console.log({ error });
		throw new Error("Error saving sensor visibility");
	}
}

export async function updateBoardPrefixFromDatabase(
	boardId: string,
	hasPrefix: 1 | 0,
): Promise<void> {
	const db = await Database.load("sqlite:sensorcomms.db");
	try {
		const updateProjectQuery =
			"UPDATE boards SET prefix_on_sensors = ? WHERE id = ?";
		await db.execute(updateProjectQuery, [hasPrefix, boardId]);
	} catch (error) {
		console.log({ error });
		throw new Error("Error saving board prefix");
	}
}

export async function updateProjectFromDatabase(
	projectData: ProjectData,
): Promise<void> {
	const db = await Database.load("sqlite:sensorcomms.db");
	try {
		const { project, boards } = projectData;
		const updateProjectQuery =
			"UPDATE projects SET name = ?, owner = ?, email = ?, company_name = ?, last_updated_at = ? WHERE id = ?";
		await db.execute(updateProjectQuery, [
			project.name,
			"",
			"",
			"",
			project.last_updated_at?.toISOString() || new Date().toISOString(),
			project.id,
		]);
		for (const board of boards) {
			const updateBoardQuery = "UPDATE boards SET alias = ? WHERE id = ?";
			await db.execute(updateBoardQuery, [board.alias, board.id]);
			for (const sensor of board.sensors) {
				const updateSensorQuery =
					"UPDATE sensors SET alias = ?, color = ?, type = ?, physical_offset = ? WHERE id = ? AND board_id = ?";
				await db.execute(updateSensorQuery, [
					sensor.alias,
					sensor.color,
					sensor.type,
					sensor.physicalOffset,
					sensor.id,
					board.id,
				]);
			}
		}
	} catch (error) {
		console.error("Error updating project:", error);
		throw error;
	}
}

export async function updateSampleIntervalOnProjectFromDatabase(
	project_id: string,
	sample_interval: number,
) {
	const db = await Database.load("sqlite:sensorcomms.db");
	const updateProjectQuery =
		"UPDATE projects SET sample_interval = ? WHERE id = ?";
	await db.execute(updateProjectQuery, [sample_interval, project_id]);
}

export async function getProjectBoardsSizeFromDatabase(
	project_id: string,
): Promise<number> {
	const db = await Database.load("sqlite:sensorcomms.db");
	const query = "SELECT COUNT(*) as size FROM boards WHERE project_id = ?";
	const response = await db.select<{ size: number }[]>(query, [project_id]);
	return response[0].size;
}

export async function getProjectBoardFromDatabase(
	project_id: string,
	boardMacAddress: number,
): Promise<Board[]> {
	const db = await Database.load("sqlite:sensorcomms.db");
	const query = "SELECT * FROM boards WHERE project_id = ? AND mac_address = ?";
	const response = await db.select<Board[]>(query, [
		project_id,
		boardMacAddress,
	]);
	return response;
}

export async function updateProjectBoardsFromDatabase(
	project_id: string,
	boards: BoardSensors[],
): Promise<void> {
	const db = await Database.load("sqlite:sensorcomms.db");

	try {
		const startOrder = await getProjectBoardsSizeFromDatabase(project_id);

		const boardsToAdd: BoardSensors[] = [];
		const boardsToEdit: BoardSensors[] = [];

		for (const board of boards) {
			const hasBoard = await getProjectBoardFromDatabase(
				project_id,
				board.mac_address,
			);

			if (hasBoard && hasBoard.length > 0) {
				boardsToEdit.push({
					...board,
					id: hasBoard[0].id,
				});
			} else {
				boardsToAdd.push(board);
			}
		}

		await db.execute("BEGIN TRANSACTION");
		if (boardsToEdit.length > 0) {
			for (const board of boardsToEdit) {
				if (!board.sensors) {
					throw new Error("It should have sensors");
				}

				for (const sensor of board.sensors) {
					const updateSensorQuery = `
		        UPDATE sensors
		        SET type = ?, physical_offset = ?
		        WHERE sensor_id = ? AND board_id = ?
		      `;
					await db.execute(updateSensorQuery, [
						sensor.type,
						sensor.physical_offset,
						sensor.sensor_id,
						board.id,
					]);
				}
			}
		}

		if (boardsToAdd.length > 0) {
			let order = startOrder + 1;
			for (const board of boardsToAdd) {
				const insertBoardQuery = `
		    INSERT INTO boards (
		      id, project_id, product_code, type_code,
		      alias, mac_address, "board_order"
		    )
		    VALUES (
		      COALESCE(?, lower(hex(randomblob(16)))), ?, ?, ?,
		      ?, ?, ?
		    )`;

				const boardId = await getUUID();

				await db.execute(insertBoardQuery, [
					boardId,
					project_id,
					board.product_code,
					board.type_code,
					board.alias,
					board.mac_address,
					order,
				]);

				order += 1;

				if (!board.sensors) {
					throw new Error("It should have sensors");
				}

				for (const sensor of board.sensors) {
					const insertSensorQuery = `
		      INSERT INTO sensors (
		        id, board_id, sensor_id, alias,
		        color, type, physical_offset
		      )
		      VALUES (
		        COALESCE(?, lower(hex(randomblob(16)))), ?, ?, ?,
		        ?, ?, ?
		      )`;

					const sensorId = await getUUID();

					await db.execute(insertSensorQuery, [
						sensorId,
						boardId,
						sensor.sensor_id,
						sensor.alias,
						sensor.color,
						sensor.type,
						sensor.physical_offset,
					]);
				}
			}
		}

		await db.execute("COMMIT");
	} catch (error) {
		await db.execute("ROLLBACK");
		console.log("Error saving project data:", error);
		throw error;
	}
}

export async function getSamplesFromDatabase(
	projectId: string,
): Promise<SamplesFullTypes[]> {
	const db = await Database.load("sqlite:sensorcomms.db");
	const samplesQuery = "SELECT * FROM samples WHERE project_id = ?";
	const samples = await db.select<SamplesFullTypes[]>(samplesQuery, [
		projectId,
	]);
	if (!samples || samples.length === 0) {
		throw new Error("not found");
	}
	return samples;
}
