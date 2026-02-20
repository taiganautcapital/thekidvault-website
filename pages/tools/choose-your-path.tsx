import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { C, FEEDBACK_URL } from "@/lib/data";
import { Logo, FeedbackButton } from "@/components/ui";

// ── TYPES ──────────────────────────────────────────────────
interface Choice {
  text: string;
  emoji: string;
  nextId: string;
}

interface MathBreakdown {
  formula: string;       // e.g. "Profit ÷ Starting Amount × 100"
  steps: string[];       // e.g. ["$12 − $10 = $2 profit", "$2 ÷ $10 × 100 = 20%"]
  result: string;        // e.g. "20% return in one day!"
}

interface StoryNode {
  id: string;
  scene: string;
  text: string;
  emoji: string;
  choices?: Choice[];
  outcome?: {
    type: "great" | "good" | "lesson";
    title: string;
    message: string;
    moneyLesson: string;
    emoji: string;
    coinsGained?: number;
    coinsLost?: number;
    math?: MathBreakdown;
  };
}

interface Story {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  accentColor: string;
  startingCoins: number;
  intro: string;
  nodes: Record<string, StoryNode>;
}

// ── MATH TOOLTIP COMPONENT ────────────────────────────────
function MathTip({ math, badgeColor }: { math: MathBreakdown; badgeColor: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => { setOpen(!open); if (!open) setExpanded(false); }}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "inline-flex", alignItems: "center", gap: 5,
          borderBottom: `2px dotted ${badgeColor}`,
          color: badgeColor, fontWeight: 700, fontSize: "inherit",
          fontFamily: "inherit", lineHeight: "inherit",
        }}
      >
        🧮 Show the Math
      </button>

      {open && (
        <span
          onClick={(e) => { if (e.target === e.currentTarget) { setOpen(false); setExpanded(false); } }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 9998, display: "block",
          }}
        />
      )}
      {open && (
        <span style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#1a2332", borderRadius: 14, padding: "16px 18px",
          width: "min(320px, 90vw)", zIndex: 9999,
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          display: "block",
          border: `1px solid ${badgeColor}40`,
        }}>
          {/* Formula line */}
          <span style={{ display: "block", marginBottom: 10 }}>
            <span style={{
              fontSize: 10, color: badgeColor, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: 1.5,
              fontFamily: "'Trebuchet MS',sans-serif", display: "block", marginBottom: 6,
            }}>
              📐 Formula
            </span>
            <span style={{
              fontSize: 13, color: "#fff", fontFamily: "'Trebuchet MS',sans-serif",
              background: "rgba(255,255,255,0.07)", borderRadius: 8,
              padding: "6px 10px", display: "block", lineHeight: 1.5,
              borderLeft: `3px solid ${badgeColor}`,
            }}>
              {math.formula}
            </span>
          </span>

          {/* Expand toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            style={{
              background: "none", border: `1px solid rgba(255,255,255,0.15)`,
              borderRadius: 20, padding: "5px 14px", color: "rgba(255,255,255,0.6)",
              fontSize: 11, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif",
              fontWeight: 600, display: "block", width: "100%", marginBottom: expanded ? 10 : 0,
              transition: "all 0.2s",
            }}
          >
            {expanded ? "▲ Hide steps" : "▼ Show step-by-step"}
          </button>

          {/* Step-by-step */}
          {expanded && (
            <span style={{ display: "block" }}>
              {math.steps.map((step, i) => (
                <span key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  marginBottom: i < math.steps.length - 1 ? 6 : 0,
                }}>
                  <span style={{
                    background: badgeColor, color: "#fff", borderRadius: "50%",
                    width: 18, height: 18, fontSize: 10, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1, fontFamily: "'Trebuchet MS',sans-serif",
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "'Trebuchet MS',sans-serif", lineHeight: 1.5 }}>
                    {step}
                  </span>
                </span>
              ))}
              <span style={{
                display: "block", marginTop: 10, padding: "8px 10px",
                background: `${badgeColor}20`, borderRadius: 8,
                fontSize: 12, fontWeight: 700, color: badgeColor,
                fontFamily: "'Trebuchet MS',sans-serif", textAlign: "center",
              }}>
                ✓ {math.result}
              </span>
            </span>
          )}

          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); setExpanded(false); }}
            style={{
              position: "absolute", top: 10, right: 10,
              background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%",
              width: 24, height: 24, cursor: "pointer", color: "rgba(255,255,255,0.6)",
              fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Trebuchet MS',sans-serif",
            }}
          >✕</button>
        </span>
      )}
    </span>
  );
}

