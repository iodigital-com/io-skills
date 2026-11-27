# Voeg een productvergelijker toe aan een bestaande webshop

Zo voeg je een feature toe aan een bestaande website: zoek de geldende afspraken in code en spec, beschrijf wat erbij komt en toets het ontwerp vóór je de bestaande winkelmand aansluit. Elke stap linkt naar de skill die je dan nodig hebt.

Wobble Wheel is in dit voorbeeld een kinderfietsenwinkel die koplampen, fietstassen en fietssloten verkoopt. De webshop heeft voor elk artikel een productpagina, een werkende winkelmand en een checkout. Wie nu de details van twee producten wil afwegen, moet tussen twee pagina’s wisselen. De klant wil dat een bezoeker in elke categorie twee verschillende modellen naar keuze kan vergelijken, ook als het assortiment groeit.

Een ouder fietst met haar kind naar school voordat het goed licht is. Samen kiezen ze een koplamp. De Stad 400 kost €39 en geeft 400 lumen gedurende twee uur op de hoogste stand. De Route 800 kost €69 en geeft 800 lumen gedurende drie uur op die stand. Ze wil weten wat ze voor €30 extra krijgt. Voor de brooddoos en de regenjas maakt ze een andere afweging. Waar past de tas op de fiets en hoeveel kan erin?

De [ingevulde briefing](briefing.md) bevat de negen voorbeeldproducten en de gegevens die per categorie worden vergeleken.

In deze demo kun je een bestelling proberen in de iO-shell. In je eigen project kun je het afgesproken gedrag ook rechtstreeks testen. Controleer bijvoorbeeld of het model dat de bezoeker kiest in de winkelmand verschijnt. Wil je de aankoop samen met de klant doorlopen, dan kun je daarvoor ook een testversie van de bestaande webshop gebruiken.

[Begin een testbestelling in de webshop](/prototypes/bike-shop/index.html?lang=nl&screen=store&role=cyclist&state=ready&record=categories&format=phone&scenario=buy-light&tutorial=existing-project). Open ‘Front lights’, selecteer twee koplampen en vergelijk hun brandduur op de hoogste stand. Bestel één lamp met de voorbeeldgegevens en kijk of het gekozen model op de bevestiging staat. De webshop, de reviewomgeving, de productspec en de designspec in deze demo zijn Engelstalig. De functionele uitleg en de voorbeeldresultaten lees je hier in het Nederlands.

**Meedoen in je eigen project.** [Installeer de skills](install.md) in de bestaande webshoprepository. Geef de agent de startinstructie, catalogusgegevens en de huidige afspraken uit Git of Confluence. Met alleen de demonstratie kun je de briefing volgen, het ontwerp beoordelen en de koopflow in de shell doorlopen.

