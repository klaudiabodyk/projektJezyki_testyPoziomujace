import React, { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Question } from '../components/Test/types'
import whatsappLogo from '../assets/whatsapp.png'
import SectionWrapper from '../components/SectionWrapper/SectionWrapper'
import { trackTestCompletion } from '../utils/metaPixel'
import './GermanTestsPage.css'

const questionsA1: Question[] = [
  {
    id: 1,
    section: 'Pytania 1-14',
    prompt: 'Guten Tag, ich bin Joanna Neumann. Und wie _____ Sie? Jörg Kohl.',
    options: [
      { value: 'a', label: 'a) heiß' },
      { value: 'b', label: 'b) heißen' },
      { value: 'c', label: 'c) sind' },
      { value: 'd', label: 'd) ist' },
    ],
    correct: 'b',
  },
  {
    id: 2,
    section: 'Pytania 1-14',
    prompt: '____ kommen Sie, Herr Kohl? ... Polen.',
    options: [
      { value: 'a', label: 'a) Wie ... In' },
      { value: 'b', label: 'b) Wer ... Von' },
      { value: 'c', label: 'c) Was ... Bis' },
      { value: 'd', label: 'd) Woher ... Aus' },
    ],
    correct: 'd',
  },
  {
    id: 3,
    section: 'Pytania 1-14',
    prompt: 'Guten Tag, Frau Müller. Wie geht es Ihnen? Danke, gut. Und ____, Herr Schmidt?',
    options: [
      { value: 'a', label: 'a) Ihnen' },
      { value: 'b', label: 'b) Sie' },
      { value: 'c', label: 'c) dir' },
      { value: 'd', label: 'd) du' },
    ],
    correct: 'a',
  },
  {
    id: 4,
    section: 'Pytania 1-14',
    prompt: 'Was sind Sie von Beruf? Ich arbeite ____ Lehrerin.',
    options: [
      { value: 'a', label: 'a) bei' },
      { value: 'b', label: 'b) als' },
      { value: 'c', label: 'c) in' },
      { value: 'd', label: 'd) aus' },
    ],
    correct: 'b',
  },
  {
    id: 5,
    section: 'Pytania 1-14',
    prompt: 'Wohnt ihr in Berlin? Nein, wir _____ ____ in Berlin.',
    options: [
      { value: 'a', label: 'a) lebe nicht' },
      { value: 'b', label: 'b) nicht leben' },
      { value: 'c', label: 'c) wohnen nicht' },
      { value: 'd', label: 'd) nicht wohnen' },
    ],
    correct: 'c',
  },
  {
    id: 6,
    section: 'Pytania 1-14',
    prompt: 'Welche Sprachen _____ ihr? Wir sprechen Englisch und _____ Deutsch.',
    options: [
      { value: 'a', label: 'a) spreche ... sehr' },
      { value: 'b', label: 'b) sprechen ... ein bisschen' },
      { value: 'c', label: 'c) sprichst ... viel' },
      { value: 'd', label: 'd) sprecht ... ein bisschen' },
    ],
    correct: 'd',
  },
  {
    id: 7,
    section: 'Pytania 1-14',
    prompt: 'Ist Max dein Chef? ____, Max ist nicht mein Chef, er ist mein Freund.',
    options: [
      { value: 'a', label: 'a) Nein' },
      { value: 'b', label: 'b) Nicht' },
      { value: 'c', label: 'c) Kein' },
      { value: 'd', label: 'd) Doch' },
    ],
    correct: 'a',
  },
  {
    id: 8,
    section: 'Pytania 1-14',
    prompt: 'Wer ___ das? Das ___ meine Geschwister.',
    options: [
      { value: 'a', label: 'a) ist... sind' },
      { value: 'b', label: 'b) sind... ist' },
      { value: 'c', label: 'c) ist... ist' },
      { value: 'd', label: 'd) sind... sind' },
    ],
    correct: 'a',
  },
  {
    id: 9,
    section: 'Pytania 1-14',
    prompt: 'Was kostet das Bett? ____ kostet 598 €.',
    options: [
      { value: 'a', label: 'a) Er' },
      { value: 'b', label: 'b) Sie' },
      { value: 'c', label: 'c) Es' },
      { value: 'd', label: 'd) Ihr' },
    ],
    correct: 'c',
  },
  {
    id: 10,
    section: 'Pytania 1-14',
    prompt: 'Brauchen Sie Hilfe? _____',
    options: [
      { value: 'a', label: 'a) Ja, sehr.' },
      { value: 'b', label: 'b) Gut, danke.' },
      { value: 'c', label: 'c) Nein, bitte.' },
      { value: 'd', label: 'd) Ja, bitte.' },
    ],
    correct: 'd',
  },
  {
    id: 11,
    section: 'Pytania 1-14',
    prompt: 'Ist das ein Buch? Nein, das ist ____ Buch.',
    options: [
      { value: 'a', label: 'a) keine' },
      { value: 'b', label: 'b) nicht' },
      { value: 'c', label: 'c) eine' },
      { value: 'd', label: 'd) kein' },
    ],
    correct: 'd',
  },
  {
    id: 12,
    section: 'Pytania 1-14',
    prompt: 'Entschuldigung, ___ heißt das auf Deutsch?',
    options: [
      { value: 'a', label: 'a) warum' },
      { value: 'b', label: 'b) wer' },
      { value: 'c', label: 'c) wie' },
      { value: 'd', label: 'd) wir' },
    ],
    correct: 'c',
  },
  {
    id: 13,
    section: 'Pytania 1-14',
    prompt: 'Wo ist der Becher? Hier, ich habe ____ Becher.',
    options: [
      { value: 'a', label: 'a) das' },
      { value: 'b', label: 'b) den' },
      { value: 'c', label: 'c) der' },
      { value: 'd', label: 'd) die' },
    ],
    correct: 'b',
  },
  {
    id: 14,
    section: 'Pytania 1-14',
    prompt: 'Haben Sie ein Buch? Nein, ich habe ____ Buch.',
    options: [
      { value: 'a', label: 'a) keine' },
      { value: 'b', label: 'b) nicht' },
      { value: 'c', label: 'c) kein' },
      { value: 'd', label: 'd) keinen' },
    ],
    correct: 'c',
  },
  {
    id: 15,
    section: 'Pytania 15-25',
    prompt: 'Hast du alles? Nein, ich brauche noch Heft__ und Stift__.',
    options: [
      { value: 'a', label: 'a) -n -e' },
      { value: 'b', label: 'b) e -e' },
      { value: 'c', label: 'c) – -s' },
      { value: 'd', label: 'd) -n -en' },
    ],
    correct: 'b',
  },
  {
    id: 16,
    section: 'Pytania 15-25',
    prompt: 'Du ____ aber gut _____!',
    options: [
      { value: 'a', label: 'a) kannst kochst' },
      { value: 'b', label: 'b) können kochen' },
      { value: 'c', label: 'c) kann kochst' },
      { value: 'd', label: 'd) kannst kochen' },
    ],
    correct: 'd',
  },
  {
    id: 17,
    section: 'Pytania 15-25',
    prompt: 'Was sind Ihre Hobbys? Meine Hobbys sind Ski ____ und Musik ____.',
    options: [
      { value: 'a', label: 'a) treffen... singen' },
      { value: 'b', label: 'b) fahren... singen' },
      { value: 'c', label: 'c) fahren... hören' },
      { value: 'd', label: 'd) fahre... höre' },
    ],
    correct: 'c',
  },
  {
    id: 18,
    section: 'Pytania 15-25',
    prompt: 'Wie spät ist es? (12:25)',
    options: [
      { value: 'a', label: 'a) fünf nach halb eins' },
      { value: 'b', label: 'b) fünf vor halb eins' },
      { value: 'c', label: 'c) fünfundzwanzig nach zwölf' },
      { value: 'd', label: 'd) fünfunddreißig vor eins' },
    ],
    correct: 'b',
  },
  {
    id: 19,
    section: 'Pytania 15-25',
    prompt: 'Wann geht ihr am Wochenende ins Kino? ___ Sonntag ___ 20 Uhr. Kommst du mit?',
    options: [
      { value: 'a', label: 'a) Um ... um' },
      { value: 'b', label: 'b) Am ... um' },
      { value: 'c', label: 'c) Von ... bis' },
      { value: 'd', label: 'd) Um ... am' },
    ],
    correct: 'b',
  },
  {
    id: 20,
    section: 'Pytania 15-25',
    prompt: 'Was möchtet ihr zum Frühstück? Wir ____ gern Müsli.',
    options: [
      { value: 'a', label: 'a) möchte' },
      { value: 'b', label: 'b) möchtet' },
      { value: 'c', label: 'c) möchtest' },
      { value: 'd', label: 'd) möchten' },
    ],
    correct: 'd',
  },
  {
    id: 21,
    section: 'Pytania 15-25',
    prompt: 'Isst du gern Fleisch? ____',
    options: [
      { value: 'a', label: 'a) Danke, ebenfalls.' },
      { value: 'b', label: 'b) Nein, nie.' },
      { value: 'c', label: 'c) Bitte, nein!' },
      { value: 'd', label: 'd) Sehr gut, danke.' },
    ],
    correct: 'b',
  },
  {
    id: 22,
    section: 'Pytania 15-25',
    prompt: 'Kannst du mich abholen? ________',
    options: [
      { value: 'a', label: 'a) Der Zug um 10 Uhr ankommt.' },
      { value: 'b', label: 'b) Der Zug ankommen um 10 Uhr.' },
      { value: 'c', label: 'c) Um 10 Uhr ankommt der Zug.' },
      { value: 'd', label: 'd) Der Zug kommt um 10 Uhr an.' },
    ],
    correct: 'd',
  },
  {
    id: 23,
    section: 'Pytania 15-25',
    prompt: 'Was ___ du gestern ______?',
    options: [
      { value: 'a', label: 'a) habe ... gemacht' },
      { value: 'b', label: 'b) hast ... machen' },
      { value: 'c', label: 'c) hast ... gemacht' },
      { value: 'd', label: 'd) hat ... gemacht' },
    ],
    correct: 'c',
  },
  {
    id: 24,
    section: 'Pytania 15-25',
    prompt: 'Ich habe ___ 8.30 Uhr ___ 16 Uhr gearbeitet.',
    options: [
      { value: 'a', label: 'a) von … bis' },
      { value: 'b', label: 'b) um … am' },
      { value: 'c', label: 'c) am … um' },
      { value: 'd', label: 'd) bis … von' },
    ],
    correct: 'a',
  },
  {
    id: 25,
    section: 'Pytania 15-25',
    prompt: 'Ich ____ erst um 22 Uhr nach Hause ____.',
    options: [
      { value: 'a', label: 'a) bin... gefahren' },
      { value: 'b', label: 'b) ist... fahren' },
      { value: 'c', label: 'c) ist... gefahren' },
      { value: 'd', label: 'd) hat... gefahren' },
    ],
    correct: 'a',
  },
  {
    id: 26,
    section: 'Pytania 26-39',
    prompt: 'Das Kino ist neben ___ Post.',
    options: [
      { value: 'a', label: 'a) der' },
      { value: 'b', label: 'b) die' },
      { value: 'c', label: 'c) das' },
      { value: 'd', label: 'd) dem' },
    ],
    correct: 'a',
  },
  {
    id: 27,
    section: 'Pytania 26-39',
    prompt: 'Entschuldigung! Ich suche das Hotel Ibis. Fahren Sie zuerst ____ ☝️ und biegen Sie dann nach ____ 👉.',
    options: [
      { value: 'a', label: 'a) geradeaus... rechts' },
      { value: 'b', label: 'b) links... geradeaus' },
      { value: 'c', label: 'c) geradeaus... links' },
      { value: 'd', label: 'd) rechts... links' },
    ],
    correct: 'a',
  },
  {
    id: 28,
    section: 'Pytania 26-39',
    prompt: 'Hier wohnt Maria. Wie findest du ____ Garten?',
    options: [
      { value: 'a', label: 'a) seinen' },
      { value: 'b', label: 'b) ihre' },
      { value: 'c', label: 'c) ihren' },
      { value: 'd', label: 'd) sein' },
    ],
    correct: 'c',
  },
  {
    id: 29,
    section: 'Pytania 26-39',
    prompt: 'Frauke, Lisa, sind das eure Hefte? Nein, sie gehören ____ nicht.',
    options: [
      { value: 'a', label: 'a) dir' },
      { value: 'b', label: 'b) uns' },
      { value: 'c', label: 'c) ihr' },
      { value: 'd', label: 'd) euch' },
    ],
    correct: 'b',
  },
  {
    id: 30,
    section: 'Pytania 26-39',
    prompt: 'Ich fahre jedes Jahr einmal nach Italien. Wirklich? Was ____ so gut an der Stadt?',
    options: [
      { value: 'a', label: 'a) gefällst du' },
      { value: 'b', label: 'b) gefällst dir' },
      { value: 'c', label: 'c) gefällt du' },
      { value: 'd', label: 'd) gefällt dir' },
    ],
    correct: 'd',
  },
  {
    id: 31,
    section: 'Pytania 26-39',
    prompt: 'Tom ist nach Österreich _____ gereist.',
    options: [
      { value: 'a', label: 'a) vor drei Jahre' },
      { value: 'b', label: 'b) vor drei Jahren' },
      { value: 'c', label: 'c) in drei Jahren' },
      { value: 'd', label: 'd) für drei Jahren' },
    ],
    correct: 'b',
  },
  {
    id: 32,
    section: 'Pytania 26-39',
    prompt: 'Was willst du später mal werden? Ich ___ Anwalt ____.',
    options: [
      { value: 'a', label: 'a) will ... werden' },
      { value: 'b', label: 'b) werden ... will' },
      { value: 'c', label: 'c) ... werden wollen' },
      { value: 'd', label: 'd) ... will werden' },
    ],
    correct: 'a',
  },
  {
    id: 33,
    section: 'Pytania 26-39',
    prompt: 'Ich gehe nie ____ _____ Tasche aus dem Haus.',
    options: [
      { value: 'a', label: 'a) ohne meine' },
      { value: 'b', label: 'b) mit meinem' },
      { value: 'c', label: 'c) ohne meinen' },
      { value: 'd', label: 'd) ohne meinem' },
    ],
    correct: 'a',
  },
  {
    id: 34,
    section: 'Pytania 26-39',
    prompt: 'Der Arzt sagt, ich ____ viel Wasser trinken.',
    options: [
      { value: 'a', label: 'a) sollst' },
      { value: 'b', label: 'b) sollen' },
      { value: 'c', label: 'c) soll' },
      { value: 'd', label: 'd) sollt' },
    ],
    correct: 'c',
  },
  {
    id: 35,
    section: 'Pytania 26-39',
    prompt: 'Ich bin krank, aber ich komme trotzdem ins Büro. Nein, _______ zu Hause!',
    options: [
      { value: 'a', label: 'a) bleib Sie' },
      { value: 'b', label: 'b) bleiben Sie' },
      { value: 'c', label: 'c) Sie sollen' },
      { value: 'd', label: 'd) sollen Sie' },
    ],
    correct: 'b',
  },
  {
    id: 36,
    section: 'Pytania 26-39',
    prompt: 'Wie hat dir Peters Party ______?',
    options: [
      { value: 'a', label: 'a) gefallen' },
      { value: 'b', label: 'b) fallen' },
      { value: 'c', label: 'c) gefunden' },
      { value: 'd', label: 'd) gekommen' },
    ],
    correct: 'a',
  },
  {
    id: 37,
    section: 'Pytania 26-39',
    prompt: 'Wo ____ ihr gestern? Im Büro, wir _____ viel Arbeit.',
    options: [
      { value: 'a', label: 'a) seid … haben' },
      { value: 'b', label: 'b) warst … hatte' },
      { value: 'c', label: 'c) wart … hatten' },
      { value: 'd', label: 'd) wart … hattet' },
    ],
    correct: 'c',
  },
  {
    id: 38,
    section: 'Pytania 26-39',
    prompt: 'Ich bin so fix und fertig! _____ doch einen Kaffee.',
    options: [
      { value: 'a', label: 'a) Trinkst' },
      { value: 'b', label: 'b) Trink' },
      { value: 'c', label: 'c) Trinkt' },
      { value: 'd', label: 'd) Trinken' },
    ],
    correct: 'b',
  },
  {
    id: 39,
    section: 'Pytania 26-39',
    prompt: 'Florian kommt um 18.23 Uhr an. Kannst du ____ am Bahnhof abholen?',
    options: [
      { value: 'a', label: 'a) er' },
      { value: 'b', label: 'b) sie' },
      { value: 'c', label: 'c) es' },
      { value: 'd', label: 'd) ihn' },
    ],
    correct: 'd',
  },
  {
    id: 40,
    section: 'Pytania 40-47',
    prompt: 'Hier _____ man nicht parken. Das ist verboten!',
    options: [
      { value: 'a', label: 'a) muss' },
      { value: 'b', label: 'b) kann' },
      { value: 'c', label: 'c) darf' },
      { value: 'd', label: 'd) will' },
    ],
    correct: 'c',
  },
  {
    id: 41,
    section: 'Pytania 40-47',
    prompt: 'Motorradfahrer _____ immer einen Helm tragen.',
    options: [
      { value: 'a', label: 'a) müssen' },
      { value: 'b', label: 'b) dürfen' },
      { value: 'c', label: 'c) dürfen nicht' },
      { value: 'd', label: 'd) müssen nicht' },
    ],
    correct: 'a',
  },
  {
    id: 42,
    section: 'Pytania 40-47',
    prompt: 'Der Pulli gefällt mir besser ____ die Mütze. Aber _____ gefällt mir das Kleid.',
    options: [
      { value: 'a', label: 'a) wie... am meisten' },
      { value: 'b', label: 'b) als... am besten' },
      { value: 'c', label: 'c) als... am meisten' },
      { value: 'd', label: 'd) wie... am besten' },
    ],
    correct: 'b',
  },
  {
    id: 43,
    section: 'Pytania 40-47',
    prompt: 'Wir spielen Fußball. Kommst du mit? Nein, ich sehe _____ fern.',
    options: [
      { value: 'a', label: 'a) gern' },
      { value: 'b', label: 'b) mehr' },
      { value: 'c', label: 'c) am besten' },
      { value: 'd', label: 'd) lieber' },
    ],
    correct: 'd',
  },
  {
    id: 44,
    section: 'Pytania 40-47',
    prompt: 'Wir waren gestern am See, denn _________',
    options: [
      { value: 'a', label: 'a) sehr heiß war es' },
      { value: 'b', label: 'b) sehr heiß es war' },
      { value: 'c', label: 'c) es war sehr heiß' },
      { value: 'd', label: 'd) es sehr heiß war' },
    ],
    correct: 'c',
  },
  {
    id: 45,
    section: 'Pytania 40-47',
    prompt: 'Die Sonne scheint, der Himmel ist wolken___.',
    options: [
      { value: 'a', label: 'a) -los' },
      { value: 'b', label: 'b) -bar' },
      { value: 'c', label: 'c) -ig' },
      { value: 'd', label: 'd) -lich' },
    ],
    correct: 'a',
  },
  {
    id: 46,
    section: 'Pytania 40-47',
    prompt: 'Welches Datum ist heute? _____ Januar (7.1)',
    options: [
      { value: 'a', label: 'a) Der sieben' },
      { value: 'b', label: 'b) Das siebte' },
      { value: 'c', label: 'c) Der siebte' },
      { value: 'd', label: 'd) Der siebente' },
    ],
    correct: 'c',
  },
  {
    id: 47,
    section: 'Pytania 40-47',
    prompt: 'Ich habe am Wochenende Geburtstag und ____ gern mit Euch ____. Kommt am Montag um ...',
    options: [
      { value: 'a', label: 'a) würden feiern' },
      { value: 'b', label: 'b) würde feiere' },
      { value: 'c', label: 'c) würde feiern' },
      { value: 'd', label: 'd) würden feiere' },
    ],
    correct: 'c',
  },
  {
    id: 48,
    section: 'Pytania 48-50',
    sectionIntro: `📖 Przeczytaj tekst i odpowiedz Richtig (prawda) lub Falsch (fałsz):

„Lieber Nikolas,
wir haben endlich eine neue Wohnung gefunden! Sie hat einen großen Garten. Am Samstag machen wir eine Party. Kommst du? Unsere Katze Mimi freut sich auch schon auf dich!
Liebe Grüße,
Hanna und Tobias"`,
    prompt: 'Nikolas feiert in seinem Garten eine Party.',
    options: [
      { value: 'r', label: 'Richtig' },
      { value: 'f', label: 'Falsch' },
    ],
    correct: 'f',
  },
  {
    id: 49,
    section: 'Pytania 48-50',
    prompt: 'Hanna und Tobias haben eine neue Wohnung mit Garten gefunden.',
    options: [
      { value: 'r', label: 'Richtig' },
      { value: 'f', label: 'Falsch' },
    ],
    correct: 'r',
  },
  {
    id: 50,
    section: 'Pytania 48-50',
    prompt: 'Sie haben einen Hund. Er heißt Max.',
    options: [
      { value: 'r', label: 'Richtig' },
      { value: 'f', label: 'Falsch' },
    ],
    correct: 'f',
  },
]

