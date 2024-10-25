import { useReducer } from "react"
import { createDeck } from "../utils/gameLogic"
import Card from "./Card"

const INIT_STATE = {
  deck: [],
  playerHand: [],
  botHand: [],
  communityCards: [],
  winner: "",
}

const gameStateReducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        ...{
          deck: action.payload,
          playerHand: action.payload.slice(0, 2),
          botHand: action.payload.slice(2, 4),
          communityCards: action.payload.slice(4, 9),
        },
      }
    case "SET_WINNER":
      return { ...state, winner: action.payload }
    case "RESET":
      return INIT_STATE
    default:
      return state
  }
}

const PokerTable = () => {
  const [gameState, dispatch] = useReducer(gameStateReducer, INIT_STATE)

  const startGame = () => {
    dispatch({
      type: "START_GAME",
      payload: createDeck(),
    })
  }

  return (
    <div className="flex flex-col gap-8 outline outline-amber-500/65 rounded-full p-10">
      <div className="flex gap-4 justify-center">
        {gameState.botHand.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        {gameState.communityCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        {gameState.playerHand.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      <button
        onClick={() => {
          startGame()
        }}
      >
        Start
      </button>
      <button></button>
      <div className="absolute top-0 right-0">
        <p>Debug</p>
        <pre>{JSON.stringify(gameState, null, 2)}</pre>
      </div>
    </div>
  )
}

export default PokerTable
