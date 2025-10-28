import { createAdminUser } from "@/lib/create-admin"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const result = await createAdminUser()
    return NextResponse.json({ 
      success: true, 
      message: result.message
    })
  } catch (error) {
    console.error("Error in create-admin API:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Failed to create admin user" 
    }, { status: 500 })
  }
}