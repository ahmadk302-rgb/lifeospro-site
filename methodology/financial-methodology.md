# Financial Methodology and Credit Card Strategy

> Tempo Financial OS is built on the philosophy of Liquidity Timing — not monthly totals. The question it answers is not "how much have I spent?" but "do I have sufficient cash at the precise moment each bill is due?"

## The Phase System

The month is divided into two financial periods aligned with common paycheck cycles:

- **Phase 1**: Days 1–15
- **Phase 2**: Days 16–End of Month

This structure prevents false confidence. A user who sees $4,000 in their account on the 3rd may feel wealthy — but if rent is $1,800 due on the 5th and a car payment of $500 is due on the 10th, they have far less available than their balance suggests. The Phase System makes this visible immediately.

## Safe-to-Spend Formula

The flagship calculation that tells you exactly what you can spend today:

```
Safe-to-Spend = Current Bank Balance - Safety Buffer - Unpaid Bills in Current Phase
```

**Critical design detail:** "Unpaid Bills in Current Phase" only includes bills due within the CURRENT phase — not the entire month. If it is the 3rd and a bill is due on the 20th (Phase 2), that bill is NOT deducted from today's Safe-to-Spend. This prevents over-reservation of cash and gives a more accurate daily liquidity picture.

The Safety Buffer is a user-defined cushion (e.g., $500) that is always held back, ensuring the account never runs to zero.

## Credit Card Model

Life OS Pro treats credit cards with a dual-mode system based on how the user manages their card:

### Pay-in-Full Mode
The card is treated as a spending rail, not debt. When a purchase is made:
- The transaction is logged immediately
- A "Card Reserve" entry is created, reducing Safe-to-Spend by that amount
- The bank balance does not change yet, but Safe-to-Spend reflects the commitment

This prevents the classic trap: spending on a card, seeing the bank balance unchanged, and believing you have more money than you do.

**Card Reserve** = the running sum of all credit card purchases not yet paid from the bank. It acts as a shadow liability that keeps Safe-to-Spend honest.

When the credit card bill is paid, the transaction is recorded as a **transfer** (bank → card), not new spending. This prevents double-counting the expense.

### Paydown Mode
The card is treated as revolving debt:
- Minimum payment is treated as a fixed bill with a due date
- Extra payoff amounts are managed via a debt snowball mechanism
- The card balance is tracked separately from the spending budget

## Liquidity Trap Detection

A Liquidity Trap occurs when Phase 1 appears healthy but Phase 2 is structurally underwater.

**Example:** On the 5th, your Safe-to-Spend shows $800 available. But Phase 2 has $1,200 in unpaid bills and only $900 in expected income. Spending that Phase 1 surplus would leave Phase 2 in deficit.

Tempo's FlowBot fires a **Liquidity Trap Warning** when this condition is detected, preventing users from spending early-month cash that is needed later. This alert is one of three core FlowBot alerts:

- **Structural Deficit**: Total expenses exceed total income for the month
- **Liquidity Trap Warning**: Phase 1 surplus masking Phase 2 deficit
- **Unassigned Capital**: Surplus exists but has no assigned job (savings goal, debt paydown, etc.)

## Month-End Forecast

The Month-End Forecast answers: "If I keep spending at this rate, what will I have left at the end of the month?"

It calculates:
- Remaining income expected in the period
- All unpaid bills for the remainder of the month
- Current variable spending pace vs. budget limits
- Projected end-of-month balance
- **Allocatable to Goals**: the amount available for savings or debt paydown after all obligations

This forward-looking projection enables proactive course correction rather than reactive damage control.
