import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(userId: string): Promise<any> {
  return request('/api/currentUser', {
    method: 'GET',
    params: { userId },
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