const questionsA2: Question[] = [
  {
    id: 51,
    section: 'Pytania 51-63',
    prompt: 'Jasmin, Lisa, habt ihr ___ Englischbücher wieder vergessen?',
    options: [
      { value: 'a', label: 'a) unsere' },
      { value: 'b', label: 'b) ihre' },
      { value: 'c', label: 'c) eure' },
      { value: 'd', label: 'd) euer' },
    ],
    correct: 'c',
  },
  {
    id: 52,
    section: 'Pytania 51-63',
    prompt: 'Kennt ihr eigentlich schon meine Freunde? Auf diesem Foto siehst du unser__ Nachbarn mit sein__ neuen Frau.',
    options: [
      { value: 'a', label: 'a) -n -en' },
      { value: 'b', label: 'b) -en -en' },
      { value: 'c', label: 'c) -e -er' },
      { value: 'd', label: 'd) -en -er' },
    ],
    correct: 'd',
  },
  {
    id: 53,
    section: 'Pytania 51-63',
    prompt: 'Wo ist denn der neue Spiegel? Der ____ doch schon über dem Bett.',
    options: [
      { value: 'a', label: 'a) liegt' },
      { value: 'b', label: 'b) hängt' },
      { value: 'c', label: 'c) steht' },
      { value: 'd', label: 'd) stellt' },
    ],
    correct: 'b',
  },
  {
    id: 54,
    section: 'Pytania 51-63',
    prompt: 'Lisa, hast du die neue Lampe gesehen? Ja, sie steht ___ Tür. Stell sie doch bitte gleich ___ Tisch.',
    options: [
      { value: 'a', label: 'a) hinter der … auf den' },
      { value: 'b', label: 'b) hinter die … auf der' },
      { value: 'c', label: 'c) vor der … auf die' },
      { value: 'd', label: 'd) an die … unter den' },
    ],
    correct: 'a',
  },
  {
    id: 55,
    section: 'Pytania 51-63',
    prompt: 'Guten Tag. Wir wollen ein neues Auto kaufen und möchten uns beraten lassen. Gern. Da können Sie eine Berat___ bekommen - unser Berat__ hat gleich Zeit für Sie.',
    options: [
      { value: 'a', label: 'a) -ung -ung' },
      { value: 'b', label: 'b) -er -ung' },
      { value: 'c', label: 'c) -er -er' },
      { value: 'd', label: 'd) -ung -er' },
    ],
    correct: 'd',
  },
  {
    id: 56,
    section: 'Pytania 51-63',
    prompt: 'Ich hätte gern ein__ groß__ Kaffee mit Milch.',
    options: [
      { value: 'a', label: 'a) ein großer' },
      { value: 'b', label: 'b) eine große' },
      { value: 'c', label: 'c) einen großen' },
      { value: 'd', label: 'd) einen große' },
    ],
    correct: 'c',
  },
  {
    id: 57,
    section: 'Pytania 51-63',
    prompt: 'Bitte bringen Sie mir das kleine Frühstück mit einem ____ Tee.',
    options: [
      { value: 'a', label: 'a) grüne' },
      { value: 'b', label: 'b) grüner' },
      { value: 'c', label: 'c) grünen' },
      { value: 'd', label: 'd) grünem' },
    ],
    correct: 'c',
  },
  {
    id: 58,
    section: 'Pytania 51-63',
    prompt: 'Wie findest du das ____ Smartphone?',
    options: [
      { value: 'a', label: 'a) neu' },
      { value: 'b', label: 'b) neuen' },
      { value: 'c', label: 'c) neues' },
      { value: 'd', label: 'd) neue' },
    ],
    correct: 'd',
  },
  {
    id: 59,
    section: 'Pytania 51-63',
    prompt: 'Ich will den _____ Domplatz mit den ______ Blumen ansehen',
    options: [
      { value: 'a', label: 'a) alten ... schön' },
      { value: 'b', label: 'b) alten ... schönen' },
      { value: 'c', label: 'c) alten ... schönem' },
      { value: 'd', label: 'd) alt ... schönen' },
    ],
    correct: 'b',
  },
  {
    id: 60,
    section: 'Pytania 51-63',
    prompt: 'Ab wann ist deine Cousine zu Besuch? ________',
    options: [
      { value: 'a', label: 'a) Am 20. April.' },
      { value: 'b', label: 'b) Vom 20. April an.' },
      { value: 'c', label: 'c) Seit dem 20. April.' },
      { value: 'd', label: 'd) Vom 6. bis zum 20. April.' },
    ],
    correct: 'b',
  },
  {
    id: 61,
    section: 'Pytania 51-63',
    prompt: 'Warst du schon einmal in Düsseldorf? Ja, aber das ist schon ___ 8 Jahre her.',
    options: [
      { value: 'a', label: 'a) seit' },
      { value: 'b', label: 'b) vor' },
      { value: 'c', label: 'c) über' },
      { value: 'd', label: 'd) für' },
    ],
    correct: 'c',
  },
  {
    id: 62,
    section: 'Pytania 51-63',
    prompt: 'Wie lange lernst du schon Italienisch? _____ einem Monat.',
    options: [
      { value: 'a', label: 'a) Seit' },
      { value: 'b', label: 'b) Vor' },
      { value: 'c', label: 'c) Über' },
      { value: 'd', label: 'd) Für' },
    ],
    correct: 'a',
  },
  {
    id: 63,
    section: 'Pytania 51-63',
    prompt: 'Sie müssen auf Ihre Diät achten. Sie _____ abnehmen.',
    options: [
      { value: 'a', label: 'a) sollte' },
      { value: 'b', label: 'b) soll' },
      { value: 'c', label: 'c) müssten' },
      { value: 'd', label: 'd) sollten' },
    ],
    correct: 'd',
  },
  {
    id: 64,
    section: 'Pytania 64-75',
    prompt: 'Wir könnten _____ 7:00 und 7:15 Uhr schwimmen gehen.',
    options: [
      { value: 'a', label: 'a) jeden Morgen ab' },
      { value: 'b', label: 'b) morgens zwischen' },
      { value: 'c', label: 'c) morgens um' },
      { value: 'd', label: 'd) morgens von' },
    ],
    correct: 'b',
  },
  {
    id: 65,
    section: 'Pytania 64-75',
    prompt: 'Du kannst nicht abnehmen, _________',
    options: [
      { value: 'a', label: 'a) weil du zu wenig Sport machst' },
      { value: 'b', label: 'b) deshalb machst du wenig Sport' },
      { value: 'c', label: 'c) deshalb du wenig Sport machst' },
      { value: 'd', label: 'd) weil du machst zu wenig Sport' },
    ],
    correct: 'a',
  },
  {
    id: 66,
    section: 'Pytania 64-75',
    prompt: 'Ich habe gestern bis spät in die Nacht genetflixt. _____ bin ich so müde.',
    options: [
      { value: 'a', label: 'a) Denn' },
      { value: 'b', label: 'b) Dann' },
      { value: 'c', label: 'c) Deshalb' },
      { value: 'd', label: 'd) Weil' },
    ],
    correct: 'c',
  },
  {
    id: 67,
    section: 'Pytania 64-75',
    prompt: 'Groß__ Firma bietet interesant__ Stellen',
    options: [
      { value: 'a', label: 'a) -en -er' },
      { value: 'b', label: 'b) -e -en' },
      { value: 'c', label: 'c) -er -e' },
      { value: 'd', label: 'd) -e -e' },
    ],
    correct: 'd',
  },
  {
    id: 68,
    section: 'Pytania 64-75',
    prompt: 'Suchen Sie eine Arbeit mit gut__ Lohn und flexibl__ Arbeitszeiten?',
    options: [
      { value: 'a', label: 'a) -em -e' },
      { value: 'b', label: 'b) -er -e' },
      { value: 'c', label: 'c) -em -en' },
      { value: 'd', label: 'd) -es -en' },
    ],
    correct: 'c',
  },
  {
    id: 69,
    section: 'Pytania 64-75',
    prompt: 'Schade, ____ es keinen Kaffee mehr gibt.',
    options: [
      { value: 'a', label: 'a) warum' },
      { value: 'b', label: 'b) dass' },
      { value: 'c', label: 'c) aber' },
      { value: 'd', label: 'd) denn' },
    ],
    correct: 'b',
  },
  {
    id: 70,
    section: 'Pytania 64-75',
    prompt: 'Ich freue mich, dass ______',
    options: [
      { value: 'a', label: 'a) die Schule endlich vorbei ist' },
      { value: 'b', label: 'b) endlich vorbei ist die Schule' },
      { value: 'c', label: 'c) endlich ist vorbei die Schule' },
      { value: 'd', label: 'd) die Schule ist vorbei endlich' },
    ],
    correct: 'a',
  },
  {
    id: 71,
    section: 'Pytania 64-75',
    prompt: 'Die Rechnung, bitte. Gern, zahlen Sie ______ oder getrennt? Getrennt. - Ein Eisbecher, das ____ 2,80 Euro',
    options: [
      { value: 'a', label: 'a) miteinander ... sind' },
      { value: 'b', label: 'b) zusammen ... macht' },
      { value: 'c', label: 'c) allein ... macht' },
      { value: 'd', label: 'd) zusammen ... stimmt' },
    ],
    correct: 'b',
  },
  {
    id: 72,
    section: 'Pytania 64-75',
    prompt: 'Wir treffen uns um vier Uhr im Café? Ja, super! Ich freue ____ schon!',
    options: [
      { value: 'a', label: 'a) mich' },
      { value: 'b', label: 'b) sich' },
      { value: 'c', label: 'c) dich' },
      { value: 'd', label: 'd) mir' },
    ],
    correct: 'a',
  },
  {
    id: 73,
    section: 'Pytania 64-75',
    prompt: 'Ich habe viel zu viele Aufgaben. Dann beschwer ___ beim Chef.',
    options: [
      { value: 'a', label: 'a) sich' },
      { value: 'b', label: 'b) uns' },
      { value: 'c', label: 'c) mich' },
      { value: 'd', label: 'd) dich' },
    ],
    correct: 'd',
  },
  {
    id: 74,
    section: 'Pytania 64-75',
    prompt: '_____ es warm ist, esse ich gern Eis.',
    options: [
      { value: 'a', label: 'a) Denn' },
      { value: 'b', label: 'b) Weil' },
      { value: 'c', label: 'c) Wann' },
      { value: 'd', label: 'd) Wenn' },
    ],
    correct: 'd',
  },
  {
    id: 75,
    section: 'Pytania 64-75',
    prompt: 'Ich gehe in den Park spazieren, _____',
    options: [
      { value: 'a', label: 'a) wann die Sonne scheint' },
      { value: 'b', label: 'b) wenn scheint die Sonne' },
      { value: 'c', label: 'c) wenn die Sonne scheint' },
      { value: 'd', label: 'd) wann scheint die Sonne' },
    ],
    correct: 'c',
  },
  {
    id: 76,
    section: 'Pytania 76-97',
    prompt: '____ Jan nach Deutschland gekommen ist, hat er noch kein Wort Deutsch gesprochen.',
    options: [
      { value: 'a', label: 'a) Wenn' },
      { value: 'b', label: 'b) Als' },
      { value: 'c', label: 'c) Seit' },
      { value: 'd', label: 'd) Wann' },
    ],
    correct: 'b',
  },
  {
    id: 77,
    section: 'Pytania 76-97',
    prompt: 'Hani war sieben Jahr alt, ________',
    options: [
      { value: 'a', label: 'a) als sie ist zum ersten Mal ans Meer gefahren' },
      { value: 'b', label: 'b) wenn sie zum ersten Mal ans Meer gefahren ist' },
      { value: 'c', label: 'c) als sie zum ersten Mal ans Meer gefahren ist' },
      { value: 'd', label: 'd) wenn sie ist zum ersten Mal ans Meer gefahren' },
    ],
    correct: 'c',
  },
  {
    id: 78,
    section: 'Pytania 76-97',
    prompt: 'Die Kollegen haben mir geholfen, _____ ich eine Bitte hatte.',
    options: [
      { value: 'a', label: 'a) dann als' },
      { value: 'b', label: 'b) immer als' },
      { value: 'c', label: 'c) immer wenn' },
      { value: 'd', label: 'd) immer wann' },
    ],
    correct: 'c',
  },
  {
    id: 79,
    section: 'Pytania 76-97',
    prompt: 'Unsere Kursteilnehmer _____ mit extra Übungen unterstützt',
    options: [
      { value: 'a', label: 'a) sein' },
      { value: 'b', label: 'b) sind' },
      { value: 'c', label: 'c) wird' },
      { value: 'd', label: 'd) werden' },
    ],
    correct: 'd',
  },
  {
    id: 80,
    section: 'Pytania 76-97',
    prompt: 'Die Waren ______.',
    options: [
      { value: 'a', label: 'a) schon werden morgens ausgeliefert' },
      { value: 'b', label: 'b) werden schon morgens ausgeliefert' },
      { value: 'c', label: 'c) ausgeliefert werden schon morgens' },
      { value: 'd', label: 'd) morgens werden schon ausgeliefert' },
    ],
    correct: 'b',
  },
  {
    id: 81,
    section: 'Pytania 76-97',
    prompt: 'Der Vater ___ ______',
    options: [
      { value: 'a', label: 'a) kauft seinen Kindern einen Ball' },
      { value: 'b', label: 'b) kauft einen Ball seinen Kindern' },
      { value: 'c', label: 'c) seinen Kindern einen Ball kauft' },
      { value: 'd', label: 'd) kauft einen Ball seinen Kindern' },
    ],
    correct: 'a',
  },
  {
    id: 82,
    section: 'Pytania 76-97',
    prompt: 'Papa, wann bekommen wir unser Buch? Ich bringe ____ ____ gleich.',
    options: [
      { value: 'a', label: 'a) es euch' },
      { value: 'b', label: 'b) ihr es' },
      { value: 'c', label: 'c) euch es' },
      { value: 'd', label: 'd) es dir' },
    ],
    correct: 'a',
  },
  {
    id: 83,
    section: 'Pytania 76-97',
    prompt: 'Entschuldigung! Können Sie mir sagen, _________',
    options: [
      { value: 'a', label: 'a) ob es hier eine Bank gibt' },
      { value: 'b', label: 'b) ob gibt es hier eine Bank' },
      { value: 'c', label: 'c) gibt es hier eine Bank' },
      { value: 'd', label: 'd) wo gibt es hier eine Bank' },
    ],
    correct: 'a',
  },
  {
    id: 84,
    section: 'Pytania 76-97',
    prompt: 'Gehen Sie durch ___ Glastür und an ___ Frühstücksraum vorbei. Gegenüber von ____ Treppe ist der Fitnessraum.',
    options: [
      { value: 'a', label: 'a) die... dem... der' },
      { value: 'b', label: 'b) der... die... der' },
      { value: 'c', label: 'c) die... der... der' },
      { value: 'd', label: 'd) die... dem... die' },
    ],
    correct: 'a',
  },
  {
    id: 85,
    section: 'Pytania 76-97',
    prompt: 'Ich mache am liebsten ____ Meer Urlaub aber ich fahre gern ___ Gebirge.',
    options: [
      { value: 'a', label: 'a) ans ... ins' },
      { value: 'b', label: 'b) beim ... im' },
      { value: 'c', label: 'c) am ... nach' },
      { value: 'd', label: 'd) am ... ins' },
    ],
    correct: 'd',
  },
  {
    id: 86,
    section: 'Pytania 76-97',
    prompt: 'Wir fahren gern ____ Frankreich. Da haben wir auch Familie.',
    options: [
      { value: 'a', label: 'a) in' },
      { value: 'b', label: 'b) ins' },
      { value: 'c', label: 'c) nach' },
      { value: 'd', label: 'd) aufs' },
    ],
    correct: 'c',
  },
  {
    id: 87,
    section: 'Pytania 76-97',
    prompt: 'Hast du Lust ____ einen heißen Tee?',
    options: [
      { value: 'a', label: 'a) für' },
      { value: 'b', label: 'b) mit' },
      { value: 'c', label: 'c) über' },
      { value: 'd', label: 'd) auf' },
    ],
    correct: 'd',
  },
  {
    id: 88,
    section: 'Pytania 76-97',
    prompt: 'In einem Monat fahren wir an die Ostsee ____ freue ich mich schon sehr!',
    options: [
      { value: 'a', label: 'a) Worauf' },
      { value: 'b', label: 'b) Darauf' },
      { value: 'c', label: 'c) Daran' },
      { value: 'd', label: 'd) Wofür' },
    ],
    correct: 'b',
  },
  {
    id: 89,
    section: 'Pytania 76-97',
    prompt: 'Hallo Heike, du siehst heute aber nicht gut aus. Nein, ich komme gerade ____ Arzt. Ich muss ___ Bett bleiben.',
    options: [
      { value: 'a', label: 'a) vom... ins' },
      { value: 'b', label: 'b) beim... in' },
      { value: 'c', label: 'c) von der... ins' },
      { value: 'd', label: 'd) vom... im' },
    ],
    correct: 'd',
  },
  {
    id: 90,
    section: 'Pytania 76-97',
    prompt: 'Als Kind _____ ich keine Computerspiele spielen. Ich _____ viel lernen.',
    options: [
      { value: 'a', label: 'a) mochte... musste' },
      { value: 'b', label: 'b) musste... sollte' },
      { value: 'c', label: 'c) wollte... musste' },
      { value: 'd', label: 'd) durfte... sollte' },
    ],
    correct: 'd',
  },
  {
    id: 91,
    section: 'Pytania 76-97',
    prompt: 'Morgen fahre ich in die Werkstatt und ____ mein Auto reparieren.',
    options: [
      { value: 'a', label: 'a) mache' },
      { value: 'b', label: 'b) lasse' },
      { value: 'c', label: 'c) habe' },
      { value: 'd', label: 'd) sage' },
    ],
    correct: 'b',
  },
  {
    id: 92,
    section: 'Pytania 76-97',
    prompt: 'Siehst du den Mann da drüben? ____ meinst du? ____ mit dem schwarzen Mantel?',
    options: [
      { value: 'a', label: 'a) Welchen ... Den' },
      { value: 'b', label: 'b) Welcher ... Der' },
      { value: 'c', label: 'c) Welche ... Den' },
      { value: 'd', label: 'd) Welche ... Der' },
    ],
    correct: 'a',
  },
  {
    id: 93,
    section: 'Pytania 76-97',
    prompt: 'Auto fahren macht mir richtig Spaß, ____ ich ein neues Auto habe.',
    options: [
      { value: 'a', label: 'a) als' },
      { value: 'b', label: 'b) da' },
      { value: 'c', label: 'c) seit' },
      { value: 'd', label: 'd) bis' },
    ],
    correct: 'c',
  },
  {
    id: 94,
    section: 'Pytania 76-97',
    prompt: 'Nur noch 10 Minuten, ____ der Film beginnt. Wie kommen wir ins Kino so schnell?',
    options: [
      { value: 'a', label: 'a) seit' },
      { value: 'b', label: 'b) bis' },
      { value: 'c', label: 'c) dann' },
      { value: 'd', label: 'd) wenn' },
    ],
    correct: 'b',
  },
  {
    id: 95,
    section: 'Pytania 76-97',
    prompt: 'Das ist der Mann, ___ ich gestern kennengelernt habe.',
    options: [
      { value: 'a', label: 'a) das' },
      { value: 'b', label: 'b) die' },
      { value: 'c', label: 'c) der' },
      { value: 'd', label: 'd) den' },
    ],
    correct: 'd',
  },
  {
    id: 96,
    section: 'Pytania 76-97',
    prompt: 'Ich rief „Hallo, hört mich einer?", aber niemand _____',
    options: [
      { value: 'a', label: 'a) antwortet' },
      { value: 'b', label: 'b) antwortete' },
      { value: 'c', label: 'c) geantwortet' },
      { value: 'd', label: 'd) antworten' },
    ],
    correct: 'b',
  },
  {
    id: 97,
    section: 'Pytania 76-97',
    prompt: 'Nach der Schule ___ Jasmin ins Ausland.',
    options: [
      { value: 'a', label: 'a) fahren' },
      { value: 'b', label: 'b) gefahren' },
      { value: 'c', label: 'c) fuhr' },
      { value: 'd', label: 'd) fahre' },
    ],
    correct: 'c',
  },
  {
    id: 98,
    section: 'Pytania 98-100',
    sectionIntro: `📖 Przeczytaj dyskusję na forum i odpowiedz Richtig (prawda) lub Falsch (fałsz):

HaniNeu: Was habt Ihr nach der Schule gemacht? Seid Ihr ins Ausland gegangen oder habt Ihr gleich weitergelernt oder gearbeitet? Ich mache im Mai Abitur und weiß nicht, was ich machen soll.

Loco97: Ich habe nach der Schule ein Jahr lang in Rom in einem Restaurant gearbeitet. Ich wurde selbständig und mein erstes Geld verdient.

Jimmy: Ich bin in einem halben Jahr mit dem Studium fertig. Danach möchte ich eine Arbeit finden, am liebsten in einem Hotel. Vielleicht kaufe ich eine Wohnung, wenn ich einen Kredit bekomme.`,
    prompt: 'HaniNeu geht noch zur Schule.',
    options: [
      { value: 'r', label: 'Richtig' },
      { value: 'f', label: 'Falsch' },
    ],
    correct: 'r',
  },
  {
    id: 99,
    section: 'Pytania 98-100',
    prompt: 'Loco97 hat vor einem Jahr in einem Restaurant gearbeitet.',
    options: [
      { value: 'r', label: 'Richtig' },
      { value: 'f', label: 'Falsch' },
    ],
    correct: 'f',
  },
  {
    id: 100,
    section: 'Pytania 98-100',
    prompt: 'Jimmy hat einen Kredit für eine eigene Wohnung genommen.',
    options: [
      { value: 'r', label: 'Richtig' },
      { value: 'f', label: 'Falsch' },
    ],
    correct: 'f',
  },
]

