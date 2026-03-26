import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const { data: shops, error } = await getSupabase()
    .from("shops")
    .select("id, shop_name, description, icon, is_open")
    .eq("is_open", true);

  if (error) {
    console.error("Shops fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch shops" }, { status: 500 });
  }

  return NextResponse.json(shops);
}