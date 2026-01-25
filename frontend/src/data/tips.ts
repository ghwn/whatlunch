export const lunchTips: string[] = [
  "점심 후 10분 산책은 소화에 좋아요",
  "오늘 날씨가 추우니 따뜻한 국물은 어때요?",
  "새로운 맛집 도전은 화요일이 좋대요",
  "물을 식사 30분 전에 마시면 소화가 잘 돼요",
  "천천히 먹으면 포만감이 더 오래 가요",
  "점심에 단백질을 충분히 섭취하면 오후 졸음이 줄어요",
  "가끔은 혼밥도 나쁘지 않아요",
  "새로운 메뉴에 도전해보는 건 어때요?",
  "오늘의 추천을 믿어보세요!",
  "맛있는 점심은 오후의 에너지예요",
  "가까운 곳에도 숨은 맛집이 있을 수 있어요",
  "리뷰보다 직접 가보는 게 최고예요",
];

export function getRandomTip(): string {
  const index = Math.floor(Math.random() * lunchTips.length);
  return lunchTips[index];
}