const questionsB1: Question[] = [
  {
    id: 101,
    section: 'Pytania 101-113',
    prompt: 'Jana hat leider ihre Arbeit verloren. - Die Arm_!',
    options: [
      { value: 'a', label: 'a) -e' },
      { value: 'b', label: 'b) -' },
      { value: 'c', label: 'c) -n' },
      { value: 'd', label: 'd) -en' },
    ],
    correct: 'a',
  },
  {
    id: 102,
    section: 'Pytania 101-113',
    prompt: 'Hast du schon unseren neuen Nachbar___ erlebt? Er ist ein sehr interessanter Mensch___.',
    options: [
      { value: 'a', label: 'a) -en... -en' },
      { value: 'b', label: 'b) -n... -' },
      { value: 'c', label: 'c) -n... -en' },
      { value: 'd', label: 'd) -en... -' },
    ],
    correct: 'b',
  },
  {
    id: 103,
    section: 'Pytania 101-113',
    prompt: 'Der erste Tag war ganz gut. Die Leiterin ___ mich durch den Betrieb und ___ mir wichtige Hinweise.',
    options: [
      { value: 'a', label: 'a) führte ... gab' },
      { value: 'b', label: 'b) geführt ... gegeben' },
      { value: 'c', label: 'c) führen ... geben' },
      { value: 'd', label: 'd) fährt ... gibt' },
    ],
    correct: 'a',
  },
  {
    id: 104,
    section: 'Pytania 101-113',
    prompt: 'Das sind die Leute, ____ ich gestern geholfen habe.',
    options: [
      { value: 'a', label: 'a) die' },
      { value: 'b', label: 'b) dem' },
      { value: 'c', label: 'c) denen' },
      { value: 'd', label: 'd) der' },
    ],
    correct: 'c',
  },
  {
    id: 105,
    section: 'Pytania 101-113',
    prompt: 'Das ist das Haus, ___ ich geträumt habe.',
    options: [
      { value: 'a', label: 'a) von dem' },
      { value: 'b', label: 'b) vom' },
      { value: 'c', label: 'c) den' },
      { value: 'd', label: 'd) davon' },
    ],
    correct: 'a',
  },
  {
    id: 106,
    section: 'Pytania 101-113',
    prompt: 'Wir fahren nie mit dem Zug in den Urlaub _____.',
    options: [
      { value: 'a', label: 'a) obwohl geht das schneller' },
      { value: 'b', label: 'b) trotzdem geht das schneller' },
      { value: 'c', label: 'c) obwohl das schneller geht' },
      { value: 'd', label: 'd) trotzdem das schneller geht' },
    ],
    correct: 'c',
  },
  {
    id: 107,
    section: 'Pytania 101-113',
    prompt: 'Dr. Geiger ist schon 65 Jahre alt. _______',
    options: [
      { value: 'a', label: 'a) Trotzdem er noch berufstätig ist' },
      { value: 'b', label: 'b) Obwohl ist er noch berufstätig' },
      { value: 'c', label: 'c) Obwohl er ist noch berufstätig' },
      { value: 'd', label: 'd) Trotzdem ist er noch berufstätig' },
    ],
    correct: 'd',
  },
  {
    id: 108,
    section: 'Pytania 101-113',
    prompt: 'Das war die beste Kostümparty, die ich je erlebt habe. Ich ____ mich immer daran _____. Vielen Dank!',
    options: [
      { value: 'a', label: 'a) wird ... erinnern' },
      { value: 'b', label: 'b) werde ... erinnern' },
      { value: 'c', label: 'c) werden ... erinnert' },
      { value: 'd', label: 'd) wird ... erinnert' },
    ],
    correct: 'b',
  },
  {
    id: 109,
    section: 'Pytania 101-113',
    prompt: 'Luna, du _____ jetzt endlich Sitz _____! Mein Hund will nicht hören!',
    options: [
      { value: 'a', label: 'a) sollst ... machen' },
      { value: 'b', label: 'b) darfst ... machen' },
      { value: 'c', label: 'c) musst ... machen' },
      { value: 'd', label: 'd) wirst ... machen' },
    ],
    correct: 'c',
  },
  {
    id: 110,
    section: 'Pytania 101-113',
    prompt: 'Gehen Sie zum Arzt, _______',
    options: [
      { value: 'a', label: 'a) falls Sie Ausschlag bekommen' },
      { value: 'b', label: 'b) falls bekommen Sie Ausschlag' },
      { value: 'c', label: 'c) wenn Sie bekommen Ausschlag' },
      { value: 'd', label: 'd) wenn bekommen Sie Ausschlag' },
    ],
    correct: 'a',
  },
  {
    id: 111,
    section: 'Pytania 101-113',
    prompt: 'Sie möchten wirklich 2 große Hunde in einer Wohnung halten? Es wäre gut, noch einmal darüber _______',
    options: [
      { value: 'a', label: 'a) zu denken nach' },
      { value: 'b', label: 'b) nachdenken' },
      { value: 'c', label: 'c) nachzudenken' },
      { value: 'd', label: 'd) nach zu denken' },
    ],
    correct: 'c',
  },
  {
    id: 112,
    section: 'Pytania 101-113',
    prompt: 'Sie gehen fast jeden Sonntag ins Schwimmbad? Dann empfehle ich Ihnen, _______',
    options: [
      { value: 'a', label: 'a) Sie kaufen eine Jahreskarte' },
      { value: 'b', label: 'b) eine Jahreskarte zu kaufen' },
      { value: 'c', label: 'c) kaufen Sie eine Jahreskarte' },
      { value: 'd', label: 'd) eine Jahreskarte kaufen' },
    ],
    correct: 'b',
  },
  {
    id: 113,
    section: 'Pytania 101-113',
    prompt: 'Ich höre immer gern Musik, ______',
    options: [
      { value: 'a', label: 'a) da jogge ich' },
      { value: 'b', label: 'b) da ich jogge' },
      { value: 'c', label: 'c) während jogge ich' },
      { value: 'd', label: 'd) während ich jogge' },
    ],
    correct: 'd',
  },
  {
    id: 114,
    section: 'Pytania 114-125',
    prompt: 'Sie sollten sich gut informieren, ______',
    options: [
      { value: 'a', label: 'a) da Sie ein Studium wählen' },
      { value: 'b', label: 'b) danach Sie ein Studium wählen' },
      { value: 'c', label: 'c) bevor Sie wählen ein Studium' },
      { value: 'd', label: 'd) bevor Sie ein Studium wählen' },
    ],
    correct: 'd',
  },
  {
    id: 115,
    section: 'Pytania 114-125',
    prompt: 'Mein Freund hat viele Wochen im Jahr frei, _____',
    options: [
      { value: 'a', label: 'a) weil ist er Lehrer' },
      { value: 'b', label: 'b) da ist er Lehrer' },
      { value: 'c', label: 'c) während er Lehrer ist' },
      { value: 'd', label: 'd) da er Lehrer ist' },
    ],
    correct: 'd',
  },
  {
    id: 116,
    section: 'Pytania 114-125',
    prompt: 'Das ____ Sortiment und die____ Preise finden Sie hier www.totto.de.',
    options: [
      { value: 'a', label: 'a) größten ... besten' },
      { value: 'b', label: 'b) größte ... besten' },
      { value: 'c', label: 'c) größte ... beste' },
      { value: 'd', label: 'd) größten ... beste' },
    ],
    correct: 'b',
  },
  {
    id: 117,
    section: 'Pytania 114-125',
    prompt: 'Das _____ Haus gefällt mir gut. Es ist aber auch teuer. Stimmt. Und ich würde mich auch in einem _____ Haus wohlfühlen.',
    options: [
      { value: 'a', label: 'a) größeren ... kleinere' },
      { value: 'b', label: 'b) größere ... kleineren' },
      { value: 'c', label: 'c) größer ... kleiner' },
      { value: 'd', label: 'd) größeren ... kleineren' },
    ],
    correct: 'b',
  },
  {
    id: 118,
    section: 'Pytania 114-125',
    prompt: 'Wenn mir ein Job große Freude bereitet, bin ich auch mit ______ Lohn zufrieden.',
    options: [
      { value: 'a', label: 'a) einem niedrigeren' },
      { value: 'b', label: 'b) ein niedrigeres' },
      { value: 'c', label: 'c) einen niedrigerem' },
      { value: 'd', label: 'd) einem niedrigerem' },
    ],
    correct: 'a',
  },
  {
    id: 119,
    section: 'Pytania 114-125',
    prompt: '_____ ich bloß früher gekommen! Jetzt ist der Supermarkt zu!',
    options: [
      { value: 'a', label: 'a) Wäre' },
      { value: 'b', label: 'b) Hätte' },
      { value: 'c', label: 'c) Wäre' },
      { value: 'd', label: 'd) Habe' },
    ],
    correct: 'a',
  },
  {
    id: 120,
    section: 'Pytania 114-125',
    prompt: 'Luis hat sich gleich am ersten Tag im neuen Job verspätet. Ja, das habe ich gehört. _____ er doch nur den einen Bus erwischt!',
    options: [
      { value: 'a', label: 'a) Hätte' },
      { value: 'b', label: 'b) Wäre' },
      { value: 'c', label: 'c) Hatte' },
      { value: 'd', label: 'd) Ist' },
    ],
    correct: 'a',
  },
  {
    id: 121,
    section: 'Pytania 114-125',
    prompt: 'Nachdem ihr Fahrrad kaputt ______, hat sie sich ein neues gekauft.',
    options: [
      { value: 'a', label: 'a) gehen ist' },
      { value: 'b', label: 'b) gehen war' },
      { value: 'c', label: 'c) gegangen ist' },
      { value: 'd', label: 'd) gegangen war' },
    ],
    correct: 'd',
  },
  {
    id: 122,
    section: 'Pytania 114-125',
    prompt: 'Nachdem ich ein Jahr lang Spanisch _____, bin ich nach Barcelona gereist.',
    options: [
      { value: 'a', label: 'a) lernen haben' },
      { value: 'b', label: 'b) gelernt war' },
      { value: 'c', label: 'c) gelernt hatte' },
      { value: 'd', label: 'd) gelernt habe' },
    ],
    correct: 'c',
  },
  {
    id: 123,
    section: 'Pytania 114-125',
    prompt: 'Dank ______ Teamarbeit haben wir das Projekt mit Erfolg abgeschlossen.',
    options: [
      { value: 'a', label: 'a) unserer guten' },
      { value: 'b', label: 'b) unserer guter' },
      { value: 'c', label: 'c) unser guten' },
      { value: 'd', label: 'd) unser guter' },
    ],
    correct: 'a',
  },
  {
    id: 124,
    section: 'Pytania 114-125',
    prompt: 'Trotz des ______ waren wir mit dem Ausflug zufrieden.',
    options: [
      { value: 'a', label: 'a) schlecht Wetter' },
      { value: 'b', label: 'b) schlechten Wetters' },
      { value: 'c', label: 'c) schlechten Wetter' },
      { value: 'd', label: 'd) schlechte Wetters' },
    ],
    correct: 'b',
  },
  {
    id: 125,
    section: 'Pytania 114-125',
    prompt: 'Die Ergebnisse der _____ Prüfung kannst du im Intranet checken.',
    options: [
      { value: 'a', label: 'a) heutiger' },
      { value: 'b', label: 'b) heutige' },
      { value: 'c', label: 'c) heutigen' },
      { value: 'd', label: 'd) heutig' },
    ],
    correct: 'c',
  },
  {
    id: 126,
    section: 'Pytania 126-147',
    prompt: 'An die Ostsee fahre ich _____ des sandigen Strandes besonders gern.',
    options: [
      { value: 'a', label: 'a) nämlich' },
      { value: 'b', label: 'b) wegen' },
      { value: 'c', label: 'c) deshalb' },
      { value: 'd', label: 'd) darum' },
    ],
    correct: 'b',
  },
  {
    id: 127,
    section: 'Pytania 126-147',
    prompt: 'Die Arbeit ist wirklich toll, _____ gehe ich jede Woche wieder gern hin.',
    options: [
      { value: 'a', label: 'a) deshalb' },
      { value: 'b', label: 'b) nämlich' },
      { value: 'c', label: 'c) wegen' },
      { value: 'd', label: 'd) warum' },
    ],
    correct: 'a',
  },
  {
    id: 128,
    section: 'Pytania 126-147',
    prompt: 'Ich muss meine Deutschkenntnisse auffrischen. Nächste Woche soll ich _____ mit einem deutschen Kunden telefonieren.',
    options: [
      { value: 'a', label: 'a) wegen' },
      { value: 'b', label: 'b) deshalb' },
      { value: 'c', label: 'c) nämlich' },
      { value: 'd', label: 'd) darum' },
    ],
    correct: 'c',
  },
  {
    id: 129,
    section: 'Pytania 126-147',
    prompt: 'Sie suchen _____ _____ Mitarbeiter für Ihr Café? Melden Sie sich bei uns!',
    options: [
      { value: 'a', label: 'a) motivierten erfahrenen' },
      { value: 'b', label: 'b) motivierte erfahrene' },
      { value: 'c', label: 'c) motivierte erfahrener' },
      { value: 'd', label: 'd) motivierten erfahrener' },
    ],
    correct: 'b',
  },
  {
    id: 130,
    section: 'Pytania 126-147',
    prompt: 'In meinem zukünftigen Job möchte ich nicht nur gut verdienen, ___ flexibel arbeiten können.',
    options: [
      { value: 'a', label: 'a) sondern auch' },
      { value: 'b', label: 'b) sowohl auch' },
      { value: 'c', label: 'c) aber' },
      { value: 'd', label: 'd) nur' },
    ],
    correct: 'a',
  },
  {
    id: 131,
    section: 'Pytania 126-147',
    prompt: 'Das Fitnessstudio ist ___ bei jungen Leuten ___ bei Senioren sehr beliebt.',
    options: [
      { value: 'a', label: 'a) sowohl... als auch' },
      { value: 'b', label: 'b) einerseits... andererseits' },
      { value: 'c', label: 'c) zwar... aber' },
      { value: 'd', label: 'd) weder... noch' },
    ],
    correct: 'a',
  },
  {
    id: 132,
    section: 'Pytania 126-147',
    prompt: 'Im Alltag ___ ich mich um meine Finanzen selbst ___.',
    options: [
      { value: 'a', label: 'a) brauche... zu kümmern' },
      { value: 'b', label: 'b) brauche... kümmern' },
      { value: 'c', label: 'c) muss ... gekümmert' },
      { value: 'd', label: 'd) muss... kümmern' },
    ],
    correct: 'a',
  },
  {
    id: 133,
    section: 'Pytania 126-147',
    prompt: 'Wie geht es deinem Vater? ___ ____ ihm schwer, lange zu sitzen.',
    options: [
      { value: 'a', label: 'a) Das sieht' },
      { value: 'b', label: 'b) Man sieht' },
      { value: 'c', label: 'c) Es fällt' },
      { value: 'd', label: 'd) Er kann' },
    ],
    correct: 'c',
  },
  {
    id: 134,
    section: 'Pytania 126-147',
    prompt: 'Beeilen wir uns ein bisschen. _____ gleich dunkel.',
    options: [
      { value: 'a', label: 'a) Man ist' },
      { value: 'b', label: 'b) Es wird' },
      { value: 'c', label: 'c) Das hat' },
      { value: 'd', label: 'd) Wir sind' },
    ],
    correct: 'b',
  },
  {
    id: 135,
    section: 'Pytania 126-147',
    prompt: 'Kommst du morgen oder übermorgen vorbei? ___ morgen ___ übermorgen – ich weiß es noch nicht.',
    options: [
      { value: 'a', label: 'a) Sowohl – als auch' },
      { value: 'b', label: 'b) Entweder – oder' },
      { value: 'c', label: 'c) Nicht nur – sondern auch' },
      { value: 'd', label: 'd) Weder – noch' },
    ],
    correct: 'b',
  },
  {
    id: 136,
    section: 'Pytania 126-147',
    prompt: 'Das Wetter war ______ schlecht, ______ hatten wir einen schönen Abend.',
    options: [
      { value: 'a', label: 'a) sowohl... als auch' },
      { value: 'b', label: 'b) zwar... aber' },
      { value: 'c', label: 'c) entweder... oder' },
      { value: 'd', label: 'd) weder... noch' },
    ],
    correct: 'b',
  },
  {
    id: 137,
    section: 'Pytania 126-147',
    prompt: 'Hast du das Magazin abonniert? Ja, ich bin schon seit Jahren Abonn___.',
    options: [
      { value: 'a', label: 'a) -ierer' },
      { value: 'b', label: 'b) -enter' },
      { value: 'c', label: 'c) -ler' },
      { value: 'd', label: 'd) -ent' },
    ],
    correct: 'd',
  },
  {
    id: 138,
    section: 'Pytania 126-147',
    prompt: '___ mehr Zeit man investiert, ___ besser wird das Ergebnis.',
    options: [
      { value: 'a', label: 'a) Je... desto' },
      { value: 'b', label: 'b) Umso... desto' },
      { value: 'c', label: 'c) Desto... je' },
      { value: 'd', label: 'd) Je... um' },
    ],
    correct: 'a',
  },
  {
    id: 139,
    section: 'Pytania 126-147',
    prompt: 'Wo kann man ___ hier gut essen? Da drüben.',
    options: [
      { value: 'a', label: 'a) ja' },
      { value: 'b', label: 'b) denn' },
      { value: 'c', label: 'c) doch' },
      { value: 'd', label: 'd) dann' },
    ],
    correct: 'b',
  },
  {
    id: 140,
    section: 'Pytania 126-147',
    prompt: 'Sie können Geld sparen, ___ Sie öffentliche Verkehrsmittel nutzen.',
    options: [
      { value: 'a', label: 'a) dadurch' },
      { value: 'b', label: 'b) sodass' },
      { value: 'c', label: 'c) indem' },
      { value: 'd', label: 'd) womit' },
    ],
    correct: 'c',
  },
  {
    id: 141,
    section: 'Pytania 126-147',
    prompt: 'Er erklärt die Aufgabe, ___ er ein Beispiel an die Tafel schreibt.',
    options: [
      { value: 'a', label: 'a) sodass' },
      { value: 'b', label: 'b) dadurch' },
      { value: 'c', label: 'c) indem' },
      { value: 'd', label: 'd) womit' },
    ],
    correct: 'c',
  },
  {
    id: 142,
    section: 'Pytania 126-147',
    prompt: 'Leider ist das Büro ___ unser__ Öffnungszeiten nicht erreichbar.',
    options: [
      { value: 'a', label: 'a) innerhalb – e' },
      { value: 'b', label: 'b) außerhalb – er' },
      { value: 'c', label: 'c) entlang – e' },
      { value: 'd', label: 'd) rund – e' },
    ],
    correct: 'b',
  },
  {
    id: 143,
    section: 'Pytania 126-147',
    prompt: 'Wir spazieren ___ See ___.',
    options: [
      { value: 'a', label: 'a) den – entlang' },
      { value: 'b', label: 'b) der – entlang' },
      { value: 'c', label: 'c) nach – entlang' },
      { value: 'd', label: 'd) an – nach' },
    ],
    correct: 'a',
  },
  {
    id: 144,
    section: 'Pytania 126-147',
    prompt: 'Der Vertrag ___ bis Ende des Monats ____.',
    options: [
      { value: 'a', label: 'a) muss... unterschrieben werden' },
      { value: 'b', label: 'b) müssen... unterschreiben' },
      { value: 'c', label: 'c) muss... unterschreiben' },
      { value: 'd', label: 'd) muss... unterschrieben haben' },
    ],
    correct: 'a',
  },
  {
    id: 145,
    section: 'Pytania 126-147',
    prompt: '2002 ____ in 12 Ländern der EU der Euro _____.',
    options: [
      { value: 'a', label: 'a) wurde ... einführen' },
      { value: 'b', label: 'b) wurde ... eingeführt' },
      { value: 'c', label: 'c) würde ... einführen' },
      { value: 'd', label: 'd) worden ... eingeführt' },
    ],
    correct: 'b',
  },
  {
    id: 146,
    section: 'Pytania 126-147',
    prompt: 'Er fährt mit dem Fahrrad zur Arbeit, ___ das Auto ___ benutzen.',
    options: [
      { value: 'a', label: 'a) ohne ... dass' },
      { value: 'b', label: 'b) statt ... dass' },
      { value: 'c', label: 'c) ohne ... zu' },
      { value: 'd', label: 'd) statt ... zu' },
    ],
    correct: 'c',
  },
  {
    id: 147,
    section: 'Pytania 126-147',
    prompt: 'Ich lerne Deutsch, ___ im Ausland arbeiten ___ .',
    options: [
      { value: 'a', label: 'a) um ... können' },
      { value: 'b', label: 'b) damit ... können' },
      { value: 'c', label: 'c) um ... zu können' },
      { value: 'd', label: 'd) damit ... zu können' },
    ],
    correct: 'c',
  },
  {
    id: 148,
    section: 'Pytania 148-150',
    prompt: 'Jonas ist erst nach dem Studium in die Großstadt gezogen.',
    options: [
      { value: 'r', label: 'Richtig' },
      { value: 'f', label: 'Falsch' },
    ],
    correct: 'f',
  },
  {
    id: 149,
    section: 'Pytania 148-150',
    prompt: 'Jonas findet das Leben außerhalb der Stadt entspannter.',
    options: [
      { value: 'r', label: 'Richtig' },
      { value: 'f', label: 'Falsch' },
    ],
    correct: 'r',
  },
  {
    id: 150,
    section: 'Pytania 148-150',
    prompt: 'Jonas möchte auf jeden Fall für immer auf dem Land bleiben.',
    options: [
      { value: 'r', label: 'Richtig' },
      { value: 'f', label: 'Falsch' },
    ],
    correct: 'f',
  },
]

