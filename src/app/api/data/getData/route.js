import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserData from "@/db/userCredentialsSchema";
import { connectToDB } from "@/db/dbConfig";

connectToDB();
export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const searchParamsId = url.searchParams.get("id");

    // console.log("Received ID:===>>>>>>", searchParamsId);

    // console.log("cokkiees Token" , req.cookies.get('token').value);

    const tokenCookie = req.cookies.get("token");
    const getIdFromToken = tokenCookie ? tokenCookie.value : null;

    if (!searchParamsId && !getIdFromToken) {
      return NextResponse.json({ status: 400, message: "ID is required" });
    }

    const token = searchParamsId || getIdFromToken;
    const verifyUserToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = verifyUserToken.id;
  //  console.log("userId===>", userId);  

   const getUserData = await UserData.find({ ownerId: userId });
   console.log("getUserData===>", getUserData);

   if (!getUserData.length) {
    return NextResponse.json({ status: 404, message: "No data found for this user" });
  }

  return NextResponse.json({ status: 200, data: getUserData });
  } catch (error) {
    console.log("Errror in getting DAta ====>", error.message);
    return NextResponse.json({ status: 500, error });
  }
};
