'use client'

import { motion } from 'framer-motion'

interface ReboundRateBadgeProps {
  reboundRate: number
}

export default function ReboundRateBadge({ reboundRate }: ReboundRateBadgeProps) {
  // Color logic based on rebound rate
  const getColorScheme = (rate: number) => {
    if (rate <= 30) {
      return {
        bgColor: 'bg-green-100',
        borderColor: 'border-green-500',
        textColor: 'text-green-700',
        progressColor: 'bg-green-500',
        riskLevel: 'Safe',
        riskEmoji: '✅'
      }
    } else if (rate <= 70) {
      return {
        bgColor: 'bg-yellow-100',
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-700',
        progressColor: 'bg-yellow-500',
        riskLevel: 'Caution',
        riskEmoji: '⚠️'
      }
    } else {
      return {
        bgColor: 'bg-red-100',
        borderColor: 'border-red-500',
        textColor: 'text-red-700',
        progressColor: 'bg-red-500',
        riskLevel: 'Danger',
        riskEmoji: '🚨'
      }
    }
  }

  const colorScheme = getColorScheme(reboundRate)
  const progressWidth = Math.min(reboundRate, 100) // Cap at 100% for visual purposes

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`inline-flex flex-col items-center ${colorScheme.bgColor} ${colorScheme.borderColor} border-2 rounded-xl px-4 py-3 shadow-lg`}
    >
      {/* Badge Text */}
      <div className={`flex items-center gap-2 ${colorScheme.textColor} font-bold text-sm`}>
        <span className="text-lg">{colorScheme.riskEmoji}</span>
        <span>リバウンド率：{reboundRate}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-2 w-full max-w-[120px]">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full ${colorScheme.progressColor} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progressWidth}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className={`text-xs ${colorScheme.textColor} text-center mt-1 font-medium`}>
          {colorScheme.riskLevel}
        </div>
      </div>
    </motion.div>
  )
}