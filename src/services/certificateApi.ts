const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8000' : 'https://campus.api.stalight.in');

export const verifyCertificate = async (certificateId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/public/verify/${certificateId}/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to verify certificate');
  }

  return response.json();
};

export const getDownloadUrl = (certificateId: string) => {
  return `${API_BASE_URL}/api/certificates/download/${certificateId}/`;
};
