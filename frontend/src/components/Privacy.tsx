interface PrivacyProps {
  onBack: () => void;
}

export function Privacy({ onBack }: PrivacyProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          개인정보처리방침
        </h2>

        <div className="space-y-6 text-sm text-gray-600">
          {/* 수집하는 정보 */}
          <section>
            <h3 className="font-bold text-gray-900 mb-2">수집하는 정보</h3>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <p className="font-medium text-gray-700 mb-1">위치 정보 (선택)</p>
              <p className="text-xs text-gray-500">
                주변 음식점 검색에만 사용되며, 서버에 저장하지 않습니다.
              </p>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              회원가입, 이메일, 전화번호 등 개인 식별 정보는 수집하지 않습니다.
            </p>
          </section>

          {/* 정보 사용 */}
          <section>
            <h3 className="font-bold text-gray-900 mb-2">정보 사용</h3>
            <ul className="text-gray-500 space-y-1 text-sm">
              <li>• 위치 정보 → 카카오 API로 주변 음식점 검색</li>
              <li>• 설정값 (거리, 개수) → 브라우저에만 저장</li>
            </ul>
          </section>

          {/* 보관 및 파기 */}
          <section>
            <h3 className="font-bold text-gray-900 mb-2">보관 및 파기</h3>
            <p className="text-gray-500">
              위치 정보는 일회성으로 사용 후 즉시 폐기됩니다. 페이지를 벗어나면
              모든 정보가 사라집니다.
            </p>
          </section>

          {/* 제3자 제공 */}
          <section>
            <h3 className="font-bold text-gray-900 mb-2">제3자 제공</h3>
            <p className="text-gray-500">
              위치 정보는 카카오 로컬 API를 통한 음식점 검색에만 사용됩니다. 그
              외 제3자에게 정보를 제공하지 않습니다.
            </p>
          </section>

          {/* 문의 */}
          <section className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mt-1">시행일: 2026년 1월 25일</p>
          </section>
        </div>

        <button
          onClick={onBack}
          className="mt-8 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
