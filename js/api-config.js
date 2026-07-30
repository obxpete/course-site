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
  supabaseUrl: "https://tbiiixiaoxtdbqdsrfuo.supabase.co",   // e.g. "https://xxxxxxxx.supabase.co"
  supabaseAnonKey: "sb_publishable_NJ1qAsyB4-8e5u57xEy3gw_MIr3ux58" // the public "anon" key from Supabase → Project Settings → API
};
