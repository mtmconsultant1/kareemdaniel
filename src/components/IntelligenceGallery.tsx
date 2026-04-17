"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Zap, Target, Eye, Search, Home, Lock, Heart } from 'lucide-react';

const IntelligenceGallery = () => {
  const [systemStatus, setSystemStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbz.../exec'); 
        const data = await response.json();
        setSystemStatus(data);
      } catch (error) { console.error("Offline", error); }
    };
    fetchStatus();
  }, []);

  const agents = [
    { id: 'axis', name: 'AXIS', layer: 'Executive', icon: Zap, desc: 'Prompt Commander | CNS', color: '#FFD700' },
    { id: 'prime', name: 'PRIME', layer: 'Executive', icon: Cpu, desc: '2nd Brain', color: '#E5E4E2' },
    { id: 'scope', name: 'SCOPE', layer: 'Executive', icon: Shield, desc: 'COO Intelligence', color: '#C0C0C0' },
    { id: 'boost', name: 'BOOST', layer: 'Operations', icon: Target, desc: 'SEO 2.0 Strategy', color: '#00D4FF' },
    { id: 'vibe', name: 'VIBE', layer: 'Operations', icon: Eye, desc: 'Brand Identity', color: '#FF007F' },
    { id: 'plex', name: 'PLEX', layer: 'Operations', icon: Search, desc: 'Deep Research', color: '#FFFFFF' },
    { id: 'mega-re', name: 'MEGA-RE', layer: 'Specialist', icon: Home, desc: 'Property (Establish)', color: '#4CAF50' },
    { id: 'mega-ins', name: 'MEGA-INS', layer: 'Specialist', icon: Lock, desc: 'Security (Protect)', color: '#2196F3' },
    { id: 'mega-legacy', name: 'MEGA-LEGACY', layer: 'Specialist', icon: Heart, desc: 'Legacy (Prepare)', color: '#9C27B0' },
  ];

  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-black mb-12 uppercase tracking-tighter">Intelligence Grid</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl">
              <agent.icon size={26} style={{ color: agent.color }} className="mb-4" />
              <h3 className="text-lg font-bold uppercase" style={{ color: agent.color }}>{agent.name}</h3>
              <p className="text-sm text-zinc-400 mb-4">{agent.desc}</p>
              <div className="w-full py-2 text-[10px] border border-zinc-800 rounded hover:bg-white hover:text-black uppercase font-bold tracking-widest cursor-pointer">Engage</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default IntelligenceGallery;
