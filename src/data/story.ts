/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Building, Plot, GameTask } from '../types';

export const BUILDINGS: Building[] = [
  // --- INDOOR AREA (0-5, 0-5) ---
  {
    id: 'crib',
    name: '豪华宝宝婴儿床',
    x: 0,
    y: 0,
    description: '你人生的温床起点。躺在这里不仅安全温馨，还能深度冥想、恢复大量体能，阻断外界喧闹困扰。',
    interactionName: '小憩安睡',
    interactResult: '你在温暖的蚕丝婴儿被里熟睡了一觉。感到体魄舒畅，体力恢复了 15 点，但随着代谢流逝，肚子也感到微饿。'
  },
  {
    id: 'moms_arms',
    name: '妈妈的温暖怀抱',
    x: 0,
    y: 2,
    description: '洋溢着母爱与栀子花芬芳的绝对安全区。这里能够最大程度地慰藉一个转世婴儿的灵魂。',
    interactionName: '撒娇咿呀讨奶喝',
    interactResult: '妈妈把你抱入怀中哼起摇篮曲：“肚子饿了对不对？” 饱饱喝足母乳！饥饿与饥渴度加满，天赋属性 +1 点！'
  },
  {
    id: 'living_mat',
    name: '拼图隔音防撞爬行垫',
    x: 1,
    y: 1,
    description: '印满丰富动植物图案的多色环保垫，是锻炼四肢爬行和支撑反射的魔鬼特训场。',
    interactionName: '极速爬行挥汗如雨',
    interactResult: '你伏下身体像猎豹般快速梭行。虽然肚子饿得慌，但体能得到空前提升！体力 +4，智力 +1，饥饿度 -6。'
  },
  {
    id: 'toy_box',
    name: '散落的城堡积木箱',
    x: 2,
    y: 0,
    description: '装满手工榉木数字积木的宝箱。堆叠它们需要强大的微操能力和空间想象力。',
    interactionName: '搭建高难度跨海大桥',
    interactResult: '你用粉嫩的小手将一块块不规则积木精准堆叠。老爸在旁看得满头大汗。智力 +3，天赋属性 +2，饥渴度 -4。'
  },
  {
    id: 'sunny_balcony',
    name: '阳光大阳台',
    x: 3,
    y: 3,
    description: '宽大的落地安全网阳台，外界的微风夹杂着花草树木香气。偶尔可以看见空中的飞鸟。',
    interactionName: '负手而立思考宏图',
    interactResult: '你扶着护栏望着远处的大楼，像个大哲学家。你默默感悟着前世的人情世故。智力 +4，天赋属性 +3。'
  },
  {
    id: 'tv_area',
    name: '客厅电视背景墙',
    x: 4,
    y: 1,
    description: '放着高分贝洗脑神曲《拔萝卜》、《两只老虎》的巨大黑屏。对初醒的婴儿神经是一次次洗礼。',
    interactionName: '聚精会神破解旋律',
    interactResult: '你双眼一动不动凝视彩色画面，从嘈杂的音调中迅速剔除杂音学习人声规律。智力 +3，体能 -1，语言天赋暴涨！'
  },
  {
    id: 'bookshelf',
    name: '爸爸的大书架',
    x: 5,
    y: 5,
    description: '堆满量子物理学、软件设计等厚厚学术著作的书架。对于超凡婴儿来说这才是人世间最好玩的宝库。',
    interactionName: '强行翻阅量子力学',
    interactResult: '你费力拨开一本厚厚原理图，全神贯注阅读。老爸在旁瑟瑟发抖。智商大爆炸！智力 +6，心智激增，饥渴度 -10。'
  },
  {
    id: 'bathroom',
    name: '滑溜溜的洗手间门槛',
    x: 2,
    y: 4,
    description: '会发出奇妙抽水声和彩虹泡泡的地方，充盈着肥皂和松木香味，略带探险的危险。',
    interactionName: '探索水龙头泡泡',
    interactResult: '你刚伸出肥手探入里面企图玩转抽水马桶，便被惊呼的老爸当场抱回：“小家伙，这可不能吃啊！”体力 +3。'
  },

  // --- OUTDOOR AREA (10-15, 10-15) - Walking skill required! ---
  {
    id: 'community_park',
    name: '社区音乐中央公园',
    x: 10,
    y: 10,
    description: '种满栀子花与古老橡树的绿地公园。长椅上有行人在用萨克斯吹奏着低沉悠扬的音浪，微风徐徐。',
    interactionName: '聆听萨克斯爵士乐',
    interactResult: '你站在摇曳的雏菊旁闭目倾听乐曲。脑中的声乐细胞全面觉醒，领悟了艺术的奥秘！智力 +5，天赋属性 +4，体能 +2。'
  },
  {
    id: 'candy_store',
    name: '阳光温馨杂货小卖部',
    x: 11,
    y: 12,
    description: '玻璃罐子里盛满缤纷彩虹糖、棒棒糖、奶片。这是孩子们眼里神圣的最高殿堂。',
    interactionName: '视察辅食与口琴',
    interactResult: '老板娘捏捏你的胖脸，大赞：“这孩子眼睛真亮，长大必成大器！”并塞给你一颗温和果蓉。饥饿度 +20，智力 +3。'
  },
  {
    id: 'carousel_playground',
    name: '摇摇木马沙坑游乐场',
    x: 13,
    y: 10,
    description: '细白如雪的沙坑，放着各式各样明黄色的塑料小木马和铲子，许多熊孩子正玩得不亦乐乎。',
    interactionName: '乘骑弹簧小木马',
    interactResult: '你跨上弹簧小木马，随着节律疯狂前后摇摆，平衡感得到神级特训！体能 +6，天赋属性 +3，体力消耗 4 点。'
  },
  {
    id: 'stray_pets_shelter',
    name: '宠物猫狗快乐流浪站',
    x: 12,
    y: 14,
    description: '几只毛绒绒的流浪猫和一只歪头大金毛正在阳光里抓蝴蝶，尾巴摇得像风扇一样。',
    interactionName: '尝试与大金毛跨物种对话',
    interactResult: '你发出了‘嗷呜、巴布’的奇特叫声。大金毛愣住了，随后开心地疯狂舔你的手。你与自然产生羁绊。体能 +5，智力 +4。'
  },
  {
    id: 'nursery_school',
    name: '社区启智幼儿园托管所',
    x: 15,
    y: 15,
    description: '围墙上涂满手绘卡通星空的大教室内。放着许多十阶魔方、儿童数独和各种高档智力拼盘。',
    interactionName: '速叠十阶超常拼图',
    interactResult: '在老师和一群大龄幼儿围观下，你气定神闲地将碎片瞬秒拼好。全场震惊！智力 +10，天赋属性 +6，体能减 5。'
  }
];

