const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8000' : 'https://campus.api.stalight.in');

export const verifyCertificate = async (certificateId: string) => {
  const isOffer = certificateId.startsWith('STL-OFF-') || certificateId.includes('OFF');
  
  if (isOffer) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/public/verify-offer/${encodeURIComponent(certificateId)}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        return {
          certificate_id: data.offer_id,
          certificate_type: data.offer_type,
          student_name: data.candidate_name,
          email: data.email,
          company_name: 'Stalight Technologies Pvt Ltd',
          internship_role: data.designation,
          start_date: data.date_of_joining,
          issue_date: data.issue_date,
          status: data.status || 'Verified',
          verification_url: `https://stalight.in/verify-offer/${data.offer_id}`,
          pdf_url: data.pdf_url,
          is_offer: true,
          work_location: data.work_location,
        };
      }
    } catch (e) {
      // continue to fallback
    }
  }

  // Try certificate endpoint
  const response = await fetch(`${API_BASE_URL}/api/public/verify/${encodeURIComponent(certificateId)}/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    // If certificate returned not found, try offer letter endpoint as fallback
    try {
      const offerRes = await fetch(`${API_BASE_URL}/api/public/verify-offer/${encodeURIComponent(certificateId)}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (offerRes.ok) {
        const data = await offerRes.json();
        return {
          certificate_id: data.offer_id,
          certificate_type: data.offer_type,
          student_name: data.candidate_name,
          email: data.email,
          company_name: 'Stalight Technologies Pvt Ltd',
          internship_role: data.designation,
          start_date: data.date_of_joining,
          issue_date: data.issue_date,
          status: data.status || 'Verified',
          verification_url: `https://stalight.in/verify-offer/${data.offer_id}`,
          pdf_url: data.pdf_url,
          is_offer: true,
          work_location: data.work_location,
        };
      }
    } catch (e) {}

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to verify credential');
  }

  return response.json();
};

export const getDownloadUrl = (certificateId: string) => {
  if (certificateId.startsWith('STL-OFF-') || certificateId.includes('OFF')) {
    return `${API_BASE_URL}/api/offer-letters/${encodeURIComponent(certificateId)}/download/`;
  }
  return `${API_BASE_URL}/api/certificates/download/${encodeURIComponent(certificateId)}/`;
};

