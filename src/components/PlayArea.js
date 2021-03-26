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
      <Grid container direction="row" spacing={2} alignItems="center" justify="center">
        <Grid item>
          <Card card={props.card} />
        </Grid>
      </Grid>
    </Box>
  );
}
