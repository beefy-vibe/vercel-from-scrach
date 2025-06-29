-- Enable RLS (Row Level Security)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create fish_species table
CREATE TABLE IF NOT EXISTS public.fish_species (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  rarity INTEGER NOT NULL CHECK (rarity >= 1 AND rarity <= 5),
  description TEXT,
  habitat TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create catches table
CREATE TABLE IF NOT EXISTS public.catches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  species_id UUID REFERENCES public.fish_species(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT,
  location TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  length_inches DECIMAL,
  weight_lbs DECIMAL,
  bait_used TEXT,
  notes TEXT,
  caught_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fish_species ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catches ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for fish_species (read-only for users)
CREATE POLICY "Fish species are viewable by everyone" ON public.fish_species
  FOR SELECT USING (true);

-- Create policies for catches
CREATE POLICY "Users can view their own catches" ON public.catches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own catches" ON public.catches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own catches" ON public.catches
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own catches" ON public.catches
  FOR DELETE USING (auth.uid() = user_id);

-- Create storage bucket for catch photos
INSERT INTO storage.buckets (id, name, public) VALUES ('catch-photos', 'catch-photos', true);

-- Create storage policy for catch photos
CREATE POLICY "Users can upload their own catch photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'catch-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view all catch photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'catch-photos');

CREATE POLICY "Users can update their own catch photos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'catch-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own catch photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'catch-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
