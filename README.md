# Hópverkefni 2

Útfæra skal framenda ofan á vefþjónustur úr hópverkefni 1.

## Virkni

Hægt er að útfæra á móti þeirri lausn sem hópur vann í hópverkefni 1, eða nýta [sýnilausn á hópverkefni 1](https://github.com/vefforritun/vef2-2019-h1-synilausn) sem [keyrir á Heroku](https://vefforritun2-2019-h1-synilausn.herokuapp.com/).

### Haus

Í haus skal birta:

* Titil síðu, hlekkur á forsíðu
* Ef notandi er ekki innskráður:
  * Hlekki á nýkskrá og innskrá
* Ef notandi er innskráður:
  * Notandanafn, möguleika á að útskrá notanda og hlekk á pantanasíðu notanda
* Hlekk á körfu
* „Nýjar vörur“, hlekkur á forsíðu og „Flokkar“, hlekkur á flokkasíðu

### Forsíða

Á forsíðu skal birta 12 vörur frá `/products` (sem ætti að vera raðað nýjust fyrst) og lista af öllum flokkum.

### Flokkayfirlit

Á flokkayfirlitssíðu skal birta alla flokka með titli og hlekk á flokk.

### Flokkasíða

Flokkasíða birtir titil flokks og allar vörur í flokk með síðuskiptingu. Ef flokkur finnst ekki skal birta 404 síðu.

Fyrir ofan vörur skal birta leitarbox sem leitar aðeins í flokknum, eftir leit er síðuskipting að miðast við leitarniðurstöður.

### Vörusíða

Á vörusíðu skal birta valda vöru eða 404 síðu ef síða finnst ekki.

Birta skal lýsingu á vöru þar sem búið er að breyta „new lines“ `\n` í málsgreinar `<p>`.

Möguleiki skal vera að setja vöru í körfu af vörusíðu ef notandi er innskráður.

Fyrir neðan upplýsingar um vöru skal birta sex vörur úr sama flokk. Það er í lagi að varan sjálf birtist í þessum lista.

### Pantanir

Ef notandi er innskráður og skoðar pantanasíðu skal birta lista af pöntunum (í töflu) með hlekk á hverja pöntun.

Þegar stök pöntun er skoðuð skal birta upplýsingar um pöntun fyrir ofan töflu af öllum vörum í pöntun. Fyrir hverja vöru skal hafa hlekk á vöruna.

### Karfa

Á körfusíðu skal birta allar vörur sem eru í körfu. Ef ekkert er í körfu skal láta vita af því.

Fyrir hverja línu í körfu skal birta titil og mynd, ásamt möguleika til að uppfæra fjölda í körfu og eyða línu úr körfu.

Fyrir neðan línur er form sem biður um nafn og heimilisfang til að breyta körfu í pöntun.

### Annað

* Nota skal React, mælt er með að nota [`create react app`](https://github.com/facebook/create-react-app)
  * Ekki þarf að hafa _server-side rendering_ uppsett í verkefni
* Þegar kallað er í vefþjónustu skal birta loading state og bregðast við villum
* Ef síða finnst ekki skal birta 404 síðu
* Ef reynt er að skoða síðu sem ekki er heimild til að skoða (t.d. pantanir ef notandi ekki innskráður) skal birta að ekki sé heimild til að skoða
* Leyfilegt er að nota CSS eða Sass
* Skjáskot úr sýnilausn ásamt myndbandi eru undir `utlit/`
* Í sýnilausn er eftirfarandi notað:
  * 12 dálka útlit
  * Hámarksbreidd: `1400px`
  * Bil
    * Almennt: `30px`, hálft, tvöfalt og þrefalt það
  * Leturgerðir
    * Almennt: `'Open Sans', helvetica, arial, sans-serif`
    * Fyrirsagnir: `'Noto Serif', georgia, serif`
  * Litir
    * Letur / bakgrunnur: `#222`
    * Bakgrunnur / letur: `#eee`
    * Grár: `#ccc`
    * Rauður, ógild gildi: `#4e1d04`
  * Hröðun: `250ms ease-in-out`

## TypeScript grunnur

Gefinn er grunnur að virkni (út frá sýnilausn) sem notar Create React App með TypeScript. Undir `src/` er grunnur að síðum og components.

## Stjórnendavirkni

Ef notandi er stjórnandi skal hann fá aðgang að síðu þar sem hægt er að:

* Vörulisti með síðuflettingu og leit
* Vörusíða þar sem hægt er að breyta vöru og eyða
* Yfirlit yfir flokka með síðuflettingu
* Flokkasíða þar sem hægt er að breyta flokk og eyða
* Pöntunarsíða með yfirlit yfir allar pantanir með síðuflettingu
* Notendasíða með yfirliti yfir alla notendur með síðuflettingu
* Notandasíða þar sem hægt er að gera notanda að stjórnanda

Ekki er krafa um að útfæra neina eða stjórnenda virkni en ef hún er útfærð gildir hún allt að auka 30%. Ef mat er yfir 100% fæst 10 fyrir verkefnið.

## Hópavinna

Verkefnið skal unnið í hóp, helst með þremur einstaklingum. Hópar með tveim eða fjórum einstaklingum eru einnig í lagi, ekki er dregið úr kröfum fyrir færri í hóp en gerðar eru auknar kröfur ef fleiri en þrír einstaklingar eru í hóp.

Hægt er að auglýsa eftir hóp á slack á rásinni #vef2-2019-hopur.

Hafið samband við kennara ef ekki tekst eða ekki mögulegt að vinna í hóp.

## README

Í rót verkefnis skal vera `README.md` skjal sem tilgreinir:

* Upplýsingar um hvernig setja skuli upp verkefnið
* Innskráning fyrir `admin` stjórnanda ásamt lykilorði
* Nöfn og notendanöfn allra í hóp

## Git og GitHub

Verkefni þetta er sett fyrir á GitHub og almennt ætti að skila því úr einka (private) repo nemanda. Nemendur geta fengið gjaldfrjálsan aðgang að einkarepos á meðan námi stendur, sjá https://education.github.com/.

Til að byrja er hægt að afrita þetta repo og bæta við á sínu eigin:

```bash
> git clone https://github.com/vefforritun/vef2-2019-h1.git
> cd vef2-2019-h1
> git remote remove origin # fjarlægja remote sem verkefni er í
> git remote add origin <slóð á repo> # bæta við í þínu repo
> git push -u origin master # ýta á nýtt origin og tracka branch
```

## Mat

* 10% – Almenn uppsetning, útlit, haus og forsíða
* 20% – Auðkenning, nýksráning, innskráning og útskráning
* 20% – Flokkayfirlit og flokkasíða með leit og síðuflettingu
* 20% – Vörusíða
* 30% – Karfa, pöntun og pöntunarsíður
* 30% – Stjórnendavirkni (auka, sjá að ofan)

## Sett fyrir

Verkefni sett fyrir á Uglu laugardaginn 30. mars 2019.

## Skil

Einn aðili í hóp skal skila fyrir hönd allra og skila skal undir „Verkefni og hlutaprófa“ á Uglu í seinasta lagi fyrir lok dags föstudaginn 19. apríl 2018.

Skilaboð skulu innihalda:

* Slóð á GitHub repo fyrir verkefni, og dæmatímakennurum skal hafa verið boðið í repo (sjá leiðbeiningar). Notendanöfn þeirra eru `freyrdanielsson`, `gunkol`, `kth130`
* Slóð á verkefni keyrandi á Heroku
* Nöfn allra í hópnum

Fyrir skil gæti þurft að fjarlægja einhvern hópmeðlimi af repo, þ.a. hægt sé að bjóða dæmatímakennurum.

## Einkunn

Sett verða fyrir sex minni verkefni þar sem fimm bestu gilda 6% hvert, samtals 30% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 15%, samtals 30% af lokaeinkunn.

Verkefnahluti gildir 60% og lokapróf gildir 40%. Ná verður *bæði* verkefnahluta og lokaprófi með lágmarkseinkunn 5.

---

> Útgáfa 0.2

| Útgáfa | Lýsing        |
|--------|---------------|
| 0.1    | Fyrsta útgáfa |
| 0.2    | Bæta við TypeScript grunn |
