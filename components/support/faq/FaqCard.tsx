'use client'

import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function FaqCard ({id, category, question, answer, isOpen, onToggle }: {id: string; category: string; question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
      const [openId, setOpenId] = useState<string | null>(null)
    return (
      <div key={category}>
        <div className="space-y-3">
          <div
            key={id}
            className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-600/40 rounded-lg overflow-hidden hover:border-indigo-500/80 hover:bg-indigo-900/60 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 cursor-pointer"
          >
            <button
              onClick={() => setOpenId(openId === id ? null : id)}
              className="w-full px-5 py-4 flex justify-between items-center text-left transition-colors cursor-pointer"
            >
              <span className="font-semibold text-indigo-300">{question}</span>
              {openId === id ? (
                <BiChevronUp size={20} className="text-indigo-400" />
              ) : (
                <BiChevronDown size={20} className="text-indigo-400" />
              )}
            </button>
            {openId === id && (
              <div className="px-5 py-4 bg-indigo-950/30 border-t border-indigo-700/20">
                <p className="text-indigo-200">{answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}