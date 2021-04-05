import React, { useEffect, useReducer } from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./hooks/useStyles";
import PlayArea from "./components/PlayArea";
import BlackJackButtons from "./components/BlackJackButtons";
import GameProgressButton from "./components/GameProgressButton";
import * as BlackJackUtilities from "./utilities/BlackJackUtilities";
import { toast, Toaster } from "react-hot-toast";

const initialDeck = BlackJackUtilities.getDeck(3);
const penetration = 0.8;

const initialState = {
  deck: initialDeck,
  minimumNumber: getMinimumNumber(initialDeck, penetration),
  dealersHand: [],
  playersHand: [],
  isTurnEnd: false
};

function getMinimumNumber(initialDeck, penetration) {
  return initialDeck.length - Math.floor(initialDeck.length * penetration);
}

function dealForDealer(deck, hand) {
  const newDeck = deck.slice();
  const newHand = hand.slice();
  while (BlackJackUtilities.checkDealersScore(newHand)) {
    const index = Math.floor(Math.random() * newDeck.length);
    newHand.push(newDeck[index]);
    newDeck.splice(index, 1);
  }
  return [newDeck, newHand];
}

function deal(deck, hand, time) {
  const newDeck = deck.slice();
  const newHand = hand.slice();
  for (let i = 0; i < time; i++) {
    const index = Math.floor(Math.random() * newDeck.length);
    newHand.push(newDeck[index]);
    newDeck.splice(index, 1);
  }
  return [newDeck, newHand];
}

function initDealersHand(state) {
  const [newDeck, newHand] = deal(state.deck, [], 2);
  return { ...state, deck: newDeck, dealersHand: newHand };
}

function initPlayersHand(state) {
  const [newDeck, newHand] = deal(state.deck, [], 2);
  return { ...state, deck: newDeck, playersHand: newHand };
}

function reducer(state, action) {
  switch (action.type) {
    case "init": {
      state = initDealersHand(state);
      state = initPlayersHand(state);
      return { ...state, isTurnEnd: false };
    }
    case "hit": {
      const [newDeck, newHand] = deal(state.deck, state.playersHand, 1);
      return { ...state, deck: newDeck, playersHand: newHand };
    }
    case "stand": {
      const [newDeck, newHand] = dealForDealer(state.deck, state.dealersHand);
      return { ...state, deck: newDeck, dealersHand: newHand, isTurnEnd: true };
    }
    case "check": {
      // ディーラーまたはプレイヤーがブラックジャック
      if (
        BlackJackUtilities.isBlackJack(state.dealersHand) ||
        BlackJackUtilities.isBlackJack(state.playersHand)
      ) {
        return { ...state, isTurnEnd: true };
      }
      // プレイヤーのスコアが 21 になったらディーラーがカードを引いてターンは終わり
      if (BlackJackUtilities.getTotal(state.playersHand) === 21) {
        const [newDeck, newHand] = dealForDealer(state.deck, state.dealersHand);
        return {
          ...state,
          deck: newDeck,
          dealersHand: newHand,
          isTurnEnd: true
        };
      }
      // プレイヤーがバーストしたらターンは終わり
      if (BlackJackUtilities.getTotal(state.playersHand) > 21) {
        return { ...state, isTurnEnd: true };
      }
      return { ...state };
    }
    case "shuffle": {
      const newDeck = BlackJackUtilities.getDeck(3);
      return { ...state, deck: newDeck };
    }
    default:
  }
}

export default function Border7() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "init" });
    dispatch({ type: "check" });
  }, []);

  useEffect(() => {
    if (state.deck.length <= state.minimumNumber) {
      dispatch({ type: "shuffle" });
      toast("Shuffled!!", {
        style: {
          borderRadius: "10px",
          background: "#737373",
          color: "#ffffff"
        }
      });
    }
  }, [state.deck, state.minimumNumber]);

  function doHit() {
    dispatch({ type: "hit" });
    dispatch({ type: "check" });
  }

  function doStand() {
    dispatch({ type: "stand" });
  }

  function next() {
    dispatch({ type: "init" });
    dispatch({ type: "check" });
  }

  function getButtons(playersHand) {
    if (BlackJackUtilities.getTotal(playersHand) > 21 || state.isTurnEnd) {
      return <GameProgressButton onClickNext={next} />;
    } else {
      return <BlackJackButtons onClickHit={doHit} onClickStand={doStand} />;
    }
  }

  return (
    <Box>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <PlayArea
        dealersHand={state.dealersHand}
        playersHand={state.playersHand}
        isTurnEnd={state.isTurnEnd}
      />
      <Box className={classes.messageArea}>{getButtons(state.playersHand)}</Box>
    </Box>
  );
}
