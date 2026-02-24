// ============================================================
// THE KID VAULT — Shared Data & Constants
// ============================================================

export const C = {
  gold: "#D4A843", goldLight: "#F5E6B8", goldDark: "#C4963A",
  navy: "#1A2332", navyLight: "#243447",
  cream: "#FFF9ED", teal: "#2EC4B6", white: "#FFFFFF",
  text: "#3A4A5C", textLight: "#6B7B8D", border: "#E8E0D0",
  ch1: "#E8725A", ch2: "#D4577A", ch3: "#9B6FC3", ch4: "#4A9B7F",
  ch5: "#4A8FBF", ch6: "#D49244", ch7: "#CF6B4A",
};

export const FEEDBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLSckyfLCUDF4IfdR6tkTabCwCGbXZD23aIb-xF-4RKITgeuvww/viewform?usp=publish-editor";
export const CONTACT_EMAIL = "contact@thekidvault.com";

// GA4 Measurement ID — replace with your actual ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export const VOCAB: Record<string, string> = {
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
  "profit": "The money left over after you subtract your costs from what you earned. Profit = Revenue - Costs.",
  "dividends": "Money a company pays to its stockholders as a share of the company's profits.",
  "inflation": "When prices go up over time, so the same amount of money buys less stuff than before.",
  "entrepreneur": "Someone who starts their own business — even kids can be entrepreneurs!",
  "Warren Buffett": "One of the most successful investors in history. Known as the 'Oracle of Omaha,' he started investing at age 11 and built a fortune worth over $100 billion by being patient and smart with his money.",
};

export interface Lesson {
  id: string;
  t: string;
  icon: string;
  content: string[];
}

export interface QuizQuestion {
  q: string;
  o: string[];
  c: number;
}

export interface Chapter {
  id: number;
  t: string;
  icon: string;
  c: string;
  d: string;
  seoTitle: string;
  seoDesc: string;
  seoKeywords: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  act: { type: string; t: string; d: string };
}

