"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

function RefreshButton() {
    const router = useRouter();
  return (
    <div className='btn-primary btn refresh-btn' onClick={() => router.refresh()}>Refresh</div>
  )
}

export default RefreshButton