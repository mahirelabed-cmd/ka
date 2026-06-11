import type { Pearl } from './schema';

/**
 * Das „Buch der Perlen": 36 Lektionstexte (3 je Station).
 * Schreibweise: ﷺ steht nach jedem Vorkommen von „Muhammad" / „der Prophet";
 * in der Kinder-Stufe wird es bei der Anzeige ausgeschrieben (lib/honorific.ts).
 * Aussagen des Propheten ﷺ werden nur sinngemäß und mit Quellenrahmen
 * wiedergegeben („Es wird überliefert, dass …").
 */
export const pearls: Pearl[] = [
  // ── Station 1: Mekka – Kindheit & Jugend ─────────────────────────
  {
    id: 'pearl-truthfulness',
    station: 1,
    title: 'Perle der Wahrhaftigkeit',
    lesson:
      'Lange bevor Muhammad ﷺ die Offenbarung erhielt, nannten ihn die Mekkaner „al-Amin" – den Vertrauenswürdigen. Händler vertrauten ihm ihre Waren an, Familien ihre Wertsachen. Als beim Wiederaufbau der Kaaba ein Streit darüber ausbrach, wer den Schwarzen Stein einsetzen darf, nahmen alle seinen klugen Schiedsspruch an: Er legte den Stein auf ein Tuch, sodass jeder Stamm mit anheben konnte. Ehrlichkeit schafft Vertrauen – und Vertrauen verbindet Menschen. Wer immer die Wahrheit sagt, dem glaubt man auch in schweren Stunden.',
    source: 'Ibn Hisham, as-Sira an-nabawiyya (Bericht über den Wiederaufbau der Kaaba)',
  },
  {
    id: 'pearl-orphan-care',
    station: 1,
    title: 'Perle der Fürsorge',
    lesson:
      'Muhammad ﷺ wuchs als Waisenkind auf: Sein Vater starb vor seiner Geburt, seine Mutter Amina, als er sechs Jahre alt war. Erst sorgte sein Großvater Abdul-Muttalib für ihn, dann sein Onkel Abu Talib. Auch die Amme Halima aus dem Stamm der Banu Saʿd nahm ihn liebevoll bei sich in der Wüste auf. So lernte er früh, wie wertvoll Menschen sind, die sich um Schwächere kümmern. Der Koran erinnert daran: „Hat Er dich nicht als Waise gefunden und Zuflucht gegeben?" (Sure 93:6).',
    source: 'Koran, Sure ad-Duha (93:6); Ibn Hisham',
  },
  {
    id: 'pearl-justice-pact',
    station: 1,
    title: 'Perle der Gerechtigkeit',
    lesson:
      'Als junger Mann erlebte Muhammad ﷺ in Mekka den Bund „Hilf al-Fudul": Mehrere Sippen versprachen, jedem Unrecht Erlittenen beizustehen – ganz gleich, woher er kam. Auslöser war ein fremder Kaufmann, dem ein Mekkaner den Lohn nicht zahlen wollte. Es wird überliefert, dass der Prophet ﷺ später sagte, er hätte einem solchen Bund auch im Islam wieder zugestimmt. Gerechtigkeit gilt für alle Menschen, nicht nur für die eigene Gruppe. Sich für Schwächere einzusetzen, gehört zum Glauben dazu.',
    source: 'Ibn Hisham; Musnad Ahmad (Bericht über Hilf al-Fudul)',
  },

  // ── Station 2: Höhle Hira ────────────────────────────────────────
  {
    id: 'pearl-revelation',
    station: 2,
    title: 'Perle der Offenbarung',
    lesson:
      'In der Höhle Hira am Berg an-Nur begann die Offenbarung des Korans. Die ersten Verse gehören zu Sure al-ʿAlaq und beginnen mit „Iqra – Lies!" (96:1–5). Es geschah in einer Nacht des Monats Ramadan, die der Koran „Lailat al-Qadr", die Nacht der Bestimmung, nennt. Von diesem Moment an wurde der Koran über 23 Jahre Stück für Stück herabgesandt. Die Offenbarung kam nicht auf einmal, sondern begleitete die Menschen durch ihr Leben – Lernen braucht Zeit und Geduld.',
    source: 'Sahih al-Buchari, Beginn der Offenbarung; Koran 96:1–5, 97:1',
  },
  {
    id: 'pearl-khadija-support',
    station: 2,
    title: 'Perle des Beistands',
    lesson:
      'Als Muhammad ﷺ zitternd aus der Höhle Hira heimkehrte, sprach Khadidscha (r.a.) ihm Mut zu. Es wird überliefert, dass sie sinngemäß sagte: Allah werde ihn niemals bloßstellen, denn er pflege die Verwandtschaft, helfe den Schwachen, ehre die Gäste und stehe den Menschen in Not bei. Sie war die Erste, die an seine Botschaft glaubte. Ein Mensch, der uns in der schwersten Stunde stärkt, ist ein Geschenk Allahs. Gute Taten geben Rückhalt – wer Gutes tut, steht in der Prüfung nicht allein.',
    source: 'Sahih al-Buchari, Beginn der Offenbarung',
  },
  {
    id: 'pearl-seeking-knowledge',
    station: 2,
    title: 'Perle des Wissens',
    lesson:
      'Das allererste Wort der Offenbarung war ein Befehl zum Lernen: „Lies!" Die Verse sprechen vom Schreibrohr und davon, dass Allah den Menschen lehrte, was er nicht wusste (Sure 96:1–5). So stellte der Islam von Beginn an das Wissen in die Mitte. Lesen, Verstehen und Nachdenken sind Formen des Gottesdienstes. Wer lernt, folgt dem allerersten Auftrag des Korans – und das ein Leben lang.',
    source: 'Koran, Sure al-ʿAlaq (96:1–5)',
  },

  // ── Station 3: Geheime & offene Daʿwa ────────────────────────────
  {
    id: 'pearl-first-believers',
    station: 3,
    title: 'Perle der ersten Schritte',
    lesson:
      'Die ersten Menschen, die den Islam annahmen, kamen aus ganz unterschiedlichen Lebenslagen: Khadidscha (r.a.), die Kauffrau; Abu Bakr (r.a.), der angesehene Freund; Ali (r.a.), noch ein Junge im Haus des Propheten ﷺ; und Zaid (r.a.), ein Freigelassener. Der Glaube fragte nicht nach Reichtum, Alter oder Herkunft. Jeder von ihnen trug die Botschaft auf seine Weise weiter – leise, ehrlich und beständig. Große Dinge beginnen oft im kleinen Kreis. Auch ein einzelner Mensch, der überzeugt handelt, kann viel bewegen.',
    source: 'Ibn Hisham, as-Sira an-nabawiyya',
  },
  {
    id: 'pearl-bilal-steadfastness',
    station: 3,
    title: 'Perle der Standhaftigkeit',
    lesson:
      'Bilal (r.a.) war ein Sklave aus Abessinien, als er den Islam annahm. Sein Besitzer ließ ihn in der glühenden Mittagshitze quälen, einen schweren Stein auf der Brust – doch Bilal (r.a.) wiederholte nur: „Ahad, Ahad – Einer, Einer!" Abu Bakr (r.a.) kaufte ihn frei. Später wurde Bilal (r.a.) der erste Muezzin des Islam, dessen Stimme ganz Medina zum Gebet rief. Kein Mensch ist weniger wert wegen seiner Herkunft oder Hautfarbe. Standhaftigkeit im Glauben verwandelt Leid in Würde.',
    source: 'Ibn Hisham; Ibn Saʿd, at-Tabaqat',
  },
  {
    id: 'pearl-wise-invitation',
    station: 3,
    title: 'Perle der weisen Einladung',
    lesson:
      'Drei Jahre lang lud der Prophet ﷺ die Menschen im Stillen zum Glauben ein, bevor er sich offen an alle wandte. Vom Hügel Safa rief er die Mekkaner zusammen und fragte sie zuerst: „Würdet ihr mir glauben, wenn ich sage, hinter diesem Berg steht ein Heer?" Sie antworteten: „Ja, denn wir haben dich nie lügen hören." Erst auf dieses Vertrauen baute er seine Botschaft. Kluges Einladen beginnt mit Geduld, gutem Ruf und dem richtigen Zeitpunkt – nicht mit Druck.',
    source: 'Sahih al-Buchari; Sahih Muslim (Ruf vom Safa)',
  },

  // ── Station 4: Prüfungen & Boykott ───────────────────────────────
  {
    id: 'pearl-patience-trial',
    station: 4,
    title: 'Perle der Geduld',
    lesson:
      'Als die Quraisch die Muslime verfolgten, lernten die Gläubigen die schwerste und schönste Tugend: Sabr, die Geduld. Sie bedeutete nicht, Unrecht gut zu finden, sondern daran nicht zu zerbrechen. Der Koran tröstete sie: „Wahrlich, mit der Erschwernis kommt Erleichterung" (Sure 94:5–6). Viele hielten Jahre durch, ohne ihren Glauben aufzugeben. Geduld ist wie ein Anker im Sturm: Sie hält fest, bis bessere Tage kommen.',
    source: 'Koran, Sure asch-Scharh (94:5–6); Ibn Hisham',
  },
  {
    id: 'pearl-yasir-family',
    station: 4,
    title: 'Perle der Treue im Glauben',
    lesson:
      'Die Familie Yasirs (r.a.) gehörte zu den Schwächsten in Mekka – und wurde am härtesten verfolgt. Yasir (r.a.) und seine Frau Sumayya (r.a.) starben unter der Folter; Sumayya (r.a.) gilt als erste Märtyrerin des Islam. Es wird überliefert, dass der Prophet ﷺ an ihnen vorbeikam und sinngemäß sagte: „Geduld, Familie Yasirs – euch ist das Paradies versprochen." Ihr Sohn Ammar (r.a.) überlebte und blieb dem Glauben treu. Ihre Geschichte lehrt: Die Stärke des Herzens ist größer als jede äußere Gewalt.',
    source: 'Ibn Hisham; al-Hakim, al-Mustadrak',
  },
  {
    id: 'pearl-solidarity',
    station: 4,
    title: 'Perle des Zusammenhalts',
    lesson:
      'Drei Jahre lang sperrten die Mekkaner die Muslime und ihre Verwandten in das Tal Abu Talibs: kein Handel, keine Heirat, kaum Nahrung. Doch die Eingeschlossenen teilten das Wenige, das sie hatten, und hielten zusammen. Selbst einige Nichtmuslime in Mekka empfanden den Boykott als Unrecht und setzten schließlich sein Ende durch. Gemeinschaft zeigt sich nicht in guten Tagen, sondern in der Not. Und: Gerechtigkeitssinn kann Menschen über Glaubensgrenzen hinweg verbinden.',
    source: 'Ibn Hisham, as-Sira an-nabawiyya (Bericht über den Boykott)',
  },

  // ── Station 5: Abessinien ────────────────────────────────────────
  {
    id: 'pearl-just-refuge',
    station: 5,
    title: 'Perle der gerechten Zuflucht',
    lesson:
      'Als die Verfolgung unerträglich wurde, riet der Prophet ﷺ einer Gruppe von Muslimen, nach Abessinien auszuwandern. Über den dortigen König, den Negus, sagte er sinngemäß: Bei ihm werde niemandem Unrecht getan. Die Muslime vertrauten sich also dem Schutz eines christlichen Herrschers an – und wurden nicht enttäuscht. Gerechtigkeit ist ein Wert, den Menschen verschiedener Religionen erkennen und achten. Wer Schutz braucht, darf ihn suchen; wer Schutz geben kann, soll ihn gewähren.',
    source: 'Ibn Hisham, as-Sira an-nabawiyya (erste Hidschra nach Abessinien)',
  },
  {
    id: 'pearl-jafar-speech',
    station: 5,
    title: 'Perle des mutigen Wortes',
    lesson:
      'Vor dem Thron des Negus sprach Dschaʿfar ibn Abi Talib (r.a.) für die Muslime. Er beschrieb, wie sie früher gelebt hatten – Götzen dienend, die Schwachen unterdrückend – und was der Islam ihnen lehrte: Wahrhaftigkeit, Verwandtschaftspflege, das Gebet und das Gute. Die Gesandten der Quraisch verlangten die Auslieferung der Flüchtlinge, doch der König lehnte ab. Ein ehrliches, wohlgesetztes Wort kann stärker sein als Geschenke und Druck. Wer für andere spricht, trägt Verantwortung – und Mut wird belohnt.',
    source: 'Ibn Hisham; Musnad Ahmad (Bericht der Umm Salama r.a.)',
  },
  {
    id: 'pearl-shared-reverence',
    station: 5,
    title: 'Perle der Ehrfurcht',
    lesson:
      'Als Dschaʿfar (r.a.) dem Negus Verse aus Sure Maryam vortrug – über Maria und die Geburt Jesu –, weinte der König, bis sein Bart feucht war. Er erkannte, dass diese Botschaft und das Evangelium „aus derselben Nische" stammen, wie er sinngemäß sagte. Der Koran ehrt Maryam (Maria) mit einer ganzen Sure. Ehrfurcht vor Gott verbindet Herzen über Religionsgrenzen hinweg. Respekt vor dem Heiligen der anderen öffnet Türen, die Gewalt niemals öffnen kann.',
    source: 'Ibn Hisham; Koran, Sure Maryam (19)',
  },

  // ── Station 6: Jahr der Trauer & Taʾif ───────────────────────────
  {
    id: 'pearl-khadija-legacy',
    station: 6,
    title: 'Perle der Dankbarkeit',
    lesson:
      'Khadidscha (r.a.) stand Muhammad ﷺ fünfundzwanzig Jahre zur Seite: als Ehefrau, Beraterin und erste Gläubige. Ihr Vermögen stellte sie in den Dienst der Botschaft, ihre Ruhe trug ihn durch die schwersten Jahre. Es wird überliefert, dass der Prophet ﷺ sie noch lange nach ihrem Tod dankbar erwähnte und ihren Freundinnen Geschenke schickte. Dankbarkeit endet nicht, wenn ein Mensch stirbt. Wer Gutes erfahren hat, hält die Erinnerung daran in Ehren.',
    source: 'Sahih al-Buchari; Sahih Muslim (Vorzüge Khadidschas r.a.)',
  },
  {
    id: 'pearl-taif-mercy',
    station: 6,
    title: 'Perle der Barmherzigkeit',
    lesson:
      'In Taʾif wurde der Prophet ﷺ verspottet und mit Steinen aus der Stadt getrieben, bis seine Füße bluteten. Es wird überliefert, dass ihm danach angeboten wurde, die Stadt zwischen den Bergen zermalmen zu lassen – doch er lehnte ab. Er hoffte, dass aus den Nachkommen dieser Menschen einst Gläubige hervorgehen würden. Und so geschah es: Taʾif nahm später den Islam an. Barmherzigkeit denkt weiter als der Schmerz des Augenblicks. Wer verzeiht, öffnet der Zukunft die Tür.',
    source: 'Sahih al-Buchari; Sahih Muslim (Bericht über Taʾif)',
  },
  {
    id: 'pearl-hope-in-grief',
    station: 6,
    title: 'Perle der Hoffnung',
    lesson:
      'Im „Jahr der Trauer" verlor der Prophet ﷺ kurz nacheinander Khadidscha (r.a.) und seinen Onkel Abu Talib – die beiden Menschen, die ihn am stärksten schützten. Trauer gehört zum Leben – selbst die Gesandten Allahs erlebten sie. Doch auf das dunkelste Jahr folgten die Lichtblicke: die Nachtreise und bald darauf die Begegnung mit den Menschen aus Yathrib. Wer trauert, darf weinen – und darf zugleich darauf vertrauen, dass Allah neue Wege öffnet. Nach der Nacht kommt der Morgen.',
    source: 'Ibn Hisham, as-Sira an-nabawiyya',
  },

  // ── Station 7: Isra & Miʿradsch ──────────────────────────────────
  {
    id: 'pearl-night-journey',
    station: 7,
    title: 'Perle der Nachtreise',
    lesson:
      'Der Koran berichtet im ersten Vers der Sure al-Isra: Allah ließ Seinen Diener bei Nacht von der heiligen Gebetsstätte in Mekka zur fernen Gebetsstätte reisen, deren Umgebung Er gesegnet hat (17:1). Von dort wurde der Prophet ﷺ in die Himmel emporgehoben – das Miʿradsch. Diese Reise war Trost und Stärkung nach den schweren Jahren der Trauer. Sie verbindet bis heute die Herzen der Muslime mit Jerusalem. In dunklen Zeiten schenkt Allah Seinen Dienern Zeichen der Nähe.',
    source: 'Koran, Sure al-Isra (17:1); Sahih al-Buchari, Sahih Muslim',
  },
  {
    id: 'pearl-five-prayers',
    station: 7,
    title: 'Perle des Gebets',
    lesson:
      'Das größte Geschenk der Nachtreise sind die fünf täglichen Gebete: Sie wurden dem Propheten ﷺ in dieser Nacht auferlegt – nicht durch einen Boten, sondern in unmittelbarer Nähe zu Allah. Fünfmal am Tag hält der Betende inne, richtet sich aus und kommt zur Ruhe. Es wird überliefert, dass die fünf Gebete im Lohn wie fünfzig zählen. Das Gebet ist wie eine Leiter des Alltags: Es hebt den Menschen fünfmal täglich aus der Hast heraus. Wer betet, ist nie ganz verloren.',
    source: 'Sahih al-Buchari, Sahih Muslim (Berichte über das Miʿradsch)',
  },
  {
    id: 'pearl-siddiq-trust',
    station: 7,
    title: 'Perle des Vertrauens',
    lesson:
      'Als die Mekkaner über die Nachtreise spotteten, eilten sie zu Abu Bakr (r.a.) und erwarteten seinen Zweifel. Er antwortete sinngemäß: Wenn er es gesagt hat, dann ist es wahr – ich glaube ihm ja sogar in Dingen, die noch ferner liegen. Seitdem trägt Abu Bakr (r.a.) den Beinamen „as-Siddiq", der stets Bestätigende. Vertrauen wächst aus langer Erfahrung mit der Ehrlichkeit eines Menschen. Ein wahrer Freund bleibt fest, wenn alle anderen schwanken.',
    source: 'Ibn Hisham; al-Hakim, al-Mustadrak',
  },

  // ── Station 8: Treueide von ʿAqaba ───────────────────────────────
  {
    id: 'pearl-pledge-loyalty',
    station: 8,
    title: 'Perle des gegebenen Wortes',
    lesson:
      'Am Hang von ʿAqaba bei Mina reichten die Menschen aus Yathrib dem Propheten ﷺ die Hand zum Treueid – zuerst wenige, im Jahr darauf über siebzig. Sie versprachen, Gutes zu tun, Unrecht zu meiden und ihn zu schützen wie die eigene Familie. Dieses Versprechen, die Bayʿa, hielten sie, obwohl es sie viel kosten konnte. Ein gegebenes Wort ist im Islam heilig. Wer zusagt, steht dazu – auch wenn es schwer wird.',
    source: 'Ibn Hisham, as-Sira an-nabawiyya (die Treueide von ʿAqaba)',
  },
  {
    id: 'pearl-open-doors',
    station: 8,
    title: 'Perle der offenen Tür',
    lesson:
      'Jahrelang schien die Botschaft in Mekka eingemauert: Die Mächtigen lehnten ab, die Nachbarstadt Taʾif jagte den Propheten ﷺ davon. Doch dann kamen die Pilger aus Yathrib – Menschen, die niemand auf dem Plan hatte. Aus ihrer Stadt wurde Medina, die neue Heimat des Islam. Allah öffnet Türen, wo niemand sie erwartet. Es lohnt sich, freundlich auf alle Menschen zuzugehen, denn man weiß nie, durch wen das Gute kommt.',
    source: 'Ibn Hisham, as-Sira an-nabawiyya',
  },
  {
    id: 'pearl-musab-teacher',
    station: 8,
    title: 'Perle des Lehrens',
    lesson:
      'Nach dem ersten Treueid sandte der Prophet ﷺ den jungen Musʿab ibn ʿUmair (r.a.) nach Yathrib, um den Menschen dort den Koran und den Glauben zu lehren. Musʿab (r.a.) war einst der verwöhnteste junge Mann Mekkas gewesen und hatte für den Islam allen Wohlstand aufgegeben. Mit Geduld und schönen Worten gewann er in Yathrib Haus um Haus für den Glauben. Lehren heißt: vorleben, zuhören und die Sprache der Menschen sprechen. Junge Menschen können Großes tragen, wenn man ihnen vertraut.',
    source: 'Ibn Hisham; Ibn Saʿd, at-Tabaqat',
  },

  // ── Station 9: Höhle Thaur & Hidschra ────────────────────────────
  {
    id: 'pearl-tawakkul',
    station: 9,
    title: 'Perle des Gottvertrauens',
    lesson:
      'Drei Tage verbargen sich der Prophet ﷺ und Abu Bakr (r.a.) in der Höhle Thaur, während die Verfolger die Wege absuchten. Als die Sucher direkt vor dem Eingang standen, sorgte sich Abu Bakr (r.a.) – doch der Koran hält die Antwort fest: „Sei nicht traurig, Allah ist mit uns" (Sure 9:40). Tawakkul, das Gottvertrauen, ersetzt nicht die Vorbereitung: Die beiden hatten Wegführer, Vorräte und einen klugen Plan. Aber wenn alles Menschenmögliche getan ist, ruht das Herz in Allahs Hand. Wer so vertraut, bleibt selbst in der Höhle gelassen.',
    source: 'Koran, Sure at-Tauba (9:40); Sahih al-Buchari',
  },
  {
    id: 'pearl-true-companion',
    station: 9,
    title: 'Perle der Freundschaft',
    lesson:
      'Für die Hidschra wählte der Prophet ﷺ Abu Bakr (r.a.) als Gefährten – und dieser weinte vor Freude. Er gab sein Vermögen, seine Familie half beim Verstecken: Sein Sohn brachte nachts Nachrichten, seine Tochter Asma (r.a.) Essen, sein Hirte verwischte die Spuren. Der Koran nennt Abu Bakr (r.a.) schlicht „der zweite von zweien, als sie in der Höhle waren" (9:40). Wahre Freundschaft zeigt sich, wenn sie etwas kostet. Ein verlässlicher Gefährte ist mehr wert als jeder Besitz.',
    source: 'Koran 9:40; Sahih al-Buchari (Bericht über die Hidschra)',
  },
  {
    id: 'pearl-suraqa-forgiveness',
    station: 9,
    title: 'Perle der Großmut',
    lesson:
      'Der Reiter Suraqa ibn Malik jagte dem Propheten ﷺ nach, um das Kopfgeld der Quraisch zu verdienen. Doch sein Pferd strauchelte immer wieder, bis Suraqa begriff, dass er hier nicht siegen würde. Statt ihn zu bestrafen, ließ ihn der Prophet ﷺ in Frieden ziehen – es wird sogar überliefert, dass ihm angekündigt wurde, er werde einst die Armreifen des Perserkönigs tragen. Jahre später nahm Suraqa (r.a.) den Islam an. Großmut gegenüber dem Verfolger kann aus einem Feind einen Bruder machen.',
    source: 'Sahih al-Buchari (Bericht über die Hidschra); Ibn Hisham',
  },

  // ── Station 10: Quba & Ankunft ───────────────────────────────────
  {
    id: 'pearl-first-mosque',
    station: 10,
    title: 'Perle des gemeinsamen Bauens',
    lesson:
      'In Quba, am Rand der Oase von Yathrib, gründete der Prophet ﷺ die erste Moschee des Islam – und trug selbst Steine wie alle anderen. Der Koran nennt sie eine Moschee, „die vom ersten Tag an auf Gottesfurcht gegründet wurde" (Sure 9:108). Eine Moschee ist mehr als ein Gebäude: Sie ist Treffpunkt, Schule und Zuhause der Gemeinschaft. Was gemeinsam und mit aufrichtiger Absicht gebaut wird, hat Bestand. Bis heute steht in Quba eine Moschee.',
    source: 'Koran, Sure at-Tauba (9:108); Ibn Hisham',
  },
  {
    id: 'pearl-humble-arrival',
    station: 10,
    title: 'Perle der Bescheidenheit',
    lesson:
      'Bei der Ankunft in Yathrib wollte jede Familie den Propheten ﷺ als Gast gewinnen; manche griffen sogar nach dem Zügel seiner Kamelstute Qaswa. Er aber sagte sinngemäß: Lasst sie gehen, sie ist geleitet – und ließ das Tier wählen, wo es sich niederlegt. So kränkte er niemanden und vermied jeden Streit um die Ehre. Dort, wo Qaswa niederkniete, entstand später die Moschee des Propheten ﷺ. Bescheidenheit und Taktgefühl bewahren den Frieden. Wer niemanden bevorzugt, gewinnt alle Herzen.',
    source: 'Ibn Hisham, as-Sira an-nabawiyya (Ankunft in Medina)',
  },
  {
    id: 'pearl-new-beginning',
    station: 10,
    title: 'Perle des Neuanfangs',
    lesson:
      'Die Hidschra war kein Davonlaufen, sondern ein Neuanfang mit Plan und Vertrauen. Sie wurde so wichtig, dass die Muslime später unter dem Kalifen Umar (r.a.) beschlossen, die Jahre von ihr an zu zählen – so entstand der islamische Hidschri-Kalender. Nicht eine Schlacht und nicht ein Sieg wurden zum Jahr eins, sondern der Aufbruch in eine Gemeinschaft des Glaubens. Manchmal muss man Vertrautes verlassen, damit Neues wachsen kann. Jeder gute Neuanfang zählt – im Großen wie im Kleinen.',
    source: 'at-Tabari, Tarich; Sahih al-Buchari (Einführung der Zeitrechnung)',
  },

  // ── Station 11: Medina – Die neue Gemeinschaft ───────────────────
  {
    id: 'pearl-brotherhood',
    station: 11,
    title: 'Perle der Geschwisterlichkeit',
    lesson:
      'In Medina verbrüderte der Prophet ﷺ die Ausgewanderten aus Mekka (Muhadschirun) mit den Helfern aus Medina (Ansar) – Paar für Paar. Die Ansar teilten Häuser, Gärten und Handel mit Menschen, die alles zurückgelassen hatten. Der Koran lobt sie: Sie lieben die, die zu ihnen auswanderten, und geben ihnen den Vorzug, auch wenn sie selbst bedürftig sind (Sure 59:9). Geschwisterlichkeit im Glauben ist stärker als Verwandtschaft des Blutes. Teilen macht eine Gemeinschaft reich, nicht arm.',
    source: 'Koran, Sure al-Haschr (59:9); Sahih al-Buchari',
  },
  {
    id: 'pearl-medina-charter',
    station: 11,
    title: 'Perle des fairen Vertrags',
    lesson:
      'Kurz nach der Ankunft ließ der Prophet ﷺ eine Gemeindeordnung aufschreiben – die Sahifa von Medina. Sie regelte das Zusammenleben der Muslime, der jüdischen Stämme und der übrigen Bewohner: gemeinsame Verteidigung der Stadt, Glaubensfreiheit und gegenseitige Verantwortung. Streitfälle sollten nicht mit Gewalt, sondern nach Recht entschieden werden. Eine Stadt mit vielen Gruppen braucht klare, faire Regeln für alle. Verträge schaffen Frieden, wenn jeder sich an sie hält.',
    source: 'Ibn Hisham, as-Sira an-nabawiyya (die Gemeindeordnung von Medina)',
  },
  {
    id: 'pearl-call-to-prayer',
    station: 11,
    title: 'Perle des Rufes',
    lesson:
      'Wie sollte man die Gläubigen zum Gebet rufen – mit Glocke, Horn oder Feuer? In Medina wurde eine schönere Antwort gefunden: die menschliche Stimme. Der Adhan entstand, und Bilal (r.a.), der einst für seinen Glauben gefoltert worden war, wurde der erste Muezzin. Ungefähr zur selben Zeit wandte sich die Gebetsrichtung von Jerusalem zur Kaaba nach Mekka (Sure 2:144). Der Ruf zum Gebet braucht keine Instrumente – ein aufrichtiges Herz und eine klare Stimme genügen.',
    source: 'Sahih al-Buchari; Sunan Abi Dawud; Koran 2:144',
  },

  // ── Station 12: Der weitere Weg ──────────────────────────────────
  {
    id: 'pearl-hudaybiyya-patience',
    station: 12,
    title: 'Perle des klugen Friedens',
    lesson:
      'Bei Hudaibiya schlossen die Muslime einen Vertrag, der zunächst wie eine Niederlage wirkte: Sie mussten ohne Pilgerfahrt umkehren und Bedingungen annehmen, die viele kränkten. Doch der Koran nannte den Vertrag „einen offenkundigen Erfolg" (Sure 48:1) – denn der Friede öffnete die Herzen. In den zwei Jahren danach nahmen mehr Menschen den Islam an als in allen Jahren zuvor. Frieden braucht manchmal mehr Mut als Kampf. Wer im richtigen Moment nachgibt, gewinnt am Ende mehr.',
    source: 'Koran, Sure al-Fath (48:1); Sahih al-Buchari (Vertrag von Hudaibiya)',
  },
  {
    id: 'pearl-day-of-amnesty',
    station: 12,
    title: 'Perle der Vergebung',
    lesson:
      'Als Mekka sich ergab, standen dem Propheten ﷺ die Menschen gegenüber, die ihn verfolgt, verspottet und vertrieben hatten. Er fragte sie sinngemäß: „Was meint ihr, das ich mit euch tun werde?" Sie antworteten: „Nur Gutes – du bist ein edler Bruder." Da sprach er sinngemäß: „Geht, ihr seid frei." Die Eroberung Mekkas wurde ein Tag der Amnestie, nicht der Rache. Wahre Stärke zeigt sich im Augenblick der Macht. Vergebung beendet den Kreislauf des Unrechts.',
    source: 'Ibn Hisham; al-Baihaqi (Bericht über die Öffnung Mekkas)',
  },
  {
    id: 'pearl-farewell-legacy',
    station: 12,
    title: 'Perle des Vermächtnisses',
    lesson:
      'In der Abschiedspredigt auf dem Berg Arafat fasste der Prophet ﷺ vor zehntausenden Pilgern das Wichtigste zusammen. Es wird überliefert, dass er sinngemäß sagte: Euer Leben und euer Eigentum sind einander heilig; kein Araber hat einen Vorzug vor einem Nichtaraber außer durch Gottesfurcht; die Muslime sind Geschwister; und hinterlassen wird euch, woran ihr euch festhalten könnt. Wenige Monate später starb er ﷺ in Medina. Ein gutes Vermächtnis besteht nicht aus Geld, sondern aus Werten, die weiterleben.',
    source: 'Sahih Muslim (Abschiedspredigt); Musnad Ahmad',
  },
];

export function getPearl(id: string): Pearl | undefined {
  return pearls.find((p) => p.id === id);
}

export function getPearlsForStation(station: number): Pearl[] {
  return pearls.filter((p) => p.station === station);
}
