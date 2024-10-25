import Clover from "../components/Symboles/Clover"
import Diamond from "../components/Symboles/Diamond"
import Heart from "../components/Symboles/Heart"
import Spade from "../components/Symboles/Spade"

export const INIT_STATE = {
  status: "end",
  deck: [],
  playerHand: Array.from({ length: 4 }),
  safeCard: [],
  changeCard: 0,
  botHand: Array.from({ length: 4 }),
  winner: null,
}

export const SUITS = ["hearts", "diamonds", "clovers", "spades"]

export const CARDS = {
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
}

export const PAIR_NAME = {
  1: "One Pair",
  2: "Two Pairs",
  3: "Three of a Kind",
  4: "Four of a Kind",
}

export const SUITS_STYLE = {
  clovers: {
    component: Clover,
    color: "fill-black",
    textColor: "text-black",
  },
  hearts: {
    component: Heart,
    color: "fill-red-500",
    textColor: "text-red-500",
  },
  spades: {
    component: Spade,
    color: "fill-black",
    textColor: "text-black",
  },
  diamonds: {
    component: Diamond,
    color: "fill-red-500",
    textColor: "text-red-500",
  },
}

export const MAX_SELECT_CARD = 3
export const MAX_RETAKE = 3
