import type { Category, Product, Language, Brand } from '../types';

export const LANGUAGES: Language[] = [
'it',
'en',
'de',
'fr',
'es',
'pl',
'nl',
'pt',
'cs',
'ro',
'hu',
'sk',
'bg',
'hr'];


export const LANGUAGE_LABELS: Record<Language, string> = {
  it: 'Italiano',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pl: 'Polski',
  nl: 'Nederlands',
  pt: 'Português',
  cs: 'Čeština',
  ro: 'Română',
  hu: 'Magyar',
  sk: 'Slovenčina',
  bg: 'Български',
  hr: 'Hrvatski'
};

export const CATEGORIES: Category[] = [
{
  slug: 'anabolizzanti',
  label: 'Anabolizzanti',
  description: 'Steroidi anabolizzanti androgeni per la crescita muscolare',
  richText: `Gli steroidi anabolizzanti androgeni (AAS) sono derivati sintetici del testosterone, l'ormone sessuale maschile primario. Vengono utilizzati principalmente per aumentare la massa muscolare, migliorare la forza e accelerare il recupero dopo l'allenamento intenso.

In ambito medico, gli AAS sono prescritti per trattare condizioni come l'ipogonadismo, l'anemia aplastica e il ritardo della pubertà. Nel contesto sportivo e del bodybuilding, sono tra i composti più ricercati per il miglioramento delle prestazioni fisiche.

**Principi attivi più comuni:** Testosterone Enantato, Testosterone Cipionato, Nandrolone Decanoato (Deca-Durabolin), Stanozololo (Winstrol), Oxandrolone (Anavar), Metandrostenolone (Dianabol), Trenbolone Acetato.

**Meccanismo d'azione:** Gli AAS si legano ai recettori degli androgeni nelle cellule muscolari, stimolando la sintesi proteica e l'azoto ritenuto nei tessuti. Questo processo porta a un aumento della massa muscolare magra e della forza.

**Considerazioni sulla sicurezza:** L'uso non supervisionato di steroidi anabolizzanti comporta rischi significativi per la salute, tra cui alterazioni del profilo lipidico, soppressione dell'asse ipotalamo-ipofisi-gonadi (HPG), epatotossicità (per i composti orali 17-alfa alchilati) e effetti cardiovascolari.`,
  productCount: 47
},
{
  slug: 'bruciagrassi',
  label: 'Bruciagrassi',
  description:
  'Termogenici e lipolytici per la riduzione del grasso corporeo',
  richText: `I bruciagrassi sono una categoria di integratori e farmaci progettati per accelerare il metabolismo, aumentare la termogenesi e favorire la lipolisi — il processo di scomposizione dei grassi immagazzinati per produrre energia.

**Categorie principali:** Termogenici (efedrina, caffeina, sinefrina), Agonisti beta-2 (Clenbuterolo, Albuterolo), Ormoni tiroidei (T3/Cytomel, T4), Inibitori della lipasi (Orlistat), Peptidi lipolitici (Fragment 176-191).

Il Clenbuterolo è uno dei bruciagrassi più utilizzati nel bodybuilding competitivo. Originariamente sviluppato come broncodilatatore per il trattamento dell'asma, ha dimostrato potenti effetti lipolitici attraverso la stimolazione dei recettori beta-2 adrenergici nel tessuto adiposo.`,
  productCount: 23
},
{
  slug: 'ormoni',
  label: 'Ormoni',
  description: 'Ormoni endogeni e analoghi per la regolazione metabolica',
  richText: `Gli ormoni sono messaggeri chimici prodotti dalle ghiandole endocrine che regolano praticamente ogni funzione corporea, dal metabolismo alla crescita, dalla riproduzione all'umore. In ambito sportivo e medico, gli ormoni esogeni vengono utilizzati per ottimizzare la composizione corporea e le prestazioni.

**Principali ormoni di interesse:** Testosterone (e suoi esteri), Estradiolo, Progesterone, Insulina, Ormone della crescita (HGH/somatropina), IGF-1 (Insulin-like Growth Factor 1), Eritropoietina (EPO).`,
  productCount: 31
},
{
  slug: 'peptidi',
  label: 'Peptidi',
  description:
  'Peptidi bioattivi per il recupero, la crescita e la performance',
  richText: `I peptidi sono catene corte di aminoacidi (tipicamente 2-50 residui) che agiscono come segnali biologici nel corpo umano. Negli ultimi anni, i peptidi sintetici sono diventati molto popolari nel mondo del bodybuilding e della medicina anti-aging per la loro specificità d'azione e il profilo di sicurezza generalmente favorevole rispetto agli steroidi tradizionali.

**Categorie di peptidi:** Secretagoghi dell'ormone della crescita (GHRP-2, GHRP-6, Ipamorelin, CJC-1295), Peptidi per il recupero (BPC-157, TB-500/Thymosin Beta-4), Peptidi melanocortina (Melanotan II, PT-141), Peptidi lipolitici (Fragment 176-191, AOD-9604).`,
  productCount: 38
},
{
  slug: 'pct',
  label: 'PCT',
  description: "Terapia post-ciclo per il ripristino dell'asse ormonale",
  richText: `La Terapia Post-Ciclo (PCT — Post Cycle Therapy) è un protocollo farmacologico essenziale da seguire dopo l'uso di steroidi anabolizzanti o altri composti che sopprimono la produzione endogena di testosterone. L'obiettivo principale della PCT è ripristinare la funzione naturale dell'asse ipotalamo-ipofisi-gonadi (HPG) nel minor tempo possibile.

**Farmaci PCT principali:** Tamoxifene (Nolvadex) — SERM, blocca i recettori degli estrogeni nell'ipofisi; Clomifene (Clomid) — SERM, stimola la produzione di LH e FSH; Anastrozolo (Arimidex) — Inibitore dell'aromatasi; HCG (Gonadotropina Corionica Umana) — Mantiene la funzione testicolare durante il ciclo.`,
  productCount: 19
},
{
  slug: 'sarms',
  label: 'SARMs',
  description: 'Modulatori selettivi dei recettori degli androgeni',
  richText: `I SARMs (Selective Androgen Receptor Modulators) rappresentano una classe relativamente nuova di composti che si legano selettivamente ai recettori degli androgeni in specifici tessuti — principalmente muscolo e osso — con minori effetti sugli organi come prostata e fegato rispetto agli steroidi tradizionali.

**SARMs più diffusi:** Ostarine (MK-2866) — il più studiato, ottimo per il recomping; LGD-4033 (Ligandrol) — potente per la massa muscolare; RAD-140 (Testolone) — alto rapporto anabolico/androgeno; GW-501516 (Cardarine) — tecnicamente un agonista PPARδ, non un SARM; MK-677 (Ibutamoren) — secretagogo del GH orale.`,
  productCount: 26
},
{
  slug: 'hgh',
  label: 'HGH',
  description: 'Ormone della crescita umano e secretagoghi',
  richText: `L'Ormone della Crescita Umano (HGH — Human Growth Hormone), noto anche come somatropina, è un peptide di 191 aminoacidi prodotto dalla ghiandola pituitaria anteriore. Svolge un ruolo fondamentale nella crescita, nel metabolismo, nella composizione corporea e nel recupero tissutale.

**Applicazioni terapeutiche:** Deficit di GH negli adulti, Sindrome di Turner, Sindrome di Prader-Willi, Insufficienza renale cronica nei bambini, Cachessia da HIV/AIDS, Sindrome dell'intestino corto.

**Marchi disponibili:** Genotropin (Pfizer), Norditropin (Novo Nordisk), Humatrope (Eli Lilly), Saizen (Merck), Omnitrope (Sandoz), Ansomone, Jintropin (origini cinesi).`,
  productCount: 15
},
{
  slug: 'vitamine',
  label: 'Vitamine',
  description: 'Vitamine, minerali e micronutrienti essenziali',
  richText: `Le vitamine e i minerali sono micronutrienti essenziali che il corpo non può sintetizzare in quantità sufficienti e devono essere assunti attraverso la dieta o l'integrazione. Per gli atleti e i bodybuilder, un adeguato apporto di micronutrienti è fondamentale per ottimizzare le prestazioni, il recupero e la salute generale.

**Vitamine chiave per atleti:** Vitamina D3 (colecalciferolo) — fondamentale per la funzione muscolare e la salute ossea; Vitamina B12 — essenziale per il metabolismo energetico; Vitamina C — antiossidante e supporto immunitario; Vitamina E — protezione cellulare.

**Minerali essenziali:** Zinco — coinvolto nella produzione di testosterone; Magnesio — oltre 300 reazioni enzimatiche; Ferro — trasporto dell'ossigeno.`,
  productCount: 42
}];


