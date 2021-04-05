export function getDeck(numberOfDeck = 1) {
  const suits = ["♠", "♣", "❤", "♦"];
  // prettier-ignore
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck = [];

  for (let i = 0; i < numberOfDeck; i++) {
    suits.forEach((suit) =>
      ranks.forEach((rank) => deck.push({ suit: suit, rank: rank }))
    );
  }
  return deck;
}

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
  if (isSoftHand(hand)) {
    total += 10;
  }
  if (total < 17) {
    return true;
  }
  return false;
}

export function isAce(card) {
  return card.rank === "A";
}

export function isFaceCardOrTen(card) {
  if (getRankNum(card.rank) === 10) {
    return true;
  }
  return false;
}

export function isSoftHand(hand) {
  if (isBlackJack(hand)) {
    return false;
  }
  if (!hasAce(hand)) {
    return false;
  }
  if (getTotal(hand) + 10 < 21) {
    return true;
  }
  return false;
}

export function isBlackJack(hand) {
  const firstCard = hand[0];
  const secondCard = hand[1];
  if (
    (isAce(firstCard) && isFaceCardOrTen(secondCard)) ||
    (isFaceCardOrTen(firstCard) && isAce(secondCard))
  ) {
    return true;
  }
  return false;
}

export function getScore(hand) {
  if (isBlackJack(hand)) {
    return [21];
  }
  if (isSoftHand(hand)) {
    return [getTotal(hand), getTotal(hand) + 10];
  }
  return [getTotal(hand)];
}

export function getScoreForDisplay(hand) {
  let score = getScore(hand);
  if (isSoftHand(hand)) {
    return `${score[0]} | ${score[1]}`;
  }
  return score[0];
}

export function getLastScore(hand) {
  let score = getScore(hand);
  if (isSoftHand(hand)) {
    return score[1];
  }
  return score[0];
}

export function judge(dealersHand, playersHand) {
  const dealersScore = getLastScore(dealersHand);
  const playersScore = getLastScore(playersHand);

  // プレイヤーがバースト時は無条件で負け
  if (getTotal(playersHand) > 21) {
    return "LOSE!!";
  }
  // 引き分け
  if (dealersScore === playersScore) {
    return "PUSH";
  }
  // プレイヤーがブラックジャック
  if (isBlackJack(playersHand)) {
    return "BLACK JACK!!";
  }
  // ディーラーがブラックジャック
  if (isBlackJack(dealersHand)) {
    return "LOSE!!";
  }
  // ディーラーがバースト
  if (dealersScore > 21) {
    return "WIN!!";
  }
  if (dealersScore < playersScore) {
    return "WIN!!";
  }
  if (dealersScore > playersScore) {
    return "LOSE!!";
  }

  return "WIN!!";
}
