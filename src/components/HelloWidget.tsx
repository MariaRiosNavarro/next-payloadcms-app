import React from 'react'
import { authUserEmail } from './../access'

export const HelloWidget: React.FC<{ userEmail: string }> = ({ userEmail = '🫥' }) => {
  userEmail = authUserEmail
  return (
    <div className="px-4 py-2 text-2xl bg-sky-500 text-bolder text-white">Hello, {userEmail}</div>
  )
}

export default HelloWidget
