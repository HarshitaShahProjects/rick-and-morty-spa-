import React from 'react'

interface ErrorViewProps {
  message?: string
}

export default function ErrorView({ message = 'Something went wrong!' }: ErrorViewProps) {
  return <div className="center error">Error: {message}</div>
}
