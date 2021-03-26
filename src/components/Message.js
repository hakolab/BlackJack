import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "../hooks/useStyles";

/**
 * メッセージコンポーネント
 *
 * 処理概要
 *  - 画面に表示するメッセージを作成する
 *
 * 処理詳細
 *  - 定数 classes を宣言して、useStyles() hook を使用して初期化する
 *  - props.children から、配列 message を受け取り、配列の各要素を Material-UI の Box コンポーネントに設定する
 *
 * ※ 配列 message の長さが 2 以上のとき、メッセージを改行して表示する
 *   Material-UI の Typography を使用して複数行の文字列を出力する場合は以下のようにする
 *   <Typography>
 *      <Box>someText</Box>
 *      <Box>someText</Box>
 *   </Typography>
 *
 * ※ 配列のそれぞれの要素に対して処理を行いたい場合は、関数 map を使用する
 *   例： 配列の各要素の値をコンソールに出力する
 *      let someArray = ['It', 'is', 'someArray']
 *      someArray.map((item, index) => {
 *        console.log(item)
 *        console.log(index)
 *      })
 *
 *      出力結果
 *      'It'
 *      0
 *      'is'
 *      1
 *      'someArray'
 *      2
 *
 */
export default function Message(props) {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h3" className={classes.message}>
        {props.children.map((line, index) => (
          <Box key={index}>{line}</Box>
        ))}
      </Typography>
    </Box>
  );
}
