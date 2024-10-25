import clsx from "clsx"
import React from "react"
import { CARDS } from "../utils/constants"
import Clover from "./Symboles/Clover"
import Diamond from "./Symboles/Diamond"
import Heart from "./Symboles/Heart"
import Spade from "./Symboles/Spade"

const SYMBOLES = {
  clovers: {
    name: "Clover",
    component: Clover,
    color: "fill-black",
    textColor: "text-black",
  },
  hearts: {
    name: "Heart",
    component: Heart,
    color: "fill-red-500",
    textColor: "text-red-500",
  },
  spades: {
    name: "Spade",
    component: Spade,
    color: "fill-black",
    textColor: "text-black",
  },
  diamonds: {
    name: "Diamond",
    component: Diamond,
    color: "fill-red-500",
    textColor: "text-red-500",
  },
}

const Card = ({ suit = "clovers", value }) => {
  const { component: Symbole, color, textColor } = SYMBOLES[suit]

  return (
    <div className="bg-yellow-100 aspect-[2.1/3] w-32 rounded-xl relative flex justify-center items-center">
      <div className="flex items-center flex-col absolute top-1 left-2">
        <p className={clsx("text-5xl font-bold", textColor)}>{CARDS[value]}</p>
        <Symbole className={clsx("h-10 mt-2", color)} />
      </div>

      <div className="absolute bottom-2 right-2">
        <Symbole className={clsx("h-20 ml-6", color)} />
      </div>
    </div>
  )
}

export default Card
