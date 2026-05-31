import { db } from "@/db";
import { tasks } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const allTasks = await db.select().from(tasks).orderBy(desc(tasks.createdAt))

        return NextResponse.json({
            success: true,
            data: allTasks
        }, 
        {
            status: 200
        });
    }
    catch (error) {
        console.log("GET route err:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch tasks" }
            , { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
    const body = await request.json();

    if (!body.title || typeof body.title !== "string" || body.title.trim() === "")
    {
        return NextResponse.json(
            {success: false, error: "Title is required"},
            {status: 400}
        )
    }


    const [result] = await db.insert(tasks).values({
        title: body.title.trim(),
    }).returning();

    return NextResponse.json(
        {success: true, data: result},
        {status: 201}
    )
    } catch (error) {
        console.log("POST route err:", error);
        return NextResponse.json(
            {success: false, error: "Failed to create task"},
            { status: 500 }
        )
    }
} 