import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const C = {
  gold: "#D4A843", goldLight: "#F5E6B8", goldDark: "#C4963A",
  navy: "#1A2332", navyLight: "#243447",
  cream: "#FFF9ED", teal: "#2EC4B6", white: "#FFFFFF",
  text: "#3A4A5C", textLight: "#6B7B8D", border: "#E8E0D0",
  ch1: "#E8725A", ch2: "#D4577A", ch3: "#9B6FC3", ch4: "#4A9B7F",
  ch5: "#4A8FBF", ch6: "#D49244", ch7: "#CF6B4A",
};

const FEEDBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLSckyfLCUDF4IfdR6tkTabCwCGbXZD23aIb-xF-4RKITgeuvww/viewform?usp=publish-editor";
const CONTACT_EMAIL = "contact@thekidvault.com";

function Logo({ size = 90 }) {
  const id = `m${size}${Math.random().toString(36).slice(2,6)}`;
  const op = (s) => {
    const cx=s/2,cy=s/2,r=s*0.46; let d="";
    for(let i=0;i<8;i++){const a=(Math.PI*2*i)/8-Math.PI/8;d+=(i===0?"M":"L")+(cx+r*Math.cos(a)).toFixed(1)+" "+(cy+r*Math.sin(a)).toFixed(1)+" ";}
    return d+"Z";
  };
  return (
    <svg width={size} height={size} viewBox="0 0 90 90">
      <defs>
        <linearGradient id={`g${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.gold}/><stop offset="100%" stopColor={C.goldDark}/>
        </linearGradient>
        <mask id={id}>
          <rect width="90" height="90" fill="white"/>
          <rect x="44" y="22" width="2" height="46" fill="black" opacity="0.6"/>
          <text x="31" y="58" textAnchor="middle" fontFamily="Georgia,serif" fontSize="32" fontWeight="700" fill="black">K</text>
          <text x="59" y="58" textAnchor="middle" fontFamily="Georgia,serif" fontSize="32" fontWeight="700" fill="black">V</text>
        </mask>
      </defs>
      <path d={op(90)} fill={`url(#g${id})`} mask={`url(#${id})`}/>
    </svg>
  );
}

const btnS = (bg, fg, extra={}) => ({
  background: bg, color: fg, border: "none", padding: "14px 32px", borderRadius: 50,
  fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Trebuchet MS',sans-serif",
  transition: "all 0.3s ease", ...extra,
});

const VOCAB = {
  "bartering": "Trading goods directly without using money — like swapping your sandwich for someone's chips.",
  "interest": "A fee paid for borrowing money, or money the bank pays YOU for keeping your money there.",
  "passive income": "Money you earn without actively working for it — your money does the work for you!",
  "FDIC (Federal Deposit Insurance Corporation)": "A government agency that protects your bank deposits up to $250,000 if a bank fails.",
  "compound interest": "When the interest you earn also starts earning its own interest — like a snowball getting bigger!",
  "simple interest": "Interest calculated only on your original deposit amount, not on any interest you've already earned.",
  "debt": "Money that you owe to someone else and need to pay back.",
  "currency": "The type of money used in a country, like dollars in the US or euros in Europe.",
  "deposit": "Putting money INTO a bank account for safekeeping.",
  "stocks": "Tiny ownership pieces of a company that you can buy and sell.",
  "bonds": "A loan YOU give to a company or government — they pay you back with interest.",
  "shares": "Another word for stocks — small pieces of ownership in a company.",
  "portfolio": "Your personal collection of all the different investments you own — like a team of players.",
  "diversification": "Spreading your money across different types of investments so one bad event doesn't ruin everything.",
  "NYSE (New York Stock Exchange)": "One of the biggest marketplaces in the world where people buy and sell stocks.",
  "ROI (Return on Investment)": "A score that shows how much money you gained compared to how much you spent.",
  "S&P 500 (Standard & Poor's 500)": "A collection of 500 of the biggest US companies bundled into one investment.",
  "index fund": "An investment that automatically buys a little bit of many companies at once.",
  "ETF (Exchange-Traded Fund)": "Similar to an index fund — a basket of many stocks you can buy as one investment.",
  "bull market": "When stock prices are going UP over time — named after a bull charging upward with its horns.",
  "bear market": "When stock prices are going DOWN over time — named after a bear swiping downward.",
  "Treasury bonds": "Very safe investments where you lend money to the US government.",
  "CD (Certificate of Deposit)": "A savings option where you lock your money in a bank for a set time to earn more interest.",
  "custodial account": "An investment account a parent or guardian manages for a kid until they're old enough.",
  "risk": "The chance that you could lose some or all of the money you invested.",
  "profit": "The money left over after you subtract your costs from what you earned.",
  "dividends": "Money a company pays to its stockholders as a share of the company's profits.",
  "inflation": "When prices go up over time, so the same amount of money buys less stuff than before.",
  "entrepreneur": "Someone who starts their own business — even kids can be entrepreneurs!",
  "Warren Buffett": "One of the most successful investors in history, known as the 'Oracle of Omaha.' He started investing at age 11.",
};

function Tip({word, children}) {
  const [show, setShow] = useState(false);
  const def = VOCAB[word] || "";
  return (
    <span style={{position:"relative",display:"inline"}}
      onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}
      onClick={()=>setShow(!show)}>
      <span style={{borderBottom:`2px dotted ${C.gold}`,cursor:"help",color:C.navy,fontWeight:600}}>{children || word}</span>
      {show && def && (
        <span style={{
          position:"absolute",bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",
          background:C.navy,color:"#fff",padding:"10px 14px",borderRadius:10,fontSize:13,lineHeight:1.5,
          width:"min(260px, 80vw)",zIndex:999,boxShadow:"0 8px 24px rgba(0,0,0,0.2)",
          fontFamily:"'Trebuchet MS',sans-serif",fontWeight:400,textAlign:"left",
          pointerEvents:"none",
        }}>
          <span style={{color:C.gold,fontWeight:700,fontSize:12,textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:4}}>{word}</span>
          {def}
          <span style={{position:"absolute",bottom:-6,left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:"6px solid transparent",borderRight:"6px solid transparent",borderTop:`6px solid ${C.navy}`}}/>
        </span>
      )}
    </span>
  );
}

function LessonText({text}) {
  const vocabKeys = Object.keys(VOCAB).sort((a,b) => b.length - a.length);
  let parts = [{type:"text", val:text}];
  for (const vk of vocabKeys) {
    const newParts = [];
    for (const part of parts) {
      if (part.type !== "text") { newParts.push(part); continue; }
      const searchWord = vk.includes("(") ? vk.split("(")[0].trim() : vk;
      const regex = new RegExp(`(${searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const splits = part.val.split(regex);
      for (const s of splits) {
        if (s.toLowerCase() === searchWord.toLowerCase()) {
          newParts.push({type:"vocab", word:vk, display:s});
        } else if (s) {
          newParts.push({type:"text", val:s});
        }
      }
    }
    parts = newParts;
  }
  return (
    <span>
      {parts.map((p, i) =>
        p.type === "vocab"
          ? <Tip key={i} word={p.word}>{p.display}</Tip>
          : <span key={i}>{p.val}</span>
      )}
    </span>
  );
}

const CH = [
  { id:1, t:"What Is Money?", icon:"🪙", c:C.ch1, d:"Where money came from, how to earn it, and why banks exist.",
    lessons:[
      {id:"1-1",t:"The Trading Problem",icon:"🔄",content:["Before money existed, people swapped things directly — three fish for a basket of berries. But what if the berry-picker wanted pottery, not fish?","This awkward matching problem is why humans invented money: a universal token that everyone agrees has value. Instead of finding someone who has what you want AND wants what you have, you just use money!","💡 This old system of swapping goods directly is called bartering. Some people still barter today, but money makes life much easier."]},
      {id:"1-2",t:"Money Through the Ages",icon:"📜",content:["Money has taken many forms throughout history. Ancient civilizations used cowrie shells, salt, and even large stones as currency.","Around 700 BCE, the kingdom of Lydia (modern-day Turkey) created the first metal coins. Later, China invented paper money. Today, most money is digital — numbers moving between computers when you tap a phone or swipe a card!","💡 The word 'salary' comes from the Latin word for salt. Roman soldiers were sometimes paid in salt because it was so valuable!"]},
      {id:"1-3",t:"Earning Your Own",icon:"💼",content:["Here are two magic questions to discover your money-making sweet spot: What makes you lose track of time? What do friends ask you for help with?","Where those two answers overlap is your earning superpower. Kids have started businesses washing cars, making friendship bracelets, tutoring classmates, walking dogs, and selling baked goods.","💡 You don't need to be a grown-up to earn money. Many successful entrepreneurs started their first businesses as kids!"]},
      {id:"1-4",t:"Borrowing and Owing",icon:"📋",content:["When you borrow your friend's $5 for lunch, you're in debt until you pay it back. Banks lend money too, but they charge a fee called interest.","Some borrowing helps you grow — like a student loan for college that helps you get a better job. Other borrowing shrinks your wealth — like buying stuff on a credit card that you can't pay back right away.","💡 The key rule: only borrow for things that will be worth MORE to you than the interest you'll pay."]},
      {id:"1-5",t:"Where Money Lives",icon:"🏦",content:["A piggy bank is fine for coins, but for serious saving, banks are safer. They're insured by the government through the FDIC (Federal Deposit Insurance Corporation) — up to $250,000!","Banks actually pay YOU a small amount called interest just for keeping your money there. They use your deposits to make loans to other people, and share some of the profit with you.","💡 You can keep money in savings accounts, checking accounts, online banks, or credit unions. Each has different benefits!"]}
    ],
    quiz:[
      {q:"Before money existed, people exchanged goods directly. What is this called?",o:["Shopping","Bartering","Banking","Investing"],c:1},
      {q:"A fee charged for borrowing money is called...",o:["A tip","A tax","Interest","A deposit"],c:2},
      {q:"Why are banks safer than a piggy bank?",o:["They look nicer","Money is insured by the government","They give free stuff","They hide it better"],c:1}
    ],
    act:{type:"money-idea",t:"My Money Idea",d:"Discover your earning superpower!"}
  },
  { id:2, t:"Becoming a Super Saver", icon:"🐷", c:C.ch2, d:"The 4-Bucket Plan, setting goals, and the joy of giving.",
    lessons:[
      {id:"2-1",t:"The Marshmallow Choice",icon:"🍪",content:["Imagine someone offers you one cookie now OR three cookies if you wait 30 minutes. That's the core of saving: giving up something small today to get something bigger tomorrow.","A kid who saves $8 per week from chores can buy a $200 gaming headset in just 25 weeks! Meanwhile, spending $8 every week on snacks leaves you with nothing.","💡 Scientists actually tested this with marshmallows! Kids who could wait for two marshmallows instead of eating one right away tended to be more successful later in life."]},
      {id:"2-2",t:"Needs, Wants, and Wishes",icon:"🎯",content:["Sort everything you spend on into three tiers. Needs: you must have them (food, water, shelter, school supplies). Wants: life is more fun with them (video games, trendy shoes). Wishes: big dream items (a trip, a laptop, a car someday).","Knowing the difference between these three is the #1 money skill. Before buying anything, ask yourself: which tier does this belong to?","💡 Here's a trick — if you're unsure whether something is a need or a want, wait 3 days. If you still think about it, it might be a real need!"]},
      {id:"2-3",t:"The 4-Bucket Plan",icon:"🪣",content:["Every time you get money, split it into four buckets: 40% for spending now, 30% for big goals, 20% for your future, and 10% for giving to others.","Even with just $10, that's $4 to spend, $3 toward something big, $2 for later, and $1 to share. It works with any amount!","💡 The hardest part is starting. Once it becomes a habit, it feels automatic — like brushing your teeth!"]},
      {id:"2-4",t:"Setting a Savings Goal",icon:"🎯",content:["A goal without a plan is just a wish! Write down: What do I want? How much does it cost? How much can I save per week?","Then divide cost by weekly savings to get your timeline. Want a $80 skateboard and save $5/week? That's 16 weeks! Celebrate milestones at 25%, 50%, and 75%.","💡 Put a picture of your goal somewhere you'll see it every day. Visual reminders keep you motivated!"]},
      {id:"2-5",t:"Where to Stash Your Cash",icon:"💰",content:["Short-term savings can go in a jar or piggy bank. Long-term savings should go in a real bank account where it earns interest.","For even longer-term goals, a CD (Certificate of Deposit) pays higher interest but locks your money for a set period — you agree not to touch it for 6 months, 1 year, or more.","💡 Think of it like a ladder: piggy bank → savings account → CD. Each step up earns more interest but is a bit less flexible."]},
      {id:"2-6",t:"The Joy of Giving",icon:"🤝",content:["Money isn't just for you! Donating to causes you care about, buying supplies for an animal shelter, or helping a friend in need — these are some of the most powerful things money can do.","You can also give your TIME, which is often worth more than cash. Volunteering, helping a neighbor, or mentoring a younger kid are all ways to give back.","💡 Studies show that people who give to others actually feel happier than people who spend only on themselves!"]}
    ],
    quiz:[
      {q:"In the 4-Bucket Plan, what percent goes toward your future?",o:["40%","30%","20%","10%"],c:2},
      {q:"A CD (Certificate of Deposit) is different from a savings account because...",o:["It plays music","It locks your money but pays more interest","It's free","It's only for adults"],c:1},
      {q:"Needs are different from wants because...",o:["Needs cost more","Needs are essential; wants make life more fun","No difference","Wants are more important"],c:1}
    ],
    act:{type:"budget-builder",t:"Budget Builder",d:"Split $20 across your 4 buckets!"}
  },
  { id:3, t:"The Magic of Interest", icon:"✨", c:C.ch3, d:"How your money grows while you sleep — the snowball effect.",
    lessons:[
      {id:"3-1",t:"Your Money's Rent Check",icon:"🏠",content:["When you put money in a bank, the bank uses it to make loans to other people. As a thank-you, they pay you a small fee called interest.","It's like your money is working a job while you sleep! This kind of earning without doing extra work is called passive income.","💡 Banks typically pay between 1% and 5% interest per year on savings accounts."]},
      {id:"3-2",t:"Simple Interest Explained",icon:"📝",content:["Simple interest is straightforward math. If you deposit $100 at 5% interest, you earn $5 every year. After 5 years, you'd have $125.","The formula is: Amount × Rate × Years. So $100 × 0.05 × 5 = $25 in interest, giving you $125 total.","💡 Simple interest is like getting the same-sized paycheck from your money every year."]},
      {id:"3-3",t:"Compound Interest: The Snowball",icon:"⛄",content:["What if the $5 you earned in Year 1 ALSO starts earning interest? In Year 2, you earn interest on $105 instead of $100.","The difference is tiny at first, but over decades it becomes enormous. It's like a snowball rolling downhill — it picks up more snow as it grows!","💡 After 30 years at 8%: simple interest turns $100 into $340. Compound interest turns it into $1,006!"]},
      {id:"3-4",t:"The Rule of 72",icon:"🔢",content:["Want a quick trick? Divide 72 by your interest rate to find how many years it takes to DOUBLE your money.","At 6%: 72 ÷ 6 = 12 years. At 8%: 72 ÷ 8 = 9 years. At 12%: 72 ÷ 12 = just 6 years!","💡 $100 at 8% becomes $200 in 9 years, $400 in 18 years, $800 in 27 years, $1,600 in 36 years!"]},
      {id:"3-5",t:"Why Being Young Is Your Superpower",icon:"⚡",content:["Ava starts saving $50/month at age 15 and stops at 25 (10 years, $6,000 total). Ben starts at 25 and saves $50/month until age 60 (35 years, $21,000 total).","At age 60, Ava has MORE money than Ben — even though she invested far less! Her money had more TIME to compound.","💡 This is why learning about money NOW is so powerful. You have the one thing money can't buy: time."]}
    ],
    quiz:[
      {q:"Compound interest is different from simple interest because...",o:["It's simpler","Your interest earns its own interest","It's for adults only","They're the same"],c:1},
      {q:"Using the Rule of 72, how long to double money at 8%?",o:["8 years","About 9 years","12 years","72 years"],c:1},
      {q:"Why do young investors have an advantage?",o:["They're smarter","They have more money","Their money has more time to compound","Special rates"],c:2}
    ],
    act:{type:"interest-calc",t:"Watch It Grow",d:"See your money grow year by year!"}
  },
  { id:4, t:"Introduction to Investing", icon:"📊", c:C.ch4, d:"Stocks, bonds, risk vs. reward, and thinking like a detective.",
    lessons:[
      {id:"4-1",t:"Saving vs. Investing",icon:"🅰️",content:["Saving is like parking your bike in the garage — safe but it stays the same. Investing is like planting a garden — some risk but potential to grow much bigger.","Saving protects your money. Investing grows it. Smart plans use BOTH — save for short-term needs, invest for long-term goals.","💡 Money you need in 1-2 years should be saved. Money you won't need for 5+ years can be invested."]},
      {id:"4-2",t:"What Are Stocks?",icon:"📈",content:["When a company needs money to grow, it sells tiny ownership pieces called stocks (also known as shares). Buy one share of a pizza chain and you literally own a tiny slice of that company!","If the chain opens more locations and earns more profit, your share becomes worth more. But if the company does poorly, your share could lose value.","💡 There are stock exchanges like the NYSE (New York Stock Exchange) where millions of stocks are bought and sold every day."]},
      {id:"4-3",t:"What Are Bonds?",icon:"📋",content:["A bond is basically an IOU. You lend money to a company or government, and they promise to pay you back with interest on a specific date.","Bonds are generally safer than stocks but grow slower. Think of it as being the bank — you're the one lending and earning interest!","💡 US Treasury bonds are considered some of the safest investments in the world."]},
      {id:"4-4",t:"The Risk-Reward Seesaw",icon:"⚖️",content:["Higher potential reward almost always comes with higher risk. Think of a video game: Easy mode has small prizes, Hard mode has the big treasure but more danger.","Smart investors find their comfort level. There's no single right answer — it depends on your age, goals, and personality.","💡 The younger you are, the more risk you can take — because you have lots of time to recover from losses."]},
      {id:"4-5",t:"Doing Your Homework",icon:"🔍",content:["Never invest in something you don't understand! Before putting money into any company, ask: What does this business sell? Who buys it?","Also check: Is the business growing or shrinking? Who are its competitors? Thinking like a detective protects your money.","💡 Warren Buffett — one of the most successful investors in history — says his #1 rule is: never invest in something you don't understand."]}
    ],
    quiz:[
      {q:"The main difference between saving and investing is...",o:["No difference","Saving keeps money safe; investing aims to grow it","Investing is only for adults","Saving earns more"],c:1},
      {q:"When you buy a stock, you are...",o:["Lending money","Becoming a part-owner of a company","Opening a bank account","Buying a bond"],c:1},
      {q:"Why research before investing?",o:["It's the law","To understand what you're buying and reduce risk","To impress friends","Research isn't needed"],c:1}
    ],
    act:{type:"biz-detective",t:"Business Detective",d:"Investigate 3 businesses and pick the best investment!"}
  },
  { id:5, t:"The Investment Menu", icon:"🗂️", c:C.ch5, d:"From super-safe savings accounts to adventurous stocks.",
    lessons:[
      {id:"5-1",t:"The Safety Zone",icon:"🛡️",content:["Savings accounts let you access cash anytime and earn small interest. Very safe! CDs (Certificates of Deposit) lock your money for a set period in exchange for higher rates.","Treasury bills are loans to the US government — essentially the safest investment in the world.","💡 These safe investments won't make you rich fast, but they protect your money and provide a solid foundation."]},
      {id:"5-2",t:"The Middle Ground",icon:"⚖️",content:["Instead of betting on one company, buy a 'basket' of hundreds. An S&P 500 (Standard & Poor's 500) index fund holds a piece of the 500 largest US companies.","If a few go down, others go up — you're diversified automatically. Historically, this basket has grown about 10% per year on average.","💡 Index funds are one of the most popular investments for beginners because they spread risk automatically."]},
      {id:"5-3",t:"The Adventure Zone",icon:"🎢",content:["Picking specific companies can lead to big wins or big losses. A 'bull market' means prices charge upward. A 'bear market' means prices fall.","Over long periods, bull markets happen more often and last longer than bear markets. Patience pays off!","💡 Even during scary bear markets, patient investors who held on almost always came out ahead eventually."]},
      {id:"5-4",t:"Beyond the Market",icon:"🏠",content:["You can invest in property, rare collectibles (art, trading cards, sneakers), or brand-new companies (startups). Each has unique risks and rewards.","A rare baseball card might be worth thousands someday... or just cardboard. Real estate usually grows but requires lots of money upfront.","💡 The best investors spread their money across several types of investments — not just one."]},
      {id:"5-5",t:"Return on Investment",icon:"📊",content:["ROI (Return on Investment) measures how good an investment is. Here's how to calculate it: Profit = Money Earned − Money Spent. Then ROI = (Profit ÷ Money Spent) × 100.","Example: You spent $50 on lemonade supplies and earned $75. Profit = $25. ROI = ($25 ÷ $50) × 100 = 50%. You earned back half of what you spent!","💡 ROI works for everything — spending 2 hours studying for an A on a test? Great ROI on your time!"]}
    ],
    quiz:[
      {q:"A Treasury bill is safe because...",o:["It's expensive","It's backed by the US government","It's new","It pays the most"],c:1},
      {q:"An index fund contains...",o:["One stock","Hundreds of companies bundled together","Only bonds","Only savings"],c:1},
      {q:"ROI (Return on Investment) stands for...",o:["Rate of Income","Return on Investment","Risk of Interest","Range of Indexes"],c:1}
    ],
    act:{type:"risk-ranker",t:"Risk-O-Meter",d:"Rank investments from lowest to highest risk!"}
  },
  { id:6, t:"Be a Smart Investor", icon:"🧠", c:C.ch6, d:"Diversification, patience, portfolios, and investing with values.",
    lessons:[
      {id:"6-1",t:"Don't Put All Eggs in One Basket",icon:"🥚",content:["Imagine you sell only lemonade. Rainy week? Zero sales. But if you also sell hot cocoa, rainy days become great for business!","That's diversification — spreading money across different investments so no single bad event ruins everything.","💡 Even professionals who study markets full-time practice diversification. Nobody can predict the future!"]},
      {id:"6-2",t:"Building Your Team (Portfolio)",icon:"⚽",content:["Your portfolio is like a sports team. You want fast scorers (stocks), strong defense (bonds), and a reliable goalkeeper (cash/savings).","The right mix depends on your age, personality, and goals. Someone nervous might want more bonds. Someone adventurous might want more stocks.","💡 The best portfolio is the one that lets you sleep well at night AND reach your goals."]},
      {id:"6-3",t:"Age and Your Investment Mix",icon:"📅",content:["Simple rule: subtract your age from 110 for your stock percentage. Age 10: 110-10 = 100% stocks. Age 50: 110-50 = 60% stocks, 40% bonds.","This is just a guideline. The key idea: the younger you are, the more growth-focused you can be because you have time to recover from dips.","💡 As you get older and closer to needing the money, gradually shift toward safer investments."]},
      {id:"6-4",t:"Patience Wins",icon:"🧘",content:["The stock market goes up AND down. If you panic-sell every dip, you lock in losses. Patient investors who stayed through downturns almost always came out ahead.","Think of a roller coaster — scary drops, but stay seated and you end up back on top. The market has recovered from every crash in history.","💡 Patient Pat stays invested through ups and downs. Panicking Pete sells at every dip and misses the recovery."]},
      {id:"6-5",t:"Investing With Your Values",icon:"🌱",content:["You can invest in companies that match what you care about. Love the environment? Clean energy companies. Care about fairness? Companies with diverse leadership.","This lets your money support the world you want while still earning returns. More young investors are choosing this path.","💡 You can also AVOID companies you disagree with. Your money is a vote for the kind of world you want."]}
    ],
    quiz:[
      {q:"Diversification means...",o:["Buying one great stock","Spreading investments so one bad event doesn't ruin everything","Only investing in bonds","Saving in a piggy bank"],c:1},
      {q:"When markets drop, smart long-term investors usually...",o:["Sell everything","Stay patient and wait for recovery","Stop investing forever","Move to cash"],c:1}
    ],
    act:{type:"portfolio-builder",t:"Portfolio Builder",d:"Create your investment mix!"}
  },
  { id:7, t:"Your Money Future", icon:"🌟", c:C.ch7, d:"Putting it all together and taking your first real steps.",
    lessons:[
      {id:"7-1",t:"Early Bird Gets the Worm",icon:"🐦",content:["Starting early is the single most powerful thing you can do with money. Even small amounts, given enough time, grow into something amazing.","A teenager who invests $1,000 once at age 15 can have more at 60 than an adult who starts at 30 and invests $1,000 per year. That's time + compound interest!","💡 You don't need a lot of money to start. Even $1 invested today is better than $100 invested 'someday.'"]},
      {id:"7-2",t:"Your 5-Step Money Roadmap",icon:"🗺️",content:["Step 1: Find ways to earn (chores, services, small business). Step 2: Pay yourself first (save before you spend). Step 3: Set clear goals (what, how much, when).","Step 4: Start small with investing (ask a parent about custodial accounts). Step 5: Keep learning — read, watch, ask questions, stay curious!","💡 You don't have to do all 5 at once. Start with Step 1, add others as you grow."]},
      {id:"7-3",t:"Dream Big",icon:"🌈",content:["Your financial goals will change as you grow. Now: a bike or video game. At 20: college or travel. At 30: a home. At 60: freedom to do whatever you want.","The skills you're learning RIGHT NOW — saving, budgeting, investing — apply at every stage of life.","💡 Write down three goals: one for this year, one for age 20, and one big dream. Put them where you'll see them!"]},
      {id:"7-4",t:"Money Is a Tool, Not the Goal",icon:"❤️",content:["The richest life isn't about having the most money — it's about having choices. Money lets you help family, pursue passions, give back, and handle surprises.","The real goal is freedom, security, and the ability to make a difference. Money is just the tool that helps you get there.","💡 Congratulations — by finishing The Kid Vault, you understand more about money than many adults! Share what you've learned."]}
    ],
    quiz:[
      {q:"The most powerful advantage young people have is...",o:["More money","Time for compound interest to work","Better luck","Special accounts"],c:1},
      {q:"What's the first step in the Money Roadmap?",o:["Buy stocks","Find ways to earn money","Open a bank","Wait until 18"],c:1}
    ],
    act:{type:"certificate",t:"Certificate of Achievement",d:"Celebrate your graduation!"}
  }
];

function MoneyIdeaAct({onDone}){
  const[enjoy,setE]=useState(null);const[good,setG]=useState(null);
  const ej=["🐾 Animals","🍳 Cooking","🎨 Art & Crafts","⚽ Sports","🤝 Helping","💻 Technology"];
  const gd=["😊 Patience","🎨 Creativity","🏃 Being Active","👂 Listening","🔧 Building","📖 Explaining"];
  const ideas={"0-0":"Pet sitting & dog walking","0-1":"Custom pet portraits","0-2":"Dog treat baker","0-3":"Pet fitness trainer","0-4":"Animal shelter volunteer coordinator","0-5":"Pet care blog","1-0":"Neighborhood baking business","1-1":"Custom cake decorator","1-2":"Cooking class for kids","1-3":"Healthy snack delivery","1-4":"Community meal organizer","1-5":"Recipe video creator","2-0":"Face painting at events","2-1":"Handmade jewelry shop","2-2":"Custom greeting cards","2-3":"Sports team banner designer","2-4":"Art fundraiser organizer","2-5":"Art tutor","3-0":"Sports equipment organizer","3-1":"Custom sports gear designer","3-2":"Backyard sports camp","3-3":"Personal fitness buddy","3-4":"Youth sports referee","3-5":"Sports skills coach","4-0":"Elderly neighbor helper","4-1":"Gift wrapping service","4-2":"Yard work & garden helper","4-3":"Errand runner","4-4":"Community event planner","4-5":"Homework tutor","5-0":"Tech setup helper","5-1":"Website designer","5-2":"Phone repair helper","5-3":"Gaming tournament organizer","5-4":"Digital skills teacher","5-5":"Tech blog creator"};
  const sel={padding:"10px 16px",borderRadius:10,cursor:"pointer",fontSize:14,border:"2px solid",transition:"all 0.2s"};
  return(<div>
    <p style={{fontSize:15,color:C.text,marginBottom:16}}>What do you enjoy most?</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
      {ej.map((e,i)=>(<button key={i} onClick={()=>setE(i)} style={{...sel,borderColor:enjoy===i?C.gold:C.border,background:enjoy===i?C.gold+"15":"#fff",fontWeight:enjoy===i?700:400,color:C.navy}}>{e}</button>))}
    </div>
    <p style={{fontSize:15,color:C.text,marginBottom:16}}>What are you good at?</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:24}}>
      {gd.map((g,i)=>(<button key={i} onClick={()=>setG(i)} style={{...sel,borderColor:good===i?C.gold:C.border,background:good===i?C.gold+"15":"#fff",fontWeight:good===i?700:400,color:C.navy}}>{g}</button>))}
    </div>
    {enjoy!==null&&good!==null&&(<div style={{background:C.gold+"12",borderRadius:14,padding:20,textAlign:"center",marginBottom:16}}>
      <div style={{fontSize:13,color:C.gold,fontWeight:700,textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>Your Money Idea</div>
      <div style={{fontSize:20,fontWeight:700,color:C.navy}}>{ideas[`${enjoy}-${good}`]}</div>
    </div>)}
    {enjoy!==null&&good!==null&&(<button onClick={onDone} style={{...btnS(C.gold,C.navy,{width:"100%"})}}>Complete Activity ⭐</button>)}
  </div>);
}

function BudgetAct({onDone}){
  const[sp,setSp]=useState(8);const[bg,setBg]=useState(6);const[fu,setFu]=useState(4);const[gi,setGi]=useState(2);
  const tot=sp+bg+fu+gi;
  const bk=[{l:"🛒 Spending",v:sp,s:setSp,tg:40},{l:"🎯 Big Goals",v:bg,s:setBg,tg:30},{l:"🔮 Future",v:fu,s:setFu,tg:20},{l:"🤝 Giving",v:gi,s:setGi,tg:10}];
  const ok=tot>0&&Math.abs(sp/tot*100-40)<8&&Math.abs(bg/tot*100-30)<8&&Math.abs(fu/tot*100-20)<8&&Math.abs(gi/tot*100-10)<8;
  return(<div>
    <div style={{background:C.navy,borderRadius:12,padding:16,marginBottom:20,textAlign:"center"}}>
      <span style={{color:C.goldLight,fontSize:14}}>Total: </span><span style={{color:C.gold,fontSize:24,fontWeight:700}}>${tot}</span><span style={{color:C.goldLight,fontSize:14}}> of $20</span>
    </div>
    {bk.map((b,i)=>(<div key={i} style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,flexWrap:"wrap",gap:4}}>
        <span style={{fontSize:14,fontWeight:600,color:C.navy}}>{b.l}</span>
        <span style={{fontSize:13,color:C.textLight}}>${b.v} ({tot>0?Math.round(b.v/tot*100):0}%) — target: {b.tg}%</span>
      </div>
      <input type="range" min="0" max="20" value={b.v} onChange={e=>b.s(parseInt(e.target.value))} style={{width:"100%",accentColor:C.gold}}/>
    </div>))}
    <div style={{background:ok?"#E8F5E9":"#FFF3E0",borderRadius:12,padding:16,textAlign:"center",marginBottom:16,fontSize:14}}>
      {ok?"🎉 Great job! Your budget matches the 40/30/20/10 plan!":"💡 Try to get close to: 40% spending, 30% big goals, 20% future, 10% giving!"}
    </div>
    <button onClick={onDone} style={{...btnS(C.gold,C.navy,{width:"100%"})}}>Complete Activity ⭐</button>
  </div>);
}

function InterestAct({onDone}){
  const[amt,setAmt]=useState(100);const[rate,setRate]=useState(6);const[yrs,setYrs]=useState(10);const[mode,setMode]=useState("compound");
  const data=[];for(let y=0;y<=yrs;y++){data.push({y,s:Math.round(amt+amt*(rate/100)*y),c:Math.round(amt*Math.pow(1+rate/100,y))});}
  const mx=Math.max(...data.map(d=>Math.max(d.s,d.c)));
  const final=data[data.length-1][mode==="compound"?"c":"s"];
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
      {[{l:"Amount",v:amt,s:setAmt,opts:[10,50,100,500,1000],f:v=>"$"+v},{l:"Rate",v:rate,s:setRate,opts:[2,4,6,8,10,12],f:v=>v+"%"},{l:"Years",v:yrs,s:setYrs,opts:[5,10,20,30,40],f:v=>v+" yrs"}].map((x,i)=>(
        <div key={i}><div style={{fontSize:12,color:C.textLight,marginBottom:4}}>{x.l}</div>
        <select value={x.v} onChange={e=>x.s(+e.target.value)} style={{width:"100%",padding:8,borderRadius:8,border:`1px solid ${C.border}`,fontSize:14}}>
          {x.opts.map(o=><option key={o} value={o}>{x.f(o)}</option>)}
        </select></div>))}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:16}}>
      {["compound","simple"].map(m=>(<button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"8px 0",borderRadius:8,border:`2px solid ${mode===m?C.gold:C.border}`,background:mode===m?C.gold+"15":"#fff",cursor:"pointer",fontSize:13,fontWeight:600,color:C.navy}}>{m==="compound"?"⛄ Compound":"📝 Simple"}</button>))}
    </div>
    <div style={{display:"flex",alignItems:"flex-end",gap:2,height:150,marginBottom:8,padding:"0 4px"}}>
      {data.map((d,i)=>{const val=mode==="compound"?d.c:d.s;const h=Math.max(4,(val/mx)*130);return(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{fontSize:9,color:C.textLight,marginBottom:2}}>{i===0||i===data.length-1?"$"+val:""}</div>
          <div style={{width:"100%",height:h,borderRadius:"3px 3px 0 0",background:`linear-gradient(180deg,${C.gold},${C.goldDark})`,transition:"height 0.5s"}}/>
        </div>);})}
    </div>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.textLight,marginBottom:16}}><span>Year 0</span><span>Year {yrs}</span></div>
    <div style={{background:C.navy,borderRadius:12,padding:16,textAlign:"center",marginBottom:16}}>
      <div style={{color:C.goldLight,fontSize:13}}>After {yrs} years, ${amt} becomes...</div>
      <div style={{color:C.gold,fontSize:28,fontWeight:700}}>${final.toLocaleString()}</div>
      <div style={{color:C.goldLight,fontSize:12,marginTop:4}}>That's ${(final-amt).toLocaleString()} in {mode} interest!</div>
    </div>
    <button onClick={onDone} style={{...btnS(C.gold,C.navy,{width:"100%"})}}>Complete Activity ⭐</button>
  </div>);
}

function BizDetectiveAct({onDone}){
  const[picked,setP]=useState(null);const[rev,setR]=useState(false);
  const biz=[
    {n:"Sparkle Car Wash",e:"🚗",earn:"$120/wk",grow:"📈 Growing",comp:"2 nearby",con:"⭐⭐⭐⭐",sc:85,res:"Great pick! Steady demand, growing customer base."},
    {n:"Frozen Yogurt Palace",e:"🍦",earn:"$200/wk (summer)",grow:"📊 Seasonal",comp:"5 nearby",con:"⭐⭐",sc:55,res:"Risky — great in summer, struggles in winter with lots of competition."},
    {n:"Code Tutoring Hub",e:"💻",earn:"$80/wk",grow:"🚀 Fast growing",comp:"1 nearby",con:"⭐⭐⭐⭐⭐",sc:92,res:"Excellent! Low competition, high demand, very consistent."}
  ];
  return(<div>
    <p style={{fontSize:14,color:C.text,marginBottom:16}}>Investigate 3 businesses and pick the best investment:</p>
    {biz.map((b,i)=>(<div key={i} onClick={()=>!rev&&setP(i)} style={{background:picked===i?C.gold+"12":"#fff",border:`2px solid ${picked===i?C.gold:C.border}`,borderRadius:14,padding:16,cursor:rev?"default":"pointer",marginBottom:10,transition:"all 0.2s"}}>
      <div style={{fontSize:17,fontWeight:700,marginBottom:8,color:C.navy}}>{b.e} {b.n}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,fontSize:13,color:C.text}}>
        <div>📊 {b.earn}</div><div>{b.grow}</div><div>🪙 {b.comp}</div><div>Consistency: {b.con}</div>
      </div>
      {rev&&<div style={{marginTop:10,padding:10,borderRadius:8,fontSize:13,fontWeight:600,background:b.sc>80?"#E8F5E9":b.sc>60?"#FFF8E1":"#FFEBEE",color:b.sc>80?"#2E7D32":b.sc>60?"#F57F17":"#C62828"}}>Score: {b.sc}/100 — {b.res}</div>}
    </div>))}
    {picked!==null&&!rev&&<button onClick={()=>setR(true)} style={{...btnS(C.navy,"#fff",{width:"100%",marginBottom:12})}}>Reveal Results 🔍</button>}
    {rev&&<button onClick={onDone} style={{...btnS(C.gold,C.navy,{width:"100%"})}}>Complete Activity ⭐</button>}
  </div>);
}

function RiskRankerAct({onDone}){
  const[items,setI]=useState([
    {id:0,n:"Savings Account",e:"🏦",r:0},{id:1,n:"Government Bond",e:"🏛️",r:1},{id:2,n:"S&P 500 Index Fund",e:"📊",r:2},
    {id:3,n:"Individual Tech Stock",e:"📱",r:3},{id:4,n:"Friend's Startup",e:"🚀",r:4},{id:5,n:"Rare Collectible Card",e:"🃏",r:5}
  ].sort(()=>Math.random()-0.5));
  const[chk,setChk]=useState(false);
  const mv=(idx,dir)=>{if(chk)return;const n=[...items];const s=idx+dir;if(s<0||s>=n.length)return;[n[idx],n[s]]=[n[s],n[idx]];setI(n);};
  const score=items.reduce((s,it,i)=>s+(it.r===i?1:0),0);
  return(<div>
    <p style={{fontSize:14,color:C.text,marginBottom:16}}>Arrange from LOWEST risk (top) to HIGHEST risk (bottom):</p>
    {items.map((it,i)=>(<div key={it.id} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",borderRadius:10,background:chk?(it.r===i?"#E8F5E9":"#FFEBEE"):"#fff",border:`1px solid ${C.border}`,marginBottom:6,transition:"all 0.3s"}}>
      <span style={{fontSize:12,color:C.textLight,fontWeight:700,width:20}}>{i+1}.</span>
      <span style={{fontSize:18}}>{it.e}</span>
      <span style={{flex:1,fontSize:14,fontWeight:600,color:C.navy}}>{it.n}</span>
      {!chk&&<div style={{display:"flex",gap:4}}>
        <button onClick={()=>mv(i,-1)} style={{background:C.border,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:14}}>↑</button>
        <button onClick={()=>mv(i,1)} style={{background:C.border,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:14}}>↓</button>
      </div>}
      {chk&&<span style={{fontSize:16}}>{it.r===i?"✅":"❌"}</span>}
    </div>))}
    {!chk?<button onClick={()=>setChk(true)} style={{...btnS(C.navy,"#fff",{width:"100%",marginTop:12})}}>Check My Ranking</button>:
    <div><div style={{textAlign:"center",padding:12,background:C.gold+"15",borderRadius:10,marginTop:12,marginBottom:12,fontSize:15,fontWeight:700,color:C.navy}}>You got {score}/6 correct!</div>
    <button onClick={onDone} style={{...btnS(C.gold,C.navy,{width:"100%"})}}>Complete Activity ⭐</button></div>}
  </div>);
}

function PortfolioAct({onDone}){
  const[st,setSt]=useState(60);const[bo,setBo]=useState(30);const[sa,setSa]=useState(10);const[sim,setSim]=useState(false);const[fv,setFv]=useState(0);
  const tot=st+bo+sa;const stP=tot>0?st/tot:0;const boP=tot>0?bo/tot:0;const saP=tot>0?sa/tot:0;
  const doSim=()=>{setFv(Math.round(stP*100*Math.pow(1+(Math.random()*0.14-0.02),5)+boP*100*Math.pow(1+(Math.random()*0.04+0.01),5)+saP*100*Math.pow(1.03,5)));setSim(true);};
  const risk=stP>0.7?"High risk, high potential!":stP>0.4?"Balanced mix — nice!":"Conservative and safe.";
  return(<div>
    <div style={{background:C.navy,borderRadius:12,padding:16,marginBottom:20,textAlign:"center"}}>
      <span style={{color:C.goldLight,fontSize:14}}>Investing: </span><span style={{color:C.gold,fontSize:24,fontWeight:700}}>$100</span>
    </div>
    {[{l:"📈 Stocks (high growth, high risk)",v:st,s:setSt},{l:"📋 Bonds (steady, medium risk)",v:bo,s:setBo},{l:"🏦 Savings (safe, low growth)",v:sa,s:setSa}].map((x,i)=>(
      <div key={i} style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4,flexWrap:"wrap",gap:4}}>
          <span style={{fontWeight:600,color:C.navy}}>{x.l}</span>
          <span style={{color:C.textLight}}>${x.v} ({tot>0?Math.round(x.v/tot*100):0}%)</span>
        </div>
        <input type="range" min="0" max="100" value={x.v} onChange={e=>{x.s(parseInt(e.target.value));setSim(false);}} style={{width:"100%",accentColor:C.gold}}/>
      </div>))}
    {!sim?<button onClick={doSim} style={{...btnS(C.navy,"#fff",{width:"100%",marginBottom:12})}}>Simulate 5 Years 🎲</button>:
    <div><div style={{background:C.gold+"15",borderRadius:12,padding:16,textAlign:"center",marginBottom:12}}>
      <div style={{fontSize:13,color:C.textLight}}>After 5 years, $100 became roughly...</div>
      <div style={{fontSize:28,fontWeight:700,color:C.navy}}>${fv}</div>
      <div style={{fontSize:12,color:C.textLight,marginTop:4}}>{risk}</div>
    </div>
    <button onClick={onDone} style={{...btnS(C.gold,C.navy,{width:"100%"})}}>Complete Activity ⭐</button></div>}
  </div>);
}

function CertificateAct({stars,total,onDone,playerName}){
  const[certName,setCertName]=useState(playerName||"");
  const[nameSet,setNameSet]=useState(!!playerName);
  const[downloading,setDownloading]=useState(false);

  const handleDownloadPDF=()=>{
    setDownloading(true);
    setTimeout(function(){
      try{
        let JsPDF=null;
        if(typeof window!=="undefined"){
          if(window.jspdf&&window.jspdf.jsPDF){JsPDF=window.jspdf.jsPDF;}
          else if(window.jsPDF){JsPDF=window.jsPDF;}
        }
        if(!JsPDF){alert("PDF library loading. Please wait and try again.");setDownloading(false);return;}
        const doc=new JsPDF({orientation:"landscape",unit:"mm",format:"a4"});
        const w=297,h=210;
        doc.setFillColor(26,35,50);doc.rect(0,0,w,h,"F");
        doc.setDrawColor(212,168,67);doc.setLineWidth(2);doc.roundedRect(12,12,w-24,h-24,6,6,"S");
        doc.setLineWidth(0.5);doc.roundedRect(16,16,w-32,h-32,4,4,"S");
        doc.setFillColor(212,168,67);doc.roundedRect(w/2-8,28,16,16,2,2,"F");
        doc.setTextColor(26,35,50);doc.setFont("helvetica","bold");doc.setFontSize(10);
        doc.text("K | V",w/2,38,{align:"center"});
        doc.setTextColor(212,168,67);doc.setFont("times","bold");doc.setFontSize(28);
        doc.text("Certificate of Achievement",w/2,60,{align:"center"});
        doc.setTextColor(245,230,184);doc.setFont("times","normal");doc.setFontSize(12);
        doc.text("The Kid Vault  \u2014  Financial Education Graduate",w/2,70,{align:"center"});
        doc.setDrawColor(212,168,67);doc.setLineWidth(0.4);doc.line(w/2-50,75,w/2+50,75);
        doc.setTextColor(255,255,255);doc.setFont("times","bold");doc.setFontSize(32);
        doc.text(certName,w/2,90,{align:"center"});
        doc.line(w/2-50,95,w/2+50,95);
        doc.setTextColor(212,168,67);doc.setFont("helvetica","bold");doc.setFontSize(18);
        doc.text(String(stars)+" / "+String(total)+" Stars Earned",w/2,108,{align:"center"});
        doc.setTextColor(180,180,200);doc.setFont("helvetica","normal");doc.setFontSize(10);
        doc.text("Completed all 7 chapters covering money basics, saving, interest, investing, diversification, and financial planning.",w/2,120,{align:"center"});
        const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
        const now=new Date();
        doc.setTextColor(245,230,184);doc.setFontSize(11);
        doc.text(months[now.getMonth()]+" "+now.getDate()+", "+now.getFullYear(),w/2,140,{align:"center"});
        doc.setDrawColor(100,100,120);doc.setLineWidth(0.3);doc.line(55,168,130,168);
        doc.setTextColor(150,150,170);doc.setFontSize(9);doc.text("Student Signature",92.5,174,{align:"center"});
        doc.setTextColor(120,120,140);doc.setFont("helvetica","normal");doc.setFontSize(8);
        doc.text("thekidvault.com",w/2,192,{align:"center"});
        doc.save(certName.replace(/[^a-zA-Z0-9]/g,"_")+"_KidVault_Certificate.pdf");
      }catch(e){alert("PDF error: "+e.message);}
      setDownloading(false);
    },100);
  };

  if(!nameSet) return(
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:18,fontWeight:700,color:C.navy,marginBottom:16}}>🎉 You did it! Enter your name for the certificate:</div>
      <input value={certName} onChange={e=>setCertName(e.target.value)} placeholder="Your name"
        onKeyDown={e=>{if(e.key==="Enter"&&certName.trim())setNameSet(true);}}
        style={{padding:"12px 20px",borderRadius:10,border:`2px solid ${C.gold}`,fontSize:16,width:"100%",maxWidth:300,textAlign:"center",marginBottom:16,boxSizing:"border-box"}}/>
      <br/>
      <button onClick={()=>{if(certName.trim())setNameSet(true);}} disabled={!certName.trim()} style={{...btnS(certName.trim()?C.gold:"#ddd",certName.trim()?C.navy:"#999")}}>Create My Certificate →</button>
    </div>
  );
  return(<div style={{textAlign:"center"}}>
    <div style={{background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,borderRadius:20,padding:"32px 24px",marginBottom:20,border:`4px solid ${C.gold}`}}>
      <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Logo size={60}/></div>
      <h3 style={{color:C.gold,fontSize:24,margin:"8px 0 4px",fontFamily:"Georgia,serif"}}>Certificate of Achievement</h3>
      <p style={{color:C.goldLight,fontSize:14,margin:"0 0 8px"}}>The Kid Vault — Financial Education Graduate</p>
      <div style={{color:"#fff",fontSize:28,fontWeight:700,margin:"16px 0",fontFamily:"Georgia,serif"}}>{certName}</div>
      <div style={{background:"rgba(255,255,255,0.08)",borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{color:C.gold,fontSize:36,fontWeight:700}}>⭐ {stars} / {total}</div>
        <div style={{color:C.goldLight,fontSize:13,marginTop:4}}>Stars Earned</div>
      </div>
      <div style={{color:C.goldLight,fontSize:12,marginTop:12}}>thekidvault.com</div>
    </div>
    <button onClick={handleDownloadPDF} disabled={downloading} style={{...btnS(C.navy,"#fff",{width:"100%",marginBottom:16})}}>
      {downloading?"⏳ Generating...":"📥 Download Certificate (PDF)"}
    </button>
    <button onClick={onDone} style={{...btnS(C.gold,C.navy,{width:"100%"})}}>Finish! 🎉</button>
  </div>);
}

function Activity({type,onDone,stars,totalStars,playerName}){
  switch(type){
    case "money-idea": return <MoneyIdeaAct onDone={onDone}/>;
    case "budget-builder": return <BudgetAct onDone={onDone}/>;
    case "interest-calc": return <InterestAct onDone={onDone}/>;
    case "biz-detective": return <BizDetectiveAct onDone={onDone}/>;
    case "risk-ranker": return <RiskRankerAct onDone={onDone}/>;
    case "portfolio-builder": return <PortfolioAct onDone={onDone}/>;
    case "certificate": {
      let allPriorDone=true;
      for(let ci=0;ci<6;ci++){
        const cc=CH[ci];
        for(let li=0;li<cc.lessons.length;li++){if(!stars[cc.lessons[li].id]){allPriorDone=false;break;}}
        if(!stars["ch"+cc.id+"-quiz"]||!stars["ch"+cc.id+"-act"])allPriorDone=false;
        if(!allPriorDone)break;
      }
      const ch7=CH[6];
      for(let l7=0;l7<ch7.lessons.length;l7++){if(!stars[ch7.lessons[l7].id])allPriorDone=false;}
      if(!stars["ch7-quiz"])allPriorDone=false;

      if(!allPriorDone) return(
        <div style={{textAlign:"center",padding:"20px 0"}}>
          <div style={{fontSize:48,marginBottom:16}}>🔒</div>
          <div style={{fontSize:18,fontWeight:700,color:"#1A2332",marginBottom:8}}>Certificate Locked</div>
          <div style={{fontSize:14,color:"#6B7B8D",lineHeight:1.6,fontFamily:"'Trebuchet MS',sans-serif",marginBottom:20}}>
            Complete all 7 chapters — every lesson, quiz, and activity — to unlock your certificate!
          </div>
          <div style={{background:"#FFF3E0",borderRadius:12,padding:16,textAlign:"left",fontSize:13,color:"#E65100",fontFamily:"'Trebuchet MS',sans-serif"}}>
            <div style={{fontWeight:700,marginBottom:8}}>Your progress:</div>
            {CH.map(function(c,i){
              const cLessons=c.lessons.filter(function(l){return stars[l.id];}).length;
              const cQuiz=stars["ch"+c.id+"-quiz"]?1:0;
              const cAct=stars["ch"+c.id+"-act"]?1:0;
              const cDone=cLessons+cQuiz+cAct;
              const cTotal=c.lessons.length+2;
              return(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",color:cDone===cTotal?"#2E7D32":"#E65100"}}>
                <span>{c.icon} Ch. {c.id}: {c.t}</span>
                <span style={{fontWeight:700}}>{cDone===cTotal?"✅":""+cDone+"/"+cTotal}</span>
              </div>);
            })}
          </div>
          <button onClick={onDone} style={{marginTop:20,background:"#1A2332",color:"#fff",border:"none",padding:"12px 28px",borderRadius:50,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Trebuchet MS',sans-serif"}}>Back to Chapters</button>
        </div>
      );
      return <CertificateAct stars={stars} total={totalStars} onDone={onDone} playerName={playerName}/>;
    }
    default: return <div>Activity coming soon!</div>;
  }
}

function WelcomeScreen({profiles,onSelect,onNew,onDelete}){
  const[confirmDel,setConfirmDel]=useState(null);
  return(<div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
    <div style={{maxWidth:450,width:"100%",textAlign:"center"}}>
      <Logo size={70}/>
      <h1 style={{color:"#fff",fontSize:32,margin:"16px 0 4px",fontFamily:"Georgia,serif"}}>The Kid Vault</h1>
      <p style={{color:C.goldLight,fontSize:15,marginBottom:36,fontFamily:"'Trebuchet MS',sans-serif"}}>Who's learning today?</p>
      {profiles.length > 0 && (
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
          {profiles.map((p,i)=>{
            const pctDone = Math.round(Object.keys(p.stars).length / CH.reduce((s,c)=>s+c.lessons.length+2,0) * 100);
            return(<div key={i} style={{position:"relative"}}>
              <button onClick={()=>onSelect(i)} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,padding:"16px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"all 0.3s",textAlign:"left",width:"100%",boxSizing:"border-box"}}>
                <div style={{width:44,height:44,borderRadius:12,background:C.gold+"25",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,color:C.gold}}>{p.name[0]?.toUpperCase()||"?"}</div>
                <div style={{flex:1}}>
                  <div style={{color:"#fff",fontSize:16,fontWeight:700}}>{p.name}</div>
                  <div style={{color:"rgba(255,255,255,0.5)",fontSize:13,fontFamily:"'Trebuchet MS',sans-serif"}}>⭐ {Object.keys(p.stars).length} stars · {pctDone}% complete</div>
                </div>
                <div style={{color:C.gold,fontSize:20}}>→</div>
              </button>
              <button onClick={(e)=>{e.stopPropagation();setConfirmDel(i);}} style={{position:"absolute",bottom:6,right:12,background:"none",border:"none",color:"rgba(255,255,255,0.2)",fontSize:11,cursor:"pointer",padding:"2px 6px",borderRadius:4,transition:"all 0.2s",fontFamily:"'Trebuchet MS',sans-serif"}}>remove</button>
              {confirmDel===i&&(
                <div style={{background:"rgba(255,70,70,0.12)",border:"1px solid rgba(255,70,70,0.3)",borderRadius:12,padding:"14px 16px",marginTop:8,textAlign:"center"}}>
                  <div style={{color:"#fff",fontSize:14,marginBottom:10,fontFamily:"'Trebuchet MS',sans-serif"}}>Remove <strong>{p.name}</strong> and all their progress?</div>
                  <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                    <button onClick={()=>setConfirmDel(null)} style={{...btnS("rgba(255,255,255,0.1)","#fff",{padding:"8px 20px",fontSize:13})}}>Cancel</button>
                    <button onClick={()=>{onDelete(i);setConfirmDel(null);}} style={{...btnS("#e53935","#fff",{padding:"8px 20px",fontSize:13})}}>Remove</button>
                  </div>
                </div>
              )}
            </div>);
          })}
        </div>
      )}
      <button onClick={onNew} style={{...btnS("transparent","#fff",{border:"2px solid rgba(255,255,255,0.3)",width:"100%",boxSizing:"border-box"})}}>+ New Learner</button>
    </div>
  </div>);
}

function NewProfileScreen({onSave,onBack}){
  const[name,setName]=useState("");
  return(<div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.navy},${C.navyLight})`,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
    <div style={{maxWidth:400,width:"100%",textAlign:"center"}}>
      <Logo size={60}/>
      <h2 style={{color:"#fff",fontSize:26,margin:"16px 0 8px",fontFamily:"Georgia,serif"}}>Welcome, new learner!</h2>
      <p style={{color:C.goldLight,fontSize:15,marginBottom:32,fontFamily:"'Trebuchet MS',sans-serif"}}>What's your first name?</p>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your first name"
        onKeyDown={e=>{if(e.key==="Enter"&&name.trim())onSave(name.trim());}}
        style={{padding:"14px 20px",borderRadius:12,border:`2px solid ${C.gold}`,fontSize:18,width:"100%",maxWidth:320,textAlign:"center",marginBottom:24,boxSizing:"border-box",background:"rgba(255,255,255,0.08)",color:"#fff",outline:"none"}}/>
      <br/>
      <button onClick={()=>{if(name.trim())onSave(name.trim());}} disabled={!name.trim()} style={{...btnS(name.trim()?C.gold:"rgba(255,255,255,0.1)",name.trim()?C.navy:"rgba(255,255,255,0.3)",{width:"100%",maxWidth:320})}}>Let's Go! →</button>
      <button onClick={onBack} style={{...btnS("transparent","rgba(255,255,255,0.5)",{marginTop:16,fontSize:14})}}>← Back</button>
    </div>
  </div>);
}

function LessonNav({ch,lesIdx,phase,onGoLesson,onGoQuiz,onGoActivity,onSwitchChapter,stars,onClose,show}){
  const[expanded,setExpanded]=useState(ch.id);
  return(
    <div style={{position:"fixed",top:0,left:0,bottom:0,width:"min(300px,82vw)",background:C.navy,zIndex:200,overflowY:"auto",transition:"transform 0.3s ease",transform:show?"translateX(0)":"translateX(-100%)",boxShadow:show?"4px 0 24px rgba(0,0,0,0.3)":"none"}}>
      <div style={{padding:"16px 16px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><Logo size={24}/><span style={{color:"#fff",fontWeight:700,fontSize:14,fontFamily:"Georgia,serif"}}>The Kid Vault</span></div>
        <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",fontSize:22,cursor:"pointer",padding:4}}>✕</button>
      </div>
      <div style={{padding:"12px 0"}}>
        {CH.map((c,ci)=>{
          const isCurrent=c.id===ch.id;const isOpen=expanded===c.id;
          const cStarCount=c.lessons.filter(l=>stars[l.id]).length+(stars[`ch${c.id}-quiz`]?1:0)+(stars[`ch${c.id}-act`]?1:0);
          const cTotalCount=c.lessons.length+2;
          return(<div key={ci}>
            <div onClick={()=>setExpanded(isOpen?null:c.id)} style={{padding:"10px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,background:isCurrent?"rgba(255,255,255,0.06)":"transparent",borderLeft:isCurrent?`3px solid ${c.c}`:"3px solid transparent",transition:"all 0.2s"}}>
              <span style={{fontSize:16,flexShrink:0}}>{c.icon}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11,color:c.c,fontWeight:700,textTransform:"uppercase",letterSpacing:1,fontFamily:"'Trebuchet MS',sans-serif"}}>Ch. {c.id}</div>
                <div style={{color:isCurrent?"#fff":"rgba(255,255,255,0.7)",fontSize:13,fontWeight:isCurrent?700:400,fontFamily:"'Trebuchet MS',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.t}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <span style={{fontSize:11,color:C.gold,fontFamily:"'Trebuchet MS',sans-serif"}}>{cStarCount}/{cTotalCount}</span>
                <span style={{color:"rgba(255,255,255,0.3)",fontSize:12}}>{isOpen?"▾":"▸"}</span>
              </div>
            </div>
            {isOpen&&(<div style={{background:"rgba(0,0,0,0.15)"}}>
              {c.lessons.map((l,li)=>{
                const active=isCurrent&&phase==="lessons"&&li===lesIdx;const done=!!stars[l.id];
                return(<div key={li} onClick={()=>{if(isCurrent){onGoLesson(li);}else{onSwitchChapter(ci,li);}onClose();}} style={{padding:"8px 16px 8px 36px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,background:active?"rgba(255,255,255,0.08)":"transparent"}}>
                  <span style={{fontSize:12,width:16,textAlign:"center"}}>{done?"⭐":l.icon}</span>
                  <span style={{color:active?"#fff":"rgba(255,255,255,0.5)",fontSize:12,fontFamily:"'Trebuchet MS',sans-serif",fontWeight:active?600:400}}>{l.t}</span>
                </div>);
              })}
              <div onClick={()=>{if(isCurrent){onGoQuiz();}else{onSwitchChapter(ci,-1,"quiz");}onClose();}} style={{padding:"8px 16px 8px 36px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,background:isCurrent&&phase==="quiz"?"rgba(255,255,255,0.08)":"transparent"}}>
                <span style={{fontSize:12,width:16,textAlign:"center"}}>{stars[`ch${c.id}-quiz`]?"⭐":"❓"}</span>
                <span style={{color:isCurrent&&phase==="quiz"?"#fff":"rgba(255,255,255,0.5)",fontSize:12,fontFamily:"'Trebuchet MS',sans-serif"}}>Chapter Quiz</span>
              </div>
              <div onClick={()=>{if(isCurrent){onGoActivity();}else{onSwitchChapter(ci,-1,"activity");}onClose();}} style={{padding:"8px 16px 8px 36px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,background:isCurrent&&phase==="activity"?"rgba(255,255,255,0.08)":"transparent",marginBottom:4}}>
                <span style={{fontSize:12,width:16,textAlign:"center"}}>{stars[`ch${c.id}-act`]?"⭐":"🎮"}</span>
                <span style={{color:isCurrent&&phase==="activity"?"#fff":"rgba(255,255,255,0.5)",fontSize:12,fontFamily:"'Trebuchet MS',sans-serif"}}>Activity</span>
              </div>
            </div>)}
          </div>);
        })}
      </div>
    </div>
  );
}

function LandingPage({onStart,onStartChapter}){
  const[loaded,setL]=useState(false);const[hov,setH]=useState(null);
  useEffect(()=>{setTimeout(()=>setL(true),100);},[]);
  return(<div style={{background:C.cream}}>
    <section style={{background:`linear-gradient(135deg,${C.navy},${C.navyLight},#2D4A5E)`,color:"#fff",position:"relative",overflow:"hidden",minHeight:"85vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <div style={{position:"absolute",inset:0,opacity:0.04,backgroundImage:`repeating-linear-gradient(45deg,${C.gold} 0px,${C.gold} 1px,transparent 1px,transparent 40px),repeating-linear-gradient(-45deg,${C.gold} 0px,${C.gold} 1px,transparent 1px,transparent 40px)`}}/>
      <div style={{maxWidth:900,margin:"0 auto",padding:"60px 24px",textAlign:"center",position:"relative",zIndex:1}}>
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(-30px)",transition:"all 0.8s ease 0.2s"}}>
          <div style={{margin:"0 auto 24px",display:"inline-block"}}><Logo size={90}/></div>
          <h1 style={{fontSize:"clamp(36px,7vw,64px)",fontWeight:700,margin:"0 0 4px",letterSpacing:-1,lineHeight:1.1,fontFamily:"Georgia,serif"}}>The Kid Vault</h1>
          <div style={{fontSize:"clamp(14px,2.5vw,18px)",color:C.goldLight,letterSpacing:3,textTransform:"uppercase",fontFamily:"'Trebuchet MS',sans-serif",marginBottom:32}}>Financial Education for Young Minds</div>
        </div>
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.6s"}}>
          <p style={{fontSize:"clamp(18px,3vw,24px)",lineHeight:1.6,maxWidth:650,margin:"0 auto 40px",color:"rgba(255,255,255,0.85)",fontFamily:"'Trebuchet MS',sans-serif",fontWeight:300}}>A free, interactive guide to money, saving, and investing — built by kids, for kids.</p>
          <button onClick={onStart} style={{...btnS(`linear-gradient(135deg,${C.gold},${C.goldDark})`,C.navy),boxShadow:`0 4px 20px rgba(212,168,67,0.4)`}}>Start Learning →</button>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"clamp(24px,5vw,60px)",marginTop:56,opacity:loaded?1:0,transition:"all 0.8s ease 1s",flexWrap:"wrap"}}>
          {[{n:"7",l:"Chapters"},{n:"35",l:"Lessons"},{n:"7",l:"Activities"},{n:"100%",l:"Free"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}><div style={{fontSize:"clamp(28px,5vw,42px)",fontWeight:700,color:C.gold,lineHeight:1}}>{s.n}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:2,marginTop:6,fontFamily:"'Trebuchet MS',sans-serif"}}>{s.l}</div></div>))}
        </div>
      </div>
      <svg viewBox="0 0 1440 80" style={{display:"block",width:"100%",marginBottom:-1}}><path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill={C.cream}/></svg>
    </section>
    <section style={{maxWidth:800,margin:"0 auto",padding:"60px 24px 40px"}}>
      <div style={{textAlign:"center",marginBottom:48}}>
        <div style={{fontSize:13,color:C.gold,textTransform:"uppercase",letterSpacing:3,marginBottom:12,fontFamily:"'Trebuchet MS',sans-serif",fontWeight:600}}>Our Mission</div>
        <h2 style={{fontSize:"clamp(28px,5vw,40px)",margin:0,lineHeight:1.2,fontWeight:700,fontFamily:"Georgia,serif",color:C.navy}}>Why We Built This</h2>
      </div>
      <div style={{fontSize:"clamp(16px,2.5vw,18px)",lineHeight:1.85,color:C.text,fontFamily:"'Trebuchet MS',sans-serif"}}>
        <p style={{marginBottom:20}}><strong style={{color:C.navy}}>We believe financial education is one of the most important life skills.</strong> Yet most schools don't teach it. They prepare students to land a job, but rarely teach them what to do with that first paycheck.</p>
        <p style={{marginBottom:20}}>That gap is why <strong style={{color:C.navy}}>The Kid Vault</strong> exists. We wanted to create a place where kids can start learning about money early — because understanding money gives you <em>freedom, choices, and confidence</em> at every stage of life.</p>
        <p style={{marginBottom:20}}>And here's what makes this project special: <strong style={{color:C.navy}}>it was built by three sisters, ages 7, 9, and 13, together with their mom and dad.</strong> As a family, they researched, discussed, and helped shape every lesson.</p>
        <p>This is a family project, not a corporation. We're sharing our chapters free for families everywhere — because we believe every kid deserves a head start with money.</p>
      </div>
    </section>
    <div style={{maxWidth:100,height:3,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,margin:"20px auto 40px",borderRadius:2}}/>
    <section style={{maxWidth:900,margin:"0 auto",padding:"20px 24px 60px"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{fontSize:13,color:C.gold,textTransform:"uppercase",letterSpacing:3,marginBottom:12,fontFamily:"'Trebuchet MS',sans-serif",fontWeight:600}}>The Journey</div>
        <h2 style={{fontSize:"clamp(28px,5vw,40px)",margin:"0 0 12px",fontWeight:700,fontFamily:"Georgia,serif",color:C.navy}}>7 Chapters, One Big Adventure</h2>
        <p style={{fontSize:16,color:C.textLight,fontFamily:"'Trebuchet MS',sans-serif",maxWidth:500,margin:"0 auto"}}>Click any chapter to start learning!</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:16}}>
        {CH.map((ch,i)=>(<div key={i} onClick={()=>onStartChapter(i)} onMouseOver={()=>setH(i)} onMouseOut={()=>setH(null)} style={{background:"#fff",borderRadius:16,padding:"24px 20px",border:`1px solid ${hov===i?ch.c+"40":C.border}`,transition:"all 0.3s",transform:hov===i?"translateY(-4px)":"none",boxShadow:hov===i?"0 12px 32px rgba(0,0,0,0.08)":"0 2px 8px rgba(0,0,0,0.03)",cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
            <div style={{width:40,height:40,borderRadius:10,background:ch.c+"12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{ch.icon}</div>
            <div><div style={{fontSize:11,color:ch.c,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,fontFamily:"'Trebuchet MS',sans-serif"}}>Chapter {ch.id}</div>
            <div style={{fontSize:16,fontWeight:700,color:C.navy,lineHeight:1.2}}>{ch.t}</div></div>
          </div>
          <p style={{fontSize:13.5,color:C.textLight,lineHeight:1.55,margin:0,fontFamily:"'Trebuchet MS',sans-serif"}}>{ch.d}</p>
        </div>))}
      </div>
    </section>
    <section style={{background:C.navy,color:"#fff",padding:"60px 24px",position:"relative"}}>
      <svg viewBox="0 0 1440 60" style={{position:"absolute",top:-1,left:0,width:"100%"}}><path d="M0,60 C480,0 960,60 1440,0 L1440,0 L0,0 Z" fill={C.cream}/></svg>
      <div style={{maxWidth:800,margin:"0 auto",paddingTop:20}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{fontSize:13,color:C.gold,textTransform:"uppercase",letterSpacing:3,marginBottom:12,fontFamily:"'Trebuchet MS',sans-serif",fontWeight:600}}>What's Inside</div>
          <h2 style={{fontSize:"clamp(28px,5vw,36px)",margin:0,fontWeight:700,fontFamily:"Georgia,serif"}}>Learning That Sticks</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:24}}>
          {[{i:"📖",t:"Bite-Sized Lessons",d:"Each concept in simple, fun language. Hover over tricky words for instant definitions!"},{i:"❓",t:"Quizzes Each Chapter",d:"Quick check-ins with instant feedback and personalized encouragement."},{i:"🎮",t:"Interactive Activities",d:"Budget builders, simulators, and detective games — learning by doing."},{i:"⭐",t:"Stars & Progress",d:"Earn stars for every lesson, quiz, and activity. Track your journey!"}].map((f,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"28px 22px",border:"1px solid rgba(255,255,255,0.08)"}}>
              <div style={{fontSize:28,marginBottom:14}}>{f.i}</div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:8,color:C.goldLight}}>{f.t}</div>
              <div style={{fontSize:13.5,color:"rgba(255,255,255,0.6)",lineHeight:1.6,fontFamily:"'Trebuchet MS',sans-serif"}}>{f.d}</div>
            </div>))}
        </div>
      </div>
    </section>
    <section style={{padding:"64px 24px",textAlign:"center",background:`linear-gradient(180deg,${C.cream},#FFF5DC)`}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(26px,5vw,36px)",margin:"0 0 16px",fontWeight:700,color:C.navy,fontFamily:"Georgia,serif"}}>Ready to Start?</h2>
        <p style={{fontSize:16,color:C.textLight,lineHeight:1.7,fontFamily:"'Trebuchet MS',sans-serif",marginBottom:32}}>Join thousands of kids building their financial superpowers!</p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={onStart} style={{...btnS(`linear-gradient(135deg,${C.gold},${C.goldDark})`,C.navy),boxShadow:`0 4px 20px rgba(212,168,67,0.3)`}}>Start Learning →</button>
          <button onClick={()=>window.open(FEEDBACK_URL,"_blank")} style={{...btnS("transparent",C.navy,{border:`2px solid ${C.navy}30`})}}>Share Feedback 💬</button>
        </div>
      </div>
    </section>
    <footer style={{background:C.navy,color:"rgba(255,255,255,0.4)",padding:"32px 24px",textAlign:"center",fontFamily:"'Trebuchet MS',sans-serif",fontSize:13}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}>
        <Logo size={28}/><span style={{color:"rgba(255,255,255,0.7)",fontWeight:600,fontSize:15,fontFamily:"Georgia,serif"}}>The Kid Vault</span>
      </div>
      <div>A family project — built with ❤️ by three sisters and their parents.</div>
      <div style={{marginTop:6}}><a href={`mailto:${CONTACT_EMAIL}`} style={{color:C.gold,textDecoration:"none"}}>{CONTACT_EMAIL}</a></div>
      <div style={{marginTop:6,color:"rgba(255,255,255,0.25)"}}>© 2026 thekidvault.com</div>
    </footer>
  </div>);
}

export default function App(){
  const[profiles,setProfiles]=useState([]);
  const[activeProfile,setActiveProfile]=useState(-1);
  const[page,setPage]=useState("landing");
  const[chIdx,setChIdx]=useState(0);
  const[lesIdx,setLesIdx]=useState(0);
  const[cardIdx,setCardIdx]=useState(0);
  const[phase,setPhase]=useState("lessons");
  const[qIdx,setQIdx]=useState(0);
  const[answered,setAnswered]=useState(null);
  const[sideNav,setSideNav]=useState(false);
  const[showCert,setShowCert]=useState(false);
  const pendingChapterRef=useRef(-1);

  const prof=activeProfile>=0?profiles[activeProfile]:null;
  const stars=prof?prof.stars:{};
  const playerName=prof?prof.name:"";
  const totalStars=CH.reduce((s,c)=>s+c.lessons.length+2,0);
  const earnedStars=Object.keys(stars).length;
  const chStars=(ci)=>{const c=CH[ci];return c.lessons.filter(l=>stars[l.id]).length+(stars[`ch${c.id}-quiz`]?1:0)+(stars[`ch${c.id}-act`]?1:0);};
  const chTotal=(ci)=>CH[ci].lessons.length+2;
  const allDone=earnedStars>=totalStars;

  const markStar=(id)=>{
    if(!stars[id]){
      const newProfiles=[...profiles];
      newProfiles[activeProfile]={...prof,stars:{...prof.stars,[id]:true}};
      setProfiles(newProfiles);
    }
  };

  const goLanding=()=>{setPage("landing");};
  const goWelcome=()=>{setPage("welcome");};
  const goChapters=()=>{setPage("chapters");setPhase("lessons");setLesIdx(0);setCardIdx(0);setQIdx(0);setAnswered(null);setShowCert(false);};
  const startChapter=(i)=>{setChIdx(i);setPhase("lessons");setLesIdx(0);setCardIdx(0);setPage("lesson");};
  const goLesson=(i)=>{setPhase("lessons");setLesIdx(i);setCardIdx(0);setQIdx(0);setAnswered(null);};
  const goQuiz=()=>{setPhase("quiz");setQIdx(0);setAnswered(null);};
  const goActivity=()=>{setPhase("activity");};

  const ch=CH[chIdx];
  const les=ch?.lessons[lesIdx];

  const nextCard=()=>{
    if(cardIdx<les.content.length-1){setCardIdx(cardIdx+1);}
    else{markStar(les.id);if(lesIdx<ch.lessons.length-1){setLesIdx(lesIdx+1);setCardIdx(0);}else{setPhase("quiz");setQIdx(0);setAnswered(null);}}
  };
  const prevCard=()=>{if(cardIdx>0)setCardIdx(cardIdx-1);};
  const answerQuiz=(ai)=>{setAnswered(ai);};
  const nextQuiz=()=>{
    if(qIdx<ch.quiz.length-1){setQIdx(qIdx+1);setAnswered(null);}
    else{markStar(`ch${ch.id}-quiz`);setPhase("activity");}
  };

  const onStartFromLanding=(chapterIdx)=>{
    pendingChapterRef.current=chapterIdx>=0?chapterIdx:-1;
    if(profiles.length>0){setPage("welcome");}
    else{setPage("newprofile");}
  };

  const onProfileReady=()=>{
    if(pendingChapterRef.current>=0){const ci=pendingChapterRef.current;pendingChapterRef.current=-1;startChapter(ci);}
    else{goChapters();}
  };

  const navBar={background:C.navy,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100};
  const container={maxWidth:680,margin:"0 auto",padding:"24px 16px"};

  if(page==="landing") return(
    <div style={{fontFamily:"Georgia,serif",color:C.navy}}>
      <Head><title>The Kid Vault – Financial Education for Young Minds</title><meta name="description" content="Free interactive financial education for kids ages 6-12."/></Head>
      <LandingPage onStart={()=>onStartFromLanding(-1)} onStartChapter={(i)=>onStartFromLanding(i)}/>
      <div onClick={()=>window.open(FEEDBACK_URL,"_blank")} style={{position:"fixed",bottom:24,right:24,background:C.teal,color:"#fff",padding:"12px 20px",borderRadius:50,fontSize:14,fontWeight:700,fontFamily:"'Trebuchet MS',sans-serif",cursor:"pointer",boxShadow:"0 4px 20px rgba(46,196,182,0.4)",zIndex:1000}}>💬 Feedback</div>
    </div>
  );

  if(page==="welcome") return(
    <WelcomeScreen profiles={profiles} onSelect={(i)=>{setActiveProfile(i);onProfileReady();}} onNew={()=>setPage("newprofile")} onDelete={(i)=>{const np=profiles.filter((_,j)=>j!==i);setProfiles(np);if(activeProfile===i)setActiveProfile(-1);else if(activeProfile>i)setActiveProfile(activeProfile-1);if(np.length===0){setPage("landing");}}}/>
  );

  if(page==="newprofile") return(
    <NewProfileScreen onSave={(name)=>{const np=[...profiles,{name,stars:{}}];setProfiles(np);setActiveProfile(np.length-1);setTimeout(()=>onProfileReady(),0);}} onBack={profiles.length>0?goWelcome:goLanding}/>
  );

  if(page==="chapters") return(
    <div style={{minHeight:"100vh",background:C.cream,fontFamily:"Georgia,serif",color:C.navy}}>
      <Head><title>Chapters – The Kid Vault</title></Head>
      <div style={navBar}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={goLanding}><Logo size={28}/><span style={{color:"#fff",fontWeight:700,fontSize:16,fontFamily:"Georgia,serif"}}>The Kid Vault</span></div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{color:C.gold,fontSize:14,fontWeight:700,fontFamily:"'Trebuchet MS',sans-serif"}}>⭐ {earnedStars}/{totalStars}</span>
          <button onClick={goWelcome} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,padding:"6px 12px",color:"#fff",fontSize:13,cursor:"pointer",fontFamily:"'Trebuchet MS',sans-serif"}}>{playerName} ▾</button>
        </div>
      </div>
      <div style={container}>
        <h2 style={{fontSize:"clamp(22px,5vw,28px)",marginBottom:8,fontFamily:"Georgia,serif"}}>Hey {playerName}! 👋</h2>
        <p style={{color:C.textLight,fontSize:15,marginBottom:32,fontFamily:"'Trebuchet MS',sans-serif"}}>Keep going — every star gets you closer to your certificate!</p>
        {allDone&&<div onClick={()=>setShowCert(true)} style={{background:`linear-gradient(135deg,${C.gold}20,${C.goldLight}40)`,border:`2px solid ${C.gold}`,borderRadius:16,padding:20,marginBottom:24,cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:24,marginBottom:8}}>🎓</div>
          <div style={{fontSize:18,fontWeight:700,color:C.navy}}>Your Certificate is Ready!</div>
          <div style={{fontSize:14,color:C.textLight,fontFamily:"'Trebuchet MS',sans-serif",marginTop:4}}>Click here to download your certificate.</div>
        </div>}
        {showCert&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowCert(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.cream,borderRadius:20,padding:24,maxWidth:500,width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
            <CertificateAct stars={earnedStars} total={totalStars} playerName={playerName} onDone={()=>setShowCert(false)}/>
          </div>
        </div>}
        {CH.map((c,i)=>{
          const cst=chStars(i);const ct=chTotal(i);const pct=Math.round(cst/ct*100);
          return(<div key={i} onClick={()=>startChapter(i)} style={{background:"#fff",borderRadius:16,padding:"16px 20px",marginBottom:12,border:`1px solid ${C.border}`,cursor:"pointer",transition:"all 0.3s",boxShadow:"0 2px 8px rgba(0,0,0,0.03)"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:46,height:46,borderRadius:12,background:c.c+"12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{c.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11,color:c.c,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,fontFamily:"'Trebuchet MS',sans-serif"}}>Chapter {c.id}</div>
                <div style={{fontSize:"clamp(15px,4vw,18px)",fontWeight:700,color:C.navy}}>{c.t}</div>
                <div style={{fontSize:13,color:C.textLight,fontFamily:"'Trebuchet MS',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.d}</div>
              </div>
              <div style={{textAlign:"center",flexShrink:0}}><div style={{fontSize:13,fontWeight:700,color:C.gold}}>⭐ {cst}/{ct}</div></div>
            </div>
            <div style={{marginTop:10,height:5,borderRadius:3,background:C.border}}>
              <div style={{height:5,borderRadius:3,background:`linear-gradient(90deg,${C.gold},${C.goldDark})`,width:`${pct}%`,transition:"width 0.5s"}}/>
            </div>
          </div>);
        })}
      </div>
      <div onClick={()=>window.open(FEEDBACK_URL,"_blank")} style={{position:"fixed",bottom:24,right:24,background:C.teal,color:"#fff",padding:"12px 20px",borderRadius:50,fontSize:14,fontWeight:700,fontFamily:"'Trebuchet MS',sans-serif",cursor:"pointer",boxShadow:"0 4px 20px rgba(46,196,182,0.4)",zIndex:1000}}>💬 Feedback</div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:C.cream,fontFamily:"Georgia,serif",color:C.navy}}>
      <Head><title>{les?les.t:ch?.t} – The Kid Vault</title></Head>
      {sideNav&&<div onClick={()=>setSideNav(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:150}}/>}
      <LessonNav ch={ch} lesIdx={lesIdx} phase={phase} stars={stars} show={sideNav} onClose={()=>setSideNav(false)} onGoLesson={goLesson} onGoQuiz={goQuiz} onGoActivity={goActivity} onSwitchChapter={(ci,li,ph)=>{setChIdx(ci);if(ph==="quiz"){setPhase("quiz");setQIdx(0);setAnswered(null);}else if(ph==="activity"){setPhase("activity");}else{setPhase("lessons");setLesIdx(li>=0?li:0);setCardIdx(0);}}}/>
      <div style={navBar}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setSideNav(true)} style={{background:"none",border:"none",color:"#fff",fontSize:22,cursor:"pointer",padding:"4px 8px"}}>☰</button>
          <div style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8}} onClick={goChapters}><Logo size={22}/></div>
        </div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontFamily:"'Trebuchet MS',sans-serif",textAlign:"center",flex:1}}>Ch. {ch.id}: {ch.t}</div>
        <div style={{color:C.gold,fontSize:13,fontWeight:700,fontFamily:"'Trebuchet MS',sans-serif"}}>⭐ {earnedStars}</div>
      </div>
      <div style={{background:`linear-gradient(135deg,${ch.c}12,${ch.c}06)`,padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:680,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:11,color:ch.c,fontWeight:700,textTransform:"uppercase",letterSpacing:2,fontFamily:"'Trebuchet MS',sans-serif"}}>{phase==="quiz"?"Chapter Quiz":phase==="activity"?"Activity":`Lesson ${lesIdx+1} of ${ch.lessons.length}`}</div>
            <div style={{fontSize:"clamp(16px,4vw,20px)",fontWeight:700}}>{phase==="lessons"?les.t:phase==="quiz"?"Test Your Knowledge":ch.act.t}</div>
          </div>
          {phase==="lessons"&&<div style={{display:"flex",gap:4}}>
            <button disabled={lesIdx===0} onClick={()=>goLesson(lesIdx-1)} style={{background:lesIdx===0?"transparent":C.navy+"15",border:`1px solid ${lesIdx===0?C.border:C.navy+"30"}`,borderRadius:8,padding:"6px 12px",cursor:lesIdx===0?"default":"pointer",fontSize:13,color:lesIdx===0?C.border:C.navy,fontWeight:600}}>← Prev</button>
            <button disabled={lesIdx>=ch.lessons.length-1} onClick={()=>{markStar(les.id);goLesson(lesIdx+1);}} style={{background:lesIdx>=ch.lessons.length-1?"transparent":C.navy+"15",border:`1px solid ${lesIdx>=ch.lessons.length-1?C.border:C.navy+"30"}`,borderRadius:8,padding:"6px 12px",cursor:lesIdx>=ch.lessons.length-1?"default":"pointer",fontSize:13,color:lesIdx>=ch.lessons.length-1?C.border:C.navy,fontWeight:600}}>Next →</button>
          </div>}
        </div>
      </div>
      <div style={container}>
        {phase==="lessons"&&(<div>
          <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
            {ch.lessons.map((_,i)=>(<div key={i} onClick={()=>goLesson(i)} style={{width:i===lesIdx?22:8,height:8,borderRadius:4,background:stars[ch.lessons[i].id]?C.gold:i===lesIdx?ch.c:C.border,transition:"all 0.3s",cursor:"pointer"}}/>))}
          </div>
          <div style={{background:"#fff",borderRadius:20,padding:"clamp(20px,5vw,28px) clamp(16px,4vw,24px)",border:`1px solid ${C.border}`,boxShadow:"0 4px 16px rgba(0,0,0,0.04)",marginBottom:20,minHeight:180}}>
            <div style={{fontSize:13,color:ch.c,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12,fontFamily:"'Trebuchet MS',sans-serif"}}>{les.icon} {les.t}</div>
            <p style={{fontSize:"clamp(15px,3.5vw,16px)",lineHeight:1.8,color:C.text,fontFamily:"'Trebuchet MS',sans-serif",margin:0}}><LessonText text={les.content[cardIdx]}/></p>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
            <button onClick={prevCard} disabled={cardIdx===0} style={{...btnS(cardIdx===0?"#ddd":C.navy,cardIdx===0?"#999":"#fff",{padding:"10px 20px",fontSize:14,opacity:cardIdx===0?0.5:1})}}>← Back</button>
            <span style={{fontSize:13,color:C.textLight,fontFamily:"'Trebuchet MS',sans-serif"}}>{cardIdx+1} / {les.content.length}</span>
            <button onClick={nextCard} style={{...btnS(C.gold,C.navy,{padding:"10px 20px",fontSize:14})}}>
              {cardIdx===les.content.length-1?(lesIdx===ch.lessons.length-1?"Start Quiz →":"Next Lesson →"):"Next →"}
            </button>
          </div>
        </div>)}
        {phase==="quiz"&&(<div>
          <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:20}}>
            {ch.quiz.map((_,i)=>(<div key={i} style={{width:i===qIdx?22:8,height:8,borderRadius:4,background:i<qIdx?C.gold:i===qIdx?ch.c:C.border,transition:"all 0.3s"}}/>))}
          </div>
          <div style={{background:"#fff",borderRadius:20,padding:"clamp(20px,5vw,28px) clamp(16px,4vw,24px)",border:`1px solid ${C.border}`,boxShadow:"0 4px 16px rgba(0,0,0,0.04)",marginBottom:20}}>
            <div style={{fontSize:13,color:ch.c,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,marginBottom:12,fontFamily:"'Trebuchet MS',sans-serif"}}>Question {qIdx+1} of {ch.quiz.length}</div>
            <p style={{fontSize:17,fontWeight:600,lineHeight:1.5,color:C.navy,marginBottom:20}}>{ch.quiz[qIdx].q}</p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {ch.quiz[qIdx].o.map((o,i)=>{
                const isC=i===ch.quiz[qIdx].c;const isA=answered===i;const done=answered!==null;
                return(<button key={i} onClick={()=>!done&&answerQuiz(i)} style={{padding:"14px 18px",borderRadius:12,fontSize:15,fontFamily:"'Trebuchet MS',sans-serif",textAlign:"left",cursor:done?"default":"pointer",border:`2px solid ${done?(isC?"#4CAF50":isA?"#f44336":C.border):C.border}`,background:done?(isC?"#E8F5E9":isA?"#FFEBEE":"#fff"):"#fff",color:C.navy,fontWeight:400,transition:"all 0.2s"}}>{o} {done&&isC&&"✅"}{done&&isA&&!isC&&"❌"}</button>);
              })}
            </div>
            {answered!==null&&<div style={{marginTop:16,padding:14,borderRadius:12,fontSize:14,fontFamily:"'Trebuchet MS',sans-serif",background:answered===ch.quiz[qIdx].c?"#E8F5E9":"#FFF3E0",color:answered===ch.quiz[qIdx].c?"#2E7D32":"#E65100"}}>
              {answered===ch.quiz[qIdx].c?`🎉 Great job, ${playerName}! That's correct!`:`Almost, ${playerName}! The correct answer is highlighted in green. Keep going!`}
            </div>}
          </div>
          {answered!==null&&<button onClick={nextQuiz} style={{...btnS(C.gold,C.navy,{width:"100%"})}}>{qIdx===ch.quiz.length-1?"Go to Activity →":"Next Question →"}</button>}
        </div>)}
        {phase==="activity"&&(<div>
          <div style={{background:"#fff",borderRadius:20,padding:"clamp(20px,5vw,28px) clamp(16px,4vw,24px)",border:`1px solid ${C.border}`,boxShadow:"0 4px 16px rgba(0,0,0,0.04)"}}>
            <div style={{fontSize:13,color:ch.c,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,marginBottom:4,fontFamily:"'Trebuchet MS',sans-serif"}}>Activity</div>
            <h3 style={{fontSize:20,fontWeight:700,marginBottom:4,color:C.navy}}>{ch.act.t}</h3>
            <p style={{fontSize:14,color:C.textLight,marginBottom:20,fontFamily:"'Trebuchet MS',sans-serif"}}>{ch.act.d}</p>
            <Activity type={ch.act.type} playerName={playerName} stars={stars} totalStars={totalStars} onDone={()=>{markStar(`ch${ch.id}-act`);if(chIdx<CH.length-1){setChIdx(chIdx+1);setPhase("lessons");setLesIdx(0);setCardIdx(0);setQIdx(0);setAnswered(null);}else{goChapters();}}}/>
          </div>
        </div>)}
      </div>
      <div onClick={()=>window.open(FEEDBACK_URL,"_blank")} style={{position:"fixed",bottom:24,right:24,background:C.teal,color:"#fff",padding:"12px 20px",borderRadius:50,fontSize:14,fontWeight:700,fontFamily:"'Trebuchet MS',sans-serif",cursor:"pointer",boxShadow:"0 4px 20px rgba(46,196,182,0.4)",zIndex:100}}>💬 Feedback</div>
    </div>
  );
}