'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface CharacterMarqueeProps {
  direction?: 'left' | 'right'
  speed?: number
}

export default function CharacterMarquee({ 
  direction = 'right', 
  speed = 30 
}: CharacterMarqueeProps) {
  // All 16 character types
  const characterTypes = [
    'SRFQ', 'SRFL', 'SRCQ', 'SRCL',
    'SEFQ', 'SEFL', 'SECQ', 'SECL',
    'GRFQ', 'GRFL', 'GRCQ', 'GRCL',
    'GEFQ', 'GEFL', 'GECQ', 'GECL'
  ]

  // Triple the array to ensure smooth infinite loop with more variety
  const duplicatedTypes = [...characterTypes, ...characterTypes, ...characterTypes]

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-3 md:gap-6"
        animate={{
          x: direction === 'right' ? ['0%', '-33.33%'] : ['-33.33%', '0%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {duplicatedTypes.map((type, index) => (
          <div
            key={`${type}-${index}`}
            className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24"
          >
            <Image
              src={`/characters/${type === 'SRFQ' ? 'SRFQ_gallery.png' : 
                    type === 'SECQ' ? 'SECQ_gallery.png' : 
                    type === 'SEFL' ? 'SEFL_gallery.png' : 
                    type === 'SRCL' ? 'SRCL_gallery.png' : 
                    type === 'GEFQ' ? 'GEFQ_gallery.png' : 
                    type === 'SRFL' ? 'SRFL_gallery.png' : 
                    type === 'GRCQ' ? 'GRCQ_gallery.png' : 
                    type === 'GEFL' ? 'GEFL_gallery.png' : 
                    type === 'GECL' ? 'GECL_gallery.png' : 
                    type === 'GECQ' ? 'GECQ_gallery.png' : 
                    type === 'SRCQ' ? 'SRCQ_gallery.png' : 
                    type === 'SEFQ' ? 'SEFQ_gallery.png' : 
                    type === 'GRCL' ? 'GRCL_gallery.png' : 
                    type === 'GRFQ' ? 'GRFQ_gallery.png' : 
                    type === 'SECL' ? 'SECL_gallery.png' : 
                    type === 'GRFL' ? 'GRFL_gallery.png' : 
                    type + '_new3.png'}`}
              alt={`${type} character`}
              width={96}
              height={96}
              className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              quality={85}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}