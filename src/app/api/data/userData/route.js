import { connectToDB } from "@/db/dbConfig";
import UserData from "@/db/userCredentialsSchema";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Connect To Database
connectToDB();

export const POST = async (req) => {
  try {
    const { username, website, password } = await req.json();
    if (!username.trim() || !website.trim() || !password.trim()) {
      return NextResponse.json({
        message: "Username, Website, and Password are required",
        status: 400,
      });
    }

    // Get token from cookies
    const getToken = req.cookies.get("token");
    if (!getToken) {
      return NextResponse.json({
        status: 401,
        message: "Token not found",
        error: "Unauthorized",
      });
    }

    // Verify and decode token
    const decodedToken = jwt.verify(getToken.value, process.env.JWT_SECRET);

    // Check if website_name already exists for the current user
    const existingEntry = await UserData.findOne({
      ownerId: decodedToken.id,
      website_name: website,
    });

    if (existingEntry) {
      return NextResponse.json({
        message: "Field already exists for this user",
        status: 400,
      });
    }

    // Create new UserData document
    const saveUserData = new UserData({
      ownerId: decodedToken.id,
      ownerName: decodedToken.username,
      website_username: username,
      website_name: website,
      website_password: password,
    });

    // Save new UserData document
    const response = await saveUserData.save();
    console.log("User Data saved ===>", response);

    return NextResponse.json({
      status: 200,
      message: "Data added to db",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error adding data",
      error: error.message,
    });
  }
};
