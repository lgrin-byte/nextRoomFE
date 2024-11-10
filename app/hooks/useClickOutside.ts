import { useEffect, RefObject } from "react";

/**
 * 이벤트 이외 영역 클릭 시 이벤트 닫아주는 공통 hook
 * @param {RefObject<HTMLElement | HTMLElement[]>} ref - Element ref
 * @param {Function} handler - 이벤트 핸들러
 * @param {boolean} isActive - 활성화 유무
 * @param {number} targetIndex - 닫아야 할 창이 여러 개일 때 닫을 창의 index
 * @param {boolean} ignoreSiblings - 형제 요소 클릭 시에도 닫힐지 여부
 */
function useClickOutside(
  ref: RefObject<HTMLElement | HTMLElement[]>,
  handler: (event: MouseEvent) => void,
  isActive: boolean = true,
  targetIndex: number = 0,
  ignoreSiblings: boolean = false
) {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const listener = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (Array.isArray(ref.current)) {
        if (
          ref.current[targetIndex] &&
          ref.current[targetIndex].contains(event.target as Node)
        ) {
          return;
        }
      } else {
        if (ref.current.contains(event.target as Node)) {
          return;
        }

        // ignoreSiblings 옵션이 true인 경우 형제 요소 클릭 시 ref를 닫음
        if (ignoreSiblings && ref.current.parentNode) {
          const siblings = Array.from(ref.current.parentNode.children);
          if (
            siblings.some((sibling) => sibling.contains(event.target as Node))
          ) {
            return;
          }
        }
      }

      if (handler) {
        handler(event);
      }
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler, isActive, targetIndex, ignoreSiblings]);
}
export default useClickOutside;