export const INITIAL_TASKS: GameTask[] = [
  {
    id: 'task_crawl',
    title: '【翻滚吧，宝贝】学会四肢爬行',
    description: '移动到坐标 (1, 1) 的拼图隔音防撞爬行垫，进行一次 “极速爬行挥汗如雨” 互动。',
    type: 'interact',
    target: 'living_mat',
    completed: false,
    rewardText: '解锁“爬行”技能，提升大地图上的移動效率，体能 +10，天赋 +2！'
  },
  {
    id: 'task_speak',
    title: '【咿呀初声】脑域神童发声学习',
    description: '通过阳台深思、电视背景墙等脑力训练，使你的“智力”达成 8 点。',
    type: 'stat_increase',
    target: 'intellect',
    completed: false,
    rewardText: '解锁“说话”技能！打破不能出声限制，与大人沟通，天赋额外加成 3 点。'
  },
  {
    id: 'task_memorize',
    title: '【脑域突破】翻阅物理书大冒险',
    description: '移动到 坐标 (5, 5) 的爸爸的大书架，进行一次 “强行翻阅量子力学” 的深度互动。',
    type: 'interact',
    target: 'bookshelf',
    completed: false,
    rewardText: '解锁“记事”功能，智商大爆发，获得 +10 智力并提升 +5 点天赋！'
  },
  {
    id: 'task_walk',
    title: '【直立觉醒】摆脱泥泞，学会走路',
    description: '需要依靠反复锻炼积累体魄，使你的 体能 达到 15 点，且 智力 达到 12 点。',
    type: 'stat_increase',
    target: 'walk_requirement',
    completed: false,
    rewardText: '解锁“走路”核心主动权！获得“主动出门”去广阔户外世界探索的能力，体力上限大增！'
  },
  {
    id: 'task_robot',
    title: '【神童成圣】解锁终极“小大人机”',
    description: '使自己的心智、谈话与运动全部发育：同时集齐 说话、记事、走路 三大能力。',
    type: 'skill_unlock',
    target: 'all_needed',
    completed: false,
    rewardText: '解锁至高“小大人机”技能！神童美名享誉社区，天赋属性直接增益 15 点！'
  },
  {
    id: 'task_play_toy',
    title: '【积木宗师】高阶城堡挑战',
    description: '前往 坐标 (2, 0) 积木箱堆叠积木，使你的“天赋属性值”突破并超过 5 点。',
    type: 'talent_increase',
    target: 'talent_5',
    completed: false,
    rewardText: '获得 4 点智力加成，拼图技艺小幅上涨，大人惊奇不已。'
  },
  {
    id: 'task_watch_tv',
    title: '【电波吸收】艺术细胞培育',
    description: '前往 坐标 (4, 1) 的电视背景墙看儿歌吸收知识，智力总值突破 15 点。',
    type: 'stat_increase',
    target: 'intellect_15',
    completed: false,
    rewardText: '语言底蕴突飞猛进，天赋 +3 点，额外解锁一段神秘前世回忆。'
  },
  {
    id: 'task_explore_balcony',
    title: '【广阔天地】俯瞰窗外喧闹繁华',
    description: '移动到 坐标 (3, 3) 阳台进行 1 次“负手而立思考宏图”的深入冥想。',
    type: 'interact',
    target: 'sunny_balcony',
    completed: false,
    rewardText: '视野开拓，心境获得极大升华。体能 +3，天赋 +2！'
  },
  {
    id: 'task_talent_15',
    title: '【天纵奇才】天赋异禀的造诣',
    description: '通过各种困难历练或者主线选择，将你的“天赋属性值”培育至 15 点。',
    type: 'talent_increase',
    target: 'talent_15',
    completed: false,
    rewardText: '限制解除，大人们的夸赞纷至沓来，体能 +10 智力 +10。'
  },
  {
    id: 'task_outdoor_music',
    title: '【户外大赏】聆听长椅上的艺术萨克斯',
    description: '解锁走路后进入户外状态，前往 坐标 (10, 10) 公园进行 1 次萨克斯吹奏互动。',
    type: 'interact',
    target: 'community_park',
    completed: false,
    rewardText: '声乐洗礼，脑波得到二次进化！智力 +10，天赋 +5！'
  },
  {
    id: 'task_outdoor_pets',
    title: '【万物之灵】跨物种大金毛友谊',
    description: '在会走路的前提下前往户外 坐标 (12, 14) 的流浪站，与大金毛跨物种闲聊。',
    type: 'interact',
    target: 'stray_pets_shelter',
    completed: false,
    rewardText: '动物好感度加倍，浑身沾满狗毛但是精神抖擞。体能 +8，天赋 +3。'
  },
  {
    id: 'task_outdoor_candy',
    title: '【糖衣炮弹】杂货小卖部视察',
    description: '依靠学会走路前往 坐标 (11, 12) 温氏小卖部视察，和老板娘愉快对话。',
    type: 'interact',
    target: 'candy_store',
    completed: false,
    rewardText: '奶糖管够，饥饿、饥渴危机大幅消除，大吃大喝提升幸福感。'
  },
  {
    id: 'task_outdoor_nursery',
    title: '【幼儿园征服者】速通十阶拼盘',
    description: '克服千难万阻移动到户外最远哨点 坐标 (15, 15) 的幼儿园并进行一次霸气互动。',
    type: 'interact',
    target: 'nursery_school',
    completed: false,
    rewardText: '成为该托管所最强神话宝宝，所有教师叹为观止。智力直接 +15，天赋 +8！'
  },
  {
    id: 'task_healthy_infant',
    title: '【生命堡垒】金刚不坏童子功',
    description: '在非简单模式下抵御虚弱，使你的生命值维持在 95% 以上，且体能达到 18 点 (简单模式自动完成)。',
    type: 'stat_increase',
    target: 'healthy_infant',
    completed: false,
    rewardText: '身体抵抗力大增，体能 +6，智力 +4！'
  },
  {
    id: 'task_talent_50',
    title: '【觉醒金身】傲世天赋境界破凡',
    description: '通过各种日常挑战与高级探险抉择，使你的「天赋属性值」累积达到 50 点。',
    type: 'talent_increase',
    target: 'talent_50',
    completed: false,
    rewardText: '激活【神童破关】天命，为进阶至下一阶段（幼儿期）做好铺垫！'
  }
];

