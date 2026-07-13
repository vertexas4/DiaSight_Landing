import { createClient } from '@supabase/supabase-js'

// Supabase is only needed for the app's authenticated / data features
// (login, dashboard, assessments). The public landing page does NOT use it.
//
// When the VITE_SUPABASE_* env vars are absent (e.g. a landing-only deploy
// where no env is configured on the host), we fall back to harmless
// placeholder values. This is important: without it, createClient() throws
// "supabaseUrl is required." at import time, which crashes the whole bundle
// and blanks the entire site — a black screen — even on pages that never
// touch Supabase.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'public-anon-key-placeholder'

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_KEY
)

if (!isSupabaseConfigured) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_KEY are not set. ' +
      'Auth and data features are disabled — this is expected for the public landing page.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
