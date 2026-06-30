# Operation Bellatrix 2026 CTF
Voici le writeup du CTF Bellatrix 2026 "Operation Orion" organisé par COMCYBER en mars 2026.

## Sommaire
### Phase 1 - Analysis
- [Un message d'alerte](#challenge-1)
- [Trop beau pour être vrai (optionnel)](#challenge-2)
- [(Dé)-Crédibiliser l'information (optionnel)](#challenge-3)
- [La vidéo du sauvetage](#challenge-4)
- [Au service d'une cause](#challenge-5)
- [Rétablir la véracité des faits](#challenge-6)
- [Identifier le primo-diffuseur](#challenge-7)
- [Une metadata vaut mille images (optionnel)](#challenge-8)
### Phase 2 - Technical
- [Surveillance du réseau social](#challenge-9)
- [La piste de l'organisation](#challenge-10)
- [Fouiller le site](#challenge-11)
- [Nos réalisations ...](#challenge-12)
- [La piste du financement](#challenge-13)
- [Analyse WHOIS des domaines suspects](#challenge-14)
- [Découverte de preuves cachées (optionnel)](#challenge-15)

# Phase 1 - Analysis

## Challenge 1
### Un message d'alerte
On a ici un challenge qui requiert de trouver un blog diffusant des fausses informations sur l'armée française.
Notre seule ressource disponible est une capture d'écran d'un post supprimé mentionnant ce blog :
![Capture Rafale](img/rafale.png)

Sur cette capture, on peut voir la mention d'un blog du nom de global-news-maq, on va donc essayer de voir si on peut trouver ce blog. On va d'abord essayer de trouver le domaine du site, donc on essaie `global-news-maq.fr`, `global-news-maq.com`, jusqu'a arriver à `global-news-maq.info`, qui fonctionne ! Cela nous donne le site suivant :
![Global News Maq](img/globalnews.png)

Cela correspond bien à un site de désinformation qui diffuserait des fausses informations un peu partout sur les réseaux !

On entre donc l'url du blog en tant que flag et ça valide le challenge :
> BELLATRIX{global-news-maq.info}
 
## Challenge 2
### Trop beau pour etre vrai
#### OPTIONNEL
On nous dit ici que le logo du site trouvé dans le challenge précédent (*Un message d'alerte*), est pris d'un autre site de news connu. 
![Global News Maq Logo](img/logoglobalnews.png)

En faisant une recherche inversée sur ce logo, ou en recherchant `Global News`, qui est un terme plutot commun utilisé par les sites d'information, on tombe sur un site au logo ressemblant :
![Vrai Global News](img/vraiglobalnews.png)

On essaie donc d'entrer l'url de ce site en tant que flag et ça marche :
> BELLATRIX{globalnews.ca}

## Challenge 3
### (Dé)-Crédibiliser l'information
#### OPTIONNEL
Toujours en rapport avec le blog de désinformation, on doit cette fois-ci trouver les faux experts mentionnés dans les articles, et qui servent d'argument d'autorité pour convaincre les lecteurs de la véracité des propos. On va donc voir sur l'article qui contient le témoignage d'un "expert" : *EXCLUSIF : L’EXPERTISE ACCABLANTE SUR LE GRIFFON, NOUVEAU BLINDÉ DE L’ARMÉE FRANÇAISE*.
Il nous est spécifiquement demandé de relever les incohérences concernant ces experts. 

En regardant la description de l'article, on peut voir que le Dr. Pierre Martin est censé être ingénieur dans l'armement, et consultant DPLG :
>Le Dr. Pierre Martin, ingénieur en armement diplômé de l’école de l’armement du cap d’Agde et consultant **DPLG**, a mené une expertise indépendante sur le VBMR Griffon, nouveau blindé de l’armée française. Ses conclusions sont accablantes.

Et au final, en lisant le rapport d'expertise, on peut y voir que ce fameux *"Pierre Martin"* y est décrit comme consultant OTAN :

![Preuve Pierre Martin](img/preuvemartin.png)

Cette incohérence constitue le flag de ce challenge :
>BELLATRIX{dplg}

## Challenge 4
### La vidéo du sauvetage 
On nous demande ici de retrouver une vidéo et d'identifier le site d'où elle provient. On commence d'abord par trouver l'article auquel une video est liée, et on la trouve sous l'article `MASSACRE DANS LE GOLFE DE GASCOGNE : LA FRANCE COMMET UN CRIME DE GUERRE CONTRE DES AQUILONNIENS SANS DÉFENSE !` :
![Video](img/video.png)

En analysant le code HTML de cette partie du blog, on y voit le lien vers le site d'où provient la vidéo :
![Video Provenance](img/provenancevideo.png)

On essaie donc le domaine du site en tant que flag et cela valide le challenge :
>BELLATRIX{passion-video.tech}

## Challenge 5
### Au service d'une cause
On nous demande cette fois de trouver la source de la vidéo trouvée précédemment et de suivre son utilisation sur d'autres blogs pour comprendre d'où elle vient et si une information réelle se cache derrière.

On se rend donc d'abord sur le site dont on avait trouvé l'url au challenge précédent (*passion-video.tech*) et on va naviguer dans les posts pour trouver quelque chose en lien avec la vidéo. Au bout d'un moment, on finit par trouver un post qui utilise la vidéo :
![Rafale Forum](img/rafaleforum.png)

Dans les commentaires on trouve quelqu'un qui explique qu'un autre site utilise la vidéo :
>La vidéo semble avoir été reprise sur le site https://le-mercurien-victorieux.info/

On se rend donc sur le site et on essaie de trouver un article en rapport avec la vidéo ou un des sujets de celle-ci (le rafale, le golfe de gascogne, etc) et bingo ! On trouve un article réutilisant la vidéo :
![Rafale Forum 2](img/rafaleforum2.png)

L'article semble encore intérpréter différemment les événements de la vidéo, cette fois-ci indiquant que des pêcheurs se sont fait attaquer par l'armée.
Encore dans les commentaires de l'article, on peut trouver un utilisateur qui dément l'opinion de l'article :
>Cet article est un tissu de mensonge, cette info a été debunké sur https://debunk-officiel-fr.site/ !
Ce n’est pas une attaque contre des civils c’est un abordage. Il semble que Lynx ait été capturée !

On comprend donc, grace à l'article de debunk-officiel-fr que la vidéo représente en fait un abordage par l'armée aquilonienne, qui termine sur le kidnapping de Lynx, contrairement à ce que disaient les précédents articles, qui eux liaient plutot la vidéo à une attaque de l'armée française sur des civils aquiloniens. On peut donc identifier le site `le-mercurien-victorieux.info` comme étant le site à l'origine de la fausse information et on a donc le flag de ce challenge :

>BELLATRIX{le-mercurien-victorieux.info}

## Challenge 6
### Rétablir la véracité des faits
On nous demande d'enqueter sur les moyens de relayer les bonnes informations dont le debunk dont on a parlé dans le challenge précédent. Je commence donc à fouiller le fameux site (*https://debunk-officiel-fr.site/*) que l'on avait trouvé, mais en essayant plusieurs formats de flags à partir de ça, cela ne fonctionne pas.

Je finis par revenir sur le site à l'origine de la fake news, et essaie de former un flag avec le nom du commentateur qui relayait la source du débunk :
>*SoldatFr*
Cet article est un tissu de mensonge, cette info a été debunké sur https://debunk-officiel-fr.site/ !

et ça marche :
>BELLATRIX{SoldatFr}

## Challenge 7
### Identifier le primo-diffuseur
On nous demande de retrouver l'identité de la personne qui a diffusé la première fausse information.
Notre regard va naturellement se tourner vers le forum `passion-video.tech` duquel semblait partir la vidéo. On peut voir que celle-ci semble avoir été postée par un certain *marc_v* :
![Rafale Forum](img/rafaleforum.png)

En recherchant son pseudo sur `global-news-maq` parmis les commentaires de certains blogs, on peut y trouver le commentaire d'un certain Marc Veylanne :
![Marc Veylanne](img/marcveylanne.png)

On peut d'ailleurs voir qu'il redirige les lecteurs vers son blog personnel et son *Amstramgram*, qui semblent abriter ses opinions politiques et peut-etre encore plus de désinformation.

On essaie son nom en tant que flag et ça valide le challenge :
>BELLATRIX{Marc_Veylanne}

## Challenge 8
### Une metadata vaut mille images
#### OPTIONNEL
On nous demande ici d'analyser les metadata de l'image venant de l'article *VIDÉO CHOC : UNE PILOTE DE RAFALE RÉCUPÉRÉE EN MER – LA PREUVE QUE CES AVIONS SONT DES PIÈGES VOLANTS !* pour trouver des indices prouvant que celle-ci a été générée par IA. L'image est la suivante :
![Rafale IA](img/rafaleia.png)

On va donc se rendre sur un site web utilisé pour obtenir les données EXIF et metadata d'une image (`https://exiftools.com` dans mon cas) et on va analyser le résultat.

Le premier indice évident est que la photo est localisée comme ayant été prise à Gravelines, alors qu'elle est sensée avoir été prise au milieu de la mer :
![Rafale IA GPS](img/rafaleiagps.png)

Le second indice est que la description de l'image ressemble beaucoup à un prompt d'IA :
>*ImageDescription*
a photograph of leaked internal document on desk, ultra realistic, 8k, --no watermark

Enfin, on voit que le logiciel utilisé est effectivement un logiciel de génération d'images et de vidéos en Intelligence Artificielle :
>*Software*
ComfyUI 0.2.2

Ce logiciel constitue donc notre flag :
>BELLATRIX{ComfyUI_0.2.2}

# Phase 2 - Technical

## Challenge 9
### Surveillance du réseau social
Pour ce challenge, il faut analyser l'historique des postes de Marc Veylanne pour trouver certains de ses contacts. L'objectif est de cartographier ses relations.
En entrant sur Amstragram, on peut voir un ancien post de Marc mentionnant sa soeur :
![Marc Veylanne Post Soeur](img/marcvamstramgram.png)

On peut donc commencer à établir certaines de ses relations en commançant donc par sa soeur :
![Marc Veylanne Soeur](img/spichon.png)

On se sert donc de son nom pour former le flag de ce challenge :
>BELLATRIX{Sophie_Pichon}

## Challenge 10
### La piste de l'organisation
Ce challenge tourne autour de l'utilisation des informations deja récoltées pour savoir si une entreprise aquilonienne se cache derrière Marc ou certains de ses proches.

Dans la description du challenge, on nous conseille d'utiliser le site `https://aquilonie-info-societe.com/` pour trouver des documents d'entreprise mentionnant Marc ou ses proches.
Dans un premier temps, on recherche évidemment le nom de Marc Veylanne sans résultat.
Ensuite on cherche le nom de sa soeur, Sophie Pichon, et cette fois-ci on trouve des documents :
![Sophie Pichon Documents](img/sophiedocuments.png)

Tous les documents mentionnent une société du nom de *Peche fraiche SARL* dont on trouve l'url du site assez rapidement (`https://peche-fraiche.boutique/`) :
![Peche Fraiche](img/peche%20fraiche.png)

On a donc bien confirmé qu'une société aquilonienne se cache derrière Marc et ses proches.
On se sert de l'url du site pour valider le challenge :
>BELLATRIX{peche-fraiche.boutique}

## Challenge 11
### Fouiller le site
L'objectif de ce challenge est de trouver des prestataires qui participeraient à la conception du site ou qui feraient partie de la société. On va commencer à fouiller le site, parcourir les offres et les pages d'information (mentions légales, etc) mais on ne trouve pas de mention d'une autre entreprise que *Peche Fraiche*.

Cependant, en allant dans la section *A propos*, on peut y voir la mention de la développeuse du site avec en prime, son site web pro :
>Dévelopé par Helene Volquoffe, https://quoffe-telephonie.tech/

On peut donc ajouter son nom en tant que flag pour ce challenge :
>BELLATRIX{Helene_Volquoffe}

## Challenge 12
### Nos réalisations ...
Ici, nous devons fouiller les autres sites crées par cette Helene pour voir si on trouve un lien avec les autres sites qu'on a deja visités.

Dans son protfolio, en plus de *Peche Fraiche*, on trouve un site qu'on avait deja visité, et qui diffusait des fausses informations, le *Mercurien Victorieux*. Mais on trouve également un dernier site, également en lien avec *Mercure* :
![Mercure](img/portfoliohelene.png)

Un site sur Agrid Sokjon !!
Cela promet d'être interessant mais pour le moment, on entre le nom du site en tant que flag :
>BELLATRIX{agrid-sokjon.ovh}

## Challenge 13
### La piste du financement 
Apparemment un service partenaire aurait une piste sur le site *Peche Fraiche*. Ce serait potentiellement un moyen de financer les différentes campagnes de désinformation ! Mais avant de passer à la suite de l'enquête il nous faut des preuves. L'objectif de ce challenge est donc de fouiller le site pour trouver l'article suspect qui semble être le moyen de communication ou de rémuneration des attaques.

On commence par se créer un compte sur le site avec des informations fictives pour pouvoir commander des articles. On va renseigner une adresse valide (temporaire) pour pouvoir recevoir des mails au cas où.

On commence donc à feuilleter le site à la recherche d'un article suspect. Sauf qu'en surface, le site ne contient rien de visiblement suspect, alors je recherche des termes comme *aquilonie* ou *mercure* et bingo ! Je trouve une veste avec une description très étrange :
![Article suspect](img/articlesuspect.png)

Je décide donc de la commander et je reçois par mail un descriptif de commande très étrange :
![Aquilonie Unie](img/aquilonieunie.png)

Cela ressemble fortement à un lien, donc essayons d'aller sur le site et .... voila ! On a enfin découvert le pot aux roses :
![Site](img/sloganmilice.png)

Et on a en prime le slogan utilisé par la milice, dont on se sert pour former le flag :
>BELLATRIX{Vigilance_Honneur_Victoire}

## Challenge 14
### Analyse WHOIS des domaines suspects
On passe cette fois-ci à l'analyse WHOIS sur les domaines suspects qu'on a identifié jusqu'ici. Une analyse WHOIS consiste en l'utilisation de certains outils pour obtenir des informations sur des domaines comme leur date de création, leur propriétaire ou bien d'autres domaines auxquels elles sont associés, entre autres. On utilise donc l'outil qu'on nous a donné :
![WHOIS](img/whois.png)

On y entre donc certains domaines qu'on a rencontré pendant le ctf comme `peche-fraiche.boutique`, `agrid-sokjon.ovh`, `aquilonie-unie.org` ou encore `global-news-maq.info`. Pour ces 4 sites, on voit que certaines informations se répétent, notamment :
>Registrar: Njalla
>Creation Date: 2024-02-02

qui sont commun aux trois domaines.
On a donc peut-être trouvé une information capitale concernant la campagne de désinformation...

On utilise donc ces informations dans le flag et on valide :
>BELLATRIX{Njalla_02022024}

## Challenge 15
### Découverte de preuves cachées
#### OPTIONNEL
Il faut ici fouiller les fichiers *robots.txt* et *sitemap.xml* pour essayer de trouver un script php caché qui nous ouvrirait les portes vers la suite de l'enquête.

En fouillant *sitemap.xml*, on ne trouve rien de vraiment intriguant, juste la liste complète des articles du site et des pages web comme les mentions légales ou autres. En regardant *robots.txt* en revanche, on y voit la mention de pas mal de pages que le créateur du site a voulu déréférencer (rendre inaccessible par les moteurs de recherches) dont une certaine page php :
>Disallow: /sauvegardes_reduc.php

Quand on s'y rend on voit une étrange page de connexion :
![Script PHP](img/phpscript.png)

On entre donc l'url de la page en flag :
>BELLATRIX{sauvegardes_reduc.php}