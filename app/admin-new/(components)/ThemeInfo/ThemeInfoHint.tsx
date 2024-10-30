import React from "react";
import { useGetHintList } from "@/queries/getHintList";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import {
  useSelectedHintReset,
  useSelectedHintWrite,
} from "@/components/atoms/selectedHint.atom";

interface ThemeDrawerProps {
  handleHintCreate: () => void;
}
const ThemeInfoHint: React.FC<ThemeDrawerProps> = ({ handleHintCreate }) => {
  const { id: themeId } = useSelectedThemeValue();

  const { data: hints = [] } = useGetHintList({ themeId });
  const setSelectedHint = useSelectedHintWrite();
  const resetSelectedHint = useSelectedHintReset();

  const handleBtn = () => {
    resetSelectedHint();
    handleHintCreate();
  };

  return (
    <div className="theme-hint__container">
      <div className="theme-hint__title">
        <span>힌트</span>
        <button
          className="secondary_button40"
          type="button"
          onClick={handleBtn}
        >
          추가하기
        </button>
      </div>
      <div className="theme-hint__table">
        <div className="table-header">
          <div className="table-code">
            <span>힌트코드</span>
          </div>
          <div className="table-rate">
            <span>진행률</span>
          </div>
          <div className="table-hint">
            <span>힌트 내용</span>
          </div>
          <div className="table-answer">
            <span>정답 내용</span>
          </div>
        </div>
        {hints.length > 0 ? (
          <ul className="table-content-box">
            {[...hints]
              .reverse()
              .map(
                ({
                  id,
                  hintCode,
                  contents,
                  answer,
                  progress,
                  hintImageUrlList,
                  answerImageUrlList,
                }) => (
                  <li
                    role="menuitem"
                    className="table-content-element-box table-header"
                    key={`item-${themeId}-${id}`}
                    onClick={() => {
                      setSelectedHint({
                        id,
                        hintCode,
                        contents,
                        answer,
                        progress,
                        hintImageUrlList,
                        answerImageUrlList,
                      });
                      handleHintCreate();
                    }}
                  >
                    <div className="table-code">
                      <div className="code">{hintCode}</div>
                    </div>
                    <div className="table-rate">
                      <div className="rate">{progress}%</div>
                    </div>
                    <div className="table-hint">
                      <div className="hint-content">{contents}</div>
                      <div className="hint-images">
                        {hintImageUrlList?.map(() => (
                          <div className="hint-image-box">
                            <div className="hint-image" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="table-answer">
                      <div className="hint-content">{answer}</div>
                      <div className="hint-images">
                        {answerImageUrlList?.map(() => (
                          <div className="hint-image-box">
                            <div className="hint-image" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                )
              )}
          </ul>
        ) : (
          <div className="table-content-box__none-hint">
            <div className="main-text">여기서 힌트를 추가해 보세요.</div>
            <div className="sub-text">아직 저장된 힌트가 없어요.</div>
            <button className="button40" type="button" onClick={handleBtn}>
              추가하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeInfoHint;
