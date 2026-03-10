"use client";
import { useParams } from "next/navigation"


export default function RegisterPage() {
    const params = useParams();
    console.log(params)
 return<>
 <h1>test {params.id}</h1>
 </>
};