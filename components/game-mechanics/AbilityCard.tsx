import { StaticImageData } from "next/image";
import Image from "next/image";
import React from "react";

export default function AbilityCard({title, description, damage, apCost, apGain, hpGain, image} : 
        {title: string, 
        description: string,
        damage: number,
        apCost: number,
        apGain: number,
        hpGain: number, 
        image: StaticImageData}) {
  
  return (
    <div className="p-8 border-2 border-indigo-600/60 rounded-xl bg-gradient-to-br from-indigo-950 to-indigo-900 transition-all duration-200 cursor-pointer w-[450px] shadow-2xl shadow-indigo-600/20 hover:border-indigo-500/80 hover:shadow-indigo-600/40">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-indigo-200 mb-6" style={{ fontFamily: '"Press Start 2P", "Courier New", monospace', letterSpacing: '0.1em' }}>
        {title}
      </h2>
      
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent mb-6"></div>

      {/* Image and Stats Layout */}
      <div className="flex flex-col gap-6">
        {/* Ability Image */}
        <div className="flex justify-center">
          <div className="p-4 bg-indigo-900/50 rounded-lg border border-indigo-600/40">
            <Image src={image} alt={title} width={120} height={120} quality={100} unoptimized style={{ imageRendering: 'pixelated' }} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatItem label="Damage" value={damage} color="text-red-400" />
          <StatItem label="AP Cost" value={apCost} color="text-orange-400" />
          <StatItem label="AP Gain" value={apGain} color="text-green-400" />
          <StatItem label="HP Gain" value={hpGain} color="text-blue-400" />
        </div>

        {/* Description */}
        <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-600/30">
          <p className="text-indigo-200 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-600/30 text-center">
      <p className="text-xs text-indigo-400 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}