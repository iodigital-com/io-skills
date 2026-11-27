# Werken vanuit de spec

Gebruik de spec in Git om vast te leggen welk gedrag de klant en het team verwachten. In de eerste loop maak je één onderdeel duidelijk met een briefing, een spec en een prototype. In de tweede loop bouw, test en review je dat onderdeel. Een nieuwe afspraak gaat eerst terug naar de spec. Zo kan het team al bouwen terwijl een andere vraag nog openstaat.

## Welke skill heb je nu nodig?

| Waar sta je? | Begin met | Wat neem je mee naar de volgende stap? |
| --- | --- | --- |
| De klant heeft een idee. Het gewenste resultaat is nog onduidelijk. | [interview-me](skills/interview-me.md) | Een bevestigde gebruikersvraag en de open beslissingen. |
| Het doel is duidelijk. Het team wil weten wat de feature precies moet doen. | [spec-driven-development](skills/spec-driven-development.md) | Een spec in Git met gedrag en een toetsbaar acceptatievoorbeeld. |
| Het gedrag is afgesproken. Je wilt de schermen en interactie bespreken. | [design-spec](skills/design-spec.md), daarna [prototype-shell](skills/prototype-shell.md) | Een schermschets en een klikbare situatie die de klant zelf kan doorlopen. |
| Eén onderdeel van de spec is duidelijk genoeg om te bouwen. | [planning-and-task-breakdown](skills/planning-and-task-breakdown.md), daarna [incremental-implementation](skills/incremental-implementation.md) | Kleine taken en een eerste werkend onderdeel. |
| Je wilt bewijzen dat de implementatie de afspraak volgt. | [test-driven-development](skills/test-driven-development.md) en [browser-testing-with-devtools](skills/browser-testing-with-devtools.md) | Een gedragstest en een gecontroleerde gebruikersactie in de browser. |
| De wijziging werkt. Het team moet beslissen of ze klaar is voor oplevering. | [code-review-and-quality](skills/code-review-and-quality.md), daarna [shipping-and-launch](skills/shipping-and-launch.md) | Afgehandelde reviewbevindingen en een onderbouwd releasebesluit. |

**Voorbeeld in de tutorials.** Een kinderfietsenwinkel wil haar klanten koplampen, fietstassen en fietssloten laten vergelijken. Een ouder kiest samen met haar kind in één categorie twee verschillende modellen en beslist welk artikel ze bestelt. Bij een koplamp voor de vroege schoolrit vergelijkt ze de prijs, lichtsterkte en brandduur. Bij een tas wil ze weten hoeveel erin past en waar die op haar fiets komt.

## Briefen

Begin met één echte beslissing die een gebruiker moet nemen. Geef [interview-me](skills/interview-me.md) de eerste klantvraag en laat de skill één vraag tegelijk stellen. Schrijf de bevestigde antwoorden en open punten in het [briefingsjabloon](guides/briefing.md). Heeft een team al een briefing, bespreek dan alleen de ontbrekende beslissingen.

Bij de fietsenwinkel betekent “producten vergelijken” bijvoorbeeld dat de fietser wil weten of de duurdere lamp op volle sterkte langer meegaat. Ga verder zodra de winkelier kan uitleggen wat de bezoeker moet kunnen beslissen.

## Specificeren

Geef [spec-driven-development](skills/spec-driven-development.md) de bevestigde briefing. Vraag om het beoogde gedrag, wat buiten deze wijziging valt, open vragen en een acceptatievoorbeeld. Bij een **bestaande** site gebruik je eerst [context-engineering](skills/context-engineering.md) om de huidige componenten, spec en tests te vinden. Leg daarna vast wat de feature toevoegt aan de bestaande flow.

Een toetsbare afspraak is: “Kiest de bezoeker in de vergelijking de Route 800, dan bevat de winkelmand één Route 800 van €69.” De spec is bruikbaar zodra iemand buiten het gesprek daaruit kan afleiden wat die moet testen.

## Prototype toetsen

Gebruik [design-spec](skills/design-spec.md) zodra je weet wat het scherm moet doen. Geef de skill de spec en de relevante toestanden en vraag een tekstwireframe voor telefoon en desktop. [Open de designspec van het vergelijkingsscherm](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=design). Zoek in de Engelstalige telefoonschets de rij ‘Runtime on the highest setting’ en de waarde voor de Route 800. Kun je op het scherm ook aflezen dat de drie uur voor de hoogste stand gelden?

Gebruik daarna [prototype-shell](skills/prototype-shell.md) om de schermen en voorbeeldgegevens klikbaar te maken. Vraag de klant één taak uit te voeren en kijk mee waar die twijfelt.

Wil de klant de werking achteraf kunnen nalezen? Geef [functional-analysis](skills/functional-analysis.md) de afgesproken spec en een geteste link naar de precieze situatie. [Probeer de productvergelijking in de shell](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light).

## Bouwen

Geef [planning-and-task-breakdown](skills/planning-and-task-breakdown.md) de afgesproken spec en vraag om taken met een zichtbaar resultaat. Gebruik [incremental-implementation](skills/incremental-implementation.md) om telkens één taak te bouwen en te demonstreren.

Een eerste taak kan eindigen bij de vergelijking van Stad 400 en Route 800. Gebruik fietstassen in de volgende demo om te zien of de rijen met de categorie meeveranderen. Daarna sluit je de keuze aan op de bestaande winkelmand.

## Testen

Geef [test-driven-development](skills/test-driven-development.md) het acceptatievoorbeeld vóór de implementatie van de taak. Laat eerst de test het ontbrekende gedrag aantonen en laat hem na de wijziging opnieuw draaien. Gebruik [browser-testing-with-devtools](skills/browser-testing-with-devtools.md) zodra het scherm werkt: herhaal de gebruikershandeling op telefoonbreedte en controleer de zichtbare uitkomst.

Test bijvoorbeeld twee aankopen met telkens een lege mand. Kies de Route 800 vanuit een koplampvergelijking en controleer één lamp van €69 op de bevestiging. Vergelijk daarna Frame 2 met Stuur 5. De stuurtas moet als 5 L op het stuur herkenbaar zijn, en als één Stuur 5 van €49 op de bevestiging verschijnen.

## Opleveren

Geef [code-review-and-quality](skills/code-review-and-quality.md) de wijziging, de afgesproken spec en de testresultaten. Laat de reviewer afwijkingen koppelen aan het effect voor de gebruiker. Zijn de bevindingen afgehandeld, gebruik dan [shipping-and-launch](skills/shipping-and-launch.md) voor de releasecontrole: welke versie is getest, hoe controleert het team de uitrol en hoe kan het terug als dat nodig is?

**Verandert de afspraak tijdens de review?** Ga terug naar [spec-driven-development](skills/spec-driven-development.md). Werk eerst het acceptatievoorbeeld bij, daarna het betrokken prototype, de implementatie en de tests. Je kunt deze werkwijze zelf volgen bij [een nieuw project vanuit de briefing](guides/new-project.md) of [een nieuwe feature in een bestaande webshop](guides/existing-project.md).
