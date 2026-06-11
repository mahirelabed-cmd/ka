import type { Station } from './schema';

/**
 * Die 12 Stationen der Reise. Hinweis zur Schreibweise: Das Zeichen ﷺ
 * (U+FDFA) steht nach jedem Vorkommen von „Muhammad" oder „der Prophet".
 * In der Kinder-Stufe wird es bei der Anzeige als „(Friede sei mit ihm)"
 * ausgeschrieben (siehe lib/honorific.ts).
 */
export const stations: Station[] = [
  {
    id: 1,
    name: 'Mekka – Kindheit & Jugend',
    theme: 'Geburtsjahr, Waisenkind, Halima, „al-Amin", Hilf al-Fudul',
    period: '570–610',
    intro:
      'Zwischen kargen Bergen liegt Mekka, die Stadt der Kaaba, zu der seit alter Zeit Pilger ziehen. Hier wird im Jahr des Elefanten Muhammad ﷺ geboren – als Waisenkind, denn sein Vater Abdullah stirbt noch vor seiner Geburt. Bei der Amme Halima in der Wüste verbringt er seine ersten Jahre, später wachsen Großvater Abdul-Muttalib und Onkel Abu Talib über ihn. Schon als junger Mann nennen ihn die Mekkaner „al-Amin", den Vertrauenswürdigen.',
    goal: 'In diesem Kapitel erfährst du, wie die Kindheit und Jugend Muhammads ﷺ verlief und warum die Menschen ihm schon früh vertrauten.',
    pearlIds: ['pearl-truthfulness', 'pearl-orphan-care', 'pearl-justice-pact'],
    x: 340,
    y: 980,
  },
  {
    id: 2,
    name: 'Höhle Hira',
    theme: 'Erste Offenbarung, Sure al-ʿAlaq, Khadidscha (r.a.), Waraqa ibn Naufal',
    period: '610',
    intro:
      'Hoch über Mekka, am Berg an-Nur, liegt die kleine Höhle Hira. Hierhin zieht sich Muhammad ﷺ immer wieder zurück, um nachzudenken und zur Ruhe zu kommen. In einer Nacht des Ramadan geschieht das, was die Welt verändern wird: Der Engel Dschibril überbringt die ersten Verse der Offenbarung. Zitternd kehrt der Prophet ﷺ heim zu Khadidscha (r.a.), die ihn tröstet und an ihn glaubt.',
    goal: 'In diesem Kapitel erfährst du, wie die erste Offenbarung begann und wer dem Propheten ﷺ in dieser Stunde beistand.',
    pearlIds: ['pearl-revelation', 'pearl-khadija-support', 'pearl-seeking-knowledge'],
    x: 430,
    y: 900,
  },
  {
    id: 3,
    name: 'Mekka – Geheime & offene Daʿwa',
    theme: 'Erste Muslime (Abu Bakr, Ali, Zaid, Bilal r.a.), Berg Safa',
    period: '610–613',
    intro:
      'Still und behutsam beginnt die Botschaft sich auszubreiten. Khadidscha (r.a.), Abu Bakr (r.a.), der junge Ali (r.a.) und Zaid (r.a.) gehören zu den ersten, die glauben. Drei Jahre lang lädt der Prophet ﷺ die Menschen im Verborgenen ein, dann ruft er sie offen vom Hügel Safa. Auch einfache Menschen wie der Sklave Bilal (r.a.) finden zum Glauben – und tragen ihn mit großem Mut.',
    goal: 'In diesem Kapitel erfährst du, wer die ersten Muslime waren und wie aus der stillen Einladung ein offener Ruf wurde.',
    pearlIds: ['pearl-first-believers', 'pearl-bilal-steadfastness', 'pearl-wise-invitation'],
    x: 330,
    y: 830,
  },
  {
    id: 4,
    name: 'Mekka – Prüfungen & Boykott',
    theme: 'Verfolgung, Familie Yasirs, Boykott im Tal von Abu Talib',
    period: '613–619',
    intro:
      'Je mehr Menschen der Botschaft folgen, desto härter wird der Widerstand der Quraisch. Schwache und Sklaven trifft es zuerst: Die Familie von Yasir (r.a.) erträgt schwerste Misshandlung, und Sumayya (r.a.) wird zur ersten Märtyrerin des Islam. Schließlich verhängen die Mekkaner einen Boykott und sperren die Muslime und ihre Verwandten ins Tal Abu Talibs. Jahre des Hungers und der Geduld folgen – doch der Glaube zerbricht nicht.',
    goal: 'In diesem Kapitel erfährst du, welche Prüfungen die ersten Muslime trugen und was ihnen Kraft zum Durchhalten gab.',
    pearlIds: ['pearl-patience-trial', 'pearl-yasir-family', 'pearl-solidarity'],
    x: 240,
    y: 760,
  },
  {
    id: 5,
    name: 'Abessinien',
    theme: 'Auswanderung, Dschaʿfar (r.a.) vor dem Negus, Sure Maryam',
    period: '615',
    intro:
      'Über das Rote Meer liegt Abessinien, das Reich eines christlichen Königs, von dem es heißt: „Bei ihm wird niemandem Unrecht getan." Dorthin schickt der Prophet ﷺ verfolgte Muslime in Sicherheit. Als die Quraisch ihre Auslieferung fordern, tritt Dschaʿfar (r.a.) vor den Negus und beschreibt, was der Islam lehrt. Verse aus Sure Maryam berühren den König tief – und er gewährt den Muslimen Schutz.',
    goal: 'In diesem Kapitel erfährst du, warum Muslime nach Abessinien auswanderten und wie ein gerechter König sie aufnahm.',
    pearlIds: ['pearl-just-refuge', 'pearl-jafar-speech', 'pearl-shared-reverence'],
    x: 120,
    y: 680,
  },
  {
    id: 6,
    name: 'Jahr der Trauer & Taʾif',
    theme: 'Tod Khadidschas (r.a.) und Abu Talibs, Reise nach Taʾif, Geduld',
    period: '619–620',
    intro:
      'In einem einzigen Jahr verliert der Prophet ﷺ zwei Menschen, die ihn am stärksten stützten: seine Frau Khadidscha (r.a.) und seinen Onkel Abu Talib. Man nennt es das Jahr der Trauer. Voller Hoffnung wandert er in die Bergstadt Taʾif, doch ihre Bewohner weisen ihn ab und treiben ihn mit Steinwürfen hinaus. Es wird überliefert, dass er dennoch nicht ihren Untergang wünschte, sondern auf ihre Kinder und Enkel hoffte.',
    goal: 'In diesem Kapitel erfährst du, wie der Prophet ﷺ schwerste Verluste trug und in Taʾif Geduld über Vergeltung stellte.',
    pearlIds: ['pearl-khadija-legacy', 'pearl-taif-mercy', 'pearl-hope-in-grief'],
    x: 470,
    y: 640,
  },
  {
    id: 7,
    name: 'Isra & Miʿradsch',
    theme: 'Nachtreise und Himmelfahrt – die gesicherten Kernelemente',
    period: '620/621',
    intro:
      'In der dunkelsten Zeit schenkt Allah Seinem Gesandten ﷺ ein leuchtendes Zeichen: die Nachtreise von Mekka zur fernen Gebetsstätte in Jerusalem und von dort die Himmelfahrt. Aus dieser Nacht bringt der Prophet ﷺ das Geschenk der fünf täglichen Gebete mit. Als die Mekkaner spotten, bestätigt Abu Bakr (r.a.) die Botschaft ohne Zögern – seitdem trägt er den Beinamen „as-Siddiq", der stets Bestätigende.',
    goal: 'In diesem Kapitel erfährst du die gesicherten Kernelemente der Nachtreise und was die fünf Gebete bedeuten.',
    pearlIds: ['pearl-night-journey', 'pearl-five-prayers', 'pearl-siddiq-trust'],
    x: 350,
    y: 560,
  },
  {
    id: 8,
    name: 'Treueide von ʿAqaba',
    theme: 'Begegnung mit den Yathribern, 1. & 2. Bayʿa',
    period: '621–622',
    intro:
      'Zur Pilgerzeit trifft der Prophet ﷺ am Hang von ʿAqaba bei Mina Männer aus Yathrib, der Oasenstadt im Norden. Sie hören die Botschaft – und nehmen sie an. Im folgenden Jahr kommen mehr, und sie geloben in zwei Treueiden, der ersten und zweiten Bayʿa, Treue und Schutz. Mit ihnen sendet der Prophet ﷺ den jungen Lehrer Musʿab ibn ʿUmair (r.a.) nach Yathrib – ein neues Kapitel beginnt.',
    goal: 'In diesem Kapitel erfährst du, wie die Treueide von ʿAqaba den Weg zur Hidschra bereiteten.',
    pearlIds: ['pearl-pledge-loyalty', 'pearl-open-doors', 'pearl-musab-teacher'],
    x: 250,
    y: 480,
  },
  {
    id: 9,
    name: 'Höhle Thaur & Hidschra',
    theme: 'Auswanderung, Abu Bakr (r.a.), Suraqa, der Bericht vom Spinnennetz',
    period: '622',
    intro:
      'Als die Gefahr in Mekka am größten ist, erlaubt Allah die Auswanderung. Der Prophet ﷺ bricht mit seinem Gefährten Abu Bakr (r.a.) auf – doch zuerst südwärts, in die Höhle Thaur, um die Verfolger zu täuschen. Drei Tage verbergen sie sich dort; als die Sucher direkt vor der Höhle stehen, spricht der Prophet ﷺ sinngemäß: „Sei nicht traurig, Allah ist mit uns." Nach verbreiteter Überlieferung soll eine Spinne ihr Netz über den Eingang gewoben haben – der Kern des Berichts aber ist: Allahs Schutz.',
    goal: 'In diesem Kapitel erfährst du, wie die Hidschra verlief und was Gottvertrauen in größter Gefahr bedeutet.',
    pearlIds: ['pearl-tawakkul', 'pearl-true-companion', 'pearl-suraqa-forgiveness'],
    x: 380,
    y: 400,
  },
  {
    id: 10,
    name: 'Quba & Ankunft',
    theme: 'Erste Moschee, Kamelstute Qaswa, Beginn der Zeitrechnung',
    period: '622',
    intro:
      'Nach Tagen durch die Wüste erreichen die Auswanderer Quba am Rand der Oase. Hier entsteht die erste Moschee des Islam – der Prophet ﷺ packt beim Bau selbst mit an. Als er weiterzieht, möchte jede Familie ihn beherbergen; er aber lässt seine Kamelstute Qaswa wählen, wo sie sich niederlegt, damit niemand gekränkt wird. Mit der Hidschra beginnt später die islamische Zeitrechnung – ein Neuanfang, nach dem die Jahre gezählt werden.',
    goal: 'In diesem Kapitel erfährst du, wie die Ankunft in Quba verlief und warum die Hidschra den Kalender begründet.',
    pearlIds: ['pearl-first-mosque', 'pearl-humble-arrival', 'pearl-new-beginning'],
    x: 300,
    y: 300,
  },
  {
    id: 11,
    name: 'Medina – Die neue Gemeinschaft',
    theme: 'Verbrüderung, Gemeindeordnung von Medina, Adhan, Qibla-Wechsel',
    period: '622–624',
    intro:
      'Aus Yathrib wird „al-Madina", die Stadt des Propheten ﷺ. Er verbrüdert die Ausgewanderten (Muhadschirun) mit den Helfern (Ansar), sodass Fremde zu Geschwistern werden. Eine Gemeindeordnung – die Sahifa von Medina – regelt das Zusammenleben der Stämme und Religionen. Bilal (r.a.) ruft mit dem Adhan zum Gebet, und die Gebetsrichtung wendet sich von Jerusalem zur Kaaba in Mekka.',
    goal: 'In diesem Kapitel erfährst du, wie in Medina aus vielen Gruppen eine Gemeinschaft wurde.',
    pearlIds: ['pearl-brotherhood', 'pearl-medina-charter', 'pearl-call-to-prayer'],
    x: 340,
    y: 200,
  },
  {
    id: 12,
    name: 'Der weitere Weg (Überblick)',
    theme: 'Hudaibiya, Eroberung Mekkas als Amnestie, Abschiedspredigt',
    period: '628–632',
    intro:
      'Die junge Gemeinschaft muss sich behaupten – in schweren Stunden wie Badr, Uhud und am Graben, vor allem aber durch Geduld und kluge Verträge. Der Vertrag von Hudaibiya sieht zunächst wie ein Nachteil aus, öffnet aber Türen zum Frieden. Als Mekka sich schließlich ergibt, wird es ein Tag der Amnestie: „Geht, ihr seid frei", lautet sinngemäß die Botschaft an die einstigen Verfolger. In der Abschiedspredigt fasst der Prophet ﷺ das Vermächtnis zusammen: Unantastbarkeit von Leben und Eigentum, Geschwisterlichkeit und die Gleichheit der Menschen.',
    goal: 'In diesem Kapitel erfährst du im Überblick, wie Geduld, Verträge und Vergebung den weiteren Weg prägten.',
    pearlIds: ['pearl-hudaybiyya-patience', 'pearl-day-of-amnesty', 'pearl-farewell-legacy'],
    x: 360,
    y: 100,
  },
];

export function getStation(id: number): Station | undefined {
  return stations.find((s) => s.id === id);
}
