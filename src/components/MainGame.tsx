/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameSaveData, Coords, SkillState, GameTask, Difficulty, Building, Plot, StoryChoice, PlayerPeriod } from '../types';
import { BUILDINGS, INITIAL_TASKS, PLOTS } from '../data/story';
import { getPeriodDuration } from '../utils/gameUtils';
import { StoryOverlay } from './StoryOverlay';
import {
  Compass,
  Flame,
  Droplets,
  Award,
  Zap,
  MapPin,
  Sparkles,
  BookOpen,
  ArrowBigUp,
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight,
  Save,
  LogOut,
  Dribbble,
  BrainCircuit,
  MessageSquare,
  HelpCircle,
  Eye,
  CheckCircle,
  Clock,
  Home,
  User,
  Smile,
  Moon,
  Sun,
  Map,
  Navigation,
  ExternalLink,
  ChevronRight,
  Heart,
  CalendarDays,
  Lock,
  Smartphone,
  Search
} from 'lucide-react';

interface MainGameProps {
  initialState: GameSaveData;
  onExit: () => void;
}

export const MainGame: React.FC<MainGameProps> = ({ initialState, onExit }) => {
  const [gameState, setGameState] = useState<GameSaveData>(initialState);
  const [activeBuildingList, setActiveBuildingList] = useState(false);
  const [currentInteractionResult, setCurrentInteractionResult] = useState<string | null>(null);
  const [movementAnimation, setMovementAnimation] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [faintAlert, setFaintAlert] = useState(false);
  
  // Show "Ask Whereabouts" (询问爸妈) modal state
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [stageVictory, setStageVictory] = useState(false);

  // Junior commute mini-game states
  const [isCommuting, setIsCommuting] = useState<boolean>(false);
  const [commuteCountdown, setCommuteCountdown] = useState<number>(0);

  // Secret Phone finding and simulator states
  const [isPhoneEventOpen, setIsPhoneEventOpen] = useState<boolean>(false);
  const [phoneStep, setPhoneStep] = useState<number>(0);
  const [activePhoneApp, setActivePhoneApp] = useState<string | null>(null);
  const [phoneLog, setPhoneLog] = useState<string>('欢迎使用全新手机交互界面，点击软件开启探索。');
  const [phoneEventToast, setPhoneEventToast] = useState<string | null>(null);
  const [appStates, setAppStates] = useState({
    wechatChat: 'group',
    wechatStoryGained: false,
    eggyScore: 0,
    eggyWins: 0,
    douyinVideoIdx: 0,
    douyinLikes: 0,
    devLines: ['guest@baby-kernel:~$ _'],
    devHackInstalled: false,
    albumIdx: 0,
    albumSecretDecoded: false
  });

  // Dynamic automated tasks evaluator depending on properties updates
  useEffect(() => {
    let tasksChanged = false;
    const updatedTasks = gameState.tasks.map((t) => {
      if (t.completed) return t;

      let compl = false;
      // Infant Tasks
      if (t.id === 'task_crawl' && gameState.skills.crawl) compl = true;
      if (t.id === 'task_speak' && gameState.intellect >= 8) compl = true;
      if (t.id === 'task_memorize' && gameState.skills.memorize) compl = true;
      if (t.id === 'task_walk' && gameState.physical >= 15 && gameState.intellect >= 12) compl = true;
      if (t.id === 'task_robot' && gameState.skills.speak && gameState.skills.memorize && gameState.skills.walk) compl = true;
      if (t.id === 'task_play_toy' && gameState.talent >= 5) compl = true;
      if (t.id === 'task_watch_tv' && gameState.intellect >= 15) compl = true;
      if (t.id === 'task_explore_balcony' && gameState.coords.x === 3 && gameState.coords.y === 3) compl = true;
      if (t.id === 'task_talent_15' && gameState.talent >= 15) compl = true;
      if (t.id === 'task_outdoor_music' && gameState.coords.x === 10 && gameState.coords.y === 10) compl = true;
      if (t.id === 'task_outdoor_pets' && gameState.coords.x === 12 && gameState.coords.y === 14) compl = true;
      if (t.id === 'task_outdoor_candy' && gameState.coords.x === 11 && gameState.coords.y === 12) compl = true;
      if (t.id === 'task_outdoor_nursery' && gameState.coords.x === 15 && gameState.coords.y === 15) compl = true;
      if (t.id === 'task_healthy_infant') {
        if (gameState.difficulty === 'easy' || (gameState.health >= 95 && gameState.physical >= 18)) {
          compl = true;
        }
      }
      if (t.id === 'task_talent_50' && gameState.talent >= 50) compl = true;

      // Junior Class Tasks
      if (t.id === 'junior_days_1' && (gameState.schoolDays || 0) >= 1) compl = true;
      if (t.id === 'junior_days_10' && (gameState.schoolDays || 0) >= 10) compl = true;
      if (t.id === 'junior_days_30' && (gameState.schoolDays || 0) >= 30) compl = true;
      if (t.id === 'junior_days_50' && (gameState.schoolDays || 0) >= 50) compl = true;
      if (t.id === 'junior_know_basic' && gameState.skills.knowNumbers && gameState.skills.knowColors && gameState.skills.knowPoliteness) compl = true;
      if (t.id === 'junior_know_art' && gameState.skills.knowDraw && gameState.skills.knowSing) compl = true;
      if (t.id === 'junior_know_social' && gameState.skills.knowShare) compl = true;
      if (t.id === 'junior_know_health' && gameState.skills.knowWashHands) compl = true;
      if (t.id === 'junior_know_alpha' && gameState.skills.knowAlphabet) compl = true;
      if (t.id === 'junior_points_10' && (gameState.knowledge || 0) >= 10) compl = true;
      if (t.id === 'junior_points_30' && (gameState.knowledge || 0) >= 30) compl = true;
      if (t.id === 'junior_points_50' && (gameState.knowledge || 0) >= 50) compl = true;

      if (compl) {
        tasksChanged = true;
        return { ...t, completed: true };
      }
      return t;
    });

    if (tasksChanged) {
      setGameState(prev => ({
        ...prev,
        tasks: updatedTasks
      }));
    }
  }, [
    gameState.tasks,
    gameState.skills,
    gameState.intellect,
    gameState.physical,
    gameState.talent,
    gameState.health,
    gameState.coords,
    gameState.difficulty,
    gameState.schoolDays,
    gameState.knowledge
  ]);

  // Auto-trigger Stage Victory Breakthrough dialogue once all conditions are met
  useEffect(() => {
    if (gameState.stage === 'junior_class') {
      const allTasksDone = gameState.tasks.every(t => t.completed);
      const allSkillsUnlocked = !!(
        gameState.skills.knowAlphabet &&
        gameState.skills.knowNumbers &&
        gameState.skills.knowColors &&
        gameState.skills.knowPoliteness &&
        gameState.skills.knowDraw &&
        gameState.skills.knowSing &&
        gameState.skills.knowShare &&
        gameState.skills.knowWashHands
      );
      const knowledgeIsEnough = (gameState.knowledge || 0) >= 50;
      const schoolDaysIsEnough = (gameState.schoolDays || 0) >= 50;

      if (allTasksDone && allSkillsUnlocked && knowledgeIsEnough && schoolDaysIsEnough) {
        if (!gameState.completedPlots.includes('junior_victory') &&
            gameState.activePlotId !== 'junior_victory' &&
            !gameState.pendingPlotQueue.includes('junior_victory')) {
          
          setGameState(prev => ({
            ...prev,
            activePlotId: 'junior_victory',
            activePlotStep: 0,
          }));
          triggerToast('🎓 功德圆满！幼儿园小班学期全优结业条件已圆满达成，开启结业盛典！');
        }
      }
    } else {
      const allTasksDone = gameState.tasks.every(t => t.completed);
      const allSkillsUnlocked = !!(
        gameState.skills.crawl && 
        gameState.skills.speak && 
        gameState.skills.walk && 
        gameState.skills.memorize && 
        gameState.skills.littleRobot
      );
      const talentIsEnough = gameState.talent >= 50;

      if (allTasksDone && allSkillsUnlocked && talentIsEnough) {
        if (!gameState.completedPlots.includes('stage_infant_victory_trigger') &&
            gameState.activePlotId !== 'stage_infant_victory_trigger' &&
            !gameState.pendingPlotQueue.includes('stage_infant_victory_trigger')) {
          
          setGameState(prev => ({
            ...prev,
            activePlotId: 'stage_infant_victory_trigger',
            activePlotStep: 0,
          }));
          triggerToast('👑 震烁古今！降世神童婴儿期大圆满条件已全部解锁，开启破关宿命觉醒！');
        }
      }
    }
  }, [
    gameState.stage,
    gameState.tasks,
    gameState.skills,
    gameState.talent,
    gameState.knowledge,
    gameState.schoolDays,
    gameState.completedPlots,
    gameState.activePlotId,
    gameState.pendingPlotQueue
  ]);

  // Auto-trigger introductory plot if not seen
  useEffect(() => {
    if (!gameState.hasSeenIntro) {
      const startIntroPlot = gameState.stage === 'junior_class' ? 'junior_intro' : 'intro';
      setGameState((prev) => ({
        ...prev,
        hasSeenIntro: true,
        activePlotId: startIntroPlot,
        activePlotStep: 0,
      }));
    }
  }, [gameState.hasSeenIntro, gameState.stage]);

  // Periodic depletion of hunger and thirst based on difficulty
  useEffect(() => {
    if (gameState.difficulty === 'easy') return;

    let secondsToDeplete = 30; // default normal
    if (gameState.difficulty === 'hard') secondsToDeplete = 15;
    if (gameState.difficulty === 'hell') secondsToDeplete = 10;
    if (gameState.difficulty === 'impossible') secondsToDeplete = 5;

    const interval = setInterval(() => {
      // Only deplete if no active plot is running
      if (gameState.activePlotId) return;
      // Sleep period stalls biological depletion! Highly realistic.
      if (gameState.currentPeriod === 'sleep') return;

      setGameState((prev) => {
        if (prev.activePlotId) return prev;
        
        const nextHunger = Math.max(0, prev.hunger - 1);
        const nextThirst = Math.max(0, prev.thirst - 1);

        let healthPenalty = 0;
        if (nextHunger <= 0) healthPenalty += 8;
        if (nextThirst <= 0) healthPenalty += 8;

        const nextHealth = Math.max(0, prev.health - healthPenalty);

        if (healthPenalty > 0 && nextHealth > 0) {
          triggerToast(`⚠️ 警告：极饿/缺水！由于生命给养枯竭，生命值缩减了 -${healthPenalty}%！`);
        }

        return {
          ...prev,
          hunger: nextHunger,
          thirst: nextThirst,
          health: nextHealth,
        };
      });
    }, secondsToDeplete * 1000);

    return () => clearInterval(interval);
  }, [gameState.difficulty, gameState.activePlotId, gameState.currentPeriod]);

  // Real-time Gameplay Tick Timer (Runs every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      if (gameState.activePlotId) return;

      // Handle commute ticking when active
      if (isCommuting) {
        setCommuteCountdown((curr) => {
          if (curr <= 1) {
            triggerToast('🚨 通勤时间耗尽！你迟到了！快使用定位轨道或方向摇杆前往 (5,5) 教室签到上学！');
            return 0;
          }
          return curr - 1;
        });
      }

      setGameState((prev) => {
        const nextTime = prev.timeElapsed + 1;
        // Pause background phase countdown during active commutes to prevent interruption
        const nextCountdown = isCommuting ? prev.periodCountdown : prev.periodCountdown - 1;

        if (nextCountdown <= 0) {
          const isJunior = prev.stage === 'junior_class';
          if (isJunior) {
            let nextState: 'home' | 'school' | 'outdoor' = 'home';
            let transitionText = '';
            let nextSchoolDays = prev.schoolDays || 0;
            let addedKnowledge = 0;
            let nextCoords = { ...prev.coords };

            if (prev.kindergartenState === 'home') {
              // Don't auto shift, prompt them to click go to school and start their commute walk!
              triggerToast('⏰ 晨光熹微！太阳高照啦，又是崭新的求学朝阳！请赶快点击右侧【🎒 走！去上学】按钮开始通勤走路吧！');
              return {
                ...prev,
                periodCountdown: getPeriodDuration(prev.difficulty),
                timeElapsed: nextTime,
              };
            } else if (prev.kindergartenState === 'school') {
              nextState = 'outdoor';
              transitionText = '🪁 快乐的室内课结束了！陈老师带上小黄帽，带领全班去户外公园探索游戏！';
              nextCoords = { x: 0, y: 5 }; // Move to outdoor park coordinates
            } else {
              nextState = 'home';
              nextSchoolDays += 1;
              addedKnowledge = 2; // Return home yields base study review
              transitionText = '🏡 傍晚放学啦！一天的幼儿园求学大冒险圆满结束，你回到了温暖的家。【上学天数 +1 天，综合知识提升！】';
              nextCoords = { x: 0, y: 0 }; // Return home coordinates
            }

            triggerToast(transitionText);

            return {
              ...prev,
              kindergartenState: nextState,
              schoolDays: nextSchoolDays,
              knowledge: Math.min(100, prev.knowledge + addedKnowledge),
              periodCountdown: getPeriodDuration(prev.difficulty),
              timeElapsed: nextTime,
              coords: nextCoords,
            };
          } else {
            // Time is up! Rotate to the next life period in circle
            // liberty -> parents_arm -> others_arm -> sleep -> outdoor
            let nextP: PlayerPeriod = 'liberty';
            let transitionText = '';
            
            if (prev.currentPeriod === 'liberty') {
              nextP = 'parents_arm';
              transitionText = '🍼 岁月更替：进入 [父母怀抱期]！爸妈随时准备拥抱照顾你，在此期间哺乳互动效率翻倍！';
            } else if (prev.currentPeriod === 'parents_arm') {
              nextP = 'others_arm';
              transitionText = '👵 岁月更替：进入 [他人怀抱期]！邻居、爷爷奶奶正拉着你逗乐，智商和天赋成长效率大幅度提升！';
            } else if (prev.currentPeriod === 'others_arm') {
              nextP = 'sleep';
              transitionText = '🌙 岁月更替：进入 [睡觉期]！深夜寂静，饥饿消耗暂时冻结。快躺进婴儿床深度冥想吧！';
            } else if (prev.currentPeriod === 'sleep') {
              nextP = 'outdoor';
              transitionText = '🌳 岁月更替：进入 [外出探索期]！清晨风和日丽，大人们推出拉篮推车，你可以去屋外更远区域观察或出行！';
            } else {
              nextP = 'liberty';
              transitionText = '🏡 岁月更替：进入 [自由探索期]！你可以自由在地板上爬动、思考或者翻找箱子。';
            }

            // If the player transitions to 'outdoor' and walks, coordinates teleport to (10, 10).
            // Otherwise, if returning to indoor, we reset if coordinates are invalid out-of-bounds.
            let nextCoords = { ...prev.coords };
            if (nextP !== 'outdoor' && (prev.coords.x >= 10 || prev.coords.y >= 10)) {
              // Returned back home in parents' hands
              nextCoords = { x: 0, y: 0 };
              transitionText += '（从户外返回房间：坐标重置为婴儿床 0,0）';
            }

            triggerToast(transitionText);

            return {
              ...prev,
              currentPeriod: nextP,
              periodCountdown: getPeriodDuration(prev.difficulty), // reset countdown based on difficulty duration
              coords: nextCoords,
              timeElapsed: nextTime,
            };
          }
        }

        return {
          ...prev,
          timeElapsed: nextTime,
          periodCountdown: nextCountdown,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.activePlotId, gameState.currentPeriod, gameState.stage]);

  // Quick message trigger
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Check and trigger event plots dynamically on main variables update
  const checkAndQueuePlots = (state: GameSaveData, movesDone: number, currentIntellect: number, currentPhysical: number) => {
    const newQueue = [...state.pendingPlotQueue];
    const completed = [...state.completedPlots];

    if (state.stage === 'junior_class') {
      // Preschool (junior class) specific inner dialogues queued based on progress
      if ((state.schoolDays || 0) >= 3 && !completed.includes('junior_plot_1') && !newQueue.includes('junior_plot_1')) {
        newQueue.push('junior_plot_1');
        triggerToast('🎒 岁月的智慧！关于幼儿园生活的新感悟悄然浮现！');
      }
      if ((state.knowledge || 0) >= 15 && !completed.includes('junior_plot_2') && !newQueue.includes('junior_plot_2')) {
        newQueue.push('junior_plot_2');
        triggerToast('🎒 利益与交换！你对零食交换和人机社会产生了全新的哲学感悟！');
      }
      if ((state.schoolDays || 0) >= 10 && !completed.includes('junior_plot_3') && !newQueue.includes('junior_plot_3')) {
        newQueue.push('junior_plot_3');
        triggerToast('🎒 多线程冥想！你对集体午休和清醒脑波有了前瞻性心声！');
      }
      if ((state.knowledge || 0) >= 30 && !completed.includes('junior_plot_4') && !newQueue.includes('junior_plot_4')) {
        newQueue.push('junior_plot_4');
        triggerToast('🎒 几何画法！你对黑板粉笔作画有了极致和谐的理解！');
      }
      if ((state.schoolDays || 0) >= 25 && !completed.includes('junior_plot_5') && !newQueue.includes('junior_plot_5')) {
        newQueue.push('junior_plot_5');
        triggerToast('🎒 卫生流体力学！你对正确冲洗七步洗手有了全套微操理念！');
      }
    } else {
      // Infant state inner dialogues
      if (movesDone >= 3 && !completed.includes('move_3') && !newQueue.includes('move_3')) {
        newQueue.push('move_3');
        triggerToast('🔴 灵魂苏醒！感知到一丝宿命剧情感悟！');
      }

      if (currentIntellect >= 8 && !completed.includes('intellect_8') && !newQueue.includes('intellect_8')) {
        newQueue.push('intellect_8');
        triggerToast('🔴 咿呀作声！心智蜕变剧情已可解锁！');
      }

      if (currentPhysical >= 15 && currentIntellect >= 12 && !completed.includes('walk_trigger') && !newQueue.includes('walk_trigger')) {
        newQueue.push('walk_trigger');
        triggerToast('🔴 站立双膝在震颤！“自主走路”核心剧情已就绪！');
      }
    }

    return {
      pendingPlotQueue: newQueue,
    };
  };

  // Find building by coordinates
  const getBuildingAt = (x: number, y: number): Building | undefined => {
    if (gameState.stage === 'junior_class') {
      const juniorBuildings: Building[] = [
        {
          id: 'junior_home',
          name: '🏡 温馨小家园 (起点)',
          x: 0,
          y: 0,
          description: '温暖安全的家，也是每次上学通勤的出发点大本营。',
          interactionName: '家庭课后省思',
          interactResult: '你在家里的地垫上回想了陈老师教的一字一句。智力 +1，知识 +1。'
        },
        {
          id: 'junior_school',
          name: '🏫 社区启智幼儿园 (学校)',
          x: 5,
          y: 5,
          description: '陈老师上课解惑拼音算数、歌舞画画的核心求学学堂。上学通勤的目标终点。',
          interactionName: '端正端坐听讲',
          interactResult: '你在黑板前坐得笔直，吸收了大量拼音和算学常识。智力 +3, 知识 +3。'
        },
        {
          id: 'junior_park',
          name: '🪁 绿意沙坑公园 (课外课)',
          x: 0,
          y: 5,
          description: '宽阔的草坪沙坑和秋千滑梯，陈老师常带同班同学们来这里游戏抓蝴蝶。',
          interactionName: '奔跑合唱玩耍',
          interactResult: '你在阳光下拉着同伴唱起了《两只老虎》。体能 +4，艺术天赋提升！'
        },
        {
          id: 'junior_library',
          name: '📚 萌芽博士绘本馆',
          x: 5,
          y: 0,
          description: '摆满满架少儿拼音大绘本和各种趣味科普插页卡片，学海无涯。',
          interactionName: '研读高深拼音卡',
          interactResult: '你全神贯注读完了精装恐龙大彩绘，知识大暴涨！学科知识点 +4，智力 +3。'
        }
      ];
      return juniorBuildings.find((b) => b.x === x && b.y === y);
    }
    return BUILDINGS.find((b) => b.x === x && b.y === y);
  };
  
  // Junior Commute Core Mechanics
  const handleStartCommute = () => {
    if (gameState.activePlotId) return;
    
    // Warp player back home (0,0) to start commuting
    setGameState((prev) => ({
      ...prev,
      coords: { x: 0, y: 0 }
    }));
    
    setIsCommuting(true);
    setCommuteCountdown(20); // 20 seconds time limit
    
    const commuteText = '🎒 【开始上学通勤】滴滴！大黄校车已在前方等候，生命坐标已降临温馨小家 (0,0)！请在 20秒 内通过定位标志或坐标摇杆，安全前行到学校教室 (5,5) 完成入班听课！倒计时走完将被判定为迟到罚站哦！';
    triggerToast(commuteText);
    setCurrentInteractionResult(commuteText);
  };

  const checkCommuteArrival = (x: number, y: number, currentCountdown: number) => {
    if (gameState.stage === 'junior_class' && isCommuting && x === 5 && y === 5) {
      setIsCommuting(false);
      if (currentCountdown > 0) {
        triggerToast('🎉 按时签到！你完美于上课铃响前，穿梭街道抵达了 (5,5) 社区幼儿园。陈老师高声表扬并奖励：上学天数 +1 天，知识 +12, 智力 +6, 天赋 +2！');
        setGameState((cur) => ({
          ...cur,
          kindergartenState: 'school',
          schoolDays: (cur.schoolDays || 0) + 1,
          knowledge: Math.min(100, cur.knowledge + 12),
          intellect: cur.intellect + 6,
          talent: cur.talent + 2,
          periodCountdown: getPeriodDuration(cur.difficulty),
        }));
        setCurrentInteractionResult('你迈着整齐快乐的童步踩点步入 (5,5) 教室大门。陈老师亲手在你额头上贴了一朵大红花，全班羡慕！');
      } else {
        triggerToast('⚠️ 迟到通报！陈老师叹了口气，指明路上嬉戏是不好习惯。罚站扣除体力，综合知识和智商加成减少：上学天数 +1 天，知识 +5, 智力 +2。');
        setGameState((cur) => ({
          ...cur,
          kindergartenState: 'school',
          schoolDays: (cur.schoolDays || 0) + 1,
          knowledge: Math.min(100, cur.knowledge + 5),
          intellect: cur.intellect + 2,
          physical: Math.max(0, cur.physical - 10),
          periodCountdown: getPeriodDuration(cur.difficulty),
        }));
        setCurrentInteractionResult('你在倒计时走完后气喘吁吁地推开 (5,5) 教室门，陈老师严厉命令你站着读拼音卡片：健康或体能受损。');
      }
    }
  };

  const currentBuilding = getBuildingAt(gameState.coords.x, gameState.coords.y);

  // Active Outdoor Exploration trigger Button click
  const handleActiveOutdoorSearch = () => {
    if (!gameState.skills.walk) {
      triggerToast('⚠️ 紧锁的大门！你还没学会 [走路] 技能，无法主动走出门冒险（目前只能乖乖待在家里）！');
      return;
    }

    // Force teleport to Outdoor central community park
    setGameState((prev) => {
      const updated = {
        ...prev,
        currentPeriod: 'outdoor' as PlayerPeriod,
        periodCountdown: 60, // Grant extended exploration time
        coords: { x: 10, y: 10 },
      };
      
      triggerToast('🚀 学会直立行走的你，趁爸妈不注意，自己大摇大摆地主动开门出去玩耍了！');
      return updated;
    });
    
    setCurrentInteractionResult('你成功跨越防波堤大门，走入了阳光倾洒的繁华社区！周围大人们向你投来惊愕的眼光！');
  };

  // Generate Parents advice contextual texts depending on period
  const getParentsWhereaboutsText = () => {
    switch (gameState.currentPeriod) {
      case 'liberty':
        return {
          title: '自由探索期 🏡 爸妈动态',
          text: '爸爸正依靠在客厅书架 (5,5) 焦急地研究程序员复杂的量子代码；妈妈正在 (0,2) 温和地用榨汁器调辅食。你有绝对空间可以尽情自主练习爬行爬向拼图垫 (1,1) 哦！',
          hint: '建议前往 (1,1) 进行爬行锻炼，从而迅速解锁“爬行”技能！'
        };
      case 'parents_arm':
        return {
          title: '父母怀抱期 🍼 爸妈动态',
          text: '爸爸来到了门槛 (2,4) 随时防范你摔倒，妈妈伸开带有栀子花芬芳的怀抱在 (0,2) 满眼柔爱盯着你。快去找妈妈进行“要奶喝”互动吧，能瞬间填满饥饿度和大幅提升天赋！',
          hint: '建议朝 (0,2) 直奔而去，这是补充体能的绝好时机。'
        };
      case 'others_arm':
        return {
          title: '他人怀抱期 👴 爸妈动态',
          text: '隔壁热情的温阿姨和爷爷奶奶来家里送奶粉和玩具狗，他们激动地在一旁把你抱在怀里亲小胖脸。爸爸妈妈为了招待客人，暂时去客厅茶几后面倒水聊天了。',
          hint: '此时脑细胞学习速度激增！建议借着这股氛围爬去积木箱 (2,0) 或大阳台 (3,3) 感悟天赋！'
        };
      case 'sleep':
        return {
          title: '睡觉冥想期 🌙 爸妈动态',
          text: '深夜里卧室极为安静。爸爸妈妈已经疲惫地进入沉睡梦乡。周围的一切都没有嘈杂声音，此时生命流失速率暂时冻结，你可以悄悄回到豪华宝宝床 (0,0) 进行深度生命小憩。',
          hint: '前往 (0,0) 进行安睡互动，不仅能白嫖恢复体能，还能完全规避饥饿度降低！'
        };
      case 'outdoor':
        return {
          title: '外出探索期 🌳 户外爸妈动态',
          text: '妈妈用遮阳伞遮挡烈日，并在杂货店小卖部 (11,12) 搜罗婴儿面条；爸爸正推着小推车伴在公园 (10,10) 旁守护你。此时已解锁户外探险地图 (X:10-15, Y:10-15)，如果你会走路，可进行大范围探路！',
          hint: '学会走路不仅能在这里发挥奇效，还能随时随地点击右下角【主动出门】来到这里！'
        };
    }
  };

  // Coordinate movement control with dynamic bounds limitation
  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameState.activePlotId) return;

    setMovementAnimation(direction);
    setTimeout(() => setMovementAnimation(null), 250);

    let nextX = gameState.coords.x;
    let nextY = gameState.coords.y;

    const isCurrentlyOutdoor = gameState.coords.x >= 10 || gameState.coords.y >= 10 || gameState.currentPeriod === 'outdoor';
    if (isCurrentlyOutdoor) {
      if (direction === 'up') nextY = Math.max(10, nextY - 1);
      if (direction === 'down') nextY = Math.min(15, nextY + 1);
      if (direction === 'left') nextX = Math.max(10, nextX - 1);
      if (direction === 'right') nextX = Math.min(15, nextX + 1);
    } else {
      if (direction === 'up') nextY = Math.max(0, nextY - 1);
      if (direction === 'down') nextY = Math.min(5, nextY + 1);
      if (direction === 'left') nextX = Math.max(0, nextX - 1);
      if (direction === 'right') nextX = Math.min(5, nextX + 1);
    }

    setGameState((prev) => {
      let { x, y } = prev.coords;
      
      // Determine bounds check according to being indoor or outdoor
      // Outdoor implies coordinate area index >= 10
      const currentLocOutdoor = prev.coords.x >= 10 || prev.coords.y >= 10 || prev.currentPeriod === 'outdoor';

      if (currentLocOutdoor) {
        // Range 10 to 15 for outdoor map
        if (direction === 'up') y = Math.max(10, y - 1);
        if (direction === 'down') y = Math.min(15, y + 1);
        if (direction === 'left') x = Math.max(10, x - 1);
        if (direction === 'right') x = Math.min(15, x + 1);
      } else {
        // Range 0 to 5 for indoor map
        if (direction === 'up') y = Math.max(0, y - 1);
        if (direction === 'down') y = Math.min(5, y + 1);
        if (direction === 'left') x = Math.max(0, x - 1);
        if (direction === 'right') x = Math.min(5, x + 1);
      }

      const hasMoved = x !== prev.coords.x || y !== prev.coords.y;
      if (!hasMoved) {
        if (currentLocOutdoor) {
          triggerToast('💥 砰！你走到了草丛围网或小区墙壁边缘。');
        } else {
          triggerToast('💥 砰！你碰到了客厅坚硬的围栏或墙壁。');
        }
        return prev;
      }

      const totalMoves = prev.totalMoves + 1;
      let newTasks = [...prev.tasks];

      // Update tasks completed status
      newTasks = newTasks.map((t) => {
        if (t.type === 'interact' && t.id === 'task_crawl' && x === 1 && y === 1 && prev.skills.crawl) {
          return { ...t, completed: true };
        }
        return t;
      });

      const partialState = {
        ...prev,
        coords: { x, y },
        totalMoves,
        tasks: newTasks,
      };

      const plotUpdates = checkAndQueuePlots(partialState, totalMoves, prev.intellect, prev.physical);

      return {
        ...partialState,
        ...plotUpdates,
      };
    });

    setCurrentInteractionResult(null);

    // Call arrival checker inside next tick
    setTimeout(() => {
      checkCommuteArrival(nextX, nextY, commuteCountdown);
    }, 55);
  };

  // Perform Location interaction 
  const handleInteract = () => {
    if (!currentBuilding || gameState.activePlotId) return;

    let resultMsg = currentBuilding.interactResult;
    setCurrentInteractionResult(resultMsg);

    setGameState((prev) => {
      let intellectGained = 0;
      let physicalGained = 0;
      let talentGained = 0;
      let hungerChange = 0;
      let thirstChange = 0;

      // Determine numeric boosts and task triggers according to coordinate nodes
      if (currentBuilding.id === 'crib') {
        physicalGained = 15; // Enhanced so the player has lots of energy
        hungerChange = -3;
        thirstChange = -3;
      } else if (currentBuilding.id === 'moms_arms') {
        hungerChange = prev.difficulty === 'easy' ? 0 : 50;
        thirstChange = prev.difficulty === 'easy' ? 0 : 50;
        physicalGained = 5;
        talentGained = 1; 
      } else if (currentBuilding.id === 'living_mat') {
        physicalGained = 4;
        hungerChange = -6;
        thirstChange = -6;
      } else if (currentBuilding.id === 'toy_box') {
        intellectGained = 3;
        talentGained = 2; // custom talent boost when playing toys
        hungerChange = -4;
        thirstChange = -4;
      } else if (currentBuilding.id === 'sunny_balcony') {
        intellectGained = 4;
        talentGained = 3;
        hungerChange = -4;
        thirstChange = -4;
      } else if (currentBuilding.id === 'tv_area') {
        intellectGained = 3;
        hungerChange = -4;
        thirstChange = -5;
      } else if (currentBuilding.id === 'bookshelf') {
        intellectGained = 6;
        physicalGained = -1;
        talentGained = 3;
        hungerChange = -9;
        thirstChange = -9;
      } else if (currentBuilding.id === 'bathroom') {
        physicalGained = 3;
        hungerChange = -3;
        thirstChange = -3;
      } 
      // OUTDOOR INTERACTIONS
      else if (currentBuilding.id === 'community_park') {
        intellectGained = 5;
        talentGained = 4;
        physicalGained = 2;
        hungerChange = -6;
        thirstChange = -6;
      } else if (currentBuilding.id === 'candy_store') {
        hungerChange = prev.difficulty === 'easy' ? 0 : 35;
        thirstChange = prev.difficulty === 'easy' ? 0 : 35;
        intellectGained = 3;
      } else if (currentBuilding.id === 'carousel_playground') {
        physicalGained = 6;
        talentGained = 3;
        hungerChange = -8;
        thirstChange = -8;
      } else if (currentBuilding.id === 'stray_pets_shelter') {
        physicalGained = 5;
        intellectGained = 4;
        talentGained = 3;
        hungerChange = -5;
        thirstChange = -5;
      } else if (currentBuilding.id === 'nursery_school') {
        intellectGained = 10;
        talentGained = 6;
        physicalGained = -3;
        hungerChange = -10;
        thirstChange = -10;
      }

      // Add state-specific boosts! Highly interactive.
      if (prev.currentPeriod === 'parents_arm') {
        physicalGained = physicalGained > 0 ? physicalGained + 2 : physicalGained;
      } else if (prev.currentPeriod === 'others_arm') {
        intellectGained = intellectGained > 0 ? intellectGained + 2 : intellectGained;
        talentGained += 1;
      }

      const nextIntellect = prev.intellect + intellectGained;
      const nextPhysical = Math.max(0, prev.physical + physicalGained);
      const nextTalent = Math.min(100, prev.talent + talentGained);

      // Handle raw hunger/thirst update bounds
      const rawHunger = prev.difficulty === 'easy' ? 100 : Math.min(100, Math.max(1, prev.hunger + hungerChange));
      const rawThirst = prev.difficulty === 'easy' ? 100 : Math.min(100, Math.max(1, prev.thirst + thirstChange));

      // Clone skills and tasks
      const updatedSkills = { ...prev.skills };
      let updatedTasks = [...prev.tasks];

      // Skill validation logic
      // 1. Crawl skill
      if (currentBuilding.id === 'living_mat' && !updatedSkills.crawl) {
        updatedSkills.crawl = true;
        triggerToast('🎉 彻底领悟核心技能：四肢爬行！爬行速度大幅度提升。');
        updatedTasks = updatedTasks.map((t) =>
          t.id === 'task_crawl' ? { ...t, completed: true } : t
        );
      }

      // 2. Memorize skill via bookshelf
      if (currentBuilding.id === 'bookshelf' && !updatedSkills.memorize) {
        updatedSkills.memorize = true;
        triggerToast('📖 彻底领悟核心技能：记事！现在可以进行更久记忆。');
        updatedTasks = updatedTasks.map((t) =>
          t.id === 'task_memorize' ? { ...t, completed: true } : t
        );
      }

      // Check tasks progress
      updatedTasks = updatedTasks.map((t) => {
        if (t.id === 'task_speak' && nextIntellect >= 8) {
          return { ...t, completed: true };
        }
        if (t.id === 'task_walk' && nextPhysical >= 15 && nextIntellect >= 12) {
          return { ...t, completed: true };
        }
        if (t.id === 'task_play_toy' && nextTalent >= 5) {
          return { ...t, completed: true };
        }
        if (t.id === 'task_watch_tv' && nextIntellect >= 15) {
          return { ...t, completed: true };
        }
        if (t.id === 'task_talent_15' && nextTalent >= 15) {
          return { ...t, completed: true };
        }
        if (t.id === 'task_explore_balcony' && currentBuilding.id === 'sunny_balcony') {
          return { ...t, completed: true };
        }
        if (t.id === 'task_outdoor_music' && currentBuilding.id === 'community_park') {
          return { ...t, completed: true };
        }
        if (t.id === 'task_outdoor_pets' && currentBuilding.id === 'stray_pets_shelter') {
          return { ...t, completed: true };
        }
        if (t.id === 'task_outdoor_candy' && currentBuilding.id === 'candy_store') {
          return { ...t, completed: true };
        }
        if (t.id === 'task_outdoor_nursery' && currentBuilding.id === 'nursery_school') {
          return { ...t, completed: true };
        }
        return t;
      });

      // Special check for little robot skill
      if (
        updatedSkills.speak &&
        updatedSkills.memorize &&
        updatedSkills.walk &&
        !updatedSkills.littleRobot
      ) {
        updatedSkills.littleRobot = true;
        triggerToast('🤖 神童觉醒！你彻底领悟了究极技能【小大人机】称号！');
        updatedTasks = updatedTasks.map((t) =>
          t.id === 'task_robot' ? { ...t, completed: true } : t
        );
      }

      // Story transition triggered via specific interactions
      let activePlotId = prev.activePlotId;
      let activePlotStep = prev.activePlotStep;

      const interactionPlotId = `${currentBuilding.id}_trigger`;
      if (PLOTS[interactionPlotId] && !prev.completedPlots.includes(interactionPlotId)) {
        activePlotId = interactionPlotId;
        activePlotStep = 0;
      }

      const partialS = {
        ...prev,
        hunger: rawHunger,
        thirst: rawThirst,
        intellect: nextIntellect,
        physical: nextPhysical,
        talent: nextTalent,
        skills: updatedSkills,
        tasks: updatedTasks,
        activePlotId,
        activePlotStep,
      };

      const plotUpdates = checkAndQueuePlots(partialS, prev.totalMoves, nextIntellect, nextPhysical);

      return {
        ...partialS,
        ...plotUpdates,
      };
    });
  };

  // Launch story dialogue step
  const handleLaunchPlotFromQueue = () => {
    if (gameState.pendingPlotQueue.length === 0) {
      triggerToast('🍃 脑部风暴完毕，目前没有任何突发灵感。多行动吧！');
      return;
    }

    const nextPlotId = gameState.pendingPlotQueue[0];
    setGameState((prev) => ({
      ...prev,
      activePlotId: nextPlotId,
      activePlotStep: 0,
      pendingPlotQueue: prev.pendingPlotQueue.slice(1),
    }));
  };

  // Advance story dialog steps
  const handleNextDialogStep = () => {
    const activePlot = PLOTS[gameState.activePlotId || ''];
    if (!activePlot) return;

    if (gameState.activePlotStep < activePlot.dialogues.length - 1) {
      setGameState((prev) => ({
        ...prev,
        activePlotStep: prev.activePlotStep + 1,
      }));
    } else {
      setGameState((prev) => {
        const nextCompleted = [...prev.completedPlots, prev.activePlotId || ''];
        
        // Auto-unlock skills on plot completion
        const skillToUnlock = activePlot.unlockedSkill;
        const newSkills = { ...prev.skills };
        if (skillToUnlock) {
          newSkills[skillToUnlock] = true;
          triggerToast(`✨ 恭喜掌握系统硬核能力: [${
            skillToUnlock === 'speak' ? '说话' :
            skillToUnlock === 'walk' ? '走路' : skillToUnlock
          }]!`);
        }

        // Trigger victory screen if ending the victory trigger
        if (prev.activePlotId === 'stage_infant_victory_trigger' || prev.activePlotId === 'junior_victory') {
          setTimeout(() => {
            setStageVictory(true);
          }, 100);
        }

        return {
          ...prev,
          completedPlots: nextCompleted,
          activePlotId: null,
          activePlotStep: 0,
          skills: newSkills,
        };
      });
    }
  };

  // Junior Class active action handlers
  const handleJuniorAction = (actionId: string) => {
    if (gameState.activePlotId) return;

    // Translate from skill IDs if needed to support older actions
    let resolvedId = actionId;
    if (actionId === 'knowAlphabet') resolvedId = 'school_alphabet';
    else if (actionId === 'knowNumbers') resolvedId = 'home_recite';
    else if (actionId === 'knowWashHands') resolvedId = 'home_wash';
    else if (actionId === 'eatSelf') resolvedId = 'home_meal';
    else if (actionId === 'knowColors') resolvedId = 'home_colors';
    else if (actionId === 'knowPoliteness') resolvedId = 'school_etiquette';
    else if (actionId === 'knowShare') resolvedId = 'outdoor_share';
    else if (actionId === 'knowDraw') resolvedId = 'school_creative';
    else if (actionId === 'knowSing') resolvedId = 'school_creative';

    setGameState((prev) => {
      let intellectGained = 0;
      let physicalGained = 0;
      let knowledgeGained = 0;
      let hungerChange = -8; // Default cost
      let thirstChange = -8;
      let healthBonus = 0;
      let logMsg = '';

      const updatedSkills = { ...prev.skills };
      let homeActions = prev.homeActionsDone || 0;
      let schoolActions = prev.schoolActionsDone || 0;
      let outdoorActions = prev.outdoorActionsDone || 0;

      if (resolvedId === 'home_recite') {
        intellectGained = 4;
        knowledgeGained = 2;
        homeActions += 1;
        logMsg = '📖 你乖乖坐在小椅子上，一板一眼地背诵九九乘法表与数字 1 到 100！爸爸在一旁赞许点头！';
        if (!updatedSkills.knowNumbers) {
          updatedSkills.knowNumbers = true;
          logMsg += ' ✨ 恭喜！你掌握了【数数与计算】基础学前知识！';
        }
      } else if (resolvedId === 'home_colors') {
        intellectGained = 3;
        knowledgeGained = 3;
        homeActions += 1;
        logMsg = '🎨 你在温暖的地板上，翻开彩色画册给小老虎涂色，发现了冷暖色的奇特交融！';
        if (!updatedSkills.knowColors) {
          updatedSkills.knowColors = true;
          logMsg += ' ✨ 恭喜！你开启了【色彩认知】知识！';
        }
      } else if (resolvedId === 'home_wash') {
        healthBonus = 15;
        knowledgeGained = 2;
        homeActions += 1;
        logMsg = '🧼 你站在防滑小矮凳上，哼着七步洗手歌打出了一大堆香喷喷的香皂白白泡泡！';
        if (!updatedSkills.knowWashHands) {
          updatedSkills.knowWashHands = true;
          logMsg += ' ✨ 恭喜！你成功学会了【个人卫生】防病习惯规范！';
        }
      } else if (resolvedId === 'home_meal') {
        hungerChange = 45;
        thirstChange = 30;
        intellectGained = 2;
        logMsg = '🥧 呼呼～妈妈端来刚出炉的爱心土豆牛肉酱大肉饼！香气溢满全屋，你一口气全吃光啦！';
      }

      else if (resolvedId === 'school_etiquette') {
        intellectGained = 4;
        knowledgeGained = 2;
        schoolActions += 1;
        logMsg = '🤝 萌芽小礼堂中，当陈老师走进教室时。你端正高举小手喊“老师早上好！”，深受同桌爱戴。';
        if (!updatedSkills.knowPoliteness) {
          updatedSkills.knowPoliteness = true;
          logMsg += ' ✨ 恭喜！你解锁了【社交礼仪】五讲四美常识！';
        }
      } else if (resolvedId === 'school_alphabet') {
        intellectGained = 5;
        knowledgeGained = 3;
        schoolActions += 1;
        logMsg = '🔤 握着小小的彩色粉笔，你在黑板歪歪扭扭拼读出完整的 a o e i u v 字母表！全班惊讶鼓掌！';
        if (!updatedSkills.knowAlphabet) {
          updatedSkills.knowAlphabet = true;
          logMsg += ' ✨ 恭喜！你成功懂得了【拼音字母】自主识字核心知识！';
        }
      } else if (resolvedId === 'school_creative') {
        physicalGained = 3;
        knowledgeGained = 4;
        schoolActions += 1;
        logMsg = '🖍️ 卡通手工创想课上，你不仅跟着老师大合唱了《两只老虎》和《小星星》，还折纸画画出宇宙飞船！';
        let updatedCount = 0;
        if (!updatedSkills.knowDraw) {
          updatedSkills.knowDraw = true;
          updatedCount++;
        }
        if (!updatedSkills.knowSing) {
          updatedSkills.knowSing = true;
          updatedCount++;
        }
        if (updatedCount > 0) {
          logMsg += ' ✨ 成功学成领悟【画笔创想】与【儿歌声乐】知识！';
        }
      } else if (resolvedId === 'school_nap') {
        hungerChange = -5;
        thirstChange = -5;
        physicalGained = 25;
        logMsg = '💤 课间，你脱掉卡通运动鞋，爬进带有柠檬清凉芳香的午睡小木铺，美滋滋地深度休眠，体力大恢复！';
      }

      else if (resolvedId === 'outdoor_share') {
        physicalGained = 4;
        knowledgeGained = 3;
        outdoorActions += 1;
        logMsg = '🧸 户外趣味沙坑里，大家在争抢玩具。你主动分享了大卡车和积木，同伴高高兴兴和你玩。';
        if (!updatedSkills.knowShare) {
          updatedSkills.knowShare = true;
          logMsg += ' ✨ 恭喜！你领悟了【玩具分享】团结同学的必备大爱知识！';
        }
      } else if (resolvedId === 'outdoor_run') {
        physicalGained = 8;
        knowledgeGained = 2;
        outdoorActions += 1;
        logMsg = '🏃‍♂️ 你穿着能发出“叽叽”声的卡通叫叫鞋，在满是郁郁葱葱的小草坪上疯狂飞跑追捉大金毛，笑声连连！';
      } else if (resolvedId === 'outdoor_market') {
        intellectGained = 4;
        knowledgeGained = 3;
        outdoorActions += 1;
        logMsg = '🛒 妈妈带着你推车逛百货大商场，你在花花绿绿的水果标签与大价格牌之间，快乐观察和识字！';
      }

      const nextIntellect = prev.intellect + intellectGained;
      const nextPhysical = Math.max(0, prev.physical + physicalGained);
      const nextKnowledge = Math.min(100, prev.knowledge + knowledgeGained);
      const rawHunger = prev.difficulty === 'easy' ? 100 : Math.min(100, Math.max(1, prev.hunger + hungerChange));
      const rawThirst = prev.difficulty === 'easy' ? 100 : Math.min(100, Math.max(1, prev.thirst + thirstChange));
      const rawHealth = prev.difficulty === 'easy' ? 100 : Math.min(100, Math.max(0, prev.health + healthBonus));

      if (logMsg) {
        triggerToast('📈 行动成功！综合常识知识点增加了！');
        setCurrentInteractionResult(logMsg);
      }

      return {
        ...prev,
        intellect: nextIntellect,
        physical: nextPhysical,
        knowledge: nextKnowledge,
        hunger: rawHunger,
        thirst: rawThirst,
        health: rawHealth,
        skills: updatedSkills,
        homeActionsDone: homeActions,
        schoolActionsDone: schoolActions,
        outdoorActionsDone: outdoorActions,
        totalMoves: prev.totalMoves + 1,
      };
    });
  };

  const handleJuniorStateShift = (targetState: 'home' | 'school' | 'outdoor') => {
    if (gameState.activePlotId) return;

    setGameState((prev) => {
      let nextSchoolDays = prev.schoolDays || 0;
      let addedKnowledge = 0;
      let transitionText = '';
      let nextCoords = { ...prev.coords };

      if (targetState === 'home') {
        nextSchoolDays += 1;
        addedKnowledge = 1;
        transitionText = '🏡 傍晚放学啦！你和漂亮的陈老师依依作别，牵着妈妈的温暖手回到了家中。【上学天数 +1 天！】';
        nextCoords = { x: 0, y: 0 }; // Return home coordinate
      } else if (targetState === 'school') {
        transitionText = '🎒 滴滴！早晨大黄校车在楼下神气一叫，你告别父母踏上了精彩十足的幼儿园求学之日！';
        nextCoords = { x: 5, y: 5 }; // Put inside classroom
      } else {
        transitionText = '🪁 叮铃铃！室内算术拼音拼读下课啦，陈老师带全班萌娃排好小长队前往大草地公园户外游戏活动！';
        nextCoords = { x: 0, y: 5 }; // Park coordinate
      }

      triggerToast(transitionText);
      setCurrentInteractionResult(transitionText);

      return {
        ...prev,
        kindergartenState: targetState,
        schoolDays: nextSchoolDays,
        knowledge: Math.min(100, prev.knowledge + addedKnowledge),
        periodCountdown: getPeriodDuration(prev.difficulty),
        coords: nextCoords,
      };
    });
  };

  const handleDialogueChoice = (choice: StoryChoice) => {
    setGameState((prev) => {
      const nextCompleted = [...prev.completedPlots, prev.activePlotId || ''];
      
      let intellectBonus = choice.effects?.intellect || 0;
      let physicalBonus = choice.effects?.physical || 0;
      let talentBonus = choice.effects?.talent || 0;
      let hungerBonus = choice.effects?.hunger || 0;
      let thirstBonus = choice.effects?.thirst || 0;
      let healthBonus = choice.effects?.health || 0;

      const rawHunger = prev.difficulty === 'easy' ? 100 : Math.min(100, Math.max(1, prev.hunger + hungerBonus));
      const rawThirst = prev.difficulty === 'easy' ? 100 : Math.min(100, Math.max(1, prev.thirst + thirstBonus));
      const rawHealth = prev.difficulty === 'easy' ? 100 : Math.min(100, Math.max(0, prev.health + healthBonus));
      const rawTalent = Math.min(100, Math.max(0, prev.talent + talentBonus));

      if (healthBonus < 0) {
        triggerToast(`💥 激进行动导致受创！遭受了 -${Math.abs(healthBonus)}% 生命痛击！`);
      }

      return {
        ...prev,
        hunger: rawHunger,
        thirst: rawThirst,
        health: rawHealth,
        intellect: prev.intellect + intellectBonus,
        physical: prev.physical + physicalBonus,
        talent: rawTalent,
        completedPlots: nextCompleted,
        activePlotId: choice.nextPlotId, 
        activePlotStep: 0,
      };
    });
  };

  // Manual save game
  const handleSaveGame = () => {
    try {
      const storedSavesStr = localStorage.getItem('life_game_saves') || '[]';
      const storedSaves: GameSaveData[] = JSON.parse(storedSavesStr);

      const timestampClean = new Date().toISOString();
      const isJunior = gameState.stage === 'junior_class';
      const currentSaveName = isJunior
        ? `小班求学-[${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}]`
        : `重返襁褓-[${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}]`;

      const currentSave: GameSaveData = {
        ...gameState,
        id: gameState.id || Math.random().toString(36).substr(2, 9),
        saveName: currentSaveName,
        timestamp: timestampClean,
      };

      const updatedSaves = [currentSave, ...storedSaves.filter((s) => s.id !== currentSave.id)].slice(0, 8);
      localStorage.setItem('life_game_saves', JSON.stringify(updatedSaves));

      triggerToast(`💾 宿命存档已安稳封锁：${currentSaveName}`);
    } catch (e) {
      console.error(e);
      triggerToast('❌ 储存空间已满，保存失败。');
    }
  };

  const getDifficultyBadge = (d: Difficulty) => {
    switch (d) {
      case 'easy':
        return 'bg-emerald-950 text-emerald-400 border-emerald-900';
      case 'normal':
        return 'bg-blue-950 text-blue-400 border-blue-900';
      case 'hard':
        return 'bg-amber-950 text-amber-400 border-amber-900';
      case 'hell':
        return 'bg-rose-950 text-rose-400 border-rose-900';
      case 'impossible':
        return 'bg-red-950 text-red-400 border-red-900';
    }
  };

  const getPeriodMetadata = (p: PlayerPeriod) => {
    switch (p) {
      case 'liberty':
        return {
          name: '自由探索期',
          style: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20',
          perk: '🚶 可自由在地盘上爬动摸索，体能磨炼消耗平稳。'
        };
      case 'parents_arm':
        return {
          name: '父母怀抱期',
          style: 'border-pink-500/30 text-pink-400 bg-pink-950/20',
          perk: '🤱 爸妈在怀中搂抱着你。在此期间，体能锻炼恢复+2！'
        };
      case 'others_arm':
        return {
          name: '他人怀抱期',
          style: 'border-yellow-500/30 text-yellow-400 bg-yellow-950/20',
          perk: '👵 亲戚或奶奶抱着你转。思维学习效率 +2，天赋自动翻倍！'
        };
      case 'sleep':
        return {
          name: '睡觉深度期',
          style: 'border-purple-500/30 text-purple-400 bg-purple-950/20',
          perk: '🌙 生物钟静止，饥饿/饥渴不再随时间流逝损耗！'
        };
      case 'outdoor':
        return {
          name: '外出探索期',
          style: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20',
          perk: '🌳 阔步外门去大自然！大坐标场景解锁，支持探索外部建筑！'
        };
    }
  };

  const currentPeriodMeta = getPeriodMetadata(gameState.currentPeriod);
  const isCurrentlyInOutdoorZone = gameState.coords.x >= 10 || gameState.coords.y >= 10;

  // List of active location list for user shortcut travel (indoor vs outdoor)
  const zoneAppropriateBuildings = BUILDINGS.filter((b) => {
    const isB_Outdoor = b.x >= 10 || b.y >= 10;
    return isCurrentlyInOutdoorZone ? isB_Outdoor : !isB_Outdoor;
  });

  const parentsAdvice = getParentsWhereaboutsText();

  return (
    <div className="relative min-h-[645px] h-full w-full bg-slate-950 flex flex-col justify-between overflow-hidden font-sans text-slate-100">
      
      {/* Pop toaster */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-slate-900 border border-indigo-500 text-indigo-100 px-4 py-2.5 rounded-xl text-xs shadow-2xl flex items-center gap-2 max-w-md pointer-events-none transition-all animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Dynamic Fainting fatal alert */}
      {faintAlert && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-6 text-center text-slate-100 backdrop-blur-md">
          <div className="max-w-md space-y-6">
            <div className="w-16 h-16 bg-red-950 border border-red-500 rounded-full flex items-center justify-center mx-auto text-red-500 animate-pulse text-3xl">
              💀
            </div>
            <h3 className="text-2xl font-black text-white">你因过度饥渴体力不支而昏倒！</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              在一阵恍惚与啼哭声中，妈妈把你紧抱在怀里，眼泛泪光给你冲好适温温奶。<br />
              你感到一丝丝热牛奶流入肚中，精神重打，在宝宝婴儿床上徐徐睁开了双眼。
            </p>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs space-y-1.5 text-left font-mono">
              <div className="text-red-400 font-bold">🚨 惩罚：坐标遣送重置回婴儿床 (0,0)</div>
              <div className="text-amber-400">🍼 妈妈温柔强行哺母乳：属性度已补充 45%</div>
              <div className="text-rose-400">🧠 脑细胞微弱缺氧：智力扣除 2 点</div>
            </div>
            <button
              id="faint-alert-close"
              type="button"
              onClick={() => setFaintAlert(false)}
              className="w-full py-3 bg-indigo-655 hover:bg-indigo-500 rounded-xl font-bold text-sm tracking-wide shadow-lg transition border border-indigo-500 cursor-pointer"
            >
              睁眼惊醒，重振旗鼓
            </button>
          </div>
        </div>
      )}

      {/* Main Plot Overlay Dialogue */}
      {gameState.activePlotId && PLOTS[gameState.activePlotId] && (
        <StoryOverlay
          plot={PLOTS[gameState.activePlotId]}
          step={gameState.activePlotStep}
          onNext={handleNextDialogStep}
          onChoiceSelect={handleDialogueChoice}
        />
      )}

      {/* 5-App Smartphone Simulator & Mother Interaction Dialogue */}
      {isPhoneEventOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md overflow-y-auto flex items-center justify-center p-4 select-none animate-fade-in font-sans">
          
          {phoneStep < 9 ? (
            /* --- Dialogue Phase with Mom --- */
            <div className="w-full max-w-lg bg-slate-900 border border-purple-500/30 p-6 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col space-y-4">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
                <span className="text-xs font-black tracking-widest text-purple-400 uppercase">
                  🎬 萌芽特别探索短剧情 ｜ 隐藏机缘：母辈科技震撼
                </span>
                <span className="text-[10px] text-slate-500 font-mono">第 {phoneStep + 1} / 9 幕</span>
              </div>

              {/* Dialogue speech render */}
              <div className="bg-slate-955 p-5 rounded-2xl border border-slate-850 min-h-[160px] flex flex-col justify-center space-y-2">
                {(() => {
                  let speaker = '旁白';
                  let content = '';
                  let avatar = '📖';
                  let col = 'text-slate-400';

                  if (phoneStep === 0) {
                    speaker = '旁白';
                    content = '你用柔嫩的小手探入衣柜一掌宽的漆黑地板夹缝，慢慢摸索。突然，滑腻冰凉的手感传来！你用尽全力，将一个沉甸甸的纯黑长方形金属板拉了出来。';
                    avatar = '🎙️';
                    col = 'text-slate-400';
                  } else if (phoneStep === 1) {
                    speaker = '顾小雨（你）';
                    content = '“咦？这个黑黑亮亮的板、反光度极佳，还会像巧克力一样闪烁呼吸冷光！难道是神界的符文魔板吗？”';
                    avatar = '👶';
                    col = 'text-teal-400';
                  } else if (phoneStep === 2) {
                    speaker = '旁白';
                    content = '话音未落，长方板突然亮起流光，倒映出你可爱又好奇的大眼睛。这时，客厅传来急促由远及近的踢踏鞋声，妈妈擦着汗，惊讶地小跑进卧室。';
                    avatar = '🎙️';
                    col = 'text-slate-400';
                  } else if (phoneStep === 3) {
                    speaker = '妈妈（震惊捏衣角）';
                    content = '“哎呀，我的乖宝，你怎么把妈妈随手放在床头缝隙里的‘那个’给翻出来了呀！”';
                    avatar = '👩';
                    col = 'text-purple-300';
                  } else if (phoneStep === 4) {
                    speaker = '顾小雨（天真复读）';
                    content = '“妈妈，这个黑乎乎、亮晶晶的大铁块，究竟悬空漂浮是什么神秘法宝？”';
                    avatar = '👶';
                    col = 'text-teal-400';
                  } else if (phoneStep === 5) {
                    speaker = '妈妈（笑着捏脸）';
                    content = '“乖宝贝，这个大白铁板板可绝对不能塞进嘴巴！这个宝贝呀，叫做【智能手机】。”';
                    avatar = '👩';
                    col = 'text-purple-300';
                  } else if (phoneStep === 6) {
                    speaker = '顾小雨（继续卖萌追问）';
                    content = '“什么是【手机】嘛？可以用来召唤奥特曼和开宇宙飞船吗？”';
                    avatar = '👶';
                    col = 'text-teal-400';
                  } else if (phoneStep === 7) {
                    speaker = '妈妈（温柔摸头）';
                    content = '“手机神奇极啦，它是一个装着全世界奥妙的水晶镜子，能让你和爸爸、外公语音，也能看跳舞。但也藏着会让眼睛近视的魔法怪兽。妈妈只准你点亮看一下，千万不能偷偷拿走塞进书包哦，知道吗？”';
                    avatar = '👩';
                    col = 'text-purple-300';
                  } else if (phoneStep === 8) {
                    speaker = '顾小雨（心智默念）';
                    content = '“懂了！虽然我这具凡胎三岁大，握着手机费力。但我前世可是写过上万行内核代码的高级工程师！让我来解构这台现代终端设备，瞧瞧里面都有什么高科技应用程序！”';
                    avatar = '⚡';
                    col = 'text-amber-400 font-bold';
                  }

                  return (
                    <>
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-1.5 mb-2">
                        <span className="text-xl">{avatar}</span>
                        <span className={`font-black text-xs ${col}`}>{speaker}</span>
                      </div>
                      <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">{content}</p>
                    </>
                  );
                })()}
              </div>

              {/* Navigation Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPhoneEventOpen(false)}
                  className="flex-1 py-3 px-4 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-bold rounded-xl border border-slate-800 transition cursor-pointer"
                >
                  放弃并放回原位
                </button>
                <button
                  type="button"
                  onClick={() => setPhoneStep((p) => p + 1)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black rounded-xl border border-purple-400 shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>{phoneStep === 8 ? '🚀 开始研究并模拟手机' : '聆听下一步（继续）'}</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ) : (
            /* --- Active Phone Simulator Handset Phase --- */
            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8 max-w-4xl w-full">
              
              {/* Device body */}
              <div className="w-[320px] h-[640px] bg-slate-900 border-4 border-slate-755 rounded-[44px] shadow-2xl relative flex flex-col overflow-hidden ring-4 ring-purple-650/15 shrink-0">
                {/* Screen Border Overlay */}
                <div className="absolute inset-0 border-[6px] border-slate-955 rounded-[38px] pointer-events-none z-30" />
                
                {/* Dynamic Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-slate-955 rounded-full z-45 flex items-center justify-between px-3 text-[7px] text-teal-400 font-mono pointer-events-none select-none border border-slate-900 shadow-md">
                  <span className="w-1.5 h-1.5 bg-indigo-900 rounded-full animate-pulse" />
                  <span className="truncate max-w-[64px] text-[6.5px]">微信消息 📶 5G 100%</span>
                  <span className="w-2.5 h-1 bg-teal-500/80 rounded" />
                </div>

                {/* Top System Status Bar */}
                <div className="absolute top-1.5 inset-x-5 h-5 flex justify-between items-center text-[8px] font-bold text-slate-400 font-mono z-30 pointer-events-none">
                  <span>15:57 <span className="text-[7px] text-slate-500">UTC</span></span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[7px] text-emerald-450 font-sans">📶 5G</span>
                    <span className="text-slate-300">🔋 100%</span>
                  </div>
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-350 rounded-full z-35 pointer-events-none" />

                {/* Simulated Screen Inner Frame */}
                <div className="flex-1 bg-gradient-to-b from-slate-955 via-slate-900 to-slate-955 p-4 pt-11 pb-6 flex flex-col relative overflow-hidden text-left">
                  
                  {activePhoneApp === null ? (
                    /* HOME SCREEN LAYOUT */
                    <div className="flex-1 flex flex-col justify-between h-full animate-fade-in">
                      
                      {/* Top Clock and Weather Widget */}
                      <div className="bg-slate-900/60 border border-slate-850/60 rounded-2xl p-3 text-center space-y-0.5 shadow-inner mt-2 backdrop-blur-sm relative">
                        <div className="text-xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-teal-300 to-indigo-400 tracking-wide">
                          15:57
                        </div>
                        <div className="text-[8px] font-bold text-slate-400">
                          2026年6月 · 暴雨天（小班特惠特训期）
                        </div>
                        <div className="text-[7px] text-slate-500 flex items-center justify-center gap-1">
                          <span>📍 萌芽社区住宅卧室 (3,2)</span>
                          <span className="text-rose-405 font-bold">🌡️ 26℃</span>
                        </div>
                        <span className="absolute -bottom-1 right-2 px-1 text-[6px] bg-indigo-950 border border-indigo-900 font-mono text-indigo-400 rounded">
                          距高中毕业 5475天
                        </span>
                      </div>

                      {/* Prominent Apps 5 Grid */}
                      <div className="my-auto grid grid-cols-3 gap-y-6 gap-x-4 px-2 py-4">
                        
                        {/* App 1: WeChat */}
                        <button
                          type="button"
                          onClick={() => {
                            setActivePhoneApp('wechat');
                            setPhoneLog('打开微信：发现爸爸和外公发来全新聊天会话和互动项目！');
                          }}
                          className="flex flex-col items-center justify-center space-y-1.5 group select-none cursor-pointer"
                        >
                          <div className="w-13 h-13 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-md border border-emerald-400/25 relative transition group-hover:scale-105 active:scale-95">
                            💬
                            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse border border-slate-950 font-mono shadow">
                              3
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-200 font-black tracking-wide">微信</span>
                        </button>

                        {/* App 2: Eggy Party */}
                        <button
                          type="button"
                          onClick={() => {
                            setActivePhoneApp('eggy');
                            setPhoneLog('打开蛋仔派对：体验少儿微操电竞竞速，大杀四方。');
                          }}
                          className="flex flex-col items-center justify-center space-y-1.5 group select-none cursor-pointer"
                        >
                          <div className="w-13 h-13 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl shadow-md border border-amber-300/25 relative transition group-hover:scale-105 active:scale-95">
                            🐣
                            <span className="absolute -bottom-1 -right-1 px-1 bg-yellow-950/80 border border-yellow-750 text-[6px] text-yellow-300 rounded font-mono">
                              HOT
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-200 font-black tracking-wide">蛋仔派对</span>
                        </button>

                        {/* App 3: Douyin */}
                        <button
                          type="button"
                          onClick={() => {
                            setActivePhoneApp('douyin');
                            setPhoneLog('打开视频直播：体验多段高热度少儿极客科普跟唱内容！');
                          }}
                          className="flex flex-col items-center justify-center space-y-1.5 group select-none cursor-pointer"
                        >
                          <div className="w-13 h-13 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-2xl shadow-md relative transition group-hover:scale-105 active:scale-95 text-cyan-400">
                            🎵
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                          </div>
                          <span className="text-[10px] text-slate-200 font-black tracking-wide">抖音直播</span>
                        </button>

                        {/* App 4: Dev Kernel terminal */}
                        <button
                          type="button"
                          onClick={() => {
                            setActivePhoneApp('dev');
                            setPhoneLog('执行极客微终端：以前世编译器基础调试上学签到外挂、无线嗅探！');
                          }}
                          className="flex flex-col items-center justify-center space-y-1.5 group select-none cursor-pointer"
                        >
                          <div className="w-13 h-13 bg-slate-900 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-2xl shadow-md relative transition group-hover:scale-105 active:scale-95">
                            💻
                            <span className="absolute -top-1 -right-1 px-1 bg-rose-955 border border-rose-800 text-[6px] text-rose-300 rounded font-mono font-bold scale-90">
                              ROOT
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-200 font-black tracking-wide">极客终端</span>
                        </button>

                        {/* App 5: Polaroid Gallery Album */}
                        <button
                          type="button"
                          onClick={() => {
                            setActivePhoneApp('album');
                            setPhoneLog('打开智能家庭相册：探查出生医学底片及父母的秘闻铁证合影照！');
                          }}
                          className="flex flex-col items-center justify-center space-y-1.5 group select-none cursor-pointer"
                        >
                          <div className="w-13 h-13 bg-sky-500 rounded-2xl flex items-center justify-center text-2xl shadow-md border border-sky-400/25 relative transition group-hover:scale-105 active:scale-95 bg-sky-500">
                            🖼️
                          </div>
                          <span className="text-[10px] text-slate-200 font-black tracking-wide">智能相册</span>
                        </button>

                        {/* Placeholder App 6 */}
                        <div className="flex flex-col items-center justify-center space-y-1.5 opacity-35 select-none">
                          <div className="w-13 h-13 bg-slate-850 rounded-2xl flex items-center justify-center text-xl border border-dashed border-slate-750">
                            ⚙️
                          </div>
                          <span className="text-[9px] text-slate-500">系统设置</span>
                        </div>

                      </div>

                      {/* Bottom system quick dock app rails */}
                      <div className="bg-slate-900/50 border border-slate-850/40 rounded-3xl p-2.5 flex items-center justify-around gap-2 shadow-inner backdrop-blur-md mb-2">
                        <span className="text-xl opacity-80 filter grayscale">📞</span>
                        <span className="text-xl opacity-80 filter grayscale">🧭</span>
                        <span className="text-xl opacity-80 filter grayscale">📖</span>
                        <span className="text-xl opacity-80 filter grayscale">🧬</span>
                      </div>

                    </div>
                  ) : (
                    /* ANY REGULAR APP SCREEN CHASSIS */
                    <div className="flex-1 flex flex-col justify-between h-full animate-fade-in text-xs text-slate-200 font-sans">
                      
                      {/* App Inside Header */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActivePhoneApp(null);
                            setPhoneEventToast(null);
                          }}
                          className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold text-teal-400 rounded-lg flex items-center gap-1 cursor-pointer transition"
                        >
                          <span>◀ 返回主页</span>
                        </button>
                        <span className="font-bold text-[10px] tracking-wide text-amber-400 uppercase font-mono">
                          {activePhoneApp === 'wechat' && '💬 掌上微信 (宝宝版)'}
                          {activePhoneApp === 'eggy' && '🐣 蛋仔联接超级大厅'}
                          {activePhoneApp === 'douyin' && '🎵 抖音快速直播刷视频'}
                          {activePhoneApp === 'dev' && '💻 Kernel System Shell'}
                          {activePhoneApp === 'album' && '🖼️ 顾小雨私家加密相册'}
                        </span>
                      </div>

                      {/* APP WINDOW INNER VIEW CONTAINER */}
                      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 max-h-[300px]">
                        
                        {/* --- WECHAT (微信) APP LAYOUT --- */}
                        {activePhoneApp === 'wechat' && (
                          <div className="space-y-3 flex flex-col h-full">
                            {/* Contact selection tabs */}
                            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
                              {[
                                { id: 'dad', text: '👨 爸爸' },
                                { id: 'grandpa', text: '👵 外公' },
                                { id: 'group', text: '👪 家族群' }
                              ].map((tab) => (
                                <button
                                  key={tab.id}
                                  type="button"
                                  onClick={() => setAppStates(p => ({ ...p, wechatChat: tab.id }))}
                                  className={`py-1 text-[9px] font-extrabold rounded text-center transition cursor-pointer ${appStates.wechatChat === tab.id ? 'bg-emerald-600 text-white shadow shadow-emerald-900' : 'bg-slate-900 text-slate-400 hover:bg-slate-850'}`}
                                >
                                  {tab.text}
                                </button>
                              ))}
                            </div>

                            {/* Chat history list simulated */}
                            <div className="bg-slate-955 p-3 rounded-xl border border-slate-850 flex-1 space-y-3 min-h-[140px] text-[11px] leading-relaxed select-text">
                              {appStates.wechatChat === 'dad' && (
                                <>
                                  <div className="text-center text-[8px] text-slate-500 font-mono">下午 15:40</div>
                                  <div className="flex gap-2 items-start text-left">
                                    <span className="text-base bg-slate-900 p-1 rounded border border-slate-850">👨</span>
                                    <div className="bg-slate-900 border border-slate-850 px-2.5 py-1.5 rounded-r-xl rounded-bl-xl text-slate-300">
                                      小雨乖宝，爸爸想你了！这个月绩效好，偷偷给你发了 200 块压岁私房钱放红包里哈，拿去让你妈带你买大奥特曼闪光大胶卡玩！
                                    </div>
                                  </div>
                                  <div className="text-center text-[9px] text-slate-500 font-mono italic">
                                    【🧧 200元私房钱拼手气红包躺在屏幕下方】
                                  </div>
                                </>
                              )}

                              {appStates.wechatChat === 'grandpa' && (
                                <>
                                  <div className="text-center text-[8px] text-slate-500 font-mono">下午 15:30</div>
                                  <div className="flex gap-2 items-start text-left">
                                    <span className="text-base bg-slate-900 p-1 rounded border border-slate-850">👵</span>
                                    <div className="bg-slate-900 border border-slate-850 px-2.5 py-1.5 rounded-r-xl rounded-bl-xl text-slate-300">
                                      我的乖孙小雨啊，今天在幼儿园学校学得懂拼音不？外公今天钓了一条大草鱼，晚上给你买小风车和小零食！
                                    </div>
                                  </div>
                                </>
                              )}

                              {appStates.wechatChat === 'group' && (
                                <>
                                  <div className="text-center text-[8px] text-slate-500 font-mono">下午 15:15</div>
                                  <div className="flex gap-2 items-start text-left">
                                    <span className="text-base bg-slate-900 p-1 rounded border border-slate-850">👵</span>
                                    <div className="bg-slate-900 border border-slate-850 px-2.5 py-1.5 rounded-r-xl rounded-bl-xl text-slate-300">
                                      外公赞你：周岁抓周小雨就直奔我的旧历科学高数课本去，太有出息了！不愧是我们顾家的顶级麒麟天生文曲星！
                                    </div>
                                  </div>
                                  <div className="flex gap-2 items-start text-left">
                                    <span className="text-base bg-slate-900 p-1 rounded border border-slate-850">👨‍🦰</span>
                                    <div className="bg-slate-900 border border-slate-850 px-2.5 py-1.5 rounded-r-xl rounded-bl-xl text-slate-300">
                                      大姑表示：三岁懂拼读打字和编译，是现代胎教惊天奇迹啊...
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>

                            {/* WeChat interactive action buttons */}
                            <div className="space-y-1.5">
                              <div className="text-[9px] text-emerald-400 font-bold block">可触发点击互动感悟：</div>
                              {appStates.wechatChat === 'dad' && (
                                <div className="grid grid-cols-1 gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPhoneLog('你试图点击收取红包买全套闪卡！结果微信消息弹出扣款提醒，站在身后的妈妈眼尖立刻一把拿过代收！妈妈：“压岁钱妈妈先替你包着，等你长大十个18岁后再全额返，免得弄丢了！” 你嚎啕大哭！感觉体力有少许受挫……');
                                      setPhoneEventToast('🧧 没收！红包被妈妈无情代扣了，体力扣减 5点');
                                      setGameState(prev => ({
                                        ...prev,
                                        skills: { ...prev.skills, health: Math.max(1, (prev.skills.health || 100) - 5) }
                                      }));
                                    }}
                                    className="p-2 bg-slate-905 border border-amber-950 hover:bg-slate-850 rounded-xl text-left cursor-pointer transition text-[9px] text-amber-500 font-bold flex justify-between items-center"
                                  >
                                    <span>🧧 A. 点击红包收取200元爸爸零花币</span>
                                    <span className="text-[8px] bg-amber-955 px-1 rounded border border-amber-800 text-amber-400 font-mono">体力-5</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPhoneLog('你奶声奶气地对麦克风发出一段语音：“谢谢贴心好爸爸！刚才发的200元已被妈妈大眼睛秒速代扣充值啦！妈妈说今天买了最新款海蓝极光口红配裙子，让你晚上回家拖地拖得起劲。” 边上的妈妈羞赧无比地重戳你的粉红指心。微信头爸爸回复了一排大汗捂眼赞赏表情。');
                                      setPhoneEventToast('🎤 夸奖成功！智商极速成长 +5, 口艺魅力 +4');
                                      setGameState(prev => ({
                                        ...prev,
                                        skills: { ...prev.skills, intellect: (prev.skills.intellect || 1) + 5, charisma: (prev.skills.charisma || 1) + 4 }
                                      }));
                                    }}
                                    className="p-2 bg-slate-905 border border-teal-950 hover:bg-slate-850 rounded-xl text-left cursor-pointer transition text-[9px] text-teal-400 font-bold flex justify-between items-center"
                                  >
                                    <span>🎤 B. 告知红包流向并夸奖妈妈极美</span>
                                    <span className="text-[8px] bg-teal-955 px-1 rounded border border-teal-800 text-teal-450 font-mono">智力+5 社交+4</span>
                                  </button>
                                </div>
                              )}

                              {appStates.wechatChat === 'grandpa' && (
                                <div className="grid grid-cols-1 gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPhoneLog('你端正清了清喉咙，有模有样地在输入界发去自己完整的流利背诵拼音和英文字母语音。外公惊喜得满脸放红光，怒发全额红包助金，在聊天群里疯狂赞颂乖宝贝！');
                                      setPhoneEventToast('🎤 双语语音征服！知识学识成长 +8, 全家族魅力 +4！');
                                      setGameState(prev => ({
                                        ...prev,
                                        skills: { ...prev.skills, knowledge: (prev.skills.knowledge || 1) + 8, charisma: (prev.skills.charisma || 1) + 4 }
                                      }));
                                    }}
                                    className="p-2 bg-slate-905 border border-indigo-950 hover:bg-slate-850 rounded-xl text-left cursor-pointer transition text-[9px] text-indigo-400 font-bold flex justify-between items-center"
                                  >
                                    <span>🎤 A. 发去流利背诵幼儿园拼音字母语音</span>
                                    <span className="text-[8px] bg-indigo-955 px-1 rounded border border-indigo-805 text-indigo-450 font-mono">知识+8 社交+4</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPhoneLog('凭借高维内核底蕴，你在聊天区敲出一串TCP/IP报文及RFC标准：“外公，目前正在攻关高级自动操作系统任务编排，拼音已被我超前毕业……” 外公一看冷汗直冒，连忙发微给妈妈私聊：“闺女啊，乖孙小雨是不是把高数键盘给整嘴里吞字了？要不送去神童院查一查神经呀？！”');
                                      setPhoneEventToast('💻 极客答卷！大智大慧 +6，逻辑暴涨！');
                                      setGameState(prev => ({
                                        ...prev,
                                        skills: { ...prev.skills, intellect: (prev.skills.intellect || 1) + 6 }
                                      }));
                                    }}
                                    className="p-2 bg-slate-905 border border-slate-850 hover:bg-slate-850 rounded-xl text-left cursor-pointer transition text-[9px] text-slate-300 font-bold flex justify-between items-center"
                                  >
                                    <span>💻 B. 回复底层网络Socket报文编排原理</span>
                                    <span className="text-[8px] bg-slate-950 px-1 rounded border border-slate-750 text-slate-400 font-mono">智力+6</span>
                                  </button>
                                </div>
                              )}

                              {appStates.wechatChat === 'group' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhoneLog('用那多肉厚实的小手指，在全家族聊天大群中打出了一行无比高傲且有担当的语句：“顾家各位长辈看好，今朝幼学唯我称雄！我必将在本期勇夺学前拼音大满贯，并重塑我们未来全球硬件科技的底层生态！” 大家舅舅阿姨大呼降世武神，妈妈幸福得差点摔掉大白兔奶糖！');
                                    setPhoneEventToast('🔥 麒麟之言发表成功！知识学问 +5, 智力点上升 +4！');
                                    setGameState(prev => ({
                                      ...prev,
                                      skills: { ...prev.skills, knowledge: (prev.skills.knowledge || 1) + 5, intellect: (prev.skills.intellect || 1) + 4 }
                                    }));
                                  }}
                                  className="w-full p-2 bg-slate-905 border border-fuchsia-950 hover:bg-slate-850 rounded-xl text-left cursor-pointer transition text-[9px] text-fuchsia-400 font-bold flex justify-between items-center"
                                >
                                  <span>🔥 A. 在家族至尊群霸道打字：“今朝我称王，重塑未来！”</span>
                                  <span className="text-[8px] bg-fuchsia-955 px-1 rounded border border-fuchsia-800 text-fuchsia-450 font-mono">知识+5 智力+4</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* --- EGGY PARTY (蛋仔派对) APP LAYOUT --- */}
                        {activePhoneApp === 'eggy' && (
                          <div className="space-y-3">
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-2 text-center relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-2 h-2 rounded bg-amber-400" />
                              <div className="text-2xl animate-bounce">🦖🐣🎮</div>
                              <span className="font-mono text-cyan-400 font-black text-xs block">蛋仔天梯大厅积分：RANK {appStates.eggyWins}</span>
                              <div className="text-[10px] text-slate-350 leading-relaxed">
                                你正置身于全球蛋仔超级大联机竞技场。高级极客手指在小小的屏幕上大秀神童微操！
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const gainedWins = appStates.eggyWins + 1;
                                  const targetScore = appStates.eggyScore + 20;
                                  setAppStates(p => ({ ...p, eggyWins: gainedWins, eggyScore: targetScore }));
                                  setPhoneLog(`你手指肌肉记忆极佳，连弹幻影无漏击，大招配合顺滑，成功夺取天梯第 ${gainedWins} 局极速王座！[巅峰黄金特级大玩家] 闪光称号砸来，妈妈惊得捂住嘴。`);
                                  setPhoneEventToast(`🎮 排位极限王冠成功解锁！智力大振 +6, 艺术才调 +4`);
                                  setGameState(prev => ({
                                    ...prev,
                                    skills: { ...prev.skills, intellect: (prev.skills.intellect || 1) + 6, charisma: (prev.skills.charisma || 1) + 4 }
                                  }));
                                }}
                                className="p-2.5 bg-slate-905 border border-amber-500/40 hover:bg-slate-850 rounded-xl text-left cursor-pointer transition text-[9px] text-amber-300 font-bold flex justify-between items-center"
                              >
                                <span>🚀 A. 手指物理微操：APM连弹，夺全服首金</span>
                                <span className="text-[8px] bg-amber-955 px-1.5 py-0.5 border border-amber-700 text-amber-400 rounded">智力+6 才学+4</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setPhoneLog('你在大厅语音大呼：“对不起小哥哥，因为刚才还要腾出一只手咬奶嘴喝牛肉泥，单手玩的不好，莫怪嘛。” 队友被萌娃大音电的酥麻无比，大吼要无限制保护弟弟通关！');
                                  setPhoneEventToast('🗣️ 萌音大厅征服！魅力提升 +5, 脑域智慧 +3');
                                  setGameState(prev => ({
                                    ...prev,
                                    skills: { ...prev.skills, charism: (prev.skills.charism || 1) + 5, intellect: (prev.skills.intellect || 1) + 3 }
                                  }));
                                }}
                                className="p-2.5 bg-slate-905 border border-sky-500/40 hover:bg-slate-850 rounded-xl text-left cursor-pointer transition text-[9px] text-sky-400 font-bold flex justify-between items-center"
                              >
                                <span>🗣️ B. 下巴嘟起：“咬着奶嘴，所以我是用单脚划过摇杆赢的”</span>
                                <span className="text-[8px] bg-sky-955 px-1.5 py-0.5 border border-sky-700 text-sky-300 rounded">魅力+5 智力+3</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* --- DOUYIN (抖音短视频) APP LAYOUT --- */}
                        {activePhoneApp === 'douyin' && (
                          <div className="space-y-3">
                            <div className="bg-slate-950 rounded-xl p-3 border border-slate-850 relative overflow-hidden text-left space-y-1">
                              <span className="text-[8px] font-black text-rose-500 tracking-wider">LIVE RECO 🎦</span>
                              <div className="aspect-video bg-slate-900 rounded-lg border border-slate-800 flex flex-col justify-center items-center text-center p-2 relative shadow-inner">
                                {appStates.douyinVideoIdx === 0 && (
                                  <>
                                    <span className="text-3xl animate-bounce">🐼🪴</span>
                                    <span className="font-extrabold text-[10px] text-white mt-1">【直播：四川萌大熊猫草坪翻滚起舞】</span>
                                    <p className="text-[8px] text-slate-450 leading-normal">正有 2.5 万人在线给大毛球刷鲜花爱心</p>
                                  </>
                                )}
                                {appStates.douyinVideoIdx === 1 && (
                                  <>
                                    <span className="text-3xl font-mono text-cyan-450 animate-pulse">🐳🐳🐳</span>
                                    <span className="font-extrabold text-[10px] text-white mt-1">【极客科学：2分钟图解 K8s 虚拟容器编排】</span>
                                    <p className="text-[8px] text-slate-450 leading-normal">前沿尖端硬件容器，高分子命名空间揭防</p>
                                  </>
                                )}
                                {appStates.douyinVideoIdx === 2 && (
                                  <>
                                    <span className="text-3xl animate-spin">🐯🎸</span>
                                    <span className="font-extrabold text-[10px] text-white mt-1">【少儿教学唱：陈老师领读两只老虎说唱版】</span>
                                    <p className="text-[8px] text-slate-455 leading-normal">萌幼陈老师在黑板前大眼睛可爱跳舞艺术</p>
                                  </>
                                )}
                                {appStates.douyinVideoIdx === 3 && (
                                  <>
                                    <span className="text-3xl font-mono text-purple-400">⚡⚙️💻</span>
                                    <span className="font-extrabold text-[10px] text-white mt-1">【硬核：从零写多任务C汇编系统RTOS内核】</span>
                                    <p className="text-[8px] text-slate-455 leading-normal">最前卫系统开发直播，指点CPU上下文重定向</p>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Actions and Swipe control */}
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const nextIdx = (appStates.douyinVideoIdx + 1) % 4;
                                  setAppStates(p => ({ ...p, douyinVideoIdx: nextIdx }));
                                  setPhoneLog(`你胖手指向上轻划，刷到了第 ${nextIdx + 1} 个精选内容直播短视频。`);
                                  setPhoneEventToast(null);
                                }}
                                className="flex-1 py-1.5 bg-slate-900 border border-rose-500 hover:bg-slate-850 text-rose-500 font-extrabold rounded-xl transition cursor-pointer text-center text-[9px] flex items-center justify-center gap-1"
                              >
                                <span> swipe_next.sh (指头划动下一个短视频) 👆</span>
                              </button>
                            </div>

                            <div className="p-2 bg-slate-905 border border-slate-850 rounded-xl space-y-1 text-[9px]">
                              <span className="text-[8px] text-rose-400 font-bold block">此短视频实时点击互动功能：</span>
                              {appStates.douyinVideoIdx === 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhoneLog('点巨额大熊猫鲜花赞爱心！大熊猫似乎朝你眯了眯眼，融化了你被尘世特训的焦枯灵魂。综合体力大振！');
                                    setPhoneEventToast('🐾 治愈充能！体质体力值增加了 +15！');
                                    setGameState(prev => ({
                                      ...prev,
                                      skills: { ...prev.skills, health: Math.min(100, (prev.skills.health || 100) + 15) }
                                    }));
                                  }}
                                  className="w-full text-left p-1 bg-slate-950 hover:bg-slate-900 rounded border border-rose-500/30 font-semibold"
                                >
                                  ❤️ A. 狂戳屏幕点赞给国宝送竹子（体力补充 +15）
                                </button>
                              )}
                              {appStates.douyinVideoIdx === 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhoneLog('高维资深服务器架构师极客之魂熊熊轰鸣！虚拟调度拓扑在大脑飞速解算，极高增长你的神童智力！');
                                    setPhoneEventToast('🐳 极客共振！脑域智商极速成长 +6, 算学天资 +4');
                                    setGameState(prev => ({
                                      ...prev,
                                      skills: { ...prev.skills, intellect: (prev.skills.intellect || 1) + 6, charisma: (prev.skills.charisma || 1) + 4 }
                                    }));
                                  }}
                                  className="w-full text-left p-1 bg-slate-950 hover:bg-slate-900 rounded border border-cyan-500/30 font-semibold"
                                >
                                  ❤️ B. 深度融合极客系统思维：点赞并收藏 （智力+6, 算力+4）
                                </button>
                              )}
                              {appStates.douyinVideoIdx === 2 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhoneLog('看了一遍陈老师可爱的幼师歌喉手舞，你顷刻看懂了其中的吐词频率共调，学问暴涨！');
                                    setPhoneEventToast('✨ 同班好感度爆料！学业知识 +3, 才气好学度 +4');
                                    setGameState(prev => ({
                                      ...prev,
                                      skills: { ...prev.skills, knowledge: (prev.skills.knowledge || 1) + 3, charisma: (prev.skills.charisma || 1) + 4 }
                                    }));
                                  }}
                                  className="w-full text-left p-1 bg-slate-950 hover:bg-slate-900 rounded border border-yellow-500/30 font-semibold"
                                >
                                  ❤️ C. 点赞关注陈老师并五优好评 （知识+3 艺术+4）
                                </button>
                              )}
                              {appStates.douyinVideoIdx === 3 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhoneLog('太硬核高维了！你背并吸收了视频里多进程任务调度切换核心汇编源码，高考底气与知识大幅重塑极速飞涨！');
                                    setPhoneEventToast('💻 RTOS科学回溯完成！学府才识大幅成长 +8, 智商 +4');
                                    setGameState(prev => ({
                                      ...prev,
                                      skills: { ...prev.skills, knowledge: (prev.skills.knowledge || 1) + 8, intellect: (prev.skills.intellect || 1) + 4 }
                                    }));
                                  }}
                                  className="w-full text-left p-1 bg-slate-950 hover:bg-slate-900 rounded border border-purple-500/30 font-semibold"
                                >
                                  ❤️ D. 黑客大才一键三连全额点赞 （才识学问 +8, 智商 +4）
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* --- DEV SANDBOX TERMINAL APP LAYOUT --- */}
                        {activePhoneApp === 'dev' && (
                          <div className="space-y-3 font-mono">
                            <div className="bg-slate-955 p-3 rounded-lg border border-teal-500/35 text-[9px] text-emerald-400 space-y-1 select-text">
                              {appStates.devLines.map((line, idx) => (
                                <div key={idx} className="whitespace-pre-wrap leading-tight">{line}</div>
                              ))}
                            </div>

                            <span className="text-[8px] text-slate-450 block uppercase tracking-wider">极客指令库一键加载编译测试：</span>
                            
                            <div className="grid grid-cols-1 gap-1.5 text-[9.5px]">
                              
                              <button
                                type="button"
                                onClick={() => {
                                  const outputLines = [
                                    ...appStates.devLines,
                                    'guest@baby-kernel:~$ ./inst_commute_auto.sh',
                                    'Running bypass routing... finding coordinates 5,5',
                                    'Clocking offset calibrated: delay=0s (No lateness possible)',
                                    '[DONE]: Automation loaded on background RTOS cron daemon!',
                                    '[STATUS]: You mastered the automated commute pattern!'
                                  ];
                                  setAppStates(p => ({ ...p, devLines: outputLines, devHackInstalled: true }));
                                  setPhoneLog('你悄悄部署编排并运行了一整套后台自动化通勤多核监听守护程序，使思维豁然开朗。');
                                  setPhoneEventToast('🤖 极客通勤外挂编译大捷！常识知识 +10！');
                                  setGameState(prev => ({
                                    ...prev,
                                    skills: { ...prev.skills, knowledge: (prev.skills.knowledge || 1) + 10 }
                                  }));
                                }}
                                className="w-full text-left p-2 bg-slate-905 hover:bg-slate-850 rounded-xl border border-teal-400/30 text-teal-400 font-bold flex justify-between items-center cursor-pointer"
                              >
                                <span>🔧 A. 编译并投射 [上学通勤签到自适应智能后台程序]</span>
                                <span className="bg-teal-950 text-[8px] px-1 rounded border border-teal-800 font-bold">知识+10</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  const outputLines = [
                                    ...appStates.devLines,
                                    'guest@baby-kernel:~$ sniffing_giga --air --crack',
                                    'Searching local SSIDs... target: GuFamilyGiga2026',
                                    'Cracking WPA handshakes... KEY matches SUCCESS!',
                                    'Network state: Household bandwidth increased to 10Gbps'
                                  ];
                                  setAppStates(p => ({ ...p, devLines: outputLines }));
                                  setPhoneLog('你一分钟捕获破解了主卧室中隐藏的高速光纤千兆WiFi，彻底为家里的极低端网关进行了提速！智略大振成长！');
                                  setPhoneEventToast('📶 WiFi网格暴力破解大胜！大脑智力提升 +6');
                                  setGameState(prev => ({
                                    ...prev,
                                    skills: { ...prev.skills, intellect: (prev.skills.intellect || 1) + 6 }
                                  }));
                                }}
                                className="w-full text-left p-2 bg-slate-905 hover:bg-slate-850 rounded-xl border border-indigo-400/30 text-indigo-400 font-bold flex justify-between items-center cursor-pointer"
                              >
                                <span>📶 B. 逆向并碰撞家用AP：破解千兆局电宽带密码</span>
                                <span className="bg-indigo-950 text-[8px] px-1 rounded border border-indigo-805 font-bold">智力+6</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  const outputLines = [
                                    ...appStates.devLines,
                                    'guest@baby-kernel:~$ disable --school --freq 855M',
                                    'Flooding remote kindergarten bell speaker queue...',
                                    'Speaker system disabled: silence is gold.'
                                  ];
                                  setAppStates(p => ({ ...p, devLines: outputLines }));
                                  setPhoneLog('你在键盘敲出内存高指针溢出代码，远程挂起静音了幼儿园黑板喇叭考勤播，神机妙算大振！');
                                  setPhoneEventToast('🔒 溢出静音顺利生效！挂载播放限制！智力 +5');
                                  setGameState(prev => ({
                                    ...prev,
                                    skills: { ...prev.skills, intellect: (prev.skills.intellect || 1) + 5 }
                                  }));
                                }}
                                className="w-full text-left p-2 bg-slate-905 hover:bg-slate-850 rounded-xl border border-rose-450/30 text-rose-400 font-bold flex justify-between items-center cursor-pointer"
                              >
                                <span>🔒 C. 底层缓冲溢出漏洞：溢出幼儿园喇叭点名网段</span>
                                <span className="bg-rose-955 text-[8px] px-1 rounded border border-rose-800 font-bold">智力+5</span>
                              </button>

                            </div>
                          </div>
                        )}

                        {/* --- PHOTO GALLERY (相册) APP LAYOUT --- */}
                        {activePhoneApp === 'album' && (
                          <div className="space-y-3">
                            <div className="bg-slate-955 p-3.5 rounded-2xl border border-slate-850 flex flex-col items-center shadow-inner relative">
                              <span className="text-[7px] text-teal-400 font-mono tracking-wider absolute top-1 right-2 uppercase">Polaroid Pic #{appStates.albumIdx + 1}</span>
                              
                              <div className="w-28 h-28 bg-slate-900 border-4 border-white p-1 pb-3 shadow-lg text-center flex flex-col justify-between rounded-sm transform rotate-1 mt-2">
                                <div className="flex-1 flex items-center justify-center bg-slate-950 rounded-xs border border-slate-800 overflow-hidden text-2xl">
                                  {appStates.albumIdx === 0 && '🤰👶💖'}
                                  {appStates.albumIdx === 1 && '🎓👩🏫'}
                                  {appStates.albumIdx === 2 && '💰🕵️‍♀️🙊'}
                                </div>
                                <span className="text-[6px] font-bold text-slate-500 font-mono tracking-wide truncate">
                                  {appStates.albumIdx === 0 && '小雨诞生前B超底片'}
                                  {appStates.albumIdx === 1 && '妈妈上学名校毕业照'}
                                  {appStates.albumIdx === 2 && '爸爸小心思存证照'}
                                </span>
                              </div>

                              <div className="text-[9px] text-slate-300 leading-relaxed text-center mt-3 max-w-[240px]">
                                {appStates.albumIdx === 0 && '【🤰 抓周B超单相底】：拍子里的三岁前你的灵魂正攥着胖指，仿佛蓄势好征服这整轮凡骨气数修真。'}
                                {appStates.albumIdx === 1 && '【🎓 妈妈名牌学府毕业学士特写】：单马尾长发的妈妈，手里捧着学士大奖状，笑容清丽灿烂。'}
                                {appStates.albumIdx === 2 && '【💰 爸爸偷偷藏私房手印特写】：电视定格前，满头大汗踩着塑料凳子把几十块红钞票塞进大滤网隔层的瞬间，铁证如山。'}
                              </div>

                              <div className="flex gap-2 w-full mt-2 justify-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAppStates(p => ({ ...p, albumIdx: (p.albumIdx - 1 + 3) % 3 }));
                                    setPhoneEventToast(null);
                                  }}
                                  className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-[9px] hover:bg-slate-800 cursor-pointer"
                                    >
                                  上一张 ◀
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAppStates(p => ({ ...p, albumIdx: (p.albumIdx + 1) % 3 }));
                                    setPhoneEventToast(null);
                                  }}
                                  className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-[9px] hover:bg-slate-800 cursor-pointer"
                                >
                                  ▶ 下一张
                                </button>
                              </div>
                            </div>

                            <div className="p-2 bg-slate-905 border border-slate-800 rounded-xl space-y-1.5 text-[9px]">
                              <span className="text-[8px] text-indigo-400 font-black block">此拍相隐藏点深刻领悟深发：</span>
                              {appStates.albumIdx === 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhoneLog('深度凝视此诞生单，感悟灵魂在星河间宿命归溯，使你脑叶逻辑潜质大大扩增！');
                                    setPhoneEventToast('💡 心流洗礼！智力底限 +5, 特研天资 +3');
                                    setGameState(prev => ({
                                      ...prev,
                                      skills: { ...prev.skills, intellect: (prev.skills.intellect || 1) + 5, charism: (prev.skills.charism || 1) + 3 }
                                    }));
                                  }}
                                  className="w-full text-left p-1.5 bg-slate-950 hover:bg-slate-900 rounded border border-indigo-550/30 text-indigo-300 font-bold"
                                >
                                  💡 A. 点击底片放开精神冥想归宿（智商+5 天资+3）
                                </button>
                              )}
                              {appStates.albumIdx === 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhoneLog('你对边上的妈妈大喊：“噢，妈妈！照片里的高材小姐姐简直就是刚降露的天仙小仙女！我感觉我是宇宙最幸福的好宝！” 听到乖孙如斯甜言密赞，妈妈心花怒放，当场端来双倍草莓巧克力奶嘴喂你！体力大涨！');
                                    setPhoneEventToast('🍭 蜜嘴嘴甜称颂！体力直接恢复充满 +30！');
                                    setGameState(prev => ({
                                      ...prev,
                                      skills: { ...prev.skills, health: Math.min(100, (prev.skills.health || 100) + 30) }
                                    }));
                                  }}
                                  className="w-full text-left p-1.5 bg-slate-950 hover:bg-slate-900 rounded border border-sky-500/30 text-sky-400 font-bold animate-pulse"
                                >
                                  🗣️ B. 夸赞身侧妈妈：“世界上没有任何人能配得上照片里的仙女妈妈！”
                                </button>
                              )}
                              {appStates.albumIdx === 2 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhoneLog('捏住了老爸藏私房巨额存折的核心罩门！你给正在倒水的爸爸一个玩味通达、老道深湛的淡淡斜睨。老爸当场全身筛沙打颤，立刻跑步去小卖部买全大胶胶反限定盒送你，并哀求说：“雨哥，只要你不往你妈耳朵走风，高中数学作业爸爸也承兑包办到底了！” 心计学识和智商大涨！');
                                    setPhoneEventToast('🤫 锁定秘密人质！智谋成长 +5，常识增益 +3！');
                                    setGameState(prev => ({
                                      ...prev,
                                      skills: { ...prev.skills, intellect: (prev.skills.intellect || 1) + 5, knowledge: (prev.skills.knowledge || 1) + 3 }
                                    }));
                                  }}
                                  className="w-full text-left p-1.5 bg-slate-950 hover:bg-slate-900 rounded border border-amber-500/30 text-amber-300 font-bold"
                                >
                                  🤫 C. 坏坏勾视老爸：“爸，我想买豪华奥特曼玩具金胶盒。”
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                      </div>

                      {/* APP WINDOW SYSTEM RESPONSE LOG MESSAGE */}
                      <div className="bg-slate-950 border border-slate-850 p-2 rounded-xl mt-1.5 space-y-0.5 select-none md:max-h-[80px] overflow-y-auto">
                        <div className="text-[8px] text-amber-400 font-bold flex items-center justify-between">
                          <span>🔔 智能交互手机控制台 std_log:</span>
                          <span className="text-[7px] text-slate-500 font-mono font-bold">sandbox_io</span>
                        </div>
                        <p className="text-[8.5px] text-slate-400 leading-tight leading-relaxed select-text font-mono font-medium">
                          {phoneLog}
                        </p>
                        {phoneEventToast && (
                          <div className="text-[8.5px] text-green-400 font-bold animate-pulse font-mono border-t border-slate-900 pt-0.5 flex items-center gap-1">
                            <span>✨ 实时反馈：</span>
                            <span>{phoneEventToast}</span>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                </div>
              </div>

              {/* Outside Handset Panel: Major interactions (Take cellphone & Put down) */}
              <div className="flex-1 w-full max-w-[280px] space-y-4 text-center">
                <div className="bg-slate-900/60 border border-slate-850/60 p-4 rounded-3xl space-y-2 text-left shadow-lg">
                  <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5">
                    <span className="text-purple-400">📱</span>
                    <span>真机解构 ｜ 宝宝大机缘选择</span>
                  </h4>
                  <p className="text-[10px] text-slate-450 leading-relaxed font-sans">
                    妈妈在一旁温柔慈祥地盯着你，宠溺地监督你划动这块亮闪闪的水晶便携智能大铁盒。
                  </p>
                  <p className="text-[9px] text-teal-400 italic font-mono leading-normal">
                    三岁小肉手端着大屏幕有些颤巍巍，但你前世的极客网络本能使其在指肚滑动游刃有余！
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPhoneLog('你趁着妈妈转身的瞬间，急不可待地抱起由于沉重极具分量的智能铁盒，企图硬顺走塞进自己的小开裆裤拉链和奥特曼小包里！结果被大眼睛监督的妈妈当场逮个严严实实！妈妈一把逮住了你肥嘟嘟胖手腕，温柔而坚定地拍了拍你脑袋，笑意融融：“乖孙乖子顾小雨，刚才怎么跟妈妈拉钩反响作保证来着？嘴都答应了不拿手机！怎么脑袋一骨碌就想着偷偷顺塞包里顺走呢？不听话！来，去卧室温习陈老师布置的字母表拼读，明天早上才能按时去上学！”');
                    setPhoneEventToast('⚠️ 顺兜失败！妈妈抓个现形，嗔怒捏脸警告！');
                    triggerToast('🙅 妈妈戳了戳你：‘顾小雨宝贝，答应妈妈手机不能偷偷拿走带去学校哦！快放好复习拼音！’');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-650 hover:from-rose-500 hover:to-red-600 text-white text-[11px] font-black rounded-2xl border border-rose-500 shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1 animate-pulse"
                >
                  <span>🎒 试一试顺走手机塞进书包拉链 (拿走手机) 🎒</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPhoneEventOpen(false);
                    setActivePhoneApp(null);
                    setPhoneEventToast(null);
                    triggerToast('🚪 锁屏锁定了智能手机，将其放回床缝深处，内心做好了上幼儿园称雄的大准备！');
                  }}
                  className="w-full py-3 bg-slate-905 hover:bg-slate-850 text-emerald-400 hover:text-emerald-300 text-xs font-bold rounded-2xl border border-emerald-950 cursor-pointer transition flex items-center justify-center gap-1"
                >
                  <span>🚪 锁屏并将手机放回原位（离开）</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* Top status header bar */}
      <div className="w-full bg-slate-900/70 border-b border-slate-900 px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-3 shrink-0 z-10 backdrop-blur-md">
        
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-indigo-950 border border-indigo-500/40 text-indigo-400 rounded-full flex items-center justify-center text-lg shadow-inner font-mono">
            👶
          </div>
          <div className="text-left font-sans">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wide text-white">顾氏降世神童</span>
              <span className={`px-2 py-0.5 border rounded text-[10px] font-mono leading-none capitalize ${getDifficultyBadge(gameState.difficulty)}`}>
                {gameState.difficulty === 'easy' && '简单 (轻松)'}
                {gameState.difficulty === 'normal' && '普通'}
                {gameState.difficulty === 'hard' && '困难'}
                {gameState.difficulty === 'hell' && '地狱'}
                {gameState.difficulty === 'impossible' && '无解'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>生理性别: 独生男生 👦</span>
              <span>•</span>
              <span className="text-cyan-405">生存时长: {gameState.timeElapsed}秒</span>
            </div>
          </div>
        </div>

        {/* Survival Status & Header Actions */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
          {/* Health Status */}
          <div className="flex items-center gap-2">
            <span className="text-rose-400 font-bold">❤️ 健康</span>
            <div className="w-20 md:w-28 h-2.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative" title={`健康值: ${gameState.health}/100`}>
              <div
                className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300"
                style={{ width: `${gameState.health}%` }}
              />
            </div>
            <span className="font-bold text-[11px] text-rose-300 font-mono w-6">{gameState.health}</span>
          </div>

          {/* Hunger Status (except under easy mode) */}
          {gameState.difficulty !== 'easy' && (
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">🍗 饱食</span>
              <div className="w-20 md:w-28 h-2.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative" title={`饱食度: ${gameState.hunger}/100`}>
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                  style={{ width: `${gameState.hunger}%` }}
                />
              </div>
              <span className="font-bold text-[11px] text-amber-300 font-mono w-6">{gameState.hunger}</span>
            </div>
          )}

          {/* Thirst Status (except under easy mode) */}
          {gameState.difficulty !== 'easy' && (
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">💧 水分</span>
              <div className="w-20 md:w-28 h-2.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative" title={`水分度: ${gameState.thirst}/100`}>
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300"
                  style={{ width: `${gameState.thirst}%` }}
                />
              </div>
              <span className="font-bold text-[11px] text-cyan-300 font-mono w-6">{gameState.thirst}</span>
            </div>
          )}

          {/* Command controls */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <button
              id="btn-header-save"
              type="button"
              onClick={handleSaveGame}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 transition font-bold text-[11px] cursor-pointer"
            >
              💾 存档宿命
            </button>
            <button
              id="btn-header-exit"
              type="button"
              onClick={onExit}
              className="px-2.5 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-200 rounded-lg border border-rose-900/50 transition font-bold text-[11px] cursor-pointer"
            >
              🏡 返回主菜单
            </button>
          </div>
        </div>

      </div>

      {/* Main gameplay section */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0">
        
        {/* Left Column HUD Mapping / Preschool Sandbox Actions Panel */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {gameState.stage === 'junior_class' ? (
            /* --- Preschool Coordination Sandbox Panel --- */
            <div className="flex flex-col space-y-4">
              {/* COMMUTING OVERLAY HUD ALERT */}
              {isCommuting && (
                <div id="junior-commute-overlay" className="bg-gradient-to-r from-red-950/80 via-amber-950/70 to-red-950/80 border border-amber-500/40 p-4 rounded-2xl text-left animate-pulse space-y-2 relative overflow-hidden shadow-lg shadow-amber-950/40">
                  <div className="absolute top-0 right-0 p-2 font-black text-xs text-amber-500 font-mono tracking-widest bg-amber-950/80 rounded-bl-xl border-l border-b border-amber-500/20">
                    COMMUTE ACTIVE
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400 animate-spin" />
                    <span className="font-extrabold text-sm text-amber-300">🚨 萌芽上学通勤倒计时：</span>
                    <span className="text-xl font-black font-mono text-red-155">{commuteCountdown} 秒</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    请立即操纵下方的 <strong className="text-amber-300">方向摇杆</strong> 或 <strong className="text-teal-400">坐标地标</strong>，从家 <strong className="text-amber-400 font-mono">(0,0)</strong> 尽快前行到社区幼儿园教室 <strong className="text-cyan-400 font-mono">(5,5)</strong> 进行听讲！
                  </p>
                  {commuteCountdown <= 0 ? (
                    <p className="text-[10px] text-rose-500 font-bold font-mono">⚠️ 糟糕！通勤时间已耗尽！你已迟到，前往学校将触发迟到训导：智力/学业奖励减少并受到批评罚则！</p>
                  ) : (
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900 mt-1">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-1000" style={{ width: `${(commuteCountdown / 20) * 100}%` }} />
                    </div>
                  )}
                </div>
              )}

              {/* Sensing Locator HUD Interface - Junior Class Theme */}
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl border border-teal-500/10 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-teal-400 shrink-0" />
                    <h3 className="font-extrabold text-sm md:text-base tracking-wide text-white">智慧少儿坐标空间定位仪器</h3>
                  </div>
                  <div className="text-xs text-teal-400 bg-teal-950/50 px-2.5 py-1 rounded-lg border border-teal-900/60 font-mono flex items-center gap-1.5">
                    <span>精确坐标:</span>
                    <span className="text-white font-bold font-mono">[{gameState.coords.x}, {gameState.coords.y}]</span>
                    <span className="text-[10px] text-slate-500">
                      ({gameState.coords.x === 0 && gameState.coords.y === 0 ? '家' :
                        gameState.coords.x === 5 && gameState.coords.y === 5 ? '幼儿园/学校' :
                        gameState.coords.x === 0 && gameState.coords.y === 5 ? '快乐公园' :
                        gameState.coords.x === 5 && gameState.coords.y === 0 ? '绘本馆' : '城镇街道'})
                    </span>
                  </div>
                </div>

                <div className="relative flex-1 flex flex-col">
                  {gameState.stage === 'junior_class' && gameState.kindergartenState === 'school' && (
                    <div className="absolute -inset-2 bg-slate-955/95 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-5 rounded-2xl z-20 border border-teal-500/25 shadow-xl">
                      <Lock className="w-8 h-8 text-amber-500 animate-bounce mb-3" />
                      <span className="font-extrabold text-xs text-amber-400 uppercase tracking-widest">🏫 课堂听讲：极速修行中</span>
                      <span className="text-[11px] text-slate-300 mt-2 leading-relaxed max-w-[340px]">
                        陈老师在黑板前监督上课！听课期间不可使用摇杆乱跑或离开学校（任何探索已暂时锁定）。请在右侧选择专属上课交互，或累积点击【感悟内心感言】来推进剧情！
                      </span>
                      <p className="text-[9px] text-teal-400 mt-2.5 bg-teal-955/80 border border-teal-900/40 px-3 py-1 rounded-lg italic font-sans">
                        （温馨小提示：陈老师带领外出露天游戏或放学回家后，即可自由挪步走动哦！）
                      </p>
                    </div>
                  )}

                  {/* Custom Aesthetic Coordinate Compass Panel */}
                  <div className="bg-slate-955/85 border border-slate-850 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4 shadow-inner">
                  
                  {/* Dynamic location coordinates visual element */}
                  <div className="w-24 h-24 rounded-full border-2 border-slate-850 flex flex-col items-center justify-center relative bg-slate-950 shrink-0">
                    <div className="absolute inset-1 rounded-full border border-dashed border-teal-500/25 animate-spin" style={{ animationDuration: '10s' }} />
                    <div className="text-2xl filter drop-shadow">
                      {gameState.coords.x === 0 && gameState.coords.y === 0 ? '🏡' :
                       gameState.coords.x === 5 && gameState.coords.y === 5 ? '🏫' :
                       gameState.coords.x === 0 && gameState.coords.y === 5 ? '🪁' :
                       gameState.coords.x === 5 && gameState.coords.y === 0 ? '📚' : '🏃'}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-slate-400 mt-1">
                      X={gameState.coords.x}, Y={gameState.coords.y}
                    </div>
                  </div>

                  {/* Surrounding Landmark card details */}
                  <div className="flex-1 space-y-1 text-left w-full">
                    {getBuildingAt(gameState.coords.x, gameState.coords.y) ? (
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold tracking-wider text-amber-400 uppercase font-mono px-1.5 py-0.5 bg-amber-950/40 border border-amber-900/60 rounded">
                          📍 抵达特色地标
                        </span>
                        <h4 className="text-sm font-extrabold text-white flex items-center gap-1">
                          <span>{getBuildingAt(gameState.coords.x, gameState.coords.y)?.name}</span>
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-normal">
                          {getBuildingAt(gameState.coords.x, gameState.coords.y)?.description}
                        </p>
                      </div>
                    ) : (
                      gameState.stage === 'junior_class' && gameState.kindergartenState === 'home' && gameState.coords.x === 3 && gameState.coords.y === 2 ? (
                        <div className="space-y-1.5 bg-gradient-to-r from-purple-950/65 to-indigo-950/65 border border-fuchsia-500/40 p-3.5 rounded-xl text-left">
                          <span className="text-[9px] font-black tracking-widest text-fuchsia-400 uppercase px-2 py-0.5 bg-fuchsia-950/70 border border-fuchsia-800 rounded animate-pulse inline-block">
                            ✨ 发现隐藏秘密夹缝
                          </span>
                          <h4 className="text-xs font-black text-fuchsia-200">
                            卧室柜柜与地板隐秘狭缝 (3, 2)
                          </h4>
                          <p className="text-[11px] text-slate-300 leading-normal">
                            在床边衣柜旁一掌宽的漆黑角落，静静躺着一个精细反光的纯黑长方板，像是亮闪闪的巧克力，不时闪烁着一排神秘冷光！
                          </p>
                          <button
                            id="btn-discover-hidden-phone"
                            type="button"
                            onClick={() => {
                              setIsPhoneEventOpen(true);
                              setPhoneStep(0);
                              setActivePhoneApp(null);
                            }}
                            className="mt-2 w-full py-2 px-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-[11px] font-black rounded-lg border border-fuchsia-400 shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 animate-bounce"
                          >
                            <Search className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '5s' }} />
                            <span>🔍 探出两指摸索出此物 🔍</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase px-1.5 py-0.5 bg-slate-900 rounded">
                            🏙️ 社区平坦通勤步道
                          </span>
                          <h4 className="text-xs font-bold text-slate-200">
                            安全社区道路区
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-normal">
                            城镇街巷有微风吹拂。使用下方的 [四向进退摇杆] 向右上前进到 (5,5) 教室完成签到听讲。
                            {gameState.stage === 'junior_class' && gameState.kindergartenState === 'home' && (
                              <span className="text-teal-400 font-semibold block mt-1.5 animate-pulse">
                                💡 灵性思维指示：在卧室床头的 (3, 2) 特定角落隐隐有五彩微弱荧光，前去可以取得本阶段限定神秘大隐藏机缘物品哦！
                              </span>
                            )}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                </div>
                
                {/* Landmark shortcuts specific for Junior Class */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-bold flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-teal-400" />
                      <span>学前小班四大核心坐标地标导航(可作为互动快捷按钮) :</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'j_home', name: '🏡 温馨家园', x: 0, y: 0, act: '课后省思' },
                      { id: 'j_school', name: '🏫 社区幼儿园', x: 5, y: 5, act: '端坐听讲' },
                      { id: 'j_park', name: '🪁 绿意公园', x: 0, y: 5, act: '奔跑合唱' },
                      { id: 'j_library', name: '📚 萌芽绘本馆', x: 5, y: 0, act: '研读高深卡' }
                    ].map((b) => {
                      const isCurrent = gameState.coords.x === b.x && gameState.coords.y === b.y;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            if (gameState.activePlotId) return;
                            setGameState((prev) => {
                              const steps = Math.abs(b.x - prev.coords.x) + Math.abs(b.y - prev.coords.y);
                              const newMoves = prev.totalMoves + steps;
                              const partial = {
                                ...prev,
                                coords: { x: b.x, y: b.y },
                                totalMoves: newMoves
                              };
                              return {
                                ...partial,
                                ...checkAndQueuePlots(partial, newMoves, prev.intellect, prev.physical)
                              };
                            });
                            setCurrentInteractionResult(null);
                            triggerToast(`🚀 已微缩重力定位跃迁到地标 ${b.name} (${b.x}, ${b.y})`);
                            
                            setTimeout(() => {
                              checkCommuteArrival(b.x, b.y, commuteCountdown);
                            }, 100);
                          }}
                          className={`py-1.5 px-2 text-left rounded-xl border text-[10px] transition-all flex flex-col justify-between group cursor-pointer ${
                            isCurrent
                              ? 'bg-teal-950/60 border-teal-500 text-white shadow shadow-teal-500/25'
                              : 'bg-slate-950/60 border-slate-900 text-slate-300 hover:border-slate-850'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full gap-0.5">
                            <span className="font-bold text-[10px] truncate max-w-[55px] text-slate-200 group-hover:text-teal-300 font-sans">
                              {b.name}
                            </span>
                            <span className="text-[9px] text-teal-400 font-mono font-black shrink-0">
                              {b.x},{b.y}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Core Joystick move control adapted for Junior Class stage */}
                <div className="bg-slate-950/45 border border-slate-850/60 p-3 rounded-2xl flex flex-col items-center mt-3.5">
                  <div className="text-[9px] text-teal-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-teal-400 animate-pulse" />
                    <span>四方向小班行进避障摇杆</span>
                  </div>
                  
                  {/* Visual landmark navigation coordinates around joystick */}
                  <div className="grid grid-cols-3 gap-2 w-full text-[9px] text-slate-400 p-1.5 bg-slate-955 rounded-xl border border-slate-850/50 mb-2.5 text-center font-mono">
                    <div className="flex flex-col border-r border-slate-850/60 leading-tight">
                      <span className="text-[8px] text-teal-400 font-extrabold font-sans">上递增 (↑ UP)</span>
                      <span className="truncate">学校 (5,5)</span>
                    </div>
                    <div className="flex flex-col border-r border-slate-850/60 leading-tight">
                      <span className="text-[8px] text-teal-400 font-extrabold font-sans">左/下 (←↓)</span>
                      <span className="truncate">家园(0,0)</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[8px] text-teal-400 font-extrabold font-sans">右递增 (→ RIGHT)</span>
                      <span className="truncate flex-1">学校 (5,5)</span>
                    </div>
                  </div>

                  <div className="relative w-28 h-28 bg-slate-955 rounded-full border border-slate-800/80 flex items-center justify-center shadow-inner scale-100">
                    <button
                      id="joystick-up-junior"
                      type="button"
                      onClick={() => handleMove('up')}
                      className="absolute top-1 w-8 h-8 hover:bg-slate-850 rounded-xl flex items-center justify-center text-slate-300 transition-all border border-slate-900 active:bg-teal-600 active:text-slate-950 cursor-pointer"
                      title="上移：往学校、绘本馆、公园方向"
                    >
                      <ArrowBigUp className="w-4 h-4 text-teal-450" />
                    </button>
                    <button
                      id="joystick-left-junior"
                      type="button"
                      onClick={() => handleMove('left')}
                      className="absolute left-1 w-8 h-8 hover:bg-slate-850 rounded-xl flex items-center justify-center text-slate-300 transition-all border border-slate-900 active:bg-teal-600 active:text-slate-950 cursor-pointer"
                      title="左移：往家园、公园方向"
                    >
                      <ArrowBigLeft className="w-4 h-4 text-teal-450" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[7px] text-teal-400 font-mono shadow-inner border border-teal-900/65 font-bold select-none">
                      WALK
                    </div>
                    <button
                      id="joystick-right-junior"
                      type="button"
                      onClick={() => handleMove('right')}
                      className="absolute right-1 w-8 h-8 hover:bg-slate-850 rounded-xl flex items-center justify-center text-slate-300 transition-all border border-slate-900 active:bg-teal-600 active:text-slate-950 cursor-pointer"
                      title="右移：往学校、绘本馆、公园方向"
                    >
                      <ArrowBigRight className="w-4 h-4 text-teal-450" />
                    </button>
                    <button
                      id="joystick-down-junior"
                      type="button"
                      onClick={() => handleMove('down')}
                      className="absolute bottom-1 w-8 h-8 hover:bg-slate-850 rounded-xl flex items-center justify-center text-slate-300 transition-all border border-slate-900 active:bg-teal-600 active:text-slate-950 cursor-pointer"
                      title="下移：往家园、公园方向"
                    >
                      <ArrowBigDown className="w-4 h-4 text-teal-450" />
                    </button>
                  </div>
                </div>

                </div> {/* Close relative flex-1 wrapper */}
              </div>

              {/* Special Custom Interactive Dashboard depending on State */}
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl border border-teal-500/10 pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-teal-400 shrink-0" />
                    <h3 className="font-extrabold text-sm tracking-wide text-white">幼儿日常学业成长行动沙盒</h3>
                  </div>
                  <div className="text-xs text-teal-400 bg-teal-950/50 px-2 py-0.5 rounded border border-teal-900/60 font-mono font-bold">
                    {gameState.kindergartenState === 'home' ? '🏡 居家成长期' : gameState.kindergartenState === 'school' ? '🏫 幼园听讲期' : '🪁 户外玩耍期'}
                  </div>
                </div>

                <div className="bg-slate-955/80 border border-slate-850 p-4 rounded-xl space-y-3">
                  <h4 className="text-xs font-semibold text-slate-350 tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '3s' }} />
                    <span>状态专享互动项目【点击触发感悟且提升知识属性】</span>
                  </h4>
                  
                  {gameState.kindergartenState === 'home' && (
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: '📚 预习字母表', desc: '手把手拼读英文字母（提升知识、字母才能）', action: 'knowAlphabet' },
                        { name: '🧱 玩逻辑积木', desc: '堆砌城堡和数字高楼模型（提升智力、算学）', action: 'knowNumbers' },
                        { name: '🧼 勤洗手防菌', desc: '学习科学七步洗手洗净病菌（达成个人卫生管理）', action: 'knowWashHands' },
                        { name: '🥗 乖乖吃西蓝花', desc: '自主大口吃饭，不闹不抢（快速补满健康值）', action: 'eatSelf' },
                      ].map((act, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleJuniorAction(act.action as any)}
                          className="p-2.5 bg-slate-950/80 hover:bg-slate-850 border border-slate-850 hover:border-teal-500/30 rounded-xl text-left transition-all active:scale-95 cursor-pointer flex flex-col justify-between group"
                        >
                          <span className="font-bold text-[11px] text-teal-300 group-hover:text-amber-400">{act.name}</span>
                          <span className="text-[9px] text-slate-500 mt-1 leading-tight">{act.desc}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {gameState.kindergartenState === 'school' && (
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: '🎨 色彩斑斓识字', desc: '在陈老师黑板前指认五色（领悟色彩感知）', action: 'knowColors' },
                        { name: '🗣️ 礼貌问好招呼', desc: '向陈老师说早上好和老师再见（学会文明礼仪）', action: 'knowPoliteness' },
                        { name: '🍎 零食爱心分享', desc: '把小饼干和小红花大方递给同桌（掌握快乐分享）', action: 'knowShare' },
                        { name: '📖 聆听寓言真理', desc: '端正听陈老师讲格林童话（提升大盘综合智商）', action: 'knowAlphabet' },
                      ].map((act, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleJuniorAction(act.action as any)}
                          className="p-2.5 bg-slate-950/80 hover:bg-slate-850 border border-slate-850 hover:border-teal-500/30 rounded-xl text-left transition-all active:scale-95 cursor-pointer flex flex-col justify-between group"
                        >
                          <span className="font-bold text-[11px] text-teal-300 group-hover:text-amber-400">{act.name}</span>
                          <span className="text-[9px] text-slate-500 mt-1 leading-tight">{act.desc}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {gameState.kindergartenState === 'outdoor' && (
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: '🖍️ 创意落叶拼图', desc: '指染落叶组合大熊猫画（掌握创意涂鸦画画）', action: 'knowDraw' },
                        { name: '🎵 大风车合唱跑', desc: '拉手随陈老师琴声唱歌舞蹈（掌握幼稚儿歌）', action: 'knowSing' },
                        { name: '🏃 草坪抓大蝴蝶', desc: '在斑驳阳光草皮上欢乐奔跑（大福提升锻炼体能）', action: 'knowNumbers' },
                        { name: '🧼 草坪玩耍后洗手', desc: '用手绢和清水擦干净泥（领悟清洁卫视技能）', action: 'knowWashHands' },
                      ].map((act, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleJuniorAction(act.action as any)}
                          className="p-2.5 bg-slate-950/80 hover:bg-slate-850 border border-slate-850 hover:border-teal-500/30 rounded-xl text-left transition-all active:scale-95 cursor-pointer flex flex-col justify-between group"
                        >
                          <span className="font-bold text-[11px] text-teal-300 group-hover:text-amber-400">{act.name}</span>
                          <span className="text-[9px] text-slate-500 mt-1 leading-tight">{act.desc}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {currentInteractionResult && (
                  <div className="mt-4 bg-teal-950/40 border border-teal-500/30 p-3.5 rounded-xl text-teal-100 text-xs text-left leading-relaxed animate-fade-in flex items-start gap-2">
                    <span className="text-lg">📢</span>
                    <div className="space-y-0.5">
                      <div className="font-bold text-amber-400 text-[11px]">本学期学业行为感悟反馈:</div>
                      <p>{currentInteractionResult}</p>
                    </div>
                  </div>
                )}

                {/* General Sandbox Interactive Dialog Button */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                  <span className="text-[10px] text-slate-500 italic max-w-[280px] font-sans">
                    提示：通过上课累积 schoolDays 上学天数。点亮右侧8大功课，满50天和50知识即可直升高段！
                  </span>
                  <button
                    id="btn-trigger-story-queue"
                    type="button"
                    onClick={handleLaunchPlotFromQueue}
                    className="py-2.5 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:opacity-90 active:scale-95 text-slate-950 text-xs font-black rounded-xl flex items-center justify-center gap-1 border border-teal-500 shadow-md relative cursor-pointer shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                    <span>感悟内心感言</span>
                    {gameState.pendingPlotQueue.length > 0 && (
                      <span className="absolute -top-1 right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                    )}
                  </button>
                </div>

              </div>
            </div>
          ) : (
            /* --- Infant Coordinates Radar Layout --- */
            <>
              {/* Sensing Locator HUD Interface */}
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl border border-indigo-500/10 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-indigo-400 shrink-0" />
                    <h3 className="font-extrabold text-sm md:text-base tracking-wide text-white">婴力波坐标空间定位雷达仪</h3>
                  </div>
                  <div className="text-xs text-indigo-400 bg-indigo-950/50 px-2.5 py-1 rounded-lg border border-indigo-900/60 font-mono flex items-center gap-1.5">
                    <span>精确坐标范围:</span>
                    <span className="text-white font-bold font-mono">[{gameState.coords.x}, {gameState.coords.y}]</span>
                    <span className="text-[10px] text-slate-500">({isCurrentlyInOutdoorZone ? '屋外社区' : '室内婴儿房'})</span>
                  </div>
                </div>

                {/* Custom Aesthetic Coordinate Compass Panel */}
                <div className="bg-slate-955/80 border border-slate-850 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-inner">
                  
                  {/* Dynamic location coordinates visual element */}
                  <div className="w-36 h-36 rounded-full border-2 border-slate-850 flex flex-col items-center justify-center relative bg-radial-gradient">
                    <div className="absolute inset-2 rounded-full border border-dashed border-indigo-500/25 animate-spin duration-10000" />
                    <div className="text-3xl filter drop-shadow animate-bounce">
                      {isCurrentlyInOutdoorZone ? '🌳' : '🏡'}
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-400 mt-2">
                      X = {gameState.coords.x} / Y = {gameState.coords.y}
                    </div>
                    <div className="text-[10px] text-indigo-400 font-mono mt-1 px-2 py-0.5 bg-indigo-950/50 rounded-md">
                      {isCurrentlyInOutdoorZone ? 'OUTDOOR' : 'INDOOR'}
                    </div>
                  </div>

                  {/* Surrounding Landmark card details */}
                  <div className="flex-1 space-y-2 text-left w-full">
                    {currentBuilding ? (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase font-mono px-2 py-0.5 bg-amber-950/40 border border-amber-900/60 rounded">
                          📍 抵达地标建筑项目
                        </span>
                        <h4 className="text-base font-extrabold text-white flex items-center gap-1">
                          <span>{currentBuilding.name}</span>
                          <span className="text-xs font-mono text-slate-500">({currentBuilding.x}, {currentBuilding.y})</span>
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-normal">
                          {currentBuilding.description}
                        </p>
                        <div className="text-[10px] text-amber-300 bg-amber-950/20 border border-amber-900/30 px-2 py-1.5 rounded-lg">
                          🔑 <strong>特有互动：</strong> {currentBuilding.interactionName}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5 py-2">
                        <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase px-2 py-0.5 bg-slate-905 rounded">
                          🍃 平凡客厅地板
                        </span>
                        <h4 className="text-sm font-bold text-slate-200">
                          普通地板空间
                        </h4>
                        <p className="text-[11px] text-slate-405 leading-relaxed">
                          这里是安全干净的防滑软胶强化地板。你正以肥墩墩的小胳膊小腿撑在这里，没有发现特定地标。
                        </p>
                        <p className="text-[10px] text-slate-500 italic">
                          提示：点击下方项目进行 “超空间” 婴儿定位移动，爬跃去各种房间角落寻找爸妈吧！
                        </p>
                      </div>
                    )}
                  </div>

                </div>

                {/* Interaction State Output Response */}
                {currentInteractionResult && (
                  <div className="mt-4 bg-indigo-950/40 border border-indigo-500/30 p-3.5 rounded-xl text-indigo-100 text-xs text-left leading-relaxed animate-fade-in flex items-start gap-2">
                    <span className="text-lg">📢</span>
                    <div className="space-y-0.5">
                      <div className="font-bold text-amber-400 text-[11px]">上次探索感悟反馈:</div>
                      <p>{currentInteractionResult}</p>
                    </div>
                  </div>
                )}

                {/* Hyper Crawling Travel coordinates shortcuts */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-bold flex items-center gap-1">
                      <Navigation className="w-4 h-4 text-cyan-400" />
                      <span>已知 {isCurrentlyInOutdoorZone ? '屋外社区' : '室内房间'} 地标坐标表 ({zoneAppropriateBuildings.length} 处)</span>
                    </span>
                    <span className="text-[10px] text-cyan-500 font-mono bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-900/60">
                      支持点击一键秒速前前去
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {zoneAppropriateBuildings.map((b) => {
                      const isCurrent = gameState.coords.x === b.x && gameState.coords.y === b.y;
                      return (
                        <button
                          key={b.id}
                          onClick={() => {
                            if (gameState.activePlotId) return;
                            setGameState((prev) => {
                              const steps = Math.abs(b.x - prev.coords.x) + Math.abs(b.y - prev.coords.y);
                              const newMoves = prev.totalMoves + steps;
                              const partial = {
                                ...prev,
                                coords: { x: b.x, y: b.y },
                                totalMoves: newMoves
                              };
                              return {
                                ...partial,
                                ...checkAndQueuePlots(partial, newMoves, prev.intellect, prev.physical)
                              };
                            });
                            setCurrentInteractionResult(null);
                            triggerToast(`🚀 已微缩爬行跃迁到地标 ${b.name} (${b.x}, ${b.y})`);
                          }}
                          className={`py-2 px-2.5 text-left rounded-xl border text-[11px] transition-all flex flex-col justify-between group cursor-pointer ${
                            isCurrent
                              ? 'bg-indigo-600/30 border-indigo-500 text-white shadow'
                              : 'bg-slate-950/60 border-slate-900 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-[10px] truncate max-w-[85px] text-slate-200 group-hover:text-cyan-300">
                              {b.name}
                            </span>
                            <span className="text-[9px] text-cyan-400 font-mono">
                              {b.x},{b.y}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1 truncate max-w-full">
                            {b.interactionName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Action controller buttons */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                <button
                  id="btn-interact"
                  disabled={!currentBuilding || gameState.activePlotId}
                  onClick={handleInteract}
                  className={`py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition tracking-wider cursor-pointer ${
                    currentBuilding && !gameState.activePlotId
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95'
                      : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <span>⚡</span>
                  <span>{currentBuilding ? `在该地互动：${currentBuilding.interactionName}` : '此格空旷无特殊互动'}</span>
                </button>

                <button
                  id="btn-trigger-story-queue2"
                  onClick={handleLaunchPlotFromQueue}
                  className="py-3 bg-indigo-600 hover:bg-indigo-505 active:scale-95 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 border border-indigo-500 shadow-md relative cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>凝神内心感悟剧情</span>
                  {gameState.pendingPlotQueue.length > 0 && (
                    <span className="absolute -top-1 right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                    </span>
                  )}
                </button>
              </div>

              {/* Core Joystick move control (Aesthetic 4 way direction joypad) */}
              <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex flex-col items-center shrink-0">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 animate-spin duration-8000" />
                  <span>四方向婴儿爬动行走定位摇杆仪器</span>
                </div>
                <div className="relative w-32 h-32 bg-slate-955 rounded-full border border-slate-805 flex items-center justify-center shadow-inner">
                  <button
                    id="joystick-up"
                    onClick={() => handleMove('up')}
                    className="absolute top-1 w-9 h-9 hover:bg-slate-800 rounded-xl flex items-center justify-center text-slate-300 transition-all border border-slate-900 active:bg-indigo-600 active:text-white"
                    title="爬行（上移）"
                  >
                    <ArrowBigUp className="w-5 h-5" />
                  </button>
                  <button
                    id="joystick-left"
                    onClick={() => handleMove('left')}
                    className="absolute left-1 w-9 h-9 hover:bg-slate-800 rounded-xl flex items-center justify-center text-slate-300 transition-all border border-slate-900 active:bg-indigo-600 active:text-white"
                    title="爬行（左移）"
                  >
                    <ArrowBigLeft className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-indigo-400 font-mono shadow-inner border border-indigo-950/60 font-bold">
                    婴儿印
                  </div>
                  <button
                    id="joystick-right"
                    onClick={() => handleMove('right')}
                    className="absolute right-1 w-9 h-9 hover:bg-slate-800 rounded-xl flex items-center justify-center text-slate-300 transition-all border border-slate-900 active:bg-indigo-600 active:text-white"
                    title="爬行（右移）"
                  >
                    <ArrowBigRight className="w-5 h-5" />
                  </button>
                  <button
                    id="joystick-down"
                    onClick={() => handleMove('down')}
                    className="absolute bottom-1 w-9 h-9 hover:bg-slate-800 rounded-xl flex items-center justify-center text-slate-300 transition-all border border-slate-900 active:bg-indigo-600 active:text-white"
                    title="爬行（下移）"
                  >
                    <ArrowBigDown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column (5 Column Wide Tab sections) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Attributes and Talent Level Badge */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3 backdrop-blur-md relative">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{gameState.stage === 'junior_class' ? '幼儿园小班研习核心指标' : '神童潜能与天赋指标'}</span>
            </h4>
            
            <div className="grid grid-cols-3 gap-2.5">
              
              <div className="bg-slate-955/60 p-2.5 rounded-xl border border-slate-850 text-left">
                <span className="text-[10px] text-slate-500 font-bold block">智力 (Intellect)</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <BrainCircuit className="w-4 h-4 text-sky-400" />
                  <span className="text-base font-extrabold font-mono text-sky-200">{gameState.intellect}</span>
                </div>
              </div>

              <div className="bg-slate-955/60 p-2.5 rounded-xl border border-slate-850 text-left">
                <span className="text-[10px] text-slate-500 font-bold block">体能 (Physical)</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Dribbble className="w-4 h-4 text-emerald-400" />
                  <span className="text-base font-extrabold font-mono text-emerald-200">{gameState.physical}</span>
                </div>
              </div>

              {gameState.stage === 'junior_class' ? (
                /* Knowledge Attribute Value */
                <div className="bg-slate-955/60 p-2.5 rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-950/20 to-slate-950 text-left relative">
                  <span className="text-[10px] text-teal-400 font-bold block">知识 (Knowledge)</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
                    <span className="text-base font-black font-mono text-teal-300">{gameState.knowledge}</span>
                  </div>
                  <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                </div>
              ) : (
                /* Talent Attribute Value - Beautiful glowing purple representation */
                <div className="bg-slate-955/60 p-2.5 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-slate-950 text-left relative">
                  <span className="text-[10px] text-purple-400 font-bold block">天赋 (Talent)</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
                    <span className="text-base font-black font-mono text-violet-300">{gameState.talent}</span>
                  </div>
                  <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
                </div>
              )}

            </div>
          </div>

          {/* Multiple Period Control Panel (Stage Countdown block) */}
          {gameState.stage === 'junior_class' ? (
            <div className="bg-gradient-to-b from-teal-950/20 to-slate-900/50 border border-slate-850 p-4 rounded-2xl space-y-3 text-left">
              <div className="flex justify-between items-center border-b border-teal-900/30 pb-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <CalendarDays className="w-4 h-4 text-teal-400 font-bold" />
                  <span>当前学期天数与岁月更替</span>
                </span>
                <span className="text-[10px] text-slate-500">上学满50天并融汇各科通关</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-850/60">
                <div className="flex items-center gap-2.5">
                  <div className="px-2.5 py-1.5 rounded-lg border border-teal-500 bg-teal-950/40 font-bold text-xs text-teal-400">
                    ☀️ {gameState.kindergartenState === 'home' ? '在家温馨中' : gameState.kindergartenState === 'school' ? '幼园求学中' : '公园游戏户外'}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">累计上学修行进度：</div>
                    <p className="text-xs text-slate-200 font-bold font-mono">
                      {gameState.schoolDays} / 50 天
                    </p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end pl-2">
                  <span className="text-[9px] text-slate-400 font-mono">下一课间更替</span>
                  <span className="text-lg font-black font-mono text-amber-400 leading-none mt-0.5">
                    {gameState.periodCountdown}秒
                  </span>
                </div>
              </div>

              <div className="h-1 bg-slate-905 w-full rounded-full overflow-hidden border border-slate-950">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-1000 animate-pulse"
                  style={{ width: `${Math.min(100, ((gameState.schoolDays || 0) / 50) * 100)}%` }}
                />
              </div>

              {/* Dynamic Junior school shortcut events */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    triggerToast('👩 陈老师微笑表示：“高维少年！我们需要累计上学满 50 天，且熟练掌握我们准备的拼音、计算、礼貌、画画等 8 门小班专修知识科目，就能达成全能全优生顺利通关解锁中班哦！”');
                  }}
                  className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>询问老师结业要求</span>
                </button>

                {gameState.kindergartenState === 'home' && (
                  <button
                    type="button"
                    onClick={handleStartCommute}
                    disabled={isCommuting}
                    className={`py-2 px-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition active:scale-95 flex items-center justify-center gap-1 ${isCommuting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span>🎒</span>
                    <span>{isCommuting ? '🏫 正在通勤走路中...' : '走！踏步通勤上学'}</span>
                  </button>
                )}

                {gameState.kindergartenState === 'school' && (
                  <button
                    type="button"
                    onClick={() => handleJuniorStateShift('outdoor')}
                    className="py-2 px-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold rounded-xl text-xs transition active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>🪁</span>
                    <span>走！去公园课外课</span>
                  </button>
                )}

                {gameState.kindergartenState === 'outdoor' && (
                  <button
                    type="button"
                    onClick={() => handleJuniorStateShift('home')}
                    className="py-2 px-3 bg-gradient-to-r from-rose-600 to-red-650 text-slate-950 font-bold rounded-xl text-xs transition active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>🏡</span>
                    <span>领小红花！放学回家</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-indigo-950/20 to-slate-900/50 border border-slate-850 p-4 rounded-2xl space-y-3 text-left">
              
              <div className="flex justify-between items-center border-b border-indigo-900/30 pb-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <CalendarDays className="w-4 h-4 text-indigo-400 font-bold" />
                  <span>当前成长岁月时期轮转</span>
                </span>
                <span className="text-[10px] text-slate-500">当前难度每{getPeriodDuration(gameState.difficulty)}秒更替一次</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/80 border border-slate-850/60">
                
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1.5 rounded-lg border font-bold text-xs ${currentPeriodMeta?.style}`}>
                    {currentPeriodMeta?.name}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">生理轮转状态明细：</div>
                    <p className="text-[10px] text-slate-300 font-medium leading-tight max-w-[170px]">
                      {currentPeriodMeta?.perk}
                    </p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end pl-2">
                  <span className="text-[9px] text-slate-400 font-mono">距离下个时期</span>
                  <span className="text-lg font-black font-mono text-amber-400 leading-none mt-0.5">
                    {gameState.periodCountdown}秒
                  </span>
                </div>

              </div>

              <div className="h-1 bg-slate-905 w-full rounded-full overflow-hidden border border-slate-950">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                  style={{ width: `${(gameState.periodCountdown / getPeriodDuration(gameState.difficulty)) * 100}%` }}
                />
              </div>

              {/* Dynamic Parent Inquiry & Active Move commands actions box */}
              <div className="grid grid-cols-2 gap-2 pt-2.5">
                
                {/* Inquire parents locations button */}
                <button
                  type="button"
                  id="btn-inquire"
                  onClick={() => setShowInquiryModal(true)}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>询问父亲和母亲在哪里</span>
                </button>

                {/* Walk outdoor portal button */}
                <button
                  type="button"
                  id="btn-active-outdoor"
                  onClick={handleActiveOutdoorSearch}
                  className={`py-2 px-2 border rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                    gameState.skills.walk 
                      ? 'bg-gradient-to-br from-purple-700 to-indigo-700 text-white border-purple-500 shadow active:scale-95'
                      : 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed'
                  }`}
                  title={gameState.skills.walk ? '自主走出大门外冒险' : '该功能需要解锁 [走路] 技能'}
                >
                  <span>🚶</span>
                  <span className="truncate">【学会走路】主动出门</span>
                </button>

              </div>
            </div>
          )}

          {/* Current Tasks list */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 shadow-lg flex-1 flex flex-col min-h-[180px]">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5 shrink-0">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>当前人生任务指数系统 ({gameState.tasks.filter(t => t.completed).length}/{gameState.tasks.length})</span>
            </h4>
            
            <div className="space-y-2.5 overflow-y-auto max-h-[220px] pr-1.5 mt-2.5 text-left flex-1">
              {gameState.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-2.5 rounded-xl border text-[11px] space-y-1 transition ${
                    task.completed
                      ? 'bg-emerald-950/15 border-emerald-500/25 text-slate-350'
                      : 'bg-slate-955 border-slate-850 text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className={`font-bold inline ${task.completed ? 'text-emerald-500 line-through' : 'text-slate-100'}`}>
                      {task.title}
                    </span>
                    {task.completed ? (
                      <span className="text-[9px] bg-emerald-950 border border-emerald-900 text-emerald-400 px-1.5 py-0.5 rounded font-bold shrink-0">已掌握</span>
                    ) : (
                      <span className="text-[9px] bg-slate-900 text-indigo-400 border border-slate-800 px-1 py-0.5 rounded shrink-0">发育中</span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-405 leading-normal">{task.description}</p>
                  <p className="text-[10px] text-cyan-400 font-mono">
                    🎁 奖励: {task.rewardText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Special Custom Core Skills / Knowledge subjects panel status (Knowledge Display Box) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2 shrink-0">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-800/60 pb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{gameState.stage === 'junior_class' ? '小班专修 8 门核心功课成果' : '神童系统专精核心能力技能'}</span>
            </h4>
            {gameState.stage === 'junior_class' ? (
              <div className="grid grid-cols-2 gap-1.5 text-xs text-left">
                {[
                  { key: 'knowAlphabet', name: '🔤 拼音字母卡 (Alphabet)', desc: '在在家温馨或幼园故事学习中领悟学成', unlocked: gameState.skills.knowAlphabet },
                  { key: 'knowNumbers', name: '🔢 算术巧算 (Numbers)', desc: '玩积木或算术巧记互动中领悟学成', unlocked: gameState.skills.knowNumbers },
                  { key: 'knowColors', name: '🎨 五彩斑斓 (Colors)', desc: '在幼儿园室内五彩识字中领悟学成', unlocked: gameState.skills.knowColors },
                  { key: 'knowPoliteness', name: '🗣️ 礼貌用语 (Politeness)', desc: '主动在幼园讲文明礼貌中领悟学成', unlocked: gameState.skills.knowPoliteness },
                  { key: 'knowDraw', name: '🖍️ 创意涂鸦 (Creative Draw)', desc: '落叶拼图涂鸦画画中领悟学成', unlocked: gameState.skills.knowDraw },
                  { key: 'knowSing', name: '🎵 稚气儿歌 (Kids Song)', desc: '户外草坪大风车快乐合唱中领悟学成', unlocked: gameState.skills.knowSing },
                  { key: 'knowShare', name: '🍬 快乐分享 (Great Share)', desc: '将好吃饼干水果大方款待小同桌学成', unlocked: gameState.skills.knowShare },
                  { key: 'knowWashHands', name: '🧼 勤洗双手 (Wash Hands)', desc: '勤劳洗净双手科学驱逐病菌学成', unlocked: gameState.skills.knowWashHands },
                ].map((skill) => (
                  <div
                    key={skill.key}
                    className={`p-2 rounded-xl border flex items-start gap-1.5 transition ${
                      skill.unlocked
                        ? 'bg-gradient-to-br from-teal-950/20 to-slate-900 border-teal-500/50 text-slate-100 shadow-sm shadow-teal-500/5'
                        : 'bg-slate-950/40 border-slate-900/60 text-slate-500'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className={`font-bold text-[10px] truncate max-w-[125px] ${skill.unlocked ? 'text-teal-200 font-bold' : 'text-slate-500'}`}>
                        {skill.name}
                      </p>
                      <p className="text-[8px] text-slate-500 leading-tight">
                        {skill.unlocked ? '👌 功课全艺优秀！' : skill.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5 text-xs text-left">
                {[
                  { key: 'crawl', name: '四肢爬行 (Crawl)', icon: '🐢', desc: '在坐标垫 (1,1) 实抓训练中感悟掌握', unlocked: gameState.skills.crawl },
                  { key: 'speak', name: '语言能力 (Speak)', icon: '🗣️', desc: '智力总数达到8点后触发内心经历掌握', unlocked: gameState.skills.speak },
                  { key: 'walk', name: '直立运动 (Walk)', icon: '🚶', desc: '达成体能 15 & 智力 12 解锁核心权限', unlocked: gameState.skills.walk },
                  { key: 'memorize', name: '记忆编织 (Memorize)', icon: '🧠', desc: '去书柜 (5,5) 触发相对论经历掌握', unlocked: gameState.skills.memorize },
                  { key: 'littleRobot', name: '小大人机 (Super AI)', icon: '🤖', desc: '集齐说话、走路与记事变身终极神童', unlocked: gameState.skills.littleRobot },
                ].map((skill) => (
                  <div
                    key={skill.key}
                    className={`p-2 rounded-xl border flex items-start gap-1.5 transition ${
                      skill.unlocked
                        ? 'bg-slate-900 border-indigo-500/50 text-slate-100 shadow-sm shadow-indigo-500/5'
                        : 'bg-slate-950/40 border-slate-900/60 text-slate-500'
                    }`}
                  >
                    <span className={`text-sm ${skill.unlocked ? '' : 'opacity-30 grayscale'}`}>{skill.icon}</span>
                    <div className="space-y-0.5">
                      <p className={`font-bold text-[10px] truncate max-w-[110px] ${skill.unlocked ? 'text-indigo-200' : 'text-slate-550'}`}>
                        {skill.name}
                      </p>
                      <p className="text-[8px] text-slate-500 leading-tight scale-90 origin-left">
                        {skill.unlocked ? '👌 专修领悟完成' : skill.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      {showInquiryModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left">
            
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center shrink-0">
              <h3 className="font-extrabold text-white text-sm md:text-base flex items-center gap-1.5">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <span>询问大人们此时在何方互动</span>
              </h3>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="text-slate-400 hover:text-white font-bold text-xs bg-slate-950 px-2 py-1 rounded"
              >
                关闭雷达
              </button>
            </div>

            <div className="p-5 space-y-4 bg-slate-950/40 leading-relaxed text-xs">
              
              <div className="bg-indigo-950/30 border border-indigo-500/30 p-3.5 rounded-xl space-y-1">
                <div className="font-bold text-indigo-300 flex items-center gap-1">
                  <span>⏰ 当前生命时期:</span>
                  <span className="text-white bg-indigo-900 px-2 py-0.5 rounded text-[10px] font-mono">
                    {parentsAdvice.title}
                  </span>
                </div>
                <p className="text-slate-200 text-xs mt-1.5">
                  {parentsAdvice.text}
                </p>
              </div>

              <div className="bg-amber-950/20 border border-amber-900/30 p-3.5 rounded-xl space-y-1">
                <div className="font-semibold text-amber-400 flex items-center gap-1">
                  <span>💡 专属神童智慧秘笈建议:</span>
                </div>
                <p className="text-slate-300 font-medium">
                  {parentsAdvice.hint}
                </p>
              </div>

              <div className="text-[10px] text-slate-500 mt-2 italic">
                提示: 转世的你虽然还口齿不清只能咿呀作声，但你闪烁的一举一动，都正成为大家密切关注与赞美的焦点！
              </div>

            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setShowInquiryModal(false)}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-xs font-bold transition"
              >
                我已明确方向
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Game Over modal overlay */}
      {!stageVictory && gameState.health <= 0 && gameState.difficulty !== 'easy' && (
        <div className="fixed inset-0 bg-slate-950/98 z-50 flex flex-col items-center justify-center p-6 text-center text-slate-100 backdrop-blur-xl animate-fade-in">
          <div className="max-w-md space-y-6 w-full bg-slate-900 border border-red-500/30 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 animate-pulse" />
            <div className="w-20 h-20 bg-red-950/80 border border-red-500/50 rounded-full flex items-center justify-center mx-auto text-red-500 animate-bounce text-4xl shadow-lg shadow-red-950">
              💀
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white tracking-wide">宿命陨落：神童夭折</h2>
              <p className="text-xs text-rose-400 font-mono tracking-wider uppercase">Life Faded • Stage Infant Failed</p>
            </div>

            <p className="text-slate-300 text-xs md:text-sm leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-850">
              生命的烛火在极度的饥饿饥渴、或是超负荷的激进探险中熄灭了……<br />
              你在尘世的初次生命轮回尚未翻开幼儿篇章，便在摇篮中遗憾闭上双眼。
            </p>

            <div className="grid grid-cols-2 gap-3 text-left font-mono text-xs bg-slate-950 p-3 rounded-xl border border-slate-850/60">
              <div className="text-slate-400">生平岁时: <span className="text-cyan-400 font-bold">{gameState.timeElapsed}s</span></div>
              <div className="text-slate-400">总起步动数: <span className="text-indigo-400 font-bold">{gameState.totalMoves}步</span></div>
              <div className="text-slate-400">智商神力: <span className="text-sky-400 font-bold">{gameState.intellect}</span></div>
              <div className="text-slate-400">培育天赋: <span className="text-violet-400 font-bold">{gameState.talent}/100</span></div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  onExit();
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-500 rounded-2xl font-extrabold text-xs md:text-sm tracking-wider text-white shadow-lg transition border border-red-500 active:scale-95 cursor-pointer"
              >
                🕯️ 重新轮回（回到最初界面）
              </button>
              
              <button
                onClick={() => {
                  try {
                    const storedSavesStr = localStorage.getItem('life_game_saves') || '[]';
                    const storedSaves: GameSaveData[] = JSON.parse(storedSavesStr);
                    if (storedSaves.length > 0) {
                      setGameState(storedSaves[0]);
                      triggerToast('🔮 上次保存的命运已被瞬间编织唤醒！');
                    } else {
                      triggerToast('⚠️ 荒野空空！你没有保存过任何过往的命运存档。');
                    }
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold text-xs tracking-wider text-slate-300 transition border border-slate-700 active:scale-95 cursor-pointer"
              >
                🔮 加载最近的命运存档
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage Victory celebration overlay */}
      {stageVictory && (
        <div className="fixed inset-0 bg-slate-950/98 z-50 flex flex-col items-center justify-center p-6 text-center text-slate-100 backdrop-blur-xl animate-fade-in overflow-y-auto">
          {/* Top-Left Back Button for absolute easy access */}
          <button
            id="btn-victory-back-topleft"
            onClick={() => {
              try {
                localStorage.setItem('stage_infant_completed', 'true');
                if (gameState.stage === 'junior_class') {
                  localStorage.setItem('stage_junior_completed', 'true');
                }
              } catch (e) {
                console.error(e);
              }
              onExit();
            }}
            className="absolute top-6 left-6 z-50 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl border border-slate-800/80 transition-all font-black text-xs flex items-center gap-2 cursor-pointer shadow-xl active:scale-95 shadow-slate-950/50"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>返回主菜单 (解锁幼儿期)</span>
          </button>

          <div className="max-w-lg space-y-6 w-full bg-slate-900 border border-emerald-500/30 p-8 rounded-3xl shadow-2xl relative overflow-hidden animate-scale-up my-auto">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 animate-pulse" />
            
            <div className="w-24 h-24 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce text-5xl shadow-lg shadow-emerald-950">
              👑
            </div>

            {gameState.stage === 'junior_class' ? (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 tracking-wide">
                    萌芽成长 • 幼儿园小班完美毕业！
                  </h2>
                  <p className="text-xs text-emerald-400 font-mono tracking-wider uppercase">Stage Junior Class Completed • Preschool Breakthrough</p>
                </div>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed bg-slate-950/80 p-5 rounded-2xl border border-slate-850">
                  你成功度过了 50 个充实的上学天数，学完了数学计算、拼音、色彩、社交礼貌与洗手规范！<br />
                  陈老师亲手为你戴上了“终极天才小红花”！你在老师和全班萌娃惊佩声中，傲然登上了全镇小班毕业领奖台。
                </p>

                <div className="grid grid-cols-2 gap-4 text-left font-mono text-xs md:text-sm bg-slate-950 p-4 rounded-xl border border-slate-850/60 font-mono">
                  <div className="text-slate-400">总求学历程: <span className="text-cyan-400 font-bold">{gameState.timeElapsed}秒</span></div>
                  <div className="text-slate-400">累计上学天数: <span className="text-emerald-400 font-bold">{gameState.schoolDays}天</span></div>
                  <div className="text-slate-400">终极高维智力: <span className="text-sky-400 font-bold">{gameState.intellect}</span></div>
                  <div className="text-slate-400">综合研习知识: <span className="text-teal-400 font-bold">{gameState.knowledge}/100</span></div>
                </div>

                <div className="p-4 bg-emerald-950/20 border border-emerald-905/30 rounded-2xl text-xs text-emerald-300 space-y-1">
                  <div className="font-extrabold flex items-center gap-1 justify-center">
                    <span>🎒 已解锁更高班级：</span>
                    <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black scale-90">中班级 (Middle Class)</span>
                  </div>
                  <p className="text-emerald-400/85 text-[11px] leading-relaxed">
                    由于萌芽学校中班、大班级仍然处于园舍扩充与师资引进中，暂未开放体验噢。<br />
                    请继续保持结业勋章，期待在下一次大版图课业中相遇！
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 tracking-wide">
                    初生极境 • 婴儿期完美通关！
                  </h2>
                  <p className="text-xs text-amber-400 font-mono tracking-wider uppercase">Stage Infant Completed • Breakthrough Accomplished</p>
                </div>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed bg-slate-950/80 p-5 rounded-2xl border border-slate-850">
                  历经千磨万击，你学会了说话、爬行、记事，甚至达成了傲人的直立行走！<br />
                  你用前世的高维心智降维碾压整座社区，天赋累积突破，正式褪去了裹紧在身的襁褓！
                </p>

                <div className="grid grid-cols-2 gap-4 text-left font-mono text-xs md:text-sm bg-slate-950 p-4 rounded-xl border border-slate-850/60 font-mono">
                  <div className="text-slate-400">总岁月时长: <span className="text-cyan-400 font-bold">{gameState.timeElapsed}秒</span></div>
                  <div className="text-slate-400">终极智商值: <span className="text-sky-400 font-bold">{gameState.intellect}</span></div>
                  <div className="text-slate-400">终极体力值: <span className="text-emerald-400 font-bold">{gameState.physical}</span></div>
                  <div className="text-slate-400">圆满天赋度: <span className="text-purple-450 font-bold">{gameState.talent}/100</span></div>
                </div>

                <div className="p-4 bg-yellow-950/20 border border-yellow-905/30 rounded-2xl text-xs text-yellow-300 space-y-1">
                  <div className="font-extrabold flex items-center gap-1 justify-center">
                    <span>🍀 已开启幼儿期专属分支：</span>
                    <span className="bg-yellow-500 text-slate-950 px-2 py-0.5 rounded font-black scale-90">萌芽学校小班级 (Junior Class)</span>
                  </div>
                  <p className="text-yellow-400/80 text-[11px] leading-relaxed">
                    点击下方完成，即可回到主菜单，亲自解锁幼儿期分支大线哦！
                  </p>
                </div>
              </>
            )}

            <div className="flex flex-col gap-3">
              <button
                id="btn-completion-ok"
                onClick={() => {
                  try {
                    localStorage.setItem('stage_infant_completed', 'true');
                    if (gameState.stage === 'junior_class') {
                      localStorage.setItem('stage_junior_completed', 'true');
                    }
                  } catch (e) {
                    console.error(e);
                  }
                  onExit();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-450 hover:via-teal-450 hover:to-cyan-450 rounded-2xl font-black text-sm tracking-widest text-slate-950 shadow-xl shadow-emerald-950/30 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>确定（返回主菜单，解锁幼儿阶段）</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
