import React, { ReactElement } from "react";
import TodoItem from "./TodoItem";

interface Props {
  title: string;
}

export default function TodoList({ title }: Props): ReactElement {
  return (
    <ul>
      <div className="task">
        <div className="task__title">{title}</div>
        <div className="task__button__container">
          <button className="task__complete">시작</button>
          <button className="task__complete">완료</button>
        </div>
      </div>
    </ul>
  );
}
