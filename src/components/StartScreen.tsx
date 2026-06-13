/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameStage, Gender, Difficulty, GameSaveData } from '../types';
import { Play, Sparkles, BookOpen, AlertCircle, Trash2, Heart, ShieldAlert, BadgeInfo } from 'lucide-react';
import { motion } from 'motion/react';

interface StartScreenProps {
  onStartGame: (stage: GameStage, gender: Gender, difficulty: Difficulty) => void;
  onLoadSave: (save: GameSaveData) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, onLoadSave }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [stage, setStage] = useState<GameStage>('infant');
  const [gender, setGender] = useState<Gender>('boy');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [saves, setSaves] = useState<GameSaveData[]>([]);
  const [showSavesModal, setShowSavesModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBranches, setShowBranches] = useState(false);

  // Load saves from localStorage on mount
  useEffect(() => {
    try {
      const storedSaves = localStorage.getItem('life_game_saves');
      if (storedSaves) {
        setSaves(JSON.parse(storedSaves));
      }
    } catch (e) {
      console.error('Failed to load saves', e);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleStageSelect = (selectedStage: GameStage) => {
    if (selectedStage === 'toddler') {
      const hasCompletedInfant = localStorage.getItem('stage_infant_completed') === 'true';
      if (!hasCompletedInfant) {
        triggerToast('⚠️ 请先通关上一个生命阶段（完成婴儿期的终极目标并点击完成）！');
        return;
      }
      setShowBranches(true);
      setStage('junior_class');
      triggerToast('🌿 该阶段为分支阶段！有小班、中班、大班可供选择。');
      return;
    }
    
    setShowBranches(false);
    setStage(selectedStage);
  };

  const handleGenderSelect = (selectedGender: Gender) => {
    if (selectedGender === 'girl') {
      triggerToast('⚠️ 女生角色未开放！当前版本仅允许选择“男生”！');
      return;
    }
    setGender(selectedGender);
  };

  const handleDeleteSave = (e: React.MouseEvent, saveId: string) => {
    e.stopPropagation();
    try {
      const updated = saves.filter((s) => s.id !== saveId);
      setSaves(updated);
      localStorage.setItem('life_game_saves', JSON.stringify(updated));
      triggerToast('🗑️ 存档已彻底消除');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-[640px] h-full w-full bg-slate-950 flex flex-col justify-between p-6 overflow-y-auto font-sans text-slate-100">
      
      {/* Decorative ambient background waves */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950 -z-10 pointer-events-none" />

      {/* Floating toast message */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-amber-500/40 text-amber-300 font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 max-w-sm text-sm animate-bounce">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top logo block */}
      <div className="w-full max-w-lg mx-auto text-center pt-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 rounded-full text-indigo-400 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>轮回重生模拟器 v0.5</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
          人生游戏：重返襁褓
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          假如保留了前世宿命的所有记忆，重新在婴儿床上开始人生……<br />
          你会成为令人惊叹的传世神童，还是悠闲平凡地度过一生？
        </p>
      </div>

      {/* Center dynamic configuration panel */}
      <div className="w-full max-w-lg mx-auto bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 my-6">
        {!showConfig ? (
          // Main Options Screen
          <div className="space-y-4">
            <button
              id="btn-start-config"
              onClick={() => setShowConfig(true)}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] rounded-2xl font-bold text-lg text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 border border-indigo-500"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>开启崭新一生</span>
            </button>

            <button
              id="btn-show-saves"
              onClick={() => setShowSavesModal(true)}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-750 active:scale-[0.99] rounded-2xl font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 border border-slate-750"
            >
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>接续前世宿命 ({saves.length})</span>
            </button>

            {/* Quick stats/tips block */}
            <div className="pt-4 border-t border-slate-800/60 flex items-start gap-2.5 text-xs text-slate-400 leading-normal">
              <BadgeInfo className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>宿命提醒：</strong>
                婴儿阶段是奠定脑域的关键。通过锻炼体能、聚精会神、研读大人的秘籍，可以在婴儿期提前获取成长技能。
              </span>
            </div>
          </div>
        ) : (
          // Setup Wizard
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              设定新生的命运轨道
            </h2>

            {/* Step 1: Stage Choose */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-slate-300 block">第一步：选择成长阶段</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleStageSelect('infant')}
                  className={`py-3 px-4 rounded-xl text-left border transition-all ${
                    stage === 'infant'
                      ? 'bg-indigo-950/50 border-indigo-500 text-indigo-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm">👶 婴儿阶段</div>
                  <div className="text-[10px] mt-0.5 opacity-80">前世初醒，探索母乳、技能与空间</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleStageSelect('toddler')}
                  className={`py-3 px-4 rounded-xl text-left border transition-all relative overflow-hidden ${
                    stage === 'junior_class' || showBranches
                      ? 'bg-indigo-950/50 border-indigo-500 text-indigo-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm">👦 幼儿阶段</div>
                  <div className="text-[10px] mt-0.5 opacity-80">学会奔跑、大字识字与学校生活</div>
                  <span className="absolute top-1 right-2 bg-indigo-950 border border-indigo-700 text-indigo-400 text-[8px] px-1.5 rounded uppercase font-semibold">分 支</span>
                </button>
              </div>

              {/* Sub-branch selector for toddler stages */}
              {(showBranches || stage === 'junior_class') && (
                <div className="p-4 bg-slate-950/80 border border-indigo-500/20 rounded-2xl space-y-3 mt-3 animate-fade-in text-left">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                    <span>🌟 幼儿期分支选择 (当前仅小班开放)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    该阶段为分支阶段，目前开放<strong>【小班】</strong>大线！中、大班仍未对外开放招生：
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStage('junior_class');
                        triggerToast('🎒 已成功入学：小班启蒙阶段！祝你在学校乘风破浪！');
                      }}
                      className={`py-2.5 px-2 rounded-xl text-center border text-xs font-bold transition-all ${
                        stage === 'junior_class'
                          ? 'bg-indigo-900/40 border-indigo-500 text-indigo-300 shadow shadow-indigo-500/20'
                          : 'bg-slate-900/60 border-slate-850 text-slate-400'
                      }`}
                    >
                      🏫 小班
                      <div className="text-[9px] font-normal opacity-85 mt-0.5 text-emerald-400">已开放</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        triggerToast('🔒 抱歉，中班分支尚未研发完毕，敬请期待！');
                      }}
                      className="py-2.5 px-2 rounded-xl text-center border bg-slate-900/20 border-slate-850 text-slate-600 cursor-not-allowed text-xs font-medium"
                    >
                      🧸 中班
                      <div className="text-[9px] font-normal opacity-70 mt-0.5 text-rose-500">未开放</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        triggerToast('🔒 抱歉，大班分支尚未研发完毕，敬请期待！');
                      }}
                      className="py-2.5 px-2 rounded-xl text-center border bg-slate-900/20 border-slate-850 text-slate-600 cursor-not-allowed text-xs font-medium"
                    >
                      🎓 大班
                      <div className="text-[9px] font-normal opacity-70 mt-0.5 text-rose-500">未开放</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Gender Selector */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-slate-300 block">第二步：选择生理性别</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleGenderSelect('boy')}
                  className={`py-3 px-4 rounded-xl text-center border font-semibold transition-all ${
                    gender === 'boy'
                      ? 'bg-blue-950/40 border-blue-500/80 text-blue-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400'
                  }`}
                >
                  ♂️ 男生 (唯一选项)
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderSelect('girl')}
                  className="py-3 px-4 rounded-xl text-center border bg-slate-950/20 border-slate-850/40 text-slate-600 relative cursor-not-allowed"
                >
                  ♀️ 女生
                  <span className="absolute top-0.5 right-1 bg-rose-950 text-rose-400 border border-rose-900 text-[8px] px-1 rounded transform scale-90">未开放</span>
                </button>
              </div>
            </div>

            {/* Step 3: Difficulty */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-slate-300 block">第三步：选择命运难度（饥饿消耗速度）</label>
              <div className="flex flex-col gap-2">
                {[
                  { key: 'easy', icon: '🐣', name: '简单', desc: '无饥饿/饥渴负担，最舒爽、无焦虑的婴儿生活' },
                  { key: 'normal', icon: '🍼', name: '普通', desc: '拥有饥饿/饥渴值，每 30 秒消耗 1 点' },
                  { key: 'hard', icon: '🚼', name: '困难', desc: '拥有饥饿/饥渴值，每 15 秒消耗 1 点，需勤劳觅食' },
                  { key: 'hell', icon: '💀', name: '地狱', desc: '极限饥渴危机，每 10 秒消耗 1 点，稍有松懈就会饿倒' },
                  { key: 'impossible', icon: '🩸', name: '无解', desc: '每 5 秒消耗 1 点！只有拥有顶级规划师思维的人才能存活' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setDifficulty(item.key as Difficulty)}
                    className={`py-2 px-3 rounded-xl border text-left transition-all ${
                      difficulty === item.key
                        ? 'bg-indigo-950/40 border-indigo-500/80 text-indigo-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{item.icon} {item.name}难度</span>
                      {difficulty === item.key && (
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-[11px] opacity-75 mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Actions */}
            <div className="flex gap-3 pt-3 border-t border-slate-800/60">
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 text-sm font-semibold transition"
              >
                返回
              </button>
              <button
                type="button"
                id="btn-launch-game"
                onClick={() => onStartGame(stage, gender, difficulty)}
                className="flex-[2] py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl text-white font-bold text-sm tracking-wide shadow-md shadow-indigo-600/25 transition active:scale-[0.98]"
              >
                点进游戏
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer credits and information */}
      <div className="w-full max-w-lg mx-auto text-center border-t border-slate-900 pt-4 pb-2">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>人生因充满抉择而厚重 • 珍惜生命里每一个咿呀瞬间</span>
        </div>
      </div>

      {/* Load save modal */}
      {showSavesModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>选择要唤醒的宿命记忆</span>
              </h3>
              <button
                onClick={() => setShowSavesModal(false)}
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                关闭
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[350px] space-y-3 bg-slate-950/40">
              {saves.length === 0 ? (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <ShieldAlert className="w-10 h-10 mx-auto opacity-40 text-indigo-400" />
                  <p className="text-sm">尚未建立过历史人生存档</p>
                  <p className="text-xs">请开启崭新的一生体验游戏吧！</p>
                </div>
              ) : (
                saves.map((save) => (
                  <div
                    key={save.id}
                    onClick={() => {
                      onLoadSave(save);
                      setShowSavesModal(false);
                    }}
                    className="p-3.5 rounded-xl border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-950/10 transition cursor-pointer flex justify-between items-center group relative overflow-hidden"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-300 text-sm">{save.saveName}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                          {save.difficulty === 'easy' && '简单'}
                          {save.difficulty === 'normal' && '普通'}
                          {save.difficulty === 'hard' && '困难'}
                          {save.difficulty === 'hell' && '地狱'}
                          {save.difficulty === 'impossible' && '无解'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400">
                        <span>坐标: ({save.coords.x}, {save.coords.y})</span>
                        <span>智力: {save.intellect}</span>
                        <span>体能: {save.physical}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        存档时间: {new Date(save.timestamp).toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteSave(e, save.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                      title="删除此存档"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center text-[11px] text-slate-500">
              提示：点按任一存档，即可重回该世的婴儿身躯承接属性与技能。
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
