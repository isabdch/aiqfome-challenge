import path from "path";
import { promises as fs } from "fs";

export async function readJson<T>(relativePath: string): Promise<T> {
  const filePath = path.join(process.cwd(), relativePath);
  const jsonData = await fs.readFile(filePath, "utf8");

  return JSON.parse(jsonData);
}
