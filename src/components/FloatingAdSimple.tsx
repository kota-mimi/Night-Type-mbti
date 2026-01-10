'use client'

import React from 'react'

export default function FloatingAdSimple() {
  console.log("🔥 FloatingAdSimple rendering!")
  
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        width: '140px',
        height: '140px',
        backgroundColor: 'green',
        borderRadius: '50%',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold'
      }}
    >
      SIMPLE
    </div>
  )
}