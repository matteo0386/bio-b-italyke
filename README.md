# Bio&B Italyke - sito web

Sito statico per Bio&B Italyke, country house biosostenibile a Viterbo, sviluppato in HTML, CSS e JavaScript senza framework.

## Link

- Repository GitHub: https://github.com/matteo0386/bio-b-italyke
- Sito pubblicato con GitHub Pages: https://matteo0386.github.io/bio-b-italyke/
- Booking engine Amenitiz: https://bio-b-italyke.amenitiz.io/it/booking/room#DatesGuests-BE

## Struttura pagine

- `index.html`: homepage con video hero, sezioni principali, CTA prenotazione e anteprima Instagram.
- `camere.html`: camere, servizi, slider immagini e colazione bio.
- `esperienze.html`: esperienze, vasca, sapori locali, benessere e CTA finale.
- `gruppi-eventi.html`: affitto dell'intera location per gruppi, ritiri, famiglie e piccoli eventi.
- `territorio.html`: Tuscia, Viterbo, borghi, terme e itinerari.
- `contatti.html`: recapiti e form che apre WhatsApp con messaggio precompilato.
- `prenotazione.html`: pagina dedicata al booking engine Amenitiz in iframe.
- `prenota.html`: copia mantenuta per compatibilita con eventuali link precedenti.

## Asset principali

- `assets/css/styles.css`: stile globale, layout responsive, animazioni, overlay e gestione UI.
- `assets/js/main.js`: menu, slider, reveal allo scroll, parallax, form WhatsApp.
- `assets/fonts/`: font locali in stile Casa Angelina.
- `assets/img/logo.png`: logo usato nel menu e nel footer.
- `assets/img/sito-pubblicato/Immagini def/`: immagini selezionate usate nelle pagine.
- `assets/img/optimized/`: versioni WebP leggere delle immagini effettivamente caricate dal sito.
- `assets/img/seo/`: immagini Open Graph 1200x630 per anteprime social e SEO.
- `assets/img/instagram/`: anteprime statiche degli ultimi post Instagram.
- `assets/video/`: sorgenti video hero, versioni web leggere e poster homepage.

## Funzionalita implementate

- Header fisso con menu laterale arrotondato.
- Footer con logo, contatti, link navigazione e pulsante "prenota online" in tutte le pagine.
- Homepage con video hero, testi ad alto contrasto e CTA verso prenotazione.
- Video hero caricato in modo differito dopo il primo caricamento della pagina.
- Immagini delle pagine collegate a versioni WebP leggere con lazy loading dove possibile.
- Slider immagini in stile Casa Angelina.
- Effetto parallax leggero sulle immagini.
- Parallax disattivato su mobile stretto per mantenere lo scroll fluido.
- Effetto di comparsa/scomparsa delle foto durante lo scroll.
- Rifiniture mobile: barra azioni rapida con icone, gallerie a scorrimento e micro-interazioni menu.
- Metadata SEO completi, canonical, social preview e dati strutturati con enfasi su gruppi e intera location.
- Booking engine Amenitiz incorporato in `prenotazione.html`.
- Fallback link per aprire Amenitiz in nuova scheda.
- Form contatti che apre WhatsApp con dati del modulo gia compilati.
- Anteprima Instagram statica in homepage.
- Layout responsive mobile-first.

## Pubblicazione

Il repository locale e collegato a:

```bash
origin https://github.com/matteo0386/bio-b-italyke.git
```

Il sito e pubblicato tramite GitHub Pages da:

- branch: `main`
- path: `/`

Per pubblicare modifiche future:

```bash
git status
git add -A
git commit -m "Descrizione modifica"
git push
```

GitHub Pages ricostruira automaticamente il sito dopo il push.

## Note operative

- Non eliminare `prenotazione.html`: e la pagina usata dai pulsanti "prenota online".
- `prenota.html` e mantenuta come alias/copia di sicurezza.
- `prenota.html` ha canonical verso `prenotazione.html` ed e impostata `noindex` per evitare duplicati SEO.
- Canonical, robots e sitemap sono allineati all'URL GitHub Pages. Se viene collegato un dominio custom, aggiornare URL assoluti in HTML, `robots.txt` e `sitemap.xml`.
- Le immagini del vecchio sito non selezionate sono escluse dal repository tramite `.gitignore`.
- I video originali `assets/video/italyke-sponsor-hero.mp4` e `assets/video/italyke-sponsor-mobile.mp4` restano come sorgenti; il sito carica le versioni web `*-web.mp4`.
- Per cambiare l'URL Amenitiz, aggiornare iframe e link fallback in `prenotazione.html` e, se necessario, anche in `prenota.html`.

## Verifiche recenti

- `node --check assets/js/main.js`
- JSON-LD parsato correttamente in tutte le pagine HTML
- controllo riferimenti locali HTML, inclusi video `data-src`
- controllo locale delle pagine principali con codice HTTP `200`
- GitHub Pages verificato con stato `built`
