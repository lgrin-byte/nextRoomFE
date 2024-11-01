import { useEffect, MutableRefObject } from "react";

function useClickOutside<T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  onClickOutside: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭한 요소가 ref.current의 자식이 아닌 경우
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside(); // 외부 클릭 처리
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]); // ref와 onClickOutside에 의존성 추가
}

export default useClickOutside;