export const BRANDS: Brand[] = [
{
  slug: 'balkan-pharmaceuticals',
  name: 'Balkan Pharmaceuticals',
  country: 'Moldova',
  countryCode: 'MD',
  founded: '2006',
  description:
  'Produttore farmaceutico moldavo di steroidi iniettabili e orali di alta qualità',
  richText: `Balkan Pharmaceuticals è una delle aziende farmaceutiche più rispettate nel settore degli steroidi anabolizzanti. Fondata nel 2006 in Moldova, l'azienda produce una vasta gamma di steroidi iniettabili e orali seguendo rigorosi standard GMP (Good Manufacturing Practice).

I prodotti Balkan Pharmaceuticals sono noti per la loro purezza eccezionale, la concentrazione accurata dei principi attivi e la costanza qualitativa da lotto a lotto. L'azienda utilizza materie prime di grado farmaceutico e processi di produzione controllati per garantire prodotti sicuri ed efficaci.

**Prodotti di punta:** Testosterone Enantato (Enandrol), Testosterone Cipionato (Cipandrol), Nandrolone Decanoato (Decandrol), Stanozololo (Strombafort), Oxandrolone (Oxandrolon), Methandienone (Danabol).

**Certificazioni:** L'azienda opera in conformità con le normative farmaceutiche europee e mantiene standard di qualità verificabili attraverso codici di autenticità su ogni prodotto.`,
  productCount: 28
},
{
  slug: 'magnus-pharmaceuticals',
  name: 'Magnus Pharmaceuticals',
  country: 'Austria',
  countryCode: 'AT',
  founded: '2010',
  description:
  'Laboratorio austriaco specializzato in steroidi iniettabili premium',
  richText: `Magnus Pharmaceuticals è un laboratorio farmaceutico austriaco fondato nel 2010, specializzato nella produzione di steroidi anabolizzanti iniettabili e orali di qualità premium. L'azienda si distingue per l'utilizzo di oli veicolanti di alta qualità che rendono le iniezioni particolarmente confortevoli.

La gamma Magnus include tutti i principali steroidi anabolizzanti, con particolare attenzione alla purezza del principio attivo e alla sterilità del prodotto finale. Ogni lotto viene testato per contaminanti, endotossine batteriche e concentrazione del principio attivo.

**Specialità:** Nandrolone Decanoato 300mg/ml, Testosterone Mix (Sustanon), Trenbolone Enantato, Boldenone Undecylenate (Equipoise), Masteron Enantato.`,
  productCount: 22
},
{
  slug: 'hilma-biocare',
  name: 'Hilma Biocare',
  country: 'Svezia',
  countryCode: 'SE',
  founded: '2012',
  description:
  'Azienda svedese di biotecnologie specializzata in composti orali e peptidi',
  richText: `Hilma Biocare è un'azienda svedese di biotecnologie fondata nel 2012, specializzata nella produzione di steroidi orali, peptidi e SARMs. L'azienda è particolarmente apprezzata per la qualità dei suoi composti orali, con dosaggi precisi e biodisponibilità ottimale.

Hilma Biocare si distingue per l'approccio scientifico alla formulazione dei prodotti, utilizzando tecnologie di microincapsulazione per migliorare l'assorbimento e ridurre la tossicità epatica dei composti 17-alfa alchilati.

**Prodotti di punta:** Oxandrolone (Anavar) 10mg, Stanozololo 10mg, Methandienone 10mg, Turinabol 10mg, Winstrol Depot 50mg/ml.`,
  productCount: 19
},
{
  slug: 'sopharma',
  name: 'Sopharma',
  country: 'Bulgaria',
  countryCode: 'BG',
  founded: '1933',
  description:
  'Storica azienda farmaceutica bulgara, produttrice del Clenbuterolo originale',
  richText: `Sopharma è una delle più antiche e rispettate aziende farmaceutiche dell'Europa dell'Est, fondata nel 1933 in Bulgaria. L'azienda è internazionalmente riconosciuta come il produttore del Clenbuterolo originale (Clenbuterol Sopharma), considerato il gold standard tra i bruciagrassi.

A differenza di molti produttori underground, Sopharma è un'azienda farmaceutica regolamentata che produce medicinali approvati per uso umano. I prodotti Sopharma sono disponibili in farmacia in molti paesi europei, garantendo autenticità e qualità farmaceutica certificata.

**Prodotti principali:** Clenbuterol 0.02mg (50 compresse), Ephedrine HCL, Methyltestosterone, Testosterone Propionate.

**Autenticità:** Ogni confezione Sopharma include un codice di verifica che può essere controllato sul sito ufficiale dell'azienda.`,
  productCount: 8
},
{
  slug: 'lawless-labs',
  name: 'Lawless Labs',
  country: 'Germania',
  countryCode: 'DE',
  founded: '2018',
  description:
  'Laboratorio tedesco specializzato in SARMs e composti sperimentali',
  richText: `Lawless Labs è un laboratorio di ricerca tedesco fondato nel 2018, specializzato nella produzione di SARMs (Selective Androgen Receptor Modulators) e altri composti sperimentali per la ricerca scientifica. L'azienda si è rapidamente affermata come uno dei fornitori più affidabili nel settore dei SARMs in Europa.

Tutti i prodotti Lawless Labs vengono testati da laboratori terzi indipendenti per verificare purezza e concentrazione. I certificati di analisi (CoA) sono disponibili per ogni lotto di produzione.

**Gamma SARMs:** Ostarine (MK-2866) 25mg, LGD-4033 (Ligandrol) 10mg, RAD-140 (Testolone) 10mg, Cardarine (GW-501516) 10mg, Ibutamoren (MK-677) 25mg, YK-11 10mg.`,
  productCount: 15
},
{
  slug: 'ansomone',
  name: 'Ansomone',
  country: 'Cina',
  countryCode: 'CN',
  founded: '1998',
  description:
  'Produttore cinese di HGH ricombinante 191aa di qualità farmaceutica',
  richText: `Ansomone è un ormone della crescita umano ricombinante (rhGH) prodotto da Anke Biotechnology Co., Ltd., una delle principali aziende biotecnologiche cinesi. Fondato nel 1998, Ansomone è uno degli HGH più utilizzati a livello mondiale per applicazioni anti-aging, bodybuilding e terapia medica.

La sequenza aminoacidica di Ansomone è identica all'HGH endogeno umano (191 aminoacidi), garantendo bioattività ottimale e minimo rischio di risposta immunitaria. Il prodotto viene prodotto mediante tecnologia del DNA ricombinante in cellule E. coli.

**Disponibilità:** Kit da 100 UI (10 flaconi × 10 UI), Kit da 200 UI (10 flaconi × 20 UI).

**Conservazione:** Prodotto liofilizzato, stabile a temperatura ambiente fino a 18 mesi. Dopo ricostituzione, conservare a 2-8°C e utilizzare entro 72 ore.`,
  productCount: 6
},
{
  slug: 'astra-zeneca',
  name: 'AstraZeneca',
  country: 'Regno Unito',
  countryCode: 'GB',
  founded: '1999',
  description:
  'Multinazionale farmaceutica britannica, produttrice di Nolvadex e Arimidex originali',
  richText: `AstraZeneca è una delle più grandi multinazionali farmaceutiche al mondo, con sede nel Regno Unito. Nel contesto del bodybuilding e della PCT, AstraZeneca è principalmente conosciuta come produttrice di Nolvadex (Tamoxifene) e Arimidex (Anastrozolo) — due farmaci fondamentali per la terapia post-ciclo e il controllo degli estrogeni.

Questi farmaci sono stati originariamente sviluppati per il trattamento del cancro al seno ormono-dipendente, ma sono stati adottati dalla comunità del bodybuilding per le loro proprietà anti-estrogeniche.

**Prodotti rilevanti:** Nolvadex (Tamoxifene citrato) 10mg/20mg, Arimidex (Anastrozolo) 1mg, Casodex (Bicalutamide).`,
  productCount: 4
},
{
  slug: 'peptide-sciences',
  name: 'Peptide Sciences',
  country: 'USA',
  countryCode: 'US',
  founded: '2014',
  description:
  'Laboratorio americano specializzato in peptidi di ricerca ad alta purezza',
  richText: `Peptide Sciences è un laboratorio di ricerca americano fondato nel 2014, specializzato nella sintesi e purificazione di peptidi bioattivi per uso nella ricerca scientifica. L'azienda è riconosciuta per la qualità eccezionale dei suoi prodotti, con purezza tipicamente superiore al 99%.

Tutti i peptidi Peptide Sciences vengono sintetizzati mediante sintesi peptidica in fase solida (SPPS) e purificati tramite HPLC preparativa. Ogni prodotto è accompagnato da un certificato di analisi dettagliato che include spettro di massa e cromatogramma HPLC.

**Peptidi di punta:** BPC-157 (5mg, 10mg), TB-500 (5mg), Ipamorelin (5mg), CJC-1295 (2mg, 5mg), GHRP-2 (5mg), GHRP-6 (5mg), Melanotan II (10mg), PT-141 (10mg).`,
  productCount: 12
}];


