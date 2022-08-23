import fetch, { RequestInit } from 'node-fetch';
import dotenv from 'dotenv';
import logger from '../utils/logger';
import Error from './error';

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

export type POSTRequest = {
  prompt: string | null;
  max_new_tokens?: number | null;
  do_sample?: boolean | null;
  early_stopping?: boolean | null;
  num_beams?: number | null;
  temperature?: number | null;
  top_k?: number | null;
  top_p?: number | null;
  no_repeat_ngram_size?: number | null;
  num_return_sequences?: number | null;
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
    return Error.API.timeout;
  }
  const getEndpoint = `${apiEndpoint}/result/${taskId}`;
  try {
    const res: GETResponse = await getAPI(getEndpoint, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });
    if (res.status === 'error') {
      logger.error('internal unknown error');
      return Error.API.internal;
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

export async function post(
  url: string,
  data: POSTRequest | null
): Promise<string> {
  try {
    const taskRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const task = (await taskRes.json()) as POSTResponse;
    return task.task_id;
  } catch (error) {
    logger.error('POST fetch error', error);
    throw error;
  }
}
