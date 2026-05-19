import { useMemo, useState } from "react";
import {
  BarChart3,
  Brain,
  CheckCircle2,
  CircleAlert,
  Flame,
  GitBranch,
  Layers3,
  Lightbulb,
  ListTree,
  Network,
  RotateCcw,
  Search,
  Shuffle,
  Sparkles,
  Target,
  Trophy
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  chapters,
  answerPatterns,
  conceptLinks,
  examStrategy,
  flashcards,
  memoryRoutes,
  pastPapers,
  type CardStatus,
  type ChapterId,
  type ExamType,
  type Flashcard,
  type Importance
} from "./data/reviewData";
import { useReviewProgress } from "./hooks/useReviewProgress";

type View = "dashboard" | "chapters" | "map" | "cards" | "focus" | "weak";

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

const navItems: Array<{ id: View; label: string; icon: LucideIcon }> = [
  { id: "dashboard", label: "总览", icon: BarChart3 },
  { id: "chapters", label: "章节结构", icon: ListTree },
  { id: "map", label: "知识脉络", icon: Network },
  { id: "cards", label: "闪卡", icon: Layers3 },
  { id: "focus", label: "高频考点", icon: Target },
  { id: "weak", label: "薄弱项", icon: CircleAlert }
];

const chapterOptions = [{ id: "all", title: "全部章节" }, ...chapters.map((chapter) => ({ id: chapter.id, title: chapter.shortTitle }))];
const importanceOptions: Array<Importance | "全部"> = ["全部", "必背", "高频", "理解"];
const examTypeOptions: Array<ExamType | "全部"> = ["全部", "名词解释", "材料分析", "辨析题", "论述题"];

function getChapter(id: ChapterId) {
  return chapters.find((chapter) => chapter.id === id)!;
}

function getNextWeakCard(cards: Flashcard[], progress: Record<string, { status: CardStatus }>) {
  return (
    cards.find((card) => !progress[card.id] || progress[card.id].status === "hard") ??
    cards.find((card) => progress[card.id]?.status === "ok") ??
    cards[0]
  );
}

