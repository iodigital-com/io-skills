# Briefing template

Use this template in the first conversation about a project or change. One concrete situation gives the team enough detail to discuss a first draft of the spec.

## Copy the brief

Answer in the client's own words. For each open decision, record who can answer it.

```markdown
# Brief — [topic]

## People
Who is trying to do something? Who else plays a part?

## Current situation
What happened last time? Where did someone get stuck?

## Desired outcome
What should that person be able to do independently?

## First agreement
Which behaviour has the client already confirmed?

## How we will check
Which situation will we open? What should we see or be able to do?

## Open questions
What do we still need to know? Who can decide?
```

## A completed example

In this example, a children’s bike shop sells cycling accessories to families through its existing webshop. In the physical shop a salesperson puts two models side by side. Online, the cyclist has to switch between product pages. The retailer wants to add a comparison feature.

- **People.** A parent and her child are choosing a front light on her phone. In winter they cycle to school before sunrise. Later they look for a handlebar bag for a lunchbox and a raincoat.
- **Desired outcome.** She opens a category, chooses any two distinct models from that category and sees their prices and the attributes that help her decide. She can make the same choice as the range grows. From the comparison she can order one item through the existing basket.
- **First agreement.** For lights, show light output and run time on the highest setting. For bags, show capacity and mounting position. For locks, show type and length.

The retailer supplies these nine items as sample data for the review.

| Category | Model | Price | Attributes |
| --- | --- | --- | --- |
| Front lights | Stad 400 | €39 | 400 lumens, 2 hours on the highest setting |
| Front lights | Route 800 | €69 | 800 lumens, 3 hours on the highest setting |
| Front lights | Trail 1200 | €99 | 1200 lumens, 4 hours on the highest setting |
| Bike bags | Frame 2 | €29 | 2 L, frame |
| Bike bags | Stuur 5 | €49 | 5 L, handlebars |
| Bike bags | Tour 18 | €79 | 18 L, rear rack |
| Bike locks | Kabel 90 | €19 | Cable lock, 90 cm |
| Bike locks | Ketting 110 | €49 | Chain lock, 110 cm |
| Bike locks | Beugel 23 | €59 | U-lock, 23 cm |

**How we will check.** Compare Stad 400 with Route 800. Add the Route 800 to the basket and complete the local test checkout. The confirmation should show one Route 800 at €69. Next open ‘Bike bags’, select Frame 2 and Stuur 5, and choose ‘Compare bags’. Can you tell which bag mounts on the handlebars and how many litres it holds?

**Open question.** Does the cyclist need to compare three models at once? The retailer will decide after the first review.

## From brief to spec

Give the completed brief to [spec-driven-development](../skills/spec-driven-development.md). See [Start a new project](new-project.md) for a prompt and an example of the resulting draft.
