import fetch, { RequestInit } from 'node-fetch';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();
const apiEndpoint = process.env.API_ENDPOINT;

type GETResponse = {
  status: string;
  result: string[] | null;
  updated_at: number;
};

type POSTResponse = {
  task_id: string;
};

const getAPI = async (
  url: string,
  config: RequestInit
): Promise<GETResponse> => {
  const res = await fetch(url, config);
  return (await res.json()) as GETResponse;
};

export async function get(taskId: string, attempt: number): Promise<string> {
  if (attempt > 10) {
    logger.error('get method timeout');
    return 'error: timeout';
  }
  const getEndpoint = `${apiEndpoint}/result/${taskId}`;
  try {
    const res: GETResponse = await getAPI(getEndpoint, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });
    if (res.status === 'error') {
      logger.error('internal unknown error');
      return 'api server internal error';
    }
    if (res.status !== 'completed' || res.result == null) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await get(taskId, attempt + 1);
    }
    return res.result[0];
  } catch (error) {
    logger.error('fetch error in get', error);
    throw error;
  }
}

export async function post(url: string, data: string | null): Promise<string> {
  try {
    const taskRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: data }),
    });
    const task = (await taskRes.json()) as POSTResponse;
    return task.task_id;
  } catch (error) {
    logger.error('POST fetch error', error);
    throw error;
  }
}
