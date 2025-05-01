const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getUserIp(): Promise<string> {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip;
}

export async function createLike(projectId: string, ipAddress: string) {
  const res = await fetch(`${API_URL}/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, ipAddress }),
  });

  if (!res.ok) {
    throw new Error('Erreur lors du like');
  }

  return res.json();
}

export async function deleteLike(projectId: string, ipAddress: string) {
  const res = await fetch(
    `${API_URL}/likes?projectId=${projectId}&ipAddress=${ipAddress}`,
    { method: 'DELETE' }
  );

  if (!res.ok) {
    throw new Error('Erreur lors du dislike');
  }

  return res.json();
}

export async function getLikesStats(projectId: string) {
  const res = await fetch(`${API_URL}/likes/stats?projectId=${projectId}`);

  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des likes');
  }

  return res.json();
}
