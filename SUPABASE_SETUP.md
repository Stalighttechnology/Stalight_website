# SUPABASE SETUP GUIDE

## Step 1: Get Your Supabase Credentials
1. Go to https://supabase.com and create an account
2. Create a new project
3. Once created, go to Project Settings > API
4. Copy the "Project URL" and "anon public key"

## Step 2: Update .env.local
Update the `.env.local` file in your project root with your credentials:
```
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Create the contact_inquiries Table
In Supabase:
1. Go to SQL Editor
2. Run this SQL query:

```sql
-- Create contact_inquiries table
CREATE TABLE contact_inquiries (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security) - Allow anyone to insert
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anonymous users
CREATE POLICY "Allow public insert" ON contact_inquiries
  FOR INSERT
  WITH CHECK (true);
```

## Step 4: Test the Form
1. Fill out the contact form on your website
2. Submit it
3. Check Supabase Database > contact_inquiries table to verify the data was saved

## Files Created/Modified:
- `.env.local` - Environment variables (add your credentials here)
- `src/lib/supabaseClient.ts` - Supabase client initialization
- `src/lib/supabaseContactService.ts` - Contact form submission logic
- `src/components/ContactSection.tsx` - Updated to use Supabase

## How It Works:
1. User fills out the contact form
2. Form data is sent to `supabaseContactService.submitContactToSupabase()`
3. Data is inserted into the `contact_inquiries` table in Supabase
4. Success/error message is displayed to the user
5. Optional: Email notification is sent to admin

## Features:
✅ Direct Supabase database integration
✅ Real-time data storage
✅ Email notifications (optional)
✅ Form validation
✅ Error handling
✅ Loading states

## Future Enhancements:
- Add email notifications when new contact submitted
- Create admin dashboard to view all contacts
- Add attachment support
- Implement rate limiting to prevent spam
