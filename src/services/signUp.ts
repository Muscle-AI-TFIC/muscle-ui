import { supabase } from '@/utils/supabase';

type SignUpData = {
    email: string;
    password: string;
    name: string;
    altura: number; // height_cm
    peso: number;   // weight_kg
    birth_date: string; // New field
    gender: string;     // New field
    fitness_level: string; // New field
    goal: string;
}

export async function signUp(validatedData: SignUpData) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: validatedData.email.trim().toLowerCase(),
    password: validatedData.password,
  });

  if (authError) {
    return { data: null, error: authError };
  }

  if (!authData.user) {
    return { data: null, error: new Error("User not created, but no auth error was reported.") };
  }

  const { error: insertError } = await supabase.from('user_profiles').insert({
    id: authData.user.id, // Changed from user_id
    name: validatedData.name.trim(),
    birth_date: validatedData.birth_date,
    gender: validatedData.gender,
    weight_kg: validatedData.peso,
    height_cm: validatedData.altura,
    fitness_level: validatedData.fitness_level,
    goal: validatedData.goal.trim(),
  });

  if (insertError) {
    return { data: null, error: insertError };
  }

  return { data: authData, error: null };
}