export const PRODUCTS: Product[] = [
// Balkan Pharmaceuticals
{
  id: 'p001',
  name: 'Testosterone Enantato 250mg/ml',
  slug: 'testosterone-enantato-250',
  brand: 'Balkan Pharmaceuticals',
  brandSlug: 'balkan-pharmaceuticals',
  category: 'anabolizzanti',
  price: 42.0,
  originalPrice: 55.0,
  sku: 'BP-TE-250-10ML',
  availability: 'InStock',
  rating: 4.8,
  reviewCount: 312,
  shortDescription:
  'Estere a lunga durata del testosterone, ideale per cicli di massa.',
  description:
  "Il Testosterone Enantato è uno degli steroidi anabolizzanti più utilizzati al mondo. Con un'emivita di circa 7-10 giorni, richiede iniezioni bi-settimanali per mantenere livelli ematici stabili. Ideale per cicli di massa muscolare della durata di 10-16 settimane.",
  tags: ['testosterone', 'enantato', 'iniettabile', 'massa', 'ciclo-base'],
  imageAlt:
  'Flaconcino 10ml Testosterone Enantato 250mg Balkan Pharmaceuticals',
  imageUrl:
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80'
},
{
  id: 'p009',
  name: 'Testosterone Cipionato 200mg/ml',
  slug: 'testosterone-cipionato-200',
  brand: 'Balkan Pharmaceuticals',
  brandSlug: 'balkan-pharmaceuticals',
  category: 'anabolizzanti',
  price: 38.0,
  sku: 'BP-TC-200-10ML',
  availability: 'InStock',
  rating: 4.7,
  reviewCount: 245,
  shortDescription:
  'Estere a lunga durata del testosterone, alternativa al Enantato.',
  description:
  'Il Testosterone Cipionato è un estere a lunga durata del testosterone con emivita di 8-12 giorni. Molto popolare negli USA, offre un rilascio stabile del testosterone con iniezioni settimanali o bi-settimanali.',
  tags: ['testosterone', 'cipionato', 'iniettabile', 'massa', 'balkan'],
  imageAlt:
  'Flaconcino 10ml Testosterone Cipionato 200mg Balkan Pharmaceuticals',
  imageUrl:
  'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&q=80'
},
{
  id: 'p010',
  name: 'Stanozololo 10mg — Strombafort',
  slug: 'stanozololo-strombafort-10mg',
  brand: 'Balkan Pharmaceuticals',
  brandSlug: 'balkan-pharmaceuticals',
  category: 'anabolizzanti',
  price: 32.0,
  sku: 'BP-STROMB-10-100CPR',
  availability: 'InStock',
  rating: 4.6,
  reviewCount: 189,
  shortDescription:
  'Stanozololo orale per definizione muscolare e forza senza ritenzione.',
  description:
  'Lo Stanozololo (Winstrol) è uno steroide anabolizzante derivato dal DHT, noto per la sua capacità di aumentare la forza e la definizione muscolare senza causare ritenzione idrica. Ideale per le fasi di cutting.',
  tags: ['stanozololo', 'winstrol', 'orale', 'definizione', 'forza'],
  imageAlt:
  '100 compresse Stanozololo 10mg Strombafort Balkan Pharmaceuticals',
  imageUrl:
  'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&q=80'
},
// Magnus Pharmaceuticals
{
  id: 'p002',
  name: 'Nandrolone Decanoato 300mg/ml',
  slug: 'nandrolone-decanoato-300',
  brand: 'Magnus Pharmaceuticals',
  brandSlug: 'magnus-pharmaceuticals',
  category: 'anabolizzanti',
  price: 48.5,
  sku: 'MP-ND-300-10ML',
  availability: 'InStock',
  rating: 4.7,
  reviewCount: 198,
  shortDescription:
  'Deca-Durabolin — classico per massa e recupero articolare.',
  description:
  'Il Nandrolone Decanoato, conosciuto commercialmente come Deca-Durabolin, è uno degli steroidi anabolizzanti più apprezzati per la sua capacità di promuovere la massa muscolare magra e migliorare la lubrificazione articolare. Emivita: 14-16 giorni.',
  tags: ['nandrolone', 'deca', 'iniettabile', 'articolazioni', 'massa'],
  imageAlt:
  'Flaconcino 10ml Nandrolone Decanoato 300mg Magnus Pharmaceuticals',
  imageUrl:
  'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&q=80'
},
{
  id: 'p011',
  name: 'Trenbolone Enantato 200mg/ml',
  slug: 'trenbolone-enantato-200',
  brand: 'Magnus Pharmaceuticals',
  brandSlug: 'magnus-pharmaceuticals',
  category: 'anabolizzanti',
  price: 72.0,
  originalPrice: 88.0,
  sku: 'MP-TREN-E-200-10ML',
  availability: 'InStock',
  rating: 4.8,
  reviewCount: 134,
  shortDescription:
  'Steroide avanzato per massa secca e definizione estrema.',
  description:
  'Il Trenbolone Enantato è uno degli steroidi anabolizzanti più potenti disponibili. Con un rapporto anabolico/androgeno di 500/500 rispetto al testosterone (100/100), offre guadagni muscolari eccezionali con minima ritenzione idrica.',
  tags: ['trenbolone', 'tren-e', 'iniettabile', 'avanzato', 'massa-secca'],
  imageAlt:
  'Flaconcino 10ml Trenbolone Enantato 200mg Magnus Pharmaceuticals'
},
// Hilma Biocare
{
  id: 'p003',
  name: 'Oxandrolone 10mg — Anavar',
  slug: 'oxandrolone-anavar-10mg',
  brand: 'Hilma Biocare',
  brandSlug: 'hilma-biocare',
  category: 'anabolizzanti',
  price: 68.0,
  originalPrice: 80.0,
  sku: 'HB-OXA-10-100CPR',
  availability: 'InStock',
  rating: 4.9,
  reviewCount: 445,
  shortDescription:
  'Steroide orale mite, ideale per definizione e forza senza ritenzione idrica.',
  description:
  "L'Oxandrolone (Anavar) è uno steroide anabolizzante orale derivato dal DHT, noto per la sua mildezza e l'eccellente profilo rischio/beneficio. Particolarmente apprezzato nelle fasi di definizione per preservare la massa muscolare durante la restrizione calorica.",
  tags: ['oxandrolone', 'anavar', 'orale', 'definizione', 'donne', 'mite'],
  imageAlt: '100 compresse Oxandrolone 10mg Anavar Hilma Biocare',
  imageUrl:
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80'
},
{
  id: 'p012',
  name: 'Turinabol 10mg — T-Bol',
  slug: 'turinabol-10mg',
  brand: 'Hilma Biocare',
  brandSlug: 'hilma-biocare',
  category: 'anabolizzanti',
  price: 45.0,
  sku: 'HB-TUR-10-100CPR',
  availability: 'InStock',
  rating: 4.6,
  reviewCount: 167,
  shortDescription:
  'Steroide orale per guadagni di qualità senza ritenzione idrica.',
  description:
  'Il Turinabol (4-Chlorodehydromethyltestosterone) è uno steroide anabolizzante orale sviluppato originariamente in Germania Est. Offre guadagni muscolari di qualità, aumento della forza e miglioramento della resistenza senza ritenzione idrica significativa.',
  tags: ['turinabol', 't-bol', 'orale', 'qualità', 'forza'],
  imageAlt: '100 compresse Turinabol 10mg Hilma Biocare'
},
// Sopharma
{
  id: 'p004',
  name: 'Clenbuterolo 40mcg',
  slug: 'clenbuterolo-40mcg',
  brand: 'Sopharma',
  brandSlug: 'sopharma',
  category: 'bruciagrassi',
  price: 18.0,
  sku: 'SP-CLEN-40-50CPR',
  availability: 'InStock',
  rating: 4.6,
  reviewCount: 567,
  shortDescription:
  'Broncodilatatore beta-2 agonista con potente effetto lipolitico.',
  description:
  'Il Clenbuterolo Sopharma è il prodotto farmaceutico originale bulgaro, considerato il gold standard tra i bruciagrassi. Stimola i recettori beta-2 adrenergici aumentando la temperatura corporea e accelerando il metabolismo dei grassi.',
  tags: ['clenbuterolo', 'beta-2', 'lipolitico', 'termogenico', 'sopharma'],
  imageAlt: '50 compresse Clenbuterolo 40mcg Sopharma originale'
},
{
  id: 'p013',
  name: 'Efedrina HCL 50mg',
  slug: 'efedrina-hcl-50mg',
  brand: 'Sopharma',
  brandSlug: 'sopharma',
  category: 'bruciagrassi',
  price: 22.0,
  sku: 'SP-EPH-50-50CPR',
  availability: 'InStock',
  rating: 4.4,
  reviewCount: 203,
  shortDescription:
  'Simpaticomimetico termogenico per la perdita di grasso e aumento energia.',
  description:
  "L'Efedrina HCL è un alcaloide simpaticomimetico che stimola il sistema nervoso simpatico, aumentando il metabolismo basale e la termogenesi. Spesso utilizzata in stack ECA (Efedrina-Caffeina-Aspirina) per massimizzare la perdita di grasso.",
  tags: ['efedrina', 'termogenico', 'eca-stack', 'energia', 'sopharma'],
  imageAlt: '50 compresse Efedrina HCL 50mg Sopharma'
},
// Ansomone — HGH
{
  id: 'p005',
  name: 'Somatropina HGH 100 UI Kit',
  slug: 'somatropina-hgh-100ui',
  brand: 'Ansomone',
  brandSlug: 'ansomone',
  category: 'hgh',
  price: 185.0,
  originalPrice: 220.0,
  sku: 'ANS-HGH-100UI-KIT',
  availability: 'InStock',
  rating: 4.7,
  reviewCount: 89,
  shortDescription:
  'Ormone della crescita ricombinante 191aa, kit completo 10 flaconi × 10 UI.',
  description:
  'Ansomone è un ormone della crescita umano ricombinante (rhGH) di sequenza 191 aminoacidi prodotto da Anke Biotechnology. Kit completo con 10 flaconi da 10 UI ciascuno per un totale di 100 UI. Ideale per cicli anti-aging, composizione corporea e recupero.',
  tags: ['hgh', 'somatropina', '191aa', 'anti-aging', 'ansomone', 'kit'],
  imageAlt: 'Kit Ansomone HGH 100 UI 10 flaconi ormone della crescita',
  imageUrl:
  'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&q=80'
},
{
  id: 'p014',
  name: 'Somatropina HGH 200 UI Kit',
  slug: 'somatropina-hgh-200ui',
  brand: 'Ansomone',
  brandSlug: 'ansomone',
  category: 'hgh',
  price: 340.0,
  originalPrice: 400.0,
  sku: 'ANS-HGH-200UI-KIT',
  availability: 'InStock',
  rating: 4.8,
  reviewCount: 54,
  shortDescription: 'Kit grande da 200 UI per cicli lunghi di HGH.',
  description:
  "Kit Ansomone da 200 UI composto da 10 flaconi da 20 UI ciascuno. Ideale per cicli di HGH di 6 mesi o più, offrendo un risparmio significativo rispetto all'acquisto di kit singoli da 100 UI.",
  tags: ['hgh', 'somatropina', '191aa', 'kit-grande', 'ciclo-lungo'],
  imageAlt: 'Kit Ansomone HGH 200 UI 10 flaconi ormone della crescita'
},
// Lawless Labs — SARMs
{
  id: 'p006',
  name: 'Ostarine MK-2866 25mg',
  slug: 'ostarine-mk2866-25mg',
  brand: 'Lawless Labs',
  brandSlug: 'lawless-labs',
  category: 'sarms',
  price: 52.0,
  sku: 'LL-OST-25-60CPR',
  availability: 'InStock',
  rating: 4.5,
  reviewCount: 234,
  shortDescription:
  'SARM più studiato, ideale per recomping e preservazione muscolare.',
  description:
  "L'Ostarine (MK-2866) è il SARM più ricercato e documentato clinicamente. Si lega selettivamente ai recettori degli androgeni nel tessuto muscolare e osseo, promuovendo la crescita muscolare con effetti minimi su altri organi. Ottimo per recomping e cicli di definizione.",
  tags: ['ostarine', 'mk-2866', 'sarms', 'recomping', 'definizione'],
  imageAlt: '60 capsule Ostarine MK-2866 25mg Lawless Labs',
  imageUrl:
  'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&q=80'
},
{
  id: 'p015',
  name: 'LGD-4033 Ligandrol 10mg',
  slug: 'lgd-4033-ligandrol-10mg',
  brand: 'Lawless Labs',
  brandSlug: 'lawless-labs',
  category: 'sarms',
  price: 58.0,
  sku: 'LL-LGD-10-60CPR',
  availability: 'InStock',
  rating: 4.6,
  reviewCount: 178,
  shortDescription:
  'SARM potente per la crescita muscolare, alternativa agli steroidi.',
  description:
  'Il LGD-4033 (Ligandrol) è uno dei SARMs più potenti per la crescita muscolare. Studi clinici hanno dimostrato aumenti significativi della massa muscolare magra anche a basse dosi (1-10mg/giorno). Ottimo per cicli di massa.',
  tags: ['lgd-4033', 'ligandrol', 'sarms', 'massa', 'potente'],
  imageAlt: '60 capsule LGD-4033 Ligandrol 10mg Lawless Labs'
},
{
  id: 'p016',
  name: 'RAD-140 Testolone 10mg',
  slug: 'rad-140-testolone-10mg',
  brand: 'Lawless Labs',
  brandSlug: 'lawless-labs',
  category: 'sarms',
  price: 62.0,
  sku: 'LL-RAD-10-60CPR',
  availability: 'InStock',
  rating: 4.5,
  reviewCount: 143,
  shortDescription:
  'SARM con il più alto rapporto anabolico/androgeno tra i SARMs.',
  description:
  'Il RAD-140 (Testolone) ha il rapporto anabolico/androgeno più elevato tra tutti i SARMs conosciuti (90:1 rispetto al testosterone). Promuove la crescita muscolare e la perdita di grasso simultaneamente, con minima soppressione ormonale.',
  tags: ['rad-140', 'testolone', 'sarms', 'anabolico', 'recomping'],
  imageAlt: '60 capsule RAD-140 Testolone 10mg Lawless Labs'
},
// AstraZeneca — PCT
{
  id: 'p007',
  name: 'Tamoxifene 20mg — Nolvadex',
  slug: 'tamoxifene-nolvadex-20mg',
  brand: 'AstraZeneca',
  brandSlug: 'astra-zeneca',
  category: 'pct',
  price: 24.0,
  sku: 'AZ-TAM-20-30CPR',
  availability: 'InStock',
  rating: 4.9,
  reviewCount: 178,
  shortDescription:
  'SERM essenziale per la terapia post-ciclo e il controllo degli estrogeni.',
  description:
  "Il Tamoxifene (Nolvadex) è un modulatore selettivo dei recettori degli estrogeni (SERM) fondamentale in ogni protocollo PCT. Blocca i recettori estrogenici nell'ipofisi, stimolando la produzione di LH e FSH e quindi il ripristino della produzione endogena di testosterone.",
  tags: ['tamoxifene', 'nolvadex', 'serm', 'pct', 'estrogeni', 'post-ciclo'],
  imageAlt: '30 compresse Tamoxifene 20mg Nolvadex AstraZeneca'
},
{
  id: 'p017',
  name: 'Anastrozolo 1mg — Arimidex',
  slug: 'anastrozolo-arimidex-1mg',
  brand: 'AstraZeneca',
  brandSlug: 'astra-zeneca',
  category: 'pct',
  price: 38.0,
  sku: 'AZ-ANA-1-28CPR',
  availability: 'InStock',
  rating: 4.8,
  reviewCount: 134,
  shortDescription:
  "Inibitore dell'aromatasi per il controllo degli estrogeni durante il ciclo.",
  description:
  "L'Anastrozolo (Arimidex) è un inibitore dell'aromatasi di terza generazione che riduce la conversione del testosterone in estradiolo. Utilizzato durante i cicli di steroidi aromatizzanti per prevenire ginecomastia e ritenzione idrica.",
  tags: ['anastrozolo', 'arimidex', 'ai', 'aromatasi', 'estrogeni', 'pct'],
  imageAlt: '28 compresse Anastrozolo 1mg Arimidex AstraZeneca'
},
// Peptide Sciences — Peptidi
{
  id: 'p008',
  name: 'BPC-157 5mg Peptide',
  slug: 'bpc-157-5mg',
  brand: 'Peptide Sciences',
  brandSlug: 'peptide-sciences',
  category: 'peptidi',
  price: 38.0,
  sku: 'PS-BPC157-5MG',
  availability: 'InStock',
  rating: 4.8,
  reviewCount: 156,
  shortDescription:
  'Peptide per la rigenerazione tissutale e il recupero da infortuni.',
  description:
  'Il BPC-157 (Body Protection Compound 157) è un pentadecapeptide derivato da una proteina presente nel succo gastrico umano. Studi preclinici mostrano potenti effetti rigenerativi su tendini, legamenti, muscoli e tessuto gastrointestinale.',
  tags: ['bpc-157', 'peptide', 'recupero', 'tendini', 'rigenerazione'],
  imageAlt: 'Flaconcino BPC-157 5mg Peptide Sciences liofilizzato'
},
{
  id: 'p018',
  name: 'TB-500 Thymosin Beta-4 5mg',
  slug: 'tb-500-thymosin-beta4-5mg',
  brand: 'Peptide Sciences',
  brandSlug: 'peptide-sciences',
  category: 'peptidi',
  price: 45.0,
  sku: 'PS-TB500-5MG',
  availability: 'InStock',
  rating: 4.7,
  reviewCount: 98,
  shortDescription:
  'Peptide sistemico per la guarigione di muscoli, tendini e legamenti.',
  description:
  'Il TB-500 (Thymosin Beta-4) è un peptide sistemico che promuove la guarigione e la rigenerazione di muscoli, tendini, legamenti e tessuto cardiaco. A differenza del BPC-157, il TB-500 ha effetti sistemici e può raggiungere siti di lesione lontani dal punto di iniezione.',
  tags: ['tb-500', 'thymosin', 'peptide', 'guarigione', 'sistemico'],
  imageAlt: 'Flaconcino TB-500 Thymosin Beta-4 5mg Peptide Sciences'
},
{
  id: 'p019',
  name: 'Ipamorelin 5mg',
  slug: 'ipamorelin-5mg',
  brand: 'Peptide Sciences',
  brandSlug: 'peptide-sciences',
  category: 'peptidi',
  price: 32.0,
  sku: 'PS-IPA-5MG',
  availability: 'InStock',
  rating: 4.6,
  reviewCount: 112,
  shortDescription:
  'Secretagogo selettivo del GH, senza effetti collaterali del cortisolo.',
  description:
  "L'Ipamorelin è un pentapeptide secretagogo dell'ormone della crescita altamente selettivo. A differenza di altri GHRP come GHRP-2 e GHRP-6, l'Ipamorelin non stimola il rilascio di cortisolo o prolattina, rendendolo il secretagogo del GH con il miglior profilo di sicurezza.",
  tags: ['ipamorelin', 'ghrp', 'hgh', 'secretagogo', 'anti-aging'],
  imageAlt: 'Flaconcino Ipamorelin 5mg Peptide Sciences liofilizzato'
},
{
  id: 'p020',
  name: 'CJC-1295 DAC 2mg',
  slug: 'cjc-1295-dac-2mg',
  brand: 'Peptide Sciences',
  brandSlug: 'peptide-sciences',
  category: 'peptidi',
  price: 42.0,
  sku: 'PS-CJC-DAC-2MG',
  availability: 'InStock',
  rating: 4.5,
  reviewCount: 87,
  shortDescription:
  'GHRH analogo a lunga durata per il rilascio pulsatile del GH.',
  description:
  "Il CJC-1295 con DAC (Drug Affinity Complex) è un analogo del GHRH (Growth Hormone Releasing Hormone) con emivita estesa di 6-8 giorni grazie alla tecnologia DAC. Stimola il rilascio pulsatile dell'ormone della crescita, mimando la secrezione fisiologica.",
  tags: ['cjc-1295', 'ghrh', 'hgh', 'dac', 'lunga-durata'],
  imageAlt: 'Flaconcino CJC-1295 DAC 2mg Peptide Sciences liofilizzato'
},
// Magnus Pharmaceuticals — ORMONI
{
  id: 'p021',
  name: 'T3 Cytomel 25mcg — Liotironina',
  slug: 't3-cytomel-25mcg',
  brand: 'Magnus Pharmaceuticals',
  brandSlug: 'magnus-pharmaceuticals',
  category: 'ormoni',
  price: 22.0,
  sku: 'MP-T3-25-100CPR',
  availability: 'InStock',
  rating: 4.6,
  reviewCount: 134,
  shortDescription:
  'Ormone tiroideo T3 per accelerare il metabolismo e la lipolisi.',
  description:
  "La Liotironina (T3) è la forma attiva dell'ormone tiroideo. Accelera significativamente il metabolismo basale, aumentando la termogenesi e la lipolisi. Utilizzata in combinazione con altri composti nelle fasi di definizione avanzata. Dosaggio tipico: 25-75mcg/giorno.",
  tags: ['t3', 'tiroideo', 'metabolismo', 'lipolisi', 'definizione'],
  imageAlt: '100 compresse T3 Cytomel 25mcg Magnus Pharmaceuticals'
},
{
  id: 'p022',
  name: 'HCG 5000 UI — Gonadotropina',
  slug: 'hcg-5000ui',
  brand: 'Magnus Pharmaceuticals',
  brandSlug: 'magnus-pharmaceuticals',
  category: 'ormoni',
  price: 28.0,
  sku: 'MP-HCG-5000-1FL',
  availability: 'InStock',
  rating: 4.8,
  reviewCount: 89,
  shortDescription:
  'Gonadotropina corionica umana per PCT e mantenimento testicolare.',
  description:
  "L'HCG (Gonadotropina Corionica Umana) è un ormone peptidico che mima l'azione dell'LH ipofisario. Fondamentale nella PCT per stimolare la ripresa della produzione endogena di testosterone e prevenire l'atrofia testicolare durante cicli prolungati.",
  tags: ['hcg', 'gonadotropina', 'pct', 'testosterone', 'ormone'],
  imageAlt: 'Flaconcino HCG 5000 UI Magnus Pharmaceuticals liofilizzato'
},
{
  id: 'p023',
  name: 'IGF-1 LR3 100mcg',
  slug: 'igf-1-lr3-100mcg',
  brand: 'Peptide Sciences',
  brandSlug: 'peptide-sciences',
  category: 'ormoni',
  price: 55.0,
  originalPrice: 68.0,
  sku: 'PS-IGF1-LR3-100MCG',
  availability: 'InStock',
  rating: 4.7,
  reviewCount: 67,
  shortDescription:
  'Fattore di crescita insulino-simile per ipertrofia muscolare avanzata.',
  description:
  "L'IGF-1 LR3 (Insulin-like Growth Factor 1 Long R3) è una variante modificata dell'IGF-1 endogeno con emivita estesa da 10 minuti a 20-30 ore. Promuove la proliferazione e differenziazione delle cellule muscolari (iperplasia), complementando gli effetti anabolici dell'HGH.",
  tags: ['igf-1', 'lr3', 'ormone', 'ipertrofia', 'avanzato'],
  imageAlt: 'Flaconcino IGF-1 LR3 100mcg Peptide Sciences liofilizzato'
},
{
  id: 'p024',
  name: 'T4 Tiroxina 100mcg',
  slug: 't4-tiroxina-100mcg',
  brand: 'Balkan Pharmaceuticals',
  brandSlug: 'balkan-pharmaceuticals',
  category: 'ormoni',
  price: 18.0,
  sku: 'BP-T4-100-100CPR',
  availability: 'InStock',
  rating: 4.4,
  reviewCount: 78,
  shortDescription:
  'Ormone tiroideo T4 per supporto metabolico a rilascio prolungato.',
  description:
  "La Tiroxina (T4) è la forma di deposito dell'ormone tiroideo, convertita in T3 attivo nei tessuti periferici. Utilizzata per il supporto metabolico a lungo termine, offre un effetto più graduale rispetto al T3 diretto. Spesso combinata con T3 per un profilo tiroideo ottimale.",
  tags: ['t4', 'tiroxina', 'tiroideo', 'metabolismo', 'ormone'],
  imageAlt: '100 compresse T4 Tiroxina 100mcg Balkan Pharmaceuticals'
},
// Hilma Biocare — VITAMINE
{
  id: 'p025',
  name: 'Vitamina D3 + K2 5000 UI',
  slug: 'vitamina-d3-k2-5000ui',
  brand: 'Hilma Biocare',
  brandSlug: 'hilma-biocare',
  category: 'vitamine',
  price: 16.0,
  sku: 'HB-VD3K2-5000-90CPR',
  availability: 'InStock',
  rating: 4.9,
  reviewCount: 267,
  shortDescription:
  'Combinazione ottimale di D3 e K2 per salute ossea, muscolare e immunitaria.',
  description:
  "La Vitamina D3 (colecalciferolo) combinata con la Vitamina K2 (menachinone MK-7) rappresenta la sinergia ottimale per la salute ossea e cardiovascolare. La D3 aumenta l'assorbimento del calcio, mentre la K2 ne dirige il deposito nelle ossa prevenendo la calcificazione arteriosa. Fondamentale per atleti con carenza di D3.",
  tags: ['vitamina-d3', 'vitamina-k2', 'ossa', 'immunità', 'testosterone'],
  imageAlt: '90 capsule Vitamina D3 5000 UI + K2 Hilma Biocare'
},
{
  id: 'p026',
  name: 'ZMA — Zinco Magnesio B6',
  slug: 'zma-zinco-magnesio-b6',
  brand: 'Hilma Biocare',
  brandSlug: 'hilma-biocare',
  category: 'vitamine',
  price: 14.0,
  sku: 'HB-ZMA-90CPR',
  availability: 'InStock',
  rating: 4.5,
  reviewCount: 198,
  shortDescription:
  'Formula ZMA per supporto al testosterone, recupero e qualità del sonno.',
  description:
  'La formula ZMA (Zinco aspartato, Magnesio aspartato, Vitamina B6) è uno degli integratori più utilizzati dagli atleti per supportare la produzione naturale di testosterone, migliorare la qualità del sonno e accelerare il recupero muscolare. Lo zinco è cofondamentale per la sintesi del testosterone.',
  tags: ['zinco', 'magnesio', 'zma', 'testosterone', 'recupero', 'sonno'],
  imageAlt: '90 capsule ZMA Zinco Magnesio B6 Hilma Biocare'
},
{
  id: 'p027',
  name: 'Omega-3 Fish Oil 1000mg',
  slug: 'omega-3-fish-oil-1000mg',
  brand: 'Hilma Biocare',
  brandSlug: 'hilma-biocare',
  category: 'vitamine',
  price: 12.0,
  sku: 'HB-OM3-1000-90CPR',
  availability: 'InStock',
  rating: 4.7,
  reviewCount: 312,
  shortDescription:
  'Olio di pesce ad alta concentrazione EPA/DHA per salute cardiovascolare.',
  description:
  "Gli acidi grassi Omega-3 (EPA e DHA) sono essenziali per la salute cardiovascolare, la riduzione dell'infiammazione e il supporto cognitivo. Per gli atleti, gli Omega-3 riducono il DOMS (dolori muscolari post-allenamento), migliorano la sensibilità insulinica e supportano la salute articolare.",
  tags: ['omega-3', 'epa', 'dha', 'cardiovascolare', 'anti-infiammatorio'],
  imageAlt: '90 capsule Omega-3 Fish Oil 1000mg Hilma Biocare'
},
{
  id: 'p028',
  name: 'Vitamina C 1000mg + Bioflavonoidi',
  slug: 'vitamina-c-1000mg',
  brand: 'Balkan Pharmaceuticals',
  brandSlug: 'balkan-pharmaceuticals',
  category: 'vitamine',
  price: 10.0,
  sku: 'BP-VC-1000-60CPR',
  availability: 'InStock',
  rating: 4.6,
  reviewCount: 189,
  shortDescription:
  'Vitamina C ad alto dosaggio con bioflavonoidi per massimo assorbimento.',
  description:
  "La Vitamina C (acido ascorbico) è un potente antiossidante idrosolubile essenziale per la sintesi del collagene, la funzione immunitaria e la protezione dallo stress ossidativo indotto dall'esercizio intenso. I bioflavonoidi aumentano la biodisponibilità della vitamina C del 35%.",
  tags: ['vitamina-c', 'antiossidante', 'immunità', 'collagene', 'recupero'],
  imageAlt:
  '60 compresse Vitamina C 1000mg Bioflavonoidi Balkan Pharmaceuticals'
},

// ── OutOfStock Products ─────────────────────────────────
{
  id: 'p029',
  name: 'Dianabol 10mg — Methandienone',
  slug: 'dianabol-methandienone-10mg',
  brand: 'Balkan Pharmaceuticals',
  brandSlug: 'balkan-pharmaceuticals',
  category: 'anabolizzanti',
  price: 35.0,
  originalPrice: 42.0,
  sku: 'BP-DBOL-10-100CPR',
  availability: 'OutOfStock',
  rating: 4.7,
  reviewCount: 423,
  shortDescription:
  'Lo steroide orale più popolare per la massa muscolare rapida.',
  description:
  'Il Methandienone (Dianabol) è uno degli steroidi anabolizzanti orali più conosciuti e utilizzati al mondo. Sviluppato negli anni 50 dal Dr. John Ziegler per il team olimpico americano, è noto per i rapidi guadagni di massa muscolare e forza. Dosaggio tipico: 20-50mg/giorno per 4-6 settimane.',
  tags: ['dianabol', 'methandienone', 'orale', 'massa', 'forza', 'classico'],
  imageAlt:
  '100 compresse Dianabol 10mg Methandienone Balkan Pharmaceuticals'
},
{
  id: 'p030',
  name: 'Boldenone Undecylenate 250mg/ml',
  slug: 'boldenone-undecylenate-250',
  brand: 'Magnus Pharmaceuticals',
  brandSlug: 'magnus-pharmaceuticals',
  category: 'anabolizzanti',
  price: 52.0,
  sku: 'MP-BOLD-250-10ML',
  availability: 'OutOfStock',
  rating: 4.6,
  reviewCount: 156,
  shortDescription:
  'Equipoise — steroide iniettabile per massa magra e vascolarità.',
  description:
  'Il Boldenone Undecylenate (Equipoise) è uno steroide anabolizzante iniettabile derivato dal testosterone con emivita di 14 giorni. Promuove la crescita muscolare magra, aumenta la vascolarità e stimola la produzione di eritropoietina (EPO), migliorando la resistenza.',
  tags: [
  'boldenone',
  'equipoise',
  'iniettabile',
  'massa-magra',
  'vascolarità'],

  imageAlt:
  'Flaconcino 10ml Boldenone Undecylenate 250mg Magnus Pharmaceuticals'
},

// ── PreOrder Products ───────────────────────────────────
{
  id: 'p031',
  name: 'Primobolan Depot 100mg/ml',
  slug: 'primobolan-depot-100',
  brand: 'Hilma Biocare',
  brandSlug: 'hilma-biocare',
  category: 'anabolizzanti',
  price: 95.0,
  sku: 'HB-PRIMO-100-10ML',
  availability: 'PreOrder',
  rating: 4.9,
  reviewCount: 78,
  shortDescription:
  'Metenolone Enantato — lo steroide preferito di Arnold per la definizione.',
  description:
  'Il Primobolan Depot (Metenolone Enantato) è considerato uno degli steroidi anabolizzanti più sicuri e raffinati. Non aromatizza, non causa ritenzione idrica e offre guadagni muscolari di altissima qualità. Ideale per cicli di definizione avanzata e per atleti donne.',
  tags: [
  'primobolan',
  'metenolone',
  'iniettabile',
  'definizione',
  'sicuro',
  'donne'],

  imageAlt: 'Flaconcino 10ml Primobolan Depot 100mg Hilma Biocare'
},
{
  id: 'p032',
  name: 'Melanotan II 10mg',
  slug: 'melanotan-ii-10mg',
  brand: 'Peptide Sciences',
  brandSlug: 'peptide-sciences',
  category: 'peptidi',
  price: 28.0,
  sku: 'PS-MT2-10MG',
  availability: 'PreOrder',
  rating: 4.4,
  reviewCount: 201,
  shortDescription: 'Peptide melanocortina per abbronzatura e protezione UV.',
  description:
  "Il Melanotan II è un analogo sintetico dell'ormone alfa-melanocita-stimolante (α-MSH). Stimola la produzione di melanina nella pelle, producendo un'abbronzatura naturale senza esposizione prolungata ai raggi UV. Effetti collaterali comuni: nausea iniziale, appetito ridotto.",
  tags: ['melanotan', 'mt2', 'peptide', 'abbronzatura', 'melanina'],
  imageAlt: 'Flaconcino Melanotan II 10mg Peptide Sciences liofilizzato'
},

// ── Additional products for thin categories ─────────────
{
  id: 'p033',
  name: 'Clomifene 50mg — Clomid',
  slug: 'clomifene-clomid-50mg',
  brand: 'Balkan Pharmaceuticals',
  brandSlug: 'balkan-pharmaceuticals',
  category: 'pct',
  price: 20.0,
  sku: 'BP-CLOM-50-30CPR',
  availability: 'InStock',
  rating: 4.7,
  reviewCount: 267,
  shortDescription:
  'SERM fondamentale per la PCT — stimola LH e FSH per il ripristino ormonale.',
  description:
  "Il Clomifene (Clomid) è un modulatore selettivo dei recettori degli estrogeni (SERM) ampiamente utilizzato nella terapia post-ciclo. Stimola il rilascio di LH e FSH dall'ipofisi, accelerando il ripristino della produzione endogena di testosterone dopo un ciclo di steroidi.",
  tags: ['clomifene', 'clomid', 'serm', 'pct', 'lh', 'fsh', 'post-ciclo'],
  imageAlt: '30 compresse Clomifene 50mg Clomid Balkan Pharmaceuticals'
},
{
  id: 'p034',
  name: 'Cardarine GW-501516 10mg',
  slug: 'cardarine-gw501516-10mg',
  brand: 'Lawless Labs',
  brandSlug: 'lawless-labs',
  category: 'sarms',
  price: 48.0,
  sku: 'LL-GW-10-60CPR',
  availability: 'InStock',
  rating: 4.7,
  reviewCount: 189,
  shortDescription:
  'Agonista PPARδ per resistenza estrema e ossidazione dei grassi.',
  description:
  "Il Cardarine (GW-501516) è tecnicamente un agonista del recettore PPARδ, non un SARM. Aumenta drasticamente la resistenza cardiovascolare e l'ossidazione degli acidi grassi. Studi mostrano un aumento del 50% nella capacità di esercizio aerobico. Non causa soppressione ormonale.",
  tags: [
  'cardarine',
  'gw-501516',
  'ppar',
  'resistenza',
  'bruciagrassi',
  'no-soppressione'],

  imageAlt: '60 capsule Cardarine GW-501516 10mg Lawless Labs'
},
{
  id: 'p035',
  name: 'Insulina Glargine 100 UI/ml',
  slug: 'insulina-glargine-100ui',
  brand: 'Magnus Pharmaceuticals',
  brandSlug: 'magnus-pharmaceuticals',
  category: 'ormoni',
  price: 45.0,
  sku: 'MP-INS-GLAR-100UI',
  availability: 'InStock',
  rating: 4.3,
  reviewCount: 34,
  shortDescription:
  'Insulina basale a lunga durata per protocolli avanzati di massa.',
  description:
  "L'Insulina Glargine è un analogo dell'insulina umana a lunga durata d'azione (24 ore). Nel bodybuilding avanzato, viene utilizzata per massimizzare il trasporto di nutrienti nelle cellule muscolari, potenziando la sintesi proteica e il recupero. ATTENZIONE: uso estremamente avanzato, rischio ipoglicemia.",
  tags: ['insulina', 'glargine', 'ormone', 'massa', 'avanzato', 'nutrienti'],
  imageAlt: 'Penna Insulina Glargine 100 UI/ml Magnus Pharmaceuticals'
},
{
  id: 'p036',
  name: 'Sibutramina 15mg',
  slug: 'sibutramina-15mg',
  brand: 'Sopharma',
  brandSlug: 'sopharma',
  category: 'bruciagrassi',
  price: 28.0,
  sku: 'SP-SIB-15-30CPR',
  availability: 'InStock',
  rating: 4.2,
  reviewCount: 145,
  shortDescription:
  "Inibitore della ricaptazione di serotonina e noradrenalina per il controllo dell'appetito.",
  description:
  "La Sibutramina è un farmaco anoressizzante che agisce come inibitore della ricaptazione della serotonina e della noradrenalina (SNRI). Riduce significativamente l'appetito e aumenta il senso di sazietà, facilitando il deficit calorico durante le fasi di definizione.",
  tags: ['sibutramina', 'anoressizzante', 'appetito', 'definizione', 'snri'],
  imageAlt: '30 compresse Sibutramina 15mg Sopharma'
},
{
  id: 'p037',
  name: 'GHRP-6 5mg',
  slug: 'ghrp-6-5mg',
  brand: 'Peptide Sciences',
  brandSlug: 'peptide-sciences',
  category: 'peptidi',
  price: 25.0,
  sku: 'PS-GHRP6-5MG',
  availability: 'InStock',
  rating: 4.5,
  reviewCount: 134,
  shortDescription:
  'Secretagogo del GH con potente effetto sulla fame e il rilascio di GH.',
  description:
  "Il GHRP-6 (Growth Hormone Releasing Peptide 6) è un esapeptide che stimola potentemente il rilascio dell'ormone della crescita dalla ghiandola pituitaria. A differenza dell'Ipamorelin, il GHRP-6 stimola anche il rilascio di grelina, aumentando significativamente l'appetito — utile per chi fatica a mangiare abbastanza in fase di massa.",
  tags: ['ghrp-6', 'peptide', 'hgh', 'secretagogo', 'appetito', 'massa'],
  imageAlt: 'Flaconcino GHRP-6 5mg Peptide Sciences liofilizzato'
},
{
  id: 'p038',
  name: 'MK-677 Ibutamoren 25mg',
  slug: 'mk-677-ibutamoren-25mg',
  brand: 'Lawless Labs',
  brandSlug: 'lawless-labs',
  category: 'hgh',
  price: 55.0,
  sku: 'LL-MK677-25-60CPR',
  availability: 'InStock',
  rating: 4.6,
  reviewCount: 212,
  shortDescription:
  "Secretagogo orale del GH — alternativa non iniettabile all'HGH.",
  description:
  "L'MK-677 (Ibutamoren) è un secretagogo orale dell'ormone della crescita che mima l'azione della grelina. Aumenta i livelli di GH e IGF-1 senza sopprimere la produzione endogena. Vantaggi: somministrazione orale, nessuna iniezione, effetti anti-aging, miglioramento del sonno e della composizione corporea.",
  tags: [
  'mk-677',
  'ibutamoren',
  'hgh',
  'secretagogo',
  'orale',
  'igf-1',
  'sonno'],

  imageAlt: '60 capsule MK-677 Ibutamoren 25mg Lawless Labs'
},
{
  id: 'p039',
  name: 'Multivitaminico Sport Complex',
  slug: 'multivitaminico-sport-complex',
  brand: 'Hilma Biocare',
  brandSlug: 'hilma-biocare',
  category: 'vitamine',
  price: 18.0,
  sku: 'HB-MULTI-SPORT-90CPR',
  availability: 'InStock',
  rating: 4.8,
  reviewCount: 345,
  shortDescription:
  'Formula completa con 25 vitamine e minerali ottimizzata per atleti.',
  description:
  "Il Multivitaminico Sport Complex è una formula avanzata contenente 25 vitamine e minerali essenziali in dosaggi ottimizzati per atleti e sportivi. Include dosi elevate di Vitamina D3, Zinco, Magnesio, Vitamina B12 e antiossidanti per supportare il recupero, l'energia e la funzione immunitaria durante periodi di allenamento intenso.",
  tags: [
  'multivitaminico',
  'sport',
  'minerali',
  'recupero',
  'energia',
  'completo'],

  imageAlt: '90 compresse Multivitaminico Sport Complex Hilma Biocare'
}];


export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAllBrands(): Brand[] {
  return BRANDS;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.brandSlug === brandSlug);
}

export function searchProducts(query: string): Product[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.shortDescription.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q))
  );
}