import { useReducer } from "react"
import { INIT_STATE } from "../utils/constants.js"
import { createDeck, determineWinner } from "../utils/game.js"
import Card from "./Card"
import Clover from "./Symboles/Clover"

const gameStateReducer = (state, action) => {
  switch (action.type) {
    case "PREAPARE_GAME":
      return {
        ...state,
        status: "prepare",
      }
    case "START_GAME":
      return {
        ...state,
        status: "play",
        deck: action.payload,
        playerHand: action.payload.slice(0, 4),
        botHand: action.payload.slice(4, 8),
        winner: null,
      }
    case "SET_WINNER":
      return { ...state, status: "end", winner: action.payload }
    default:
      return state
  }
}

const PokerTable = () => {
  const [gameState, dispatch] = useReducer(gameStateReducer, INIT_STATE)

  const handleStartGame = () => {
    dispatch({
      type: "PREAPARE_GAME",
    })

    setTimeout(() => {
      dispatch({
        type: "START_GAME",
        payload: createDeck(),
      })
    }, 900)
  }

  const handleResult = () => {
    const winner = determineWinner(gameState.playerHand, gameState.botHand)
    dispatch({
      type: "SET_WINNER",
      payload: winner,
    })
  }

  return (
    <div className="flex-1">
      <div className="flex flex-col justify-between items-center gap-8 h-full">
        <div className="z-20">
          <div className="flex gap-4 justify-center">
            {gameState.botHand.map((card, index) => (
              <Card
                flip={
                  gameState.status !== "prepare" &&
                  gameState.status !== "play" &&
                  gameState.deck.length
                }
                key={index}
                {...card}
              />
            ))}
          </div>
          <p className="text-center text-xl font-extrabold text-yellow-100 mt-5">
            Bot hand
          </p>
        </div>

        <div className="relative flex flex-col justify-center items-center">
          <div className="absolute h-96 rounded-full aspect-square bg-green-800/50 flex justify-center items-center">
            <Clover className="fill-green-800/70 h-52" />
          </div>

          {gameState.winner && gameState.status === "end" && (
            <div className="text-center font-extrabold text-yellow-100 z-10">
              <p className="text-8xl">{gameState.winner.label}</p>
              <p className="text-3xl">{gameState.winner.reason}</p>
            </div>
          )}

          {gameState.status === "end" && (
            <button
              className="bg-red-950 text-yellow-100 rounded-xl py-2 px-4 font-bold text-lg z-10 mt-3"
              onClick={handleStartGame}
            >
              Start
            </button>
          )}

          {gameState.status === "play" && (
            <button
              className="bg-red-950 text-yellow-100 rounded-xl py-2 px-4 font-bold text-lg z-10 mt-3"
              onClick={handleResult}
            >
              Show Result
            </button>
          )}
        </div>

        <div className="z-20">
          <p className="text-center text-xl font-extrabold text-yellow-100 mb-5">
            Your hand
          </p>
          <div className="flex gap-4 justify-center">
            {gameState.playerHand.map((card, index) => (
              <Card
                flip={gameState.status !== "prepare" && gameState.deck.length}
                key={index}
                {...card}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokerTable
