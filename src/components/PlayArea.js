import React from "react";
import { Box, Grid, makeStyles, Chip } from "@material-ui/core";
import { useStyles } from "../hooks/useStyles";
import Card from "./Card";
import * as BJUtilities from "../utilities/BlackJackUtilities";

/**
 * プレイエリアコンポーネント
 *
 * 処理概要
 *  - カードを表示する
 *
 * 処理詳細
 *  - 定数 classes を宣言して、useStyles() hook を使用して初期化する
 *  - Card コンポーネントをセットする
 *    ※ props.card に card オブジェクトを設定する
 *
 * @param {*} props
 */
export default function PlayArea(props) {
  const classes = useStyles();
  return (
    <Box className={classes.playArea}>
      <Grid
        container
        direction="column"
        spacing={5}
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Box
            className="arrow_box_common arrow_box_dealer"
            visibility={props.isTurnEnd ? "visible" : "hidden"}
          >
            {BJUtilities.getTotalForDealer(props.dealersHand)}
          </Box>
          <Grid container direction="row">
            {props.dealersHand.map((card, index) => {
              let marginLeft = index === 0 ? "0px" : "-50px";
              const hide = index === 1 && !props.isTurnEnd ? true : false;
              return (
                <Grid item key={index} style={{ marginLeft: marginLeft }}>
                  <Card card={card} hide={hide} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row">
            {props.playersHand.map((card, index) => {
              let marginLeft = index === 0 ? "0px" : "-50px";
              return (
                <Grid item key={index} style={{ marginLeft: marginLeft }}>
                  <Card card={card} hide={false} />
                </Grid>
              );
            })}
          </Grid>
          <Box visibility={props.isTurnEnd ? "visible" : "hidden"}>
            <Chip
              label={BJUtilities.judge(props.dealersHand, props.playersHand)}
              className={classes.winOrLose}
            />
          </Box>
        </Grid>
      </Grid>
      <Box className="arrow_box_common arrow_box_player">
        {BJUtilities.getTotal(props.playersHand)}
        {BJUtilities.isSoftHand(props.playersHand) &&
          ` | ${BJUtilities.getTotal(props.playersHand) + 10}`}
      </Box>
    </Box>
  );
}
