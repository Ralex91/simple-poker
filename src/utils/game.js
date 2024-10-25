import { CARDS, PAIR_NAME, SUITS } from "./constants"

export const createDeck = () => {
  const deck = SUITS.flatMap((suit) =>
    Object.keys(CARDS).map((value) => ({ suit, value: parseInt(value) }))
  )

  return shuffle(deck)
}

const shuffle = (deck) => deck.sort(() => Math.random() - 0.5)

const evaluateHand = (hand) => {
  const counts = {}
  let highestCard = 0

  for (const card of hand) {
    const value = card.value
    highestCard = Math.max(highestCard, value)
    counts[value] = (counts[value] || 0) + 1
  }

  let pairs = 0
  let triples = 0
  let fourOfKind = 0

  for (const count of Object.values(counts)) {
    if (count === 2) pairs++
    else if (count === 3) triples++
    else if (count === 4) fourOfKind++
  }

  // Four of a Kind
  if (fourOfKind) return { rank: 4, highestCard }
  // Three of a Kind
  if (triples) return { rank: 3, highestCard }
  // Two Pairs
  if (pairs === 2) return { rank: 2, highestCard }
  // One Pair
  if (pairs === 1) return { rank: 1, highestCard }

  // No pairs
  return { rank: 0, highestCard }
}

export const determineWinner = (playerHand, botHand) => {
  const playerEval = evaluateHand(playerHand)
  const botEval = evaluateHand(botHand)

  if (playerEval.rank > botEval.rank) {
    return {
      label: "Player wins!",
      reason: PAIR_NAME[playerEval.rank],
    }
  } else if (botEval.rank > playerEval.rank) {
    return {
      label: "Bot wins!",
      reason: PAIR_NAME[botEval.rank],
    }
  } else if (playerEval.highestCard > botEval.highestCard) {
    return {
      label: "Player wins!",
      reason: "High Card",
    }
  } else if (botEval.highestCard > playerEval.highestCard) {
    return {
      label: "Bot wins!",
      reason: "High Card",
    }
  } else {
    return {
      label: "It's a draw!",
    }
  }
}
