// Données du site : modifier ici les dates de vente, les tarifs et le carrousel.

export const IMG = 'https://local-fr-public.s3.eu-west-3.amazonaws.com/prod/webtool/userfiles/115601/'
export const LOGO = IMG + 'Logo/428400%20logo%20en%20cours%20v4.png'
export const TEL = '06 80 68 11 05'
export const TEL_HREF = 'tel:0680681105'
export const MAPS = 'https://www.google.com/maps/place/SCEA+Rosentritt/@49.0534908,1.762957,17z'
export const FACEBOOK = 'https://www.facebook.com/Fermedelacroixblanche78'

// [jours, mois, date du 1er jour, date du dernier jour]
export const VENTES = [["6, 7, 8","Novembre 2026","2026-11-06","2026-11-08"],["18, 19, 20","Décembre 2026","2026-12-18","2026-12-20"],["8, 9, 10","Janvier 2027","2027-01-08","2027-01-10"],["5, 6, 7","Février 2027","2027-02-05","2027-02-07"],["5, 6, 7","Mars 2027","2027-03-05","2027-03-07"],["2, 3, 4","Avril 2027","2027-04-02","2027-04-04"],["30, 1er, 2","Avril – Mai 2027","2027-04-30","2027-05-02"],["4, 5, 6","Juin 2027","2027-06-04","2027-06-06"],["2, 3, 4","Juillet 2027","2027-07-02","2027-07-04"],["3, 4, 5","Septembre 2027","2027-09-03","2027-09-05"],["1er, 2, 3","Octobre 2027","2027-10-01","2027-10-03"],["5, 6, 7","Novembre 2027","2027-11-05","2027-11-07"],["17, 18, 19","Décembre 2027","2027-12-17","2027-12-19"]]

// Tarifs au kilo (null = nous consulter)
export const TARIFS = {
"Génisse Parthenaise":[["Steak haché – par 4 ou en vrac (500 g)",19],["Rôti de 1 kg / Tournedos par 2 pièces",32],["Entrecôte – pièce de 300 g environ",32],["Faux-filet – pièce de 300 g environ",32],["Pièce à fondue – morceau de 1 kg",32],["Filet en rôti de 1 kg ou tournedos par 2",49],["Basse côte – pièce de 300 g",27],["Côte de bœuf – pièce de 1,5 kg environ",32],["Bourguignon – par 1 kg",20],["Kit pot-au-feu – 1,5 à 2 kg",20],["Langue",20],["Foie – par 2 tranches",19],["Cœur – par 2 tranches",17],["Rognon, queue",17],["Joue de bœuf",24],["Tripe – 400 g environ",17],["Paleron – par 1 kg",22],["Steaks – par 2 pièces",29],["Merguez – par 10 pièces",17]],
"Agneau":[["Gigot entier ou côtes de gigot par 2",32],["Côtes premières / découvertes – par 2",27],["Côtes filet par 2, épaule en rôti ou désossée",28],["Selle",30],["Souris",27],["Collier",15],["Poitrine",10],["Rognon",18],["Poitrine (ribs)",10]],
"Porc fermier":[["Tête, pieds",8],["Grillades – par 2 pièces",16],["Jarret",null],["Côtes de porc – par 2 pièces",15],["Rôti – par 1 kg",17],["Rouelle",15],["Toulouse par 4 / Chipolatas nature ou aux herbes par 10",16],["Filet mignon",21],["Poitrines tranchées par 4 / Travers",12],["Crépinettes – par 2",15],["Sauté de porc – par 1 kg",14],["Palette, chair à saucisse",15],["Joues (sur commande)",18],["Foie (sur commande)",13]],
"Veau":[["Grenadin – par 2 pièces",48],["Escalopes – par 2 pièces",31],["Côtes de veau – par 2 pièces",28],["Blanquette – par 1 kg",27],["Tendron, osso bucco",21],["Tête et pieds",18],["Rognon",33],["Foie – par 2 tranches",32],["Paupiettes – par 2",29],["Haché de veau – 500 g",21],["Ris de veau",45],["Fraise de veau",15],["Rôti – par 1 kg",30]]}

// Carrousel des produits
export const CARROUSEL = [
 {label:'Génisse Parthenaise',icon:'beef',img:'Modif%2030.4.24/cow1.jpg',desc:'Une viande bovine de qualité, issue de la prestigieuse race Parthenaise.',tab:'Génisse Parthenaise'},
 {label:'Agneau label rouge',icon:'sheep',img:'AGNEAUX%20LABEL%20ROUGE.webp',desc:'La tendresse à chaque bouchée, avec nos agneaux label rouge.',tab:'Agneau'},
 {label:'Porc fermier',icon:'pig',img:'IMG_5865.webp',desc:'Bien-être animal et alimentation équilibrée pour une viande savoureuse.',tab:'Porc fermier'},
 {label:'Veau de marque',icon:'calf',img:'Modif%2030.4.24/veau.jpg',desc:'Un savoir-faire traditionnel pour une viande juteuse.',tab:'Veau'},
 {label:'Découpe sur mesure',icon:'knife',img:'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur3.png',desc:'Votre colis, découpé avec savoir-faire selon vos demandes.'},
 {label:'Vente directe',icon:'barn',img:'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur2.png',desc:'Chaque mois, la ferme vous ouvre ses portes, en circuit court.'},
 {label:'50 ha de prairies',icon:'leaf',img:'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur1.png',desc:'Des vaches au pré, nourries en partie avec nos propres cultures.'},
 {label:'Pension de chevaux',icon:'horse',img:'Modif%2030.4.24/Un-h%C3%A9bergement-de-qualit%C3%A9-pour-votre-cheval-%C3%A0-Aincourt-et-%C3%A0-Arthies-1.png',desc:'10 box, carrière et sentiers de balade, pour 350 € par mois.',href:'#pension'}
]

export const VILLES = ["Maulette","Thoiry","Bazainville","Aincourt","Arthies","Wy-dit-Joli-Village","Jambville","Gargenville","Fontenay-Saint-Père","Mantes-la-Jolie","Mantes-la-Ville","Follainville-Dennemont","Rosny-sur-Seine","Gasny"]
