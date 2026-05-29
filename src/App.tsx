import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  GraduationCap,
  RotateCcw,
  Search,
  Shuffle,
  Sparkles,
  Target,
  XCircle
} from "lucide-react";
import { allCards, sections, type CardStatus, type SectionId, type StudyCard } from "./data/reviewData";
import { useReviewProgress } from "./hooks/useReviewProgress";

type Mode = "all" | "review";

const statusLabel: Record<CardStatus, string> = {
  unknown: "未刷",
  hard: "不会",
  ok: "模糊",
  mastered: "掌握"
};

const statusClass: Record<CardStatus, string> = {
  unknown: "statusUnknown",
  hard: "statusHard",
  ok: "statusOk",
  mastered: "statusMastered"
};

function getAchievement(mastered: number, total: number) {
  const rate = total === 0 ? 0 : mastered / total;
  if (rate === 1) return "全掌握";
  if (rate >= 0.75) return "高分冲刺";
  if (rate >= 0.45) return "推进中";
  if (rate > 0) return "已启动";
  return "待开始";
}

function makeRandomDeck(cards: StudyCard[], limit = 8) {
  return [...cards].sort(() => Math.random() - 0.5).slice(0, limit);
}

function getSectionTitle(sectionId: SectionId) {
  return sections.find((section) => section.id === sectionId)?.title ?? "全部";
}

