import React from "react";
import { Card as MuiCard, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useCardStyles = makeStyles({
  root: {
    width: "140px",
    height: "200px"
  },
  content: {
    width: "100%",
    height: "100%"
  },
  top: {
    height: "30px",
    marginLeft: "10px"
  },
  middle: {
    fontSize: "30px",
    height: "140px",
    lineHeight: "140px"
  },
  bottom: {
    height: "30px",
    marginRight: "10px"
  }
});

/**
 * Card コンポーネント
 *
 * 処理概要
 *  - props で card オブジェクトを受け取り、カードを作成する
 *
 * 処理詳細
 *  - 定数 classes を宣言して、useCardStyles() hook を使用して初期化する
 *  - 定数 topAndBottom を宣言して props.card.suit と props.card.rank を連結した値で初期化する
 *    例：　suit = "♠"、 rank = "A" → "♠A"
 *  - 定数 middle を宣言して props.card.suit の値で初期化する
 *    例：　suit = "♠" → "♠"
 *
 *  なお、card オブジェクトが null の場合は topAndBottom, middle の両変数の値は "?" で初期化する
 *
 * @param {*} props
 */
export default function Card(props) {
  const classes = useCardStyles();
  const topAndBottom = props.card === null ? "?" : props.card.suit + props.card.rank;
  const middle = props.card === null ? "?" : props.card.suit;
  return (
    <MuiCard className={classes.root}>
      <Box className={classes.content} display="flex" flexDirection="column">
        <Box className={classes.top} alignSelf="flex-start">
          {topAndBottom}
        </Box>
        <Box className={classes.middle}>{middle}</Box>
        <Box className={classes.bottom} alignSelf="flex-end">
          {topAndBottom}
        </Box>
      </Box>
    </MuiCard>
  );
}
