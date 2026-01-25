import { useState, useEffect } from "react";

const MESSAGES = [
  "주변 맛집 찾는 중...",
  "리뷰 분석 중...",
  "메뉴 확인 중...",
  "최적의 조합 계산 중...",
  "거의 다 됐어요!",
];

export function Loading() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-8 min-h-[400px]">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500">
          <i className="fas fa-utensils text-2xl animate-bounce"></i>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800 transition-all duration-500">
          {MESSAGES[msgIndex]}
        </h3>
        <p className="text-gray-500 text-sm">잠시만 기다려주세요</p>
      </div>
    </div>
  );
}
