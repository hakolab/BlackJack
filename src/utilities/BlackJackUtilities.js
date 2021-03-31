/**
 * デッキ作成関数
 *
 * 変数宣言
 *  - suits: トランプのスーツ（マーク）のデータを持った配列
 *  - ranks: トランプのランク（数字）のデータを持った配列
 *  - deck: デッキとして返却するための空の配列
 *
 * 処理詳細
 *  - suits、ranks を使用して、 deck にトランプデータを格納する
 *  - データの形式は、suit と rank をキーに持つ Javascript オブジェクト（以下、card オブジェクト）
 *  例: { suit: "♠", rank: "A" }
 *
 *  @return {object[{suit: string, rank: string}]} deck
 *
 */
export function getDeck() {
  const suits = ["♠", "♣", "❤", "♦"];
  // prettier-ignore
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck = [];

  suits.forEach((suit) =>
    ranks.forEach((rank) => deck.push({ suit: suit, rank: rank }))
  );
  return deck;
}

/**
 * ランクの数値取得関数
 *
 * 処理詳細
 *  - 引数として 文字列 rank を取り、対応する数値を返却する
 *  例： "A" → 1 を返却、"J" → 11 を返却、"5" → 5 を返却
 * 　　（"A", "J", "Q", "K" 以外のときは数値に変換して返却する
 *
 * ※数値変換の際には、Number(string)を用いる
 *
 * @param {string} rank
 * @return {number} Number(rank)
 */
export function getRankNum(rank) {
  switch (rank) {
    case "A":
      return 1;
    case "J":
    case "Q":
    case "K":
      return 10;
    default:
      return Number(rank);
  }
}

export function getTotal(hand) {
  let total = 0;
  for (const card of hand) {
    total += getRankNum(card.rank);
  }
  return total;
}

export function hasAce(hand) {
  for (const card of hand) {
    if (card.rank === "A") return true;
  }
  return false;
}

export function checkDealersScore(hand) {
  let total = getTotal(hand);
  // ソフトハンドのとき、Aceを 11 と数える
  if (hasAce(hand)) {
    total += 10;
  }
  if (total < 17) {
    return true;
  }
  return false;
}
