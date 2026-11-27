# Gedrag vastleggen in een test

Begin bij het resultaat dat je wilt kunnen aantonen wanneer je een fout herstelt of een bedrijfsregel wijzigt. Schrijf eerst een test die de ontbrekende werking zichtbaar maakt.

## Voorbeeldvraag

> Een uitnodiging is 24 uur geldig. Schrijf eerst een test met een vaste klok voor een uitnodiging die gisteren om 10.00 uur is verstuurd. Om 09.59 uur werkt ze nog, om 10.00 uur is ze verlopen. Laat de test falen, pas de geldigheidscontrole aan en voer hem opnieuw uit.

## Wat krijg je?

Een test die aantoonbaar faalt voor de wijziging en slaagt na de kleinste passende correctie. Daarna kun je de code vereenvoudigen en de tests opnieuw uitvoeren.
