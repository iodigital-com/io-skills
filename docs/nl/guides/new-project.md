# Beginnen met een nieuw project

Leer hoe je een briefing omzet in een toetsbare spec, de schermen met de klant bespreekt en de vergelijker in kleine stappen bouwt. Bij elke stap vind je de skill, een prompt en een resultaat dat je zelf kunt controleren.

In deze tutorial werk je aan Wobble Wheel, een fictieve kinderfietsenwinkel. De webshop verkoopt al koplampen, fietstassen en fietssloten voor de rit naar school. De winkelier vraagt een nieuwe functie. Binnen elke categorie wil een fietser twee verschillende modellen naar keuze naast elkaar leggen en er één bestellen. Je start in een lege projectmap en maakt een lokale proefversie waarmee de winkel deze feature kan beoordelen.

| Categorie | Waarop wil de fietser vergelijken? | Voorbeeld van een keuze |
| --- | --- | --- |
| Koplampen | Prijs, lichtsterkte en brandduur op de hoogste stand | Wat krijgen we voor de vroege schoolrit als we €30 meer uitgeven aan de Route 800? |
| Fietstassen | Prijs, inhoud in liter en bevestigingsplaats | Hoeveel ruimte hebben we voor een brooddoos en regenjas in de Frame 2 of de Stuur 5? |
| Fietssloten | Prijs, type en lengte | Heb ik liever de Kabel 90 of de Ketting 110 om mijn fiets vast te zetten? |

De [ingevulde briefing](briefing.md) bevat alle negen voorbeeldproducten. Je volgt hier één aankoop van begin tot einde en gebruikt de tassen om te toetsen of de vergelijker meeverandert met de categorie. Bestellen gebeurt lokaal met voorbeeldgegevens.

[Probeer de webshop in de prototypeshell](/prototypes/bike-shop/index.html?lang=nl&screen=store&role=cyclist&state=ready&record=categories&format=phone&scenario=buy-light). Kies op de winkelpagina ‘Front lights’, selecteer Stad 400 en Route 800, kies ‘Compare lights’ en plaats een testbestelling met één lamp. De webshop, de reviewomgeving, de productspec en de designspec in deze demo zijn Engelstalig. De functionele uitleg en de voorbeeldresultaten lees je hier in het Nederlands.

Begin in een lege projectmap. Met [toegang tot de iO Skills-repository](install.md) kun je dit commando uitvoeren. Kies je agent als daarom wordt gevraagd en start in die map een sessie. Neem de prompts één voor één over. Werk je aan een eigen project, vervang dan de winkel, producten en beslissingen door één herkenbare klantreis uit je briefing.

```sh
npx skills add iodigital-com/io-skills --skill '*'
```

## Ontdek wat de fietser wil weten

De winkel vraagt om “producten vergelijken”. Om gericht te kunnen ontwerpen, wil je eerst weten welke keuze de fietser probeert te maken. Gebruik [interview-me](../skills/interview-me.md) tijdens het gesprek met de winkel.

```prompt
Gebruik interview-me. Ik speel de winkelier. Onze webshop verkoopt koplampen, fietstassen en fietssloten. Ouders willen op hun telefoon met hun kind twee modellen vergelijken. Begin met één vraag over een concrete aankoop, bijvoorbeeld een koplamp voor de fietsrit naar school op een donkere winterochtend. Vraag daarna wat bij een tas of slot de doorslag geeft. Vat samen welke keuzes voor elke categorie hetzelfde zijn en welke gegevens we per categorie nodig hebben.
```

[Bekijk voorbeeldoutput · briefing voor de productvergelijker](/prototypes/bike-shop/index.html?lang=nl&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=briefing)

Speel de winkelier met de [ingevulde briefing](briefing.md) bij de hand. Licht bijvoorbeeld toe waarom een fietser bij een koplamp naar de hoogste stand vraagt en bij een tas naar de bevestigingsplaats. Bewaar het bevestigde doel, de negen voorbeeldproducten en de open vraag over drie modellen tegelijk in `briefing.md`.

## Schrijf het acceptatievoorbeeld vóór het eerste scherm

Zodra de winkel de klantreis bevestigt, gebruik je [spec-driven-development](../skills/spec-driven-development.md). De spec geeft de winkel en het team één voorbeeld waarmee ze straks de volledige flow kunnen doorlopen.

```prompt
Gebruik spec-driven-development. Lees briefing.md en schrijf de productspec in het Engels in spec/product-comparison.md voor de bestaande fietsenwinkel. Begin bij de keuze van een categorie. Beschrijf hoe de fietser twee verschillende modellen uit dezelfde categorie kiest, hun prijs en de twee categorie-eigenschappen vergelijkt en één model bestelt. Neem de productgegevens over. Schrijf acceptatievoorbeelden voor Stad 400 tegenover Route 800 en voor Frame 2 tegenover Stuur 5. Volg 1× Route 800 van €69 tot de lokale testbevestiging. Noteer drie modellen tegelijk als open vraag.
```

