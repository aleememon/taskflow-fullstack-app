import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {
        const { id } = await params;
        const body = await request.json();

        if (body.isCompleted === undefined && body.title === undefined) {
            return NextResponse.json(
                { success: false, error: "Provide title or isCompleted status to update" },
                { status: 400 }
            )
        }

        const updateData: Partial<typeof tasks.$inferInsert> = {
            updatedAt: new Date()
        }

        if (body.title !== undefined) {
            if (typeof body.title !== 'string' || body.title.trim() === '') {
                return NextResponse.json(
                    { success: false, error: 'Title cannot be an empty string.' },
                    { status: 400 }
                );
            }
            updateData.title = body.title.trim();
        }

        if (body.isCompleted !== undefined) {
            updateData.isCompleted = Boolean(body.isCompleted);
        }

        const [updatedTask] = await db.update(tasks).set(
            updateData
        ).where(eq(tasks.id, id)).returning();

        if (!updatedTask) {
            return NextResponse.json(
                { success: false, error: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: updatedTask },
            { status: 200 }
        );

    } catch (error) {
        console.log("PUT route err:", error);
        return NextResponse.json(
            { success: false, error: "failed to update task" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const [deletedTask] = await db.delete(tasks).where(eq(tasks.id, id)).returning();

        if (!deletedTask) {
            return NextResponse.json(
                { success: false, error: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: deletedTask },
            { status: 200 }
        );

    } catch (error) {
        console.log("DELETE route err:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete task" },
            { status: 500 }
        );
    }
}