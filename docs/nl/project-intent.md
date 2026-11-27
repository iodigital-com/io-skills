# iO Skills — projectdoel en werkwijze

Nederlands · [English](../en/project-intent.md)

iO Skills is de gedeelde skillsbibliotheek van iO. Heb je al ervaring met spec-driven development, dan kun je vanaf de startpagina meteen naar de catalogus. Daar vind je een bekende skill terug op naam, of ontdek je welke skill past bij wat je wilt doen. Op de skillpagina zie je wat ze oplevert en hoe je ze met `npx skills add` in je project installeert.

Wie de aanpak voor het eerst toepast, kan vanaf dezelfde startpagina een tutorial volgen voor een nieuw of bestaand project. De iO-bibliotheek bouwt voort op de [agent-skills van Addy Osmani](https://skills.addy.ie/).

## Beginnen met een klantbriefing

Bij een nieuw project beschrijft de klantbriefing voor wie het team bouwt, wat die persoon wil bereiken en waaraan de klant een geslaagde uitkomst herkent. Die briefing vormt de basis voor de eerste conceptspec. Bij een bestaand project helpen de huidige applicatie en analyses in Confluence om de bestaande afspraken te achterhalen. De actuele spec krijgt een plaats in Git, bij de code of in een tweede repository. In dat laatste geval stemt het team de Git-werkwijze af zodat duidelijk is welke versie van de spec bij welke implementatie hoort.

## De spec toetsen met een prototype

In de eerste loop scherpt het team de spec aan tot een onderdeel duidelijk genoeg is om te bouwen. De design-spec beschrijft de schermopbouw en de onderlinge positie van elementen met eenvoudige tekstuele wireframes. De prototypeskill werkt die uit tot een gedetailleerd, klikbaar prototype. De klant kan elke afgesproken toestand zelf oproepen, van een leeg scherm tot een foutmelding en het herstel erna. Waar de ervaring per persona verschilt, kan de klant elk perspectief doorlopen.

Gebruik `design-spec` bijvoorbeeld met de vraag “Schets hoe een fietser de Stad 400 en de Route 800 op een telefoon en op een breed scherm vergelijkt. Toon voor elke koplamp de prijs, lichtopbrengst en brandduur op de hoogste stand. Laat zien welke knop de gekozen lamp in de winkelmand legt.” De skill levert een Markdown-document met wireframes en controlepunten die je samen kunt nalopen.

Het prototype gebruikt het designsysteem van het project. Als dat ontbreekt, bouwt de skill er een op met de componenten die de schermen nodig hebben. De prototype-technologie sluit waar praktisch aan op de uiteindelijke frontend. Zo kan een team voor een React Native-app een webprototype in React maken.

Met de optionele skill `functional-analysis` schrijf je een functionele analyse (FA) in de taal van de klant of werk je een bestaande FA bij. Vraag bijvoorbeeld “Leg voor de winkelier uit hoe de fietser de brandduur van twee lampen vergelijkt en de Route 800 kiest. Zet de link naar de vergelijking naast die stap.” Is die weergave beschikbaar, dan opent de link het prototype op telefoonformaat met beide modellen al geselecteerd. Ontbreekt die weergave, dan beschrijft de FA de afgesproken werking en geeft ze aan wat de klant al kan uitproberen.

## Bouwen en bijsturen tot aan de release

De twee loops overlappen. Terwijl het team het ene onderdeel specificeert, kan het een ander onderdeel al bouwen, testen en opleveren. Verandert een afspraak door feedback op een demo of door een inzicht tijdens development, dan werkt het team **eerst de spec** bij. Daarna past het de betrokken implementatie, het prototype en de functionele uitleg aan. Het team spreekt met de klant af welke beslissingen het zelfstandig kan nemen.

## Skills en documentatie delen

Een collega draagt een skill bij via een pull request met een klantneutraal voorbeeld. Iemand uit een ander team probeert de skill met die uitleg uit vóór opname in de bibliotheek. Klantnamen blijven uit alle projectinhoud.

Alle inhoud van de website verschijnt in het Nederlands en het Engels, van navigatie en meldingen tot tutorials, voorbeelden en skillbeschrijvingen. Frans en Zweeds zijn mogelijke latere uitbreidingen.
