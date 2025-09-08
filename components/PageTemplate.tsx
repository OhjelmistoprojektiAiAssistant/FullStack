import React from 'react'

interface PageTemplateProps {
  title: string
  description?: string
  children?: React.ReactNode
  centered?: boolean
}

const PageTemplate = ({ 
  title, 
  description, 
  children, 
  centered = false 
}: PageTemplateProps) => {
  if (centered) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">{title}</h1>
          <div className="bg-white rounded-lg shadow-sm p-6">
            {description && (
              <p className="text-gray-600 text-center mb-4">{description}</p>
            )}
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {description && (
            <p className="text-gray-600 mb-4">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageTemplate
