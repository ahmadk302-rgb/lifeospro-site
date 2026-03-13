# Life OS Pro + Tempo — ConvertKit Complete Setup Guide

---

## WHAT'S ALREADY DONE (via API — no action needed)

| Item | Status | Details |
|------|--------|---------|
| Tag: `waitlist` | CREATED | ID: 17305719 |
| Tag: `tempo-lite-interest` | CREATED | ID: 17305720 |
| Tag: `pro-interest` | CREATED | ID: 17305721 |
| Tag: `founding-member` | CREATED | ID: 17305722 |
| Tag: `trial-started` | CREATED | ID: 17305723 |
| Tag: `trial-ending` | CREATED | ID: 17305724 |
| Tag: `converted-paid` | CREATED | ID: 17305725 |
| Custom field: `product_interest` | CREATED | For segmenting by product |
| Custom field: `referral_source` | CREATED | For tracking where subscribers came from |
| Form: "Clare form" | EXISTED | Your waitlist embed on lifeospro.io |
| Subscriber: Khalid (you) | TAGGED | Tagged with `waitlist` + `founding-member` |

---

## WHAT YOU NEED TO DO MANUALLY

There are **4 tasks** below. Total time: ~20-30 minutes.

---

### TASK 1: Create the Nurture Sequence (5 min)

1. Log into https://app.convertkit.com
2. Click **"Send"** in the top nav
3. Click **"Sequences"**
4. Click **"+ New Sequence"**
5. Name it: **Waitlist Nurture**
6. Click **Create Sequence**

You'll now see the sequence editor with one blank email. Follow Task 2 to add all 7 emails.

---

### TASK 2: Add the 7 Emails to the Sequence (15 min)

For each email below:
- Paste the **Subject** into the subject line field
- Paste the **Body** into the email body (use the plain text/markdown editor, not the visual one, for cleanest results)
- Set the **delay** (shown as "Send X days after previous")
- Click **"Add Email Step"** to create the next one

> TIP: ConvertKit's sequence editor uses a rich text editor. You can paste the body text and it will format correctly. Bold text is marked with ** below — use Cmd+B in the editor to bold those parts.

---

#### EMAIL 1 — Send immediately (Day 0)

**Subject:**
```
You're in. Here's what happens next.
```

**Body:**
```
Hey {{ subscriber.first_name | default: "there" }},

You just joined the Life OS Pro waitlist — welcome.

Here's the short version of what we're building:

Life OS Pro is a personal operating system that connects three things most people keep separate: your vision (what actually matters to you), your money (where it goes every month), and your execution (what you do each week).

Most people have goals in one app, budgets in another, and to-do lists in a third. Nothing talks to each other. So you drift. We fix that.

Tempo is our standalone budgeting app — already live with a free 7-day trial. It's the money engine inside Life OS Pro, but it works on its own too. If you want to try it now:

→ Start your free Tempo trial: https://tempo.lifeospro.io

Over the next couple of weeks, I'll share a few short emails about how this system works and why I built it. No spam. No pitches. Just the thinking behind the product.

Talk soon,
Khalid
```

**Delay:** Immediately (0 days — this is the first email)

---

#### EMAIL 2 — Day 2

**Subject:**
```
Why I stopped using YNAB (and built my own thing)
```

**Body:**
```
{{ subscriber.first_name | default: "Hey" }},

I used YNAB for years. It's a good product. But something always felt off.

I'd set up my budget. Categorize everything. Feel organized. And then... nothing changed. I still spent the same way. My goals still felt far away. My weeks still felt reactive.

The problem wasn't the budgeting. The problem was that my budget existed in a vacuum.

It didn't know what I was trying to build in my life. It didn't connect to my weekly priorities. It just tracked dollars — and tracking dollars doesn't change behavior.

So I started building something different. A system where:

- Your goals inform your budget (not the other way around)
- Your budget creates your weekly execution plan
- Your weekly review closes the loop back to your goals

That's Life OS Pro. It's not a budgeting app. It's not a goal tracker. It's the connective tissue between everything that matters.

More on how this actually works in the next email.

— Khalid
```

**Delay:** 2 days after previous

---

#### EMAIL 3 — Day 5

**Subject:**
```
The 3 systems that run your life (and why they need to talk)
```

**Body:**
```
{{ subscriber.first_name | default: "Hey" }},

Here's the mental model behind Life OS Pro.

Your life runs on three systems:

1. Vision — what you're building toward. Career moves, savings targets, health milestones, relationship goals. Most people have a vague sense of these but never write them down or connect them to action.

2. Money — where your dollars go. This is the constraint that makes everything real. You can't save for a house and eat out every night. Your money reveals your actual priorities (not your stated ones).

3. Execution — what you do this week. The bridge between "someday" and today. Without a weekly system that connects to your bigger picture, you default to urgency and drift.

Most tools handle one of these. YNAB handles money. Notion handles projects. Todoist handles tasks. But none of them talk to each other.

Life OS Pro connects all three. Your goals shape your budget. Your budget shapes your week. Your weekly review shapes your goals. It's a closed loop.

This is what "stop drifting, start operating" actually means.

— Khalid
```

**Delay:** 3 days after previous

---

#### EMAIL 4 — Day 8

**Subject:**
```
Tempo is live — try it free for 7 days
```

**Body:**
```
{{ subscriber.first_name | default: "Hey" }},

Quick one today.

Tempo — the budgeting engine inside Life OS Pro — is live and free to try for 7 days.

It's not another envelope budgeting app. Here's what makes it different:

- Phase-based budgeting — splits your month into paycheck-aligned phases so you always know what's available right now (not "this month")
- Safe-to-spend — one number that tells you exactly what you can spend today without touching your bills or goals
- Goal allocation — move money into goals with one tap, and your safe-to-spend updates instantly
- Bill tracking — knows when bills are due in each phase, marks them paid, handles split billing across phases

If you've ever looked at your bank balance and thought "can I afford this?" — Tempo gives you the real answer in 2 seconds.

→ Start your free trial: https://tempo.lifeospro.io

No credit card required. No obligation.

— Khalid
```

**Delay:** 3 days after previous

---

#### EMAIL 5 — Day 11

**Subject:**
```
The real reason most budgets fail (it's not discipline)
```

**Body:**
```
{{ subscriber.first_name | default: "Hey" }},

I want to share something personal.

Before I built this system, my financial life looked "fine" on paper. I had a budget. I tracked my spending. But I still felt anxious about money.

The issue? I was managing dollars without managing decisions.

I'd budget $400 for groceries. But I didn't know if that was the right number because I hadn't connected it to what I was actually trying to achieve that quarter. I was optimizing categories instead of outcomes.

When I built the Life OS Pro system for myself, something shifted:

- I could see that my "save for a house" goal needed $800/month — so my dining-out budget had to shrink. That wasn't deprivation. That was alignment.

- I could see that my week was full of tasks that didn't connect to any goal. So I dropped them. That wasn't laziness. That was focus.

- I could see in my weekly review that I was actually making progress. That wasn't tracking. That was momentum.

The honest comparison page on our site breaks down how Life OS Pro and Tempo stack up against YNAB, Monarch, Copilot, and others:

→ See the comparison: https://lifeospro.io/#comparison

Not trying to trash any product. Just being transparent about what's different.

— Khalid
```

**Delay:** 3 days after previous

---

#### EMAIL 6 — Day 15

**Subject:**
```
What "founding member" means (and why it matters now)
```

**Body:**
```
{{ subscriber.first_name | default: "Hey" }},

You're on this list early. That matters.

When Life OS Pro launches fully, the price will be $9.99/month. But as a founding member on this waitlist, you'll get access at a locked-in rate that won't increase — even as we add features.

Here's what founding members get:

- Locked pricing — your rate stays the same as long as you're subscribed
- Early access — you'll be first to try new modules as they ship
- Direct line — reply to any of these emails and you'll hear back from me directly. I read everything.

I'm building this with a small group of people who actually use it. Not for venture capital. Not for a massive exit. For people who want their money, goals, and weeks to work together.

If that sounds like you, you're in the right place.

Tempo (the budgeting piece) is available right now if you want to get started:

→ Start free: https://tempo.lifeospro.io

— Khalid
```

**Delay:** 4 days after previous

---

#### EMAIL 7 — Day 19

**Subject:**
```
What to do next
```

