'use client'
import Image, { StaticImageData } from 'next/image';
import Separator from '../shared/Separator';
import AbilityCard from './AbilityCard';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
export default function CharacterCard({ name, role, image, description, abilities }: { name: string; role: string; image: StaticImageData; description: string; abilities: {title: string; description: string,
        damage: number,
        apCost: number,
        apGain: number,
        hpGain: number, 
        image: StaticImageData}[] }) {

            const popupRef = useRef<HTMLDivElement>(null);
            const [openAbility, setOpenAbility] = useState<number | null>(null);
            
            useEffect(() => {
                const handleClickOutside = (event: MouseEvent) => {
                if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                    setOpenAbility(null);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);
  
    return (
    <div>
      {/* Modal Overlay */}
      {openAbility !== null && (
        <div 
          className="fixed inset-0 bg-black/30  z-50 flex items-center justify-center"
          onClick={() => { setOpenAbility(null) }}
        >
          <div className="z-60" 
            ref={popupRef}

          >
            <AbilityCard
              image={abilities[openAbility].image}
              title={abilities[openAbility].title}
              description={abilities[openAbility].description}
              damage={abilities[openAbility].damage}
              apCost={abilities[openAbility].apCost}
              apGain={abilities[openAbility].apGain}
              hpGain={abilities[openAbility].hpGain}   
            />
          </div>
        </div>
      )}

      <div className="p-6 border-2 border-indigo-900/80 rounded-lg bg-indigo-900/10 hover:bg-indigo-900/40 hover:border-indigo-600/50 transition-all duration-200 cursor-pointer">
        {/* Character Header */}
        <div className="mb-6 pb-6 border-b border-indigo-600/30">
          <div className="flex flex-col items-center gap-6">
            <div className="flex-shrink-0">
              <div className="p-2 bg-indigo-900/50 rounded-lg border border-indigo-600/40">
                <Image src={image} alt={name} width={120} height={120} quality={100} unoptimized style={{ imageRendering: 'pixelated' }} />
              </div>
            </div>
            <div className="flex-1 text-center">
              <h3 className="text-2xl font-bold text-indigo-300 mb-1" style={{ fontFamily: '"Press Start 2P", "Courier New", monospace', letterSpacing: '0.05em' }}>
                {name}
              </h3>
              <p className="text-sm uppercase tracking-widest text-indigo-400 font-semibold mb-3">{role}</p>
              <p className="text-indigo-200 text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        </div>

        {/* Abilities Section */}
        <div>
          <h4 className="text-lg font-bold text-indigo-300 mb-4 uppercase tracking-wider text-center">
            Abilities
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {abilities.map((ability, index) => (
              <div 
                key={ability.title} 
                className="group flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => setOpenAbility(index)}
              >
                <div className="mb-2 p-3 bg-indigo-900/40 rounded-lg border border-indigo-600/30 group-hover:border-indigo-500/60 group-hover:bg-indigo-900/60 transition-all">
                  <Image
                    src={ability.image}
                    alt={ability.title}
                    width={64}
                    height={64}
                    quality={100}
                    unoptimized
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <p className="text-indigo-300 font-semibold text-center text-sm group-hover:text-indigo-200 transition-colors">
                  {ability.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}