const questionsB2: Question[] = [
  {
    id: 151,
    section: 'Pytania 151-163',
    prompt: 'Ich brauche Englisch im Beruf, weil ich täglich viel ___ internationalen Kunden ___ habe.',
    options: [
      { value: 'a', label: 'a) bei ... zu tun' },
      { value: 'b', label: 'b) mit ... zu tun' },
      { value: 'c', label: 'c) für ... zu machen' },
      { value: 'd', label: 'd) wegen ... zu arbeiten' },
    ],
    correct: 'b',
  },
  {
    id: 152,
    section: 'Pytania 151-163',
    prompt: 'Ich wollte noch Rosen kaufen, aber das ist eigentlich gar nicht ___. Line mag doch sowieso nicht gern Blumen.',
    options: [
      { value: 'a', label: 'a) brauchbar' },
      { value: 'b', label: 'b) notwendig' },
      { value: 'c', label: 'c) relevant' },
      { value: 'd', label: 'd) passend' },
    ],
    correct: 'b',
  },
  {
    id: 153,
    section: 'Pytania 151-163',
    prompt: '___ treffe ich mich mit meiner Familie zum gemeinsamen Mittagessen.',
    options: [
      { value: 'a', label: 'a) Sonntag' },
      { value: 'b', label: 'b) Jeden Sonntag' },
      { value: 'c', label: 'c) Ab Sonntag' },
      { value: 'd', label: 'd) Letzten Sonntag' },
    ],
    correct: 'b',
  },
  {
    id: 154,
    section: 'Pytania 151-163',
    prompt: 'Kennst du schon das neue Restaurant am Marktplatz? Natürlich! Die haben wirklich den best__ Kuchen der Stadt. … Und die nettest__ Bedienung, finde ich.',
    options: [
      { value: 'a', label: 'a) -en ... -e' },
      { value: 'b', label: 'b) -e ... -e' },
      { value: 'c', label: 'c) -em ... -en' },
      { value: 'd', label: 'd) -es ... -e' },
    ],
    correct: 'a',
  },
  {
    id: 155,
    section: 'Pytania 151-163',
    prompt: 'Heute hat mich mein Nachbar zum Abendessen eingeladen. Und? Wirst du die Einladung ___?',
    options: [
      { value: 'a', label: 'a) annehmen' },
      { value: 'b', label: 'b) empfangen' },
      { value: 'c', label: 'c) folgen' },
      { value: 'd', label: 'd) zustimmen' },
    ],
    correct: 'a',
  },
  {
    id: 156,
    section: 'Pytania 151-163',
    prompt: 'Sag mal, warst du ____ gestern an der Uni? Ich hab dich gar nicht gesehen. Ich saß ___ auch ganz hinten.',
    options: [
      { value: 'a', label: 'a) doch ... denn' },
      { value: 'b', label: 'b) eigentlich ... ja' },
      { value: 'c', label: 'c) ja ... mal' },
      { value: 'd', label: 'd) mal ... eigentlich' },
    ],
    correct: 'b',
  },
  {
    id: 157,
    section: 'Pytania 151-163',
    prompt: 'Wollen wir etwas essen gehen. Oh ja, ich hab Hunger. Wie ___ es, wenn wir zu der neuen Pizzeria an der Ecke gehen?',
    options: [
      { value: 'a', label: 'a) hätte' },
      { value: 'b', label: 'b) würde' },
      { value: 'c', label: 'c) wäre' },
      { value: 'd', label: 'd) sei' },
    ],
    correct: 'c',
  },
  {
    id: 158,
    section: 'Pytania 151-163',
    prompt: 'Ich wollte mich noch einmal ___ dein Geschenk bedanken!',
    options: [
      { value: 'a', label: 'a) auf' },
      { value: 'b', label: 'b) für' },
      { value: 'c', label: 'c) um' },
      { value: 'd', label: 'd) von' },
    ],
    correct: 'b',
  },
  {
    id: 159,
    section: 'Pytania 151-163',
    prompt: 'Kannst du bitte die Jacken ___ Kinder von der Leine holen? Es fängt an zu regnen. Die werden ja sonst ganz nass.',
    options: [
      { value: 'a', label: 'a) den' },
      { value: 'b', label: 'b) der' },
      { value: 'c', label: 'c) des' },
      { value: 'd', label: 'd) von' },
    ],
    correct: 'b',
  },
  {
    id: 160,
    section: 'Pytania 151-163',
    prompt: 'Ich habe dir etwas ganz Besonderes mitgebracht. - Da bin ich gespannt was da wohl drin sein ___.',
    options: [
      { value: 'a', label: 'a) werden' },
      { value: 'b', label: 'b) wird' },
      { value: 'c', label: 'c) wäre' },
      { value: 'd', label: 'd) würde' },
    ],
    correct: 'b',
  },
  {
    id: 161,
    section: 'Pytania 151-163',
    prompt: 'Immer dieses Durcheinander! Das kann ich gar nicht ___.',
    options: [
      { value: 'a', label: 'a) benötigen' },
      { value: 'b', label: 'b) leiden' },
      { value: 'c', label: 'c) hassen' },
      { value: 'd', label: 'd) gernhaben' },
    ],
    correct: 'b',
  },
  {
    id: 162,
    section: 'Pytania 151-163',
    prompt: 'Weil die Kinder schon gegessen hatten, _____',
    options: [
      { value: 'a', label: 'a) die Mutter brauchte ihnen nichts zuzubereiten' },
      { value: 'b', label: 'b) die Mutter brauchte ihnen nichts zu zubereiten' },
      { value: 'c', label: 'c) brauchte die Mutter ihnen nichts zuzubereiten' },
      { value: 'd', label: 'd) die Mutter ihnen nichts zuzubereiten' },
    ],
    correct: 'c',
  },
  {
    id: 163,
    section: 'Pytania 151-163',
    prompt: 'Kennen sich Sylvie und Bernd eigentlich schon lange? Ja, die haben sich ___ des Kurses kennengelernt.',
    options: [
      { value: 'a', label: 'a) bei' },
      { value: 'b', label: 'b) im' },
      { value: 'c', label: 'c) während' },
      { value: 'd', label: 'd) zwischen' },
    ],
    correct: 'c',
  },
  {
    id: 164,
    section: 'Pytania 164-175',
    prompt: 'Sehr geehrte Damen und Herren, _____ habe ich die Anzeige auf Ihrer Homepage gelesen.',
    options: [
      { value: 'a', label: 'a) mit großem Interesse' },
      { value: 'b', label: 'b) mit gutem Grund' },
      { value: 'c', label: 'c) mit hoher Sicherheit' },
      { value: 'd', label: 'd) mit viel Vergnügen' },
    ],
    correct: 'a',
  },
  {
    id: 165,
    section: 'Pytania 164-175',
    prompt: 'Und? Wie war das Vorstellungsgespräch? Nicht so toll. ___ ich besser vorbereitet gewesen, ___ ich sicherer aufgetreten.',
    options: [
      { value: 'a', label: 'a) Wäre ... hätte' },
      { value: 'b', label: 'b) Wäre ... wäre' },
      { value: 'c', label: 'c) Würde ... hätte' },
      { value: 'd', label: 'd) Würde ... würde' },
    ],
    correct: 'b',
  },
  {
    id: 166,
    section: 'Pytania 164-175',
    prompt: 'Die Unterlagen werden anonym, ___ alle Kandidaten gleich behandelt werden.',
    options: [
      { value: 'a', label: 'a) dadurch' },
      { value: 'b', label: 'b) damit' },
      { value: 'c', label: 'c) um' },
      { value: 'd', label: 'd) zum' },
    ],
    correct: 'b',
  },
  {
    id: 167,
    section: 'Pytania 164-175',
    prompt: 'Niko kann leider nicht mit zum Konzert, also müssen wir die Tickets ___.',
    options: [
      { value: 'a', label: 'a) ändern' },
      { value: 'b', label: 'b) tauschen' },
      { value: 'c', label: 'c) umtauschen' },
      { value: 'd', label: 'd) verändern' },
    ],
    correct: 'c',
  },
  {
    id: 168,
    section: 'Pytania 164-175',
    prompt: 'Die Veranstaltung war toll. ___ das Wetter nicht mitgespielt hat, hat die Band das Publikum überzeugt.',
    options: [
      { value: 'a', label: 'a) Da' },
      { value: 'b', label: 'b) Obwohl' },
      { value: 'c', label: 'c) Trotz' },
      { value: 'd', label: 'd) Weil' },
    ],
    correct: 'b',
  },
  {
    id: 169,
    section: 'Pytania 164-175',
    prompt: 'Liebe Katja, Das Datum ___ mir leider nicht, deshalb würde ich einen anderen Termin ___.',
    options: [
      { value: 'a', label: 'a) geht ... vorschlagen' },
      { value: 'b', label: 'b) passt ... vorschlagen' },
      { value: 'c', label: 'c) passt ... anbieten' },
      { value: 'd', label: 'd) geht ... empfehlen' },
    ],
    correct: 'b',
  },
  {
    id: 170,
    section: 'Pytania 164-175',
    prompt: 'Für den Kauf der Wohnung musste er einen Kredit _____, da die ___ gerade niedrig sind.',
    options: [
      { value: 'a', label: 'a) aufnehmen ... Zinsen' },
      { value: 'b', label: 'b) ziehen ... Gebühren' },
      { value: 'c', label: 'c) schaffen ... Kosten' },
      { value: 'd', label: 'd) berücksichtigen ... Abgaben' },
    ],
    correct: 'a',
  },
  {
    id: 171,
    section: 'Pytania 164-175',
    prompt: 'Die Hose, die ich mir online bestellt habe, ist leider zu groß. Das Produkt kann zurückgegeben werden, solange es nicht benutzt ___ .',
    options: [
      { value: 'a', label: 'a) darf worden sein' },
      { value: 'b', label: 'b) worden ist' },
      { value: 'c', label: 'c) sollte werden' },
      { value: 'd', label: 'd) wäre' },
    ],
    correct: 'b',
  },
  {
    id: 172,
    section: 'Pytania 164-175',
    prompt: 'Was halten Sie von Bio-Nahrung? _____ ist der Trend in und es wird sich in den nächsten Jahren noch verstärken.',
    options: [
      { value: 'a', label: 'a) Meiner Meinung nach' },
      { value: 'b', label: 'b) Meiner Stimmung nach' },
      { value: 'c', label: 'c) Nach meiner Annahme' },
      { value: 'd', label: 'd) Nach meiner Wahl' },
    ],
    correct: 'a',
  },
  {
    id: 173,
    section: 'Pytania 164-175',
    prompt: 'Sag mal, willst du dich nicht auf die Stelle bewerben? - Arbeit in einer Schule? Das ___ nicht ____.',
    options: [
      { value: 'a', label: 'a) geht ... zu Recht' },
      { value: 'b', label: 'b) hat ... möglich' },
      { value: 'c', label: 'c) ist ... zur Sache' },
      { value: 'd', label: 'd) kommt ... infrage' },
    ],
    correct: 'd',
  },
  {
    id: 174,
    section: 'Pytania 164-175',
    prompt: 'Der Supermarkt liegt etwas ___ der Stadt, deshalb fahren wir mit dem Auto.',
    options: [
      { value: 'a', label: 'a) außerhalb' },
      { value: 'b', label: 'b) gegenüber' },
      { value: 'c', label: 'c) entlang' },
      { value: 'd', label: 'd) innerhalb' },
    ],
    correct: 'a',
  },
  {
    id: 175,
    section: 'Pytania 164-175',
    prompt: 'Die Pflanze ist ja richtig gewachsen! Die muss jemand gut ____ haben.',
    options: [
      { value: 'a', label: 'a) betreut' },
      { value: 'b', label: 'b) ernährt' },
      { value: 'c', label: 'c) gehegt' },
      { value: 'd', label: 'd) gepflegt' },
    ],
    correct: 'd',
  },
  {
    id: 176,
    section: 'Pytania 176-200',
    prompt: 'Laura geht ___ selten ins Theater, ___ interessiert sie sich sehr für Kultur.',
    options: [
      { value: 'a', label: 'a) entweder ... oder' },
      { value: 'b', label: 'b) nicht nur ... sondern auch' },
      { value: 'c', label: 'c) weder ... noch' },
      { value: 'd', label: 'd) zwar ... aber' },
    ],
    correct: 'd',
  },
  {
    id: 177,
    section: 'Pytania 176-200',
    prompt: 'Für den aktuellen Bericht _____',
    options: [
      { value: 'a', label: 'a) das Institut sammelte im vergangenen Jahr erneut umfangreiche Daten' },
      { value: 'b', label: 'b) sammelte das Institut erneut im vergangenen Jahr umfangreiche Daten' },
      { value: 'c', label: 'c) sammelte das Institut umfangreiche erneut im vergangenen Jahr Daten' },
      { value: 'd', label: 'd) das Institut erneut sammelte im vergangenen Jahr Daten umfangreiche' },
    ],
    correct: 'b',
  },
  {
    id: 178,
    section: 'Pytania 176-200',
    prompt: 'Am Anfang hatten wir viele Konflikte, aber mit der Zeit haben wir eine echte Freundschaft ____',
    options: [
      { value: 'a', label: 'a) erlangt' },
      { value: 'b', label: 'b) gemacht' },
      { value: 'c', label: 'c) geschlossen' },
      { value: 'd', label: 'd) verbunden' },
    ],
    correct: 'c',
  },
  {
    id: 179,
    section: 'Pytania 176-200',
    prompt: 'Ich bin im Moment ziemlich ___, weil ich noch ein ___ Geschenk für die Hochzeit suche.',
    options: [
      { value: 'a', label: 'a) gestresst ... passendes' },
      { value: 'b', label: 'b) stressig ... passendes' },
      { value: 'c', label: 'c) gestresste ... passenden' },
      { value: 'd', label: 'd) stressige ... passend' },
    ],
    correct: 'a',
  },
  {
    id: 180,
    section: 'Pytania 176-200',
    prompt: 'Haben Sie die notwendigen ___ für das Meeting bereits vorbereitet?',
    options: [
      { value: 'a', label: 'a) Berichte' },
      { value: 'b', label: 'b) Unterlagen' },
      { value: 'c', label: 'c) Zustände' },
      { value: 'd', label: 'd) Ergebnisse' },
    ],
    correct: 'b',
  },
  {
    id: 181,
    section: 'Pytania 176-200',
    prompt: 'Die Serie ___ letztes Jahr ___ einem bekannten Regisseur aus Amerika gedreht.',
    options: [
      { value: 'a', label: 'a) war ... durch' },
      { value: 'b', label: 'b) war ... von' },
      { value: 'c', label: 'c) wurde ... durch' },
      { value: 'd', label: 'd) wurde ... von' },
    ],
    correct: 'd',
  },
  {
    id: 182,
    section: 'Pytania 176-200',
    prompt: '___ der schlechten Internetverbindung konnte ich an der Videokonferenz nicht teilnehmen.',
    options: [
      { value: 'a', label: 'a) Dank' },
      { value: 'b', label: 'b) Aufgrund' },
      { value: 'c', label: 'c) Aus' },
      { value: 'd', label: 'd) Während' },
    ],
    correct: 'b',
  },
  {
    id: 183,
    section: 'Pytania 176-200',
    prompt: '___ ich mein Studium abgeschlossen habe, möchte ich ins Ausland gehen.',
    options: [
      { value: 'a', label: 'a) Nachdem' },
      { value: 'b', label: 'b) Während' },
      { value: 'c', label: 'c) Sobald' },
      { value: 'd', label: 'd) Wenn' },
    ],
    correct: 'c',
  },
  {
    id: 184,
    section: 'Pytania 176-200',
    prompt: 'Ist der Konferenzraum jetzt reserviert? Ja, der ___ bereits letzte Woche ___ .',
    options: [
      { value: 'a', label: 'a) ist ... reserviert' },
      { value: 'b', label: 'b) war ... reserviert' },
      { value: 'c', label: 'c) wurde ... reserviert' },
      { value: 'd', label: 'd) wird ... reserviert' },
    ],
    correct: 'c',
  },
  {
    id: 185,
    section: 'Pytania 176-200',
    prompt: 'Während meines Studiums hatte ich die Chance, ___ in einem internationalen Projekt mitzuarbeiten.',
    options: [
      { value: 'a', label: 'a) beispielsweise' },
      { value: 'b', label: 'b) zufälligerweise' },
      { value: 'c', label: 'c) unbekannterweise' },
      { value: 'd', label: 'd) probehalber' },
    ],
    correct: 'b',
  },
  {
    id: 186,
    section: 'Pytania 176-200',
    prompt: 'Welche ___ bringen Sie für diese Position mit und wo liegen Ihre größten ___?',
    options: [
      { value: 'a', label: 'a) Argumente ... Vorteile' },
      { value: 'b', label: 'b) Qualifikationen ... Stärken' },
      { value: 'c', label: 'c) Zeugnisse ... Schwächen' },
      { value: 'd', label: 'd) Erfahrungen ... Fehler' },
    ],
    correct: 'b',
  },
  {
    id: 187,
    section: 'Pytania 176-200',
    prompt: 'Ich bin sehr froh, ________',
    options: [
      { value: 'a', label: 'a) an der Konferenz teilnehmen können' },
      { value: 'b', label: 'b) an der Konferenz teilnehmen zu können' },
      { value: 'c', label: 'c) dass ich an der Konferenz teilnehmen können' },
      { value: 'd', label: 'd) dass ich an der Konferenz teilnehmen zu können' },
    ],
    correct: 'b',
  },
  {
    id: 188,
    section: 'Pytania 176-200',
    prompt: 'Viele Studien zeigen, dass ein regelmäßiges Lernen dazu beiträgt, neues Wissen langfristig zu ___ .',
    options: [
      { value: 'a', label: 'a) anwenden' },
      { value: 'b', label: 'b) erweitern' },
      { value: 'c', label: 'c) erwerben' },
      { value: 'd', label: 'd) unternehmen' },
    ],
    correct: 'c',
  },
  {
    id: 189,
    section: 'Pytania 176-200',
    prompt: 'Er hat mich gebeten, _____',
    options: [
      { value: 'a', label: 'a) dass ich helfe bei der Organisation' },
      { value: 'b', label: 'b) bei der Organisation ich helfe' },
      { value: 'c', label: 'c) bei der Organisation helfen' },
      { value: 'd', label: 'd) bei der Organisation zu helfen' },
    ],
    correct: 'd',
  },
  {
    id: 190,
    section: 'Pytania 176-200',
    prompt: 'Die neue Software ___ dem Unternehmen zahlreiche Vorteile.',
    options: [
      { value: 'a', label: 'a) fördert' },
      { value: 'b', label: 'b) macht' },
      { value: 'c', label: 'c) verbessert' },
      { value: 'd', label: 'd) verschafft' },
    ],
    correct: 'd',
  },
  {
    id: 191,
    section: 'Pytania 176-200',
    prompt: 'Zwischen den beiden Kollegen scheint es ein Problem zu geben – das beruht offenbar auf ___.',
    options: [
      { value: 'a', label: 'a) Abhängigkeit' },
      { value: 'b', label: 'b) Gegenseitigkeit' },
      { value: 'c', label: 'c) Verbindung' },
      { value: 'd', label: 'd) Beziehung' },
    ],
    correct: 'b',
  },
  {
    id: 192,
    section: 'Pytania 176-200',
    prompt: 'An deiner Stelle ___ ich mich zunächst für ein Praktikum ___ .',
    options: [
      { value: 'a', label: 'a) könnte ... bewerben' },
      { value: 'b', label: 'b) sollte ... bewerben' },
      { value: 'c', label: 'c) wäre ... beworben' },
      { value: 'd', label: 'd) würde ... bewerben' },
    ],
    correct: 'd',
  },
  {
    id: 193,
    section: 'Pytania 176-200',
    prompt: 'Trotz mehrerer Rückschläge bleibt sie ruhig und ___ sich nicht aus der Fassung ___.',
    options: [
      { value: 'a', label: 'a) kann ... bringen' },
      { value: 'b', label: 'b) lässt ... bringen' },
      { value: 'c', label: 'c) mag ... treiben' },
      { value: 'd', label: 'd) soll ... lassen' },
    ],
    correct: 'b',
  },
  {
    id: 194,
    section: 'Pytania 176-200',
    prompt: 'Wollte Andreas nicht auch gestern zum Konzert vorbeikommen? Eigentlich schon, aber ich glaube, er hat sich mit seiner neuen Freundin getroffen. Das ___ ihm wohl wichtiger ______.',
    options: [
      { value: 'a', label: 'a) war ... gewesen' },
      { value: 'b', label: 'b) werde ... sein' },
      { value: 'c', label: 'c) wird ... gewesen sein' },
      { value: 'd', label: 'd) wird ... sein' },
    ],
    correct: 'c',
  },
  {
    id: 195,
    section: 'Pytania 176-200',
    prompt: 'Ich habe überlegt, an dem neuen Nähkurs teilzunehmen.',
    options: [
      { value: 'a', label: 'a) Da darf ich nicht zustimmen' },
      { value: 'b', label: 'b) Da muss ich dich abmahnen' },
      { value: 'c', label: 'c) Darüber will ich dich alarmieren' },
      { value: 'd', label: 'd) Davon kann ich nur abraten' },
    ],
    correct: 'd',
  },
  {
    id: 196,
    section: 'Pytania 176-200',
    prompt: 'Ich war so verknallt und hatte das Gefühl, die Zeit würde stehen ____',
    options: [
      { value: 'a', label: 'a) bleiben' },
      { value: 'b', label: 'b) halten' },
      { value: 'c', label: 'c) können' },
      { value: 'd', label: 'd) lassen' },
    ],
    correct: 'a',
  },
  {
    id: 197,
    section: 'Pytania 176-200',
    prompt: 'Bist du gestern gut im Hotel angekommen? Zum Glück habe ich den Zug noch erreicht – sonst ___ ich ihn sicher ___ .',
    options: [
      { value: 'a', label: 'a) bin ... verpasst' },
      { value: 'b', label: 'b) hätte ... verpasst' },
      { value: 'c', label: 'c) wäre ... verpassen' },
      { value: 'd', label: 'd) habe ... verpasst' },
    ],
    correct: 'b',
  },
  {
    id: 198,
    section: 'Pytania 176-200',
    prompt: 'Der neue Teamleiter soll sehr beliebt ___ allen Mitarbeitern sein.',
    options: [
      { value: 'a', label: 'a) an' },
      { value: 'b', label: 'b) bei' },
      { value: 'c', label: 'c) von' },
      { value: 'd', label: 'd) zu' },
    ],
    correct: 'b',
  },
  {
    id: 199,
    section: 'Pytania 176-200',
    prompt: 'Ein Besuch in diesem Museum ist auf jeden Fall ___.',
    options: [
      { value: 'a', label: 'a) lohnenswert' },
      { value: 'b', label: 'b) nützlich' },
      { value: 'c', label: 'c) rentabel' },
      { value: 'd', label: 'd) tauglich' },
    ],
    correct: 'a',
  },
  {
    id: 200,
    section: 'Pytania 176-200',
    prompt: 'Seit meinem letzten Besuch hat sich die Gegend stark ___.',
    options: [
      { value: 'a', label: 'a) verändert' },
      { value: 'b', label: 'b) getauscht' },
      { value: 'c', label: 'c) gewandelt' },
      { value: 'd', label: 'd) gewechselt' },
    ],
    correct: 'a',
  },
]

