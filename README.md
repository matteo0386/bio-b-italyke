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
- `.github/workflows/instagram-reminder.yml`: GitHub Action che crea il promemoria settimanale per aggiornare le anteprime Instagram statiche.

## Asset principali

- `assets/css/styles.css`: stile globale, layout responsive, animazioni, overlay e gestione UI.
- `assets/js/main.js`: menu, slider, reveal allo scroll, parallax, form WhatsApp.
- `assets/fonts/`: font locali in stile Casa Angelina.
- `assets/img/logo.png`: logo usato nel menu e nel footer.
- `assets/img/sito-pubblicato/Immagini def/`: immagini selezionate usate nelle pagine.
- `assets/img/optimized/`: versioni WebP leggere e responsive delle immagini effettivamente caricate dal sito (`720w`, `1100w`, `1400w`).
- `assets/img/seo/`: immagini Open Graph 1200x630 per anteprime social e SEO.
- `assets/img/instagram/`: anteprime statiche degli ultimi post Instagram.
- `assets/video/`: sorgenti video hero, versioni web leggere e poster homepage.

## Funzionalita implementate

- Header fisso con menu laterale arrotondato.
- Footer con logo, contatti, link navigazione e pulsante "prenota online" in tutte le pagine.
- Homepage con video hero, testi ad alto contrasto e CTA verso prenotazione.
- Video hero desktop/mobile ottimizzato per il web, con poster piu leggero, playback rallentato e caricamento piu affidabile su mobile.
- Immagini delle pagine collegate a versioni WebP responsive con `srcset`, `sizes` e lazy loading dove possibile.
- Slider immagini in stile Casa Angelina.
- Effetto parallax leggero sulle immagini.
- Parallax disattivato su mobile stretto per mantenere lo scroll fluido.
- Effetto di comparsa/scomparsa delle foto durante lo scroll.
- Rifiniture mobile: dock azioni rapido con pulsanti iconici, gallerie verticali senza scroll orizzontale e micro-interazioni menu.
- Header desktop con CTA "prenota online" piu visibile.
- Pagina prenotazione con header scuro dedicato: menu, email e telefono restano bianchi sopra il booking engine Amenitiz.
- Metadata SEO completi, canonical, social preview e dati strutturati con enfasi su gruppi e intera location.
- Booking engine Amenitiz incorporato in `prenotazione.html`.
- Fallback link per aprire Amenitiz in nuova scheda.
- Form contatti che apre WhatsApp con dati del modulo gia compilati.
- Anteprima Instagram statica in homepage.
- Promemoria GitHub Issues settimanale per aggiornare manualmente le anteprime Instagram senza API esterne.
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

## Manutenzione Instagram

Le anteprime Instagram in homepage sono statiche per mantenere il sito leggero e non caricare widget o script esterni.

La GitHub Action `Promemoria Instagram` gira ogni lunedi alle `08:00 UTC` e puo essere avviata anche manualmente da GitHub Actions. Se non esiste una issue aperta, crea `Aggiornare anteprime Instagram homepage`; se la issue e gia aperta, aggiunge un commento promemoria invece di duplicarla.

Routine consigliata quando arriva il promemoria:

```bash
# aggiornare immagini e riferimenti
node --check assets/js/main.js
git diff --check
git status
git add -A
git commit -m "Aggiorna anteprime Instagram"
git push
```

Dopo la pubblicazione, chiudere la issue del promemoria.

## Note operative

- Non eliminare `prenotazione.html`: e la pagina usata dai pulsanti "prenota online".
- `prenota.html` e mantenuta come alias/copia di sicurezza.
- `prenota.html` ha canonical verso `prenotazione.html` ed e impostata `noindex` per evitare duplicati SEO.
- Aggiornare sempre questo `README.md` quando cambia struttura, asset, UX, SEO, pubblicazione o una regola operativa del progetto.
- Le anteprime Instagram sono aggiornate manualmente; non usare widget Instagram in homepage se appesantiscono il caricamento.
- Dopo modifiche a CSS, JavaScript, video o immagini hero, aggiornare la query anti-cache nei riferimenti HTML, per esempio `?v=YYYYMMDD-descrizione`.
- Il video hero della homepage usa sorgenti separate desktop/mobile caricate via `data-src-desktop` e `data-src-mobile` in `index.html`; mantenere `preload="metadata"` e `movflags +faststart` nelle versioni web per non peggiorare l'avvio su mobile.
- Canonical, robots e sitemap sono allineati all'URL GitHub Pages. Se viene collegato un dominio custom, aggiornare URL assoluti in HTML, `robots.txt` e `sitemap.xml`.
- Le immagini del vecchio sito non selezionate sono escluse dal repository tramite `.gitignore`.
- I video originali `assets/video/italyke-sponsor-hero.mp4` e `assets/video/italyke-sponsor-mobile.mp4` restano come sorgenti; il sito carica le versioni web `*-web.mp4`.
- Per cambiare l'URL Amenitiz, aggiornare iframe e link fallback in `prenotazione.html` e, se necessario, anche in `prenota.html`.

## Ultimo stato pubblicato

- Ultimo intervento pubblicato: video hero rallentato e alleggerito, CTA prenotazione desktop piu visibile e tipografia piu compatta.
- Cache busting attivo: `v=20260426-hero-type`.
- Immagini: base WebP ridotte a circa 4.7 MB totali e varianti responsive `720w`/`1100w`/`1400w` collegate agli HTML.
- Video homepage: poster ridotto a circa 122 KB, video desktop a circa 3.7 MB e video mobile a circa 3.0 MB, entrambi con `faststart`.
- Mobile: le sezioni con tre immagini/card sono verticali, senza scorrimento laterale.
- Booking Amenitiz: header scuro dedicato con controlli bianchi.

## Verifiche recenti

- `node --check assets/js/main.js`
- JSON-LD parsato correttamente in tutte le pagine HTML
- controllo riferimenti locali HTML, inclusi video `data-src`
- controllo locale delle pagine principali con codice HTTP `200`
- GitHub Pages verificato con stato `built`
