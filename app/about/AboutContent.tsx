"use client"
// Client Side Component
export default function AboutContent() {
  return (
    <>
      <h1 className="text-4xl text-blue-500">About Page</h1>
      <p className="text-2xl animate-bounce">This is paragraph</p>
      <button onClick={() => alert('OK clicked')}>OK</button>
    </>
  )
}
