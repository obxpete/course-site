/**
 * API configuration for user-data persistence.
 *
 * This site works fully offline with no configuration — progress and quiz
 * scores are saved to localStorage automatically. To sync that data across
 * devices, create a free Supabase project (see README.md for the two-table
 * schema and setup steps) and fill in the two values below.
 *
 * Leave both as null to run in local-only mode.
 */
window.COURSE_API_CONFIG = {
  supabaseUrl: null,   // e.g. "https://xxxxxxxx.supabase.co"
  supabaseAnonKey: null // the public "anon" key from Supabase → Project Settings → API
};
