'use client'

import React from 'react'

const ExportButton = () => {
  const handleExport = () => {
    alert('Data exported!')
  }
  return (
    <button className="py-4 px-8 bg-sky-600 text-white rounded-md" onClick={handleExport}>
      Export Data
    </button>
  )
}

export default ExportButton