[Bekijk voorbeeldoutput · productspec met acceptatievoorbeelden](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=spec)

Kun je vooraf zeggen wat op de bevestiging hoort te staan? Als de fietser in de vergelijking de Route 800 kiest, verwacht je één Route 800 van €69 in de winkelmand én op de bevestiging. De Stad 400 was alleen geselecteerd om te vergelijken.

## Bepaal wat op een telefoon naast elkaar moet staan

De koopflow ligt vast. Nu moet de winkel kunnen beoordelen of een fietser op een smal scherm de juiste waarden met elkaar vergelijkt. Geef de spec aan [design-spec](../skills/design-spec.md).

```prompt
Gebruik design-spec met spec/product-comparison.md. Maak in spec/product-comparison.design.md een Engelstalige schets van de winkel, categorie, vergelijking en mand op telefoon en desktop. Toon met de Stad 400 en Route 800 hoe de prijs, lumen, brandduur op de hoogste stand en bestelknop bij het juiste model blijven. Schets hetzelfde scherm voor Frame 2 en Stuur 5 met inhoud en bevestigingsplaats. Markeer welke onderdelen voor beide categorieën gelijk zijn.
```

[Bekijk voorbeeldoutput · designspec van het vergelijkingsscherm](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=design)

Bekijk de telefoonschets en zoek dezelfde gegevens op het scherm. Vraag een collega welke lamp €30 meer kost, hoeveel langer die op de hoogste stand brandt en met welke knop je precies die lamp kiest. Als iemand de modellen of standen door elkaar haalt, pas je de schets aan.

## Laat de winkel de koopflow uitproberen

Met [prototype-shell](../skills/prototype-shell.md) maak je een projectkopie van de meegeleverde starter. De starter bevat een ander voorbeeld. De volgende prompt laat je agent in die kopie de schermen en voorbeeldgegevens van de fietsenwinkel maken.

```prompt
Gebruik prototype-shell. Maak een projectkopie in prototype-review/ met de negen voorbeeldproducten uit briefing.md. Bouw volgens de spec en het ontwerp de winkel met drie categorieën, de selectie van twee modellen binnen één categorie en de vergelijking met de bijbehorende rijen. Laat elke bestelknop één gekozen artikel toevoegen. Verbind de mand met een lokale testcheckout met voorbeeldgegevens. Geef me een startlink naar de winkel en een deelbare telefoonweergave voor Stad 400 naast Route 800.
```

[Bekijk voorbeeldoutput · klikbare vergelijking van beide lampen](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light)

De voorbeeldoutput opent de twee koplampen. [Open daarna de fietstassen](/prototypes/bike-shop/index.html?lang=nl&screen=catalog&role=cyclist&state=ready&record=bags&format=phone&scenario=buy-light), selecteer Frame 2 en Stuur 5 en vergelijk zelf. Vind je 2 L bij het frame en 5 L bij het stuur? Kies ‘Copy situation link’ bij die vergelijking en open de link in een ander venster. Controleer of beide gekozen tassen daar terugkomen.

## Leg de beslissing uit de review vast

Stel dat een winkelmedewerker tijdens de review “3 hours” leest en vraagt bij welke stand dat hoort. De winkel wil dat de meetstand ook na het scrollen bij elke waarde leesbaar blijft. Leg deze verfijning eerst vast met [spec-driven-development](../skills/spec-driven-development.md).

```prompt
Gebruik spec-driven-development om deze bevestigde beslissing in spec/product-comparison.md te verwerken. Op een telefoon staat de meetstand direct bij de brandduur van elke lamp, bijvoorbeeld ‘3 hours on the highest setting’. Voeg een acceptatievoorbeeld voor beide modellen toe. Werk vervolgens met design-spec en prototype-shell de schets en de mobiele vergelijking in de projectkopie bij.
```

[Bekijk voorbeeldoutput · afspraak over de brandduur op de hoogste stand](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=review-decision)

Open de vergelijking en lees eerst de waarde bij de Stad 400 en daarna die bij de Route 800. Wil de winkel de ervaring achteraf aan collega's laten zien? Kopieer de gecontroleerde link naar deze vergelijking en vervang `<reviewlink>` in deze optionele prompt voor [functional-analysis](../skills/functional-analysis.md).

```prompt
Gebruik functional-analysis met spec/product-comparison.md. Schrijf in spec/FA.md een korte Nederlandse uitleg voor de winkelmedewerker die de koopflow wil demonstreren. Gebruik de zichtbare labels. Zet <reviewlink> naast de stap waar de fietser de brandduur vergelijkt. Open de link in een nieuwe sessie om te controleren dat de juiste vergelijking verschijnt.
```

[Bekijk voorbeeldoutput · functionele uitleg voor de winkelier](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=fa)

## Kies een eerste onderdeel dat je kunt demonstreren

