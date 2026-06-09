import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { UserRecord } from '../types.js';

const dataDir = join(dirname(fileURLToPath(import.meta.url)), '../../data');
const dataFile = join(dataDir, 'users.json');

function ensureDataFile(): void {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  if (!existsSync(dataFile)) {
    writeFileSync(dataFile, '[]', 'utf-8');
  }
}

export function loadUsers(): UserRecord[] {
  ensureDataFile();
  const raw = readFileSync(dataFile, 'utf-8');
  return JSON.parse(raw) as UserRecord[];
}

export function saveUsers(users: UserRecord[]): void {
  ensureDataFile();
  writeFileSync(dataFile, JSON.stringify(users, null, 2), 'utf-8');
}

export function generateMatricula(existingCount: number): string {
  const year = new Date().getFullYear();
  const seq = String(existingCount + 1).padStart(5, '0');
  return `ASM-${year}-${seq}`;
}

export function stripPassword(user: UserRecord) {
  const { senhaHash: _, ...publicUser } = user;
  return publicUser;
}
