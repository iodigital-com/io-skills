# Briefingsjabloon

Gebruik dit sjabloon in het eerste gesprek over een project of wijziging. Eén concrete situatie geeft het team genoeg houvast om de eerste versie van de spec te bespreken.

## Kopieer de briefing

Vul de vragen in met de woorden van de klant. Noteer bij een open beslissing wie er antwoord op kan geven.

```markdown
# Briefing — [onderwerp]

## Voor wie
Wie probeert iets te doen? Wie speelt nog een rol?

## Huidige situatie
Wat gebeurde er de laatste keer? Waar liep iemand vast?

## Gewenste uitkomst
Wat moet die persoon straks zelfstandig kunnen?

## Eerste afspraak
Welk gedrag heeft de klant al bevestigd?

## Zo toetsen we het
Welke situatie openen we? Wat moet zichtbaar zijn of gebeuren?

## Open vragen
Wat moeten we nog weten? Wie kan hierover beslissen?
```

## Een ingevuld voorbeeld

In dit voorbeeld verkoopt een kinderfietsenwinkel via een bestaande webshop fietsaccessoires aan gezinnen. In de winkel legt een verkoper twee modellen naast elkaar. Online moet de fietser tussen productpagina’s wisselen. De klant wil een vergelijker aan de webshop toevoegen.

- **Voor wie.** Een ouder kiest op haar telefoon samen met haar kind een koplamp. In de winter fietsen ze voor zonsopkomst naar school. Later zoeken ze een tas aan het stuur voor een brooddoos en een regenjas.
- **Gewenste uitkomst.** Ze opent een categorie, kiest zelf twee verschillende modellen uit die categorie en ziet de prijs en de eigenschappen die haar helpen kiezen. Dezelfde keuze werkt ook wanneer het assortiment groeit. Vanuit de vergelijking kan ze één artikel bestellen via de bestaande mand.
- **Eerste afspraak.** Voor koplampen zijn lichtsterkte en brandduur op de hoogste stand relevant, voor fietstassen inhoud en bevestigingsplaats, voor fietssloten type en lengte.

De klant levert deze negen artikelen als voorbeeldgegevens voor de review.

| Categorie | Model | Prijs | Eigenschappen |
| --- | --- | --- | --- |
| Koplampen | Stad 400 | €39 | 400 lumen, 2 uur op de hoogste stand |
| Koplampen | Route 800 | €69 | 800 lumen, 3 uur op de hoogste stand |
| Koplampen | Trail 1200 | €99 | 1200 lumen, 4 uur op de hoogste stand |
| Fietstassen | Frame 2 | €29 | 2 L, frame |
| Fietstassen | Stuur 5 | €49 | 5 L, stuur |
| Fietstassen | Tour 18 | €79 | 18 L, bagagedrager |
| Fietssloten | Kabel 90 | €19 | Kabelslot, 90 cm |
| Fietssloten | Ketting 110 | €49 | Kettingslot, 110 cm |
| Fietssloten | Beugel 23 | €59 | Beugelslot, 23 cm |

**Zo toetsen we het.** Bestel vanuit de vergelijking één van de twee koplampen. Controleer of de bevestiging het gekozen model, het aantal en de juiste prijs toont. Kies je in de demo de Route 800, dan verwacht je één exemplaar van €69. Vergelijk daarna een frametas en een stuurtas. Kun je voor elke tas aflezen waar je ze bevestigt en hoeveel liter erin past?

**Open vraag.** Heeft de fietser een vergelijking van drie modellen tegelijk nodig? De klant beslist hierover na de eerste review.

## Van briefing naar spec

Geef de ingevulde briefing mee als invoer voor [spec-driven-development](../skills/spec-driven-development.md). In [Beginnen met een nieuw project](new-project.md) zie je de bijbehorende voorbeeldvraag en een mogelijke eerste spec.
