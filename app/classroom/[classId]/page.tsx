"use client"
import { useParams } from "next/navigation"

export default function Page() {
    const params = useParams()
    console.log(params)
    return <div className="bg-blue-500 w-full h-full">Hello from classroom with id {params.classId}</div>
}
