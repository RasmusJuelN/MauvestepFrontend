import { StaticImageData } from "next/image";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRef } from "react";
import Underline from "../shared/Underline";

export default function AbilityCard({title, description, damage, apCost, apGain, hpGain, image} : 
        {title: string, 
        description: string,
        damage: number,
        apCost: number,
        apGain: number,
        hpGain: number, 
        image: StaticImageData}) {

       
            
  return (
    <div className="mt-2 p-10 border-2 border-indigo-700/80 rounded-lg bg-indigo-950 transition-all duration-200 cursor-pointer w-[400px] text-center flex flex-col items-center space-y-6">
       <p className="text-xl">{title}</p>
       
      <div className="flex flex-row gap-8 justify-center items-center mt-2">
        <div>
          <Image src={image} alt={title} width={104} height={104} />
        
        </div>
        <div>
            <p className="text-smtext-indigo-200">Ability Details:</p>
      <ul className="text-sm text-indigo-300 text-left">
        <li>- Damage: {damage}</li>
        <li>- AP Cost: {apCost}</li>
        <li>- AP Gain: {apGain}</li>
        <li>- HP Gain: {hpGain}</li>
      </ul>
        </div>
      </div>

    
      <p className="mt-2 text-indigo-200">{description}</p>
    </div>
  );
}