Zodra de winkel het ontwerp heeft goedgekeurd, gebruik je [planning-and-task-breakdown](../skills/planning-and-task-breakdown.md). Maak de stappen klein genoeg om de categorieafhankelijke rijen vroeg te kunnen bespreken.

```prompt
Gebruik planning-and-task-breakdown met spec/product-comparison.md. Plan een lokale browserapp in app/. Begin bij de winkel en bouw eerst selectie en vergelijking voor de koplampen. Laat de tweede demonstratie met fietstassen en sloten bewijzen dat de categorie bepaalt welke rijen verschijnen. Plan daarna de winkelmand en lokale testcheckout. Geef per taak een handeling, een zichtbare uitkomst en een test.
```

[Bekijk voorbeeldoutput · bouwplan van selectie tot testbestelling](/prototypes/bike-shop/index.html?lang=nl&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=plan-new)

De eerste taak is klein genoeg als je de twee lampen vanuit de categorie kunt selecteren en op de telefoon kunt vergelijken zonder dat je al een checkout nodig hebt.

## Bouw de vergelijking en daarna de aankoop

Gebruik [incremental-implementation](../skills/incremental-implementation.md) na goedkeuring van het plan. Met [test-driven-development](../skills/test-driven-development.md) maak je eerst duidelijk welk gedrag in de werkende app nog ontbreekt.

```prompt
Gebruik incremental-implementation en test-driven-development in app/. Begin met een falende gedragstest. Kies in de winkel ‘Front lights’, selecteer Stad 400 en Route 800 en toets hun prijs, lumen en brandduur op de hoogste stand aan de briefing. Voeg daarna een test toe voor Frame 2 en Stuur 5 met prijs, inhoud en bevestigingsplaats. Implementeer de benodigde bouwstap, draai de tests opnieuw en geef me het testcommando.
```

[Bekijk voorbeeldoutput · gedragstest voor de vergelijkingsrijen](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=output&example=test-compare)

Controleer beide schermen op telefoonbreedte met de [productgegevens uit de briefing](briefing.md). Kies vervolgens een ander paar uit één categorie. Verschijnen de gegevens van precies die twee producten?

```prompt
Gebruik test-driven-development voor de volgende taak. Laat een test in de vergelijking bij de Route 800 op ‘Add to basket’ tikken en controleren dat alleen 1× Route 800 van €69 in de winkelmand staat. Rond de testcheckout af met lokale voorbeeldgegevens en controleer hetzelfde artikel, aantal en bedrag op de bevestiging. Laat eerst de fout zien, bouw dan de interactie en draai ook de vergelijkingstests opnieuw. Houd de checkout volledig lokaal.
```

[Bekijk voorbeeldoutput · test voor één Route 800 van €69](/prototypes/bike-shop/index.html?lang=nl&screen=confirmation&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&doc=output&example=test-order)

## Controleer de wijziging tegen de koopafspraak

Wanneer de tests slagen, gebruik je [code-review-and-quality](../skills/code-review-and-quality.md). Laat de reviewer de gegevens volgen op de plekken waar de fietser van scherm naar scherm gaat.

```prompt
Gebruik code-review-and-quality op de wijziging in app/. Vergelijk de implementatie en tests met spec/product-comparison.md. Controleer de rijen voor koplampen, tassen en sloten, de product-ID achter elke bestelknop en de bron van het bedrag op de bevestiging. Geef per bevinding de plek in de code, het gevolg voor de fietser en een manier om het te reproduceren.
```

[Bekijk voorbeeldoutput · codereview van vergelijking, mand en bevestiging](/prototypes/bike-shop/index.html?lang=nl&screen=basket&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&doc=output&example=review)

Los bevindingen over de afgesproken werking op en draai de betrokken tests opnieuw. Komt de vraag naar drie modellen tegelijk terug, leg dan eerst het besluit van de winkel vast in de spec. Werk bij een nieuwe afspraak ook de betrokken schermen, tests en eventuele FA bij.

## Beslis of de oefenversie klaar is voor overdracht

Gebruik [shipping-and-launch](../skills/shipping-and-launch.md) wanneer je iemand anders de geteste versie wilt laten beoordelen.

```prompt
Gebruik shipping-and-launch voor de lokale overdracht. Loop de koopflow op een telefoon door vanaf de winkel. Toets de bevestiging van één Route 800 van €69 en vergelijk daarna twee fietstassen en twee sloten met hun eigen eigenschappen. Koppel elk acceptatiepunt aan een waarneming of test, noteer versie en startinstructies en geef aan welke beslissing nog bij de winkel ligt.
```

[Bekijk voorbeeldoutput · overdracht van de geteste koopflow](/prototypes/bike-shop/index.html?lang=nl&screen=confirmation&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&doc=output&example=handover)

Een collega kan de versie nu zelf openen, beide modellen vergelijken en met voorbeeldgegevens eindigen op een bevestiging van 1× Route 800 voor €69.
