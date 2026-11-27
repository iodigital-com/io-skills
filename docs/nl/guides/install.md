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
Gebruik design-spec om de vergelijking van twee koplampen op een telefoon te schetsen. De Stad 400 kost €39 en brandt 2 uur op de hoogste stand bij 400 lumen. De Route 800 kost €69 en brandt 3 uur op de hoogste stand bij 800 lumen. Laat zien welke bestelactie bij welke lamp hoort.
```

Kun je op het wireframe de drie eigenschappen per lamp vinden en aanwijzen hoe de fietser alleen de Route 800 in de winkelmand legt?
