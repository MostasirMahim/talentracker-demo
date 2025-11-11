"use server";
import { cookies } from "next/headers";

export async function getClientCookie(name) {
  const cookieStore = cookies();         
  const cookie = cookieStore.get(name);   
  return cookie?.value || null; 
}
