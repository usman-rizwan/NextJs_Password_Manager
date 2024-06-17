import { NextResponse } from "next/server";
import { connectToDB } from "@/db/dbConfig";
import UserData from "@/db/userCredentialsSchema";

connectToDB();

export const DELETE = async (req) => {
  try {
    const { id } = await req.json();
    // console.log("id======>" , id);

    // Validating Id
    if (!id) {
      return NextResponse.json({ status: 400, message: "ID is required" });
    }

    // Find By ID
    const findItem = await UserData.findByIdAndDelete(id);
    console.log("findItem====>", findItem);
    
    // Check if the user data was found and deleted
    if (!findItem)
      return NextResponse.json({ status: 404, message: "User not found" });

    // Return  response
    return NextResponse.json({
      status: 200,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error,
    });
  }
};
