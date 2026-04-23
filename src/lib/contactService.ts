// Contact Service - Manages contact form submissions with localStorage

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const STORAGE_KEY = "stalight_contacts";

/**
 * Submit a contact form
 */
export const submitContact = (data: {
  name: string;
  email: string;
  message: string;
}): { success: boolean; message: string; id?: number } => {
  try {
    const contacts: ContactSubmission[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const newContact: ContactSubmission = {
      id: Date.now(),
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      timestamp: new Date().toISOString(),
    };

    contacts.push(newContact);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));

    console.log("Contact submitted:", newContact);

    return {
      success: true,
      message: "Thank you! We will get back to you soon.",
      id: newContact.id,
    };
  } catch (error) {
    console.error("Error submitting contact:", error);
    return {
      success: false,
      message: "Failed to save your message. Please try again.",
    };
  }
};

/**
 * Get all contact submissions
 */
export const getAllContacts = (): ContactSubmission[] => {
  try {
    const contacts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return contacts.sort(
      (a: ContactSubmission, b: ContactSubmission) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    return [];
  }
};

/**
 * Get contact by ID
 */
export const getContactById = (id: number): ContactSubmission | null => {
  try {
    const contacts: ContactSubmission[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
    return contacts.find((c) => c.id === id) || null;
  } catch (error) {
    console.error("Error retrieving contact:", error);
    return null;
  }
};

/**
 * Delete contact by ID
 */
export const deleteContact = (id: number): { success: boolean; message: string } => {
  try {
    const contacts: ContactSubmission[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
    const filtered = contacts.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return { success: true, message: "Contact deleted successfully" };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return { success: false, message: "Failed to delete contact" };
  }
};

/**
 * Clear all contacts
 */
export const clearAllContacts = (): { success: boolean; message: string } => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true, message: "All contacts cleared" };
  } catch (error) {
    console.error("Error clearing contacts:", error);
    return { success: false, message: "Failed to clear contacts" };
  }
};

/**
 * Export contacts as JSON
 */
export const exportContacts = (): string => {
  try {
    const contacts = getAllContacts();
    return JSON.stringify(contacts, null, 2);
  } catch (error) {
    console.error("Error exporting contacts:", error);
    return "[]";
  }
};

/**
 * Get contact count
 */
export const getContactCount = (): number => {
  try {
    const contacts: ContactSubmission[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
    return contacts.length;
  } catch (error) {
    console.error("Error getting contact count:", error);
    return 0;
  }
};