export function App() {
  const [selectedSection, setSelectedSection] = useState<SectionId | "all">("all");
  const [mode, setMode] = useState<Mode>("all");
  const [query, setQuery] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomDeck, setRandomDeck] = useState<StudyCard[] | null>(null);

  const { progress, setStatus, resetProgress, stats } = useReviewProgress(allCards.map((card) => card.id));

  const visibleCards = useMemo(() => {
    if (randomDeck) return randomDeck;

    const normalized = query.trim().toLowerCase();
    return allCards.filter((card) => {
      const sectionMatch = selectedSection === "all" || card.section === selectedSection;
      const modeMatch = mode === "all" || (progress[card.id]?.status ?? "unknown") !== "mastered";
      const haystack = [card.title, card.type === "principle" ? card.scope : card.category, card.content, card.type === "principle" ? card.method : ""]
        .join(" ")
        .toLowerCase();
      return sectionMatch && modeMatch && (normalized.length === 0 || haystack.includes(normalized));
    });
  }, [mode, progress, query, randomDeck, selectedSection]);

  const masteredCount = stats.counts.mastered;
  const achievement = getAchievement(masteredCount, stats.total);
  const activeCard = currentIndex < visibleCards.length ? visibleCards[currentIndex] : undefined;
  const deckDone = visibleCards.length > 0 && currentIndex >= visibleCards.length;
  const deckPosition = activeCard ? currentIndex + 1 : visibleCards.length;
  const deckProgress = visibleCards.length === 0 ? 0 : Math.round((Math.min(currentIndex, visibleCards.length) / visibleCards.length) * 100);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, visibleCards.length));
    setFlipped(false);
  }, [visibleCards.length]);

  const chooseSection = (section: SectionId | "all") => {
    setSelectedSection(section);
    setRandomDeck(null);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const startRandomReview = () => {
    const pool = allCards.filter((card) => (progress[card.id]?.status ?? "unknown") !== "mastered");
    setRandomDeck(makeRandomDeck(pool.length > 0 ? pool : allCards));
    setMode("review");
    setSelectedSection("all");
    setCurrentIndex(0);
    setFlipped(false);
  };

  const showAllCards = () => {
    setRandomDeck(null);
    setMode("all");
    setSelectedSection("all");
    setQuery("");
    setCurrentIndex(0);
    setFlipped(false);
  };

  const markCard = (cardId: string, status: CardStatus) => {
    setStatus(cardId, status);
    setFlipped(false);
    const shouldStayOnIndex = mode === "review" && !randomDeck && status === "mastered";
    setCurrentIndex((index) => Math.min(index + (shouldStayOnIndex ? 0 : 1), visibleCards.length));
  };

  const goPrevious = () => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
    setFlipped(false);
  };

  const goNext = () => {
    setCurrentIndex((index) => Math.min(index + 1, visibleCards.length));
    setFlipped(false);
  };

  const handleReset = () => {
    if (window.confirm("确定清空所有复习记录？")) {
      resetProgress();
      setRandomDeck(null);
      setCurrentIndex(0);
      setFlipped(false);
    }
  };

  return (
    <div className="appShell">
      <header className="topbar">
        <div className="brand">
          <div className="brandMark">马</div>
          <div>
            <p className="eyebrow">分析题原理 + 名词解释</p>
            <h1>26考研马原</h1>
          </div>
        </div>

        <div className="topbarRight">
          <div className="modeSwitch" aria-label="复习模式">
            <button className={mode === "all" ? "active" : ""} onClick={() => { setMode("all"); setRandomDeck(null); setCurrentIndex(0); setFlipped(false); }}>
              全部
            </button>
            <button className={mode === "review" ? "active" : ""} onClick={() => { setMode("review"); setRandomDeck(null); setCurrentIndex(0); setFlipped(false); }}>
              未掌握
            </button>
          </div>
          <button className="iconButton" onClick={handleReset} title="重置进度" aria-label="重置进度">
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <div className="searchBox">
            <Search size={18} />
            <input value={query} onChange={(event) => { setQuery(event.target.value); setRandomDeck(null); setCurrentIndex(0); setFlipped(false); }} placeholder="搜索：矛盾、剩余价值、实践..." />
          </div>

          <div className="sectionList">
            <button className={selectedSection === "all" && !randomDeck ? "sectionButton active" : "sectionButton"} onClick={() => chooseSection("all")}>
              <span className="sectionIcon"><BookOpen size={18} /></span>
              <span>
                <strong>全部卡片</strong>
                <small>{allCards.length} 张</small>
              </span>
            </button>

            {sections.map((section) => {
              const count = allCards.filter((card) => card.section === section.id).length;
              return (
                <button
                  key={section.id}
                  className={selectedSection === section.id && !randomDeck ? `sectionButton active ${section.accent}` : `sectionButton ${section.accent}`}
                  onClick={() => chooseSection(section.id)}
                >
                  <span className="sectionIcon"><Target size={18} /></span>
                  <span>
                    <strong>{section.title}</strong>
                    <small>{section.subtitle} · {count} 张</small>
                  </span>
                </button>
              );
            })}
          </div>

          <button className="randomButton" onClick={startRandomReview}>
            <Shuffle size={18} />
            随机抽卡复习
          </button>
        </aside>

        <section className="content">
          {randomDeck && (
            <div className="sessionBanner">
              <Sparkles size={18} />
              <span>随机复习已生成。刷完这组后，可以继续随机，也可以回到全部卡片。</span>
              <button onClick={showAllCards}>退出随机</button>
            </div>
          )}

          <div className="reviewStage">
            {visibleCards.length === 0 ? (
              <div className="emptyState">
                <GraduationCap size={34} />
                <h3>没有匹配的卡片</h3>
                <p>换个关键词，或切回全部卡片。</p>
              </div>
            ) : deckDone ? (
              <div className="completePanel">
                <CheckCircle2 size={42} />
                <h3>这一组刷完了</h3>
                <p>已经完成 {visibleCards.length} 张。可以回看上一张，或重新随机一组继续背。</p>
                <div className="completeActions">
                  <button className="navButton" onClick={goPrevious}><ArrowLeft size={17} />回看最后一张</button>
                  <button className="primaryButton" onClick={startRandomReview}><Shuffle size={17} />再随机一组</button>
                </div>
              </div>
            ) : (
              <>
                <div className="deckToolbar">
                  <button className="navButton" onClick={goPrevious} disabled={currentIndex === 0}>
                    <ArrowLeft size={17} />
                    上一张
                  </button>
                  <div className="deckCounter">
                    <strong>{deckPosition}</strong>
                    <span>/ {visibleCards.length}</span>
                    <div className="deckTrack"><div style={{ width: `${deckProgress}%` }} /></div>
                  </div>
                  <button className="navButton" onClick={goNext}>
                    下一张
                    <ArrowRight size={17} />
                  </button>
                </div>

                {activeCard && (
                  <div className="singleCardWrap">
                    <FlashCard
                      key={activeCard.id}
                      card={activeCard}
                      flipped={flipped}
                      status={progress[activeCard.id]?.status ?? "unknown"}
                      onFlip={() => setFlipped((current) => !current)}
                      onMark={(status) => markCard(activeCard.id, status)}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="metricGrid">
            <Metric label="不会" value={stats.counts.hard} tone="red" />
            <Metric label="模糊" value={stats.counts.ok} tone="amber" />
            <Metric label="掌握" value={stats.counts.mastered} tone="green" />
            <Metric label="当前卡组" value={visibleCards.length} tone="blue" />
          </div>

          <div className="summaryBand">
            <div>
              <p className="eyebrow">{randomDeck ? "随机复习" : selectedSection === "all" ? "全部知识" : getSectionTitle(selectedSection)}</p>
              <h2>{randomDeck ? `今日过卡 ${visibleCards.length} 张` : "一张一张背，过卡更专注"}</h2>
              <p>先看正面主动回忆，再翻面核对标准表达；标记“不会 / 模糊 / 掌握”后自动进入下一张。</p>
            </div>
            <div className="progressCard">
              <div className="progressTop">
                <span>{achievement}</span>
                <strong>{stats.masteryRate}%</strong>
              </div>
              <div className="progressTrack">
                <div style={{ width: `${stats.masteryRate}%` }} />
              </div>
              <small>{masteredCount}/{stats.total} 已掌握</small>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: "red" | "amber" | "green" | "blue" }) {
  return (
    <div className={`metric ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FlashCard({
  card,
  flipped,
  status,
  onFlip,
  onMark
}: {
  card: StudyCard;
  flipped: boolean;
  status: CardStatus;
  onFlip: () => void;
  onMark: (status: CardStatus) => void;
}) {
  return (
    <article className={flipped ? "flashCard flipped" : "flashCard"}>
      <button className="cardPlane" onClick={onFlip} aria-label={`${card.title} 翻面`}>
        <div className="cardFace cardFront">
          <div className="cardMeta">
            <span className={card.type === "term" ? "pill rose" : "pill blue"}>{card.type === "term" ? card.category : getSectionTitle(card.section)}</span>
            <span className={`statusPill ${statusClass[status]}`}>{statusLabel[status]}</span>
          </div>
          <h3>{card.title}</h3>
          {card.type === "principle" ? (
            <div className="frontHint">
              <span>适用范围</span>
              <p>{card.scope}</p>
            </div>
          ) : (
            <div className="frontHint">
              <span>回忆要求</span>
              <p>先默想定义的对象、关键词和所属模块，再翻面核对。</p>
            </div>
          )}
          <small>点击翻面</small>
        </div>

        <div className="cardFace cardBack">
          {card.type === "principle" ? (
            <div className="answerStack">
              <AnswerBlock title="适用范围" body={card.scope} tone="green" />
              <AnswerBlock title="原理内容" body={card.content} tone="blue" />
              <AnswerBlock title="方法论" body={card.method} tone="amber" />
            </div>
          ) : (
            <div className="answerStack">
              <AnswerBlock title="定义" body={card.content} tone="slate" />
              <AnswerBlock title="理解线索" body={`${card.category}模块：先定位概念所属关系，再背定义中的对象、性质、作用。`} tone="blue" />
            </div>
          )}
        </div>
      </button>

      <div className="cardActions">
        <button className="mark hard" onClick={() => onMark("hard")}><XCircle size={16} />不会</button>
        <button className="mark ok" onClick={() => onMark("ok")}><CircleHelp size={16} />模糊</button>
        <button className="mark mastered" onClick={() => onMark("mastered")}><CheckCircle2 size={16} />掌握</button>
      </div>
    </article>
  );
}

function AnswerBlock({ title, body, tone }: { title: string; body: string; tone: "green" | "blue" | "amber" | "slate" }) {
  return (
    <section className={`answerBlock ${tone}`}>
      <h4>{title}</h4>
      <p>{body}</p>
    </section>
  );
}
