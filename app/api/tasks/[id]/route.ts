import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(
  res: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    console.log("TASK DELETED: ", task);
    return NextResponse.json(task);
  } catch (error) {
    console.log("Error Deleting Task: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}

const taskUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  isCompleted: z.boolean().optional(),
  isImportant: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = taskUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: parsed.data,
    });

    console.log("TASK Updated: ", updatedTask);
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error Updating Task:", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}