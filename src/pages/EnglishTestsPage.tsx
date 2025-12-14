import { useState } from 'react'
import { Link } from 'react-router-dom'
import TestForm from '../components/Test/TestForm'
import type { Question } from '../components/Test/types'
import { useTestState } from '../hooks/useTestState'
import whatsappLogo from '../assets/whatsapp.png'
import SectionWrapper from '../components/SectionWrapper/SectionWrapper'
import './EnglishTestsPage.css'

const questionsBasic: Question[] = [
  {
    id: 1,
    prompt: '___ name is Robert.',
    options: [
      { value: 'a', label: 'A) Me' },
      { value: 'b', label: 'B) I' },
      { value: 'c', label: 'C) My' },
    ],
    correct: 'c',
  },
  {
    id: 2,
    prompt: 'They ___ from Spain.',
    options: [
      { value: 'a', label: 'A) is' },
      { value: 'b', label: 'B) are' },
      { value: 'c', label: 'C) do' },
    ],
    correct: 'b',
  },
  {
    id: 3,
    prompt: '___ are you from?',
    options: [
      { value: 'a', label: 'A) What' },
      { value: 'b', label: 'B) Who' },
      { value: 'c', label: 'C) Where' },
    ],
    correct: 'c',
  },
  {
    id: 4,
    prompt: "What do you do? I'm ___ student.",
    options: [
      { value: 'a', label: 'A) the' },
      { value: 'b', label: 'B) a' },
      { value: 'c', label: 'C) the' },
    ],
    correct: 'b',
  },
  {
    id: 5,
    prompt: "Peter ___ at seven o'clock.",
    options: [
      { value: 'a', label: 'A) goes up' },
      { value: 'b', label: 'B) gets' },
      { value: 'c', label: 'C) gets up' },
    ],
    correct: 'c',
  },
  {
    id: 6,
    prompt: '___ you like this book?',
    options: [
      { value: 'a', label: 'A) Are' },
      { value: 'b', label: 'B) Have' },
      { value: 'c', label: 'C) Do' },
    ],
    correct: 'c',
  },
  {
    id: 7,
    prompt: 'We ___ live in a flat.',
    options: [
      { value: 'a', label: "A) don't" },
      { value: 'b', label: "B) hasn't" },
      { value: 'c', label: "C) doesn't" },
    ],
    correct: 'a',
  },
  {
    id: 8,
    prompt: 'Wednesday, Thursday, Friday, ___',
    options: [
      { value: 'a', label: 'A) Saturday' },
      { value: 'b', label: 'B) Tuesday' },
      { value: 'c', label: 'C) Monday' },
    ],
    correct: 'a',
  },
  {
    id: 9,
    prompt: '___ he play tennis?',
    options: [
      { value: 'a', label: 'A) Where' },
      { value: 'b', label: 'B) Does' },
      { value: 'c', label: 'C) Do' },
    ],
    correct: 'b',
  },
  {
    id: 10,
    prompt: 'Have you ___ a car?',
    options: [
      { value: 'a', label: 'A) any' },
      { value: 'b', label: 'B) have' },
      { value: 'c', label: 'C) got' },
    ],
    correct: 'c',
  },
  {
    id: 11,
    prompt: "We don't have ___ butter.",
    options: [
      { value: 'a', label: 'A) a' },
      { value: 'b', label: 'B) any' },
      { value: 'c', label: 'C) got' },
    ],
    correct: 'b',
  },
  {
    id: 12,
    prompt: '___ some money here.',
    options: [
      { value: 'a', label: "A) There're" },
      { value: 'b', label: 'B) There' },
      { value: 'c', label: "C) There's" },
    ],
    correct: 'c',
  },
  {
    id: 13,
    prompt: 'We ___ got a garage.',
    options: [
      { value: 'a', label: "A) haven't" },
      { value: 'b', label: "B) hasn't" },
      { value: 'c', label: "C) don't" },
    ],
    correct: 'a',
  },
  {
    id: 14,
    prompt: 'Those shoes are very ___',
    options: [
      { value: 'a', label: 'A) expensive' },
      { value: 'b', label: 'B) a lot' },
      { value: 'c', label: 'C) cost' },
    ],
    correct: 'a',
  },
  {
    id: 15,
    prompt: 'Have you got a pen? Yes, I ___.',
    options: [
      { value: 'a', label: 'A) am' },
      { value: 'b', label: 'B) have' },
      { value: 'c', label: 'C) got' },
    ],
    correct: 'b',
  },
  {
    id: 16,
    prompt: 'It is a ___, busy city.',
    options: [
      { value: 'a', label: 'A) traffic' },
      { value: 'b', label: 'B) quite' },
      { value: 'c', label: 'C) noisy' },
    ],
    correct: 'c',
  },
  {
    id: 17,
    prompt: 'They ___ at home yesterday.',
    options: [
      { value: 'a', label: 'A) was' },
      { value: 'b', label: 'B) are' },
      { value: 'c', label: 'C) were' },
    ],
    correct: 'c',
  },
  {
    id: 18,
    prompt: 'I ___ there for a long time.',
    options: [
      { value: 'a', label: 'A) lived' },
      { value: 'b', label: 'B) living' },
      { value: 'c', label: 'C) live' },
    ],
    correct: 'a',
  },
  {
    id: 19,
    prompt: "He didn't ___ glasses.",
    options: [
      { value: 'a', label: 'A) put' },
      { value: 'b', label: 'B) wear' },
      { value: 'c', label: 'C) take' },
    ],
    correct: 'b',
  },
  {
    id: 20,
    prompt: 'The restaurant was ___ busy.',
    options: [
      { value: 'a', label: 'A) very' },
      { value: 'b', label: 'B) a lot' },
      { value: 'c', label: 'C) many' },
    ],
    correct: 'a',
  },
  {
    id: 21,
    prompt: 'Do you like the red ___?',
    options: [
      { value: 'a', label: 'A) it' },
      { value: 'b', label: 'B) that' },
      { value: 'c', label: 'C) one' },
    ],
    correct: 'c',
  },
  {
    id: 22,
    prompt: 'He ___ to Brazil on business.',
    options: [
      { value: 'a', label: 'A) go' },
      { value: 'b', label: 'B) goed' },
      { value: 'c', label: 'C) went' },
    ],
    correct: 'c',
  },
  {
    id: 23,
    prompt: 'Yesterday was the ___ of April.',
    options: [
      { value: 'a', label: 'A) third' },
      { value: 'b', label: 'B) three' },
      { value: 'c', label: 'C) day three' },
    ],
    correct: 'a',
  },
  {
    id: 24,
    prompt: "She's got ___ hair.",
    options: [
      { value: 'a', label: 'A) darkness' },
      { value: 'b', label: 'B) long and dark' },
      { value: 'c', label: 'C) long dark and' },
    ],
    correct: 'b',
  },
  {
    id: 25,
    prompt: 'I ___ play football at the weekend.',
    options: [
      { value: 'a', label: 'A) usually' },
      { value: 'b', label: 'B) use' },
      { value: 'c', label: 'C) usual' },
    ],
    correct: 'a',
  },
  {
    id: 26,
    prompt: 'I ___ in an armchair at the moment.',
    options: [
      { value: 'a', label: 'A) sitting' },
      { value: 'b', label: "B) 'm sitting" },
      { value: 'c', label: 'C) sit' },
    ],
    correct: 'b',
  },
  {
    id: 27,
    prompt: 'My brother is older ___ me.',
    options: [
      { value: 'a', label: 'A) then' },
      { value: 'b', label: 'B) that' },
      { value: 'c', label: 'C) than' },
    ],
    correct: 'c',
  },
  {
    id: 28,
    prompt: 'Their car is ___ biggest on the road.',
    options: [
      { value: 'a', label: 'A) than' },
      { value: 'b', label: 'B) this' },
      { value: 'c', label: 'C) the' },
    ],
    correct: 'c',
  },
  {
    id: 29,
    prompt: "It's the ___ interesting of his films.",
    options: [
      { value: 'a', label: 'A) more' },
      { value: 'b', label: 'B) much' },
      { value: 'c', label: 'C) most' },
    ],
    correct: 'c',
  },
  {
    id: 30,
    prompt: "The phone's ringing: I ___ answer it.",
    options: [
      { value: 'a', label: "A) 'll" },
      { value: 'b', label: 'B) I' },
      { value: 'c', label: 'C) will' },
    ],
    correct: 'a',
  },
  {
    id: 31,
    prompt: 'Do you ___ classical or rock music?',
    options: [
      { value: 'a', label: 'A) rather' },
      { value: 'b', label: 'B) prefer' },
      { value: 'c', label: 'C) more' },
    ],
    correct: 'b',
  },
  {
    id: 32,
    prompt: 'He has ___ breakfast.',
    options: [
      { value: 'a', label: 'A) ate' },
      { value: 'b', label: 'B) eaten' },
      { value: 'c', label: 'C) eat' },
    ],
    correct: 'b',
  },
  {
    id: 33,
    prompt: 'The ___ have seen it before.',
    options: [
      { value: 'a', label: 'A) childs' },
      { value: 'b', label: 'B) child' },
      { value: 'c', label: 'C) children' },
    ],
    correct: 'c',
  },
  {
    id: 34,
    prompt: "I've never met an actor ___",
    options: [
      { value: 'a', label: 'A) before' },
      { value: 'b', label: 'B) already' },
      { value: 'c', label: 'C) after' },
    ],
    correct: 'a',
  },
  {
    id: 35,
    prompt: '___ is very good exercise.',
    options: [
      { value: 'a', label: 'A) Swim' },
      { value: 'b', label: 'B) To swim' },
      { value: 'c', label: 'C) Swimming' },
    ],
    correct: 'c',
  },
  {
    id: 36,
    prompt: 'Have you ___ been on a winter holiday?',
    options: [
      { value: 'a', label: 'A) always' },
      { value: 'b', label: 'B) ever' },
      { value: 'c', label: 'C) just' },
    ],
    correct: 'b',
  },
  {
    id: 37,
    prompt: "I can't ___ another language",
    options: [
      { value: 'a', label: 'A) speaking' },
      { value: 'b', label: 'B) speak' },
      { value: 'c', label: 'C) to speak' },
    ],
    correct: 'b',
  },
  {
    id: 38,
    prompt: 'They ___ pay for the tickets',
    options: [
      { value: 'a', label: "A) haven't to" },
      { value: 'b', label: "B) don't have" },
      { value: 'c', label: "C) don't have to" },
    ],
    correct: 'c',
  },
  {
    id: 39,
    prompt: '___ old is their car?',
    options: [
      { value: 'a', label: 'A) What' },
      { value: 'b', label: 'B) When' },
      { value: 'c', label: 'C) How' },
    ],
    correct: 'c',
  },
  {
    id: 40,
    prompt: 'Are you ___ for one or two weeks?',
    options: [
      { value: 'a', label: 'A) staying' },
      { value: 'b', label: 'B) stayed' },
      { value: 'c', label: 'C) stay' },
    ],
    correct: 'a',
  },
  {
    id: 41,
    prompt: 'Stephen ___ to visit his parents.',
    options: [
      { value: 'a', label: 'A) will' },
      { value: 'b', label: 'B) going' },
      { value: 'c', label: 'C) is going' },
    ],
    correct: 'c',
  },
  {
    id: 42,
    prompt: "I don't ___ getting up early.",
    options: [
      { value: 'a', label: 'A) not like' },
      { value: 'b', label: 'B) want' },
      { value: 'c', label: 'C) enjoy' },
    ],
    correct: 'c',
  },
  {
    id: 43,
    prompt: 'We ___ like to see the mountains.',
    options: [
      { value: 'a', label: 'A) would' },
      { value: 'b', label: 'B) will' },
      { value: 'c', label: 'C) are' },
    ],
    correct: 'a',
  },
  {
    id: 44,
    prompt: 'They ___ ever check their emails.',
    options: [
      { value: 'a', label: 'A) hard' },
      { value: 'b', label: 'B) harder' },
      { value: 'c', label: 'C) hardly' },
    ],
    correct: 'c',
  },
  {
    id: 45,
    prompt: "They won't come, ___ they?",
    options: [
      { value: 'a', label: "A) won't" },
      { value: 'b', label: 'B) come' },
      { value: 'c', label: 'C) will' },
    ],
    correct: 'c',
  },
  {
    id: 46,
    prompt: 'He ___ know how to spell it.',
    options: [
      { value: 'a', label: "A) doesn't" },
      { value: 'b', label: "B) hasn't" },
      { value: 'c', label: "C) don't" },
    ],
    correct: 'a',
  },
  {
    id: 47,
    prompt: 'Carla ___ to the radio all morning.',
    options: [
      { value: 'a', label: 'A) listening' },
      { value: 'b', label: 'B) heard' },
      { value: 'c', label: 'C) listened' },
    ],
    correct: 'c',
  },
  {
    id: 48,
    prompt: 'They ___ come to the cinema with us.',
    options: [
      { value: 'a', label: "A) doesn't" },
      { value: 'b', label: 'B) not' },
      { value: 'c', label: "C) didn't" },
    ],
    correct: 'c',
  },
  {
    id: 49,
    prompt: 'I like this song. ___ do I.',
    options: [
      { value: 'a', label: 'A) Either' },
      { value: 'b', label: 'B) So' },
      { value: 'c', label: 'C) Neither' },
    ],
    correct: 'b',
  },
  {
    id: 50,
    prompt: "We ___ them at eight o'clock.",
    options: [
      { value: 'a', label: 'A) meet' },
      { value: 'b', label: "B) 're meet" },
      { value: 'c', label: "C) 're meeting" },
    ],
    correct: 'c',
  },
]

