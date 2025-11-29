import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      subject: String(form.get("subject") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
    };

    // Basic validation
    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // TODO: Integrate with actual support backend/email service
    // For now, acknowledge receipt to ensure form works without errors
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}

