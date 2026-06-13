/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Plot, StoryChoice } from '../types';
import { Sparkles, MessageCircle, ArrowRight, User } from 'lucide-react';
import { motion } from 'motion/react';

interface StoryOverlayProps {
  plot: Plot;
  step: number;
  onNext: () => void;
  onChoiceSelect: (choice: StoryChoice) => void;
}

export const StoryOverlay: React.FC<StoryOverlayProps> = ({
  plot,
  step,
  onNext,
  onChoiceSelect,
}) => {
  const currentDialogue = plot.dialogues[step];
  const isLastStep = step === plot.dialogues.length - 1;
  const hasChoices = isLastStep && plot.choices && plot.choices.length > 0;

  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!currentDialogue) return;
    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    const fullText = currentDialogue.text;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[charIndex]);
      charIndex++;
      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20); // 20ms per character

    return () => clearInterval(interval);
  }, [currentDialogue]);

  const handleContainerClick = () => {
    if (isTyping) {
      // Instant skip typing
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
    } else if (!hasChoices) {
      onNext();
    }
  };

  if (!currentDialogue) return null;

  // Visual avatar styling based on speaker name
  const getSpeakerStyle = (speaker: string) => {
    switch (speaker) {
      case '医生':
        return {
          bg: 'bg-teal-50 text-teal-600 border-teal-200',
          badge: 'bg-teal-500 text-white',
          label: '主治医生 👨‍⚕️',
        };
      case '父亲':
        return {
          bg: 'bg-blue-50 text-blue-600 border-blue-200',
          badge: 'bg-blue-500 text-white',
          label: '老爸 (顾国强) 🧔',
        };
      case '母亲':
      case '母亲 (虚弱)':
      case '神秘女声':
        return {
          bg: 'bg-rose-50 text-rose-600 border-rose-200',
          badge: 'bg-rose-500 text-white',
          label: '温柔的老妈 (林小雨) 👩',
        };
      case '心声':
      case '心声 (前世记忆)':
      case '你':
        return {
          bg: 'bg-amber-50 text-amber-600 border-amber-200',
          badge: 'bg-amber-500 text-white',
          label: '宝宝 (你) 👶',
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-600 border-slate-200',
          badge: 'bg-slate-500 text-white',
          label: '系统旁白 📖',
        };
    }
  };

  const speakerConfig = getSpeakerStyle(currentDialogue.speaker);

  return (
    <div
      onClick={handleContainerClick}
      className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex flex-col justify-end p-4 md:p-8 cursor-pointer select-none"
    >
      {/* Decorative Top Banner */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between border-b border-white/10 pb-3 pointer-events-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          <span className="text-white font-medium text-sm tracking-widest uppercase">
            生命回响 - 正在经历故事
          </span>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {plot.title} • {step + 1}/{plot.dialogues.length}
        </div>
      </div>

      {/* Main Conversation Container */}
      <div className="max-w-3xl w-full mx-auto mb-4 md:mb-12 space-y-6">
        
        {/* Speaker Name Block */}
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-full border shadow-sm ${speakerConfig.bg}`}>
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${speakerConfig.badge}`}>
              {speakerConfig.label}
            </span>
            <div className="text-white text-lg font-bold mt-1">
              {currentDialogue.speaker}
            </div>
          </div>
        </div>

        {/* Dynamic Text Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 min-h-[140px] flex flex-col justify-between shadow-2xl relative">
          <div className="text-slate-100 text-lg md:text-xl leading-relaxed tracking-wide">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2.5 h-5 bg-amber-400 animate-pulse ml-1 align-middle" />
            )}
          </div>

          <div className="mt-6 flex justify-end items-center text-xs text-slate-500 font-medium">
            {!hasChoices && !isTyping && (
              <div className="flex items-center gap-1.5 animate-bounce">
                <span>点击屏幕任意位置继续</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
            {isTyping && <span>点击跳过打字效果</span>}
          </div>
        </div>

        {/* Unlocks or choices if dialogue hits last step */}
        {hasChoices && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
            onClick={(e) => e.stopPropagation()} // Stop overlay skip click
          >
            {plot.choices?.map((choice, idx) => (
              <button
                key={idx}
                id={`story-choice-${idx}`}
                onClick={() => onChoiceSelect(choice)}
                className="group relative text-left bg-gradient-to-r from-indigo-900/40 to-slate-900/90 hover:from-indigo-800/60 hover:to-slate-800/90 border border-indigo-500/30 hover:border-indigo-400 rounded-xl p-4 transition-all duration-300 shadow-lg active:scale-[0.98]"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-900/80 text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs mt-0.5 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm md:text-base leading-snug">
                      {choice.text}
                    </p>
                    {choice.effects && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {choice.effects.intellect && (
                          <span className="px-1.5 py-0.5 bg-sky-950 text-sky-400 text-[10px] rounded border border-sky-900">
                            智力 +{choice.effects.intellect}
                          </span>
                        )}
                        {choice.effects.physical && (
                          <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] rounded border border-emerald-900">
                            体能 +{choice.effects.physical}
                          </span>
                        )}
                        {choice.effects.hunger !== undefined && choice.effects.hunger !== 0 && (
                          <span className={`px-1.5 py-0.5 text-[10px] rounded border ${choice.effects.hunger > 0 ? 'bg-amber-950 text-amber-400 border-amber-900' : 'bg-rose-950 text-rose-400 border-rose-900'}`}>
                            饥饿度 {choice.effects.hunger > 0 ? `+${choice.effects.hunger}` : choice.effects.hunger}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
