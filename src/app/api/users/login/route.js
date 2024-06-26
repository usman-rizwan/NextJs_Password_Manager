import { connectToDB } from "@/db/dbConfig";
import User from "@/db/userSchema/index.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect To DataBase
connectToDB();

export const POST = async (req) => {
  try {
    // Login User After checking user credentials
    const { email, password } = await req.json();
    console.log("email === > ", email);
    console.log("password === > ", password);

    // 1. Check if user already exists in DataBase
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ status: 401, message: "User not found" });
    }

    // 2. Check the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ status: 403, message: "Incorrect Password" });
    }

    // 3. Generate JWT Token
    const tokenData = { id: user._id, username: user.name };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 4. Return Response
    const response = NextResponse.json({
      status:200,
      message: "User logged in successfully",
      user,
      token,
    });

    // 5. Set Cookie
    response.cookies.set("token", token, { httpOnly: true });

    // 6. Return Response after setting the cookie
    return response;
  } catch (error) {
    console.log("error=-========> " , error.message);
    return NextResponse.json({
      status:500,
      message: "Error logging in",
      error: error.message,
    });
  }
};
