import { supabase } from "./supabaseClient";

export interface ContactSubmission {
  full_name: string;
  email: string;
  message: string;
}

/**
 * Submit a contact form to Supabase database
 */
export const submitContactToSupabase = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate input
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Insert into Supabase (NO .select())
    const { error } = await supabase
      .from("contact_inquiries")
      .insert([
        {
          full_name: data.name.trim(),
          email: data.email.trim(),
          message: data.message.trim(),
        },
      ]);

    if (error) {
      console.error("Supabase error:", error);
      return {
        success: false,
        message: `Failed to save your message: ${error.message}`,
      };
    }

    return {
      success: true,
      message: "Thank you! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error submitting contact:", error);
    return {
      success: false,
      message:
        "Failed to save your message. Please try again later or contact us directly.",
    };
  }
};

/**
 * Get all contacts (ADMIN ONLY)
 */
export const getAllContacts = async () => {
  try {
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      success: false,
      message: "Failed to fetch contacts",
      data: [],
    };
  }
};