export const PLOTS: Record<string, Plot> = {
  // === SYSTEM AUTO PLOTS ===
  intro: {
    id: 'intro',
    title: '生而为人：初诞尘世',
    triggerCondition: 'start',
    dialogues: [
      { speaker: '旁白', text: '在无尽的黑暗与漫长的漂浮感后，迎面而来的是刺眼的亮光和陌生的冰冷……' },
      { speaker: '神秘女声', text: '“用力！夫人！已经看到孩子的头了！加油！”' },
      { speaker: '心声 (前世记忆)', text: '等等……我怎么不能呼吸？这里是什么地方？我是谁？难道我不是在电脑前加班的高级软件工程师吗？！' },
      { speaker: '医生', text: '“哇——哇——” 一阵清脆宏亮的啼哭声响彻产房！' },
      { speaker: '医生', text: '“生出来了！恭喜顾先生，顾夫人！是个非常强壮、健康的男孩子！”' },
      { speaker: '父亲', text: '“太好了……太好了！老婆你辛苦了！快让我看看，这孩子眼睛滴溜溜转，好像在打量我们呢！”' },
      { speaker: '母亲 (虚弱)', text: '“阿顾，把宝宝抱过来……让妈妈亲亲。孩子，欢迎来到这个世界上，妈妈会保护你一辈子。”' },
      { speaker: '心声 (前世记忆)', text: '看着眼前这对满眼都是温存和泪水的年轻夫妇。好吧……看来我带着前世的全部记忆降生了。' },
      { speaker: '旁白', text: '带着前世的成熟思维，作为小小婴儿的非凡霸气人生，正式启航！' }
    ]
  },
  move_3: {
    id: 'move_3',
    title: '动用四肢：寻找地心引力',
    triggerCondition: 'move_3',
    dialogues: [
      { speaker: '旁白', text: '在婴儿床上躺了几天的你，开始试着活动自己娇弱的小胳膊小腿。' },
      { speaker: '父亲', text: '“小雨快看！咱们家胖儿子居然会撑着胳膊翻身了！你看他，腿蹬得哼哧哼哧的！”' },
      { speaker: '母亲', text: '“真的耶！他居然还在盯着我笑，这小腿太有劲了。是不是想叫妈妈抱呀？”' },
      { speaker: '心声', text: '我只是想起个身……怎么这身体像灌了铅一样重。作为前世资深极客，我必须通过运动逆向工程重塑这具婴儿躯体！重力，开始被我适应了！' }
    ]
  },
  intellect_8: {
    id: 'intellect_8',
    title: '神童的初步发育',
    triggerCondition: 'intellect_8',
    dialogues: [
      { speaker: '旁白', text: '随着你不断观察天花板上的吊灯、电视里的声音以及周围的物品，你的脑域得到了飞跃性的成长。' },
      { speaker: '父亲', text: '“宝宝，叫爸——爸——！来，跟着爸爸发音：‘Ba-ba’。”' },
      { speaker: '心声', text: '天哪，老爸每天都要对着我重复几十遍这个词，我都快被脑补了。要不要开口敷衍他一下？算了，顺应婴儿的声带振动，发个低频音出来吧。' },
      { speaker: '你', text: '“咿……呀……叭……叭！”' },
      { speaker: '父亲', text: '“老婆老婆！！！你快从厨房出来啊！！！孩子叫我了！孩子刚才绝对叫爸爸了！神童！绝对是神童！”' },
      { speaker: '母亲', text: '“哎呀，他那是无意识地吐泡泡啦，瞅把你高兴的。”' },
      { speaker: '旁白', text: '这一声咿呀让你掌握了发音的奇妙共振！你成功解锁了“说话”技能！' }
    ],
    unlockedSkill: 'speak'
  },
  walk_trigger: {
    id: 'walk_trigger',
    title: '颤抖吧双足！直立行走的奇迹',
    triggerCondition: 'stat_walk_unlocked',
    dialogues: [
      { speaker: '旁白', text: '当你站在柔软的客厅垫边缘，你突然松开了双手。' },
      { speaker: '心声', text: '一直用膝盖在地上摩擦太没面子了……现在有积累的惊人体能和睿智心智，是时候尝试克服人类的直立平衡痛点了！' },
      { speaker: '母亲', text: '“老公快来啊！快！摄像机录频！宝宝……宝宝正在试着不扶沙发站着！”' },
      { speaker: '旁白', text: '两秒，五秒，你的双腿虽然在颤抖，但极其平稳！然后你迈出了第一步……第二步……！' },
      { speaker: '父亲', text: '“神迹！九个月大的宝宝居然直接走得这么稳，连摇晃都没有！我们要上电视了！”' },
      { speaker: '旁白', text: '你大摇大摆地在客厅里走了几圈，顺利完成了“学会走路”的任务！解锁了“走路”技能！' }
    ],
    unlockedSkill: 'walk'
  },

  // === INDOOR LANDMARK PLOTS ===

  // 1. Crib Trigger (床)
  crib_trigger: {
    id: 'crib_trigger',
    title: '婴儿床上的宇宙奇点感悟',
    triggerCondition: 'interact_crib',
    dialogues: [
      { speaker: '旁白', text: '你静静地躺在纯棉豪华婴儿床里，周围挂着用马卡龙色塑料做成的旋转星体玩具。' },
      { speaker: '心声', text: '以前我加班到凌晨三点的时候，最渴望的就是一张两米的大床。现在躺在这个一米的小木栏里，居然感到灵魂如此纯粹……' },
      { speaker: '心声', text: '在这无聊的平躺时光里，我该如何打发我那已经开始高速运转的CPU级大脑？' }
    ],
    choices: [
      {
        text: '闭目深度睡眠，冻结体能流失（务实休整）',
        nextPlotId: 'crib_sleep',
        effects: { physical: 6, hunger: 2 }
      },
      {
        text: '盯着旋转塑料星星，计算三体问题轨道参数（脑补重构）',
        nextPlotId: 'crib_genius',
        effects: { intellect: 5, talent: 3, hunger: -8 }
      }
    ]
  },
  crib_sleep: {
    id: 'crib_sleep',
    title: '婴儿般香甜的无意识睡眠',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '你发出微弱的、带着奶香的呼噜声，让刚走过床边的妈妈忍不住温柔地掖了掖被角。' },
      { speaker: '心声', text: '无忧无虑的生物学睡眠是最棒的能量充电池。今生，我不再掉头发！' }
    ]
  },
  crib_genius: {
    id: 'crib_genius',
    title: '宇宙运行公式在襁褓中重现',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '心声', text: '当微风吹动那个旋转吊饰，以牛顿经典力学代入，它的偏角阻尼和引力扰动……太美妙了。' },
      { speaker: '旁白', text: '你圆溜溜的眼睛一动不动地追随指针。你对多维物理规律产生了一层奇妙的感悟！智力+5，天赋+3！' }
    ]
  },

  // 2. Moms Arms Trigger (妈妈怀抱)
  moms_arms_trigger: {
    id: 'moms_arms_trigger',
    title: '母爱的引力波束缚',
    triggerCondition: 'interact_moms_arms',
    dialogues: [
      { speaker: '旁白', text: '妈妈小心翼翼地托好你的脊椎，把你贴在她温暖的心口处。栀子花的洗护香气伴随着乳香。' },
      { speaker: '母亲', text: '“小宝贝，来，喝肚饱饱，喝完快快长大哦……”' },
      { speaker: '心声', text: '前世为了应付客户和高利贷，我的肠胃早就千疮百孔。今生，这高纯度无污染的纯人乳果真是大自然中最顶级的活性蛋白营养剂！' }
    ],
    choices: [
      {
        text: '欢快地捧住奶瓶大喝特喝，发出“巴布巴布”的满足声',
        nextPlotId: 'moms_arms_eat',
        effects: { hunger: 40, thirst: 45, physical: 5 }
      },
      {
        text: '喝完后用清澈无比的大眼睛深深凝视她，发出最亲近的短促和声',
        nextPlotId: 'moms_arms_love',
        effects: { intellect: 4, talent: 4, hunger: 25 }
      }
    ]
  },
  moms_arms_eat: {
    id: 'moms_arms_eat',
    title: '胃部的高能量聚变',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '母亲', text: '“咯咯咯，这小家伙，喝得满嘴都是，慢点慢点。”' },
      { speaker: '心声', text: '满足！前世因为天天点廉价外卖造成的胃酸倒流，在这纯净的母乳洗礼下，感觉胃粘膜正在发生超高规格的自我修复！' }
    ]
  },
  moms_arms_love: {
    id: 'moms_arms_love',
    title: '超越血缘的心灵默契',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '母亲', text: '“阿顾，快来看呀，咱们孩子刚才盯着我笑的样子，简直就像是能听懂我在叫他一样，那眼神好深邃啊！”' },
      { speaker: '心声', text: '谢谢你迎接我不凡的降生，妈妈。这世界虽然冷漠，但这里有绝尘而亲切的灯火。' },
      { speaker: '旁白', text: '你在亲情激荡下，神童天赋得到了升华式进化！天赋大幅提升！' }
    ]
  },

  // 3. Living Mat Trigger (防撞垫)
  living_mat_trigger: {
    id: 'living_mat_trigger',
    title: '地表最强爬行训练计划',
    triggerCondition: 'interact_living_mat',
    dialogues: [
      { speaker: '旁白', text: '你伏在红绿相间的防撞垫中央，这里散落着几只卡通小牙咬和橡胶塑料震铃。' },
      { speaker: '心声', text: '为了能尽早直立行走并离开这栋屋子，进行户外勘测，我必须像特种兵训练那样，打通肢体的每一根运动神经元！' }
    ],
    choices: [
      {
        text: '开启高频率四肢波浪式匍匐滑行（肌肉强化模式）',
        nextPlotId: 'living_mat_crawl',
        effects: { physical: 6, hunger: -8 }
      },
      {
        text: '静下心来识记垫子上印刷的26个英文字母和动物图样',
        nextPlotId: 'living_mat_study',
        effects: { intellect: 4, talent: 2 }
      }
    ]
  },
  living_mat_crawl: {
    id: 'living_mat_crawl',
    title: '特种兵般的草泥爬。突进！',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '父亲', text: '“天哪老婆！你看咱们家娃这爬行姿势！别人家的孩子是像虫子一样蠕动，他居然双手交替、核心收紧，像在泥潭里滑行的海军陆战队！”' },
      { speaker: '心声', text: '呵呵，前世在体测 1000 米中垫底的痛，今生绝对不可能再上演。体能得到了惊人精进！' }
    ]
  },
  living_mat_study: {
    id: 'living_mat_study',
    title: '婴儿降维识记看图说话',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '心声', text: '“A is for Apple, B is for Bear……”虽然印刷图案极其幼齿，但正好可以让我熟悉这个平行世界的文字基础信息。' },
      { speaker: '旁白', text: '你用粉嫩的手指划着一个个字母，在脑中编织出了全新的语言库学识。智力+4！' }
    ]
  },

  // 4. Toy Box Trigger (积木)
  toy_box_trigger: {
    id: 'toy_box_trigger',
    title: '积木箱旁的空间几何学',
    triggerCondition: 'interact_toy_box',
    dialogues: [
      { speaker: '旁白', text: '大积木玩具箱里堆着几百块五颜十色的实木几何块。' },
      { speaker: '心声', text: '大人们总以为把积木重叠起来只属于三岁幼儿。哼，看我用它们构造出一个完美的二叉查找树和悬挑平衡天平！' }
    ],
    choices: [
      {
        text: '利用重心平移法，堆叠一座“倒三角形高架悬崖”',
        nextPlotId: 'toy_box_architect',
        effects: { talent: 5, intellect: 3, hunger: -5 }
      },
      {
        text: '将长方形实木块当做敲击乐器，哼唱起前世舒伯特小夜曲',
        nextPlotId: 'toy_box_music',
        effects: { talent: 4, intellect: 4 }
      }
    ]
  },
  toy_box_architect: {
    id: 'toy_box_architect',
    title: '物理力学的奇迹堡垒',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '父亲', text: '“不可能……这不可能！他居然把最细薄的圆柱块摆在最下面，撑起了上面厚重的大跨度梯形梁？这完全不符合普通婴儿的无序思维，这一定是力学天才！”' },
      { speaker: '心声', text: '稍微计算了一下悬挑端的偏心矩罢了，看把老爹吓得，大呼小叫的……' }
    ]
  },
  toy_box_music: {
    id: 'toy_box_music',
    title: '实木棒上的音乐交响诗',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '你的胖胖小手敲击发出“叮！梆！当！”的木质撞击清响，节律精密到了毫秒级别。' },
      { speaker: '母亲', text: '“阿顾，你听这声音……怎么怪好听的？这调子好像有点肖邦的前奏曲色彩，一定是咱们儿子的乐感开悟了！”' },
      { speaker: '心声', text: '木质声带的音区有限，但这不影响我抒发胸中的旷世旋律。语言和才华技能再次大增！' }
    ]
  },

  // 5. Sunny Balcony Trigger (阳台)
  sunny_balcony_trigger: {
    id: 'sunny_balcony_trigger',
    title: '高空阳台的哲学沉思',
    triggerCondition: 'interact_sunny_balcony',
    dialogues: [
      { speaker: '旁白', text: '温暖的日光洒在你粉嘟嘟的脸颊上。你趴着金刚安全纱网向下俯瞰社区的花台。' },
      { speaker: '心声', text: '十七楼的高度，外界吹拂着清新的柳树花香。望着外面如蚂蚁般移动的行人和汽车，他们每个人都在为生活的洪流拼搏。' },
      { speaker: '心声', text: '在这一重人生的轮回中，我到底要掀起怎样的惊涛骇浪，才不枉此生重来？' }
    ],
    choices: [
      {
        text: '背手在身后，盯着夕阳做出沉浮天下的宏图叹息',
        nextPlotId: 'sunny_balcony_philosophic',
        effects: { intellect: 5, talent: 3 }
      },
      {
        text: '极目练习眺望远方驶离的公交车牌上的文字（锻炼裸眼视力）',
        nextPlotId: 'sunny_balcony_sight',
        effects: { physical: 4, intellect: 3 }
      }
    ]
  },
  sunny_balcony_philosophic: {
    id: 'sunny_balcony_philosophic',
    title: '十七楼的夕阳背影杀手',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '父亲', text: '“老婆快看阳台……咱们家儿子怎么负手而立，身姿挺拔，望着斜阳深深叹气？我特么怎么在咱们九个月大的娃身上，看到了乔布斯当年审视硅谷的孤独身影？！”' },
      { speaker: '母亲', text: '“神经病呀你，他肯定是用力太猛裤裆湿了不舒服，快去抱他！”' },
      { speaker: '心声', text: '咳咳，我的雄图霸业差点被尿不湿打败了……' }
    ]
  },
  sunny_balcony_sight: {
    id: 'sunny_balcony_sight',
    title: '写实视神经回路重置力',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '通过有意识地控制眼部括约肌和调整睫状肌焦点，你竟然看清了300米外车牌号。' },
      { speaker: '心声', text: '很好，今生摆脱电脑蓝光眼镜的诅咒了。极好的视神经发育为我以后开发超脑打下了无暇物理骨架！' }
    ]
  },

  // 6. TV Area Trigger (电视)
  tv_area_trigger: {
    id: 'tv_area_trigger',
    title: '从洗脑儿歌中解码文明信息',
    triggerCondition: 'interact_tv_area',
    dialogues: [
      { speaker: '旁白', text: '大液晶电视上正在播放高饱和度、高频轰炸的儿童益智乐曲《拔萝卜》、《两只老虎》。' },
      { speaker: '心声', text: '这糟糕的五声调式、高声部合成器噪音以及反复重复。等等！这反复规律的声波波段……不正好提供给我对原生中文底层语法重构的最佳语料库吗？！' }
    ],
    choices: [
      {
        text: '用耳朵提取人声共鸣声带变化，尝试跟唱“拔……萝卜！”',
        nextPlotId: 'tv_area_speak_up',
        effects: { intellect: 4, talent: 4, thirst: -8 }
      },
      {
        text: '开启白眼嫌弃模式，试图在内心给儿歌做交响乐重配器',
        nextPlotId: 'tv_area_orchestra',
        effects: { intellect: 5, talent: 1 }
      },
      {
        text: '咬着露出的插头电线，强行用牙齿咬合绝缘皮，企图通过电刺激来扩增脑电波（危险电弧，极高风险）',
        nextPlotId: 'tv_shock',
        effects: { health: -30, intellect: 15, talent: 10 }
      }
    ]
  },
  tv_shock: {
    id: 'tv_shock',
    title: '噼里啪啦！电离子舌尖淬炼',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '你一口含咬上暴露电线，“刺啦！”一股强劲、刺痛、酥麻的微弱电弧穿透你的白嫩牙龈，舌尖立刻红肿焦麻！' },
      { speaker: '心声', text: '唔啊啊啊！电网的220V交变电信号对原生神经元的一场洗劫！虽然电突触放电极大激活了我的部分前额叶智商，但肉体也遭受到了明显的灼伤与瘫软，生命值告急！' },
      { speaker: '父亲', text: '“天啊！！儿子你怎么把脑袋伸到电视电源背后啃铜线？！老天快拔下插头！快用纱布吹吹舌头，我的天才儿啊！”' }
    ]
  },
  tv_area_speak_up: {
    id: 'tv_area_speak_up',
    title: '声乐共鸣第一次声能释放',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '你', text: '“呗……罗……喔！！啵啵！！”' },
      { speaker: '母亲', text: '“老公！！听见了没！！咱小不点居然跟着电视机的声音拼出了相同的节奏！！他太想和人说话了！”' },
      { speaker: '心声', text: '快了，等我的肺活量和舌肌发育完全，我就能在这帮大龄儿童面前背诵圆周率和鲁迅散文！' }
    ]
  },
  tv_area_orchestra: {
    id: 'tv_area_orchestra',
    title: '脑内终极巴洛克交响重合',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '心声', text: '“拔萝卜，拔萝卜，嘿哟嘿哟拔萝卜……”在脑海中，我无缝给它重组了斯特拉文斯基风格的不规则重音管弦乐，真是一场极致的电子艺术解构。' },
      { speaker: '旁白', text: '你在一脸蔑视中脑电波狂飙！连电视机仿佛都产生了一阵电离脉动！智力得到深度飞跃。' }
    ]
  },

  // 7. Bathroom Trigger (浴室)
  bathroom_trigger: {
    id: 'bathroom_trigger',
    title: '洗手间门槛外的流体地狱',
    triggerCondition: 'interact_bathroom',
    dialogues: [
      { speaker: '旁白', text: '洗手间门口常年有淡淡的水汽，里面隐隐传来抽水马桶的奔流轰鸣以及彩色洁厕泡泡的奇炫光华。' },
      { speaker: '心声', text: '这湿溜溜的地砖是全家摩擦系数最低的地表，极大概率会让我这未定型的脑壳磕在马赛克上。但这马桶的抽水漩涡原理，可是柯氏热力学和流浆计算的极好教科书啊……' }
    ],
    choices: [
      {
        text: '用双手当成爪勾，稳稳维持四点悬浮支撑滑过门槛',
        nextPlotId: 'bathroom_phys',
        effects: { physical: 5, hunger: -4 }
      },
      {
        text: '目不转睛凝望马桶漩涡中的水动力学，推演纳维-斯托克斯方程',
        nextPlotId: 'bathroom_fluid',
        effects: { intellect: 6, talent: 2 }
      },
      {
        text: '尝试在地砖的水泼反光上极速翻滚腾跃（高级特技动作，动作偏激进，存在打滑痛击风险）',
        nextPlotId: 'bathroom_slip',
        effects: { health: -20, physical: 8, talent: 5 }
      }
    ]
  },
  bathroom_slip: {
    id: 'bathroom_slip',
    title: '哎呀！遭遇潮湿地块滑倒痛击',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '你在洗手间水泼反光的地毯上突然打滑，“砰！”的一声，肥嫩的小屁股和背部结结实实摔在坚硬的瓷砖上！' },
      { speaker: '心声', text: '疼疼疼……骨架都要被这5.8米/秒²的离心冲击力摔散了。物理底盘的发育确实还没准备好这种极高转动滑行，大意了大意了！' },
      { speaker: '父亲', text: '“哎哟我的胖宝贝！你怎么滑倒了！乖乖不哭不哭，爸爸吹吹，洗手间真的太不安全了，生命流失，要特别保重呀！”' }
    ]
  },
  bathroom_phys: {
    id: 'bathroom_phys',
    title: '极速转弯摩擦制动完成！',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '父亲', text: '“卧槽孩子滑进去了……等等，他居然用胖胖的膝盖在湿滑的拖鞋上垫了一下借力，转了个30度完美摩擦漂移滑了回来？！这是什么漂移神童？！”' },
      { speaker: '心声', text: '哼。一切重力与动态受力均在掌控，哪怕我是个婴儿，也绝不是会摔个狗啃泥的弱鸡。' }
    ]
  },
  bathroom_fluid: {
    id: 'bathroom_fluid',
    title: '浴室里的NS方程简明解法',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '心声', text: '这股顺时针气旋和科里奥利力的交替作用，竟然在现实的三维马桶湍流里产生了一个完美的耗散微小真空！真是大自然完美的演算法。' },
      { speaker: '旁白', text: '你看得津津有味。虽然因为试图吃肥皂泡而被爸爸惊慌抱出，但你的大脑对宏观动力学产生了恐怖的学习力。智商炸裂！' }
    ]
  },

  // === OUTDOOR LANDMARK PLOTS ===

  // 8. Bookshelf Trigger (爸爸书柜) - Choices branched
  bookshelf_trigger: {
    id: 'bookshelf_trigger',
    title: '大书架上的真理探索',
    triggerCondition: 'interact_bookshelf',
    dialogues: [
      { speaker: '旁白', text: '你终于用肥嘟嘟的膝盖爬到了高耸大书架前。这里充满成熟的大人书籍味道。' },
      { speaker: '心声', text: '《相对论原理》、《微积分教程》、《家庭理财指南》……等等，这里居然还有爸爸的私房钱夹在里面？！' },
      { speaker: '父亲', text: '“哎哟我的小祖宗！你怎么爬到书柜底下了？快放下那本《信息学导论》，那不是玩具！”' },
      { speaker: '旁白', text: '父亲急忙蹲下身抢救他的心爱读物，但就在这时，你的智慧眼神让他停住了手。' }
    ],
    choices: [
      {
        text: '扯下书本一角塞进嘴里（伪装普通婴儿）',
        nextPlotId: 'bookshelf_common',
        effects: { physical: 4, hunger: -5, talent: 1 }
      },
      {
        text: '用白胖手指指着代码示例：“咕……咕噜！”（展现天才气质）',
        nextPlotId: 'bookshelf_genius',
        effects: { intellect: 8, hunger: -10, talent: 5 }
      },
      {
        text: '试图攀爬高耸书柜格子，去够取顶层的《高等数学与深度学习综述》（高空攀爬摔落风险）',
        nextPlotId: 'bookshelf_fall',
        effects: { health: -25, physical: 6, intellect: 10, talent: 6 }
      }
    ]
  },
  bookshelf_fall: {
    id: 'bookshelf_fall',
    title: '高空坠落：微型攀爬重力审判',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '你强行撑着松动的层板往上攀爬。层板发生了九度倾角滑扣，“哗啦！”你随同好几本沉重厚书一起翻滚摔在硬质木地板上！' },
      { speaker: '心声', text: '唔……厚约五百页的《高深数学》重压在我的熊肋上，疼得直吐白气，小身板感觉要裂开了，生命值惨遭扣减！' },
      { speaker: '父亲', text: '“儿子！天哪！书架格板松掉了！你没摔着骨头吧？！吓死我了，这大块头砖头书差点砸坏你的肩膀啊！快去医院看看！”' }
    ]
  },
  bookshelf_common: {
    id: 'bookshelf_common',
    title: '真香！书本的口感',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '心声', text: '呸呸呸……这纸张太特么涩嘴了，不过成功打消了老爸的怀疑。' },
      { speaker: '父亲', text: '“哎，真不该对一个刚几个月大的婴儿抱有什么‘天才幻想’。这书角都被啃湿了，哈哈。”' },
      { speaker: '母亲', text: '“快抱他去擦擦嘴，你怎么能把书丢在地板上呢。”' },
      { speaker: '旁白', text: '你安全退回了普通婴儿的阵营，但你感到体能更壮实了（毕竟啃了一口充满知识的木浆纯纸）。体能 +4！' }
    ]
  },
  bookshelf_genius: {
    id: 'bookshelf_genius',
    title: '智慧的光芒，闪烁！',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '父亲', text: '“这……这不对劲。这本《信息学导论》第128页讲的是递归算法……他居然顺着我的大拇指直勾勾盯着递归流程图看？！”' },
      { speaker: '父亲', text: '“儿子，难道这就是你前世的设计？！太不可思议了！”' },
      { speaker: '心声', text: '糟糕，难道这老爹也是个码农？他似乎在我眼里看出了志同道合的光芒……' },
      { speaker: '旁白', text: '这次智力上的共鸣，让你彻底记住了这里的坐标和知识！智力大幅成长（+8），且让你在“记事”能力上大有拓宽！' }
    ]
  },

  // 9. Community Park Trigger (中央公园萨克斯声波)
  community_park_trigger: {
    id: 'community_park_trigger',
    title: '爵士风骨与大自然的耳鸣声',
    triggerCondition: 'interact_community_park',
    dialogues: [
      { speaker: '旁白', text: '你昂然漫步在社区中央公园。一位戴墨镜的老大爷正在吹奏古典爵士经典《Take Five》。' },
      { speaker: '心声', text: '在写程序的无眠深夜，最慰藉我的就是这段舒缓的4/5拍节奏。在大自然的微风和真草地香气吹拂下，这段声乐激起了我前世在艺术领域的未尽追求。' }
    ],
    choices: [
      {
        text: '叉腰闭眼，优雅地随着萨克斯的重拍点头（极致音感）',
        nextPlotId: 'community_park_jazz',
        effects: { talent: 6, intellect: 4, physical: 2 }
      },
      {
        text: '直接趴下近距离嗅探并分析蒲公英受爵士乐声波振动产生的空气动力轨迹',
        nextPlotId: 'community_park_flower',
        effects: { intellect: 5, talent: 4 }
      }
    ]
  },
  community_park_jazz: {
    id: 'community_park_jazz',
    title: '长椅乐师的艺术共鸣',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '大爷(吹萨克斯)', text: '“嚯！小家伙，你居然能在第四拍切音的时候点头？你跟得上五拍子的布鲁斯节奏？绝了！你是未来的爵士大师啊！”' },
      { speaker: '心声', text: '大爷，你的超吹泛音差了三个分贝，不过指法确实老练。艺术的洗礼让我的右脑创造力开始觉醒。' }
    ]
  },
  community_park_flower: {
    id: 'community_park_flower',
    title: '蒲公英毛绒粒子力学',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '你伏在松软的马尼拉草坪上，极度细微地观察受乐器铜管气流扰动振动的柔毛小蒲公英。' },
      { speaker: '心声', text: '共振波长是450纳米，这证明声压能量正均匀转换为花粉微粒的动能。万物皆有数，这真是不凡的物理实地考察课。' }
    ]
  },

  // 10. Candy Store Trigger (杂货小店)
  candy_store_trigger: {
    id: 'candy_store_trigger',
    title: '阳光温氏小卖部的商业奇袭',
    triggerCondition: 'interact_candy_store',
    dialogues: [
      { speaker: '旁白', text: '阳光温馨杂货小卖部里摆满了五色的彩虹糖、散装泡泡糖，香香甜甜。老板娘是个和蔼的中年妇女。' },
      { speaker: '老板娘', text: '“哟，这是谁家的胖小子啊？好亮闪闪的眼神！想吃果蓉和彩虹软糖是不是呀？”' },
      { speaker: '心声', text: '在商业和流通行业中，定价权和温和的消费者套路是最底层逻辑。看着这杂乱但井井有条的开架排货，我如果能在幼年期和掌柜达成贸易伙伴关系，未来的辅食小零食将源源不绝！' }
    ],
    choices: [
      {
        text: '用肥软手指指着货上最贵的进口果泥，流出口水：“嗷嗷巴布！”（萌度战术）',
        nextPlotId: 'candy_store_buy_cutie',
        effects: { hunger: 35, physical: 4 }
      },
      {
        text: '用稚嫩而字字顿挫的声调大声指出：“姨，找错面值两元！”（超级心算突袭）',
        nextPlotId: 'candy_store_buy_genius',
        effects: { intellect: 8, talent: 4 }
      }
    ]
  },
  candy_store_buy_cutie: {
    id: 'candy_store_buy_cutie',
    title: '终极核爆级装萌爆白金辅食',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '老板娘', text: '“啊呀我的心都要萌化了！这大双眼皮，给给给！大姨做主，这包进口牛油果泥白送你了，快拿去吃！”' },
      { speaker: '心声', text: '很好，只要我眨眨眼，千元一箱的进口辅食和有机燕麦便会像雪花般飘到我的小推车里。这就是神级颜值的商业价值。' }
    ]
  },
  candy_store_buy_genius: {
    id: 'candy_store_buy_genius',
    title: '十位速算！大姨瑟瑟发抖',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '老板娘', text: '“什……什么？！他刚才指着柜台上的找零碎银说‘找错两元’？天哪！我刚才确实因为算糊涂少找了张两元面值的零钱！！他是怎么心算的？！”' },
      { speaker: '旁白', text: '老板娘的下巴当场张大，手里的棒棒糖直接掉进地缝。你成了这整条街道的智慧商神传说！' }
    ]
  },

  // 11. Carousel Playground Trigger (游乐木马)
  carousel_playground_trigger: {
    id: 'carousel_playground_trigger',
    title: '在弹簧摇摇马上突破向心力极限',
    triggerCondition: 'interact_carousel_playground',
    dialogues: [
      { speaker: '旁白', text: '大黄木马依靠一根锈迹斑斑的大粗弹簧稳稳固定地在沙坑最深处，许多鼻涕虫小鬼在一旁起哄。' },
      { speaker: '心声', text: '既然被大人们抱到了这具狂野弹簧骑玩具上，我就必须计算出弹簧的虎克弹性系数，利用身体重心的前后共振，玩出超大幅度的弹簧骑重极限！' }
    ],
    choices: [
      {
        text: '完美利用前后阻尼，让弹性共振角达到超惊险的42度角（运动奥义）',
        nextPlotId: 'carousel_play_extreme',
        effects: { physical: 7, talent: 3, hunger: -6 }
      },
      {
        text: '平稳晃动，并在脑海里背诵高斯分布函数，用手在沙坑中画下完美的正态分布抛物线',
        nextPlotId: 'carousel_play_monotone',
        effects: { intellect: 5, talent: 3 }
      }
    ]
  },
  carousel_play_extreme: {
    id: 'carousel_play_extreme',
    title: '弹簧马上的离心力霸王',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '大龄熊孩子(小虎)', text: '“坏了！快看那个顾家的小弟弟！他要把那块合金弹簧摇飞了！他连双手都不扶把，完全是在靠惊人的腰部肌群做超重心调整！太飒了吧！！”' },
      { speaker: '心声', text: '无知的小童，这叫动量守恒。体能上限在极限摆幅中狂增！' }
    ]
  },
  carousel_play_monotone: {
    id: 'carousel_play_monotone',
    title: '金黄色沙坑里的高斯图纸',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '你优雅、沉静地徐徐摇晃。伸出白嫩得像藕一样的手指，在细白的白沙中快速划拉了几下。' },
      { speaker: '旁白', text: '等大人们仔细看去。沙盘中央，竟然出现了一个绝对完美的对称正态概率分布曲线草图！' },
      { speaker: '心声', text: '智力上的降维打击才是对付这帮玩沙熊孩子最好的武器。智商与感悟+5！' }
    ]
  },

  // 12. Stray Pets Shelter Trigger (流浪猫狗)
  stray_pets_shelter_trigger: {
    id: 'stray_pets_shelter_trigger',
    title: '与大金毛讨论生命的真理',
    triggerCondition: 'interact_stray_pets_shelter',
    dialogues: [
      { speaker: '旁白', text: '几只戴着爱心颈圈的流浪猫正趴在纸箱前晒背，顾家老爸经常带你来这边投喂狗粮。大金毛正吐着冒热气的红舌头，歪着硕大的狗头盯着你瞧。' },
      { speaker: '心声', text: '听闻某些高灵性动物能够嗅出人类灵魂。这只大金毛看我的沉稳眼神，似乎知道这具肥墩双头婴儿躯壳下面，装匿着一只二十七岁的老家伙……' }
    ],
    choices: [
      {
        text: '伸手给大金毛来一顿专业的推拿舒爽抚摸（动物行为大师）',
        nextPlotId: 'stray_pets_massage',
        effects: { physical: 6, talent: 3 }
      },
      {
        text: '模仿前世二进制数，以短促低沉的犬叫和它讨论微积分极限（跨物种交流）',
        nextPlotId: 'stray_pets_howl',
        effects: { intellect: 6, talent: 3 }
      }
    ]
  },
  stray_pets_massage: {
    id: 'stray_pets_massage',
    title: '征服金毛的极爽泰式抓捏',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '金毛大狗', text: '“呜呜……（瘫软在地，尾巴疯狂扫荡起了草地沙尘，舒服得翻转了雪白的肚皮）”' },
      { speaker: '父亲', text: '“难以置信！我经常来喂它它都不让我摸，怎么这胖小子伸手捏了几下淋巴结和后腿，这狗直接爽得双眼发白了？！儿子你有训犬师天赋啊！”' },
      { speaker: '心声', text: '前世为了缓解颈椎病，我可是在盲人按摩大师那里学了几十招受力按压的，这不把这金毛拿捏得死死的？' }
    ]
  },
  stray_pets_howl: {
    id: 'stray_pets_howl',
    title: '二进制汪汪叫的智慧冲击',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '你', text: '“汪！汪汪！汪呜（以长短音高规律模拟：01001）”' },
      { speaker: '旁白', text: '起初高昂傲气的萨摩耶和金毛突然齐刷刷蹲正了庞大的躯体，面色严肃得像是清华大学答辩台上的教授。' },
      { speaker: '心声', text: '很好，只要我以数字逻辑声带声共振，万物之灵的大自然就能产生绝妙的默契共振。脑域获得奇妙感悟！' }
    ]
  },

  // 13. Nursery School Trigger (幼儿园)
  nursery_school_trigger: {
    id: 'nursery_school_trigger',
    title: '降维碾压整座社区幼儿园',
    triggerCondition: 'interact_nursery_school',
    dialogues: [
      { speaker: '旁白', text: '你独自踱步走入印有大白兔、太空飞船的托管班活动室。隔壁的大班小鬼正在拼一幅100片的积木拼图、或者数一到二十的手指。' },
      { speaker: '老师(惊慌又喜爱)', text: '“哎呀，这有一只谁家还没断奶的顾家小胖娃，好聪明会自己走过来，快给阿姨抱抱！”' },
      { speaker: '心声', text: '既然已经来了，不露一手让这帮被少儿奥数 and 绘画班摧残的儿童知道什么叫“无解神童”，我这个高智商重生工程师岂不是白活了？' }
    ],
    choices: [
      {
        text: '拿起画笔，在白板纸上神级复刻一幅中世纪达芬奇文艺复兴像素画（艺术造诣）',
        nextPlotId: 'nursery_school_art',
        effects: { talent: 9, intellect: 5, hunger: -9 }
      },
      {
        text: '当场速叠两个残缺废弃的十阶混沌魔方（计算力碾压）',
        nextPlotId: 'nursery_school_math',
        effects: { intellect: 10, talent: 4 }
      },
      {
        text: '尝试调皮地去抢霸道学霸胖虎手里带尖锐合金齿轮的电动恐龙，并飞速拆解结构（遭玩具齿轮割伤）',
        nextPlotId: 'nursery_dinosaur',
        effects: { health: -15, intellect: 8, talent: 6 }
      }
    ]
  },
  nursery_dinosaur: {
    id: 'nursery_dinosaur',
    title: '极其锋利的合金塑料恐龙反噬',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '你一手夺过正在转圈咬合的恐龙玩具，但那粗制滥造的电镀铁壳边缘极度锋利，瞬间划红了你稚嫩的小手，鲜血微微沁出！' },
      { speaker: '心声', text: '可恶……这便宜恐龙里面的级联行星减速齿轮竟然开裂生锈，且飞框没做去毛刺！不仅拆卸失败，反倒弄了道流血伤痕，生命值扣损！' },
      { speaker: '老师', text: '“哎呀！顾家的宝贝儿，你怎么和胖虎去争抢恐龙，把小手都磨破流血了！流血了，快送医务室清洗伤口涂碘酒包扎！”' }
    ]
  },
  nursery_school_art: {
    id: 'nursery_school_art',
    title: '社区美术界的新生达芬奇',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '老师们', text: '“天啊！！他只用一支黑色粉笔，通过极小幅度的素描写意画，竟然勾勒出了这个立体的雅典学院透视缩比图！这特么是婴儿的手能画出来的？！叫媒体！快叫电视台！！”' },
      { speaker: '心声', text: '淡定，大惊小怪的，透视法和黄金比例本就是底层逻辑，哪怕我拿树枝，也能在这个世界的每张纸上写出惊世墨迹。人生艺术特技大增！' }
    ]
  },
  nursery_school_math: {
    id: 'nursery_school_math',
    title: '十阶魔方上的指尖超算器',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '大班学霸(小刚)', text: '“呜呜呜……我拼一整天连三阶都解不开……这个咬着安抚奶嘴的小弟弟，怎么看都不看，只用指尖‘咔咔咔’地划了十秒，两个高难度十阶凌乱魔方就六面归一了？！他不怕费脑缺氧么？！”' },
      { speaker: '心声', text: '三维快速置换哈夫曼编码的算法推演而已，对超凡大脑而言只占了2.4%的内存开销。神童的美誉，今生已彻底立鼎。' }
    ]
  },
  stage_infant_victory_trigger: {
    id: 'stage_infant_victory_trigger',
    title: '宿命终章：襁褓褪去与金身破茧',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '伴随着属性、技能和历炼的全面圆满。你的全身肌肉骨骼在神童属性与天赋中，发出了密集的微弱脆响！' },
      { speaker: '心声', text: '终于……我完成了转世以来在婴儿被里的全部蜕变。说话、爬行、思考、走路、以及在大人眼里超常的领会……一切技能全部贯通。' },
      { speaker: '心声', text: '我的灵慧与体魄已经强健到了前所未有的峰值！襁褓不再是我的归宿，接下来……是站起来跑向更庞大、更神秘、更广袤的[幼儿期领域]！' },
      { speaker: '父亲', text: '“快来看啊老婆！天哪！咱们家儿子开始扶着桌角，稳健地满地奔跑，甚至在用嘴流利地说出连贯的高难度复合语句！他不仅在笑，眼神竟然深邃得像个智者！”' },
      { speaker: '母亲', text: '“这是超越人类常理的生命神迹……顾家的未来，将在他的手中，翻开无边的辉煌画卷！”' },
      { speaker: '旁白', text: '—— 恭喜你！婴儿期人生目标全部圆满达成！你成功完成了初诞期神学蜕变！ ——' }
    ]
  },
  // === JUNIOR CLASS (小班) PLOTS ===
  junior_intro: {
    id: 'junior_intro',
    title: '小班开学季：宿命的新起点',
    triggerCondition: 'start',
    dialogues: [
      { speaker: '旁白', text: '今天是九月一日晴，你告别了温暖的襁褓，背起了带有彩色宇航员图案的炫酷塑料小书包，正式跨入幼儿园开启小班生活！' },
      { speaker: '妈妈(欣喜温柔)', text: '“顾家的乖胖宝，第一天上学紧张吗？记住陈阿姨 and 王老师的交代，在学校要勤洗手，多和别的小家伙拉手分享玩具，知道吗？”' },
      { speaker: '心声(高维智者)', text: '这一天终于到来了。虽然只是一群小鼻涕虫和十片积木组成的小班，但这确实是我获取当世社会背景知识、夯实人际基础的关键。' },
      { speaker: '心声(志存高远)', text: '数数与计算、辨识原色、社交礼仪、拼音字母、规范洗手……本神童将把这些凡人眼里的绝活，融汇成金身知识树！知识、人脉、身体，看我如何全数打通！' },
      { speaker: '父亲', text: '“哈哈老婆你别担心，咱儿子在婴儿期就能站起来慢跑了。儿子加油，陈老师在招手呢，开心待满50天上学天数，学完咱们目前所有的知识就能完美毕业哦！”' }
    ]
  },
  junior_plot_1: {
    id: 'junior_plot_1',
    title: '小班智力探析：拼图堆砌的终极最优解',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '同桌小刚', text: '“哇！小顾！你竟然只花了三秒，就把这个含有两千个零碎拼片的星空城堡拼好啦？！我拼了一个星期，拼得头昏眼花还找不到边角……”' },
      { speaker: '心声 (前世记忆)', text: '太慢了，这本就是标准的广度优先与边缘分治算法，结合色彩梯度直方图分析的经典极简实践。看着这群为了拼一块正方形而哭鼻子的凡人幼崽，我只感到一阵寂寞。' },
      { speaker: '陈老师 (惊叹)', text: '“顾小宝小朋友真是太神奇了！他不仅双手齐下，拼出来的城堡图案居然跟背面参考图一毫米都不差！这简直是大脑算力的奇迹！”' }
    ]
  },
  junior_plot_2: {
    id: 'junior_plot_2',
    title: '社交微型风暴：关于一根棒棒糖的利益权衡',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '隔壁班小胖', text: '“喂！小顾，只要你把那个亮闪闪的积木大飞机让给我，我就分给你半块草莓棒棒糖，这可是很值钱的，怎么样？”' },
      { speaker: '心声', text: '哦？想用一根充满反式脂肪酸的低端蔗糖制品，来交换我耗时十分钟、经过静力学超宽主梁优化设计的ABS模块重力模型？这显然是一次彻底的负向博弈。' },
      { speaker: '心声', text: '不过……在陈老师正回头望向这边的瞬间，我有更好的方案。' },
      { speaker: '我', text: '“给你，哥哥！大家都开心玩，我们一起分享大黄蜂飞机吧。”' },
      { speaker: '陈老师 (感动极了)', text: '“小胖，看看人家小顾，年纪小小居然如此大公无私、大方得体！今天的‘分享小红花勋章’必须要奖励给小顾！”' },
      { speaker: '心声', text: '呵，用几个闲置塑料块换取了小班专修的官方社交礼仪成就、免去了被抢夺资产的摩擦成本，顺带在班主任心目中确立了不拔地位。双赢，也就是我自己赢了两次。' }
    ]
  },
  junior_plot_3: {
    id: 'junior_plot_3',
    title: '午睡时间的降维修行：梦境多线程解析',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '下午一点，阳光洒进教室的榻榻米床上。所有小玩偶和小床都被整齐排开，大家翻来覆去不愿入睡，唯有你一沾枕头就沉沉进入了黑夜。' },
      { speaker: '心声', text: '这些吵闹的幼崽真是精力过剩。他们不懂，睡眠是人类清理系统缓存、重建神经元索引突触的高效维护任务。' },
      { speaker: '心声', text: '在睡眠的浅脑波状态中，我正好能以多线程方式对前世的TCP协议栈、操作系统微内核进行重构……甚至可以冥想演练一下微积分的公式。' },
      { speaker: '陈老师 (慈爱捏被角)', text: '“这孩子睡得多甜啊，呼吸匀称，额头温润。别的孩子都要老师拍背唱歌，顾小宝却自己乖巧入睡。真是个不让妈妈操心的天使宝宝。”' },
      { speaker: '心声', text: '睡眠线程维护完，系统状态：已拉满。体能储备 +15！' }
    ]
  },
  junior_plot_4: {
    id: 'junior_plot_4',
    title: '黑板上的艺术博弈：陈老师的无形震撼',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '陈老师', text: '“小朋友们，今天我们来学画一个圆圈和金灿灿的太阳！大家拿着画笔跟着老师一块画一个甜甜圈哦！”' },
      { speaker: '旁白', text: '别的孩子拿着粗彩铅，在白纸上擦出了杂乱无章的灰色涂鸦，甚至涂到了自己袖口和同桌脸蛋上。' },
      { speaker: '心声', text: '纯画笔勾勒？未免太粗糙了。在我的脑海中，完美圆形遵循的是标准极坐标方程：r = C。而渲染太阳的光芒，应该按照黄金分割比例绘制斐波那契螺旋发散光束。' },
      { speaker: '旁白', text: '你拿起一块粉笔，走上去在黑板空白处轻轻划下。那是一个精准如机器用圆规画出的绝美圆形，边缘不抖、光弧平展，四周的光芒弧线透射出极致的数学和谐美感。' },
      { speaker: '陈老师 (面色惨白)', text: '“这……这已经不是简笔画了，这是极简几何艺术！这孩子下笔的稳定度连美院研究生都惊叹！这真的是三岁的手指发力吗？！”' },
      { speaker: '心声', text: '淡定，对于降世神童而言，肌肉记忆的精确调校只是基本微操。' }
    ]
  },
  junior_plot_5: {
    id: 'junior_plot_5',
    title: '萌芽洗手池的小科学：流体力学防菌篇',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '午餐前，洗手台前一片混乱。小朋友们只是在水龙头下稍微沾湿了手指就算洗完，然后满手黑泥去抓小苹果。' },
      { speaker: '心声', text: '实在太不卫生了。细菌指数超标将引发呼吸道感染等硬件故障。我必须启动【科学洗手协议】。' },
      { speaker: '心声', text: '双掌合十，掌心相对摩擦，十指交叉，清除隐蔽盲区的厌氧菌群；旋转冲洗手指大拇指，依靠表面活性剂彻底乳化带走污迹。' },
      { speaker: '保健医生 (眼睛发亮)', text: '“天哪！顾小宝同学的洗手姿势居然跟我们省人民医院无菌手术室的医生标准一模一样！不仅姿势端正，冲洗的水流速度也调控得很完美，极省水源又高度无菌！他简直是可以去当卫生小形象代言人了！”' },
      { speaker: '我 (内心发笑)', text: '不过是常规卫生学指令，确保身体机能100%运转的基操罢了。不过这温水，摸着还挺舒服。' }
    ]
  },
  junior_victory: {
    id: 'junior_victory',
    title: '小班毕业式：惊世之才光芒万代',
    triggerCondition: 'none',
    dialogues: [
      { speaker: '旁白', text: '伴随着第五十个在校日夜的落下。你在黑板、沙坑和拼音牌上，把所有的学科极速掌握。' },
      { speaker: '心声', text: '终于……我将八项小班核心知识：数数、调色、礼貌交互、规范洗手、两只老虎清唱、手绘太阳等全数熔炼。上学天数圆满越过了 50 天的分水岭！' },
      { speaker: '陈老师(激动地热泪盈眶)', text: '“园长！天呐！顾家这胖娃不仅通过了小班考试，他刚才在放学前，随手用黑板粉笔推导出了拼音韵母的格律学，甚至写出了极其抽象的反流感防疫七步精髓！我们已经没有什么可以教他的了！”' },
      { speaker: '园长(肃立鞠躬)', text: '“这是百年难遇的真正文理大宗师种子！顾同学，恭喜你成功通关了[启智幼儿园小班阶段]！你是当之无愧的降世神童！”' },
      { speaker: '心声', text: '第一阶段结束。未来的中班、大班、甚至波澜壮阔的学生和工作时代，正等着真正的王者归来！' }
    ]
  }
};