// ── STORIES DATA ──────────────────────────────────────────
const STORIES: Story[] = [
  {
    id: "birthday-money",
    title: "The Birthday Windfall",
    subtitle: "You just got $50. What happens next?",
    emoji: "🎂",
    accentColor: C.ch2,
    startingCoins: 50,
    intro: "It's your birthday! Grandma slips you $50 in a card. 'Spend it wisely,' she winks. You stuff the cash in your pocket and head downtown with your best friend. The whole day is ahead of you...",
    nodes: {
      start: {
        id: "start",
        scene: "The Mall Entrance",
        emoji: "🛍️",
        text: "You and your friend walk past the mall entrance. The smell of fresh pretzels fills the air. A huge sign reads: 'NEW! Limited Edition Minecraft LEGO Set — $45!' Your friend nudges you. 'Dude, that's the one everyone wants!' But you also spot the bank your parents use across the street.",
        choices: [
          { text: "Rush into the store — gotta get that LEGO set!", emoji: "🧱", nextId: "lego-store" },
          { text: "Check out the bank first — what do they offer?", emoji: "🏦", nextId: "bank-first" },
          { text: "Walk around and see what else is here first", emoji: "👀", nextId: "explore" },
        ],
      },
      "lego-store": {
        id: "lego-store",
        scene: "The Toy Store",
        emoji: "🧱",
        text: "You grab the LEGO set — it's AMAZING. 8,000 pieces. But at the register, the cashier says 'That'll be $45 plus tax — $48.60 total.' You hand over your $50 and get $1.40 back. Your friend high-fives you. On the way home, you pass a smoothie stand...",
        choices: [
          { text: "Spend your last $1.40 on a smoothie sample", emoji: "🥤", nextId: "lego-broke" },
          { text: "Keep the $1.40 — every cent counts!", emoji: "💰", nextId: "lego-saved" },
        ],
      },
      "lego-broke": {
        id: "lego-broke",
        scene: "The Walk Home",
        emoji: "😅",
        text: "The smoothie is delicious but gone in 30 seconds. Now you have zero dollars. Your friend mentions the new Pokémon card pack drops next week. You shrug. 'Guess I'll have to wait for another birthday...'",
        outcome: {
          type: "lesson",
          title: "Fun Day, Empty Wallet",
          emoji: "😅",
          message: "You got an awesome LEGO set AND a smoothie. But now you have $0 left. The LEGO set will bring weeks of joy — the smoothie lasted 30 seconds.",
          moneyLesson: "Big purchases are fine when planned! But spending every last dollar leaves you with zero flexibility. Even saving $5 gives you options next week.",
          coinsLost: 50,
          math: {
            formula: "Starting Amount − All Spending = Remaining",
            steps: [
              "$50.00 starting birthday money",
              "$45.00 + tax = $48.60 for LEGO set",
              "$50.00 − $48.60 = $1.40 change",
              "$1.40 − $1.40 smoothie = $0.00 left",
            ],
            result: "$0 remaining — every dollar spent!",
          },
        },
      },
      "lego-saved": {
        id: "lego-saved",
        scene: "Your Room",
        emoji: "🧱",
        text: "You get home and start building immediately. Three hours fly by. When your mom calls you for dinner, you've built an entire village. And you still have $1.40 in your pocket.",
        outcome: {
          type: "good",
          title: "Great Purchase, Smart Finish",
          emoji: "🧱",
          message: "You spent on something you really wanted AND kept a little back. The LEGO set delivers joy for weeks. That's a great use of birthday money!",
          moneyLesson: "Spending on things that bring lasting joy is smart. Even keeping a tiny amount back is a good habit — it adds up over time!",
          coinsLost: 49,
          math: {
            formula: "Starting Amount − Purchase (with tax) = Remaining",
            steps: [
              "$50.00 starting birthday money",
              "$45.00 × 1.08 tax rate = $48.60 total cost",
              "$50.00 − $48.60 = $1.40 kept",
            ],
            result: "$1.40 saved — small but a great habit!",
          },
        },
      },
      "bank-first": {
        id: "bank-first",
        scene: "The Bank",
        emoji: "🏦",
        text: "A friendly banker explains you can open a kids' savings account with just $10. It earns 3% interest — meaning your money slowly grows while you sleep! If you put in $40, you'd have $41.20 in a year just for doing nothing. But the LEGO set is calling your name...",
        choices: [
          { text: "Deposit all $50 into savings — future me will be grateful!", emoji: "💳", nextId: "full-save" },
          { text: "Deposit $30, spend $20 on fun stuff", emoji: "⚖️", nextId: "split-smart" },
          { text: "Actually, forget savings — go get the LEGO set", emoji: "🏃", nextId: "lego-store" },
        ],
      },
      "full-save": {
        id: "full-save",
        scene: "One Year Later",
        emoji: "📈",
        text: "You deposited all $50. A year passes. You check your account online: $51.50. You've earned $1.50 for doing absolutely nothing! Meanwhile, you found other ways to have fun for free — the park, YouTube, your friend's LEGO sets. Next birthday you add another $50. Now you have $103.",
        outcome: {
          type: "great",
          title: "Future Millionaire Energy! 🚀",
          emoji: "🤑",
          message: "Saving all $50 was disciplined and powerful. Compound interest means your money makes money. By 18, consistent saving like this adds up to thousands!",
          moneyLesson: "Saving everything is great — but balance matters too. The best habit is saving MOST and spending a little. You nailed the saving part!",
          coinsGained: 2,
          math: {
            formula: "Principal × (1 + Interest Rate) = End Balance",
            steps: [
              "$50.00 deposited at 3% annual interest",
              "$50.00 × 0.03 = $1.50 interest earned",
              "$50.00 + $1.50 = $51.50 after year 1",
              "Add birthday $50 → $51.50 + $50.00 = $101.50",
              "Year 2 interest: $101.50 × 0.03 = $3.05",
              "$101.50 + $3.05 ≈ $104.55 after year 2",
            ],
            result: "Money grows without doing anything — that's compound interest!",
          },
        },
      },
      "split-smart": {
        id: "split-smart",
        scene: "Best of Both Worlds",
        emoji: "⚖️",
        text: "You deposit $30 and pocket $20 for fun. At the mall, $20 gets you: a new book ($8), a giant pretzel ($4), two Pokémon packs ($8). You and your friend open cards together, screaming when a holographic Charizard appears. A year later your bank account shows $30.90.",
        outcome: {
          type: "great",
          title: "The Smartest Move in Town! ⚖️",
          emoji: "🏆",
          message: "You saved AND had fun. This is the 4-Bucket Plan in real life — save some, spend some, grow some. You made memories AND built your savings. Perfect balance!",
          moneyLesson: "The 40/30/20/10 rule works because it honors both needs: saving for the future AND enjoying today. You instinctively found the balance — that's rare!",
          coinsLost: 19,
          math: {
            formula: "Saved Amount × (1 + Interest Rate) = End Balance",
            steps: [
              "$50.00 total to split",
              "$30.00 saved (60%) + $20.00 spent (40%)",
              "$30.00 × 0.03 = $0.90 interest earned",
              "$30.00 + $0.90 = $30.90 after 1 year",
              "$20.00 spent: book $8 + pretzel $4 + 2 Pokémon packs $8 = $20.00 ✓",
            ],
            result: "$30.90 saved + memories made. Best of both worlds!",
          },
        },
      },
      explore: {
        id: "explore",
        scene: "The Street Fair",
        emoji: "🎪",
        text: "Wandering around, you discover a surprise street fair! A kid your age is selling homemade friendship bracelets for $3 each. They look amazing. You also spot: a used bookstore ($2 books!), an arcade ($1 per game), and an ice cream cart. Your friend wants to try everything.",
        choices: [
          { text: "Buy 3 bracelets — support a fellow kid entrepreneur!", emoji: "🤝", nextId: "support-kid" },
          { text: "Spend $10 at the arcade — epic gaming session!", emoji: "🕹️", nextId: "arcade" },
          { text: "Get 5 books for $10 — knowledge is power!", emoji: "📚", nextId: "books" },
        ],
      },
      "support-kid": {
        id: "support-kid",
        scene: "The Bracelet Stand",
        emoji: "🤝",
        text: "You buy 3 bracelets for $9. The kid's face LIGHTS up. 'Thank you so much — I'm saving for art supplies!' You feel amazing. Walking home you get compliments on your bracelet. Next week at school, 4 kids ask where you got it. You tell them about the fair. The bracelet kid sells out!",
        outcome: {
          type: "great",
          title: "Community Champion! 🌟",
          emoji: "🌟",
          message: "You spent thoughtfully AND supported another young entrepreneur. You still have $41 left AND made someone's day. Your word-of-mouth even helped them sell out!",
          moneyLesson: "10% of money going to 'giving' isn't just charity — it creates real impact. And supporting kid entrepreneurs is the coolest way to spend. You spent with purpose!",
          coinsLost: 9,
          math: {
            formula: "Starting Amount − Purchase = Remaining",
            steps: [
              "$50.00 starting birthday money",
              "3 bracelets × $3.00 each = $9.00 spent",
              "$50.00 − $9.00 = $41.00 remaining",
              "$9.00 ÷ $50.00 × 100 = 18% of money spent on giving",
            ],
            result: "$41.00 left — and you made someone's day!",
          },
        },
      },
      arcade: {
        id: "arcade",
        scene: "The Arcade",
        emoji: "🕹️",
        text: "You and your friend spend 2 EPIC hours at the arcade. $10 vanishes but you're both laughing so hard your stomach hurts. You win 140 tickets and trade them for... a tiny plastic dinosaur. Your friend gets a temporary tattoo. You feel happy but the $10 is just... gone.",
        choices: [
          { text: "Keep gaming — spend another $10!", emoji: "🎮", nextId: "arcade-broke" },
          { text: "Stop here — you had your fun, save the rest", emoji: "✋", nextId: "arcade-smart" },
        ],
      },
      "arcade-broke": {
        id: "arcade-broke",
        scene: "Outside the Arcade",
        emoji: "😬",
        text: "Another $10 gone. You now have $30 left. Your friend wants ice cream ($4 each). You say yes. Now $22. Then a pretzel ($3). Now $19. Small decisions keep stacking up. By the end of the day you've spent $31 and can barely remember on what.",
        outcome: {
          type: "lesson",
          title: "The Spending Spiral 🌀",
          emoji: "😬",
          message: "Small purchases feel painless one at a time — $4 here, $3 there. But they stack FAST. You spent $31 and the memories are fuzzy. This is why tracking spending matters!",
          moneyLesson: "This is called 'lifestyle creep' — each little spend seems fine, but together they drain your wallet. The fix: decide your 'fun budget' BEFORE you start spending.",
          coinsLost: 31,
          math: {
            formula: "Running Total − Each Purchase = New Total",
            steps: [
              "$50.00 started the day with",
              "− $10.00 arcade (round 1) = $40.00",
              "− $10.00 arcade (round 2) = $30.00",
              "− $4.00 ice cream = $26.00",
              "− $3.00 pretzel = $23.00",
              "Total spent: $10 + $10 + $4 + $3 = $27... wait",
              "Plus other small stuff: $50 − $23 = $27 gone in small buys!",
            ],
            result: "$27 spent in small amounts — hard to track, easy to overspend!",
          },
        },
      },
      "arcade-smart": {
        id: "arcade-smart",
        scene: "Walking Away Winners",
        emoji: "✋",
        text: "You stop at $10 spent. You had the fun, you drew the line. Walking out with $40 still in your pocket, you feel weirdly powerful. Your friend is impressed. On the way home you spot a sale sign: 'Pokémon Booster Box — 2 left — $35.' With $40 you can actually afford it...",
        choices: [
          { text: "Buy the booster box — rare cards incoming!", emoji: "✨", nextId: "pokemon-buy" },
          { text: "Skip it — you didn't come here for this", emoji: "🚶", nextId: "arcade-walk-away" },
        ],
      },
      "pokemon-buy": {
        id: "pokemon-buy",
        scene: "Opening Night",
        emoji: "✨",
        text: "You buy the box for $35. Opening 36 packs with your friend is one of the best nights ever. You pull a full-art Pikachu ex worth $25 and a secret rare worth $40! You now have $65 in cards from a $35 investment. Your $5 left feels like a bonus.",
        outcome: {
          type: "great",
          title: "Collector & Investor Mode! 📈",
          emoji: "✨",
          message: "You spent $35 but got $65+ in value back! Trading cards can be investments when you know the market. You also had an amazing night. Smart AND fun!",
          moneyLesson: "Some 'spending' is actually investing! Collectibles, limited editions, and things that hold value can grow. The key: research before buying, not every pack pays off!",
          coinsLost: 45,
          math: {
            formula: "ROI = (Value Gained − Amount Spent) ÷ Amount Spent × 100",
            steps: [
              "$35.00 paid for booster box",
              "Cards pulled: Pikachu ex = $25 + secret rare = $40",
              "Total card value = $25 + $40 = $65",
              "Profit = $65 − $35 = $30",
              "ROI = $30 ÷ $35 × 100 = 85.7% return!",
              "Remaining cash: $50 − $10 arcade − $35 box = $5",
            ],
            result: "85.7% ROI — that's a great investment return!",
          },
        },
      },
      "arcade-walk-away": {
        id: "arcade-walk-away",
        scene: "Home Sweet Home",
        emoji: "🏠",
        text: "You walk away from the booster box. At home, $40 still in hand, you put it in your savings jar. Next month, you see the same box on sale for $25. You buy it then! AND you have money left over. Patience paid off literally.",
        outcome: {
          type: "great",
          title: "Patient & Powerful! ⏳",
          emoji: "⏳",
          message: "You resisted two temptations in one day — kept gaming AND skipped the impulse buy. Then you bought smarter when the price dropped. That's next-level money skill!",
          moneyLesson: "Impulse buys cost more than planned ones. Waiting just 24-48 hours before big purchases saves money AND reduces buyer's remorse. Patience is literally profitable!",
          coinsLost: 35,
          math: {
            formula: "Savings = Impulse Price − Sale Price",
            steps: [
              "Impulse price (day of): $35.00",
              "Sale price (1 month later): $25.00",
              "Savings from waiting: $35 − $25 = $10.00 saved!",
              "Money after arcade: $50 − $10 = $40 remaining",
              "After sale purchase: $40 − $25 = $15 still in pocket",
            ],
            result: "Patience saved $10 — that's a 28.6% discount just for waiting!",
          },
        },
      },
      books: {
        id: "books",
        scene: "The Used Bookstore",
        emoji: "📚",
        text: "You grab 5 awesome books for $10: a Diary of a Wimpy Kid you haven't read, a Magic Tree House, a book on how to draw manga, a joke book, and a book about young entrepreneurs. Your friend thinks you're boring. Three weeks later you've read all 5 and started drawing your own manga comic.",
        outcome: {
          type: "great",
          title: "Knowledge Investor! 📚",
          emoji: "📚",
          message: "Books are one of the highest-ROI purchases ever. $10 bought you hours of entertainment AND new skills. You're already drawing manga! That skill could earn money someday.",
          moneyLesson: "Investing in your brain always pays dividends. Skills you learn from books can eventually earn you way more than the books cost. Knowledge compounds just like interest!",
          coinsLost: 10,
          math: {
            formula: "Cost per Book = Total Spent ÷ Number of Books",
            steps: [
              "$10.00 total for 5 books",
              "$10.00 ÷ 5 books = $2.00 per book",
              "Each book = ~5 hours of reading",
              "5 books × 5 hours = 25 hours of entertainment",
              "$10 ÷ 25 hours = $0.40 per hour of fun!",
              "A movie ticket = ~$15 for 2 hours = $7.50/hr",
            ],
            result: "Books cost $0.40/hr vs $7.50/hr for movies — 94% cheaper per hour!",
          },
        },
      },
    },
  },

  {
    id: "lemonade-empire",
    title: "The Lemonade Empire",
    subtitle: "Turn $10 into something bigger",
    emoji: "🍋",
    accentColor: C.ch6,
    startingCoins: 10,
    intro: "It's the hottest Saturday of summer. You have $10 saved up from doing chores. Your neighbor just sold their lemonade stand for $200 and bought a new bike! A light bulb goes off. 'I could do that!' You run to the kitchen to plan your empire...",
    nodes: {
      start: {
        id: "start",
        scene: "Your Kitchen",
        emoji: "🍋",
        text: "You have $10 and a dream. Lemons are $3 for a bag, sugar is $2, cups are $2 for 20, and a pitcher is $2. That's $9 total for supplies — leaving you $1. But your friend texts: 'Want to go to the pool? It's free today!' The hottest day of the year...",
        choices: [
          { text: "Ignore the pool — business first! Buy all supplies.", emoji: "💪", nextId: "buy-supplies" },
          { text: "Go to the pool — there'll be other Saturdays", emoji: "🏊", nextId: "pool-regret" },
          { text: "Ask if your friend wants to be your business partner!", emoji: "🤝", nextId: "partnership" },
        ],
      },
      "buy-supplies": {
        id: "buy-supplies",
        scene: "The Stand",
        emoji: "🍋",
        text: "You set up your stand at 10am on the corner. You charge $1 per cup. By noon, you've sold 8 cups — $8! But it's SO hot you drink 2 cups yourself (that's $2 of profit gone). A kid offers to trade a baseball card for lemonade. Do you take the deal?",
        choices: [
          { text: "Trade! The card looks valuable.", emoji: "⚾", nextId: "card-trade" },
          { text: "No trades — cash only, you're running a business!", emoji: "💵", nextId: "cash-only" },
        ],
      },
      "pool-regret": {
        id: "pool-regret",
        scene: "The Pool... Then Home",
        emoji: "🏊",
        text: "The pool is amazing. But walking home sunburned, you pass THREE other lemonade stands. One kid made $34 today. 'Should have started my stand,' you think. Your $10 is still in your pocket — unspent, unearned. Tomorrow, will you try again?",
        choices: [
          { text: "Yes! Start the stand tomorrow — summer isn't over!", emoji: "💪", nextId: "buy-supplies" },
          { text: "It's too late now. Maybe save for something else.", emoji: "😔", nextId: "save-instead" },
        ],
      },
      "save-instead": {
        id: "save-instead",
        scene: "Your Piggy Bank",
        emoji: "🐷",
        text: "You decide not to do the stand at all. You put the $10 in your piggy bank. It's a bit disappointing but at least you have $10 saved. Sometimes not losing is winning.",
        outcome: {
          type: "lesson",
          title: "Safe but Stagnant 🐷",
          emoji: "🐷",
          message: "You kept your $10, which is safe! But the opportunity to GROW it passed. Sometimes inaction has a hidden cost — the money you didn't make.",
          moneyLesson: "This is called 'opportunity cost' — the cost of the thing you DIDN'T do. Your $10 is safe, but it didn't grow. Risk (with research) is often worth it!",
          math: {
            formula: "Opportunity Cost = Potential Earnings − Actual Earnings",
            steps: [
              "$10.00 kept safely in piggy bank",
              "Other kid earned: $34 that day",
              "Estimated profit if you ran stand: ~$11 (based on similar results)",
              "Opportunity cost = $11 − $0 = $11 in missed earnings",
              "Your $10 × 3% bank interest = only $0.30 in a full year",
            ],
            result: "You missed ~$11 in potential earnings — that's the opportunity cost!",
          },
        },
      },
      partnership: {
        id: "partnership",
        scene: "Business Meeting (Your Backyard)",
        emoji: "🤝",
        text: "Your friend says YES! They contribute $5 from their own savings. Now you have $15 total. You buy MORE supplies — extra lemons, a fun sign, even a little umbrella for shade. You split duties: they make lemonade, you handle sales. By 3pm you've sold 28 cups!",
        choices: [
          { text: "Split profits 50/50 like you agreed", emoji: "⚖️", nextId: "fair-split" },
          { text: "You did more work — ask for 60/40", emoji: "😬", nextId: "unfair-split" },
        ],
      },
      "fair-split": {
        id: "fair-split",
        scene: "Counting the Money",
        emoji: "⚖️",
        text: "28 cups × $1 = $28 revenue. Supplies cost $14. Profit: $14. You split it exactly: $7 each. Your friend is happy. 'Same time next Saturday?' You nod. Over 4 weekends you each make $28 profit total. Your friend tells their cousin. Now you have 3 people wanting to join.",
        outcome: {
          type: "great",
          title: "CEO of Lemonade! 🚀",
          emoji: "🚀",
          message: "Fair partnerships grow! Your $7 turned into $28 over 4 weekends because you kept a business partner happy. Now you have expansion opportunities. Real business thinking!",
          moneyLesson: "Fair deals keep partnerships alive. Greedy splits end businesses. The best entrepreneurs know: a smaller share of a bigger pie beats a big share of nothing!",
          coinsGained: 28,
          math: {
            formula: "Profit = Revenue − Costs, then ÷ Partners",
            steps: [
              "28 cups × $1.00 = $28.00 total revenue",
              "Supplies: lemons $3 + sugar $2 + cups $2 + sign $3 + umbrella $4 = $14.00",
              "Profit = $28.00 − $14.00 = $14.00",
              "$14.00 ÷ 2 partners = $7.00 each (day 1)",
              "4 weekends × $7.00 = $28.00 each total",
              "ROI per partner: invested $5, earned $28 = 460% return!",
            ],
            result: "460% ROI — partnerships multiply your earning power!",
          },
        },
      },
      "unfair-split": {
        id: "unfair-split",
        scene: "The Awkward Conversation",
        emoji: "😬",
        text: "You suggest 60/40 since you 'came up with the idea.' Your friend goes quiet. They agree, but something shifts. Next Saturday they're 'busy.' The Saturday after, busy again. You run the stand alone and make half as much without them. The friendship feels weird now.",
        outcome: {
          type: "lesson",
          title: "Short-Term Gain, Long-Term Loss 😬",
          emoji: "😬",
          message: "You made an extra $1.40 with the 60/40 split. But you lost your business partner AND it got awkward. That $1.40 cost you weeks of future profits AND a friendship.",
          moneyLesson: "In business, reputation is worth more than any single deal. People remember how you treated them. Fair > greedy, always — especially with friends!",
          coinsLost: 5,
          coinsGained: 8,
          math: {
            formula: "60/40 Split vs 50/50 Split — What's the real difference?",
            steps: [
              "Total profit day 1: $14.00",
              "50/50 split: you get $7.00",
              "60/40 split: you get $14 × 0.60 = $8.40",
              "Extra you gained: $8.40 − $7.00 = $1.40 more",
              "BUT: lost partner = solo stand next week",
              "Solo earnings (half traffic): ~$6 vs partnership ~$14",
              "Lost per week without partner: $14 − $6 = $8 less per week",
            ],
            result: "Gained $1.40 once, lost ~$8/week — not a good trade!",
          },
        },
      },
      "card-trade": {
        id: "card-trade",
        scene: "The Trade",
        emoji: "⚾",
        text: "You trade a cup of lemonade for the card. Later that day, you Google it: it's a 1987 rookie card worth $0.50. You gave away $1 of lemonade for a $0.50 card. Classic rookie mistake! But you learned something valuable about research...",
        choices: [
          { text: "Sell the card online anyway — every cent helps", emoji: "💻", nextId: "sell-card" },
          { text: "Keep it — you learned a lesson that's worth more", emoji: "📖", nextId: "lesson-card" },
        ],
      },
      "sell-card": {
        id: "sell-card",
        scene: "Online Marketplace",
        emoji: "💻",
        text: "You list the card for $0.75 (slightly above value). Someone buys it in 2 hours! After shipping costs of $0.40, you netted $0.35. You lost $0.65 on the original trade but recovered most of it. Your total stand earnings: $6 + $0.35 = $6.35.",
        outcome: {
          type: "good",
          title: "Quick Recovery! 💻",
          emoji: "💻",
          message: "You made a bad trade but immediately found a way to recover some losses. That's real-world problem solving! You even learned about online marketplaces in the process.",
          moneyLesson: "When you make a money mistake, don't just accept it — look for ways to recover. And ALWAYS research value BEFORE trading. Knowledge = power!",
          coinsLost: 9,
          coinsGained: 6,
          math: {
            formula: "Net Recovery = Sale Price − Shipping − Original Value Lost",
            steps: [
              "Lemonade sold for trade: $1.00 value given away",
              "Card actual value: $0.50 (looked up on Google)",
              "Loss on trade: $1.00 − $0.50 = $0.50 lost",
              "Listed card for $0.75, sold in 2 hours",
              "Shipping cost: $0.40",
              "Net from card sale: $0.75 − $0.40 = $0.35",
              "Partial recovery: got back $0.35 of the $1.00 given",
            ],
            result: "Recovered $0.35 of a $1.00 mistake — quick thinking saves money!",
          },
        },
      },
      "lesson-card": {
        id: "lesson-card",
        scene: "Your Room",
        emoji: "📖",
        text: "You pin the card on your wall with a note: 'Always research before trading.' It's your first business lesson — displayed like a trophy. Next week at the stand, you ONLY accept cash. You make $12 that day, your best ever.",
        outcome: {
          type: "great",
          title: "Lesson Learned = Future Earnings! 📖",
          emoji: "📖",
          message: "Converting a mistake into a lesson that earns more later? That's wisdom! Your research habit meant $12 the next weekend. The card was worth every cent.",
          moneyLesson: "The most expensive mistakes are the ones you repeat. Turn every loss into a rule. Successful people fail forward — they extract lessons and move on stronger!",
          coinsLost: 9,
          coinsGained: 12,
          math: {
            formula: "Lesson Value = Future Earnings Gained from the Mistake",
            steps: [
              "Cost of lesson: $1.00 lemonade traded away",
              "Week 2 earnings (cash only, no bad trades): $12.00",
              "Week 1 earnings (made bad trade): ~$6.00",
              "Improvement: $12.00 − $6.00 = $6.00 more earned",
              "The $1 mistake led to $6 more in earnings!",
              "ROI on mistake: $6 gain ÷ $1 cost × 100 = 500%",
            ],
            result: "A $1 mistake created a $6 improvement — 500% 'lesson ROI'!",
          },
        },
      },
      "cash-only": {
        id: "cash-only",
        scene: "End of Day",
        emoji: "💵",
        text: "Cash only — smart policy! You end the day with 20 cups sold × $1 = $20. Minus $9 supplies = $11 profit. You drank 2 cups (worth $2) but that's fine — perks of the job! Net: $11 cash + $1 you started with = $12 total. Not bad for one hot Saturday!",
        outcome: {
          type: "great",
          title: "First-Time Entrepreneur! 🍋",
          emoji: "🍋",
          message: "You turned $10 into $12 in one day — a 20% return! Most bank accounts take a YEAR to earn that. You built something, served customers, and made a profit. That's real business!",
          moneyLesson: "A 20% return in one day is incredible! The stock market averages 10% per YEAR. Entrepreneurship is high risk but high reward — and you just proved it works!",
          coinsLost: 9,
          coinsGained: 20,
          math: {
            formula: "ROI = (Ending Amount − Starting Amount) ÷ Starting Amount × 100",
            steps: [
              "20 cups × $1.00 = $20.00 revenue",
              "Supplies cost: $9.00",
              "Gross profit: $20.00 − $9.00 = $11.00",
              "Started with $10, now have $12 total ($11 profit + $1 leftover)",
              "ROI = ($12 − $10) ÷ $10 × 100 = 20% return",
              "Stock market average: 10% per YEAR",
              "You earned double that in ONE DAY! 🚀",
            ],
            result: "20% ROI in one day — way better than any bank or stock!",
          },
        },
      },
    },
  },

  {
    id: "gaming-dilemma",
    title: "The Gaming Dilemma",
    subtitle: "New game drops Friday. Your wallet has other plans.",
    emoji: "🎮",
    accentColor: C.ch5,
    startingCoins: 35,
    intro: "The most hyped game of the year — 'Galaxy Quest 3' — drops this Friday. It's $60. You have $35 saved. Your friends are ALL getting it. Group chat is exploding. You need $25 more in 4 days. The clock is ticking...",
    nodes: {
      start: {
        id: "start",
        scene: "Wednesday Evening",
        emoji: "🎮",
        text: "You need $25 in 4 days. You brainstorm fast: ask for an advance on chores, sell some old stuff, ask Grandma, or just wait and buy the game later when you have the full amount. What's your move?",
        choices: [
          { text: "Sell old games, toys, and stuff I don't use!", emoji: "📦", nextId: "sell-stuff" },
          { text: "Ask parents for a $25 advance on chores", emoji: "🧹", nextId: "chore-advance" },
          { text: "Wait and buy it next month when I have full $60", emoji: "⏳", nextId: "wait-patient" },
          { text: "Ask Grandma — she always says yes!", emoji: "👵", nextId: "ask-grandma" },
        ],
      },
      "sell-stuff": {
        id: "sell-stuff",
        scene: "The Garage Sale",
        emoji: "📦",
        text: "You dig through your room: 3 old games ($8 each), a tablet you don't use ($40), some LEGO sets ($15). That's $79 worth of stuff! But the tablet was $150 when new. Selling it for $40 feels wrong. Do you sell everything or just the games?",
        choices: [
          { text: "Sell everything — I need that game NOW!", emoji: "🔥", nextId: "sell-all" },
          { text: "Just sell the games ($24) — keep the tablet", emoji: "🎯", nextId: "sell-games-only" },
        ],
      },
      "sell-all": {
        id: "sell-all",
        scene: "Friday — Game Day!",
        emoji: "🎮",
        text: "You sold everything — raised $63! You buy Galaxy Quest 3 AND have $3 left. Epic! But a month later, school starts and you need your tablet for homework. Mom says you'll have to use the school library computer. You regret selling it...",
        outcome: {
          type: "lesson",
          title: "Short-Term Win, Long-Term Headache 😅",
          emoji: "😅",
          message: "You got the game AND extra cash! But selling a $150 tablet for $40 was a $110 loss. And now school is harder without it. The game was worth it — the tablet sale wasn't.",
          moneyLesson: "Before selling something, ask: 'Will I need this later?' Selling at a steep discount to fund something short-term often costs more in the long run. Patience > panic selling!",
          coinsGained: 3,
          math: {
            formula: "Depreciation Loss = Original Price − Resale Price",
            steps: [
              "3 games × $8 = $24 from games (fair value)",
              "Tablet: bought for $150, sold for $40",
              "Tablet depreciation loss: $150 − $40 = $110 lost",
              "LEGO sets sold for $15 (were worth more originally)",
              "Total raised: $24 + $40 + $15 = $79 − wait... $35 + $79 = $114? no",
              "Had $35 saved + sold $63 worth = $98 total → buy $60 game → $38 left",
              "But lost $110 in tablet value to gain $25 short-term. Bad trade.",
            ],
            result: "Lost $110 in tablet value to gain $25 short-term — a $85 net loss!",
          },
        },
      },
      "sell-games-only": {
        id: "sell-games-only",
        scene: "Almost There...",
        emoji: "🎯",
        text: "3 old games × $8 = $24. You have $35 + $24 = $59. ONE dollar short! Your little sibling offers to lend you $1. 'But you have to play with me this weekend.' Deal?",
        choices: [
          { text: "Deal! One dollar for a fun sibling weekend — easy!", emoji: "🤝", nextId: "sibling-deal" },
          { text: "No deal — I'll find that $1 myself!", emoji: "💪", nextId: "find-dollar" },
        ],
      },
      "sibling-deal": {
        id: "sibling-deal",
        scene: "The Best Weekend",
        emoji: "🤝",
        text: "You borrow the $1, buy the game, and spend Saturday playing with your sibling. They're actually pretty fun at board games. You pay them back Sunday from your snack money. Net cost: $60 for the game + 1 fun sibling afternoon. Total win.",
        outcome: {
          type: "great",
          title: "Smart Borrower, Great Sibling! 🌟",
          emoji: "🌟",
          message: "You only borrowed what you needed, paid it back immediately, and made a memory with your sibling. Responsible borrowing + family bonding = perfect outcome!",
          moneyLesson: "Good debt is small, purposeful, and paid back fast. Bad debt is large and lingers. You borrowed $1 and paid it back in 2 days — that's exactly how borrowing should work!",
          coinsLost: 35,
          math: {
            formula: "Total Cost = Purchase Price + Interest on Debt",
            steps: [
              "$35 saved + $24 from selling games = $59",
              "Borrowed $1 from sibling (0% interest — nice!)",
              "Total: $59 + $1 = $60 → bought game for $60",
              "Repaid $1 within 2 days from snack money",
              "Net interest paid: $0 (paid back same weekend)",
              "Total cost of game: exactly $60 — no extra cost!",
            ],
            result: "Borrowed smart: $1 at 0% interest, repaid in 2 days. Perfect!",
          },
        },
      },
      "find-dollar": {
        id: "find-dollar",
        scene: "The Couch Cushion Hunt",
        emoji: "🔍",
        text: "You check every pocket, every couch cushion, your old backpack. You find: 2 quarters, 1 dime, 3 nickels, 8 pennies... $0.73. Still need $0.27. You check your desk drawer and find a $1 bill you forgot about! You have $60 exactly!",
        outcome: {
          type: "great",
          title: "Treasure Hunter! 🔍",
          emoji: "🔍",
          message: "Resourcefulness! You found money you already had. This is why tracking your money matters — you had $1 hiding all along. Imagine if you'd borrowed $25 you didn't need!",
          moneyLesson: "Track your money! Most people have more than they think, hiding in pockets and drawers. A simple money tracker app or jar system shows you exactly what you have.",
          coinsLost: 34,
          math: {
            formula: "Total Found = Count Each Coin × Its Value",
            steps: [
              "2 quarters = 2 × $0.25 = $0.50",
              "1 dime = $0.10",
              "3 nickels = 3 × $0.05 = $0.15",
              "8 pennies = 8 × $0.01 = $0.08",
              "Coins total: $0.50 + $0.10 + $0.15 + $0.08 = $0.83",
              "Plus forgotten $1 bill = $1.83 found total",
              "$35 saved + $24 sold + $1.83 found = $60.83 → more than enough!",
            ],
            result: "Found $1.83 you forgot about — always check your pockets!",
          },
        },
      },
      "chore-advance": {
        id: "chore-advance",
        scene: "The Parent Negotiation",
        emoji: "🧹",
        text: "You present your case to your parents: 'I'll do 2 weeks of extra chores — dishes every night, laundry, vacuuming — for a $25 advance.' Dad looks impressed by the proposal. Mom asks: 'What happens if you don't follow through?' You say you'll owe double chores. They agree!",
        choices: [
          { text: "Stick to the deal — chores every single night", emoji: "✅", nextId: "chores-done" },
          { text: "Skip a few nights — they probably won't notice", emoji: "😬", nextId: "chores-skip" },
        ],
      },
      "chores-done": {
        id: "chores-done",
        scene: "Two Weeks Later",
        emoji: "✅",
        text: "Every night, dishes done. Laundry folded. Floors vacuumed. Dad says 'I'm genuinely proud of you.' You got the game AND your parents' trust. Next time you need something, they don't hesitate. Your word is worth more than $25.",
        outcome: {
          type: "great",
          title: "Word is Bond! 🏆",
          emoji: "🏆",
          message: "You made a deal and kept it. That's character. Your parents trust you more now, which is worth more than any amount of money. AND you got the game. Total win!",
          moneyLesson: "Keeping financial promises builds your reputation. Adults who keep their word get better loan rates, promotions, and opportunities. It starts with small promises like this!",
          coinsLost: 35,
          math: {
            formula: "Hourly Wage = Advance ÷ Hours of Chores Worked",
            steps: [
              "$25 advance received upfront",
              "Chores per night: dishes 20min + laundry 15min + vacuum 15min = 50min",
              "14 nights × 50 minutes = 700 minutes = 11.7 hours worked",
              "Effective wage: $25 ÷ 11.7 hours = $2.14/hour",
              "Minimum wage: ~$7.25/hour — chores pay less, but builds trust!",
              "Value of parents' trust: priceless (and future advances likely!)",
            ],
            result: "Earned $2.14/hr — below minimum wage, but gained priceless trust!",
          },
        },
      },
      "chores-skip": {
        id: "chores-skip",
        scene: "They Noticed",
        emoji: "😬",
        text: "Of course they noticed. Dad sits you down: 'You owe us 4 weeks of double chores now, per our agreement.' You're doing chores until next month AND you feel guilty playing the game you bought with borrowed money. The game isn't even that fun anymore.",
        outcome: {
          type: "lesson",
          title: "Debt + Guilt = Not Worth It 😬",
          emoji: "😬",
          message: "You got the game but lost your parents' trust and now owe 4 weeks of chores. The interest on your broken promise is higher than the original debt!",
          moneyLesson: "Breaking financial agreements has compounding consequences — just like interest. The cost of not paying your debts is always higher than the original amount. Trust is expensive to rebuild!",
          coinsLost: 35,
          math: {
            formula: "Penalty = Original Debt × Multiplier for Breaking Agreement",
            steps: [
              "Original deal: 2 weeks chores = $25 advance",
              "Broke deal: penalty = 2× chores for 2 weeks = 4 weeks total",
              "Original 2 weeks × 50 min/night × 14 nights = 11.7 hours",
              "Penalty 4 weeks × 50 min/night × 28 nights = 23.3 hours",
              "Extra chores owed: 23.3 − 11.7 = 11.6 additional hours",
              "Effective 'interest rate' on $25: 100% penalty (double the work)!",
            ],
            result: "Breaking the deal doubled the cost — 100% 'interest' on $25!",
          },
        },
      },
      "wait-patient": {
        id: "wait-patient",
        scene: "The Patient Plan",
        emoji: "⏳",
        text: "You decide to wait. It's HARD. Group chat goes wild Friday. Everyone's playing. You watch YouTube videos of gameplay to cope. Four weeks later, you have $60 saved. You buy the game... and discover it's now on sale for $45! You save $15 extra!",
        outcome: {
          type: "great",
          title: "Patience Pays — Literally! ⏳",
          emoji: "⏳",
          message: "Waiting saved you $15! You bought the same game for 25% less. And you still have $15 left over. Being patient with purchases is one of the most profitable money habits!",
          moneyLesson: "New game/product prices almost always drop within 4-8 weeks of launch. Waiting is a strategy. FOMO (fear of missing out) costs real money — patience earns it back!",
          coinsLost: 20,
          math: {
            formula: "Discount % = (Original Price − Sale Price) ÷ Original Price × 100",
            steps: [
              "Original launch price: $60.00",
              "Sale price 4 weeks later: $45.00",
              "Dollars saved: $60 − $45 = $15.00",
              "Discount %: $15 ÷ $60 × 100 = 25% off!",
              "Had saved $35 + 4 weeks more saving (est. $25 more) = $60",
              "Bought for $45, leftover: $60 − $45 = $15 still in pocket",
            ],
            result: "25% discount = $15 saved just by waiting 4 weeks!",
          },
        },
      },
      "ask-grandma": {
        id: "ask-grandma",
        scene: "Grandma's House",
        emoji: "👵",
        text: "Grandma listens carefully. Then she smiles: 'I'll give you $25 — but you have to earn it. Teach me how to use my new smartphone. Every hour you teach me = $5.' Five hours of teaching = $25. It takes all weekend but you learn something surprising: teaching is fun!",
        choices: [
          { text: "Spend the $25 on the game immediately!", emoji: "🎮", nextId: "grandma-spend" },
          { text: "Add it to savings — I'll buy the game next month at full price", emoji: "💰", nextId: "grandma-save" },
        ],
      },
      "grandma-spend": {
        id: "grandma-spend",
        scene: "Game Day!",
        emoji: "🎮",
        text: "You buy the game with your $35 + $25 = $60. Galaxy Quest 3 is INCREDIBLE. And Grandma texts you (using the skills you taught her!): 'Having fun with my new phone! Thank you so much! ❤️' Best $25 you ever earned.",
        outcome: {
          type: "great",
          title: "Earning with Purpose! ❤️",
          emoji: "❤️",
          message: "You didn't just ask for money — you EARNED it by creating real value for Grandma. And you discovered you enjoy teaching! That skill could become a real income source.",
          moneyLesson: "The best money comes from solving real problems for real people. You solved Grandma's tech problem, she solved your money problem. That's how every business works!",
          coinsLost: 35,
          math: {
            formula: "Hourly Rate = Total Earned ÷ Hours Worked",
            steps: [
              "5 hours of teaching × $5/hour = $25 earned",
              "$35 saved + $25 earned = $60 total",
              "Game cost: $60 → bought exactly!",
              "Your effective wage: $25 ÷ 5 hours = $5.00/hour",
              "Min wage is ~$7.25/hr, but this also built a skill!",
              "If you taught 3 more people: 3 × $25 = $75 more potential income",
            ],
            result: "Earned $5/hr teaching — and discovered a marketable skill!",
          },
        },
      },
      "grandma-save": {
        id: "grandma-save",
        scene: "The Savings Jar",
        emoji: "💰",
        text: "You add Grandma's $25 to your $35 = $60 saved. Then you wait a month and find the game on sale for $45. You buy it and have $15 left! You put $10 in savings and buy yourself ice cream with $5 to celebrate. Life is good.",
        outcome: {
          type: "great",
          title: "Earned, Saved, and Won! 🏆",
          emoji: "🏆",
          message: "Earned $25, saved it, bought the game cheaper, AND had ice cream money left. This is textbook perfect money management. You're basically a financial genius!",
          moneyLesson: "Earn → Save → Wait for the right price → Spend with leftover. That cycle, repeated for life, is literally how wealth is built. You just ran the full loop!",
          coinsLost: 20,
          math: {
            formula: "Total Savings = Earned + Saved − Spent + Leftover",
            steps: [
              "$35 original savings + $25 earned from Grandma = $60",
              "Waited 1 month → game drops to $45 (25% off)",
              "$60 − $45 = $15 remaining after purchase",
              "Allocated: $10 to savings jar + $5 for ice cream",
              "Net savings after everything: $10 new savings",
              "Compared to buying at launch ($60): saved $15 by waiting!",
            ],
            result: "Ran the full loop: Earn → Save → Wait → Buy smart → Keep $10!",
          },
        },
      },
    },
  },
];

