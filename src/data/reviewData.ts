export type ChapterId = "intro" | "c1" | "c2" | "c3" | "c4" | "c5";
export type CardStatus = "unknown" | "hard" | "ok" | "mastered";
export type Importance = "必背" | "高频" | "理解";
export type ExamType = "名词解释" | "材料分析" | "辨析题" | "论述题";

export interface KnowledgeNode {
  title: string;
  points: string[];
  examFocus: string;
}

export interface Chapter {
  id: ChapterId;
  order: number;
  title: string;
  shortTitle: string;
  role: string;
  sections: KnowledgeNode[];
}

export interface Flashcard {
  id: string;
  term: string;
  answer: string;
  keywords: string[];
  memoryHook?: string;
  logicHint?: string;
  chapterId: ChapterId;
  importance: Importance;
  examTypes: ExamType[];
  sourceHint: string;
}

export interface PastPaper {
  id: string;
  title: string;
  terms: string[];
  analysis: string[];
  essay: string[];
  relatedCardIds: string[];
}

export interface ConceptLink {
  id: string;
  from: string;
  relation: string;
  to: string;
  explanation: string;
  cardIds: string[];
}

export interface MemoryRoute {
  id: string;
  title: string;
  chapterIds: ChapterId[];
  scenario: string;
  steps: string[];
  cardIds: string[];
}

export interface AnswerPattern {
  id: string;
  title: string;
  useFor: string;
  structure: string[];
  exampleCards: string[];
}

export const chapters: Chapter[] = [
  {
    id: "intro",
    order: 0,
    title: "导论",
    shortTitle: "导论",
    role: "先建立总框架，回答“什么是马克思主义、为什么学、怎么用”。",
    sections: [
      {
        title: "什么是马克思主义",
        points: ["科学理论体系", "三个基本组成部分", "基本立场、观点、方法"],
        examFocus: "可作为论述题开头，尤其适合“如何践行马克思主义”。"
      },
      {
        title: "创立、发展与基本特征",
        points: ["直接理论来源", "科学性", "革命性", "实践性", "人民性", "发展性"],
        examFocus: "背关键词，不宜孤立死记，常用于综合题铺垫。"
      },
      {
        title: "当代价值与学习方法",
        points: ["观察时代", "把握规律", "指导实践", "一切从实际出发"],
        examFocus: "联系青年使命、专业学习、总师育人文化。"
      }
    ]
  },
  {
    id: "c1",
    order: 1,
    title: "第一章 世界的物质性及发展规律",
    shortTitle: "第一章",
    role: "哲学大题核心章，重点是物质观、辩证法、矛盾规律和发展观。",
    sections: [
      {
        title: "世界的多样性与物质统一性",
        points: ["物质", "意识", "运动与静止", "主观能动性", "世界物质统一性"],
        examFocus: "可应对“物质与意识关系”“人与自然关系”等材料题。"
      },
      {
        title: "普遍联系和变化发展",
        points: ["联系", "发展", "对立统一规律", "量变质变", "否定之否定"],
        examFocus: "矛盾规律是常考名词和材料分析万能工具。"
      },
      {
        title: "唯物辩证法的方法论",
        points: ["整体性思维", "辩证思维", "历史思维", "创新思维"],
        examFocus: "答题时落到“坚持全面、联系、发展地看问题”。"
      }
    ]
  },
  {
    id: "c2",
    order: 2,
    title: "第二章 实践与认识及其发展规律",
    shortTitle: "第二章",
    role: "认识论高频章，适合材料题和辨析题。",
    sections: [
      {
        title: "实践与认识",
        points: ["实践", "认识", "主体客体中介", "感性认识与理性认识"],
        examFocus: "重点背实践定义、实践和认识的辩证关系。"
      },
      {
        title: "真理与价值",
        points: ["真理", "绝对真理与相对真理", "实践是检验真理的唯一标准", "价值"],
        examFocus: "常用于分析不同认识、判断标准、价值选择。"
      },
      {
        title: "认识世界和改造世界",
        points: ["一切从实际出发", "实事求是", "理论创新", "实践创新"],
        examFocus: "适合联系现实材料，结尾强调守正创新。"
      }
    ]
  },
  {
    id: "c3",
    order: 3,
    title: "第三章 人类社会及其发展规律",
    shortTitle: "第三章",
    role: "历史唯物主义核心章，社会基本矛盾、人民群众、生产力生产关系都很关键。",
    sections: [
      {
        title: "人类社会的存在与发展",
        points: ["社会存在与社会意识", "生产方式", "生产力", "生产关系", "经济基础", "上层建筑"],
        examFocus: "生产关系、上层建筑已在往年题中出现，必须熟。"
      },
      {
        title: "社会历史发展的动力",
        points: ["社会基本矛盾", "阶级斗争", "社会革命", "改革", "科学技术"],
        examFocus: "理解“生产力决定生产关系、经济基础决定上层建筑”。"
      },
      {
        title: "人民群众在历史发展中的作用",
        points: ["人民群众", "群众观点", "个人历史作用", "群众路线"],
        examFocus: "论述题可联系青年、专业和社会实践。"
      }
    ]
  },
  {
    id: "c4",
    order: 4,
    title: "第四章 资本主义的本质及规律",
    shortTitle: "第四章",
    role: "政治经济学名词解释重点章，注意商品、价值、剩余价值、经济危机。",
    sections: [
      {
        title: "商品经济和价值规律",
        points: ["商品", "使用价值与价值", "具体劳动与抽象劳动", "社会必要劳动时间", "价值规律"],
        examFocus: "社会必要劳动时间和价值规律是高频名词。"
      },
      {
        title: "资本主义经济制度",
        points: ["劳动力成为商品", "剩余价值", "不变资本与可变资本", "资本积累", "经济危机"],
        examFocus: "定义要短、准、带关键词。"
      },
      {
        title: "资本主义上层建筑",
        points: ["政治制度", "政党制度", "意识形态", "本质"],
        examFocus: "一般作为理解背景，优先级低于经济制度名词。"
      }
    ]
  },
  {
    id: "c5",
    order: 5,
    title: "第五章 资本主义的发展及其趋势",
    shortTitle: "第五章",
    role: "垄断资本主义名词解释重点章，往年出现过垄断价格。",
    sections: [
      {
        title: "垄断资本主义的形成与发展",
        points: ["垄断", "金融资本", "金融寡头", "垄断利润", "垄断价格", "国家垄断资本主义"],
        examFocus: "垄断价格、金融资本、金融寡头适合六选四名词解释。"
      },
      {
        title: "当代资本主义的新变化",
        points: ["国家垄断资本主义", "法人资本所有制", "新变化的实质"],
        examFocus: "理解性掌握，名词解释为主。"
      },
      {
        title: "资本主义的历史地位和发展趋势",
        points: ["历史进步性", "基本矛盾", "被社会主义代替的必然性"],
        examFocus: "可作为论述政治经济学部分的结尾。"
      }
    ]
  }
];

