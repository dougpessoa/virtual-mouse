import type { SamplesFullTypes } from "@/contexts/useCommunication/types";

import Database from "@tauri-apps/plugin-sql";

export function formatISOString(isoString: string) {
	if (isoString.endsWith("Z")) {
		const match = isoString.match(
			/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
		);
		if (match) {
			const [_, year, month, day, hours, minutes, seconds] = match;
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		}
	}

	const date = new Date(isoString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getFormattedDate(now = new Date()) {
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export async function saveManySamples(
	samples: SamplesFullTypes[],
	project_id: string,
	date: string,
): Promise<void> {
	const db = await Database.load("sqlite:sensorcomms.db");

	const insertQuery = `
    INSERT INTO samples (sensor_id, project_id, value, sensorMACId, sensorDevId, unitsSymbol, date, type, physical_offset) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

	for (const sample of samples) {
		await db.execute(insertQuery, [
			sample.sensorId,
			project_id,
			sample.value,
			sample.sensorMACId,
			sample.sensorDevId,
			sample.unitsSymbol,
			date,
			sample.type,
			sample.physical_offset,
		]);
	}
}

export async function getSampleRangeTimes(
	project_id: string,
): Promise<string[]> {
	const db = await Database.load("sqlite:sensorcomms.db");

	const query1 = "SELECT COUNT(*) AS total FROM samples WHERE project_id = ?";

	const [{ total }] = await db.select<{ total: number }[]>(query1, [
		project_id,
	]);

	if (!total || total <= 100) return [];

	const step = Math.floor(total / 100);

	const query = `
      WITH ordered_samples AS (
        SELECT date, ROW_NUMBER() OVER () AS row_num
        FROM samples
        WHERE project_id = ?
      )
      SELECT date 
      FROM ordered_samples
      WHERE (row_num - 1) % ? = 0
      LIMIT 100;`;

	const result = await db.select<{ date: string }[]>(query, [project_id, step]);

	return result.map((d) => d.date);
}

export async function getSampleRangeBetweenInterval(
	dates: [string, string],
	project_id: string,
	limit = 1000,
): Promise<{ data: SamplesFullTypes[]; datetimes: string[] }> {
	const db = await Database.load("sqlite:sensorcomms.db");

	const query = (selector: string) => `WITH grouped_dates AS (
      SELECT DISTINCT date 
      FROM samples
      WHERE date BETWEEN '${dates[0]}' AND '${dates[1]}' AND project_id = ?
  ),
  tiled_dates AS (
      SELECT 
          date,
          NTILE(${limit}) OVER (ORDER BY date) AS tile
      FROM grouped_dates
  ),
  representative_dates AS (
      SELECT 
          tile,
          MIN(date) AS representative_date 
      FROM tiled_dates
      GROUP BY tile
  ),
  sensor_aggregates AS (
      SELECT 
          td.tile,
          ss.sensor_id,
          AVG(ss.value) AS avg_value, 
          MIN(ss.id) AS id,           
          MIN(ss.sensorMacId) AS sensorMacId,  
          MIN(ss.sensorDevId) AS sensorDevId,  
          MIN(ss.unitsSymbol) AS unitsSymbol 
      FROM samples ss 
      JOIN tiled_dates td ON ss.date = td.date
      WHERE ss.project_id = ?
      GROUP BY td.tile, ss.sensor_id
  )
  SELECT 
      ${selector}
  FROM representative_dates rd
  JOIN sensor_aggregates sa ON rd.tile = sa.tile
  ORDER BY rd.representative_date, sa.sensor_id;`;

	const data = await db.select<SamplesFullTypes[]>(
		query(
			"sa.id, rd.representative_date AS date, sa.sensor_id, sa.avg_value AS value, sa.sensorMacId, sa.sensorDevId, sa.unitsSymbol",
		),
		[project_id, project_id],
	);
	const datetimesObj = await db.select<{ date: string }[]>(
		query("DISTINCT rd.representative_date AS date"),
		[project_id, project_id],
	);

	return { data, datetimes: datetimesObj.map((d) => d.date) };
}
