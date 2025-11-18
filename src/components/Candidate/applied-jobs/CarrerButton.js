"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function CarrerButton() {
    const router = useRouter();
  return (
    <div className='btn-primary btn refresh-btn' onClick={() => router.push("/career")}>Apply Now</div>
  )
}

export default CarrerButton