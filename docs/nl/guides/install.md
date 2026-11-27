# De skills installeren

Installeer één skill of de hele iO-bibliotheek in je project. Je hebt Node.js met `npx` en een lokale projectmap nodig.

## Toegang tot GitHub

De [iO Skills-repository](https://github.com/iodigital-com/io-skills) is privé. Je hebt een GitHub-account met leestoegang nodig. Zorg dat Git in je terminal dat account gebruikt.

## Kies wat je installeert

Open een terminal in je projectmap. Met het volgende commando kies je interactief welke skills en welke agent je wilt gebruiken.

```sh
npx skills add iodigital-com/io-skills
```

Geef de naam mee om één skill te installeren. Dit voorbeeld selecteert [design-spec](../skills/design-spec.md). Kies je agent zodra het installatieprogramma daarom vraagt en installeer de skill op projectniveau.

```sh
npx skills add iodigital-com/io-skills --skill design-spec
```

Wil je alle skills gebruiken, installeer dan de volledige collectie in één keer.

```sh
npx skills add iodigital-com/io-skills --skill '*'
```

## Controleer de installatie

Voer dit commando uit in dezelfde projectmap. Zoek in de lijst naar de skill die je koos, bijvoorbeeld `design-spec`.

```sh
npx skills list
```

Start in die projectmap een nieuwe sessie met de gekozen agent. Heb je `design-spec` geïnstalleerd, probeer dan deze opdracht.

```prompt
Gebruik design-spec om een takenlijst op een telefoon te schetsen. De taak ‘Verslag nalezen’ staat open en ‘Agenda delen’ is afgerond. Laat zien hoe iemand alleen de open taken bekijkt en daarna terugkeert naar de volledige lijst.
```

Kun je in de schets aanwijzen welk filter actief is, welke taak dan zichtbaar is en hoe je beide taken weer toont?