// ── MATH TIP COMPONENT (see above) ────────────────────────
// ── COMPONENT ──────────────────────────────────────────────
const ChooseYourPathPage: NextPage = () => {
  const router = useRouter();
  const [phase, setPhase] = useState<"menu" | "story" | "end">("menu");
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [coins, setCoins] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);

  const currentNode = activeStory?.nodes[currentNodeId];

  const startStory = (story: Story) => {
    setActiveStory(story);
    setCurrentNodeId("start");
    setCoins(story.startingCoins);
    setHistory([]);
    setPhase("story");
  };

  const makeChoice = (nextId: string) => {
    if (animating || !activeStory) return;
    setAnimating(true);
    setHistory(h => [...h, currentNodeId]);
    setTimeout(() => {
      setCurrentNodeId(nextId);
      // Update balance if destination node has an outcome
      const nextNode = activeStory.nodes[nextId];
      if (nextNode?.outcome) {
        const gained = nextNode.outcome.coinsGained ?? 0;
        const lost = nextNode.outcome.coinsLost ?? 0;
        setCoins(c => c + gained - lost);
      }
      setAnimating(false);
    }, 300);
  };

  const goBack = () => {
    if (history.length === 0 || !activeStory) return;
    const prev = history[history.length - 1];
    // Reverse coin change if going back from an outcome node
    if (currentNode?.outcome) {
      const gained = currentNode.outcome.coinsGained ?? 0;
      const lost = currentNode.outcome.coinsLost ?? 0;
      setCoins(c => c - gained + lost);
    }
    setHistory(h => h.slice(0, -1));
    setCurrentNodeId(prev);
  };

  const resetToMenu = () => {
    setPhase("menu");
    setActiveStory(null);
    setCurrentNodeId("start");
    setHistory([]);
  };

  const outcomeColors = {
    great: { bg: "#0d2d1f", border: "#2d7a4f", badge: "#4CAF50", text: "#a8e6bf" },
    good:  { bg: "#1a2d0d", border: "#4a7a2d", badge: "#8BC34A", text: "#c8e6a8" },
    lesson:{ bg: "#2d1a0d", border: "#7a4a2d", badge: "#FF9800", text: "#ffe0b2" },
  };

  return (
    <>
      <Head>
        <title>Choose Your Path – Money Adventure Stories | The Kid Vault</title>
        <meta name="description" content="Interactive money decision stories for kids ages 6-12. Make choices, see consequences, and learn real financial lessons through adventure!" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div style={{ minHeight: "100vh", background: C.cream, fontFamily: "Georgia,serif", color: C.navy }}>

        {/* NAV */}
        <nav style={{ background: C.navy, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => phase === "menu" ? router.push("/tools") : resetToMenu()}>
            <Logo size={28} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Georgia,serif" }}>
              {phase === "menu" ? "The Kid Vault" : "← Stories"}
            </span>
          </div>
          {phase === "story" && activeStory && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "'Trebuchet MS',sans-serif" }}>Balance:</span>
              <span style={{ color: C.gold, fontWeight: 700, fontSize: 15, fontFamily: "'Trebuchet MS',sans-serif" }}>💰 ${coins}</span>
            </div>
          )}
        </nav>

        {/* ── MENU PHASE ── */}
        {phase === "menu" && (
          <>
            <div style={{ background: `linear-gradient(135deg, ${C.navy}, #2d1f4a)`, padding: "clamp(36px,6vw,60px) 24px clamp(52px,8vw,72px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle at 20% 50%, ${C.ch3} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${C.gold} 0%, transparent 40%)` }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "clamp(48px,10vw,72px)", marginBottom: 16 }}>🗺️</div>
                <h1 style={{ color: "#fff", fontSize: "clamp(28px,6vw,48px)", margin: "0 0 16px", fontFamily: "Georgia,serif", lineHeight: 1.1 }}>Choose Your Path</h1>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(15px,2.5vw,18px)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 12px", fontFamily: "'Trebuchet MS',sans-serif" }}>
                  Real money decisions. Real consequences. No wrong answers — just lessons!
                </p>
                <p style={{ color: C.gold, fontSize: 14, fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 600 }}>Pick a story and see where your choices lead 👇</p>
              </div>
              <svg viewBox="0 0 1440 48" style={{ position: "absolute", bottom: -1, left: 0, width: "100%", display: "block" }}>
                <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" fill={C.cream} />
              </svg>
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(32px,5vw,52px) 20px clamp(48px,8vw,80px)" }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{ fontSize: 12, color: C.gold, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 8 }}>3 Adventures</div>
                <h2 style={{ fontSize: "clamp(20px,4vw,28px)", color: C.navy, margin: 0 }}>Which story calls to you?</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,260px), 1fr))", gap: 20 }}>
                {STORIES.map((story) => (
                  <div key={story.id} onClick={() => startStory(story)}
                    style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.25s", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ height: 6, background: `linear-gradient(90deg, ${story.accentColor}, ${story.accentColor}80)` }} />
                    <div style={{ padding: "24px 22px" }}>
                      <div style={{ fontSize: 40, marginBottom: 14 }}>{story.emoji}</div>
                      <div style={{ fontSize: 11, color: story.accentColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 6 }}>Starting with ${story.startingCoins}</div>
                      <h3 style={{ fontSize: "clamp(17px,3vw,20px)", fontWeight: 700, color: C.navy, margin: "0 0 8px", lineHeight: 1.2 }}>{story.title}</h3>
                      <p style={{ fontSize: 13.5, color: C.textLight, lineHeight: 1.6, margin: "0 0 20px", fontFamily: "'Trebuchet MS',sans-serif" }}>{story.subtitle}</p>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: story.accentColor + "12", color: story.accentColor, padding: "8px 18px", borderRadius: 50, fontSize: 13, fontWeight: 700, fontFamily: "'Trebuchet MS',sans-serif", border: `1px solid ${story.accentColor}25` }}>
                        Start Adventure →
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 52, background: C.navy, borderRadius: 20, padding: "32px 28px", color: "#fff" }}>
                <h3 style={{ fontSize: 20, margin: "0 0 20px", color: C.gold }}>How it works</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,180px), 1fr))", gap: 16 }}>
                  {[
                    { icon: "📖", title: "Read the scene", desc: "Each scene puts you in a real money situation kids actually face." },
                    { icon: "🤔", title: "Make your choice", desc: "No right or wrong — just honest decisions. What would YOU do?" },
                    { icon: "🎯", title: "See what happens", desc: "Real consequences play out. Sometimes surprising!" },
                    { icon: "🧮", title: "Check the math", desc: "Every outcome shows the exact numbers behind the result. Tap to see the formula!" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "16px 14px" }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.goldLight, marginBottom: 4, fontFamily: "'Trebuchet MS',sans-serif" }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, fontFamily: "'Trebuchet MS',sans-serif" }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── STORY PHASE ── */}
        {phase === "story" && activeStory && currentNode && (
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(24px,4vw,40px) 20px clamp(40px,6vw,60px)" }}>

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif" }}>{activeStory.emoji} {activeStory.title}</span>
              {history.length > 0 && (
                <>
                  <span style={{ color: C.border }}>›</span>
                  <button onClick={goBack} style={{ background: "none", border: "none", color: C.gold, fontSize: 11, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 600, padding: 0 }}>← Back</button>
                </>
              )}
              <span style={{ marginLeft: "auto", fontSize: 11, color: C.textLight, fontFamily: "'Trebuchet MS',sans-serif" }}>Step {history.length + 1}</span>
            </div>

            {history.length === 0 && (
              <div style={{ background: `linear-gradient(135deg, ${activeStory.accentColor}15, ${activeStory.accentColor}05)`, border: `1px solid ${activeStory.accentColor}25`, borderRadius: 16, padding: "20px 22px", marginBottom: 20 }}>
                <p style={{ fontSize: "clamp(14px,2.5vw,15px)", lineHeight: 1.8, color: C.text, margin: 0, fontFamily: "'Trebuchet MS',sans-serif", fontStyle: "italic" }}>{activeStory.intro}</p>
              </div>
            )}

            <div style={{
              background: "#fff", borderRadius: 20, overflow: "hidden",
              border: `1px solid ${C.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.3s, transform 0.3s",
            }}>
              <div style={{ height: 5, background: `linear-gradient(90deg, ${activeStory.accentColor}, ${activeStory.accentColor}50)` }} />
              <div style={{ padding: "clamp(20px,4vw,28px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{currentNode.emoji}</span>
                  <div>
                    <div style={{ fontSize: 10, color: activeStory.accentColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontFamily: "'Trebuchet MS',sans-serif" }}>Scene</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>{currentNode.scene}</div>
                  </div>
                </div>
                <p style={{ fontSize: "clamp(14px,2.5vw,16px)", lineHeight: 1.85, color: C.text, margin: 0, fontFamily: "'Trebuchet MS',sans-serif" }}>{currentNode.text}</p>
              </div>

              {/* ── OUTCOME with Math Tooltip ── */}
              {currentNode.outcome && (() => {
                const oc = outcomeColors[currentNode.outcome.type];
                return (
                  <div style={{ background: oc.bg, borderTop: `2px solid ${oc.border}`, padding: "clamp(20px,4vw,28px)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 36 }}>{currentNode.outcome.emoji}</span>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: "inline-block", background: oc.badge, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 20, fontFamily: "'Trebuchet MS',sans-serif", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
                          {currentNode.outcome.type === "great" ? "⭐ Great Choice!" : currentNode.outcome.type === "good" ? "👍 Good Choice!" : "💡 Lesson Learned"}
                        </div>
                        <div style={{ fontSize: "clamp(16px,3vw,18px)", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{currentNode.outcome.title}</div>
                      </div>
                    </div>

                    <p style={{ fontSize: "clamp(13px,2.5vw,14px)", color: oc.text, lineHeight: 1.75, margin: "0 0 16px", fontFamily: "'Trebuchet MS',sans-serif" }}>
                      {currentNode.outcome.message}
                    </p>

                    {/* Math tooltip — dotted gold underline style */}
                    {currentNode.outcome.math && (
                      <div style={{ marginBottom: 16 }}>
                        <MathTip math={currentNode.outcome.math} badgeColor={oc.badge} />
                      </div>
                    )}

                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px", marginBottom: 20, borderLeft: `3px solid ${oc.badge}` }}>
                      <div style={{ fontSize: 11, color: oc.badge, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 6 }}>💡 Money Lesson</div>
                      <p style={{ fontSize: "clamp(12px,2vw,13px)", color: oc.text, lineHeight: 1.7, margin: 0, fontFamily: "'Trebuchet MS',sans-serif" }}>
                        {currentNode.outcome.moneyLesson}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button onClick={() => startStory(activeStory)} style={{ flex: 1, minWidth: 140, background: oc.badge, color: "#fff", border: "none", borderRadius: 50, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif" }}>
                        🔄 Try Again
                      </button>
                      <button onClick={resetToMenu} style={{ flex: 1, minWidth: 140, background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif" }}>
                        📚 Other Stories
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Choices */}
              {currentNode.choices && (
                <div style={{ padding: "0 clamp(20px,4vw,28px) clamp(20px,4vw,28px)" }}>
                  <div style={{ fontSize: 12, color: C.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'Trebuchet MS',sans-serif", marginBottom: 12, marginTop: 20 }}>
                    What do you do?
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {currentNode.choices.map((choice, i) => (
                      <button key={i} onClick={() => makeChoice(choice.nextId)}
                        style={{ display: "flex", alignItems: "center", gap: 14, padding: "clamp(12px,3vw,16px) clamp(14px,3vw,18px)", borderRadius: 14, border: `2px solid ${C.border}`, background: "#fff", cursor: "pointer", textAlign: "left", transition: "all 0.2s", fontFamily: "'Trebuchet MS',sans-serif" }}>
                        <span style={{ fontSize: 22, flexShrink: 0 }}>{choice.emoji}</span>
                        <span style={{ fontSize: "clamp(13px,2.5vw,15px)", fontWeight: 600, color: C.navy, lineHeight: 1.4 }}>{choice.text}</span>
                        <span style={{ marginLeft: "auto", color: C.gold, fontSize: 16, flexShrink: 0 }}>→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <FeedbackButton url={FEEDBACK_URL} />
    </>
  );
};

export default ChooseYourPathPage;
