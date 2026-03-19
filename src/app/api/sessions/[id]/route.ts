import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// GET /api/sessions/[id] — fetch session
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = await getDb();
        const session = await db.collection("sessions").findOne({ _id: id as never });

        if (!session) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        return NextResponse.json(session);
    } catch (err) {
        console.error("GET /api/sessions/[id] error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT /api/sessions/[id] — update session (answers, teamMembers, etc.)
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();

        const db = await getDb();
        const sessions = db.collection("sessions");

        // Build update object from provided fields only
        const update: Record<string, unknown> = { updatedAt: Date.now() };
        if (body.answers !== undefined) update.answers = body.answers;
        if (body.teamMembers !== undefined) update.teamMembers = body.teamMembers;
        if (body.personalInfo !== undefined) update.personalInfo = body.personalInfo;

        const result = await sessions.updateOne(
            { _id: id as never },
            { $set: update }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("PUT /api/sessions/[id] error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
