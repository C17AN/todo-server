import React, { ReactElement } from "react";

interface Props {
  taskNumber: number;
}

export default function TaskStatus({ taskNumber }: Props): ReactElement {
  return (
    <div className="status">
      <div>{`현재 진행중 태스크 : ${taskNumber}개`}</div>
    </div>
  );
}
