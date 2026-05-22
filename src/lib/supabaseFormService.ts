import { supabase } from "./supabaseClient";

export interface AdmissionApplication {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  interested_track: string;
  qualification?: string;
}

export interface ProjectInquiry {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  service_required: string;
  timeline?: string;
  details: string;
}

export interface ITAssessment {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  primary_focus: string;
  timeline?: string;
  details: string;
}

export const submitAdmissionApplication = async (data: AdmissionApplication) => {
  try {
    // Basic validation
    if (!data.first_name?.trim() || !data.email?.trim()) {
      return { success: false, message: "Name and email are required" };
    }

    // Insert using column names expected by the DB. Map `qualification` -> `highest_qualification`.
    const { error } = await supabase.from("admission_applications").insert([
      {
        first_name: data.first_name.trim(),
        last_name: data.last_name?.trim() ?? "",
        email: data.email.trim(),
        phone: data.phone?.trim() ?? "",
        interested_track: data.interested_track ?? "",
        highest_qualification: data.qualification?.trim() ?? "Not specified",
      },
    ]);

    if (error) {
      console.error("Supabase insert error (admission_applications):", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Application submitted" };
  } catch (err) {
    console.error("submitAdmissionApplication error:", err);
    return { success: false, message: "Unexpected error" };
  }
};

export const submitProjectInquiry = async (data: ProjectInquiry) => {
  try {
    if (!data.full_name?.trim() || !data.email?.trim()) {
      return { success: false, message: "Name and email are required" };
    }

    // Map form fields to DB column names: `company` -> `company_name`, `timeline` -> `expected_timeline`, `details` -> `project_requirements`
    const { error } = await supabase.from("project_inquiries").insert([
      {
        full_name: data.full_name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() ?? "",
        company_name: data.company?.trim() ?? "",
        service_required: data.service_required ?? "",
        expected_timeline: data.timeline ?? "",
        project_requirements: data.details?.trim() ?? "",
      },
    ]);

    if (error) {
      console.error("Supabase insert error (project_inquiries):", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Inquiry submitted" };
  } catch (err) {
    console.error("submitProjectInquiry error:", err);
    return { success: false, message: "Unexpected error" };
  }
};

export const submitITAssessment = async (data: ITAssessment) => {
  try {
    if (!data.full_name?.trim() || !data.email?.trim()) {
      return { success: false, message: "Name and email are required" };
    }

    const { error } = await supabase.from("it_assessments").insert([
      {
        full_name: data.full_name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() ?? "",
        company: data.company?.trim() ?? "",
        primary_focus: data.primary_focus ?? "",
        timeline: data.timeline ?? "",
        details: data.details?.trim() ?? "",
      },
    ]);

    if (error) {
      console.error("Supabase insert error (it_assessments):", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Assessment request submitted" };
  } catch (err) {
    console.error("submitITAssessment error:", err);
    return { success: false, message: "Unexpected error" };
  }
};