const questionsC1: Question[] = [
  {
    id: 201,
    section: 'Pytania 201-213',
    prompt: 'Heute läuft wirklich alles schief. Die Präsentation war schlecht vorbereitet, die Technik hat ____ und am Ende war alles ____',
    options: [
      { value: 'a', label: 'a) geklappt ... aufgelöst' },
      { value: 'b', label: 'b) misslungen ... geendet' },
      { value: 'c', label: 'c) versagt ... durcheinander' },
      { value: 'd', label: 'd) verfallen ... zerfallen' },
    ],
    correct: 'c',
  },
  {
    id: 202,
    section: 'Pytania 201-213',
    prompt: 'Du, weißt du was? Mike ___ eine neue Wohnung von seinen Eltern zum Geburtstag bekommen haben. So hab ich gehört.',
    options: [
      { value: 'a', label: 'a) kann' },
      { value: 'b', label: 'b) darf' },
      { value: 'c', label: 'c) will' },
      { value: 'd', label: 'd) soll' },
    ],
    correct: 'd',
  },
  {
    id: 203,
    section: 'Pytania 201-213',
    prompt: 'Wollte Jörg uns nicht gegen vier Uhr besuchen? Ja, genau. Der ___ schon unterwegs sein. Er hat mir noch Bescheid gegeben, dass er es noch schafft.',
    options: [
      { value: 'a', label: 'a) müsse' },
      { value: 'b', label: 'b) müsste' },
      { value: 'c', label: 'c) könnte' },
      { value: 'd', label: 'd) kann' },
    ],
    correct: 'b',
  },
  {
    id: 204,
    section: 'Pytania 201-213',
    prompt: 'Nikola war gerade in der Tatra beim Kletterkurs. Wahnsinn! Die hat sich diesem Hobby auch vollkommen ___.',
    options: [
      { value: 'a', label: 'a) verordnet' },
      { value: 'b', label: 'b) hingegeben' },
      { value: 'c', label: 'c) zerfallen' },
      { value: 'd', label: 'd) gewidmet' },
    ],
    correct: 'b',
  },
  {
    id: 205,
    section: 'Pytania 201-213',
    prompt: 'Bastian fährt fast jedes Jahr in die Alpen. ___ oft sie ___ fährt, es gibt immer noch etwas Neues zu bewandern.',
    options: [
      { value: 'a', label: 'a) Wenn auch' },
      { value: 'b', label: 'b) Wie auch' },
      { value: 'c', label: 'c) Wenn so' },
      { value: 'd', label: 'd) Wie zwar' },
    ],
    correct: 'b',
  },
  {
    id: 206,
    section: 'Pytania 201-213',
    prompt: 'Eva ist immer noch erkältet. - Kommt ihr denn am Samstag mit zum Eislaufen? Klar, _____, Eva wird noch nicht auf dem Damm sein.',
    options: [
      { value: 'a', label: 'a) außer dass' },
      { value: 'b', label: 'b) außer wenn' },
      { value: 'c', label: 'c) es sei denn' },
      { value: 'd', label: 'd) nur falls' },
    ],
    correct: 'c',
  },
  {
    id: 207,
    section: 'Pytania 201-213',
    prompt: 'Luis, ich habe mal im Internet gegoogelt. Für das Wochenende am Meer ___ noch zwei Hotels zur Auswahl: das eine direkt am Strand, das andere im Zentrum.',
    options: [
      { value: 'a', label: 'a) gehen' },
      { value: 'b', label: 'b) kommen' },
      { value: 'c', label: 'c) stehen' },
      { value: 'd', label: 'd) geben' },
    ],
    correct: 'c',
  },
  {
    id: 208,
    section: 'Pytania 201-213',
    prompt: 'Bei dieser Reise ___ für mich eindeutig das kulturelle Erlebnis im Vordergrund.',
    options: [
      { value: 'a', label: 'a) bedeutet' },
      { value: 'b', label: 'b) heißt' },
      { value: 'c', label: 'c) liegt' },
      { value: 'd', label: 'd) steht' },
    ],
    correct: 'd',
  },
  {
    id: 209,
    section: 'Pytania 201-213',
    prompt: 'Wohin magst du denn am liebsten fahren? Ach, weißt du, nur reiz__ Landschaften und nach__ Tourismus kommen infrage. Irland wäre mein nächstes Reiseziel.',
    options: [
      { value: 'a', label: 'a) -haltige ... -rangiger' },
      { value: 'b', label: 'b) -volle ... -haltiger' },
      { value: 'c', label: 'c) -volle ... -rangiger' },
      { value: 'd', label: 'd) -werte ... -haltiger' },
    ],
    correct: 'b',
  },
  {
    id: 210,
    section: 'Pytania 201-213',
    prompt: 'In der Firma muss sich ein Mitarbeiter seinem Vorgesetzten anpassen. Das bedeutet _____, sich dem Chef anzupassen.',
    options: [
      { value: 'a', label: 'a) Der Mensch ist gezwungen…' },
      { value: 'b', label: 'b) Der Mensch hat das Recht…' },
      { value: 'c', label: 'c) Der Mensch ist imstande…' },
      { value: 'd', label: 'd) Der Mensch hat die Chance…' },
    ],
    correct: 'a',
  },
  {
    id: 211,
    section: 'Pytania 201-213',
    prompt: 'Die App ist zu komplex, ___ man sie in all seinen Funktionen benutzen kann.',
    options: [
      { value: 'a', label: 'a) als ob' },
      { value: 'b', label: 'b) als dass' },
      { value: 'c', label: 'c) als wenn' },
      { value: 'd', label: 'd) als auch' },
    ],
    correct: 'b',
  },
  {
    id: 212,
    section: 'Pytania 201-213',
    prompt: 'Hast du die Nachricht gelesen? Die Personalabteilung plant, sämtliche neu__ Bewerber einen Eignungstest absolvieren zu lassen. Ja, einige interessiert__ Kollegen halten ihn für sinnvoll, wenn man keine aufwendig__ Vorstellungsgespräche führen muss.',
    options: [
      { value: 'a', label: 'a) -en... -e... -en' },
      { value: 'b', label: 'b) -en... -en... -e' },
      { value: 'c', label: 'c) -e... -en... -en' },
      { value: 'd', label: 'd) -e... -e... -e' },
    ],
    correct: 'a',
  },
  {
    id: 213,
    section: 'Pytania 201-213',
    prompt: 'Du, ich habe gerade meinen Urlaub genehmigt bekommen. Toll, dann steht einer Hotelbuchung ja nichts mehr ____.',
    options: [
      { value: 'a', label: 'a) dagegen' },
      { value: 'b', label: 'b) entgegen' },
      { value: 'c', label: 'c) wogegen' },
      { value: 'd', label: 'd) gegen' },
    ],
    correct: 'b',
  },
  {
    id: 214,
    section: 'Pytania 214-225',
    prompt: 'Der IT-Spezialist hat seinen Job erledigt. Kannst du mir noch die ____ von ihm geben? Ich überweise ihm gleich das Geld.',
    options: [
      { value: 'a', label: 'a) das Entgelt' },
      { value: 'b', label: 'b) das Gehalt' },
      { value: 'c', label: 'c) den Zuschlag' },
      { value: 'd', label: 'd) die Abrechnung' },
    ],
    correct: 'd',
  },
  {
    id: 215,
    section: 'Pytania 214-225',
    prompt: 'Schau dir mal Nina an. Sie ist heute wirklich ___schick. Sie hat sogar ihren ___neuen Anzug an. Ich glaube, sie hat gleich ein Vorstellungsgespräch.',
    options: [
      { value: 'a', label: 'a) hyper ... extra-' },
      { value: 'b', label: 'b) riesen ... voll-' },
      { value: 'c', label: 'c) super ... tief-' },
      { value: 'd', label: 'd) tod ... brand-' },
    ],
    correct: 'd',
  },
  {
    id: 216,
    section: 'Pytania 214-225',
    prompt: 'Manche Leute halten gern Vorträge, ____',
    options: [
      { value: 'a', label: 'a) andere tun es nur ungern' },
      { value: 'b', label: 'b) andere tun nur es ungern' },
      { value: 'c', label: 'c) es tun andere nur ungern' },
      { value: 'd', label: 'd) es andere tun nur ungern' },
    ],
    correct: 'a',
  },
  {
    id: 217,
    section: 'Pytania 214-225',
    prompt: 'Der Chef wollte mir einfach seine Meinung ____, wir können nicht miteinander zurechtkommen.',
    options: [
      { value: 'a', label: 'a) aufdrücken' },
      { value: 'b', label: 'b) aufbürden' },
      { value: 'c', label: 'c) aufsetzen' },
      { value: 'd', label: 'd) erzwingen' },
    ],
    correct: 'b',
  },
  {
    id: 218,
    section: 'Pytania 214-225',
    prompt: '___ amtlicher Mitteilung wird die Straßenbahnlinie 5 ab Montag für voraussichtlich zwei Wochen aufgrund von Bauarbeiten eingestellt.',
    options: [
      { value: 'a', label: 'a) Laut' },
      { value: 'b', label: 'b) Nach' },
      { value: 'c', label: 'c) Nachfolgend' },
      { value: 'd', label: 'd) Entsprechend' },
    ],
    correct: 'a',
  },
  {
    id: 219,
    section: 'Pytania 214-225',
    prompt: 'Der Diätberater riet mir, ich ___ vor dem Essen Wasser mit Essig trinken.',
    options: [
      { value: 'a', label: 'a) müsse' },
      { value: 'b', label: 'b) dürfe' },
      { value: 'c', label: 'c) solle' },
      { value: 'd', label: 'd) könne' },
    ],
    correct: 'c',
  },
  {
    id: 220,
    section: 'Pytania 214-225',
    prompt: 'Oh Mann, ich weiß nicht, wie man ChatGPT richtig benutzt. Keine Sorge, das ___einfacht die Arbeit total und kann viele Aufgaben ___arbeiten.',
    options: [
      { value: 'a', label: 'a) be ... ver-' },
      { value: 'b', label: 'b) er ... ent-' },
      { value: 'c', label: 'c) ver ... be-' },
      { value: 'd', label: 'd) ver ... er-' },
    ],
    correct: 'c',
  },
  {
    id: 221,
    section: 'Pytania 214-225',
    prompt: 'Die Nachfrage nach Elektroautos steigt kontinuierlich, _____ investieren immer mehr Hersteller in die Entwicklung neuer Batterietechnologien.',
    options: [
      { value: 'a', label: 'a) daraufhin' },
      { value: 'b', label: 'b) dementsprechend' },
      { value: 'c', label: 'c) folgend' },
      { value: 'd', label: 'd) nachdem' },
    ],
    correct: 'b',
  },
  {
    id: 222,
    section: 'Pytania 214-225',
    prompt: 'Er hat sich entschieden, das Konzert seiner Schwester ___ abzusagen, obwohl er selbst sehr gern hingehen würde.',
    options: [
      { value: 'a', label: 'a) entsprechend' },
      { value: 'b', label: 'b) willen' },
      { value: 'c', label: 'c) zuliebe' },
      { value: 'd', label: 'd) zugunsten' },
    ],
    correct: 'c',
  },
  {
    id: 223,
    section: 'Pytania 214-225',
    prompt: 'Die Regierung hat angekündigt, dass die neuen Richtlinien streng kontrolliert werden, ___ die Unternehmen ihre Prozesse rechtzeitig anpassen.',
    options: [
      { value: 'a', label: 'a) damit' },
      { value: 'b', label: 'b) obwohl' },
      { value: 'c', label: 'c) sobald' },
      { value: 'd', label: 'd) trotzdem' },
    ],
    correct: 'a',
  },
  {
    id: 224,
    section: 'Pytania 214-225',
    prompt: '____ ausreichender Beweise konnte der Verdacht nicht weiter verfolgt werden, sodass das Verfahren eingestellt wurde.',
    options: [
      { value: 'a', label: 'a) Durch' },
      { value: 'b', label: 'b) Mangels' },
      { value: 'c', label: 'c) Aufgrund' },
      { value: 'd', label: 'd) Zwecks' },
    ],
    correct: 'b',
  },
  {
    id: 225,
    section: 'Pytania 214-225',
    prompt: 'Hast du schon gehört? Die größte Firma in der Stadt hat plötzlich ____ angemeldet.',
    options: [
      { value: 'a', label: 'a) Insolvenz' },
      { value: 'b', label: 'b) Pleite' },
      { value: 'c', label: 'c) Ruin' },
      { value: 'd', label: 'd) Schulden' },
    ],
    correct: 'a',
  },
]

