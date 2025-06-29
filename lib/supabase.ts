import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      fish_species: {
        Row: {
          id: string
          name: string
          scientific_name: string
          rarity: number
          description: string | null
          habitat: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          scientific_name: string
          rarity: number
          description?: string | null
          habitat?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          scientific_name?: string
          rarity?: number
          description?: string | null
          habitat?: string | null
          created_at?: string
        }
      }
      catches: {
        Row: {
          id: string
          user_id: string
          species_id: string
          photo_url: string | null
          location: string | null
          latitude: number | null
          longitude: number | null
          length_inches: number | null
          weight_lbs: number | null
          bait_used: string | null
          notes: string | null
          caught_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          species_id: string
          photo_url?: string | null
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          length_inches?: number | null
          weight_lbs?: number | null
          bait_used?: string | null
          notes?: string | null
          caught_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          species_id?: string
          photo_url?: string | null
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          length_inches?: number | null
          weight_lbs?: number | null
          bait_used?: string | null
          notes?: string | null
          caught_at?: string
          created_at?: string
        }
      }
    }
  }
}