Heb je een werkende app zonder spec of prototype? Gebruik de [startprompt voor een bestaande app](../skills/prototype-shell.md#je-hebt-een-app-zonder-spec-of-prototype) om één huidige gebruikersactie vast te leggen en je eigen schermen in de prototype-UI te openen.

## Breng de huidige kooproute in kaart

Gebruik [context-engineering](../skills/context-engineering.md) voordat je bepaalt waar de vergelijker moet komen. Je wilt weten welke productgegevens de webshop al heeft en hoe een productpagina iets aan de mand toevoegt.

```prompt
Gebruik context-engineering. Volg in onze webshop een bestaande aankoop vanaf de winkel via categorie en productpagina tot mand en testbevestiging. Zoek de huidige actie ‘Add to basket’ en haar test. Waar staan product-ID en prijs? Welke velden heeft de catalogus voor de brandduur van koplampen, inhoud en bevestiging van tassen, type en lengte van sloten? Vergelijk wat je vindt met onze Git-spec of Confluence-analyse. Geef per ontbrekend gegeven aan wie het kan bevestigen.
```

[Bekijk voorbeeldoutput · huidige kooproute en beschikbare productgegevens](/prototypes/bike-shop/index.html?lang=nl&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=context)

Noteer de build en de geraadpleegde documentversie. Vind je voor een koplamp alleen een veld “up to 8 hours”, vraag de klant op welke stand die tijd is gemeten. In de briefing betreffen alle tijden de hoogste stand.

## Achterhaal welke keuze de fietser wil maken

Gebruik [interview-me](../skills/interview-me.md) als “producten vergelijken” nog de hele briefing is. Laat de klant de vraag beantwoorden vanuit een situatie aan de toonbank.

```prompt
Gebruik interview-me. Ik speel de klant die de webshop laat uitbreiden. Een ouder zoekt met haar kind een koplamp voor donkere schoolochtenden en een tas voor de brooddoos. Vraag me één ding tegelijk. Hoe begint ze in beide gevallen, welke eigenschappen helpen haar kiezen en wat wil ze na het vergelijken doen? Bespreek ook hoe ze een slot kiest. Vat de gewenste eerste versie en open vragen samen.
```

[Bekijk voorbeeldoutput · briefing voor de productvergelijker](/prototypes/bike-shop/index.html?lang=nl&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=briefing)

De klant bevestigt dat prijs voor elk product telt. Bij lampen vergelijkt de fietser ook lumen en brandduur op de hoogste stand, bij tassen inhoud en bevestigingsplaats, bij sloten type en lengte. In de eerste versie kiest de fietser twee verschillende modellen uit dezelfde categorie. Drie tegelijk blijft een open vraag.

## Leg de nieuwe afspraak vast in de projectspec

Gebruik [spec-driven-development](../skills/spec-driven-development.md) zodra de klant het vergelijken van twee modellen goedkeurt. De bestaande analyse beschrijft hoe je vanaf een productpagina bestelt. Leg in de spec vast dat je straks ook vanuit de vergelijking kunt bestellen en dat beide routes hetzelfde artikel in de mand moeten leggen.

```prompt
Gebruik spec-driven-development. Leg de goedgekeurde feature ‘Compare two different models from the same category’ vast in onze Engelstalige Git-spec. Gebruik de negen voorbeeldproducten uit de briefing. Beschrijf de selectie bij nul, één en twee modellen, het weghalen van een selectie en de rijen per categorie. Laat een acceptatievoorbeeld vanaf ‘Front lights’ uitkomen op 1× Route 800 van €69 op de bevestiging. Laat een tweede voorbeeld Frame 2 en Stuur 5 vergelijken op prijs, liters en bevestiging. Controleer ook de bestaande aankoop via een productpagina. Verwijs naar de eerdere analyse en noteer de open vraag over drie tegelijk.
```

[Bekijk voorbeeldoutput · productspec met een voorbeeldbestelling vanuit de vergelijking](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=spec)

Controleer de spec met de [productgegevens uit de briefing](briefing.md). Controleer of de keuze uit de vergelijking op de bestelbevestiging terugkomt met het juiste aantal en de juiste prijs. Voor de koplamp met drie uur brandduur verwacht je **1 × Route 800 à €69**. Staat de spec in een aparte repository, link dan de afgesproken commit bij de implementatietaak.

## Ontwerp de selectie en vergelijking voor een telefoon

Gebruik [design-spec](../skills/design-spec.md) als duidelijk is *wat* de fietser moet kunnen en je met de klant wilt bespreken *waar* de fietser moet tikken.

```prompt
Gebruik design-spec met de goedgekeurde spec en de bestaande categoriekaart. Schrijf de designspec in het Engels. Schets op telefoonbreedte de categorie zonder selectie, met één gekozen model en met twee verschillende modellen geselecteerd. Toon hoe je een keuze vervangt. Schets de vergelijking eerst voor de koplampen, daarna voor twee tassen. Houd de prijs, de twee categorie-eigenschappen en de bestelknop bij hetzelfde product. Hergebruik onze bestaande bestelknop en wijs aan welke product-ID ze doorgeeft.
```

[Bekijk voorbeeldoutput · telefoonschets met een bestelknop per model](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=design)

Vraag een collega in de telefoonschets de bestelknop aan te wijzen voor de koplamp die het langst meegaat op de hoogste stand. Laat de collega die knop in de demo gebruiken. In de mand moet één exemplaar van die lamp staan, de Route 800 van €69.

## Bespreek de feature in het klikbare prototype

Vraag de klant welke lamp die voor de vroege schoolrit zou kiezen en waarom. Laat de klant die keuze zelf in de mand leggen. Gebruik [prototype-shell](../skills/prototype-shell.md) wanneer je dit met de componenten van je eigen project wilt uitproberen.

```prompt
Gebruik prototype-shell om de nieuwe vergelijker in onze projectkopie uit te werken. Begin op de winkelpagina en laat een bezoeker in elk van de drie categorieën twee producten kiezen. Toon hun eigen kenmerken en sluit de bestelknoppen aan op de bestaande mand en lokale testcheckout. Geef me een deelbare telefoonweergave met Stad 400 en Route 800 en laat me vanuit de winkel een ander paar proberen.
```

[Bekijk voorbeeldoutput · vergelijk de brandduur van twee koplampen op een telefoon](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project)

Kies ‘Copy situation link’ bij de koplampvergelijking. Open de gekopieerde link en controleer of dezelfde twee lampen naast elkaar staan. [Kies vervolgens twee fietstassen](/prototypes/bike-shop/index.html?lang=nl&screen=catalog&role=cyclist&state=ready&record=bags&format=phone&scenario=buy-light&tutorial=existing-project). Selecteer de frametas van 2 liter (Frame 2) en de stuurtas van 5 liter (Stuur 5). Open de vergelijking en kies ‘Add to basket’ onder de stuurtas. Controleer of de mand één Stuur 5 van €49 bevat.

## Maak de uitleg voor de klant

Gebruik [functional-analysis](../skills/functional-analysis.md) als de klant een korte functionele uitleg bij het prototype wil. Geef de agent de goedgekeurde spec en de zojuist gecontroleerde situatielink. Je kunt ook meteen doorgaan naar de bouwplanning.

```prompt
Gebruik functional-analysis. Vul de bestaande uitleg van onze webshop aan voor een winkelmedewerker die de nieuwe vergelijker wil demonstreren. Beschrijf hoe een bezoeker vanuit ‘Front lights’ twee producten selecteert, hun brandduur vergelijkt en één model kiest. Zet de meegegeven situatielink bij de vergelijking en geef een concreet herkenningspunt in de mand. Gebruik de knopteksten uit het prototype.
```

[Bekijk voorbeeldoutput · functionele uitleg voor de klant](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=fa)

Een collega moet vanuit de uitleg de vergelijking kunnen openen en in de winkelmand kunnen herkennen welke van de twee lampen hij heeft gekozen.

## Plan de uitbreiding rond de bestaande componenten

Gebruik [planning-and-task-breakdown](../skills/planning-and-task-breakdown.md) als de klant de eerste versie heeft kunnen beoordelen. De uitbreiding raakt een bestaand scherm én introduceert een nieuw scherm. Plan ze zo dat je tussendoor iets kunt demonstreren.

```prompt
Gebruik planning-and-task-breakdown. Maak uit de Git-spec en de bestaande componenten twee demonstreerbare bouwstappen. Begin met selectie vanuit een categorie en vergelijking met de eigen rijen. Gebruik koplampen en fietstassen bij de eerste demo. Sluit in de tweede stap de bestelknop aan op de bestaande mand en testcheckout. Noem per stap de bestanden, een zichtbare uitkomst en een bestaande kooproute die we opnieuw moeten proberen.
```

[Bekijk voorbeeldoutput · bouwplan voor de vergelijker en bestaande mand](/prototypes/bike-shop/index.html?lang=nl&screen=catalog&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=plan-existing)

Laat bij de eerste demonstratie de klant zelf twee modellen kiezen. Vergelijk eerst twee koplampen en daarna twee fietstassen. Bij de lampen moet de klant lichtsterkte en brandduur kunnen aflezen, bij de tassen inhoud en bevestiging. Voor deze demonstratie kan de koppeling met de mand nog wachten.

## Bouw de vergelijking en sluit de mand aan

Gebruik [incremental-implementation](../skills/incremental-implementation.md) en [test-driven-development](../skills/test-driven-development.md) zodra het plan is goedgekeurd.

```prompt
Gebruik incremental-implementation en test-driven-development. Begin met een falende test voor twee gekozen lampen en voor Frame 2 tegenover Stuur 5. Controleer dat een willekeurig paar binnen de categorie de juiste gegevens toont. Bouw daarna de koppeling met de mand. Toets 1× Route 800 van €69 en, vanuit een lege mand, 1× Stuur 5 van €49 tot op de testbevestiging. Draai ook de bestaande tests voor toevoegen vanaf een productpagina.
```

[Bekijk voorbeeldoutput · tests van de nieuwe en bestaande kooproutes](/prototypes/bike-shop/index.html?lang=nl&screen=basket&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=test-existing)

Vink één van de twee producten uit en selecteer een ander model. Open de vergelijking en controleer of dat nieuwe model in de tabel staat. Plaats met de voorbeeldgegevens een testbestelling en controleer of model, aantal en prijs van mand tot bevestiging kloppen.

## Beoordeel de feature voor de release

Gebruik [code-review-and-quality](../skills/code-review-and-quality.md) en [shipping-and-launch](../skills/shipping-and-launch.md) wanneer de vergelijking en de koppeling met de mand werken.

```prompt
Gebruik code-review-and-quality met de afgesproken Git-spec. Controleer selectie en vervanging van twee modellen, de eigenschappen per categorie en beide bestelknoppen. Herhaal de aankoop vanaf een bestaande productpagina. Gebruik shipping-and-launch om voor de klant de geteste build, de doorlopen scenario’s, de resultaten en de open beslissingen vast te leggen.
```

[Bekijk voorbeeldoutput · releasebeoordeling voor de nieuwe vergelijker](/prototypes/bike-shop/index.html?lang=nl&screen=confirmation&role=cyclist&state=ready&record=route-800&format=phone&scenario=buy-light&tutorial=existing-project&doc=output&example=release)

Laat de klant vergelijken en bestellen in de releasekandidaat. Leg de uitkomst vast bij de implementatie-PR. Bij aparte repository’s link je de implementatie-PR aan de vaste specversie en verwijs je vanuit de spec-PR terug naar de implementatie.
