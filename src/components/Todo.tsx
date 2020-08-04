import React, { useState, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import TodoList from "./TodoList";
import TaskStatus from "./TaskStatus";

type Task = {
  title: string;
  isComplete: boolean;
  index: number;
};

interface Props {}

function reducer(state: Task[], action: any) {}

export default function Todo({}: Props): ReactElement {
  const [tasks, setTask] = useState<Task[]>([
    { title: "밥먹기", isComplete: true, index: 0 },
    { title: "코딩하기", isComplete: true, index: 1 },
    { title: "아에이오우아아", isComplete: true, index: 2 },
  ]);

  return (
    <div className="main__container">
      <div className="title__container">
        <h1>To Do List</h1>
        <div className="dark-mode">
          <FontAwesomeIcon className="icon__moon" icon={faMoon} />
          <div className="text__dark-mode">다크 모드</div>
        </div>
      </div>
      <div className="main__header">
        <div className="inputBar">
          <input
            className="task__input"
            placeholder="할일을 입력해주세요"
          ></input>
          <button className="task__button">등록</button>
        </div>
      </div>
      {/* 상태바 컴포넌트 */}
      <TaskStatus></TaskStatus>
      {/* 태스크 목록 컴포넌트 */}
      <div className="todos__container">
        {tasks.map((el) => (
          <TodoList title={el.title}></TodoList>
        ))}
      </div>
      <footer>
        {" "}
        <div className="icon__container">
          <a
            className="icon__link"
            href="https://github.com/C17AN?tab=repositories"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            className="icon__link"
            href="https://www.instagram.com/chamming2/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            className="icon__link"
            href="https://www.facebook.com/profile.php?id=100013524540306"
            target="_blank"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
        </div>
        <div>Made By C17AN, with TypeScript 2020</div>
      </footer>
    </div>
  );
}
