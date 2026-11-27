# Een prototype bespreken

Geef de klant en het projectteam een werkend voorbeeld om samen te verkennen. De shell opent met een overzicht per functionaliteit. Een reviewer kan precies het besproken scherm delen, inclusief persona, toestand, voorbeeldrecord en previewformaat.

## Voorbeeldvraag

> Maak een projectkopie voor onze fietswebshop. Laat me in de winkel eerst een categorie en dan twee modellen kiezen. Deel de telefoonweergave van Frame 2 tegenover Stuur 5, zodat de winkelier kan controleren waar elke tas past.

## Wat krijg je?

De skill bevat het werkende voorbeeld en instructies om een scherm uit je eigen stack aan te sluiten. Wissel tijdens de review van persona of schermformaat terwijl de FA op dezelfde alinea blijft staan. Open een gekopieerde link in een verse browsersessie om te controleren wat je collega ziet.

## Probeer het voorbeeld

Installeer `prototype-shell` in je project volgens de [installatiegids](../guides/install.md). Voer de commando’s hieronder uit in je projectmap om het voorbeeld aan te maken en lokaal te starten. Gebruikt je agent een ander pad dan `.agents/skills/prototype-shell`, vul dan de skillmap in die het installatieprogramma toont.

```sh
node .agents/skills/prototype-shell/scripts/create.mjs ./prototype-review
python3 -m http.server 4319 --bind 127.0.0.1 --directory ./prototype-review
```

De meegeleverde starter heeft een eigen voorbeeld rond materiaalaanvragen. In de [webshoptutorial](../guides/new-project.md) pas je een projectkopie aan voor de vergelijker van de fietsenwinkel.

Open `http://127.0.0.1:4319/` en kies **Improve a returned request**. Schakel over naar **Reviewer** en **Phone** en open de gekopieerde link in een privévenster. Je ziet dezelfde retourreden voor aanvraag 104. Met **Open explanation for this screen** lees je de uitleg bij dat scenario.
