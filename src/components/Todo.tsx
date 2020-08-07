import React, { useReducer, useState, ReactElement } from "react";
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

type Action = { type: "ADD"; task: Task } | { type: "DELETE"; index: number };

function reducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD":
      return [...tasks, action.task];
    case "DELETE":
      // 삭제 시, Task 목록의 인덱스 조정함.
      // e.g. {0, 1, 2} 중 인덱스 1이 삭제되면 2가 1로 오게끔
      return tasks
        .filter((el) => el.index !== action.index)
        .map((el, index) => ({ ...el, index: index }));
    default:
      throw new Error("unhandled action");
  }
}

interface Props {}

export default function Todo({}: Props): ReactElement {
  const [tasks, dispatch] = useReducer(reducer, [
    { title: "밥먹기", isComplete: true, index: 0 },
    { title: "코딩하기", isComplete: true, index: 1 },
    { title: "아에이오우아아", isComplete: true, index: 2 },
  ]);
  // task 초기상태
  const [task, setTask] = useState({ title: "", isComplete: false, index: 0 });

  // addTask 는 생성한 task 를 task 목록에 추가하는 역할
  const addTask = (): void => dispatch({ type: "ADD", task: task });
  // deleteTask 는 삭제할 태스크를 전달해야 함.
  const deleteTask = (index: number): void => {
    console.log(tasks);
    console.log(index);
    dispatch({ type: "DELETE", index: index });
  };

  // 입력창에 타이핑 될때마다 호출됨
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTask({
      title: e.target.value,
      isComplete: false,
      index: tasks.length,
    });
  };
  // 폼 제출시
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.persist();
    console.log("hi");
  };

  return (
    // 타이틀
    <div className="main__container">
      <div className="title__container">
        <h1>To Do List</h1>
        <div className="dark-mode">
          <FontAwesomeIcon className="icon__moon" icon={faMoon} />
          <div className="text__dark-mode">다크 모드</div>
        </div>
      </div>
      {/* 입력바 부분 */}
      <div className="main__header">
        <form className="inputBar" onSubmit={handleSubmit}>
          <input
            className="task__input"
            placeholder="할일을 입력해주세요"
            value={task.title}
            onChange={handleChange}
          ></input>
          <button type="submit" className="task__button" onClick={addTask}>
            등록
          </button>
        </form>
      </div>
      {/* 상태바 컴포넌트 */}
      <TaskStatus></TaskStatus>
      {/* 태스크 목록 컴포넌트 */}
      <div className="todos__container">
        {/* 미리 태스크의 인덱스를 삭제 함수에 넘김. */}
        {tasks.map((el: Task, index) => (
          <TodoList
            title={el.title}
            onComplete={() => deleteTask(index)}
            key={index}
          ></TodoList>
        ))}
      </div>
      {/* footer 부분 */}
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
