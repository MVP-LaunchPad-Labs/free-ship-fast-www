import fs from 'fs-extra';
import path from 'node:path';

export function directoryExistsAndNotEmpty(relativePath: string): boolean {
	const resolvedPath = path.resolve(process.cwd(), relativePath);
	return fs.pathExistsSync(resolvedPath) && 
		   fs.readdirSync(resolvedPath).length > 0;
}

export function resolvePath(relativePath: string): string {
	return path.resolve(process.cwd(), relativePath);
}