const tests = [
  {
    level: 'A1',
    title: 'Test poziomujący A1',
    description: 'Poziom podstawowy',
    status: 'available' as const,
    href: '#test-a1',
  },
  {
    level: 'A2',
    title: 'Test poziomujący A2',
    description: 'Poziom elementarny',
    status: 'available' as const,
    href: '#test-a2',
  },
  {
    level: 'B1',
    title: 'Test poziomujący B1',
    description: 'Poziom średniozaawansowany',
    status: 'available' as const,
    href: '#test-b1',
  },
  {
    level: 'B2',
    title: 'Test poziomujący B2',
    description: 'Poziom zaawansowany',
    status: 'available' as const,
    href: '#test-b2',
  },
  {
    level: 'C1',
    title: 'Test poziomujący C1',
    description: 'Poziom biegły',
    status: 'available' as const,
    href: '#test-c1',
  },
]

const GermanTestsPage = () => {
  // Selected level state
  const [selectedLevel, setSelectedLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | null>(null)

  // A1 Test State
  const [answersA1, setAnswersA1] = useState<Record<number, string>>({})
  const [scoreA1, setScoreA1] = useState<number | null>(null)
  const [unansweredA1, setUnansweredA1] = useState<number>(questionsA1.length)
  const [submittedA1, setSubmittedA1] = useState(false)
  const [emailSendingA1, setEmailSendingA1] = useState(false)
  const [emailSentA1, setEmailSentA1] = useState(false)
  const [emailSendErrorA1, setEmailSendErrorA1] = useState<string | null>(null)
  const [emailA1, setEmailA1] = useState('')
  const [emailErrorA1, setEmailErrorA1] = useState<string | null>(null)

  // A2 Test State
  const [answersA2, setAnswersA2] = useState<Record<number, string>>({})
  const [scoreA2, setScoreA2] = useState<number | null>(null)
  const [unansweredA2, setUnansweredA2] = useState<number>(questionsA2.length)
  const [submittedA2, setSubmittedA2] = useState(false)
  const [emailSendingA2, setEmailSendingA2] = useState(false)
  const [emailSentA2, setEmailSentA2] = useState(false)
  const [emailSendErrorA2, setEmailSendErrorA2] = useState<string | null>(null)
  const [emailA2, setEmailA2] = useState('')
  const [emailErrorA2, setEmailErrorA2] = useState<string | null>(null)

  // B1 Test State
  const [answersB1, setAnswersB1] = useState<Record<number, string>>({})
  const [scoreB1, setScoreB1] = useState<number | null>(null)
  const [unansweredB1, setUnansweredB1] = useState<number>(questionsB1.length)
  const [submittedB1, setSubmittedB1] = useState(false)
  const [emailSendingB1, setEmailSendingB1] = useState(false)
  const [emailSentB1, setEmailSentB1] = useState(false)
  const [emailSendErrorB1, setEmailSendErrorB1] = useState<string | null>(null)
  const [emailB1, setEmailB1] = useState('')
  const [emailErrorB1, setEmailErrorB1] = useState<string | null>(null)

  // B2 Test State
  const [answersB2, setAnswersB2] = useState<Record<number, string>>({})
  const [scoreB2, setScoreB2] = useState<number | null>(null)
  const [unansweredB2, setUnansweredB2] = useState<number>(questionsB2.length)
  const [submittedB2, setSubmittedB2] = useState(false)
  const [emailSendingB2, setEmailSendingB2] = useState(false)
  const [emailSentB2, setEmailSentB2] = useState(false)
  const [emailSendErrorB2, setEmailSendErrorB2] = useState<string | null>(null)
  const [emailB2, setEmailB2] = useState('')
  const [emailErrorB2, setEmailErrorB2] = useState<string | null>(null)

  // C1 Test State
  const [answersC1, setAnswersC1] = useState<Record<number, string>>({})
  const [scoreC1, setScoreC1] = useState<number | null>(null)
  const [unansweredC1, setUnansweredC1] = useState<number>(questionsC1.length)
  const [submittedC1, setSubmittedC1] = useState(false)
  const [emailSendingC1, setEmailSendingC1] = useState(false)
  const [emailSentC1, setEmailSentC1] = useState(false)
  const [emailSendErrorC1, setEmailSendErrorC1] = useState<string | null>(null)
  const [emailC1, setEmailC1] = useState('')
  const [emailErrorC1, setEmailErrorC1] = useState<string | null>(null)

  const groupedQuestionsA1 = useMemo(() => {
    const map = new Map<string, Question[]>()
    questionsA1.forEach((question) => {
      const key = question.section ?? 'Pytania'
      if (!map.has(key)) {
        map.set(key, [])
      }
      map.get(key)!.push(question)
    })
    return Array.from(map.entries())
  }, [])

  const groupedQuestionsA2 = useMemo(() => {
    const map = new Map<string, Question[]>()
    questionsA2.forEach((question) => {
      const key = question.section ?? 'Pytania'
      if (!map.has(key)) {
        map.set(key, [])
      }
      map.get(key)!.push(question)
    })
    return Array.from(map.entries())
  }, [])

  const groupedQuestionsB1 = useMemo(() => {
    const map = new Map<string, Question[]>()
    questionsB1.forEach((question) => {
      const key = question.section ?? 'Pytania'
      if (!map.has(key)) {
        map.set(key, [])
      }
      map.get(key)!.push(question)
    })
    return Array.from(map.entries())
  }, [])

  const groupedQuestionsB2 = useMemo(() => {
    const map = new Map<string, Question[]>()
    questionsB2.forEach((question) => {
      const key = question.section ?? 'Pytania'
      if (!map.has(key)) {
        map.set(key, [])
      }
      map.get(key)!.push(question)
    })
    return Array.from(map.entries())
  }, [])

  const groupedQuestionsC1 = useMemo(() => {
    const map = new Map<string, Question[]>()
    questionsC1.forEach((question) => {
      const key = question.section ?? 'Pytania'
      if (!map.has(key)) {
        map.set(key, [])
      }
      map.get(key)!.push(question)
    })
    return Array.from(map.entries())
  }, [])

  const handleChangeA1 = (id: number, value: string) => {
    setAnswersA1((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmitA1 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let correct = 0
    questionsA1.forEach((question) => {
      if (answersA1[question.id] === question.correct) {
        correct += 1
      }
    })
    const emailIsValid = validateEmail(emailA1)
    if (!emailIsValid) {
      setEmailErrorA1('Podaj poprawny adres e-mail, aby rozpocząć test.')
      setSubmittedA1(false)
      return
    }
    setEmailErrorA1(null)
    const missing = questionsA1.filter((q) => !answersA1[q.id]).length
    setUnansweredA1(missing)
    setScoreA1(correct)
    setSubmittedA1(true)
    setEmailSentA1(false)
    setEmailSendErrorA1(null)
    setEmailSendingA1(true)
    try {
      await sendResultsEmail(correct, missing, emailA1, questionsA1.length, 'A1')
      setEmailSentA1(true)
      // Track test completion
      const percent = Math.round((correct / questionsA1.length) * 100)
      trackTestCompletion('A1', percent, 'Niemiecki')
    } catch (error) {
      setEmailSendErrorA1(
        error instanceof Error
          ? error.message
          : 'Nie udało się wysłać e-maila. Spróbuj ponownie później.',
      )
    } finally {
      setEmailSendingA1(false)
    }
  }

  const handleResetA1 = () => {
    setAnswersA1({})
    setScoreA1(null)
    setUnansweredA1(questionsA1.length)
    setSubmittedA1(false)
  }

  const handleChangeA2 = (id: number, value: string) => {
    setAnswersA2((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmitA2 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let correct = 0
    questionsA2.forEach((question) => {
      if (answersA2[question.id] === question.correct) {
        correct += 1
      }
    })
    const emailIsValid = validateEmail(emailA2)
    if (!emailIsValid) {
      setEmailErrorA2('Podaj poprawny adres e-mail, aby rozpocząć test.')
      setSubmittedA2(false)
      return
    }
    setEmailErrorA2(null)
    const missing = questionsA2.filter((q) => !answersA2[q.id]).length
    setUnansweredA2(missing)
    setScoreA2(correct)
    setSubmittedA2(true)
    setEmailSentA2(false)
    setEmailSendErrorA2(null)
    setEmailSendingA2(true)
    try {
      await sendResultsEmail(correct, missing, emailA2, questionsA2.length, 'A2')
      setEmailSentA2(true)
      // Track test completion
      const percent = Math.round((correct / questionsA2.length) * 100)
      trackTestCompletion('A2', percent, 'Niemiecki')
    } catch (error) {
      setEmailSendErrorA2(
        error instanceof Error
          ? error.message
          : 'Nie udało się wysłać e-maila. Spróbuj ponownie później.',
      )
    } finally {
      setEmailSendingA2(false)
    }
  }

  const handleResetA2 = () => {
    setAnswersA2({})
    setScoreA2(null)
    setUnansweredA2(questionsA2.length)
    setSubmittedA2(false)
  }

  const handleChangeB1 = (id: number, value: string) => {
    setAnswersB1((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmitB1 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let correct = 0
    questionsB1.forEach((question) => {
      if (answersB1[question.id] === question.correct) {
        correct += 1
      }
    })
    const emailIsValid = validateEmail(emailB1)
    if (!emailIsValid) {
      setEmailErrorB1('Podaj poprawny adres e-mail, aby rozpocząć test.')
      setSubmittedB1(false)
      return
    }
    setEmailErrorB1(null)
    const missing = questionsB1.filter((q) => !answersB1[q.id]).length
    setUnansweredB1(missing)
    setScoreB1(correct)
    setSubmittedB1(true)
    setEmailSentB1(false)
    setEmailSendErrorB1(null)
    setEmailSendingB1(true)
    try {
      await sendResultsEmail(correct, missing, emailB1, questionsB1.length, 'B1')
      setEmailSentB1(true)
      // Track test completion
      const percent = Math.round((correct / questionsB1.length) * 100)
      trackTestCompletion('B1', percent, 'Niemiecki')
    } catch (error) {
      setEmailSendErrorB1(
        error instanceof Error
          ? error.message
          : 'Nie udało się wysłać e-maila. Spróbuj ponownie później.',
      )
    } finally {
      setEmailSendingB1(false)
    }
  }

  const handleResetB1 = () => {
    setAnswersB1({})
    setScoreB1(null)
    setUnansweredB1(questionsB1.length)
    setSubmittedB1(false)
  }

  const handleChangeB2 = (id: number, value: string) => {
    setAnswersB2((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmitB2 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let correct = 0
    questionsB2.forEach((question) => {
      if (answersB2[question.id] === question.correct) {
        correct += 1
      }
    })
    const emailIsValid = validateEmail(emailB2)
    if (!emailIsValid) {
      setEmailErrorB2('Podaj poprawny adres e-mail, aby rozpocząć test.')
      setSubmittedB2(false)
      return
    }
    setEmailErrorB2(null)
    const missing = questionsB2.filter((q) => !answersB2[q.id]).length
    setUnansweredB2(missing)
    setScoreB2(correct)
    setSubmittedB2(true)
    setEmailSentB2(false)
    setEmailSendErrorB2(null)
    setEmailSendingB2(true)
    try {
      await sendResultsEmail(correct, missing, emailB2, questionsB2.length, 'B2')
      setEmailSentB2(true)
      // Track test completion
      const percent = Math.round((correct / questionsB2.length) * 100)
      trackTestCompletion('B2', percent, 'Niemiecki')
    } catch (error) {
      setEmailSendErrorB2(
        error instanceof Error
          ? error.message
          : 'Nie udało się wysłać e-maila. Spróbuj ponownie później.',
      )
    } finally {
      setEmailSendingB2(false)
    }
  }

  const handleResetB2 = () => {
    setAnswersB2({})
    setScoreB2(null)
    setUnansweredB2(questionsB2.length)
    setSubmittedB2(false)
  }

  const handleChangeC1 = (id: number, value: string) => {
    setAnswersC1((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmitC1 = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let correct = 0
    questionsC1.forEach((question) => {
      if (answersC1[question.id] === question.correct) {
        correct += 1
      }
    })
    const emailIsValid = validateEmail(emailC1)
    if (!emailIsValid) {
      setEmailErrorC1('Podaj poprawny adres e-mail, aby rozpocząć test.')
      setSubmittedC1(false)
      return
    }
    setEmailErrorC1(null)
    const missing = questionsC1.filter((q) => !answersC1[q.id]).length
    setUnansweredC1(missing)
    setScoreC1(correct)
    setSubmittedC1(true)
    setEmailSentC1(false)
    setEmailSendErrorC1(null)
    setEmailSendingC1(true)
    try {
      await sendResultsEmail(correct, missing, emailC1, questionsC1.length, 'C1')
      setEmailSentC1(true)
      // Track test completion
      const percent = Math.round((correct / questionsC1.length) * 100)
      trackTestCompletion('C1', percent, 'Niemiecki')
    } catch (error) {
      setEmailSendErrorC1(
        error instanceof Error
          ? error.message
          : 'Nie udało się wysłać e-maila. Spróbuj ponownie później.',
      )
    } finally {
      setEmailSendingC1(false)
    }
  }

  const handleResetC1 = () => {
    setAnswersC1({})
    setScoreC1(null)
    setUnansweredC1(questionsC1.length)
    setSubmittedC1(false)
  }

  const buildWhatsappShareText = (
    languageLabel: string,
    testLabel: string,
    score: number | null,
    total: number,
    percentValue: number | null,
    isSubmitted: boolean,
  ) =>
    isSubmitted && score !== null
      ? encodeURIComponent(
          `Wynik testu poziomującego (${languageLabel})\nArkusz: ${testLabel}\nWynik: ${score}/${total}${
            percentValue !== null ? ` (${percentValue}%)` : ''
          }\nPomóż mi dobrać grupę!`,
        )
      : ''

  const percentA1 =
    scoreA1 === null ? null : Math.round(((scoreA1 ?? 0) / questionsA1.length) * 100)
  const whatsappMessageA1 = buildWhatsappShareText(
    'niemiecki',
    'A1',
    scoreA1,
    questionsA1.length,
    percentA1,
    submittedA1,
  )
  const whatsappShareUrlA1 = whatsappMessageA1
    ? `https://wa.me/48512253179?text=${whatsappMessageA1}`
    : 'https://wa.me/48512253179'
  const emailIsValidA1 = validateEmail(emailA1)
  const canStartA1 = emailIsValidA1

  const percentA2 =
    scoreA2 === null ? null : Math.round(((scoreA2 ?? 0) / questionsA2.length) * 100)
  const whatsappMessageA2 = buildWhatsappShareText(
    'niemiecki',
    'A2',
    scoreA2,
    questionsA2.length,
    percentA2,
    submittedA2,
  )
  const whatsappShareUrlA2 = whatsappMessageA2
    ? `https://wa.me/48512253179?text=${whatsappMessageA2}`
    : 'https://wa.me/48512253179'
  const emailIsValidA2 = validateEmail(emailA2)
  const canStartA2 = emailIsValidA2

  const percentB1 =
    scoreB1 === null ? null : Math.round(((scoreB1 ?? 0) / questionsB1.length) * 100)
  const whatsappMessageB1 = buildWhatsappShareText(
    'niemiecki',
    'B1',
    scoreB1,
    questionsB1.length,
    percentB1,
    submittedB1,
  )
  const whatsappShareUrlB1 = whatsappMessageB1
    ? `https://wa.me/48512253179?text=${whatsappMessageB1}`
    : 'https://wa.me/48512253179'
  const emailIsValidB1 = validateEmail(emailB1)
  const canStartB1 = emailIsValidB1

  const percentB2 =
    scoreB2 === null ? null : Math.round(((scoreB2 ?? 0) / questionsB2.length) * 100)
  const whatsappMessageB2 = buildWhatsappShareText(
    'niemiecki',
    'B2',
    scoreB2,
    questionsB2.length,
    percentB2,
    submittedB2,
  )
  const whatsappShareUrlB2 = whatsappMessageB2
    ? `https://wa.me/48512253179?text=${whatsappMessageB2}`
    : 'https://wa.me/48512253179'
  const emailIsValidB2 = validateEmail(emailB2)
  const canStartB2 = emailIsValidB2

  const percentC1 =
    scoreC1 === null ? null : Math.round(((scoreC1 ?? 0) / questionsC1.length) * 100)
  const whatsappMessageC1 = buildWhatsappShareText(
    'niemiecki',
    'C1',
    scoreC1,
    questionsC1.length,
    percentC1,
    submittedC1,
  )
  const whatsappShareUrlC1 = whatsappMessageC1
    ? `https://wa.me/48512253179?text=${whatsappMessageC1}`
    : 'https://wa.me/48512253179'
  const emailIsValidC1 = validateEmail(emailC1)
  const canStartC1 = emailIsValidC1

  return (
    <div className="german-tests-page">
      {!selectedLevel && (
        <SectionWrapper className="german-hero" ariaLabelledby="german-title">
          <p className="breadcrumb">
            <Link to="/">Strona główna</Link> / <span>Niemiecki</span>
          </p>
          <h1 id="german-title">Niemiecki — testy poziomujące</h1>
          <p className="intro">
            Wybierz test z listy i sprawdź swój poziom. Dostępne testy: poziom A1, A2, B1, B2 i C1.
          </p>
        <div className="tests-grid" aria-label="Dostępne testy językowe">
          {tests.map((test) => (
            <div
              key={test.level}
              className={`test-card ${test.status === 'available' ? 'available' : 'soon'}`}
            >
              <div className="test-level">{test.level}</div>
              <div>
                <p className="test-title">{test.title}</p>
                <p className="test-description">{test.description}</p>
              </div>
              {test.status === 'available' ? (
                <button 
                  type="button" 
                  className="primary-link" 
                  onClick={() => setSelectedLevel(test.level as 'A1' | 'A2' | 'B1' | 'B2' | 'C1')}
                >
                  Rozpocznij test
                </button>
              ) : (
                <button type="button" className="muted-button" disabled>
                  Wkrótce
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>
      )}

      {selectedLevel === 'A1' && (
      <SectionWrapper id="test-a1" className="german-test-body" ariaLabelledby="test-a1-title">
        <button 
          type="button" 
          className="back-button" 
          onClick={() => setSelectedLevel(null)}
        >
          ← Powrót do wyboru poziomu
        </button>
        <div className="test-header">
          <div>
            <p className="eyebrow">Test nr 1 — poziom A1</p>
            <h2 id="test-a1-title">
              Test poziomujący A1
            </h2>
            <p className="meta">Poziom podstawowy</p>
          </div>
          <div className="meta-box">
            <strong>Instrukcja</strong>
            <p>Bitte markieren Sie Ihre Lösungen. Es gibt nur eine richtige Lösung.</p>
            <p className="secondary">Łącznie: 50 pytań</p>
          </div>
        </div>

        <form className="test-form" onSubmit={handleSubmitA1}>
          <div className="email-block">
            <label className="email-label" htmlFor="test-email">
              Podaj swój e-mail, aby rozpocząć test
            </label>
            <input
              id="test-email"
              name="email"
              type="email"
              value={emailA1}
              onChange={(event) => {
                const value = event.target.value
                setEmailA1(value)
                if (emailErrorA1 && validateEmail(value)) {
                  setEmailErrorA1(null)
                }
              }}
              required
              placeholder="np. imie.nazwisko@email.com"
            />
            <p className="email-helper">
              Adres e-mail jest wymagany przed zaznaczeniem odpowiedzi. Wynik zostanie wysłany na{' '}
              kontakt@joannaadamek.edu.pl.
            </p>
            {emailErrorA1 ? <p className="email-error">{emailErrorA1}</p> : null}
          </div>

          {groupedQuestionsA1.map(([section, sectionQuestions]) => {
            const intro = sectionQuestions.find((q) => q.sectionIntro)?.sectionIntro
            return (
            <React.Fragment key={section}>
              {['Pytania 26-39', 'Pytania 40-47'].includes(section) ? (
                <div className="question-list">
                  {sectionQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`question-card ${
                        submittedA1 && answersA1[question.id] === question.correct
                          ? 'correct'
                          : submittedA1 && answersA1[question.id]
                            ? 'incorrect'
                            : ''
                      }`}
                    >
                      <div className="question-text">
                        <span className="question-number">{question.id}.</span>
                        <p>{question.prompt}</p>
                      </div>
                      <div className="options-grid">
                        {question.options.map((option) => {
                          const inputId = `q-${question.id}-${option.value}`
                          const checked = answersA1[question.id] === option.value
                          return (
                            <label
                              key={option.value}
                              className={`option ${checked ? 'checked' : ''} ${!canStartA1 ? 'disabled' : ''}`}
                              htmlFor={inputId}
                            >
                              <input
                                type="radio"
                                id={inputId}
                                name={`question-${question.id}`}
                                value={option.value}
                                checked={checked}
                                disabled={!canStartA1}
                                onChange={() => handleChangeA1(question.id, option.value)}
                              />
                              <span>{option.label}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <fieldset className="question-section">
                  <legend>{section}</legend>
                  {intro && <div className="section-intro">{intro}</div>}
                  <div className="question-list">
                    {sectionQuestions.map((question) => (
                      <div
                        key={question.id}
                        className={`question-card ${
                          submittedA1 && answersA1[question.id] === question.correct
                            ? 'correct'
                            : submittedA1 && answersA1[question.id]
                              ? 'incorrect'
                              : ''
                        }`}
                      >
                        <div className="question-text">
                          <span className="question-number">{question.id}.</span>
                          <p>{question.prompt}</p>
                        </div>
                        <div className="options-grid">
                          {question.options.map((option) => {
                            const inputId = `q-${question.id}-${option.value}`
                            const checked = answersA1[question.id] === option.value
                            return (
                              <label
                                key={option.value}
                                className={`option ${checked ? 'checked' : ''} ${!canStartA1 ? 'disabled' : ''}`}
                                htmlFor={inputId}
                              >
                                <input
                                  type="radio"
                                  id={inputId}
                                  name={`question-${question.id}`}
                                  value={option.value}
                                  checked={checked}
                                  disabled={!canStartA1}
                                  onChange={() => handleChangeA1(question.id, option.value)}
                                />
                                <span>{option.label}</span>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}
            </React.Fragment>
          )})}

          <div className="form-actions">
            <button type="submit" className="primary-link" disabled={!canStartA1}>
              Sprawdź wynik
            </button>
            <button type="button" className="ghost-button" onClick={handleResetA1} disabled={!canStartA1}>
              Wyczyść odpowiedzi
            </button>
          </div>
        </form>

        <div className="result-panel" aria-live="polite">
          {submittedA1 ? (
            <>
              <p className="result-title">Twój wynik</p>
              <p className="result-score">
                {scoreA1}/{questionsA1.length} poprawnych{percentA1 !== null ? ` (${percentA1}%)` : ''}
              </p>
              {unansweredA1 > 0 && (
                <p className="warning">
                  Uwaga: {unansweredA1} {unansweredA1 === 1 ? 'pytanie' : 'pytania'} pozostało bez odpowiedzi.
                </p>
              )}
              <div className="email-status">
                {emailSendingA1 && <p>Wysyłam wynik na kontakt@joannaadamek.edu.pl…</p>}
                {emailSentA1 && <p className="success">E-mail z wynikiem został wysłany w tle.</p>}
                {emailSendErrorA1 && <p className="email-error">{emailSendErrorA1}</p>}
              </div>
              <div className="whatsapp-card">
                <div>
                  <p className="whatsapp-title">Skontaktuj się na WhatsApp</p>
                  <p className="whatsapp-copy">Wyślij swój wynik i zapytaj o dalsze kroki.</p>
                </div>
                <a
                  className="whatsapp-button"
                  href={whatsappShareUrlA1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={whatsappLogo} alt="" aria-hidden="true" className="whatsapp-icon" />
                  Podziel się wynikiem
                </a>
              </div>
            </>
          ) : (
            <p className="muted">Wypełnij test i kliknij „Sprawdź wynik”.</p>
          )}
        </div>

        <div className="post-result-actions">
          <a className="offer-button" href="https://joannaadamek.com.pl/semestralne/" target="_blank" rel="noopener noreferrer">
            Zobacz ofertę naszych kursów grupowych
          </a>
        </div>
      </SectionWrapper>
      )}

      {selectedLevel === 'A2' && (
      <SectionWrapper id="test-a2" className="german-test-body" ariaLabelledby="test-a2-title">
        <button 
          type="button" 
          className="back-button" 
          onClick={() => setSelectedLevel(null)}
        >
          ← Powrót do wyboru poziomu
        </button>
        <div className="test-header">
          <div>
            <p className="eyebrow">Test nr 2 — poziom A2</p>
            <h2 id="test-a2-title">
              Test poziomujący A2
            </h2>
            <p className="meta">Poziom elementarny</p>
          </div>
          <div className="meta-box">
            <strong>Instrukcja</strong>
            <p>Bitte markieren Sie Ihre Lösungen auf dem Antwortblatt. Es gibt nur eine richtige Lösung.</p>
            <p className="secondary">Łącznie: 50 pytań (51-100)</p>
          </div>
        </div>

        <form className="test-form" onSubmit={handleSubmitA2}>
          <div className="email-block">
            <label className="email-label" htmlFor="test-email-a2">
              Podaj swój e-mail, aby rozpocząć test
            </label>
            <input
              id="test-email-a2"
              name="email"
              type="email"
              value={emailA2}
              onChange={(event) => {
                const value = event.target.value
                setEmailA2(value)
                if (emailErrorA2 && validateEmail(value)) {
                  setEmailErrorA2(null)
                }
              }}
              required
              placeholder="np. imie.nazwisko@email.com"
            />
            <p className="email-helper">
              Adres e-mail jest wymagany przed zaznaczeniem odpowiedzi. Wynik zostanie wysłany na{' '}
              kontakt@joannaadamek.edu.pl.
            </p>
            {emailErrorA2 ? <p className="email-error">{emailErrorA2}</p> : null}
          </div>

          {groupedQuestionsA2.map(([section, sectionQuestions]) => {
            const intro = sectionQuestions.find((q) => q.sectionIntro)?.sectionIntro
            return (
            <React.Fragment key={section}>
              {['Pytania 64-75', 'Pytania 76-97'].includes(section) ? (
                <div className="question-list">
                  {sectionQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`question-card ${
                        submittedA2 && answersA2[question.id] === question.correct
                          ? 'correct'
                          : submittedA2 && answersA2[question.id]
                            ? 'incorrect'
                            : ''
                      }`}
                    >
                      <div className="question-text">
                        <span className="question-number">{question.id}.</span>
                        <p>{question.prompt}</p>
                      </div>
                      <div className="options-grid">
                        {question.options.map((option) => {
                          const inputId = `q-a2-${question.id}-${option.value}`
                          const checked = answersA2[question.id] === option.value
                          return (
                            <label
                              key={option.value}
                              className={`option ${checked ? 'checked' : ''} ${!canStartA2 ? 'disabled' : ''}`}
                              htmlFor={inputId}
                            >
                              <input
                                type="radio"
                                id={inputId}
                                name={`question-a2-${question.id}`}
                                value={option.value}
                                checked={checked}
                                disabled={!canStartA2}
                                onChange={() => handleChangeA2(question.id, option.value)}
                              />
                              <span>{option.label}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <fieldset className="question-section">
                  <legend>{section}</legend>
                  {intro && <div className="section-intro">{intro}</div>}
                  <div className="question-list">
                    {sectionQuestions.map((question) => (
                      <div
                        key={question.id}
                        className={`question-card ${
                          submittedA2 && answersA2[question.id] === question.correct
                            ? 'correct'
                            : submittedA2 && answersA2[question.id]
                              ? 'incorrect'
                              : ''
                        }`}
                      >
                        <div className="question-text">
                          <span className="question-number">{question.id}.</span>
                          <p>{question.prompt}</p>
                        </div>
                        <div className="options-grid">
                          {question.options.map((option) => {
                            const inputId = `q-a2-${question.id}-${option.value}`
                            const checked = answersA2[question.id] === option.value
                            return (
                              <label
                                key={option.value}
                                className={`option ${checked ? 'checked' : ''} ${!canStartA2 ? 'disabled' : ''}`}
                                htmlFor={inputId}
                              >
                                <input
                                  type="radio"
                                  id={inputId}
                                  name={`question-a2-${question.id}`}
                                  value={option.value}
                                  checked={checked}
                                  disabled={!canStartA2}
                                  onChange={() => handleChangeA2(question.id, option.value)}
                                />
                                <span>{option.label}</span>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}
            </React.Fragment>
          )})}

          <div className="form-actions">
            <button type="submit" className="primary-link" disabled={!canStartA2}>
              Sprawdź wynik
            </button>
            <button type="button" className="ghost-button" onClick={handleResetA2} disabled={!canStartA2}>
              Wyczyść odpowiedzi
            </button>
          </div>
        </form>

        <div className="result-panel" aria-live="polite">
          {submittedA2 ? (
            <>
              <p className="result-title">Twój wynik</p>
              <p className="result-score">
                {scoreA2}/{questionsA2.length} poprawnych{percentA2 !== null ? ` (${percentA2}%)` : ''}
              </p>
              {unansweredA2 > 0 && (
                <p className="warning">
                  Uwaga: {unansweredA2} {unansweredA2 === 1 ? 'pytanie' : 'pytania'} pozostało bez odpowiedzi.
                </p>
              )}
              <div className="email-status">
                {emailSendingA2 && <p>Wysyłam wynik na kontakt@joannaadamek.edu.pl…</p>}
                {emailSentA2 && <p className="success">E-mail z wynikiem został wysłany w tle.</p>}
                {emailSendErrorA2 && <p className="email-error">{emailSendErrorA2}</p>}
              </div>
              <div className="whatsapp-card">
                <div>
                  <p className="whatsapp-title">Skontaktuj się na WhatsApp</p>
                  <p className="whatsapp-copy">Wyślij swój wynik i zapytaj o dalsze kroki.</p>
                </div>
                <a
                  className="whatsapp-button"
                  href={whatsappShareUrlA2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={whatsappLogo} alt="" aria-hidden="true" className="whatsapp-icon" />
                  Podziel się wynikiem
                </a>
              </div>
            </>
          ) : (
            <p className="muted">Wypełnij test i kliknij „Sprawdź wynik".</p>
          )}
        </div>

        <div className="post-result-actions">
          <a className="offer-button" href="https://joannaadamek.com.pl/semestralne/" target="_blank" rel="noopener noreferrer">
            Zobacz ofertę naszych kursów grupowych
          </a>
        </div>
      </SectionWrapper>
      )}

      {selectedLevel === 'B1' && (
      <SectionWrapper id="test-b1" className="german-test-body" ariaLabelledby="test-b1-title">
        <button 
          type="button" 
          className="back-button" 
          onClick={() => setSelectedLevel(null)}
        >
          ← Powrót do wyboru poziomu
        </button>
        <div className="test-header">
          <div>
            <p className="eyebrow">Test nr 3 — poziom B1</p>
            <h2 id="test-b1-title">
              Test poziomujący B1
            </h2>
            <p className="meta">Poziom średniozaawansowany</p>
          </div>
          <div className="meta-box">
            <strong>Instrukcja</strong>
            <p>Bitte markieren Sie Ihre Lösungen auf dem Antwortblatt. Es gibt nur eine richtige Lösung.</p>
            <p className="secondary">Łącznie: 50 pytań (101-150)</p>
          </div>
        </div>

        <form className="test-form" onSubmit={handleSubmitB1}>
          <div className="email-block">
            <label className="email-label" htmlFor="test-email-b1">
              Podaj swój e-mail, aby rozpocząć test
            </label>
            <input
              id="test-email-b1"
              name="email"
              type="email"
              value={emailB1}
              onChange={(event) => {
                const value = event.target.value
                setEmailB1(value)
                if (emailErrorB1 && validateEmail(value)) {
                  setEmailErrorB1(null)
                }
              }}
              required
              placeholder="np. imie.nazwisko@email.com"
            />
            <p className="email-helper">
              Adres e-mail jest wymagany przed zaznaczeniem odpowiedzi. Wynik zostanie wysłany na{' '}
              kontakt@joannaadamek.edu.pl.
            </p>
            {emailErrorB1 ? <p className="email-error">{emailErrorB1}</p> : null}
          </div>


          {groupedQuestionsB1.map(([section, sectionQuestions]) => (
            <React.Fragment key={section}>
              {section === 'Pytania 148-150' && (
                <div className="reading-text">
                  <h3>Tekst do pytań 148-150</h3>
                  <p><strong>Leben in der Stadt oder auf dem Dorf?</strong></p>
                  <p><strong>Jonas:</strong> Ich bin in einer kleinen Stadt aufgewachsen und habe dort lange gewohnt. Als ich mein Studium begonnen habe, bin ich nach Berlin gezogen. Dort gibt es viele Möglichkeiten, aber auch viel Stress. Heute lebe ich wieder außerhalb der Stadt. Die Natur ist näher, aber ohne Auto geht hier fast nichts. Später, wenn ich älter bin, könnte ich mir vorstellen, wieder zentral zu wohnen.</p>
                </div>
              )}
              {['Pytania 101-113', 'Pytania 114-125', 'Pytania 126-147'].includes(section) ? (
                <div className="question-list">
                  {sectionQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`question-card ${
                        submittedB1 && answersB1[question.id] === question.correct
                          ? 'correct'
                          : submittedB1 && answersB1[question.id]
                            ? 'incorrect'
                            : ''
                      }`}
                    >
                      <div className="question-text">
                        <span className="question-number">{question.id}.</span>
                        <p>{question.prompt}</p>
                      </div>
                      <div className="options-grid">
                        {question.options.map((option) => {
                          const inputId = `q-b1-${question.id}-${option.value}`
                          const checked = answersB1[question.id] === option.value
                          return (
                            <label
                              key={option.value}
                              className={`option ${checked ? 'checked' : ''} ${!canStartB1 ? 'disabled' : ''}`}
                              htmlFor={inputId}
                            >
                              <input
                                type="radio"
                                id={inputId}
                                name={`question-b1-${question.id}`}
                                value={option.value}
                                checked={checked}
                                disabled={!canStartB1}
                                onChange={() => handleChangeB1(question.id, option.value)}
                              />
                              <span>{option.label}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <fieldset className="question-section">
                  <legend>{section}</legend>
                  <div className="question-list">
                    {sectionQuestions.map((question) => (
                      <div
                        key={question.id}
                        className={`question-card ${
                          submittedB1 && answersB1[question.id] === question.correct
                            ? 'correct'
                            : submittedB1 && answersB1[question.id]
                              ? 'incorrect'
                              : ''
                        }`}
                      >
                        <div className="question-text">
                          <span className="question-number">{question.id}.</span>
                          <p>{question.prompt}</p>
                        </div>
                        <div className="options-grid">
                          {question.options.map((option) => {
                            const inputId = `q-b1-${question.id}-${option.value}`
                            const checked = answersB1[question.id] === option.value
                            return (
                              <label
                                key={option.value}
                                className={`option ${checked ? 'checked' : ''} ${!canStartB1 ? 'disabled' : ''}`}
                                htmlFor={inputId}
                              >
                                <input
                                  type="radio"
                                  id={inputId}
                                  name={`question-b1-${question.id}`}
                                  value={option.value}
                                  checked={checked}
                                  disabled={!canStartB1}
                                  onChange={() => handleChangeB1(question.id, option.value)}
                                />
                                <span>{option.label}</span>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}
            </React.Fragment>
          ))}

          <div className="form-actions">
            <button type="submit" className="primary-link" disabled={!canStartB1}>
              Sprawdź wynik
            </button>
            <button type="button" className="ghost-button" onClick={handleResetB1} disabled={!canStartB1}>
              Wyczyść odpowiedzi
            </button>
          </div>
        </form>

        <div className="result-panel" aria-live="polite">
          {submittedB1 ? (
            <>
              <p className="result-title">Twój wynik</p>
              <p className="result-score">
                {scoreB1}/{questionsB1.length} poprawnych{percentB1 !== null ? ` (${percentB1}%)` : ''}
              </p>
              {unansweredB1 > 0 && (
                <p className="warning">
                  Uwaga: {unansweredB1} {unansweredB1 === 1 ? 'pytanie' : 'pytania'} pozostało bez odpowiedzi.
                </p>
              )}
              <div className="email-status">
                {emailSendingB1 && <p>Wysyłam wynik na kontakt@joannaadamek.edu.pl…</p>}
                {emailSentB1 && <p className="success">E-mail z wynikiem został wysłany w tle.</p>}
                {emailSendErrorB1 && <p className="email-error">{emailSendErrorB1}</p>}
              </div>
              <div className="whatsapp-card">
                <div>
                  <p className="whatsapp-title">Skontaktuj się na WhatsApp</p>
                  <p className="whatsapp-copy">Wyślij swój wynik i zapytaj o dalsze kroki.</p>
                </div>
                <a
                  className="whatsapp-button"
                  href={whatsappShareUrlB1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={whatsappLogo} alt="" aria-hidden="true" className="whatsapp-icon" />
                  Podziel się wynikiem
                </a>
              </div>
            </>
          ) : (
            <p className="muted">Wypełnij test i kliknij „Sprawdź wynik".</p>
          )}
        </div>

        <div className="post-result-actions">
          <a className="offer-button" href="https://joannaadamek.com.pl/semestralne/" target="_blank" rel="noopener noreferrer">
            Zobacz ofertę naszych kursów grupowych
          </a>
        </div>
      </SectionWrapper>
      )}

      {selectedLevel === 'B2' && (
      <SectionWrapper id="test-b2" className="german-test-body" ariaLabelledby="test-b2-title">
        <button 
          type="button" 
          className="back-button" 
          onClick={() => setSelectedLevel(null)}
        >
          ← Powrót do wyboru poziomu
        </button>
        <div className="test-header">
          <div>
            <p className="eyebrow">Test nr 4 — poziom B2</p>
            <h2 id="test-b2-title">
              Test poziomujący B2
            </h2>
            <p className="meta">Poziom zaawansowany</p>
          </div>
          <div className="meta-box">
            <strong>Instrukcja</strong>
            <p>Bitte markieren Sie Ihre Lösungen auf dem Antwortblatt. Es gibt nur eine richtige Lösung.</p>
            <p className="secondary">Łącznie: 50 pytań (151-200)</p>
          </div>
        </div>

        <form className="test-form" onSubmit={handleSubmitB2}>
          <div className="email-block">
            <label className="email-label" htmlFor="test-email-b2">
              Podaj swój e-mail, aby rozpocząć test
            </label>
            <input
              id="test-email-b2"
              name="email"
              type="email"
              value={emailB2}
              onChange={(event) => {
                const value = event.target.value
                setEmailB2(value)
                if (emailErrorB2 && validateEmail(value)) {
                  setEmailErrorB2(null)
                }
              }}
              required
              placeholder="np. imie.nazwisko@email.com"
            />
            <p className="email-helper">
              Adres e-mail jest wymagany przed zaznaczeniem odpowiedzi. Wynik zostanie wysłany na{' '}
              kontakt@joannaadamek.edu.pl.
            </p>
            {emailErrorB2 ? <p className="email-error">{emailErrorB2}</p> : null}
          </div>

          {groupedQuestionsB2.map(([section, sectionQuestions]) => (
            <React.Fragment key={section}>
              {['Pytania 164-175', 'Pytania 176-200'].includes(section) ? (
                <div className="question-list">
                  {sectionQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`question-card ${
                        submittedB2 && answersB2[question.id] === question.correct
                          ? 'correct'
                          : submittedB2 && answersB2[question.id]
                            ? 'incorrect'
                            : ''
                      }`}
                    >
                      <div className="question-text">
                        <span className="question-number">{question.id}.</span>
                        <p>{question.prompt}</p>
                      </div>
                      <div className="options-grid">
                        {question.options.map((option) => {
                          const inputId = `q-b2-${question.id}-${option.value}`
                          const checked = answersB2[question.id] === option.value
                          return (
                            <label
                              key={option.value}
                              className={`option ${checked ? 'checked' : ''} ${!canStartB2 ? 'disabled' : ''}`}
                              htmlFor={inputId}
                            >
                              <input
                                type="radio"
                                id={inputId}
                                name={`question-b2-${question.id}`}
                                value={option.value}
                                checked={checked}
                                disabled={!canStartB2}
                                onChange={() => handleChangeB2(question.id, option.value)}
                              />
                              <span>{option.label}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <fieldset className="question-section">
                  <legend>{section}</legend>
                  <div className="question-list">
                    {sectionQuestions.map((question) => (
                      <div
                        key={question.id}
                        className={`question-card ${
                          submittedB2 && answersB2[question.id] === question.correct
                            ? 'correct'
                            : submittedB2 && answersB2[question.id]
                              ? 'incorrect'
                              : ''
                        }`}
                      >
                        <div className="question-text">
                          <span className="question-number">{question.id}.</span>
                          <p>{question.prompt}</p>
                        </div>
                        <div className="options-grid">
                          {question.options.map((option) => {
                            const inputId = `q-b2-${question.id}-${option.value}`
                            const checked = answersB2[question.id] === option.value
                            return (
                              <label
                                key={option.value}
                                className={`option ${checked ? 'checked' : ''} ${!canStartB2 ? 'disabled' : ''}`}
                                htmlFor={inputId}
                              >
                                <input
                                  type="radio"
                                  id={inputId}
                                  name={`question-b2-${question.id}`}
                                  value={option.value}
                                  checked={checked}
                                  disabled={!canStartB2}
                                  onChange={() => handleChangeB2(question.id, option.value)}
                                />
                                <span>{option.label}</span>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}
            </React.Fragment>
          ))}

          <div className="form-actions">
            <button type="submit" className="primary-link" disabled={!canStartB2}>
              Sprawdź wynik
            </button>
            <button type="button" className="ghost-button" onClick={handleResetB2} disabled={!canStartB2}>
              Wyczyść odpowiedzi
            </button>
          </div>
        </form>

        <div className="result-panel" aria-live="polite">
          {submittedB2 ? (
            <>
              <p className="result-title">Twój wynik</p>
              <p className="result-score">
                {scoreB2}/{questionsB2.length} poprawnych{percentB2 !== null ? ` (${percentB2}%)` : ''}
              </p>
              {unansweredB2 > 0 && (
                <p className="warning">
                  Uwaga: {unansweredB2} {unansweredB2 === 1 ? 'pytanie' : 'pytania'} pozostało bez odpowiedzi.
                </p>
              )}
              <div className="email-status">
                {emailSendingB2 && <p>Wysyłam wynik na kontakt@joannaadamek.edu.pl…</p>}
                {emailSentB2 && <p className="success">E-mail z wynikiem został wysłany w tle.</p>}
                {emailSendErrorB2 && <p className="email-error">{emailSendErrorB2}</p>}
              </div>
              <div className="whatsapp-card">
                <div>
                  <p className="whatsapp-title">Skontaktuj się na WhatsApp</p>
                  <p className="whatsapp-copy">Wyślij swój wynik i zapytaj o dalsze kroki.</p>
                </div>
                <a
                  className="whatsapp-button"
                  href={whatsappShareUrlB2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={whatsappLogo} alt="" aria-hidden="true" className="whatsapp-icon" />
                  Podziel się wynikiem
                </a>
              </div>
            </>
          ) : (
            <p className="muted">Wypełnij test i kliknij „Sprawdź wynik".</p>
          )}
        </div>

        <div className="post-result-actions">
          <a className="offer-button" href="https://joannaadamek.com.pl/semestralne/" target="_blank" rel="noopener noreferrer">
            Zobacz ofertę naszych kursów grupowych
          </a>
        </div>
      </SectionWrapper>
      )}

      {selectedLevel === 'C1' && (
      <SectionWrapper id="test-c1" className="german-test-body" ariaLabelledby="test-c1-title">
        <button 
          type="button" 
          className="back-button" 
          onClick={() => setSelectedLevel(null)}
        >
          ← Powrót do wyboru poziomu
        </button>
        <div className="test-header">
          <div>
            <p className="eyebrow">Test nr 5 — poziom C1</p>
            <h2 id="test-c1-title">
              Test poziomujący C1
            </h2>
            <p className="meta">Poziom biegły</p>
          </div>
          <div className="meta-box">
            <strong>Instrukcja</strong>
            <p>Bitte markieren Sie Ihre Lösungen auf dem Antwortblatt. Es gibt nur eine richtige Lösung.</p>
            <p className="secondary">Łącznie: 25 pytań (201-225)</p>
          </div>
        </div>

        <form className="test-form" onSubmit={handleSubmitC1}>
          <div className="email-block">
            <label className="email-label" htmlFor="test-email-c1">
              Podaj swój e-mail, aby rozpocząć test
            </label>
            <input
              id="test-email-c1"
              name="email"
              type="email"
              value={emailC1}
              onChange={(event) => {
                const value = event.target.value
                setEmailC1(value)
                if (emailErrorC1 && validateEmail(value)) {
                  setEmailErrorC1(null)
                }
              }}
              required
              placeholder="np. imie.nazwisko@email.com"
            />
            <p className="email-helper">
              Adres e-mail jest wymagany przed zaznaczeniem odpowiedzi. Wynik zostanie wysłany na{' '}
              kontakt@joannaadamek.edu.pl.
            </p>
            {emailErrorC1 ? <p className="email-error">{emailErrorC1}</p> : null}
          </div>

          {groupedQuestionsC1.map(([section, sectionQuestions]) => (
            <fieldset key={section} className="question-section">
              <legend>{section}</legend>
              <div className="question-list">
                {sectionQuestions.map((question) => (
                  <div
                    key={question.id}
                    className={`question-card ${
                      submittedC1 && answersC1[question.id] === question.correct
                        ? 'correct'
                        : submittedC1 && answersC1[question.id]
                          ? 'incorrect'
                          : ''
                    }`}
                  >
                    <div className="question-text">
                      <span className="question-number">{question.id}.</span>
                      <p>{question.prompt}</p>
                    </div>
                    <div className="options-grid">
                      {question.options.map((option) => {
                        const inputId = `q-c1-${question.id}-${option.value}`
                        const checked = answersC1[question.id] === option.value
                        return (
                          <label
                            key={option.value}
                            className={`option ${checked ? 'checked' : ''} ${!canStartC1 ? 'disabled' : ''}`}
                            htmlFor={inputId}
                          >
                            <input
                              type="radio"
                              id={inputId}
                              name={`question-c1-${question.id}`}
                              value={option.value}
                              checked={checked}
                              disabled={!canStartC1}
                              onChange={() => handleChangeC1(question.id, option.value)}
                            />
                            <span>{option.label}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="form-actions">
            <button type="submit" className="primary-link" disabled={!canStartC1}>
              Sprawdź wynik
            </button>
            <button type="button" className="ghost-button" onClick={handleResetC1} disabled={!canStartC1}>
              Wyczyść odpowiedzi
            </button>
          </div>
        </form>

        <div className="result-panel" aria-live="polite">
          {submittedC1 ? (
            <>
              <p className="result-title">Twój wynik</p>
              <p className="result-score">
                {scoreC1}/{questionsC1.length} poprawnych{percentC1 !== null ? ` (${percentC1}%)` : ''}
              </p>
              {unansweredC1 > 0 && (
                <p className="warning">
                  Uwaga: {unansweredC1} {unansweredC1 === 1 ? 'pytanie' : 'pytania'} pozostało bez odpowiedzi.
                </p>
              )}
              <div className="email-status">
                {emailSendingC1 && <p>Wysyłam wynik na kontakt@joannaadamek.edu.pl…</p>}
                {emailSentC1 && <p className="success">E-mail z wynikiem został wysłany w tle.</p>}
                {emailSendErrorC1 && <p className="email-error">{emailSendErrorC1}</p>}
              </div>
              <div className="whatsapp-card">
                <div>
                  <p className="whatsapp-title">Skontaktuj się na WhatsApp</p>
                  <p className="whatsapp-copy">Wyślij swój wynik i zapytaj o dalsze kroki.</p>
                </div>
                <a
                  className="whatsapp-button"
                  href={whatsappShareUrlC1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={whatsappLogo} alt="" aria-hidden="true" className="whatsapp-icon" />
                  Podziel się wynikiem
                </a>
              </div>
            </>
          ) : (
            <p className="muted">Wypełnij test i kliknij „Sprawdź wynik".</p>
          )}
        </div>

        <div className="post-result-actions">
          <a className="offer-button" href="https://joannaadamek.com.pl/semestralne/" target="_blank" rel="noopener noreferrer">
            Zobacz ofertę naszych kursów grupowych
          </a>
        </div>
      </SectionWrapper>
      )}
    </div>
  )
}

export default GermanTestsPage

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

async function sendResultsEmail(
  correct: number,
  missing: number,
  userEmail: string,
  totalQuestions: number,
  level: string,
) {
  const apiBase = import.meta.env.VITE_API_BASE_URL ?? ''
  const percent = Math.round((correct / totalQuestions) * 100)

  const response = await fetch(`${apiBase}/api/send-result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      correct,
      total: totalQuestions,
      missing,
      percent,
      userEmail,
      level,
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Błąd wysyłania e-maila.')
  }
}
