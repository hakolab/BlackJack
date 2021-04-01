import React, { useEffect, useState, useCallback, useReducer } from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./hooks/useStyles";
import PlayArea from "./components/PlayArea";
import BlackJackButtons from "./components/BlackJackButtons";
import Message from "./components/Message";
import GameProgressButton from "./components/GameProgressButton";
import * as BlackJackUtilities from "./utilities/BlackJackUtilities";

const initialDeck = BlackJackUtilities.getDeck();

const initialState = {
  deck: initialDeck,
  dealersHand: [],
  playersHand: [],
  isDeclaredStand: false
};

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
      return state;
    }
    case "hit": {
      const [newDeck, newHand] = deal(state.deck, state.playersHand, 1);
      return { ...state, deck: newDeck, playersHand: newHand };
    }
    case "stand": {
      return { ...state, isDeclaredStand: true };
    }
    case "open": {
      const [newDeck, newHand] = dealForDealer(state.deck, state.dealersHand);
      return { ...state, deck: newDeck, dealersHand: newHand };
    }
    default:
  }
}

/**
 * Border7 コンポーネント
 *
 * 処理概要
 *  Border7 ゲームの画面を作成する
 *  カードを並べる PlayArea コンポーネントと、その下にゲーム進行のためのメッセージ出力とボタンを配置する
 *
 * 処理詳細
 *  - style 設定のため、定数 classes を宣言して、useStyles() hook を使用して初期化する
 *
 *  - useState() で以下の state を定義する
 *     - deck 初期値: getDeck() で作成した配列 deck
 *     - card 初期値： getCard() で取得した card オブジェクト
 *     - isWin 初期値： null
 *     - answered 初期値： false
 *     - isGameFinished 初期値： false
 *     - winCount 初期値：0
 *     - loseCount 初期値：0
 *
 * 関数定義
 *  getCard()
 *  checkOver()
 *  check7()
 *  checkUnder()
 *  next()
 *  getButtons()
 *  getMessage()
 *
 */
export default function Border7() {
  const classes = useStyles();
  const [deck, setDeck] = useState(initialDeck);

  const [isWin, setIsWin] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  function doHit() {
    dispatch({ type: "hit" });
  }

  function doStand() {
    dispatch({ type: "stand" });
    dispatch({ type: "open" });
  }

  /* 
  // for debug
  useEffect(() => {
    console.log(deck);
  }, [deck]);
 */

  /**
   * ゲーム進行関数
   *
   * 処理概要
   *  - next ボタン, finish ボタンが押されたときの処理を行う
   *
   * 処理詳細
   *  - state deck の長さが 0 の場合
   *     - satate isGameFinished を true に更新する
   *  - それ以外の場合
   *     - state card の値を null に更新する
   *     - state answered の値を false に更新する
   *
   */
  function next() {
    dispatch({ type: "init" });
  }

  function getButtons(playersHand) {
    if (BlackJackUtilities.getTotal(playersHand) > 21) {
      return <GameProgressButton onClickNext={next} />;
    } else {
      return <BlackJackButtons onClickHit={doHit} onClickStand={doStand} />;
    }
  }

  /**
   * メッセージ取得関数
   *
   * 処理概要
   *  - 現在のゲーム進行に従って、画面に表示するメッセージコンポーネントを返却する
   *
   * 処理詳細
   *  - state isGameFinished が true の場合
   *     - 'Thank you for playing!', `Win: ${winCount} Lose: ${loseCount}` を配列に追加する
   *  - state answered が true かつ isWin が true の場合
   *     - 'Win!' を配列に追加する
   *  - state answered が true かつ isWin が false の場合
   *     - 'Lose!' を配列に追加する
   *  - それ以外の場合
   *     - 'Over or Under?' を配列に追加する
   *
   * @return {component} <Message />
   */
  function getMessage(playersHand) {
    let message = [];
    if (BlackJackUtilities.getTotal(playersHand) > 21) {
      message.push("BUSTED!!");
    } else {
      message.push("Hit or Stand?");
    }

    return <Message>{message}</Message>;
  }

  /**
   * Border7 コンポーネント返却
   *
   * 返却内容
   *  - PlayArea コンポーネント
   *    ※ props には以下の値を設定する
   *     - card: state card
   *
   *  - getMessage() から返却される Message コンポーネント
   *
   *  - state isGameFinished が false の場合
   *     - getButtons() から返却されるボタンコンポーネント
   *
   */
  return (
    <Box>
      <PlayArea
        dealersHand={state.dealersHand}
        playersHand={state.playersHand}
        isDeclaredStand={state.isDeclaredStand}
      />
      <Box className={classes.messageArea}>
        {getMessage(state.playersHand)}
        {getButtons(state.playersHand)}
      </Box>
    </Box>
  );
}
