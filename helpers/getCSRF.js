import { connection } from "./connection";

export async function getCSRF() {
  const csrf = await connection.get("/sanctum/csrf-cookie");
  console.log("csrf = ", csrf);
}
