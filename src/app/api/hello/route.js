import { NextResponse } from "next/server";

// Handles GET requests to /api
export async function GET(request) {
  // ...
  return NextResponse.json({ message: "Hello, this is the GymGPT API!" });
}