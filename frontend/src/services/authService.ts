const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    console.error('Erreur backend :', json);
    throw new Error(json.message || 'Email ou mot de passe incorrect');
  }

  return json;
}

export async function getCurrentUser(token: string) {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Non autorisé');
  }

  return res.json();
}
