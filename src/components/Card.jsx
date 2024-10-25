import clsx from "clsx"
import React from "react"
import { CARDS, SUITS_STYLE } from "../utils/constants"

const Card = ({ suit = "clovers", value, flip, className, ...otherProps }) => {
  const { component: Symbole, color, textColor } = SUITS_STYLE[suit]

  return (
    <div className={clsx("flip-card select-none", className)} {...otherProps}>
      <div
        className="relative flip-card-inner rounded-xl"
        style={{ transform: flip ? "rotateY(180deg)" : "" }}
      >
        <div className="bg-yellow-100 fli aspect-[2.1/3] rounded-xl w-32 flex justify-center items-center flip-card-back">
          <div className="flex items-center flex-col absolute top-1 left-2">
            <p className={clsx("text-5xl font-bold", textColor)}>
              {CARDS[value]}
            </p>
            <Symbole className={clsx("h-10 mt-2", color)} />
          </div>

          <div className="absolute bottom-2 right-2">
            <Symbole className={clsx("h-20 ml-6", color)} />
          </div>
        </div>
        <div className="w-full h-full bg-yellow-100 absolute rounded-xl top-0 left-0 back -z-10 flip-card-front overflow-hidden p-2">
          <div className="h-full w-full rounded-lg card-pattern"></div>
        </div>
      </div>
    </div>
  )
}

export default Card
