# Readme PWA Biljart Scores
Partim: Mobile Web Apps - 
Student: Jonas Anseel

## Live demo
https://biljart.app

## Over de pwa
Voor dit project heb ik een progressive web app gemaakt om de scores tijdens het biljarten bij te houden. De app is volledig offline te gebruiken en heeft de volgende functionaliteiten:
* Clubs toevoegen, bewerken en verwijderen
* Spelers toevoegen, bewerken en verwijderen. Bij een speler kan ook zijn club ingesteld worden maar dit is niet verplicht. De handicap van een speler is een cijfer die de gevorderdheid van een speler aanduid. 
* Matches toevoegen, die tussen 2 spelers gespeeld worden en de punten ingeven. De app berekent automatisch de nieuwe totalen en gemiddelden. Nadat één van de spelers gewonnen is wordt de match toegevoegd aan de lijst en kan je de details nog raadplegen.

Zie ook de live demo en de screencast(`screencast.mp4`).

Het is ook mogelijk om tussen de pagina's Matches, Spelers en Clubs te swipen. Dit wordt getoond in de video `swipe.mp4` aan de hand van de emulator in de Chrome devtools.

## Gebruikte technologiën/frameworks
* Manifest
* Service Worker
* Cache API
* HTTPS
* Localforage
* Security headers
    * HTTP Strict Transport Security(HSTS)
    * X-XSS-Protection
    * X-Content-Type-Options
    * Reffer-Policy
* Vue.js met vue components en vue routing
* Vuetify
* Webpack
  * Webpack JS bundle building
  * Babel compiler & polyfill
  * Vue loader voor het ondersteunen van `.vue` bestanden
  * UglifyJsWebPackPlugin voor minificatie van JS

## Ondersteunde & geteste browsers
* Windows 10:
   * Mozilla Firefox
   * Google Chrome
   * Opera
* Android:
   * Google Chrome

## Git repo
https://github.com/AnseelJonas/biljart-scores-pwa

## Copyright
Deze applicatie is gemaakt door Jonas Anseel.

Iconen: 
* onlinewebfonts.com
* Google material design icons
