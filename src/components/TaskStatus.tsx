import React, { ReactElement } from "react";

interface Props {}

export default function TaskStatus({}: Props): ReactElement {
  return (
    <div className="status">
      <div>현재 진행중 태스크 : 0개</div>
    </div>
  );
}
