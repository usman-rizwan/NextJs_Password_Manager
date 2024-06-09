import { connectToDB } from "@/db/dbConfig";
import User from "@/userSchema/index.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect To DataBAse
connectToDB();

export const POST = async (req) => {
  try {
    // Add User To DataBase
    const { username, email, password } = await req.json();
    console.log(username, email, password);

    // 1. Check if user already exists in DataBase
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ status: 401, message: "User already exists" });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10); // 10 Rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create new user in DataBase
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });
    // 4. Save User in DataBase
    const savedUser = await newUser.save();
    console.log("Saved User ===>", savedUser);

    // 5. Generate JWT Token
    const tokenData = { id: savedUser._id, username: savedUser.name };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 6. return response
    const response = NextResponse.json({
      message: "User created",
      savedUser,
      token,
    });

    // 7. Set Cookie
    response.cookies.set("token", token, { httpOnly: true });

    // 8. return response after setting the cookie
    return response;
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      error: error.message,
    });
  }
};
