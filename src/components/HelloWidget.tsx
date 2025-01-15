import React from 'react'

const HelloWidget: React.FC<{ userEmail: string }> = ({ userEmail = 'unknow 🫥' }) => {
  return (
    <div className="px-4 py-2 text-2xl bg-sky-500 text-bolder text-white">
      Hello, user {userEmail}
    </div>
  )
}

export default HelloWidget