export function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedChapter, setSelectedChapter] = useState<ChapterId | "all">("all");
  const [selectedImportance, setSelectedImportance] = useState<Importance | "全部">("全部");
  const [selectedExamType, setSelectedExamType] = useState<ExamType | "全部">("全部");
  const [query, setQuery] = useState("");
  const [activeCardId, setActiveCardId] = useState(flashcards[0].id);
  const [flipped, setFlipped] = useState(false);

  const { progress, setStatus, resetProgress, stats } = useReviewProgress(flashcards.map((card) => card.id));

  const filteredCards = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return flashcards.filter((card) => {
      const chapterMatch = selectedChapter === "all" || card.chapterId === selectedChapter;
      const importanceMatch = selectedImportance === "全部" || card.importance === selectedImportance;
      const examTypeMatch = selectedExamType === "全部" || card.examTypes.includes(selectedExamType);
      const queryMatch =
        normalized.length === 0 ||
        card.term.toLowerCase().includes(normalized) ||
        card.answer.toLowerCase().includes(normalized) ||
        card.keywords.some((keyword) => keyword.toLowerCase().includes(normalized));
      return chapterMatch && importanceMatch && examTypeMatch && queryMatch;
    });
  }, [query, selectedChapter, selectedExamType, selectedImportance]);

  const activeCard = filteredCards.find((card) => card.id === activeCardId) ?? filteredCards[0] ?? flashcards[0];
  const activeLinks = conceptLinks.filter((link) => link.cardIds.includes(activeCard.id));
  const activeRoutes = memoryRoutes.filter((route) => route.cardIds.includes(activeCard.id));
  const weakCards = flashcards.filter((card) => {
    const status = progress[card.id]?.status ?? "unknown";
    return status === "unknown" || status === "hard" || status === "ok";
  });

  const chapterStats = chapters.map((chapter) => {
    const cards = flashcards.filter((card: Flashcard) => card.chapterId === chapter.id);
    const mastered = cards.filter((card: Flashcard) => progress[card.id]?.status === "mastered").length;
    return { chapter, cards, mastered, rate: cards.length === 0 ? 0 : Math.round((mastered / cards.length) * 100) };
  });

  const showCard = (cardId: string) => {
    setActiveCardId(cardId);
    setFlipped(false);
    setView("cards");
  };

  const selectRandomCard = () => {
    const pool = filteredCards.length > 0 ? filteredCards : flashcards;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setActiveCardId(random.id);
    setFlipped(false);
  };

  const selectWeakCard = () => {
    const weak = getNextWeakCard(flashcards, progress);
    setActiveCardId(weak.id);
    setFlipped(false);
    setView("cards");
  };

  const markCard = (status: CardStatus) => {
    setStatus(activeCard.id, status);
    setFlipped(false);
    const index = filteredCards.findIndex((card) => card.id === activeCard.id);
    const next = filteredCards[index + 1] ?? filteredCards[0];
    if (next) setActiveCardId(next.id);
  };

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark"><Brain size={22} /></div>
          <div>
            <p className="eyebrow">Marxism Review</p>
            <h1>马原高分复习</h1>
          </div>
        </div>

        <nav className="navList" aria-label="主导航">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={view === item.id ? "navItem active" : "navItem"} onClick={() => setView(item.id)}>
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sideCard">
          <p className="sideLabel">复习策略</p>
          <p>前五章优先，哲学抓材料题，政经抓名词解释。</p>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">本地静态站 · 进度保存在浏览器</p>
            <h2>{navItems.find((item) => item.id === view)?.label}</h2>
          </div>
          <div className="topActions">
            <button className="ghostButton" onClick={selectWeakCard}><Flame size={17} />刷薄弱项</button>
            <button className="ghostButton" onClick={selectRandomCard}><Shuffle size={17} />随机一张</button>
          </div>
        </header>

        {view === "dashboard" && (
          <section className="viewStack">
            <div className="heroPanel">
              <div>
                <p className="eyebrow">备考目标</p>
                <h3>把名词解释背准，把哲学原理用活。</h3>
                <p className="heroText">根据现有资料，学校考试更偏主观题。当前首版聚焦前五章：导论到第三章服务材料和论述，第四第五章服务名词解释。</p>
              </div>
              <div className="masteryCircle" aria-label={`掌握度 ${stats.masteryRate}%`}>
                <span>{stats.masteryRate}%</span>
                <small>综合掌握度</small>
              </div>
            </div>

            <div className="metricGrid">
              <Metric icon={Layers3} label="卡片总数" value={`${stats.total}`} />
              <Metric icon={CheckCircle2} label="已进入记忆" value={`${stats.completed}`} />
              <Metric icon={CircleAlert} label="待补强" value={`${stats.counts.unknown + stats.counts.hard + stats.counts.ok}`} />
              <Metric icon={Trophy} label="已掌握" value={`${stats.counts.mastered}`} />
            </div>

            <div className="twoColumn">
              <section className="panel">
                <div className="panelHeader">
                  <h3>今日建议</h3>
                  <button className="smallButton" onClick={selectWeakCard}>开始</button>
                </div>
                <div className="strategyList">
                  {examStrategy.map((item) => <p key={item}>{item}</p>)}
                </div>
              </section>

              <section className="panel">
                <div className="panelHeader">
                  <h3>章节进度</h3>
                  <span className="muted">按掌握卡片计算</span>
                </div>
                <div className="chapterProgressList">
                  {chapterStats.map(({ chapter, cards, mastered, rate }) => (
                    <button key={chapter.id} className="progressRow" onClick={() => { setSelectedChapter(chapter.id); setView("cards"); }}>
                      <span>{chapter.shortTitle}</span>
                      <div className="progressTrack"><i style={{ width: `${rate}%` }} /></div>
                      <strong>{mastered}/{cards.length}</strong>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <section className="panel">
              <div className="panelHeader">
                <h3>先按脉络理解，再用闪卡巩固</h3>
                <button className="smallButton" onClick={() => setView("map")}><Network size={16} />查看脉络</button>
              </div>
              <div className="routePreviewGrid">
                {memoryRoutes.slice(0, 3).map((route) => (
                  <button key={route.id} className="routePreview" onClick={() => setView("map")}>
                    <strong>{route.title}</strong>
                    <span>{route.scenario}</span>
                  </button>
                ))}
              </div>
            </section>
          </section>
        )}

        {view === "chapters" && (
          <section className="chapterGrid">
            {chapters.map((chapter) => (
              <article className="chapterCard" key={chapter.id}>
                <div className="chapterTitleRow">
                  <span className="chapterNumber">{chapter.order === 0 ? "导" : chapter.order}</span>
                  <div>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.role}</p>
                  </div>
                </div>
                <div className="sectionList">
                  {chapter.sections.map((section) => (
                    <div className="sectionBlock" key={section.title}>
                      <h4>{section.title}</h4>
                      <div className="tagWrap">
                        {section.points.map((point) => <span key={point} className="tag">{point}</span>)}
                      </div>
                      <p className="examFocus">{section.examFocus}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {view === "map" && (
          <section className="viewStack">
            <div className="panel">
              <div className="panelHeader">
                <h3>五条知识脉络</h3>
                <span className="muted">按“理解顺序”串概念，不按页码死背</span>
              </div>
              <div className="routeGrid">
                {memoryRoutes.map((route) => (
                  <article className="routeCard" key={route.id}>
                    <div className="routeCardHead">
                      <GitBranch size={19} />
                      <div>
                        <h4>{route.title}</h4>
                        <p>{route.scenario}</p>
                      </div>
                    </div>
                    <ol>
                      {route.steps.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                    <div className="tagWrap actionTags">
                      {route.cardIds.map((id) => {
                        const card = flashcards.find((item) => item.id === id);
                        if (!card) return null;
                        return <button key={id} className="tagButton" onClick={() => showCard(id)}>{card.term}</button>;
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panelHeader">
                <h3>概念关系图</h3>
                <span className="muted">考试时优先写“关系”，不是堆概念</span>
              </div>
              <div className="linkGrid">
                {conceptLinks.map((link) => (
                  <article className="linkCard" key={link.id}>
                    <div className="linkFlow">
                      <strong>{link.from}</strong>
                      <span>{link.relation}</span>
                      <strong>{link.to}</strong>
                    </div>
                    <p>{link.explanation}</p>
                    <div className="tagWrap actionTags">
                      {link.cardIds.map((id) => {
                        const card = flashcards.find((item) => item.id === id);
                        if (!card) return null;
                        return <button key={id} className="tagButton compact" onClick={() => showCard(id)}>{card.term}</button>;
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panelHeader">
                <h3>理解记忆和答题模板</h3>
                <span className="muted">把背诵变成可复用句式</span>
              </div>
              <div className="patternGrid">
                {answerPatterns.map((pattern) => (
                  <article className="patternCard" key={pattern.id}>
                    <div className="patternHead">
                      <Lightbulb size={18} />
                      <div>
                        <h4>{pattern.title}</h4>
                        <p>{pattern.useFor}</p>
                      </div>
                    </div>
                    <ul>
                      {pattern.structure.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <div className="tagWrap actionTags">
                      {pattern.exampleCards.map((id) => {
                        const card = flashcards.find((item) => item.id === id);
                        if (!card) return null;
                        return <button key={id} className="tagButton compact" onClick={() => showCard(id)}>{card.term}</button>;
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {view === "cards" && (
          <section className="cardsLayout">
            <div className="filters panel">
              <label className="searchBox">
                <Search size={18} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索术语、关键词或解释" />
              </label>
              <Select label="章节" value={selectedChapter} onChange={(value) => setSelectedChapter(value as ChapterId | "all")} options={chapterOptions.map((item) => ({ value: item.id, label: item.title }))} />
              <Select label="重要度" value={selectedImportance} onChange={(value) => setSelectedImportance(value as Importance | "全部")} options={importanceOptions.map((item) => ({ value: item, label: item }))} />
              <Select label="题型" value={selectedExamType} onChange={(value) => setSelectedExamType(value as ExamType | "全部")} options={examTypeOptions.map((item) => ({ value: item, label: item }))} />
              <div className="filterSummary">{filteredCards.length} 张匹配卡片</div>
            </div>

            <div className="flashcardArea">
              <button className={flipped ? "flashcard flipped" : "flashcard"} onClick={() => setFlipped((current) => !current)}>
                <div className="cardMeta">
                  <span>{getChapter(activeCard.chapterId).shortTitle}</span>
                  <span className={`importance ${activeCard.importance}`}>{activeCard.importance}</span>
                </div>
                {!flipped ? (
                  <div className="cardFace">
                    <p className="eyebrow">点击翻面查看答案</p>
                    <h3>{activeCard.term}</h3>
                    <div className="keywordLine">{activeCard.keywords.slice(0, 4).join(" · ")}</div>
                  </div>
                ) : (
                  <div className="cardFace answerFace">
                    <p className="eyebrow">答题关键词</p>
                    <h3>{activeCard.term}</h3>
                    <p>{activeCard.answer}</p>
                    <div className="tagWrap">{activeCard.keywords.map((keyword) => <span key={keyword} className="tag strong">{keyword}</span>)}</div>
                    <div className="memoryBox">
                      <strong>理解记忆</strong>
                      <span>{activeCard.logicHint ?? activeLinks[0]?.explanation ?? activeRoutes[0]?.steps[0] ?? "先抓属概念，再抓关键词，最后补作用或地位。"}</span>
                    </div>
                  </div>
                )}
              </button>

              {(activeLinks.length > 0 || activeRoutes.length > 0) && (
                <div className="panel relatedPanel">
                  {activeLinks.length > 0 && (
                    <div>
                      <h3>相关逻辑</h3>
                      <div className="relatedList">
                        {activeLinks.map((link) => (
                          <div className="relatedItem" key={link.id}>
                            <div className="linkFlow small">
                              <strong>{link.from}</strong>
                              <span>{link.relation}</span>
                              <strong>{link.to}</strong>
                            </div>
                            <p>{link.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeRoutes.length > 0 && (
                    <div>
                      <h3>所在脉络</h3>
                      <div className="tagWrap">
                        {activeRoutes.map((route) => <button key={route.id} className="tagButton" onClick={() => setView("map")}>{route.title}</button>)}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="cardControls">
                <button className="dangerButton" onClick={() => markCard("hard")}>不会</button>
                <button className="warnButton" onClick={() => markCard("ok")}>模糊</button>
                <button className="successButton" onClick={() => markCard("mastered")}>掌握</button>
              </div>

              <div className="cardList panel">
                {filteredCards.map((card) => {
                  const status = progress[card.id]?.status ?? "unknown";
                  return (
                    <button key={card.id} className={card.id === activeCard.id ? "miniCard active" : "miniCard"} onClick={() => { setActiveCardId(card.id); setFlipped(false); }}>
                      <span>{card.term}</span>
                      <i className={statusClass[status]}>{statusLabel[status]}</i>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {view === "focus" && (
          <section className="viewStack">
            <div className="panel">
              <div className="panelHeader">
                <h3>往年题导向</h3>
                <span className="muted">已整理本地资料中的 2024 秋回忆版</span>
              </div>
              {pastPapers.map((paper) => (
                <article className="paperBlock" key={paper.id}>
                  <h4>{paper.title}</h4>
                  <div className="paperGrid">
                    <PaperColumn title="名词解释" items={paper.terms} />
                    <PaperColumn title="材料分析" items={paper.analysis} />
                    <PaperColumn title="论述题" items={paper.essay} />
                  </div>
                  <div className="tagWrap actionTags">
                    {paper.relatedCardIds.map((id) => {
                      const card = flashcards.find((item) => item.id === id);
                      if (!card) return null;
                      return <button key={id} className="tagButton" onClick={() => showCard(id)}>{card.term}</button>;
                    })}
                  </div>
                </article>
              ))}
            </div>

            <div className="panel">
              <div className="panelHeader">
                <h3>必背清单</h3>
                <span className="muted">规律类、关系类、政经概念优先</span>
              </div>
              <div className="mustGrid">
                {flashcards.filter((card) => card.importance === "必背").map((card) => (
                  <button className="mustCard" key={card.id} onClick={() => showCard(card.id)}>
                    <strong>{card.term}</strong>
                    <span>{getChapter(card.chapterId).shortTitle} · {card.examTypes.join("/")}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {view === "weak" && (
          <section className="viewStack">
            <div className="panel">
              <div className="panelHeader">
                <h3>薄弱项</h3>
                <button className="smallButton dangerText" onClick={resetProgress}><RotateCcw size={16} />重置进度</button>
              </div>
              <div className="weakGrid">
                {weakCards.map((card) => {
                  const status = progress[card.id]?.status ?? "unknown";
                  return (
                    <button className="weakCard" key={card.id} onClick={() => showCard(card.id)}>
                      <span className={statusClass[status]}>{statusLabel[status]}</span>
                      <strong>{card.term}</strong>
                      <small>{getChapter(card.chapterId).shortTitle} · {card.keywords.slice(0, 3).join(" / ")}</small>
                    </button>
                  );
                })}
              </div>
              {weakCards.length === 0 && (
                <div className="emptyState">
                  <Sparkles size={34} />
                  <p>当前所有卡片都标记为掌握，可以开始随机复盘。</p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <nav className="mobileNav" aria-label="移动端导航">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setView(item.id)} aria-label={item.label}>
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="metricCard">
      <Icon size={20} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="selectField">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function PaperColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="paperColumn">
      <h5>{title}</h5>
      {items.map((item) => <p key={item}>{item}</p>)}
    </div>
  );
}
