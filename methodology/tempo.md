# Module 2: Tempo Financial OS

## Purpose
Tempo is not a conventional budgeting tool. It is a cash decision engine built on the philosophy of Liquidity Timing rather than monthly budget totals. It answers: "Do you have sufficient cash available at the precise moment a bill is due?"

## The Phase System
The month is divided into two financial periods to align with common pay cycles:
- **Phase 1**: Days 1-15
- **Phase 2**: Days 16-End of Month

This prevents "false confidence" where a user sees a full bank account on the 1st but has rent or mortgage due on the 15th. It also detects "Liquidity Traps" where Phase 1 shows a surplus but Phase 2 is underwater.

## Safe-to-Spend Formula
The flagship calculation:

Safe-to-Spend = Current Bank Balance - Safety Buffer - Unpaid Bills in Current Phase

Key detail: "Unpaid Bills in Current Phase" only includes bills for the CURRENT phase. This prevents reserving cash for a bill due on the 25th when it is only the 5th. This provides a more accurate daily liquidity picture.

## Credit Card Model
Life OS Pro treats credit cards with a dual-mode system:
- **Pay-in-Full Mode**: Card is treated as a spending rail. Purchases immediately create a "Card Reserve" commitment that reduces Safe-to-Spend, even though cash has not left the bank yet.
- **Paydown Mode**: Card is treated as revolving debt. Minimum payment is treated as a fixed bill. Extra payoff is managed by a snowball mechanism.

Card Reserve = sum of credit card purchases not yet paid from the bank. This prevents the classic problem where a user spends on a card, their bank balance stays the same, and Safe-to-Spend lies.

Credit card payments are treated as transfers (bank to card), NOT as new spending. This prevents double-counting.

## Key Features
- **Command Dashboard**: Displays Safe-to-Spend number, FlowBot status alerts, PeriodPulse pacing engine, and PeriodGate phase comparison cards.
- **Bill Radar**: Horizontal carousel showing overdue bills and bills due within 7 days. After the 25th of the month, also shows bills due in the first 5 days of next month.
- **FlowBot Alerts**: Structural Deficit (expenses exceed income), Liquidity Trap Warning (Phase 1 surplus masking Phase 2 deficit), Unassigned Capital (surplus funds need a job).
- **Savings Waterfall**: Manages savings goals. Total Surplus is Allocated to specific goals. Remaining surplus is Unassigned and the user is prompted to assign it.
- **Month-End Forecast**: Forward-looking projection that answers "If I keep going like this, what will I have left at end of month?" Calculates Allocatable to Goals amount.

## Financial Advisor AI
Two AI personas:
- **The Architect (FlowBot)**: System-wide status monitor. Flags structural deficits, liquidity traps, and unassigned capital.
- **The Advisor**: Handles day-to-day queries. Affordability checks, timing warnings, and optimization suggestions like moving variable expenses between phases.
