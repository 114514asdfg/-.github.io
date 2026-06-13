/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { MainGame } from './components/MainGame';
import { GameSaveData, GameStage, Gender, Difficulty } from './types';
import { INITIAL_TASKS, JUNIOR_TASKS } from './data/story';
import { getPeriodDuration } from './utils/gameUtils';

export default function App() {
  const [currentGame, setCurrentGame] = useState<GameSaveData | null>(null);

  const handleStartGame = (stage: GameStage, gender: Gender, difficulty: Difficulty) => {
    const isJunior = stage === 'junior_class';
    // Generate fresh new game state structure
    const newSave: GameSaveData = {
      id: Math.random().toString(36).substring(2, 11),
      saveName: isJunior 
        ? `小班求学-[${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}]` 
        : `轮回新生-[${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}]`,
      timestamp: new Date().toISOString(),
      stage,
      gender,
      difficulty,
      hunger: 100,
      thirst: 100,
      health: 100,
      intellect: isJunior ? 10 : 1,
      physical: isJunior ? 10 : 1,
      talent: 0,
      currentPeriod: 'liberty',
      periodCountdown: getPeriodDuration(difficulty),
      coords: { x: 0, y: 0 },
      skills: isJunior ? {
        knowNumbers: false,
        knowColors: false,
        knowPoliteness: false,
        knowDraw: false,
        knowSing: false,
        knowShare: false,
        knowWashHands: false,
        knowAlphabet: false,
      } : {
        crawl: false,
        speak: false,
        walk: false,
        memorize: false,
        littleRobot: false,
      },
      // Deep clone initial tasks to prevent object mutation reference errors
      tasks: (isJunior ? JUNIOR_TASKS : INITIAL_TASKS).map(t => ({ ...t })),
      completedPlots: [],
      pendingPlotQueue: [],
      activePlotId: null,
      activePlotStep: 0,
      totalMoves: 0,
      hasSeenIntro: false,
      timeElapsed: 0,
      
      // Junior Class attributes
      knowledge: 0,
      schoolDays: 0,
      kindergartenState: 'home',
      homeActionsDone: 0,
      schoolActionsDone: 0,
      outdoorActionsDone: 0,
    };

    setCurrentGame(newSave);
  };

  const handleLoadSave = (save: GameSaveData) => {
    setCurrentGame(save);
  };

  const handleExitToMenu = () => {
    setCurrentGame(null);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-950 font-sans">
      {currentGame ? (
        <MainGame
          key={currentGame.id} // forces recreation on different slots
          initialState={currentGame}
          onExit={handleExitToMenu}
        />
      ) : (
        <StartScreen
          onStartGame={handleStartGame}
          onLoadSave={handleLoadSave}
        />
      )}
    </div>
  );
}