const questionsAdvanced: Question[] = [
  {
    id: 1,
    prompt: 'They are going ___ in America next month.',
    options: [
      { value: 'a', label: 'A) to be' },
      { value: 'b', label: 'B) will be' },
      { value: 'c', label: 'C) be' },
    ],
    correct: 'a',
  },
  {
    id: 2,
    prompt: 'This is the cinema ___ we saw the film.',
    options: [
      { value: 'a', label: 'A) when' },
      { value: 'b', label: 'B) which' },
      { value: 'c', label: 'C) where' },
    ],
    correct: 'c',
  },
  {
    id: 3,
    prompt: 'Have you ever ___ in a jazz band?',
    options: [
      { value: 'a', label: 'A) seen' },
      { value: 'b', label: 'B) played' },
      { value: 'c', label: 'C) listened' },
    ],
    correct: 'b',
  },
  {
    id: 4,
    prompt: "I'm ___ when I'm with you.",
    options: [
      { value: 'a', label: 'A) happyer' },
      { value: 'b', label: 'B) happier than' },
      { value: 'c', label: 'C) happier' },
    ],
    correct: 'c',
  },
  {
    id: 5,
    prompt: "Peter ___ at seven o'clock.",
    options: [
      { value: 'a', label: 'A) goes up' },
      { value: 'b', label: 'B) gets' },
      { value: 'c', label: 'C) gets up' },
    ],
    correct: 'c',
  },
  {
    id: 6,
    prompt: 'This is ___ than I thought.',
    options: [
      { value: 'a', label: 'A) bad' },
      { value: 'b', label: 'B) badder' },
      { value: 'c', label: 'C) worse' },
    ],
    correct: 'c',
  },
  {
    id: 7,
    prompt: 'Can you tell me the way ___?',
    options: [
      { value: 'a', label: 'A) to the bank' },
      { value: 'b', label: 'B) is the bank' },
      { value: 'c', label: 'C) where is bank' },
    ],
    correct: 'a',
  },
  {
    id: 8,
    prompt: 'Do you know what ___?',
    options: [
      { value: 'a', label: 'A) time is it' },
      { value: 'b', label: 'B) time it is' },
      { value: 'c', label: 'C) time is now' },
    ],
    correct: 'b',
  },
  {
    id: 9,
    prompt: 'Were you ___ to open the door?',
    options: [
      { value: 'a', label: 'A) could' },
      { value: 'b', label: 'B) can' },
      { value: 'c', label: 'C) able' },
    ],
    correct: 'c',
  },
  {
    id: 10,
    prompt: 'Everybody must ___ a seat belt in the car.',
    options: [
      { value: 'a', label: 'A) must' },
      { value: 'b', label: "B) mustn't" },
      { value: 'c', label: "C) don't have to" },
    ],
    correct: 'a',
  },
  {
    id: 11,
    prompt: 'Tom has lived in this town ___ three years.',
    options: [
      { value: 'a', label: 'A) since' },
      { value: 'b', label: 'B) for' },
      { value: 'c', label: 'C) after' },
    ],
    correct: 'b',
  },
  {
    id: 12,
    prompt: 'We ___ work in that factory.',
    options: [
      { value: 'a', label: 'A) use to' },
      { value: 'b', label: 'B) was' },
      { value: 'c', label: 'C) used to' },
    ],
    correct: 'c',
  },
  {
    id: 13,
    prompt: 'I think it ___ be sunny tomorrow.',
    options: [
      { value: 'a', label: 'A) will probably' },
      { value: 'b', label: 'B) probably' },
      { value: 'c', label: 'C) can' },
    ],
    correct: 'a',
  },
  {
    id: 14,
    prompt: 'He ___ like his brother.',
    options: [
      { value: 'a', label: 'A) look' },
      { value: 'b', label: "B) isn't" },
      { value: 'c', label: "C) isn't look" },
    ],
    correct: 'b',
  },
  {
    id: 15,
    prompt: '___ does your boyfriend look like?',
    options: [
      { value: 'a', label: 'A) How' },
      { value: 'b', label: 'B) What' },
      { value: 'c', label: 'C) Why' },
    ],
    correct: 'b',
  },
  {
    id: 16,
    prompt: "I've got ___ many problems.",
    options: [
      { value: 'a', label: 'A) too' },
      { value: 'b', label: 'B) a' },
      { value: 'c', label: 'C) enough' },
    ],
    correct: 'a',
  },
  {
    id: 17,
    prompt: 'If we get up in time, ___ catch the train.',
    options: [
      { value: 'a', label: 'A) we catch' },
      { value: 'b', label: 'B) we caught' },
      { value: 'c', label: "C) we'll catch" },
    ],
    correct: 'c',
  },
  {
    id: 18,
    prompt: 'They ___ to go to France for a year.',
    options: [
      { value: 'a', label: 'A) decide' },
      { value: 'b', label: 'B) deciding' },
      { value: 'c', label: 'C) decided' },
    ],
    correct: 'c',
  },
  {
    id: 19,
    prompt: "I'm working ___ to pass my exam.",
    options: [
      { value: 'a', label: 'A) hardly' },
      { value: 'b', label: 'B) much' },
      { value: 'c', label: 'C) hard' },
    ],
    correct: 'c',
  },
  {
    id: 20,
    prompt: "I'm writing ___ ask you to explain.",
    options: [
      { value: 'a', label: 'A) for' },
      { value: 'b', label: 'B) in order to' },
      { value: 'c', label: 'C) because' },
    ],
    correct: 'b',
  },
  {
    id: 21,
    prompt: 'He said that most problems ___ by teenagers.',
    options: [
      { value: 'a', label: 'A) cause' },
      { value: 'b', label: 'B) caused' },
      { value: 'c', label: 'C) were caused' },
    ],
    correct: 'c',
  },
  {
    id: 22,
    prompt: 'What ___ to do at the weekend?',
    options: [
      { value: 'a', label: 'A) have you like' },
      { value: 'b', label: 'B) are you liking' },
      { value: 'c', label: 'C) do you like' },
    ],
    correct: 'c',
  },
  {
    id: 23,
    prompt: 'Football ___ in most countries.',
    options: [
      { value: 'a', label: 'A) plays' },
      { value: 'b', label: 'B) players' },
      { value: 'c', label: 'C) is played' },
    ],
    correct: 'c',
  },
  {
    id: 24,
    prompt: 'Who was ___ the door?',
    options: [
      { value: 'a', label: 'A) at' },
      { value: 'b', label: 'B) on' },
      { value: 'c', label: 'C) in' },
    ],
    correct: 'a',
  },
  {
    id: 25,
    prompt: 'We ___ lunch when you telephoned.',
    options: [
      { value: 'a', label: 'A) was having' },
      { value: 'b', label: 'B) had' },
      { value: 'c', label: 'C) were having' },
    ],
    correct: 'c',
  },
  {
    id: 26,
    prompt: 'Your work is ___ better.',
    options: [
      { value: 'a', label: 'A) being' },
      { value: 'b', label: 'B) doing' },
      { value: 'c', label: 'C) getting' },
    ],
    correct: 'c',
  },
  {
    id: 27,
    prompt: 'She could play the piano ___ she could walk.',
    options: [
      { value: 'a', label: 'A) during' },
      { value: 'b', label: 'B) before' },
      { value: 'c', label: 'C) after' },
    ],
    correct: 'b',
  },
  {
    id: 28,
    prompt: 'The train was cancelled, so we ___.',
    options: [
      { value: 'a', label: "A) couldn't go" },
      { value: 'b', label: "B) wasn't go" },
      { value: 'c', label: "C) didn't went" },
    ],
    correct: 'a',
  },
  {
    id: 29,
    prompt: 'The problem was ___ solved.',
    options: [
      { value: 'a', label: 'A) easy' },
      { value: 'b', label: 'B) easily' },
      { value: 'c', label: 'C) an easy' },
    ],
    correct: 'b',
  },
  {
    id: 30,
    prompt: 'It was a difficult journey, but I ___ get home.',
    options: [
      { value: 'a', label: 'A) could' },
      { value: 'b', label: 'B) managed to' },
      { value: 'c', label: 'C) at last' },
    ],
    correct: 'b',
  },
  {
    id: 31,
    prompt: 'We had not ___ heard the news.',
    options: [
      { value: 'a', label: 'A) already' },
      { value: 'b', label: 'B) always' },
      { value: 'c', label: 'C) yet' },
    ],
    correct: 'c',
  },
  {
    id: 32,
    prompt: 'We arrived at the station, but the bus ___ earlier.',
    options: [
      { value: 'a', label: 'A) has left' },
      { value: 'b', label: 'B) had left' },
      { value: 'c', label: 'C) has leave' },
    ],
    correct: 'b',
  },
  {
    id: 33,
    prompt: 'We can ___ walk or go by car.',
    options: [
      { value: 'a', label: 'A) both' },
      { value: 'b', label: 'B) rather' },
      { value: 'c', label: 'C) either' },
    ],
    correct: 'c',
  },
  {
    id: 34,
    prompt: "If I ___ enough money, I'd buy a new car.",
    options: [
      { value: 'a', label: 'A) had' },
      { value: 'b', label: 'B) would' },
      { value: 'c', label: 'C) did' },
    ],
    correct: 'a',
  },
  {
    id: 35,
    prompt: 'It ___ correctly.',
    options: [
      { value: 'a', label: "A) hasn't done" },
      { value: 'b', label: "B) hasn't been done" },
      { value: 'c', label: "C) hasn't been do" },
    ],
    correct: 'b',
  },
  {
    id: 36,
    prompt: "The accident wouldn't have happened if you had been more ___.",
    options: [
      { value: 'a', label: 'A) careful' },
      { value: 'b', label: 'B) carefully' },
      { value: 'c', label: 'C) careless' },
    ],
    correct: 'a',
  },
  {
    id: 37,
    prompt: 'It ___ be possible some time in the future.',
    options: [
      { value: 'a', label: 'A) can' },
      { value: 'b', label: 'B) hope' },
      { value: 'c', label: 'C) may' },
    ],
    correct: 'c',
  },
  {
    id: 38,
    prompt: 'Schools then ___ having more children in the class.',
    options: [
      { value: 'a', label: 'A) was used to' },
      { value: 'b', label: 'B) were used to' },
      { value: 'c', label: 'C) was use to' },
    ],
    correct: 'b',
  },
  {
    id: 39,
    prompt: 'We ___ to go to work at six in the morning.',
    options: [
      { value: 'a', label: 'A) must' },
      { value: 'b', label: 'B) would' },
      { value: 'c', label: 'C) had' },
    ],
    correct: 'c',
  },
  {
    id: 40,
    prompt: 'They ___ an old photograph of the place.',
    options: [
      { value: 'a', label: 'A) came up' },
      { value: 'b', label: 'B) came across' },
      { value: 'c', label: 'C) came into' },
    ],
    correct: 'b',
  },
  {
    id: 41,
    prompt: 'I ___ I had been able to meet her.',
    options: [
      { value: 'a', label: 'A) wish' },
      { value: 'b', label: 'B) want' },
      { value: 'c', label: 'C) think' },
    ],
    correct: 'a',
  },
  {
    id: 42,
    prompt: "We'll have taken our exams ___ this time next month.",
    options: [
      { value: 'a', label: 'A) by' },
      { value: 'b', label: 'B) on' },
      { value: 'c', label: 'C) during' },
    ],
    correct: 'a',
  },
  {
    id: 43,
    prompt: 'I will do badly in my work, ___ try harder.',
    options: [
      { value: 'a', label: "A) if I'm not" },
      { value: 'b', label: "B) if I don't" },
      { value: 'c', label: "C) if I haven't" },
    ],
    correct: 'b',
  },
  {
    id: 44,
    prompt: 'I ___ wasted my time when I was at university',
    options: [
      { value: 'a', label: "A) shouldn't" },
      { value: 'b', label: "B) shouldn't have" },
      { value: 'c', label: 'C) ought not to' },
    ],
    correct: 'b',
  },
  {
    id: 45,
    prompt: 'This is going to be my chance to ___ any difficulties.',
    options: [
      { value: 'a', label: 'A) repair' },
      { value: 'b', label: 'B) sort out' },
      { value: 'c', label: 'C) solve' },
    ],
    correct: 'b',
  },
  {
    id: 46,
    prompt: 'It was difficult at first, but I soon ___ it.',
    options: [
      { value: 'a', label: 'A) got used to' },
      { value: 'b', label: 'B) get used to' },
      { value: 'c', label: 'C) changed to' },
    ],
    correct: 'a',
  },
  {
    id: 47,
    prompt: 'How did you manage to cook ___ a good meal?',
    options: [
      { value: 'a', label: 'A) so' },
      { value: 'b', label: 'B) that' },
      { value: 'c', label: 'C) such' },
    ],
    correct: 'c',
  },
  {
    id: 48,
    prompt: "The solution had been found, ___ we hadn't realised it.",
    options: [
      { value: 'a', label: 'A) however' },
      { value: 'b', label: 'B) therefore' },
      { value: 'c', label: 'C) although' },
    ],
    correct: 'c',
  },
  {
    id: 49,
    prompt: 'She ___ what I had been doing for all that time.',
    options: [
      { value: 'a', label: 'A) asked to me' },
      { value: 'b', label: 'B) asked for me' },
      { value: 'c', label: 'C) asked me' },
    ],
    correct: 'c',
  },
  {
    id: 50,
    prompt: 'They ___ heard us coming, we were making a lot of noise.',
    options: [
      { value: 'a', label: 'A) must have' },
      { value: 'b', label: 'B) must' },
      { value: 'c', label: 'C) might' },
    ],
    correct: 'a',
  },
  {
    id: 51,
    prompt: 'He ___ to help me with the decorating.',
    options: [
      { value: 'a', label: 'A) suggested' },
      { value: 'b', label: 'B) offered' },
      { value: 'c', label: 'C) invited' },
    ],
    correct: 'b',
  },
]

