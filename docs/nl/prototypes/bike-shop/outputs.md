# Voorbeeldresultaten voor de fietsenwinkel

Deze werkstukken horen bij de nieuwe vergelijkingsmodule. De kinderfietsenwinkel verkoopt koplampen, fietstassen en fietssloten aan gezinnen. Beide tutorials werken aan dezelfde feature. De ene begint met een zelfstandige projectmap voor het prototype, de andere met de bestaande webshop.

## Briefing van de winkelier {#briefing}

**Vraag van de winkelier.** “Mijn klanten hebben de juiste afdeling al gevonden. Kunnen ze op hun telefoon twee modellen naast elkaar zetten en hun keuze direct bestellen?”

**Wat bepaalt de keuze?** Een ouder die in de winter met haar kind naar school fietst, wil voor de koplamp weten hoeveel licht ze krijgt en hoelang de lamp op volle sterkte meegaat. Bij een fietstas wil ze weten of de brooddoos en de regenjas erin passen en waar ze de tas kan vastmaken. Bij een slot tellen het type en de lengte. In iedere vergelijking ziet ze ook de prijs en de voorraad.

**Eerste versie.** Kies twee verschillende modellen uit dezelfde categorie. Kies **Add to basket** onder het gewenste model. Of klanten later drie modellen tegelijk willen vergelijken, blijft open. [Begin in de fietsenwinkel](prototype:store?role=cyclist&state=ready&record=categories).

## Huidige kooproute en beschikbare gegevens {#context}

De bestaande webshop uit de briefing verkoopt via categorie, productpagina, winkelmand en checkout. De nieuwe vergelijker biedt een extra route naar dezelfde mand.

- **Productgegevens.** In deze demo groepeert `shop/catalog.js` negen modellen op categorie. Elk heeft een ID en prijs. Die van Frame 2 zijn `frame-2` en €29. Voor deze tas staan er ook 2 liter en framebevestiging. Bij koplampen gebruikt de vergelijker lumen en uren op de hoogste stand, bij sloten het type en de lengte in cm.
- **Bestelactie.** De bestelknop in `comparisonPage()` in `shop/shop.js` geeft de product-ID van haar eigen kolom door. De winkelmand gebruikt die om naam en prijs te tonen. [Open de mand met Frame 2](prototype:basket?role=cyclist&state=ready&record=frame-2).
- **Te verifiëren bij de winkel.** Controleer de oorspronkelijke bestelactie op de productpagina in de applicatie van de winkel. Laat de winkelier de eenheden en meetstand van de brongegevens bevestigen voordat producten in dezelfde rij verschijnen.

## Reviewbesluit over de brandduur {#review-decision}

**Waarneming.** Na het scrollen leest een winkelmedewerker bij de Route 800 ‘3 hours’. De toelichting over de meetstand boven de tabel is buiten beeld.

**Besluit en acceptatie.** Vermeld de meetstand bij elke waarde. Op telefoonbreedte staat er ‘2 hours on the highest setting’ in de cel van de Stad 400 en ‘3 hours on the highest setting’ in die van de Route 800. Dit besluit geldt voor de rij brandduur bij koplampen. [Bekijk de twee cellen op telefoonformaat](prototype:compare?role=cyclist&state=ready&record=lights&format=phone).

## Bouwplan voor de zelfstandige proefversie {#plan-new}

1. **Eerste demonstratie.** Open **Front lights** vanuit de winkel. Met één vinkje blijft **Compare lights** uitgeschakeld. Met twee opent de vergelijking van precies de gekozen lampen. De test koppelt elke prijs, lichtsterkte en brandduur aan de juiste kolom. [Open de koplampen](prototype:catalog?role=cyclist&state=ready&record=lights).
2. **De module hergebruiken.** Gebruik dezelfde selectie in **Bike bags** en **Bike locks**. Controleer bij Frame 2 en Stuur 5 de inhoud en bevestiging, en bij twee sloten het type en de lengte. [Open de vergelijking van twee tassen](prototype:compare?role=cyclist&state=ready&record=frame-2~stuur-5).
3. **Een keuze bestellen.** Sluit beide knoppen aan op de mand. Volg één Route 800 van €69 door testcheckout en bevestiging. Herhaal de aankoop vanuit een andere categorie.

## Bouwplan voor de bestaande webshop {#plan-existing}

1. **Selectie op de bestaande categoriekaart.** Zoek de categoriekaart, het productmodel en de link naar de productpagina. Voeg een selectievakje en een teller toe. Na twee keuzes kan de fietser één vinkje weghalen om een ander model te kiezen. Controleer ook de oorspronkelijke route via de productpagina.
2. **Een vergelijking per categorie.** Laat de categorie de tabelrijen bepalen en de gekozen producten de kolomwaarden leveren. Frame 2 en Stuur 5 moeten bijvoorbeeld 2 L en 5 L tonen. [Bekijk de fietstassen](prototype:compare?role=cyclist&state=ready&record=frame-2~stuur-5).
3. **De bestaande bestelactie aansluiten.** Geef per kolom dezelfde product-ID door die de bestelactie van de productpagina verwacht. Controleer bij beide ingangen welk model en aantal de bestaande checkout bevestigt.

## Gedragstest van de vergelijking {#test-compare}

