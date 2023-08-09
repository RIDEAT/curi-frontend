import { NextResponse } from "next/server";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface Reservation {
  id: string;
  name: string;
  email: string;
  optional_agreement: boolean;
  required_agreement: boolean;
  pre_reservation: boolean;
  created_at: Date;
}

const getAllReservations = async () => {
  return await getDocs(collection(db, "user")).then((querySnapshot) => {
    const newData = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as Reservation)
    );
    return newData;
  });
};

const getCountForReservations = (data: Reservation[]) => {
  if (data) {
    const Reservationed = data.filter((item) => item.pre_reservation === true);
    return Reservationed.length;
  }
  return 0;
};

export async function GET() {
  const result = await getAllReservations();
  const reservationsCount = getCountForReservations(result);
  const newletterCount = result.length;
  const json_response = {
    status: "success",
    data: {
      reservationsCount,
      newletterCount,
    },
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

const addReservation = async (reservation: any) => {
  try {
    const data = {
      ...reservation,
      created_at: new Date(),
    };
    console.log("[request]", data, "reservation save to database");
    const docRef = await addDoc(collection(db, "user"), data);
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
