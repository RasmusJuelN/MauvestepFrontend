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

        useEffect(() => {
  console.log('openAbility changed to:', openAbility);
}, [openAbility]);
  
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

      <div className="p-6 hover:border-indigo-600/50 transition-all duration-200 ">
        <div className="mb-4 flex flex-row items-center">
          <Image src={image} alt={name} width={100} />
          <div className="flex flex-col ml-4">
            <h3 className="text-xl text-indigo-400 font-semibold">{name}</h3>
            <p className="muted mt-1 text-indigo-100">{role}</p>
            <p className="mt-2 text-indigo-200">{description}</p>
          </div>
        </div>

        <div>
          <div>
            <h4 className="text-lg text-indigo-300 font-semibold mt-4 mb-4 text-center ">
              Abilities
            </h4>

            <div className="grid grid-cols-3 gap-4">
              {abilities.map((ability, index) => (
                <div 
                  key={ability.title} 
                  className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform" 
                  onClick={() => setOpenAbility(index)}
                >
                  <Image
                    src={ability.image}
                    alt={ability.title}
                    width={64}
                    height={64}
                  />
                  <p className="mt-2 text-indigo-200">{ability.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}