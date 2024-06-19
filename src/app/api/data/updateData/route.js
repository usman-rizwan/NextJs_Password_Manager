import { NextResponse } from "next/server";
import { connectToDB } from "@/db/dbConfig";
import UserData from "@/db/userCredentialsSchema";

connectToDB();
