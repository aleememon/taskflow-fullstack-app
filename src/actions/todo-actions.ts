"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTaskAction(formData: FormData) {
    const title = formData.get("title") as string;

    if (!title || title.trim() === "") {
        throw new Error("Task Title cannot be empty.");
    }

    try {
        await db.insert(tasks).values({
            title: title,
        });

        revalidatePath("/dashboard");

        return;
    } catch (error) {
        console.log("Error creating task:", error);
        throw new Error("Failed to create task via Server Action.");
    }
}

export async function toggleTaskAction(id: string, currentStatus: boolean, formData?: FormData) {
    try {
        await db.update(tasks).set({
            isCompleted: !currentStatus,
            updatedAt: new Date()
        }).where(eq(tasks.id, id));

        revalidatePath("/dashboard");

        return;
    } catch (error) {
        console.log("Error toggle task", error);
        throw new Error("Failed to toggle task via server action");
    }
}

export async function deleteTaskAction(id: string, formData?: FormData) {
    try {
        await db.delete(tasks).where(eq(tasks.id, id));

        revalidatePath("/dashboard");

        return;
    } catch (error) {
        console.log("deleting task error", error);
        throw new Error("failed to delete task via server action");
    }
}