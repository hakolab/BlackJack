import React from "react";
import { Box, Grid } from "@material-ui/core";
import { useStyles } from "../hooks/useStyles";
import Card from "./Card";

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
          <Grid container direction="row">
            {props.dealersHand.map((card, index) => {
              let marginLeft = index === 0 ? "0px" : "-50px";
              const hide = index === 1 && !props.isDeclaredStand ? true : false;
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
        </Grid>
      </Grid>
    </Box>
  );
}
