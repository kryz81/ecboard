import { BACKEND_TOKEN } from '@/config';
import client from './client';

export const getApps = () => client.get(`apps?token=${BACKEND_TOKEN}`);
