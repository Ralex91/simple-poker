import clsx from "clsx"
import React from "react"
import Clover from "./Symboles/Clover"
import Diamond from "./Symboles/Diamond"
import Heart from "./Symboles/Heart"
import Spade from "./Symboles/Spade"

const SYMBOLES = {
  CLOVER: {
    name: "Clover",
    component: Clover,
    color: "fill-black",
    textColor: "text-black",
  },
  HEART: {
    name: "Heart",
    component: Heart,
    color: "fill-red-500",
    textColor: "text-red-500",
  },
  SPADE: {
    name: "Spade",
    component: Spade,
    color: "fill-black",
    textColor: "text-black",
  },
  DIAMOND: {
    name: "Diamond",
    component: Diamond,
    color: "fill-red-500",
    textColor: "text-red-500",
  },
}

const Card = ({ symbole = "CLOVER", value }) => {
  const { component: Symbole, color, textColor } = SYMBOLES[symbole]

  return (
    <div className="bg-yellow-100 aspect-[2.1/3] w-44 rounded relative flex justify-center items-center">
      <div className="text-center absolute top-1 left-2">
        <p className={clsx("text-xl font-bold", textColor)}>{value}</p>
        <Symbole className={clsx("h-7", color)} />
      </div>
      <Symbole className={clsx("h-20", color)} />
      <div className="text-center absolute bottom-1 right-2 rotate-180">
        <p className={clsx("text-xl font-bold", textColor)}>{value}</p>
        <Symbole className={clsx("h-7", color)} />
      </div>
    </div>
  )
}

export default Card
