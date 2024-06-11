import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      status: 200,
      success: true,
    });
    response.cookies.delete("token");
    return response;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error, status: 500 });
  }
};
