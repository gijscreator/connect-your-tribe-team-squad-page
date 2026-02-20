# Squad Page
Ontwerp en maak samen met je team een website met NodeJS, Express, JSON en Liquid


# Winkel Bioscoop

We als team happy moeten een website maken met een api, liquid en directus.

## beschrijving:

De website ziet er uit als een film winkelpagina waar je beide squads kan zien ook kan je filteren.

als je op een persoon drukt ga je naar een pagina waar je wat weetjes over de persoon.

je kan personen toevoegen aan een winkelkar om ze te (kopen).

Als je in de footer naar de bioscoop gaat dan krijg een een film scherm met de mensen van de squad in stoelen.

Als je op een stoel druk krijg je een andere persoon te zien

Je kan onder de persoon in het film scherm een review achter laten over de favoriete film van die persoon.

## kenmerken:
liquid:
filters
https://github.com/gijscreator/connect-your-tribe-team-squad-page/blob/72f4fdc88d2f83f7d21b0dff9779f331d008ac44/views/bioscoop.liquid#L14

for loops
https://github.com/gijscreator/connect-your-tribe-team-squad-page/blob/72f4fdc88d2f83f7d21b0dff9779f331d008ac44/views/bioscoop.liquid#L59-L62

if
https://github.com/gijscreator/connect-your-tribe-team-squad-page/blob/72f4fdc88d2f83f7d21b0dff9779f331d008ac44/views/search.liquid#L8-L10


directus:
routing met get en post:
https://github.com/gijscreator/connect-your-tribe-team-squad-page/blob/72f4fdc88d2f83f7d21b0dff9779f331d008ac44/server.js#L103-L119
https://github.com/gijscreator/connect-your-tribe-team-squad-page/blob/72f4fdc88d2f83f7d21b0dff9779f331d008ac44/server.js#L128-L140

css:
clamp
https://github.com/gijscreator/connect-your-tribe-team-squad-page/blob/72f4fdc88d2f83f7d21b0dff9779f331d008ac44/public/bioscoopstyle.css#L20

js:
array
https://github.com/gijscreator/connect-your-tribe-team-squad-page/blob/72f4fdc88d2f83f7d21b0dff9779f331d008ac44/server.js#L93


## installatie:

om dit project te instaleren heb je node nodig.

clone de reposetory van github ga naar en open de folder in je code editor. als je een console in de editor heb open die dan. als je die niet hebt open je console en ga naar de map toe van het project.

typ dan `npm install` om alle packages te downloaden en dan `npm start` ga dan naar `http://localhost:8000/` en je hebt het project geopent. 
