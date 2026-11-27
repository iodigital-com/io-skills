# Werken vanuit de spec

Bij spec-driven werken leggen de klant en het team in de spec vast welk gedrag ze verwachten en aan welk voorbeeld ze dat kunnen toetsen. Zodra één afspraak duidelijk is, kan het team die bouwen en testen. Tijdens de review, de bouw, het testen of de oplevering kan blijken dat een afspraak ontbreekt of anders moet. Leg het bijgestelde gedrag eerst vast in de spec in Git.

## Welke skill heb je nu nodig?

| Waar sta je? | Begin met | Wat neem je mee naar de volgende stap? |
| --- | --- | --- |
| De klant heeft een idee. Het gewenste resultaat is nog onduidelijk. | [interview-me](skills/interview-me.md) | Een bevestigde gebruikersvraag en de open beslissingen. |
| Het doel is duidelijk. Het team wil weten wat de feature precies moet doen. | [spec-driven-development](skills/spec-driven-development.md) | Een spec in Git met gedrag en een toetsbaar acceptatievoorbeeld. |
| Je wilt zien of een gebruiker de afgesproken taak kan uitvoeren. | [design-spec](skills/design-spec.md) voor een schets, [prototype-shell](skills/prototype-shell.md) als je de iO-reviewomgeving wilt gebruiken | Een schets of een klikbaar scenario om samen te bespreken. |
| Eén onderdeel van de spec is duidelijk genoeg om te bouwen. | [planning-and-task-breakdown](skills/planning-and-task-breakdown.md), daarna [incremental-implementation](skills/incremental-implementation.md) | Kleine taken en een eerste werkend onderdeel. |
| Je wilt bewijzen dat de implementatie de afspraak volgt. | [test-driven-development](skills/test-driven-development.md) en [browser-testing-with-devtools](skills/browser-testing-with-devtools.md) | Een gedragstest en een gecontroleerde gebruikersactie in de browser. |
| De wijziging werkt. Het team moet beslissen of ze klaar is voor oplevering. | [code-review-and-quality](skills/code-review-and-quality.md), daarna [shipping-and-launch](skills/shipping-and-launch.md) | Afgehandelde reviewbevindingen en een onderbouwd releasebesluit. |

## Briefen

Vraag de klant wat iemand vandaag probeert te doen, waar die persoon vastloopt en wat er na de wijziging moet lukken. Gebruik [interview-me](skills/interview-me.md) om één concrete situatie uit te vragen. Leg in het [briefingsjabloon](guides/briefing.md) vast voor wie je bouwt, welk resultaat telt en welke beslissingen nog openstaan.

## Specificeren

Geef [spec-driven-development](skills/spec-driven-development.md) de bevestigde briefing. Beschrijf het gewenste gedrag, wat buiten de wijziging valt en één voorbeeld waaraan de klant kan zien dat de functionaliteit werkt. Gebruik bij een bestaand project [context-engineering](skills/context-engineering.md) om de betrokken code, afspraken en tests te vinden.

Stel dat een gebruiker een formulier later wil afmaken. Een toetsbare afspraak is dan “Als ik een concept opsla en morgen opnieuw open, staan mijn antwoorden er nog.” De klant kan aangeven of dit de bedoeling is. Het team weet wat het straks moet testen.

## Prototype toetsen

Laat de klant in het prototype een taak uitvoeren. Het projectteam kijkt mee of de functionaliteit werkt zoals afgesproken. Kan de klant bijvoorbeeld na het opslaan het concept zelfstandig terugvinden en verder invullen? Bespreek waar de uitwerking vragen oproept en leg nieuwe afspraken vast in de spec.

Kies de vorm die past bij de vraag. Voor de indeling van een scherm kan een schets met [design-spec](skills/design-spec.md) al volstaan. Wil je samen dezelfde situatie doorlopen en de spec erbij pakken, dan biedt iO Skills de optionele reviewomgeving [prototype-shell](skills/prototype-shell.md). Een prototype op maat kan beter passen als je de interactie in de eigen app wilt ervaren. Is het gedrag helder, dan kun je meteen bouwen en testen.

Wil de klant de werking achteraf kunnen nalezen? Geef [functional-analysis](skills/functional-analysis.md) de afgesproken spec en een geteste link naar de situatie die je samen hebt besproken.

## Bouwen

Geef [planning-and-task-breakdown](skills/planning-and-task-breakdown.md) de afgesproken spec en vraag om taken met een zichtbaar resultaat. Gebruik [incremental-implementation](skills/incremental-implementation.md) om telkens één taak te bouwen en te demonstreren.

Voor het formulier kan de eerste taak zijn dat iemand een concept kan opslaan en opnieuw openen. Laat de klant die handelingen uitproberen voordat je bijvoorbeeld ook het bewerken van een opgeslagen concept uitwerkt.

## Testen

Geef [test-driven-development](skills/test-driven-development.md) het acceptatievoorbeeld vóór de implementatie van de taak. Laat eerst de test het ontbrekende gedrag aantonen en laat hem na de wijziging opnieuw draaien. Gebruik [browser-testing-with-devtools](skills/browser-testing-with-devtools.md) zodra het scherm werkt: herhaal de gebruikershandeling op telefoonbreedte en controleer de zichtbare uitkomst.

Controleer bij het formulier wat de gebruiker ziet na het opnieuw openen. Zijn alle ingevulde antwoorden bewaard? Spreek ook af wat de gebruiker moet zien als het opslaan mislukt en toets dat apart.

## Opleveren

Geef [code-review-and-quality](skills/code-review-and-quality.md) de wijziging, de afgesproken spec en de testresultaten. Laat de reviewer afwijkingen koppelen aan het effect voor de gebruiker. Zijn de bevindingen afgehandeld, gebruik dan [shipping-and-launch](skills/shipping-and-launch.md) voor de releasecontrole: welke versie is getest, hoe controleert het team de uitrol en hoe kan het terug als dat nodig is?

**Terug naar de spec.** Stel dat tijdens het testen blijkt dat twee open tabbladen elkaars wijzigingen aan een concept overschrijven. Bespreek met de klant wat er in die situatie moet gebeuren. Spreek je af dat de gebruiker een waarschuwing krijgt, werk dan met [spec-driven-development](skills/spec-driven-development.md) de spec en het acceptatievoorbeeld bij. Pas daarna de uitwerking aan en test opnieuw met twee tabbladen.

## Uitgewerkt voorbeeld

In de tutorials volg je één functionaliteit vanaf de eerste vraag tot de oplevering. Kies [een nieuw project](guides/new-project.md) of [een wijziging aan een bestaand project](guides/existing-project.md). In de fietsenwinkeldemo kun je de [designspec](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light&doc=design) naast het [werkende prototype](/prototypes/bike-shop/index.html?lang=nl&screen=compare&role=cyclist&state=ready&record=lights&format=phone&scenario=buy-light) bekijken.