export const flashcards: Flashcard[] = [
  {
    id: "marxism",
    term: "马克思主义",
    answer: "马克思主义是由马克思和恩格斯创立并为后继者不断发展的科学理论体系，是关于自然、社会和人类思维发展一般规律的学说，是关于无产阶级解放、全人类解放和每个人自由而全面发展的学说。",
    keywords: ["科学理论体系", "一般规律", "无产阶级解放", "行动指南"],
    logicHint: "先抓“理论体系”这个上位概念，再补三个组成部分和最终目标。导论里它是总标题，后面所有章节都在展开它的立场、观点和方法。",
    chapterId: "intro",
    importance: "高频",
    examTypes: ["名词解释", "论述题"],
    sourceHint: "名词解释 PDF、教材导论"
  },
  {
    id: "basic-features",
    term: "马克思主义的基本特征",
    answer: "马克思主义具有科学性、革命性、实践性、人民性和发展性。科学性体现为正确反映客观规律，革命性体现为彻底批判精神和鲜明无产阶级立场，实践性体现为从实践中来并指导实践。",
    keywords: ["科学性", "革命性", "实践性", "人民性", "发展性"],
    chapterId: "intro",
    importance: "理解",
    examTypes: ["论述题"],
    sourceHint: "重点笔记、教材导论"
  },
  {
    id: "matter",
    term: "物质",
    answer: "物质是标志客观实在的哲学范畴，这种客观实在不依赖于人的意识而存在，能够为人的意识所反映。物质的唯一特性是客观实在性。",
    keywords: ["客观实在", "不依赖意识", "可被反映", "唯一特性"],
    logicHint: "物质是第一性起点，意识、实践、规律、认识都要从这里展开。背的时候先记“客观实在”，再记“不依赖意识”和“可被反映”。",
    chapterId: "c1",
    importance: "必背",
    examTypes: ["名词解释", "辨析题"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "consciousness",
    term: "意识",
    answer: "意识是物质世界长期发展的产物，是人脑的机能和属性，是人脑对物质世界的主观反映。意识内容具有客观性，形式具有主观性。",
    keywords: ["物质世界产物", "人脑机能", "主观反映", "客观内容"],
    logicHint: "它和物质是一对，不要单背。要和“物质第一性”一起记：内容来自客观世界，形式属于人的主观加工。",
    chapterId: "c1",
    importance: "高频",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF、重点笔记"
  },
  {
    id: "subjective-agency",
    term: "主观能动性",
    answer: "主观能动性是人们认识世界和改造世界过程中有目的、有计划、积极主动的活动能力。正确发挥主观能动性必须以尊重客观规律为前提。",
    keywords: ["目的性", "计划性", "主动性", "尊重规律"],
    chapterId: "c1",
    importance: "高频",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "practice",
    term: "实践",
    answer: "实践是人类有目的地探索和改造客观世界的能动的物质性活动，是认识的来源、动力、目的和检验标准。",
    keywords: ["改造客观世界", "能动", "物质性活动", "认识基础"],
    logicHint: "实践不是抽象口号，它是认识论的发动机。所有“为什么认识不同、为什么要检验、为什么要回到现实”都回到实践。",
    chapterId: "c2",
    importance: "必背",
    examTypes: ["名词解释", "材料分析", "辨析题"],
    sourceHint: "名词解释 PDF、2024 秋往年题"
  },
  {
    id: "connection",
    term: "联系",
    answer: "联系是事物或现象之间以及事物内部各要素之间相互作用、相互影响和相互制约的关系。联系具有客观性、普遍性、多样性和条件性。",
    keywords: ["相互作用", "相互影响", "相互制约", "客观普遍多样条件"],
    chapterId: "c1",
    importance: "高频",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF、重点笔记"
  },
  {
    id: "development",
    term: "发展",
    answer: "发展是事物从低级向高级、从量变到质变的运动变化过程，其实质是新事物的产生和旧事物的灭亡。",
    keywords: ["低级到高级", "量变到质变", "新事物产生", "旧事物灭亡"],
    chapterId: "c1",
    importance: "高频",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "contradiction-law",
    term: "矛盾规律",
    answer: "矛盾即事物内部或事物之间两个方面的对立统一。对立统一规律揭示事物发展的源泉和动力，是唯物辩证法的实质和核心。",
    keywords: ["对立统一", "源泉和动力", "实质和核心", "普遍性特殊性"],
    chapterId: "c1",
    importance: "必背",
    examTypes: ["名词解释", "材料分析", "辨析题"],
    sourceHint: "2024 秋往年题、名词解释 PDF"
  },
  {
    id: "unity-struggle",
    term: "矛盾的同一性和斗争性",
    answer: "同一性是矛盾双方相互依存、相互贯通并在一定条件下相互转化的属性；斗争性是矛盾双方相互排斥、相互分离的属性。二者共同推动事物发展。",
    keywords: ["相互依存", "相互贯通", "相互排斥", "推动发展"],
    chapterId: "c1",
    importance: "必背",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "quantity-quality",
    term: "量变与质变",
    answer: "量变是事物数量增减和构成要素排列次序变化，是度范围内不显著的变化；质变是事物根本性质的变化，是由一种质态向另一种质态的飞跃。量变是质变的必要准备，质变是量变的必然结果。",
    keywords: ["数量变化", "根本性质变化", "度", "必要准备和必然结果"],
    chapterId: "c1",
    importance: "高频",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "dialectical-negation",
    term: "辩证否定观",
    answer: "辩证否定是事物自身内在矛盾引起的自我否定，是发展环节和联系环节，是包含肯定的否定。其实质是扬弃，即既克服又保留。",
    keywords: ["自我否定", "发展环节", "联系环节", "扬弃"],
    chapterId: "c1",
    importance: "高频",
    examTypes: ["名词解释", "辨析题"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "perceptual-rational",
    term: "感性认识与理性认识",
    answer: "感性认识是认识的初级阶段，具有直接性和形象性，包括感觉、知觉、表象；理性认识是认识的高级阶段，具有间接性和抽象性，包括概念、判断、推理。二者在实践基础上辩证统一。",
    keywords: ["初级阶段", "高级阶段", "直接形象", "间接抽象", "实践基础"],
    chapterId: "c2",
    importance: "高频",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF、2024 秋往年题"
  },
  {
    id: "truth",
    term: "真理",
    answer: "真理是标志主观与客观相符合的哲学范畴，是人们对客观事物及其规律的正确反映。真理具有客观性，同时又有绝对性和相对性。",
    keywords: ["主客观相符合", "正确反映", "客观性", "绝对性相对性"],
    chapterId: "c2",
    importance: "高频",
    examTypes: ["名词解释", "辨析题"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "practice-truth-standard",
    term: "实践是检验真理的唯一标准",
    answer: "实践具有直接现实性，能够把主观认识同客观结果联系起来并加以对照，因此只有实践才能最终检验认识是否同客观实际相符合。",
    keywords: ["直接现实性", "主观见之于客观", "最终检验", "客观实际"],
    chapterId: "c2",
    importance: "必背",
    examTypes: ["材料分析", "辨析题"],
    sourceHint: "教材第二章"
  },
  {
    id: "seeking-truth",
    term: "实事求是",
    answer: "实事求是是马克思主义的精髓。“实事”就是客观存在的一切事物，“是”就是客观事物的内部联系即规律，“求”就是去研究。",
    keywords: ["客观存在", "内部联系", "规律", "马克思主义精髓"],
    chapterId: "c2",
    importance: "高频",
    examTypes: ["名词解释", "论述题"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "social-existence",
    term: "社会存在",
    answer: "社会存在是社会生活的物质方面，主要指物质生活资料的生产及生产方式，也包括地理环境和人口因素。其中生产方式是社会发展的决定力量。",
    keywords: ["物质方面", "生产方式", "地理环境", "人口因素", "决定力量"],
    chapterId: "c3",
    importance: "高频",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "social-consciousness",
    term: "社会意识",
    answer: "社会意识是社会生活的精神方面，是社会存在的反映，包括社会心理和思想体系。社会意识具有相对独立性，并能反作用于社会存在。",
    keywords: ["精神方面", "社会存在反映", "相对独立性", "反作用"],
    chapterId: "c3",
    importance: "高频",
    examTypes: ["名词解释", "辨析题"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "productive-forces",
    term: "生产力",
    answer: "生产力是人类在生产实践中形成的改造和影响自然以适应社会需要的物质力量，由劳动者、劳动对象和劳动资料构成，生产工具是生产力发展水平的主要标志。",
    keywords: ["改造自然", "劳动者", "劳动对象", "劳动资料", "生产工具"],
    logicHint: "生产力是历史唯物主义的起点。它决定生产关系，也决定后面的经济基础和上层建筑怎么变。",
    chapterId: "c3",
    importance: "必背",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF、2024 秋往年题"
  },
  {
    id: "relations-production",
    term: "生产关系",
    answer: "生产关系是人们在生产过程中形成的不以人的意志为转移的经济关系，包括生产资料所有制关系、生产中人与人的关系和产品分配关系，其中生产资料所有制关系是基础。",
    keywords: ["经济关系", "生产资料所有制", "人与人关系", "产品分配", "基础"],
    chapterId: "c3",
    importance: "必背",
    examTypes: ["名词解释"],
    sourceHint: "2024 秋往年题、名词解释 PDF"
  },
  {
    id: "economic-base",
    term: "经济基础",
    answer: "经济基础是由社会一定发展阶段的生产力所决定的生产关系的总和，占统治地位的生产关系决定经济基础的性质。",
    keywords: ["生产关系总和", "生产力决定", "占统治地位", "性质"],
    chapterId: "c3",
    importance: "高频",
    examTypes: ["名词解释", "辨析题"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "superstructure",
    term: "上层建筑",
    answer: "上层建筑是建立在一定经济基础之上的意识形态以及相应的制度、组织和设施，包括思想上层建筑和政治上层建筑。",
    keywords: ["经济基础之上", "意识形态", "制度组织设施", "思想和政治上层建筑"],
    chapterId: "c3",
    importance: "必背",
    examTypes: ["名词解释"],
    sourceHint: "2024 秋往年题、名词解释 PDF"
  },
  {
    id: "social-basic-contradictions",
    term: "社会基本矛盾",
    answer: "社会基本矛盾由生产力与生产关系、经济基础与上层建筑两对矛盾共同构成，决定社会发展的形式、内容和方向，是推动社会发展的根本动力。",
    keywords: ["生产力生产关系", "经济基础上层建筑", "根本动力", "发展方向"],
    chapterId: "c3",
    importance: "必背",
    examTypes: ["名词解释", "材料分析"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "people",
    term: "人民群众",
    answer: "人民群众在量上指大多数，在质上指对社会历史起推动作用的人们，是以劳动者为主体的大多数人。人民群众是历史的创造者。",
    keywords: ["大多数", "推动历史", "劳动者主体", "历史创造者"],
    chapterId: "c3",
    importance: "高频",
    examTypes: ["名词解释", "论述题"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "commodity",
    term: "商品",
    answer: "商品是用来交换的、能够满足人们某种需要的劳动产品，具有使用价值和价值两个因素，是使用价值和价值的矛盾统一体。",
    keywords: ["交换", "劳动产品", "使用价值", "价值", "矛盾统一体"],
    chapterId: "c4",
    importance: "高频",
    examTypes: ["名词解释"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "necessary-labor-time",
    term: "社会必要劳动时间",
    answer: "社会必要劳动时间是在现有社会正常生产条件下，在社会平均劳动熟练程度和劳动强度下制造某种使用价值所需要的劳动时间。商品价值量由社会必要劳动时间决定。",
    keywords: ["正常生产条件", "平均熟练程度", "平均劳动强度", "决定价值量"],
    chapterId: "c4",
    importance: "必背",
    examTypes: ["名词解释"],
    sourceHint: "2024 秋往年题、教材第四章"
  },
  {
    id: "value-law",
    term: "价值规律",
    answer: "价值规律是商品经济的基本规律，其基本内容是商品价值量由生产商品的社会必要劳动时间决定，商品交换以价值量为基础，按照等价交换原则进行。",
    keywords: ["基本规律", "社会必要劳动时间", "价值量", "等价交换"],
    chapterId: "c4",
    importance: "必背",
    examTypes: ["名词解释", "辨析题"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "labor-duality",
    term: "劳动二重性",
    answer: "生产商品的劳动一方面是具体劳动，形成商品的使用价值；另一方面是抽象劳动，形成商品的价值。劳动二重性决定商品二因素。",
    keywords: ["具体劳动", "抽象劳动", "使用价值", "价值"],
    chapterId: "c4",
    importance: "高频",
    examTypes: ["名词解释"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "surplus-value",
    term: "剩余价值",
    answer: "剩余价值是雇佣工人创造的、被资本家无偿占有的超过劳动力价值的那部分价值，是资本主义剥削关系的实质体现。",
    keywords: ["雇佣工人创造", "无偿占有", "超过劳动力价值", "剥削实质"],
    logicHint: "要和劳动力商品一起背：先有劳动力成为商品，才有资本家通过使用它去获得剩余价值。",
    chapterId: "c4",
    importance: "必背",
    examTypes: ["名词解释"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "constant-variable-capital",
    term: "不变资本与可变资本",
    answer: "不变资本是以生产资料形态存在的资本，在生产过程中只转移原有价值；可变资本是用于购买劳动力的资本，能够带来剩余价值。",
    keywords: ["生产资料", "转移原有价值", "购买劳动力", "带来剩余价值"],
    chapterId: "c4",
    importance: "高频",
    examTypes: ["名词解释"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "capital-basic-contradiction",
    term: "资本主义基本矛盾",
    answer: "资本主义基本矛盾是生产资料资本主义私人占有和生产社会化之间的矛盾，这一矛盾集中表现为个别企业生产的有组织性和整个社会生产无政府状态之间的矛盾。",
    keywords: ["私人占有", "生产社会化", "基本矛盾", "经济危机"],
    chapterId: "c4",
    importance: "高频",
    examTypes: ["名词解释", "辨析题"],
    sourceHint: "名词解释 PDF、教材第四章"
  },
  {
    id: "monopoly",
    term: "垄断",
    answer: "垄断是少数资本主义大企业为了获得高额利润，通过相互协议或联合，对一个或几个部门商品的生产、销售和价格进行操纵和控制。",
    keywords: ["少数大企业", "高额利润", "协议或联合", "操纵控制"],
    chapterId: "c5",
    importance: "必背",
    examTypes: ["名词解释"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "financial-capital",
    term: "金融资本",
    answer: "金融资本是由工业垄断资本和银行垄断资本融合在一起形成的一种垄断资本。",
    keywords: ["工业垄断资本", "银行垄断资本", "融合", "垄断资本"],
    chapterId: "c5",
    importance: "高频",
    examTypes: ["名词解释"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "financial-oligarchy",
    term: "金融寡头",
    answer: "金融寡头是操纵国民经济命脉并在实际上控制国家政权的少数垄断资本家或垄断资本家集团。",
    keywords: ["操纵经济命脉", "控制国家政权", "少数", "垄断资本家集团"],
    chapterId: "c5",
    importance: "高频",
    examTypes: ["名词解释"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "monopoly-price",
    term: "垄断价格",
    answer: "垄断价格是垄断组织凭借垄断地位规定的、旨在保证最大限度利润的市场价格，通常由成本价格加垄断利润构成。",
    keywords: ["垄断地位", "最大限度利润", "成本价格", "垄断利润"],
    logicHint: "它不是普通市场价，而是垄断阶段追逐高额利润的结果。可和垄断、金融资本、金融寡头一起连背。",
    chapterId: "c5",
    importance: "必背",
    examTypes: ["名词解释"],
    sourceHint: "2024 秋往年题、教材第五章"
  },
  {
    id: "state-monopoly-capitalism",
    term: "国家垄断资本主义",
    answer: "国家垄断资本主义是国家政权和私人垄断资本融合在一起的垄断资本主义，是垄断资本主义发展的重要形式。",
    keywords: ["国家政权", "私人垄断资本", "融合", "垄断资本主义"],
    chapterId: "c5",
    importance: "高频",
    examTypes: ["名词解释"],
    sourceHint: "名词解释 PDF"
  },
  {
    id: "economic-globalization",
    term: "经济全球化",
    answer: "经济全球化是世界经济活动超越国界，通过贸易、投资、金融、生产等活动在全球范围内展开，使各国经济相互依存、相互联系而形成的趋势。",
    keywords: ["超越国界", "贸易投资金融生产", "相互依存", "全球趋势"],
    chapterId: "c5",
    importance: "理解",
    examTypes: ["名词解释", "论述题"],
    sourceHint: "名词解释 PDF"
  }
];

export const pastPapers: PastPaper[] = [
  {
    id: "2024-autumn",
    title: "2024 秋季回忆版",
    terms: ["矛盾规律", "生产关系", "上层建筑", "社会必要劳动时间", "垄断价格"],
    analysis: [
      "认识的不同体现的认识论原理",
      "实践和认识的辩证关系",
      "结合唯物辩证法谈人与自然的辩证关系",
      "结合生产力概念谈绿色发展和新质生产力"
    ],
    essay: ["结合西北工业大学总师育人文化和专业，谈如何践行马克思主义"],
    relatedCardIds: [
      "contradiction-law",
      "relations-production",
      "superstructure",
      "necessary-labor-time",
      "monopoly-price",
      "practice",
      "perceptual-rational",
      "productive-forces"
    ]
  }
];

export const examStrategy = [
  "校内考试按现有 README 经验：前五章优先，科学社会主义部分暂不作为首版主线。",
  "名词解释优先背关键词，尤其是规律类、关系类、政治经济学概念。",
  "材料分析和辨析题集中在导论到第三章，答题要先定位章节，再用原理解释材料。",
  "第四、第五章以名词解释为主，定义要短准，写出决定性关键词。",
  "论述题注意从原理落到现实做法，可联系总师育人文化、专业学习和实践。"
];

export const conceptLinks: ConceptLink[] = [
  {
    id: "matter-consciousness",
    from: "物质",
    relation: "决定并可被反映",
    to: "意识",
    explanation: "先记住本体论底座：物质第一性，意识第二性；再记意识不是照相机，而是人脑对客观世界的能动反映。",
    cardIds: ["matter", "consciousness", "subjective-agency"]
  },
  {
    id: "agency-law",
    from: "主观能动性",
    relation: "必须以尊重",
    to: "客观规律",
    explanation: "材料题里凡是谈“想干、会干、怎么干”，都要写尊重客观规律和发挥主观能动性的统一。",
    cardIds: ["subjective-agency", "connection", "development"]
  },
  {
    id: "connection-development-contradiction",
    from: "联系和发展",
    relation: "展开为",
    to: "矛盾规律",
    explanation: "联系说明世界不是孤立的，发展说明世界不是静止的，矛盾规律回答为什么发展、靠什么发展。",
    cardIds: ["connection", "development", "contradiction-law", "unity-struggle"]
  },
  {
    id: "quantity-quality-negation",
    from: "量变质变",
    relation: "配合",
    to: "辩证否定",
    explanation: "量变质变解释发展如何发生飞跃；辩证否定解释新旧事物如何既继承又超越。两个一起背，适合创新、改革、成长类材料。",
    cardIds: ["quantity-quality", "dialectical-negation"]
  },
  {
    id: "practice-knowledge-truth",
    from: "实践",
    relation: "产生、检验并推动",
    to: "认识和真理",
    explanation: "认识论主线是“实践到认识，再回到实践”。看到不同认识、反复试错、检验标准，就走这条线。",
    cardIds: ["practice", "perceptual-rational", "truth", "practice-truth-standard"]
  },
  {
    id: "truth-value-innovation",
    from: "真理",
    relation: "统一于",
    to: "价值和实践创新",
    explanation: "真理解决是否符合客观规律，价值解决是否满足主体需要；二者统一，才能把认识转化为改造世界的行动。",
    cardIds: ["truth", "seeking-truth", "practice-truth-standard"]
  },
  {
    id: "social-existence-consciousness",
    from: "社会存在",
    relation: "决定",
    to: "社会意识",
    explanation: "历史唯物主义的入口：社会生活的物质方面决定精神方面，社会意识又有相对独立性并反作用于社会存在。",
    cardIds: ["social-existence", "social-consciousness"]
  },
  {
    id: "productive-relations",
    from: "生产力",
    relation: "决定",
    to: "生产关系",
    explanation: "生产力回答“人改造自然的能力到哪了”，生产关系回答“人在生产中怎么结成关系”。前者最终决定后者，后者反作用于前者。",
    cardIds: ["productive-forces", "relations-production", "social-basic-contradictions"]
  },
  {
    id: "base-superstructure",
    from: "经济基础",
    relation: "决定",
    to: "上层建筑",
    explanation: "经济基础是生产关系总和，上层建筑是制度和观念。判断社会制度、改革、治理问题时常用这组关系。",
    cardIds: ["economic-base", "superstructure", "social-basic-contradictions"]
  },
  {
    id: "commodity-value-law",
    from: "商品二因素",
    relation: "通过劳动二重性说明",
    to: "价值规律",
    explanation: "政经第一条线：商品有使用价值和价值，劳动有具体劳动和抽象劳动，价值量由社会必要劳动时间决定，交换遵循价值规律。",
    cardIds: ["commodity", "labor-duality", "necessary-labor-time", "value-law"]
  },
  {
    id: "labor-surplus-capital",
    from: "劳动力成为商品",
    relation: "产生",
    to: "剩余价值",
    explanation: "资本主义经济制度的关键不是普通买卖，而是劳动力商品的特殊使用价值能够创造超过自身价值的新价值。",
    cardIds: ["surplus-value", "constant-variable-capital", "capital-basic-contradiction"]
  },
  {
    id: "monopoly-chain",
    from: "垄断",
    relation: "发展出",
    to: "金融资本、金融寡头和垄断价格",
    explanation: "第五章按“自由竞争到垄断”背：垄断组织追求垄断利润，借金融资本和金融寡头强化控制，并通过垄断价格实现高额利润。",
    cardIds: ["monopoly", "financial-capital", "financial-oligarchy", "monopoly-price", "state-monopoly-capitalism"]
  }
];

export const memoryRoutes: MemoryRoute[] = [
  {
    id: "philosophy-mainline",
    title: "哲学总线：世界是什么、怎么变、怎么做",
    chapterIds: ["c1", "c2", "c3"],
    scenario: "适合材料分析、辨析题和大论述的万能定位。",
    steps: [
      "先用物质和意识确认立场：坚持世界物质统一性。",
      "再用联系、发展、矛盾说明材料中的变化动力。",
      "然后用实践和认识说明人如何把握规律、检验认识。",
      "最后落到社会历史：生产力、生产关系、人民群众和现实行动。"
    ],
    cardIds: ["matter", "consciousness", "connection", "development", "contradiction-law", "practice", "truth", "productive-forces", "people"]
  },
  {
    id: "dialectics-answer-line",
    title: "唯物辩证法答题线：联系-发展-矛盾-方法论",
    chapterIds: ["c1"],
    scenario: "适合人与自然、科技创新、绿色发展、专业成长类材料。",
    steps: [
      "联系：对象之间相互影响，不能孤立看。",
      "发展：事物处于变化过程，要看趋势和新事物。",
      "矛盾：抓主要矛盾和矛盾主要方面，说明动力。",
      "方法论：坚持全面、联系、发展、具体问题具体分析。"
    ],
    cardIds: ["connection", "development", "contradiction-law", "unity-struggle", "quantity-quality", "dialectical-negation"]
  },
  {
    id: "epistemology-answer-line",
    title: "认识论答题线：实践-认识-真理-再实践",
    chapterIds: ["c2"],
    scenario: "适合“认识不同”“反复探索”“如何检验正确性”的材料。",
    steps: [
      "实践是认识来源、动力、目的和检验标准。",
      "认识从感性到理性，并在实践中不断深化。",
      "真理具有客观性，也有绝对性和相对性。",
      "把正确认识回到实践，做到实事求是和守正创新。"
    ],
    cardIds: ["practice", "perceptual-rational", "truth", "practice-truth-standard", "seeking-truth"]
  },
  {
    id: "historical-materialism-line",
    title: "历史唯物主义线：社会存在-基本矛盾-人民群众",
    chapterIds: ["c3"],
    scenario: "适合社会发展、改革、科技、群众路线和现实治理类题。",
    steps: [
      "社会存在决定社会意识，生产方式是社会发展的决定力量。",
      "生产力和生产关系、经济基础和上层建筑构成社会基本矛盾。",
      "社会基本矛盾推动历史发展，改革是解决矛盾的重要方式。",
      "人民群众是历史创造者，行动上坚持群众观点。"
    ],
    cardIds: ["social-existence", "social-consciousness", "productive-forces", "relations-production", "economic-base", "superstructure", "social-basic-contradictions", "people"]
  },
  {
    id: "political-economy-line",
    title: "政经记忆线：商品-价值-剩余价值-垄断",
    chapterIds: ["c4", "c5"],
    scenario: "适合第四、第五章名词解释连背。",
    steps: [
      "商品有使用价值和价值，劳动二重性解释商品二因素。",
      "社会必要劳动时间决定价值量，价值规律支配商品交换。",
      "劳动力成为商品后，资本通过可变资本获得剩余价值。",
      "资本主义基本矛盾发展到垄断阶段，出现金融资本、金融寡头和垄断价格。"
    ],
    cardIds: ["commodity", "labor-duality", "necessary-labor-time", "value-law", "surplus-value", "constant-variable-capital", "capital-basic-contradiction", "monopoly", "monopoly-price"]
  }
];

export const answerPatterns: AnswerPattern[] = [
  {
    id: "definition",
    title: "名词解释三句法",
    useFor: "六选四名词解释",
    structure: ["第一句写属概念：它是什么范畴/规律/关系。", "第二句写核心关键词：构成、特征、决定关系。", "第三句写作用或地位：为什么重要。"],
    exampleCards: ["contradiction-law", "relations-production", "superstructure", "monopoly-price"]
  },
  {
    id: "material",
    title: "材料分析四步法",
    useFor: "哲学和认识论材料题",
    structure: ["定位：材料对应哪一章哪一组关系。", "原理：写出核心概念和辩证关系。", "解释：把材料关键词嵌入原理。", "方法论：落到应该如何认识和实践。"],
    exampleCards: ["connection", "development", "practice", "productive-forces"]
  },
  {
    id: "essay",
    title: "论述题推进法",
    useFor: "结合现实、专业、总师文化的大题",
    structure: ["先表态：坚持马克思主义立场观点方法。", "再展开：用实践、矛盾、人民群众或生产力逻辑分析。", "再结合：联系专业学习、工程实践、时代使命。", "最后落地：写具体行动，如调查研究、守正创新、服务人民。"],
    exampleCards: ["marxism", "practice", "contradiction-law", "people"]
  }
];
