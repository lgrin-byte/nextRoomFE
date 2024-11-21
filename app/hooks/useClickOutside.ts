import { useEffect, RefObject } from "react";

/**
 * 클릭 시 이벤트를 닫아주는 공통 hook
 * @param {RefObject<HTMLElement | HTMLElement[]>} ref - Element ref
 * @param {Function} handler - 이벤트 핸들러
 * @param {boolean} isActive - 활성화 유무
 * @param {number} targetIndex - 닫아야 할 창이 여러 개일 때 닫을 창의 index
 * @param {boolean} ignoreSiblings - 형제 요소 클릭 시에도 닫힐지 여부
 */
function useClickOutside(
  ref: RefObject<HTMLElement | HTMLElement[]>,
  handler: (event: MouseEvent) => void,
  isActive = true,
  targetIndex = 0,
  ignoreSiblings = false
) {
  useEffect(() => {
    if (!isActive) return;

    const listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // ref가 비어 있거나, ref 내부를 클릭한 경우 무시
      const elements = Array.isArray(ref.current) ? ref.current : [ref.current];
      const isClickInside = elements.some((element) =>
        element?.contains(target)
      );
      if (isClickInside) return;

      // ignoreSiblings 옵션이 true인 경우 형제 요소 클릭 시 닫음
      if (ignoreSiblings) {
        const parentNode = elements[targetIndex]?.parentNode;
        if (
          parentNode &&
          Array.from(parentNode.children).some((sibling) =>
            sibling.contains(target)
          )
        ) {
          return;
        }
      }

      // 핸들러 실행 (버튼이든 어떤 요소든 외부 클릭이면)
      handler(event);
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [ref, handler, isActive, targetIndex, ignoreSiblings]);
}

export default useClickOutside;
