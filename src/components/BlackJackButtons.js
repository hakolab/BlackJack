import React, { useEffect } from "react";
import { Box, Button } from "@material-ui/core";

/**
 * Border7 ボタンコンポーネント
 *
 * 処理概要
 *  - Over ボタン、７ ボタン、Under ボタンを作成する
 *
 * 処理詳細
 *  - Over ボタンの onClick プロパティに props.onClickOver を設定する
 *  - 7 ボタンの onClick プロパティに props.onClick7 を設定する
 *  - Under ボタンの onClick プロパティに props.onClickUnder を設定する
 *
 * ボタンの名称を設定する
 * Over ボタン → "OVER"
 * 7 ボタン → "7"
 * Under ボタン → "UNDER"
 *
 * CHALLENGE TASK!!
 * キーボード操作で、ボタンのクリックイベントを発火できるようにする
 *
 * O キーが押されたら props.onClickOver を発火
 * 7 キーが押されたら props.onClick7 を発火
 * U キーが押されたら props.onClickUnder を発火
 *
 * useEffect hook を使用して、コンポーネントがマウントされたタイミングで イベントリスナーを登録してください
 * なお、このコンポーネントがアンマウントされた場合はイベントを監視する必要がなくなりますので、登録したイベントリスナーは削除してください
 *
 * 参考：
 * React.js フック API リファレンス：　「useEffect」
 * https://ja.reactjs.org/docs/hooks-reference.html#useeffect
 *
 * @param {*} props
 */
export default function BlackJackButtons(props) {
  useEffect(() => {
    function click(event) {
      switch (event.key) {
        case "o":
          props.onClickOver();
          break;
        case "7":
          props.onClick7();
          break;
        case "u":
          props.onClickUnder();
          break;
        default:
          break;
      }
    }
    document.body.addEventListener("keydown", click, {
      passive: false
    });
    return () => {
      document.body.removeEventListener("keydown", click, {
        passive: false
      });
    };
    // マウント時にのみ呼び出したいため、 Missing dependencies の警告を抑制
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" mt={1}>
      <Box mx={1}>
        <Button variant="contained" onClick={props.onClickOver}>
          OVER
        </Button>
      </Box>
      <Box mx={1}>
        <Button variant="contained" onClick={props.onClick7}>
          7
        </Button>
      </Box>
      <Box mx={1}>
        <Button variant="contained" onClick={props.onClickUnder}>
          UNDER
        </Button>
      </Box>
    </Box>
  );
}
