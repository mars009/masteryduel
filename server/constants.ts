import path = require('path');

/************************************************
 * Path constants
 */
export const PROJ_ROOT: string = path.resolve(__dirname, '..');
export const PUBLIC_ROOT: string = path.resolve(PROJ_ROOT, 'public');
export const CLIENT_ROOT: string = path.resolve(PROJ_ROOT, 'client');
export const SERVER_ROOT: string = path.resolve(PROJ_ROOT, 'server');


export const LOL_API_URL: string = 'https://na.api.pvp.net';

export const MAX_PLAYERS: number = 2;
export const NEXUS_STARTING_HEALTH: number = 5;

export const TURN_TIMER = 75;
