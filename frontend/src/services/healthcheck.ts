import { BACKEND_TOKEN } from '@/config';
import client from './client';

export const getHealthcheck = () => client.get(`healthcheck?token=${BACKEND_TOKEN}`);
