import clsx from "clsx"
import { useReducer } from "react"
import { arrayPick } from "../utils/array.js"
import { INIT_STATE, MAX_RETAKE, MAX_SELECT_CARD } from "../utils/constants.js"
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
      const newDeck = createDeck()
      const { rest: restOfDeck, sub: playerHand } = arrayPick(newDeck, 4)
      const { rest: deck, sub: botHand } = arrayPick(restOfDeck, 4)

      return {
        ...state,
        status: "play",
        deck,
        playerHand,
        safeCard: [],
        changeCard: 0,
        botHand,
        winner: null,
      }
    case "ADD_SAFE_CARD":
      return {
        ...state,
        safeCard: [...state.safeCard, action.payload],
      }
    case "REMOVE_SAFE_CARD":
      return {
        ...state,
        safeCard: state.safeCard.filter(
          (c) =>
            c.suit !== action.payload.suit || c.value !== action.payload.value
        ),
      }
    case "RETAKE_CARDS":
      return {
        ...state,
        deck: action.payload.deck,
        playerHand: action.payload.playerHand,
        changeCard: action.payload.changeCard,
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
      })
    }, 900)
  }

  const handleSafeCard = (card) => () => {
    if (gameState.status !== "play") return
    if (gameState.changeCard >= MAX_RETAKE) return

    const alreadySafeCard = gameState.safeCard.find(
      (c) => c.suit === card.suit && c.value === card.value
    )

    if (alreadySafeCard) {
      dispatch({
        type: "REMOVE_SAFE_CARD",
        payload: alreadySafeCard,
      })

      return
    }

    if (gameState.safeCard.length >= MAX_SELECT_CARD) return

    dispatch({
      type: "ADD_SAFE_CARD",
      payload: card,
    })
  }

  const handleRetakeCards = () => {
    if (gameState.status !== "play") return
    if (gameState.changeCard >= MAX_RETAKE) return

    const length = gameState.playerHand.length - gameState.safeCard.length
    const { rest: newDeck, sub: newCards } = arrayPick(gameState.deck, length)

    dispatch({
      type: "RETAKE_CARDS",
      payload: {
        deck: newDeck,
        playerHand: [...gameState.safeCard, ...newCards],
        changeCard: gameState.changeCard + 1,
      },
    })
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
                flip={gameState.status === "end" && gameState.deck.length}
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
          <p className="text-center text-xl font-extrabold text-yellow-100 mb-5 relative">
            Your hand{" "}
            {gameState.status === "play" &&
              gameState.changeCard < MAX_RETAKE && (
                <button
                  className="bg-red-950 absolute right-0 top-0 text-yellow-100 rounded-xl py-2 px-4 font-bold text-sm"
                  onClick={handleRetakeCards}
                >
                  Retake Cards ({`${gameState.changeCard}/${MAX_RETAKE}`})
                </button>
              )}
          </p>

          <div className="flex gap-4 justify-center">
            {gameState.playerHand.map((card, index) => (
              <Card
                className={clsx({
                  "opacity-50":
                    gameState.status === "play" &&
                    gameState.changeCard < MAX_RETAKE &&
                    gameState.safeCard.find(
                      (c) => c.suit === card.suit && c.value === card.value
                    ),
                  "cursor-pointer":
                    gameState.changeCard < MAX_RETAKE &&
                    gameState.status === "play",
                })}
                onClick={handleSafeCard(card)}
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
