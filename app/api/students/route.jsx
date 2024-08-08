import { NextResponse } from "next/server";
import Students from "@/models/Students";
import dbConnect from "@/lib/dbConnect";
export async function GET(req, res) {
  await dbConnect();
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const users = await Students.find();

  if (query) {
    const updated = users.filter((data) =>
      data.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log(updated, "from updated");

    return NextResponse.json({ data: updated });
  }
  return NextResponse.json({ data: users });
}

export async function POST(req, res) {
  await dbConnect();
  try {
    const newStudent = await req.json();
    console.log(newStudent, "newStudent");

    const requiredFields = [
      "name",
      "phone",
      "email",
      "tamil",
      "english",
      "maths",
      "science",
      "social_science",
      "total",
      "average",
      "grade",
      "gender",
      "standard",
    ];

    for (let field of requiredFields) {
      if (!newStudent[field]) {
        return NextResponse.json(
          { error: `The field ${field} is required.`, data: newStudent },
          { status: 400 }
        );
      }
    }
    // await newStudent.save();
    await Students.create(newStudent);
    return NextResponse.json(
      { message: "Student created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
