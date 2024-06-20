import { NextResponse } from "next/server";
import { connectToDB } from "@/db/dbConfig";
import UserData from "@/db/userCredentialsSchema";

connectToDB();

export const PATCH = async (req) => {
  try {
    const { data } = await req.json();
    const { website, username, password, id } = data;
    // console.log(" website, username, password>>>>> " , website, username, password );
    const userId = id;
    // console.log("userId .>>>>" , userId);

    // Update user in Db

    const updatedUser = await UserData.findByIdAndUpdate(
      userId,
      {
        website_name: website,
        website_username: username,
        website_password: password,
      },
      { new: true, runValidators: true }
    );
    console.log("updatedUser ======>", updatedUser);

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json({
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in updating data:", error.message);
    return NextResponse.json({ status: 500, error: error.message });
  }
};
