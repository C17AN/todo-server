import React, { useReducer, useState, useEffect, ReactElement } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import TodoList from "./TodoList";
import TaskStatus from "./TaskStatus";
import Clock from "./Clock";

type Task = {
  title: string;
  isComplete: boolean;
  index: number;
};

interface Props {}

export default function Todo({}: Props): ReactElement {
  // task 의 배열, task 목록 관리를 위한 상태
  const [taskList, setTaskList] = useState([]);
  // task 초기상태, 단일 task 관리를 위한 상태
  const [task, setTask] = useState({ title: "", isComplete: false, index: 0 });

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => setTaskList(res.data))
      .catch((err) => console.error(err));
  }, taskList);

  // addTask 는 생성한 task 를 task 목록에 추가하는 역할
  const addTask = (): void => {
    if (task.title !== "") {
    }
  };
  // deleteTask 는 삭제할 태스크를 전달해야 함.
  const deleteTask = (index: number): void => {
    axios
      .delete("http://localhost:5000", { data: { targetId: index } })
      .then((res) => setTaskList(res.data))
      .catch((err) => console.error(err));
  };

  // 입력창에 타이핑 될때마다 호출됨
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTask({
      title: e.target.value,
      isComplete: false,
      index: taskList.length,
    });
  };
  // 폼 제출시 -> 서버로 할일 목록 전송
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setTask({
      title: "",
      isComplete: false,
      index: 0,
    });

    axios
      .post("http://localhost:5000", task)
      .then((res) => setTaskList(res.data))
      .catch((err) => console.log(err));
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
            value={task.title}
            placeholder="할일을 입력해주세요"
            onChange={handleChange}
          ></input>
          {/* 태스크 등록 버튼 */}
          <button type="submit" className="task__button" onClick={addTask}>
            등록
          </button>
        </form>
      </div>
      {/* 상태바 컴포넌트 */}
      <TaskStatus taskNumber={taskList.length}></TaskStatus>
      {/* 태스크 목록 컴포넌트 */}
      <div className="todos__container">
        {/* 미리 태스크의 인덱스를 삭제 함수에 넘김. */}
        {taskList.map((el: Task, index) => (
          <TodoList
            title={el.title}
            onComplete={() => deleteTask(index)}
            key={index}
          ></TodoList>
        ))}
      </div>
      {/* footer 부분 */}
      <footer>
        {/* 시계 위젯 */}
        <div className="clock__container">
          <Clock></Clock>
        </div>
        <div className="icon__container">
          <a
            className="icon__link"
            href="https://github.com/C17AN?tab=repositories"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            className="icon__link"
            href="https://www.instagram.com/chamming2/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            className="icon__link"
            href="https://www.facebook.com/profile.php?id=100013524540306"
            rel="noopener noreferrer"
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
