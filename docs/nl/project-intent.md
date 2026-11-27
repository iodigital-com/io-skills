# iO Skills — projectdoel en werkwijze

Nederlands · [English](../en/project-intent.md)

iO Skills is de gedeelde skillsbibliotheek van iO. Heb je al ervaring met spec-driven development, dan kun je vanaf de startpagina meteen naar de catalogus. Daar vind je een bekende skill terug op naam, of ontdek je welke skill past bij wat je wilt doen. Op de skillpagina zie je wat ze oplevert en hoe je ze met `npx skills add` in je project installeert.

Wie de aanpak voor het eerst toepast, kan vanaf dezelfde startpagina een tutorial volgen voor een nieuw of bestaand project.

## Beginnen met een klantbriefing

Bij een nieuw project beschrijft de klantbriefing voor wie het team bouwt, wat die persoon wil bereiken en waaraan de klant een geslaagde uitkomst herkent. Die briefing vormt de basis voor de eerste conceptspec. Bij een bestaand project helpen de huidige applicatie en analyses in Confluence om de bestaande afspraken te achterhalen. De actuele spec krijgt een plaats in Git, bij de code of in een tweede repository. In dat laatste geval stemt het team de Git-werkwijze af zodat duidelijk is welke versie van de spec bij welke implementatie hoort.

## De spec toetsen met een prototype

Tijdens een prototypereview beoordelen de klant en het projectteam samen de uitwerking van een functionaliteit. Laat de klant een taak uitvoeren. Komt het resultaat overeen met wat er in de spec staat? Waar aarzelt de klant, en welke afspraak moet het team verduidelijken?

Geef [design-spec](skills/design-spec.md) de taak die de gebruiker wil uitvoeren. Voor een productvergelijking kun je de volgende vraag stellen.

> Schets een scherm waarop je twee producten kunt vergelijken. Maak voor elke eigenschap duidelijk welke waarde bij welk product hoort, zodat je de verschillen snel ziet. Werk de indeling uit voor telefoon en desktop.

Wil je de interactie bespreken, dan kun je met [prototype-shell](skills/prototype-shell.md) een scenario delen en de bijbehorende spec ernaast openen. Dit is een optionele reviewomgeving die iO Skills aanbiedt. Zodra het verwachte gedrag duidelijk is, kun je ook rechtstreeks vanuit de spec bouwen en testen.

Gebruik voor het prototype het designsysteem van het project. Ontbreekt dat, werk dan de componenten en stijlen uit die de gekozen schermen nodig hebben. De indeling van een React Native-app kun je bijvoorbeeld bespreken met een webprototype in React. Wil je zien of de klant de nieuwe functie terugvindt in de bestaande navigatie? Voeg dan een prototype van die functie toe aan de app en laat de klant beginnen op het vertrouwde startscherm.

Met de optionele skill [functional-analysis](skills/functional-analysis.md) beschrijf je voor de klant hoe een functie werkt. Voor het vergelijkingsscherm kun je bijvoorbeeld deze opdracht geven.

> Leg uit hoe een gebruiker twee items selecteert om ze te vergelijken. Welke eigenschappen toont het scherm naast elkaar? Wat verandert er als de gebruiker één item vervangt? Voeg bij die laatste stap een link toe die het prototype opent met de nieuwe selectie.

## Bouwen en bijsturen tot aan de release

De twee loops overlappen. Terwijl het team het ene onderdeel specificeert, kan het een ander onderdeel al bouwen, testen en opleveren. Verandert een afspraak door feedback op een demo of door een inzicht tijdens development, dan werkt het team **eerst de spec** bij. Daarna past het de betrokken implementatie, het prototype en de functionele uitleg aan. Het team spreekt met de klant af welke beslissingen het zelfstandig kan nemen.

## Skills en documentatie delen

De eerste 26 skills zijn gebaseerd op de [agent-skills van Addy Osmani](https://skills.addy.ie/). iO onderhoudt de versies die je vanuit deze bibliotheek installeert en gebruikt ze ook voor het werk aan dit project.

Een collega draagt een skill bij via een pull request met een klantneutraal voorbeeld. Iemand uit een ander team probeert de skill met die uitleg uit vóór opname in de bibliotheek. Klantnamen blijven uit alle projectinhoud.

Alle inhoud van de website verschijnt in het Nederlands en het Engels, van navigatie en meldingen tot tutorials, voorbeelden en skillbeschrijvingen. Frans en Zweeds zijn mogelijke latere uitbreidingen.
