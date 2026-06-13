/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GameStage = 'infant' | 'toddler' | 'junior_class';
export type Gender = 'boy' | 'girl';
export type Difficulty = 'easy' | 'normal' | 'hard' | 'hell' | 'impossible';
export type PlayerPeriod = 'liberty' | 'parents_arm' | 'others_arm' | 'sleep' | 'outdoor';

export interface Coords {
  x: number;
  y: number;
}

export interface SkillState {
  // Infant Stage Skills
  crawl?: boolean;     // 爬行
  speak?: boolean;     // 说话
  walk?: boolean;      // 走路
  memorize?: boolean;  // 记事
  littleRobot?: boolean; // 小大人机

  // Junior Class (小班) Knowledge
  knowNumbers?: boolean;     // 数数与计算 (数一到十)
  knowColors?: boolean;      // 颜色认知 (辨识三原色)
  knowPoliteness?: boolean;  // 社交礼仪 (礼貌问候语)
  knowDraw?: boolean;        // 绘画艺术 (简笔画太阳)
  knowSing?: boolean;        // 儿歌声乐 (儿歌两只老虎)
  knowShare?: boolean;       // 玩具分享 (分享玩具礼仪)
  knowWashHands?: boolean;   // 卫生规范 (七步洗手法)
  knowAlphabet?: boolean;    // 拼音字词 (拼音读写ABC)
}

export type SkillKey = keyof SkillState;

export interface GameTask {
  id: string;
  title: string;
  description: string;
  type: 'move' | 'interact' | 'skill_unlock' | 'stat_increase' | 'period_completion' | 'talent_increase';
  target: string; // Coordinate e.g. "x,y", or skill key, or interaction target, or stat name
  completed: boolean;
  rewardText: string;
  rewardFn?: (state: GameSaveData) => void;
}

export interface Building {
  id: string;
  name: string;
  x: number;
  y: number;
  description: string;
  interactionName: string;
  interactResult: string;
}

export interface StoryChoice {
  text: string;
  nextPlotId: string | null; // null means end plot
  effects?: {
    hunger?: number;
    thirst?: number;
    intellect?: number;
    physical?: number;
    talent?: number;
    health?: number;
    skills?: SkillKey[];
    completedTasks?: string[];
  };
}

export interface StoryDialogue {
  speaker: string;
  text: string;
}

export interface Plot {
  id: string;
  title: string;
  triggerCondition: string; // e.g. "start", "move_5", "interact_moms_arms", "stat_intellect_10"
  dialogues: StoryDialogue[];
  choices?: StoryChoice[];
  unlockedSkill?: SkillKey;
}

export interface GameSaveData {
  id: string;
  saveName: string;
  timestamp: string;
  stage: GameStage;
  gender: Gender;
  difficulty: Difficulty;
  hunger: number;
  thirst: number;
  health: number; // 生命值
  intellect: number; // 智力
  physical: number; // 体力/体能
  talent: number; // 天赋属性值
  currentPeriod: PlayerPeriod; // 不同的状态/时期
  periodCountdown: number; // 距离下一个时期的倒计时
  coords: Coords;
  skills: SkillState;
  tasks: GameTask[];
  completedPlots: string[]; // completed plot IDs
  pendingPlotQueue: string[]; // plot IDs waiting to be played (triggers red dot)
  activePlotId: string | null; // plot currently playing
  activePlotStep: number; // dialogue index inside activePlot
  totalMoves: number;
  hasSeenIntro: boolean;
  timeElapsed: number;

  // Junior Class attributes
  knowledge: number; // 知识数值 (0-100)
  schoolDays: number; // 上学天数
  kindergartenState: 'home' | 'kindergarten' | 'outdoor'; // 在家、在幼儿园、出门
  homeActionsDone: number; // For anti-cheese: tracking actions completed in home state
  schoolActionsDone: number; // For anti-cheese: tracking actions completed in school state
  outdoorActionsDone: number; // For anti-cheese: tracking actions completed in outdoor state
}
