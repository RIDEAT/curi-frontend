import { NextResponse } from "next/server";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const addReservation = async (reservation: any) => {
  try {
    const data = {
      ...reservation,
      created_at: new Date(),
    };
    console.log("[request]", data, "reservation save to database");
    const docRef = await addDoc(collection(db, "download_intro"), data);
    console.log("Document written with ID: ", docRef.id);
    console.log("[complete]", data, "reservation saved to database");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const json_response = {
      status: "success",
      data: {
        data,
      },
    };

    await addReservation(data);
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
