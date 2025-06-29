"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

type FishSpecies = Database["public"]["Tables"]["fish_species"]["Row"]
type Catch = Database["public"]["Tables"]["catches"]["Row"] & {
  fish_species: FishSpecies
}

export function useFishData(userId: string) {
  const [fishSpecies, setFishSpecies] = useState<FishSpecies[]>([])
  const [catches, setCatches] = useState<Catch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all fish species
        const { data: speciesData, error: speciesError } = await supabase.from("fish_species").select("*").order("name")

        if (speciesError) throw speciesError

        // Fetch user's catches
        const { data: catchesData, error: catchesError } = await supabase
          .from("catches")
          .select(`
            *,
            fish_species (*)
          `)
          .eq("user_id", userId)
          .order("caught_at", { ascending: false })

        if (catchesError) throw catchesError

        setFishSpecies(speciesData || [])
        setCatches(catchesData || [])
      } catch (error) {
        console.error("Error fetching fish data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const addCatch = async (catchData: Database["public"]["Tables"]["catches"]["Insert"]) => {
    try {
      const { data, error } = await supabase
        .from("catches")
        .insert(catchData)
        .select(`
          *,
          fish_species (*)
        `)
        .single()

      if (error) throw error

      setCatches((prev) => [data, ...prev])
      return data
    } catch (error) {
      console.error("Error adding catch:", error)
      throw error
    }
  }

  const uploadCatchPhoto = async (file: File, userId: string): Promise<string> => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("catch-photos").upload(fileName, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("catch-photos").getPublicUrl(fileName)

      return data.publicUrl
    } catch (error) {
      console.error("Error uploading photo:", error)
      throw error
    }
  }

  return {
    fishSpecies,
    catches,
    loading,
    addCatch,
    uploadCatchPhoto,
  }
}
