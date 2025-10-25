import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dabczdtbzddoihrjuzut.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhYmN6ZHRiemRkb2locmp1enV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MTgxNjQsImV4cCI6MjA3Njk5NDE2NH0.h3lJvTdSi3CqhVZlf28dLM4WftOf1rxOAz97czHHicY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
