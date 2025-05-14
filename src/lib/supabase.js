import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xfelrcwxypyeseuiajts.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmZWxyY3d4eXB5ZXNldWlhanRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxODg4NjYsImV4cCI6MjA2Mjc2NDg2Nn0.Z-ar-O6N88aeUv4LQ5PA4S1MKwi445L9EoZ9hJINE38';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);