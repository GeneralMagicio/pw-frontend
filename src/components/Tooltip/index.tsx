import React, { useState, ReactNode } from 'react'

interface TooltipProps {
  text: string
  children: ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseEnter = () => {
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <div
      className="relative inline-block "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2  min-w-max -translate-y-1/4 -translate-x-1/2 transform rounded-2xl bg-white p-4 text-xs  shadow-md transition-all">
          {text}
          <div className="absolute inset-x-0 bottom-0 mx-auto h-0 w-0 translate-y-full border-x-8 border-t-8 border-x-transparent border-t-white"></div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
