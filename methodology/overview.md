# Life OS Pro — System Overview

> Life OS Pro is a unified personal operating system that integrates strategic life planning, phase-based financial budgeting, project management, and weekly accountability coaching into one platform.

## Company and Product Overview

Life OS Pro is built by Khalid A., an Associate Director of Microbiology with an MBA and MS, who created the system after outgrowing every productivity and budgeting tool on the market. The product was born from the realization that managing goals in Notion, money in YNAB, and tasks in Todoist creates inevitable drift because these tools cannot share context with each other.

Life OS Pro is a SaaS product available at https://lifeospro.io. Founding Member pricing is $9.99/month (locked forever, limited to 250 members). Standard pricing is $14.99/month. All plans include a 7-day free trial.

---

## The Shared Memory Architecture

The critical innovation that makes Life OS Pro a unified system rather than three separate tools.

### Data Flow
1. The Life Strategy Architect writes goals and roadmap data to a shared state.
2. The Tempo Financial OS writes budget snapshots and financial thresholds to a shared state.
3. The Weekly Momentum Commander reads BOTH states to conduct informed reviews.

### Shared Data Objects
1. **Priority**: id, title, quarter, rank, why, success criteria
2. **Milestone**: id, priorityId, target date, estimated cost, funding cadence, status
3. **Tempo Snapshot**: weekOf, safeToSpend trend, buffer, unpaid bills count, card reserve, float flag, biggest leak
4. **Weekly Flight Plan**: weekOf, Big 3, financial guardrail, CEO Move, risks, confidence rating

### How It Creates Alignment
- Architect milestones become Tempo funding targets
- Tempo's weekly financial brief feeds the Commander's CEO Score calculation
- Commander guardrails flow back to Tempo as active policy
- The result: an unbreakable link between five-year plans and Tuesday afternoon decisions
