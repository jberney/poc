import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://fmmtvldsgurbuutbuwrb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtbXR2bGRzZ3VyYnV1dGJ1d3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMzk4MzUsImV4cCI6MjA3MDgxNTgzNX0.uRsSgg5NWD1RT3n6AEx3avONkaaFHH2f5wQOxOcl0Cg'
);