export const JUNIOR_TASKS: GameTask[] = [
  {
    id: 'task_j_intro',
    title: '【开学勋章】完成人生第一次早操打卡',
    description: '通过进行任一活动，熟悉在家、在幼儿园、出门这三种不同的自身环境与状态。',
    type: 'move',
    target: 'any',
    completed: false,
    rewardText: '迈向学海，知识属性点数 +5，大人们瞩目连连。'
  },
  {
    id: 'task_j_numbers',
    title: '【数理研究】掌握：数数与计算 (1-10)',
    description: '在教室内认真数数，或者在家里的卧室书桌背诵数字，解锁数理知识。',
    type: 'skill_unlock',
    target: 'knowNumbers',
    completed: false,
    rewardText: '解锁“数一到十”知识！智力 +12 起步，知识点 +6。'
  },
  {
    id: 'task_j_colors',
    title: '【色谱理论】辨识三原色与混合原理',
    description: '在小班教室温习漂亮老师的色彩板，解锁色彩科学知识。',
    type: 'skill_unlock',
    target: 'knowColors',
    completed: false,
    rewardText: '解锁“辨识三原色”艺术知识！智力 +8，知识点 +5。'
  },
  {
    id: 'task_j_politeness',
    title: '【温吞有礼】熟谙：礼貌交往与躬身问候',
    description: '在沙坑游乐场主动拥抱同学，或是和老师打招呼，掌握社交礼貌。',
    type: 'skill_unlock',
    target: 'knowPoliteness',
    completed: false,
    rewardText: '解锁“礼貌问候语”交往知识！知识点 +5，智力上限提升。'
  },
  {
    id: 'task_j_draw',
    title: '【神笔马良】手绘圆满红红大太阳',
    description: '在教室内单手用粉笔快速勾染黑板，解锁手绘艺术。',
    type: 'skill_unlock',
    target: 'knowDraw',
    completed: false,
    rewardText: '解锁“手绘太阳简笔画”知识！体能 +6，知识点 +7。'
  },
  {
    id: 'task_j_sing',
    title: '【人脑声律】完美吟唱双声道《两只老虎》',
    description: '在卧室复习或在公园对大金毛和动物歌唱，解锁吟唱技巧。',
    type: 'skill_unlock',
    target: 'knowSing',
    completed: false,
    rewardText: '解锁“唱两只老虎”声乐知识！知识点 +6，智力 +8。'
  },
  {
    id: 'task_j_share',
    title: '【社交征服】分享甜饼给霸道胖虎',
    description: '在食堂主动分享甜饼干或是在沙坑游乐场不争不抢分享积木。',
    type: 'skill_unlock',
    target: 'knowShare',
    completed: false,
    rewardText: '解锁“玩具分享社交礼仪”知识！体力 +8，知识点 +6！'
  },
  {
    id: 'task_j_wash',
    title: '【洁癖大卫】掌握完美七步洗手法',
    description: '在吃学校餐盘前，或是在家里洗手间，练习防疫洗手标准动作。',
    type: 'skill_unlock',
    target: 'knowWashHands',
    completed: false,
    rewardText: '解锁“规范七步洗手法”知识！生命值大幅提振 +25，体力 +5。'
  },
  {
    id: 'task_j_alphabet',
    title: '【识字通儒】通览：拼音韵母声调ABC',
    description: '到大超市寻觅进口卡片并拼读，或是高声朗诵拼读音卡。',
    type: 'skill_unlock',
    target: 'knowAlphabet',
    completed: false,
    rewardText: '解锁“声母拼读卡片”字词知识！智力 +12 脑力爆发，知识点 +8。'
  },
  {
    id: 'task_j_days20',
    title: '【学海扁舟】积累上学天数 20 天',
    description: '在家、在幼儿园、出门循环学习和打卡，使“上学天数”达到 20 天。',
    type: 'stat_increase',
    target: 'schoolDays_20',
    completed: false,
    rewardText: '坚毅属性提振，最大生命值 +15，体力 +10！'
  },
  {
    id: 'task_j_days50',
    title: '【功成名遂】最终半百执教：上学天数达到 50 天',
    description: '孜孜不倦，打卡上学满 50 日，达成最终通关所需的时间基石！',
    type: 'stat_increase',
    target: 'schoolDays_50',
    completed: false,
    rewardText: '解锁终极小班大圆满条件之一！'
  },
  {
    id: 'task_j_knowledge50',
    title: '【饱学之儒】使你的“知识数值”达到 50 点',
    description: '通过各项活动提升“知识”数值至 50 点（替换原天赋面板），证明你的聪颖才智。',
    type: 'stat_increase',
    target: 'knowledge_50',
    completed: false,
    rewardText: '解锁小班大圆满条件之二！所有大人们对你五体投地！'
  }
];

