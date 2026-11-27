# Projectafspraken

Vermeld nergens in dit project namen van klanten. Gebruik in skills, specs, tutorials en voorbeelden generieke aanduidingen zoals ‘de klant’ of ‘een projectteam’.

Publiceer de inhoud van de iO Skills-website in het Nederlands en het Engels. Dit geldt voor navigatie, interfaceberichten, tutorials, skillbeschrijvingen en voorbeelden op de site. Bewaar overeenkomstige contentpagina’s onder hetzelfde pad binnen `docs/nl/` en `docs/en/`. Werk bij inhoudelijke wijzigingen beide websiteversies bij en laat ze naar elkaar verwijzen.

Laat lezers in de documentatie zelf hun AI-agent kiezen. Gebruik in installatievoorbeelden het projectcommando zonder een specifieke agent voor te selecteren.

Schrijf interne specs voor het bouwen van iO Skills in het Engels onder `spec/`. Buiten de website bepaalt het project de taal van skills, sjablonen en gegenereerde klantdocumenten.

De fietsenwinkeldemo heeft één Engelstalige webshop, reviewomgeving, productspec en designspec. De tutorials, functionele uitleg en toelichting bij de promptresultaten volgen de gekozen documentatietaal.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
