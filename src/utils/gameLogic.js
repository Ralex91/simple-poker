import { CARDS, SUITS } from "./constants"

export const createDeck = () => {
  const deck = SUITS.flatMap((suit) =>
    Object.keys(CARDS).map((value) => ({ suit, value }))
  )

  return shuffle(deck)
}

const shuffle = (deck) => deck.sort(() => Math.random() - 0.5)
