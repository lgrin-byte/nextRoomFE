import React from "react";

import * as S from "./HintItemView.styled";
import { HintData } from "./HintItem";

type Props = {
  id: number;
  hintData: HintData;
  onClick: () => void;
};

function HintItemView(props: Props) {
  const { hintData, id, onClick } = props;

  return (
    <S.ItemWrapper key={id} onClick={onClick}>
      <div className="numberBox">{hintData.hintCode}</div>
      <div className="numberBox">{hintData.progress}%</div>
      <div className="textBox">
        <span>{hintData.contents}</span>
      </div>
      <div className="textBox">
        <span>{hintData.answer}</span>
      </div>
    </S.ItemWrapper>
  );
}

export default HintItemView;
