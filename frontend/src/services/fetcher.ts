export async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return res.json();
  }
  