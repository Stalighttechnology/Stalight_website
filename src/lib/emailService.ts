import emailjs from '@emailjs/browser';

// Initialize EmailJS
// NOTE: Replace these with your actual EmailJS credentials
// Get them from: https://dashboard.emailjs.com/

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

// Initialize EmailJS on module load
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface ContactEmailData {
  user_name: string;
  user_email: string;
  user_message: string;
  to_email: string;
}

/**
 * Send contact form email to admin
 * Email is sent to the admin email with user details
 */
export const sendContactEmail = async (data: {
  name: string;
  email: string;
  message: string;
  adminEmail: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    // Check if EmailJS is properly configured
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
        EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.warn('EmailJS not configured. Please set environment variables.');
      return {
        success: false,
        message: 'Email service not configured. Please contact administrator.'
      };
    }

    // Prepare email data
    const emailData: ContactEmailData = {
      user_name: data.name,
      user_email: data.email,
      user_message: data.message,
      to_email: data.adminEmail,
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailData
    );

    console.log('Email sent successfully:', response);

    return {
      success: true,
      message: 'Email sent successfully! We will contact you soon.'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again or contact us directly.'
    };
  }
};

/**
 * Send confirmation email to user
 */
export const sendConfirmationEmail = async (data: {
  name: string;
  email: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const emailData = {
      user_name: data.name,
      user_email: data.email,
      to_email: data.email,
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      'contact_confirmation', // Different template for confirmation
      emailData
    );

    return {
      success: true,
      message: 'Confirmation email sent to your email address.'
    };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return {
      success: false,
      message: 'Could not send confirmation email.'
    };
  }
};

/**
 * Test EmailJS configuration
 */
export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
        EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.error('EmailJS credentials not configured');
      return false;
    }

    console.log('EmailJS Configuration:');
    console.log('- Service ID:', EMAILJS_SERVICE_ID.substring(0, 5) + '***');
    console.log('- Public Key:', EMAILJS_PUBLIC_KEY.substring(0, 5) + '***');
    return true;
  } catch (error) {
    console.error('Error testing EmailJS:', error);
    return false;
  }
};
