import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://juyibhfuuvdjptkpenxp.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eWliaGZ1dXZkanB0a3BlbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTgzNTcsImV4cCI6MjA0NDYzNDM1N30.qsKOuqBRJ0XvkeUsQ7GRNogQGrgi0BOrLtfJGFbDusE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