De test kiest twee producten uit dezelfde categorie. Bij twee vinkjes wordt de vergelijkknop actief en zijn de overige vakjes uitgeschakeld. Zodra één vinkje weg is, kan de fietser elk ander model in de lijst kiezen.

| Getest paar | Linkerkolom | Rechterkolom |
| --- | --- | --- |
| Stad 400 en Route 800 | €39, 400 lumens, 2 hours on the highest setting | €69, 800 lumens, 3 hours on the highest setting |
| Frame 2 en Stuur 5 | €29, 2 L, Frame | €49, 5 L, Handlebar |
| Kabel 90 en Ketting 110 | €19, Cable, 90 cm | €49, Chain, 110 cm |

De eerste koplampentest verwachtte ‘2 hours on the highest setting’ en vond ‘2 hours’. Na de aanpassing staat de meetstand in de waardecel. De huidige browsertest controleert voor alle negen paren de prijs en de twee categorie-eigenschappen per product. [Probeer twee tassen](prototype:compare?role=cyclist&state=ready&record=frame-2~stuur-5).

Start de site met `pnpm dev`. Voer `pnpm run test:shop` uit in `packages/prototype-shell/checks`. Gebruik `SHOP_BASE_URL=http://127.0.0.1:4173` wanneer je de preview op poort 4173 test.

## Gedragstest van één testbestelling {#test-order}

**Actie.** Kies ‘Add to basket’ onder Route 800. De toegankelijke naam bevat ook het model, zodat de test precies de bedoelde knop activeert.

**Uitkomst.** De winkelmand bevat één Route 800. Het artikel en het totaal kosten €69, afhalen is gratis. Dezelfde controle slaagt bij de testcheckout en op de bevestiging. De andere lamp uit de vergelijking komt op geen van de drie schermen in de bestelling. [Bekijk de mand](prototype:basket?role=cyclist&state=ready&record=route-800) of [open de bevestiging](prototype:confirmation?role=cyclist&state=ready&record=route-800).

## Tests van de nieuwe en bestaande kooproutes {#test-existing}

- **Nieuwe vergelijking.** Vanuit beide tutorialversies zijn de negen paren in dezelfde Engelstalige webshop doorlopen. Bij elk paar is een bestelling geplaatst. Zo zijn alle negen producten van mand tot bevestiging gecontroleerd. [Bekijk de bevestiging voor Stuur 5](prototype:confirmation?role=cyclist&state=ready&record=stuur-5).
- **Categorie wisselen.** Kies één koplamp, ga terug naar de categorieën en open **Bike bags**. De teller toont **0 of 2 selected**. Kies Frame 2 en Tour 18, leg Tour 18 in de mand en verwijder haar. Vanuit de lege mand kom je terug bij de fietstassen en kun je opnieuw kiezen. [Open de lege mand](prototype:basket?role=cyclist&state=empty&record=none-bags).
- **Bestaande route.** Voeg in de eigen webshop één Stad 400 vanaf de productpagina toe. Voor die afzonderlijke regressiecontrole verwacht je één Stad 400 voor €39 op de bevestiging. De uitkomst moet in de testomgeving van die webshop worden vastgesteld.

## Codereview van de koopafspraak {#review}

- **Selectie en gegevens.** In `shop/catalog.js` bevat elk geldig vergelijkingspaar twee producten uit één categorie. In `shop/shop.js` gebruikt `comparisonPage()` de kenmerken van die categorie en de ID van elk gekozen model. Bij de tassen blijven 2 L onder Frame 2 en 5 L onder Stuur 5 staan. [Bekijk de kolommen](prototype:compare?role=cyclist&state=ready&record=frame-2~stuur-5).
- **Van knop naar bestelling.** Elke bestelknop geeft de ID van haar eigen kolom mee. Dezelfde ID voedt de artikelregel en het totaal in mand, checkout en bevestiging. Een bezoeker die Frame 2 kiest, ziet één tas van €29. [Open de testcheckout](prototype:checkout?role=cyclist&state=ready&record=frame-2).

## Overdracht van de lokale oefenversie {#handover}

**Geteste versie.** De lokale demo bevat zes schermen en negen producten in `public/prototypes/bike-shop/`. Start de documentatiesite met `pnpm dev` en open de demo vanuit de tutorial. [Begin in de winkel](prototype:store?role=cyclist&state=ready&record=categories).

**Resultaat.** Alle twintig Chrome-browsertests zijn geslaagd. Vanuit de Nederlandse tutorial op telefoonformaat en de Engelse op desktopformaat zijn de negen paren, een bestelling per model en het wisselen van categorie en leegmaken van de mand gecontroleerd. De winkelier kan de drie categorieën nu met fictieve bestelgegevens demonstreren.

## Releasebeoordeling voor de bestaande winkel {#release}

**Klaar voor de winkelreview.** De winkelier kan vanuit elke categorie twee modellen vergelijken en één ervan bestellen. De bevestiging toont bijvoorbeeld één Tour 18 van €79 of één Beugel 23 van €59. [Bekijk de bevestiging voor Beugel 23](prototype:confirmation?role=cyclist&state=ready&record=beugel-23).

**Open voor publicatie.** Leg in de implementatie-PR van de bestaande webshop de geteste build, de specversie en de uitkomst van de aankoop via de oorspronkelijke productpagina vast. De winkelier kan na de review beslissen over een derde vergelijkingskolom.
