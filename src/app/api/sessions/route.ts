import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// POST /api/sessions — create a new session
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { sessionId, personalInfo, answers, questionsHash } = body;

        if (!sessionId || !personalInfo) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const db = await getDb();
        const sessions = db.collection("sessions");

        const doc = {
            _id: sessionId,
            version: "3",
            questionsHash,
            personalInfo,
            teamMembers: [],
            answers: answers || {},
            hasStarted: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        await sessions.insertOne(doc as never);

        return NextResponse.json({ sessionId }, { status: 201 });
    } catch (err) {
        console.error("POST /api/sessions error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