**Body:**
```
{{ subscriber.first_name | default: "Hey" }},

Last email in this series. Here's your quick action plan:

If you want to start now:
→ Try Tempo free for 7 days: https://tempo.lifeospro.io
It's the budgeting engine from Life OS Pro. Works standalone. No credit card needed.

If you want to wait for the full system:
→ You're already on the list. I'll email you the moment Life OS Pro opens to founding members. You'll get first access + locked pricing.

If you know someone who'd benefit:
→ Forward this email to them, or send them to https://lifeospro.io — every person who joins helps us build a better product.

If you have questions:
→ Just reply. I read and respond to every email personally.

That's it. No more scheduled emails. From here, you'll only hear from me when there's something worth sharing — a new feature, a launch date, or something I think will genuinely help you.

Thanks for being early.

— Khalid
```

**Delay:** 4 days after previous

---

### TASK 3: Wire the Automation (3 min)

This makes the sequence fire automatically when someone joins your waitlist.

1. Click **"Automate"** in the top nav
2. Click **"Rules"** (not "Visual Automations" — Rules is simpler and sufficient)
3. Click **"+ Add Rule"**
4. Set up **Rule 1:**
   - **Trigger:** "Subscribes to a form" → select **"Clare form"**
   - **Action:** "Add to email sequence" → select **"Waitlist Nurture"**
   - Click **Save Rule**
5. Click **"+ Add Rule"** again
6. Set up **Rule 2:**
   - **Trigger:** "Subscribes to a form" → select **"Clare form"**
   - **Action:** "Tag subscriber" → select **"waitlist"**
   - Click **Save Rule**

---

### TASK 4: Turn Off Your Old Incentive Email (1 min)

Since Email 1 in the sequence now replaces your standalone incentive email:

1. Go to **"Send"** → **"Broadcasts"** (or wherever your current incentive email lives)
2. If it's set as the form's incentive email: Go to **"Grow"** → **"Forms"** → click **"Clare form"** → **Settings** → remove or disable the incentive email
3. The sequence will now handle everything from first touch onward

---

## AFTER SETUP: How the System Works

```
Someone visits lifeospro.io
        ↓
Enters email in waitlist form ("Clare form")
        ↓
Automation Rule 1: Tagged "waitlist"
Automation Rule 2: Added to "Waitlist Nurture" sequence
        ↓
Day 0:  Email 1 — Welcome + intro to both products
Day 2:  Email 2 — Problem story (why YNAB wasn't enough)
Day 5:  Email 3 — Mental model (vision + money + execution)
Day 8:  Email 4 — Tempo trial CTA (main conversion email)
Day 11: Email 5 — Personal story + comparison page
Day 15: Email 6 — Founding member urgency
Day 19: Email 7 — Final CTA + referral ask
        ↓
Subscriber is now nurtured. Future emails are manual broadcasts.
```

---

## TAG USAGE GUIDE (for future reference)

These tags are already created. Use them as your list grows:

| Tag | When to Apply | How |
|-----|---------------|-----|
| `waitlist` | Auto — when someone joins the form | Automation Rule 2 handles this |
| `founding-member` | Manually — for early subscribers you want to reward | Tag in ConvertKit UI |
| `tempo-lite-interest` | When someone clicks a Tempo link in an email | Set up "link trigger" in sequence editor |
| `pro-interest` | When someone clicks a Life OS Pro link | Set up "link trigger" in sequence editor |
| `trial-started` | When someone starts a Tempo trial | Tag via Supabase webhook (future) |
| `trial-ending` | When trial is about to expire | Tag via Supabase webhook (future) |
| `converted-paid` | When someone pays | Tag via Stripe webhook (future) |

---

## OPTIONAL: Link Triggers (adds 5 min)

ConvertKit lets you auto-tag subscribers when they click specific links in your emails. This helps you segment by interest.

In the sequence editor, for any Tempo link:
1. Click the link in the email body
2. Select "Add link trigger"
3. Choose tag: `tempo-lite-interest`

For any lifeospro.io link:
1. Same process
2. Choose tag: `pro-interest`

This way you'll automatically know who's interested in which product.

---

## NEXT STEPS AFTER THIS IS SET UP

1. **SparkLoop referral integration** — makes every subscriber a recruiter (I can help research setup)
2. **Reddit/community marketing** — start posting valuable content in r/personalfinance, r/budgeting, r/YNAB
3. **Product Hunt launch prep** — for Tempo (free trial = high conversion potential)
4. **"Powered by" link** in Tempo footer → drives organic signups
