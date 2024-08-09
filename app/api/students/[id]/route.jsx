import { NextResponse } from "next/server";
import Students from "@/models/Students";
import dbConnect from "@/lib/dbConnect";
export async function POST(req, res) {
  await dbConnect();
  const updateData = await req.json();
  const { id } = await res.params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required." },
        { status: 400 }
      );
    }

    const updatedStudent = await Students.findByIdAndUpdate(id, updateData);

    if (!updatedStudent) {
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Student updated successfully.", data: updatedStudent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
export async function GET(req, res) {
  await dbConnect();
  // const updateData = await req.json();
  const { id } = await res.params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required." },
        { status: 400 }
      );
    }

    const updatedStudent = await Students.findById(id);

    if (!updatedStudent) {
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Student get successfully.", data: updatedStudent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, res) {
  await dbConnect();

  const { id } = await res.params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required." },
        { status: 400 }
      );
    }

    const deletedStudent = await Students.findByIdAndDelete(id);

    if (!deletedStudent) {
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Student deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