const emailHelperText =
  'Adres e-mail jest wymagany przed zaznaczeniem odpowiedzi. Wynik zostanie wysłany na kontakt@joannaadamek.edu.pl.'

const buildEnglishShareMessage =
  (testLabel: string) => (score: number, total: number, percent: number | null, level: string, missing: number, userEmail: string) =>
    `Wynik testu poziomującego - język angielski\nArkusz: ${testLabel}\nRekomendowany poziom: ${level}\nWynik: ${score}/${total}${
      percent !== null ? ` (${percent}%)` : ''
    }\nNieodpowiedziane: ${missing}\nEmail uczestnika: ${userEmail}\nLink do testu: ${window.location.origin}/angielski`

const EnglishTestsPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<'basic' | 'advanced' | null>(null)
  const testUrl = `${window.location.origin}/angielski`

  const basicTest = useTestState({
    questions: questionsBasic,
    resolveLevel: (score) => {
      if (score <= 20) return 'A1.1'
      if (score <= 35) return 'A1.2'
      return 'A2.1'
    },
    languageLabel: 'angielski',
    testLabel: 'A0-A2.1 (podstawowy)',
    testUrl,
    shareConfig: {
      buildMessage: buildEnglishShareMessage('A0-A2.1 (podstawowy)'),
      baseUrl: 'https://wa.me/48512253179?text=',
      fallbackUrl: 'https://wa.me/48512253179',
    },
  })

  const advancedTest = useTestState({
    questions: questionsAdvanced,
    resolveLevel: (score) => {
      if (score === questionsAdvanced.length) return 'C1'
      if (score <= 10) return 'A2.2'
      if (score <= 35) return 'B1'
      return 'B2'
    },
    languageLabel: 'angielski',
    testLabel: 'A2.2-C1 (zaawansowany)',
    testUrl,
    shareConfig: {
      buildMessage: buildEnglishShareMessage('A2.2-C1 (zaawansowany)'),
      baseUrl: 'https://wa.me/48512253179?text=',
      fallbackUrl: 'https://wa.me/48512253179',
    },
  })

  if (!selectedLevel) {
    return (
      <div className="english-tests-page">
        <SectionWrapper id="test-intro" className="test-intro" ariaLabelledby="test-intro-title">
          <Link className="back-link" to="/">
            ← Powrót do strony głównej
          </Link>
          <div className="intro-content">
            <h1 id="test-intro-title">
              Test Poziomujący - Angielski <span className="flag">🇺🇸</span>
            </h1>
            <p className="intro-subtitle">Sprawdź swój poziom znajomości języka angielskiego</p>
          </div>

          <div className="tests-grid">
            <div className="test-card available">
              <span className="test-level">A0-A2.1</span>
              <h3 className="test-title">Test podstawowy</h3>
              <p className="test-description">50 pytań • Poziomy A0 - A2.1</p>
              <div className="scoring-info-small">
                <p className="scoring-title-small">Punktacja:</p>
                <ul className="scoring-list-small">
                  <li>0-20 pkt → A1.1</li>
                  <li>21-35 pkt → A1.2</li>
                  <li>36-50 pkt → A2.1</li>
                </ul>
              </div>
              <button type="button" className="primary-link" onClick={() => setSelectedLevel('basic')}>
                Rozpocznij test
              </button>
            </div>

            <div className="test-card available">
              <span className="test-level">A2.2-C1</span>
              <h3 className="test-title">Test zaawansowany</h3>
              <p className="test-description">51 pytań • Poziomy A2.2 - C1</p>
              <div className="scoring-info-small">
                <p className="scoring-title-small">Punktacja:</p>
                <ul className="scoring-list-small">
                  <li>0-10 pkt → A2.2</li>
                  <li>11-35 pkt → B1</li>
                  <li>36-50 pkt → B2</li>
                  <li>51/51 pkt → C1 🎉</li>
                </ul>
              </div>
              <button type="button" className="primary-link" onClick={() => setSelectedLevel('advanced')}>
                Rozpocznij test
              </button>
            </div>
          </div>
        </SectionWrapper>
      </div>
    )
  }

  if (selectedLevel === 'basic') {
    return (
      <div className="english-tests-page">
        <TestForm
          wrapperId="test-body"
          wrapperClassName="english-test-body"
          headingId="test-body-title"
          backLabel="← Powrót do wyboru poziomu"
          onBack={() => setSelectedLevel(null)}
          header={{
            eyebrow: 'Test poziomujący • Podstawowy',
            title: 'Angielski A0 - A2.1',
            meta: '50 pytań',
            metaBoxTitle: 'Instrukcja',
            metaBoxContent: <p>Zaznacz poprawną odpowiedź dla każdego pytania. Jest tylko jedna poprawna odpowiedź.</p>,
            metaBoxSecondary: 'Punktacja: 0-20 (A1.1) • 21-35 (A1.2) • 36-50 (A2.1) 🎯',
          }}
          email={basicTest.email}
          emailError={basicTest.emailError}
          onEmailChange={basicTest.handleEmailChange}
          canStart={basicTest.canStart}
          onSubmit={basicTest.handleSubmit}
          onReset={basicTest.handleReset}
          questions={questionsBasic}
          answers={basicTest.answers}
          onAnswerChange={basicTest.handleChange}
          submitted={basicTest.submitted}
          score={basicTest.score}
          percent={basicTest.percent}
          level={basicTest.level}
          unanswered={basicTest.unanswered}
          emailStatus={basicTest.emailStatus}
          whatsappShareUrl={basicTest.whatsappShareUrl}
          whatsappIcon={whatsappLogo}
          postResultCtaHref="https://joannaadamek.com.pl/semestralne/"
          helperText={emailHelperText}
          testId="english-basic"
        />
      </div>
    )
  }

  if (selectedLevel === 'advanced') {
    return (
      <div className="english-tests-page">
        <TestForm
          wrapperId="test-body"
          wrapperClassName="english-test-body"
          headingId="test-body-title"
          backLabel="← Powrót do wyboru poziomu"
          onBack={() => setSelectedLevel(null)}
          header={{
            eyebrow: 'Test poziomujący • Zaawansowany',
            title: 'Angielski A2.2 - C1',
            meta: '51 pytań',
            metaBoxTitle: 'Instrukcja',
            metaBoxContent: <p>Zaznacz poprawną odpowiedź dla każdego pytania. Jest tylko jedna poprawna odpowiedź.</p>,
            metaBoxSecondary: 'Punktacja: 0-10 (A2.2) • 11-35 (B1) • 36-50 (B2) • 51/51 (C1) 🎉',
          }}
          email={advancedTest.email}
          emailError={advancedTest.emailError}
          onEmailChange={advancedTest.handleEmailChange}
          canStart={advancedTest.canStart}
          onSubmit={advancedTest.handleSubmit}
          onReset={advancedTest.handleReset}
          questions={questionsAdvanced}
          answers={advancedTest.answers}
          onAnswerChange={advancedTest.handleChange}
          submitted={advancedTest.submitted}
          score={advancedTest.score}
          percent={advancedTest.percent}
          level={advancedTest.level}
          unanswered={advancedTest.unanswered}
          emailStatus={advancedTest.emailStatus}
          whatsappShareUrl={advancedTest.whatsappShareUrl}
          whatsappIcon={whatsappLogo}
          postResultCtaHref="https://joannaadamek.com.pl/semestralne/"
          helperText={emailHelperText}
          testId="english-advanced"
        />
      </div>
    )
  }

  return null
}

export default EnglishTestsPage
