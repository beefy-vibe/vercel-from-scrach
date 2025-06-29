import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) throw error

      // Redirect to the main app after successful authentication
      return NextResponse.redirect(`${origin}/`)
    } catch (error) {
      console.error("Auth callback error:", error)
      // Redirect to error page or back to login
      return NextResponse.redirect(`${origin}/?error=auth_callback_error`)
    }
  }

  // If no code, redirect back to home
  return NextResponse.redirect(`${origin}/`)
}