export const CH: Chapter[] = [
  { id:1, t:"What Is Money?", icon:"🪙", c:C.ch1, d:"Where money came from, how to earn it, and why banks exist.", seoTitle:"What Is Money? Free Lesson for Kids – The Kid Vault", seoDesc:"Teach kids where money came from, how earning works, and why banks exist. Free interactive lesson for ages 6-12.", seoKeywords:"what is money for kids, teaching kids about money, how money works kids, bartering for kids, kids financial literacy",
    lessons:[
      {id:"1-1",t:"The Trading Problem",icon:"🔄",content:[
        "Before money existed, people swapped things directly — three fish for a basket of berries. But what if the berry-picker wanted pottery, not fish?",
        "This awkward matching problem is why humans invented money: a universal token that everyone agrees has value. Instead of finding someone who has what you want AND wants what you have, you just use money!",
        "💡 This old system of swapping goods directly is called bartering. Some people still barter today, but money makes life much easier."]},
      {id:"1-2",t:"Money Through the Ages",icon:"📜",content:[
        "Money has taken many forms throughout history. Ancient civilizations used cowrie shells, salt, and even large stones as currency.",
        "Around 700 BCE, the kingdom of Lydia (modern-day Turkey) created the first metal coins. Later, China invented paper money. Today, most money is digital — numbers moving between computers when you tap a phone or swipe a card!",
        "💡 The word \"salary\" comes from the Latin word for salt. Roman soldiers were sometimes paid in salt because it was so valuable!"]},
      {id:"1-3",t:"Earning Your Own",icon:"💼",content:[
        "Here are two magic questions to discover your money-making sweet spot: What makes you lose track of time? What do friends ask you for help with?",
        "Where those two answers overlap is your earning superpower. Kids have started businesses washing cars, making friendship bracelets, tutoring classmates, walking dogs, and selling baked goods.",
        "💡 You don't need to be a grown-up to earn money. Many successful entrepreneurs started their first businesses as kids!"]},
      {id:"1-4",t:"Borrowing and Owing",icon:"📋",content:[
        "When you borrow your friend's $5 for lunch, you're in debt until you pay it back. Banks lend money too, but they charge a fee called interest.",
        "Some borrowing helps you grow — like a student loan for college that helps you get a better job. Other borrowing shrinks your wealth — like buying stuff on a credit card that you can't pay back right away.",
        "💡 The key rule: only borrow for things that will be worth MORE to you than the interest you'll pay."]},
      {id:"1-5",t:"Where Money Lives",icon:"🏦",content:[
        "A piggy bank is fine for coins, but for serious saving, banks are safer. They're insured by the government through the FDIC (Federal Deposit Insurance Corporation) — up to $250,000!",
        "Banks actually pay YOU a small amount called interest just for keeping your money there. They use your deposits to make loans to other people, and share some of the profit with you.",
        "💡 You can keep money in savings accounts, checking accounts, online banks, or credit unions. Each has different benefits!"]}
    ],
    quiz:[
      {q:"Before money existed, people exchanged goods directly. What is this called?",o:["Shopping","Bartering","Banking","Investing"],c:1},
      {q:"A fee charged for borrowing money is called...",o:["A tip","A tax","Interest","A deposit"],c:2},
      {q:"Why are banks safer than a piggy bank?",o:["They look nicer","Money is insured by the government","They give free stuff","They hide it better"],c:1}
    ],
    act:{type:"money-idea",t:"My Money Idea",d:"Discover your earning superpower!"}
  },
  { id:2, t:"Becoming a Super Saver", icon:"🐷", c:C.ch2, d:"The 4-Bucket Plan, setting goals, and the joy of giving.", seoTitle:"The 4 Bucket Savings Method for Kids – The Kid Vault", seoDesc:"Learn the 4 bucket savings method for kids: spend, save, invest, and give. Free interactive budgeting lesson for ages 6-12.", seoKeywords:"teaching kids to save money, 4 bucket savings method kids, needs vs wants kids, kids savings goals, financial literacy for kids",
    lessons:[
      {id:"2-1",t:"The Marshmallow Choice",icon:"🍪",content:[
        "Imagine someone offers you one cookie now OR three cookies if you wait 30 minutes. That's the core of saving: giving up something small today to get something bigger tomorrow.",
        "A kid who saves $8 per week from chores can buy a $200 gaming headset in just 25 weeks! Meanwhile, spending $8 every week on snacks leaves you with nothing.",
        "💡 Scientists actually tested this with marshmallows! Kids who could wait for two marshmallows instead of eating one right away tended to be more successful later in life."]},
      {id:"2-2",t:"Needs, Wants, and Wishes",icon:"🎯",content:[
        "Sort everything you spend on into three tiers. Needs: you must have them (food, water, shelter, school supplies). Wants: life is more fun with them (video games, trendy shoes). Wishes: big dream items (a trip, a laptop, a car someday).",
        "Knowing the difference between these three is the #1 money skill. Before buying anything, ask yourself: which tier does this belong to?",
        "💡 Here's a trick — if you're unsure whether something is a need or a want, wait 3 days. If you still think about it, it might be a real need!"]},
      {id:"2-3",t:"The 4-Bucket Plan",icon:"🪣",content:[
        "Every time you get money, split it into four buckets: 40% for spending now, 30% for big goals, 20% for your future, and 10% for giving to others.",
        "Even with just $10, that's $4 to spend, $3 toward something big, $2 for later, and $1 to share. It works with any amount!",
        "💡 The hardest part is starting. Once it becomes a habit, it feels automatic — like brushing your teeth!"]},
      {id:"2-4",t:"Setting a Savings Goal",icon:"🎯",content:[
        "A goal without a plan is just a wish! Write down: What do I want? How much does it cost? How much can I save per week?",
        "Then divide cost by weekly savings to get your timeline. Want a $80 skateboard and save $5/week? That's 16 weeks! Celebrate milestones at 25%, 50%, and 75%.",
        "💡 Put a picture of your goal somewhere you'll see it every day. Visual reminders keep you motivated!"]},
      {id:"2-5",t:"Where to Stash Your Cash",icon:"💰",content:[
        "Short-term savings can go in a jar or piggy bank. Long-term savings should go in a real bank account where it earns interest.",
        "For even longer-term goals, a CD (Certificate of Deposit) pays higher interest but locks your money for a set period — you agree not to touch it for 6 months, 1 year, or more.",
        "💡 Think of it like a ladder: piggy bank → savings account → CD. Each step up earns more interest but is a bit less flexible."]},
      {id:"2-6",t:"The Joy of Giving",icon:"🎁",content:[
        "Money isn't just for you! Donating to causes you care about, buying supplies for an animal shelter, or helping a friend in need — these are some of the most powerful things money can do.",
        "You can also give your TIME, which is often worth more than cash. Volunteering, helping a neighbor, or mentoring a younger kid are all ways to give back.",
        "💡 Studies show that people who give to others actually feel happier than people who spend only on themselves!"]}
    ],
    quiz:[
      {q:"In the 4-Bucket Plan, what percent goes toward your future?",o:["40%","30%","20%","10%"],c:2},
      {q:"A CD (Certificate of Deposit) is different from a savings account because...",o:["It plays music","It locks your money but pays more interest","It's free","It's only for adults"],c:1},
      {q:"Needs are different from wants because...",o:["Needs cost more","Needs are essential; wants make life more fun","No difference","Wants are more important"],c:1}
    ],
    act:{type:"budget-builder",t:"Budget Builder",d:"Split $20 across your 4 buckets!"}
  },
  { id:3, t:"The Magic of Interest", icon:"✨", c:C.ch3, d:"How your money grows while you sleep – the snowball effect.", seoTitle:"Compound Interest for Kids – The Kid Vault", seoDesc:"Explain compound interest to kids with fun examples and an interactive calculator. Free lesson on how money grows over time.", seoKeywords:"compound interest for kids, simple interest kids, rule of 72 kids, how money grows kids, teaching kids about interest",
    lessons:[
      {id:"3-1",t:"Your Money's Rent Check",icon:"🏠",content:[
        "When you put money in a bank, the bank uses it to make loans to other people. As a thank-you, they pay you a small fee called interest.",
        "It's like your money is working a job while you sleep! This kind of earning without doing extra work is called passive income.",
        "💡 Banks typically pay between 1% and 5% interest per year on savings accounts."]},
      {id:"3-2",t:"Simple Interest Explained",icon:"📝",content:[
        "Simple interest is straightforward math. If you deposit $100 at 5% interest, you earn $5 every year. After 5 years, you'd have $125.",
        "The formula is: Amount × Rate × Years. So $100 × 0.05 × 5 = $25 in interest, giving you $125 total.",
        "💡 Simple interest is like getting the same-sized paycheck from your money every year."]},
      {id:"3-3",t:"Compound Interest: The Snowball",icon:"⛄",content:[
        "What if the $5 you earned in Year 1 ALSO starts earning interest? In Year 2, you earn interest on $105 instead of $100.",
        "The difference is tiny at first, but over decades it becomes enormous. It's like a snowball rolling downhill — it picks up more snow as it grows!",
        "💡 After 30 years at 8%: simple interest turns $100 into $340. Compound interest turns it into $1,006!"]},
      {id:"3-4",t:"The Rule of 72",icon:"🔢",content:[
        "Want a quick trick? Divide 72 by your interest rate to find how many years it takes to DOUBLE your money.",
        "At 6%: 72 ÷ 6 = 12 years. At 8%: 72 ÷ 8 = 9 years. At 12%: 72 ÷ 12 = just 6 years!",
        "💡 $100 at 8% becomes $200 in 9 years, $400 in 18 years, $800 in 27 years, $1,600 in 36 years!"]},
      {id:"3-5",t:"Why Being Young Is Your Superpower",icon:"⚡",content:[
        "Ava starts saving $50/month at age 15 and stops at 25 (10 years, $6,000 total). Ben starts at 25 and saves $50/month until age 60 (35 years, $21,000 total).",
        "At age 60, Ava has MORE money than Ben — even though she invested far less! Her money had more TIME to compound.",
        "💡 This is why learning about money NOW is so powerful. You have the one thing money can't buy: time."]}
    ],
    quiz:[
      {q:"Compound interest is different from simple interest because...",o:["It's simpler","Your interest earns its own interest","It's for adults only","They're the same"],c:1},
      {q:"Using the Rule of 72, how long to double money at 8%?",o:["8 years","About 9 years","12 years","72 years"],c:1},
      {q:"Why do young investors have an advantage?",o:["They're smarter","They have more money","Their money has more time to compound","Special rates"],c:2}
    ],
    act:{type:"interest-calc",t:"Watch It Grow",d:"See your money grow year by year!"}
  },
  { id:4, t:"Introduction to Investing", icon:"📊", c:C.ch4, d:"Stocks, bonds, risk vs. reward, and thinking like a detective.", seoTitle:"Investing for Kids: Stocks & Bonds Explained – The Kid Vault", seoDesc:"What are stocks and bonds? Teach kids the basics of investing with simple, fun lessons. Free financial education for ages 6-12.", seoKeywords:"investing for kids, stocks and bonds for kids, what is a stock for kids, risk vs reward kids, kids investing basics",
    lessons:[
      {id:"4-1",t:"Saving vs. Investing",icon:"🅰️",content:[
        "Saving is like parking your bike in the garage — safe but it stays the same. Investing is like planting a garden — some risk but potential to grow much bigger.",
        "Saving protects your money. Investing grows it. Smart plans use BOTH — save for short-term needs, invest for long-term goals.",
        "💡 Money you need in 1-2 years should be saved. Money you won't need for 5+ years can be invested."]},
      {id:"4-2",t:"What Are Stocks?",icon:"📈",content:[
        "When a company needs money to grow, it sells tiny ownership pieces called stocks (also known as shares). Buy one share of a pizza chain and you literally own a tiny slice of that company!",
        "If the chain opens more locations and earns more profit, your share becomes worth more. But if the company does poorly, your share could lose value.",
        "💡 There are stock exchanges like the NYSE (New York Stock Exchange) where millions of stocks are bought and sold every day."]},
      {id:"4-3",t:"What Are Bonds?",icon:"📋",content:[
        "A bond is basically an IOU. You lend money to a company or government, and they promise to pay you back with interest on a specific date.",
        "Bonds are generally safer than stocks but grow slower. Think of it as being the bank — you're the one lending and earning interest!",
        "💡 US Treasury bonds are considered some of the safest investments in the world."]},
      {id:"4-4",t:"The Risk-Reward Seesaw",icon:"⚖️",content:[
        "Higher potential reward almost always comes with higher risk. Think of a video game: Easy mode has small prizes, Hard mode has the big treasure but more danger.",
        "Smart investors find their comfort level. There's no single right answer — it depends on your age, goals, and personality.",
        "💡 The younger you are, the more risk you can take — because you have lots of time to recover from losses."]},
      {id:"4-5",t:"Doing Your Homework",icon:"🔍",content:[
        "Never invest in something you don't understand! Before putting money into any company, ask: What does this business sell? Who buys it?",
        "Also check: Is the business growing or shrinking? Who are its competitors? Thinking like a detective protects your money.",
        "💡 Warren Buffett — one of the most successful investors in history, known as the 'Oracle of Omaha,' who started investing at age 11 — says his #1 rule is: never invest in something you don't understand."]}
    ],
    quiz:[
      {q:"The main difference between saving and investing is...",o:["No difference","Saving keeps money safe; investing aims to grow it","Investing is only for adults","Saving earns more"],c:1},
      {q:"When you buy a stock, you are...",o:["Lending money","Becoming a part-owner of a company","Opening a bank account","Buying a bond"],c:1},
      {q:"Why research before investing?",o:["It's the law","To understand what you're buying and reduce risk","To impress friends","Research isn't needed"],c:1}
    ],
    act:{type:"biz-detective",t:"Business Detective",d:"Investigate 3 businesses and pick the best investment!"}
  },
  { id:5, t:"The Investment Menu", icon:"🗂️", c:C.ch5, d:"From super-safe savings accounts to adventurous stocks.", seoTitle:"Index Funds & Investment Types for Kids – The Kid Vault", seoDesc:"Help kids understand index funds, risk vs. reward, and ROI with interactive activities. Free investing lesson for children.", seoKeywords:"types of investments for kids, mutual funds for kids, index funds kids, ETF for kids, kids investment options",
    lessons:[
      {id:"5-1",t:"The Safety Zone",icon:"🛡️",content:[
        "Savings accounts let you access cash anytime and earn small interest. Very safe! CDs (Certificates of Deposit) lock your money for a set period in exchange for higher rates.",
        "Treasury bills are loans to the US government — essentially the safest investment in the world.",
        "💡 These safe investments won't make you rich fast, but they protect your money and provide a solid foundation."]},
      {id:"5-2",t:"The Middle Ground",icon:"⚖️",content:[
        "Instead of betting on one company, buy a \"basket\" of hundreds. An S&P 500 (Standard & Poor's 500) index fund holds a piece of the 500 largest US companies.",
        "If a few go down, others go up — you're diversified automatically. Historically, this basket has grown about 10% per year on average.",
        "💡 Index funds are one of the most popular investments for beginners because they spread risk automatically."]},
      {id:"5-3",t:"The Adventure Zone",icon:"🎢",content:[
        "Picking specific companies can lead to big wins or big losses. A \"bull market\" means prices charge upward. A \"bear market\" means prices fall.",
        "Over long periods, bull markets happen more often and last longer than bear markets. Patience pays off!",
        "💡 Even during scary bear markets, patient investors who held on almost always came out ahead eventually."]},
      {id:"5-4",t:"Beyond the Market",icon:"🏠",content:[
        "You can invest in property, rare collectibles (art, trading cards, sneakers), or brand-new companies (startups). Each has unique risks and rewards.",
        "A rare baseball card might be worth thousands someday... or just cardboard. Real estate usually grows but requires lots of money upfront.",
        "💡 The best investors spread their money across several types of investments — not just one."]},
      {id:"5-5",t:"Return on Investment",icon:"📊",content:[
        "ROI (Return on Investment) measures how good an investment is. Here's how to calculate it step by step:",
        "First, find your profit: Profit = Money You Earned − Money You Spent. Example: You spent $50 on lemonade supplies and earned $75. Profit = $75 − $50 = $25. Then, calculate ROI: ROI = (Profit ÷ Money You Spent) × 100. So ROI = ($25 ÷ $50) × 100 = 50%. That means you earned back half of what you spent — a great return!",
        "💡 ROI works for everything — spending 2 hours studying for an A on a test? Great ROI on your time!"]}
    ],
    quiz:[
      {q:"A Treasury bill is safe because...",o:["It's expensive","It's backed by the US government","It's new","It pays the most"],c:1},
      {q:"An index fund contains...",o:["One stock","Hundreds of companies bundled together","Only bonds","Only savings"],c:1},
      {q:"ROI (Return on Investment) stands for...",o:["Rate of Income","Return on Investment","Risk of Interest","Range of Indexes"],c:1}
    ],
    act:{type:"risk-ranker",t:"Risk-O-Meter",d:"Rank investments from lowest to highest risk!"}
  },
  { id:6, t:"Be a Smart Investor", icon:"🧠", c:C.ch6, d:"Diversification, patience, portfolios, and investing with values.", seoTitle:"Smart Investing for Kids: Diversification & Portfolios – The Kid Vault", seoDesc:"Teach kids about diversification, building a portfolio, and investing with values. Free financial literacy lesson for ages 6-12.", seoKeywords:"diversification for kids, investment portfolio kids, smart investing kids, teaching kids to invest, financial literacy elementary",
    lessons:[
      {id:"6-1",t:"Don't Put All Eggs in One Basket",icon:"🥚",content:[
        "Imagine you sell only lemonade. Rainy week? Zero sales. But if you also sell hot cocoa, rainy days become great for business!",
        "That's diversification — spreading money across different investments so no single bad event ruins everything.",
        "💡 Even professionals who study markets full-time practice diversification. Nobody can predict the future!"]},
      {id:"6-2",t:"Building Your Team (Portfolio)",icon:"⚽",content:[
        "Your portfolio is like a sports team. You want fast scorers (stocks), strong defense (bonds), and a reliable goalkeeper (cash/savings).",
        "The right mix depends on your age, personality, and goals. Someone nervous might want more bonds. Someone adventurous might want more stocks.",
        "💡 The best portfolio is the one that lets you sleep well at night AND reach your goals."]},
      {id:"6-3",t:"Age and Your Investment Mix",icon:"📅",content:[
        "Simple rule: subtract your age from 110 for your stock percentage. Age 10: 110-10 = 100% stocks. Age 50: 110-50 = 60% stocks, 40% bonds.",
        "This is just a guideline. The key idea: the younger you are, the more growth-focused you can be because you have time to recover from dips.",
        "💡 As you get older and closer to needing the money, gradually shift toward safer investments."]},
      {id:"6-4",t:"Patience Wins",icon:"🧘",content:[
        "The stock market goes up AND down. If you panic-sell every dip, you lock in losses. Patient investors who stayed through downturns almost always came out ahead.",
        "Think of a roller coaster — scary drops, but stay seated and you end up back on top. The market has recovered from every crash in history.",
        "💡 Patient Pat stays invested through ups and downs. Panicking Pete sells at every dip and misses the recovery."]},
      {id:"6-5",t:"Investing With Your Values",icon:"🌱",content:[
        "You can invest in companies that match what you care about. Love the environment? Clean energy companies. Care about fairness? Companies with diverse leadership.",
        "This lets your money support the world you want while still earning returns. More young investors are choosing this path.",
        "💡 You can also AVOID companies you disagree with. Your money is a vote for the kind of world you want."]}
    ],
    quiz:[
      {q:"Diversification means...",o:["Buying one great stock","Spreading investments so one bad event doesn't ruin everything","Only investing in bonds","Saving in a piggy bank"],c:1},
      {q:"When markets drop, smart long-term investors usually...",o:["Sell everything","Stay patient and wait for recovery","Stop investing forever","Move to cash"],c:1}
    ],
    act:{type:"portfolio-builder",t:"Portfolio Builder",d:"Create your investment mix!"}
  },
  { id:7, t:"Your Money Future", icon:"🌟", c:C.ch7, d:"Putting it all together and taking your first real steps.", seoTitle:"Your Money Future: Financial Goals for Kids – The Kid Vault", seoDesc:"Help kids set financial goals and create a money roadmap for life. Free final chapter of The Kid Vault's financial literacy course.", seoKeywords:"kids money habits, financial goals for kids, teaching kids financial responsibility, money future kids, kids financial education",
    lessons:[
      {id:"7-1",t:"Early Bird Gets the Worm",icon:"🐦",content:[
        "Starting early is the single most powerful thing you can do with money. Even small amounts, given enough time, grow into something amazing.",
        "A teenager who invests $1,000 once at age 15 can have more at 60 than an adult who starts at 30 and invests $1,000 per year. That's time + compound interest!",
        "💡 You don't need a lot of money to start. Even $1 invested today is better than $100 invested \"someday.\""]},
      {id:"7-2",t:"Your 5-Step Money Roadmap",icon:"🗺️",content:[
        "Step 1: Find ways to earn (chores, services, small business). Step 2: Pay yourself first (save before you spend). Step 3: Set clear goals (what, how much, when).",
        "Step 4: Start small with investing (ask a parent about custodial accounts). Step 5: Keep learning — read, watch, ask questions, stay curious!",
        "💡 You don't have to do all 5 at once. Start with Step 1, add others as you grow."]},
      {id:"7-3",t:"Dream Big",icon:"🌈",content:[
        "Your financial goals will change as you grow. Now: a bike or video game. At 20: college or travel. At 30: a home. At 60: freedom to do whatever you want.",
        "The skills you're learning RIGHT NOW — saving, budgeting, investing — apply at every stage of life.",
        "💡 Write down three goals: one for this year, one for age 20, and one big dream. Put them where you'll see them!"]},
      {id:"7-4",t:"Money Is a Tool, Not the Goal",icon:"❤️",content:[
        "The richest life isn't about having the most money — it's about having choices. Money lets you help family, pursue passions, give back, and handle surprises.",
        "The real goal is freedom, security, and the ability to make a difference. Money is just the tool that helps you get there.",
        "💡 Congratulations — by finishing The Kid Vault, you understand more about money than many adults! Share what you've learned."]}
    ],
    quiz:[
      {q:"The most powerful advantage young people have is...",o:["More money","Time for compound interest to work","Better luck","Special accounts"],c:1},
      {q:"What's the first step in the Money Roadmap?",o:["Buy stocks","Find ways to earn money","Open a bank","Wait until 18"],c:1}
    ],
    act:{type:"certificate",t:"Certificate of Achievement",d:"Celebrate your graduation!"}
  }
];

export const TOTAL_STARS = CH.reduce((s, c) => s + c.lessons.length + 2, 0);

export const chapterStarCount = (stars: Record<string, boolean>, chIdx: number) => {
  const c = CH[chIdx];
  return c.lessons.filter(l => stars[l.id]).length +
    (stars[`ch${c.id}-quiz`] ? 1 : 0) +
    (stars[`ch${c.id}-act`] ? 1 : 0);
};

export const chapterTotalStars = (chIdx: number) => CH[chIdx].lessons.length + 2;

// GA4 event helpers
export const gaEvent = (name: string, params?: Record<string, string | number>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, params);
  }
};
