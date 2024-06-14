import { connectToDB } from "@/db/dbConfig";
import UserData from "@/db/userCredentialsSchema";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Connect To DataBAse
connectToDB();

export const POST = async (req) => {
  try {
    const { username, website, password } = await req.json();
    if (!username.trim() || !website.trim() || !password.trim()) {
      return NextResponse.json({
        message: "Username, Website and Password are required",
        status: 400,
      });
    }
    const existingEntry = await UserData.findOne({ website_name:website });
    console.log("existingEntry========>" , existingEntry);
    if (existingEntry) {
      console.log("End response ==========>>><,");
      return NextResponse.json({
        message: "Field already exists",
        status: 400,
      });
    }
    const getToken = req.cookies.get("token");
    // console.log('getToken--->' , getToken.value);
    if (!getToken) {
      return NextResponse.json(
        {
          status:401,
          message: "Token not found",
          error: "Unauthorized",
        },
      );
    }

    const decodedToken = jwt.verify(getToken.value, process.env.JWT_SECRET);
    // console.log(".decodeToken.....", decodeToken);

    const saveUserData = new UserData({
      ownerId: decodedToken.id,
      ownerName: decodedToken.username,
      website_username: username,
      website_name: website,
      website_password: password,
    });
    const response = await saveUserData.save();
    console.log("Usere Data save ===>", response);

    return NextResponse.json(
      {
        status:200,
        message: "Data added to db",
        response,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Error adding data",
      error: error.message,
    });
  }
};