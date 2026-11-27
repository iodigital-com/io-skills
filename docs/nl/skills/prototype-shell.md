# Een prototype bespreken

Met de afzonderlijke skill `prototype-shell` voeg je de optionele reviewomgeving van iO toe aan je project. De klant en het projectteam kunnen daarin een functie samen uitproberen en beoordelen of die werkt zoals afgesproken. Open een taak in je eigen prototype, probeer die vanuit verschillende rollen en lees de bijbehorende spec naast het scherm. Deel bij een wijzigingsvoorstel de link naar precies die situatie.

Bij [spec-driven werken](../workflow.md) kies je per afspraak hoe je die toetst. Voor een interactie met de camera kun je bijvoorbeeld een prototype op maat maken in de mobiele app. Voor een prijsberekening kan een test met twee voorbeeldbedragen al volstaan.

## De skill klaarzetten

Open een terminal in de map van je app. Begin je helemaal opnieuw, maak dan een lege projectmap en open daar je terminal. Installeer de skill op projectniveau met het volgende commando en kies je eigen agent. In de [installatiegids](../guides/install.md) lees je hoe je de installatie controleert.

```sh
npx skills add iodigital-com/io-skills --skill prototype-shell
```

Start je agent in diezelfde map. Kies hieronder de prompt die bij je project past en plak hem in de chat van je agent.

## Je hebt een app zonder spec of prototype

De huidige app is je vertrekpunt. Heb je al een scherm in gedachten, voeg dan de naam of route toe aan de prompt. Anders kiest de agent een kleine taak die je vandaag al in de app kunt uitvoeren.

```prompt
Gebruik prototype-shell in dit project. We hebben een werkende app zonder spec of prototype. Bekijk hoe de app lokaal start en zoek in de routes, schermen en beschikbare tests één taak die een gebruiker nu kan uitvoeren. Leg in een korte Markdown-spec vast waar die taak begint, wat de gebruiker doet en welk resultaat zichtbaar is. Noteer wat nog bevestiging vraagt.

Maak met de geïnstalleerde skill een projectkopie van de reviewshell. Sluit de bestaande schermen en stijlen aan via een lokale preview met vaste voorbeeldgegevens. Registreer het scenario en de preview-URL’s in project.js. Laat de shell de situatielink bijwerken als ik de taak uitvoer. Koppel de korte spec aan het scherm, zodat ik die tijdens de review kan lezen.

Start de app en de shell lokaal. Doorloop de taak, kopieer de situatielink en open die in een verse browsersessie. Controleer dat hetzelfde scherm, dezelfde rol, toestand en voorbeeldgegevens terugkomen. Geef me het startcommando, de link naar het overzicht en de geteste situatielink.
```

## Je begint in een lege projectmap

Bij deze prompt zet de agent ook het project op. Je kunt je idee meteen meegeven, bijvoorbeeld “Een teamlid meldt een kapot toestel en ziet daarna het meldingsnummer.” Bouw je iets nieuws met een andere app als referentie, geef dan een pad dat je agent kan lezen of een schermafbeelding mee.

```prompt
Gebruik prototype-shell om in deze lege map een nieuw project op te zetten. We beginnen zonder app, spec of prototype. Achterhaal wie het prototype gaat gebruiken, welke eerste taak die persoon wil afronden en of we al een techniek hebben gekozen. Vraag me wat je daarover nog mist. Gebruik een meegegeven referentie-app voor de termen en schermpatronen.

Schrijf op basis van mijn antwoorden een korte Markdown-spec met één concreet voorbeeld van een geslaagde taak. Zet het project op met de afgesproken techniek. Heb ik geen voorkeur, gebruik dan de statische starter van de skill. Maak een projectkopie van de reviewshell, bouw de schermen voor mijn taak met lokale voorbeeldgegevens en neem mijn scenario op in project.js. Koppel de spec aan het scherm.

Start het project lokaal en voer de taak uit. Open de gekopieerde situatielink in een verse browsersessie en controleer of ik hetzelfde resultaat zie. Geef me het startcommando, de link naar het overzicht en de geteste situatielink.
```

## Wat krijg je?

De skill bevat het werkende voorbeeld en instructies om een scherm uit je eigen stack aan te sluiten. Je kunt tijdens de review van rol of schermformaat wisselen en dezelfde passage in de functionele uitleg blijven lezen. Open een gekopieerde link in een verse browsersessie om te controleren wat je collega ziet.

Op je telefoon vult het prototype het scherm. Tik op **Prototype** om de spec te lezen of de toestand te wijzigen. Sluit het paneel om verder te testen. Op desktop kun je de scheidingslijn naar links slepen om de documentatie meer leesruimte te geven. Met het toetsenbord bereik je de scheidingslijn via Tab en pas je de breedte aan met de pijltjestoetsen.

## Probeer het voorbeeld

Wil je eerst de meegeleverde demo verkennen? Voer de commando’s hieronder uit in je projectmap. Kies voor `./prototype-review` een mapnaam die nog vrij is. Gebruikt je agent een ander pad dan `.agents/skills/prototype-shell`, vul dan de skillmap in die het installatieprogramma toont.

```sh
node .agents/skills/prototype-shell/scripts/create.mjs ./prototype-review
python3 -m http.server 4319 --bind 127.0.0.1 --directory ./prototype-review
```

De meegeleverde starter gebruikt materiaalaanvragen als voorbeeld. In de [fietsenwinkeltutorial](../guides/new-project.md) zie je hoe je een projectkopie aanpast voor een andere functie.

Open `http://127.0.0.1:4319/` en kies **Improve a returned request**. Kies **Reviewer** en **Phone**. Kopieer de link met **Copy situation link** en open die in een privévenster. Zie je als beoordelaar dezelfde aanvraag met de vraag om het ontbrekende lokaalnummer aan te vullen? Met **Open explanation for this screen** lees je de uitleg bij dat scenario.
