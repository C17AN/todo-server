import React, { ReactElement } from "react";

interface Props {
  title: string;
  onComplete: () => void;
}

export default function TodoList({ title, onComplete }: Props): ReactElement {
  return (
    <ul>
      <div className="task">
        <div className="task__title">{title}</div>
        <div className="task__button__container">
          <button className="task__complete">시작</button>
          <button className="task__complete" onClick={onComplete}>
            완료
          </button>
        </div>
      </div>
    </ul>
  );
}
