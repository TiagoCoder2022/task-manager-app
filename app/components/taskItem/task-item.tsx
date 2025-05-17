"use client";

import { useGlobalState } from "@/app/context/global-provider";
import { edit, trash } from "@/app/utils/icons";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";

interface TaskItemProps {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

const TaskItem = ({
  title,
  description,
  date,
  isCompleted,

  id,
}: TaskItemProps) => {
  const { theme, deleteTask, updateTask, openModal } = useGlobalState();
  return (
    <TaskItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}
        <button
          className="edit"
          onClick={() =>
            openModal("edit", {
              id,
              title,
              description,
              date,
              isCompleted,
            })
          }
        >
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
};

const TaskItemStyled = styled.div`
  padding: 1.5rem 1.5rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.activeNavLink};
  box-shadow: 6px 0 5px -2px #090909;

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
    color: ${(props) => props.theme.colorGrey2};
    font-size: 14px;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
        transition: all 0.5s ease;

        &:hover {
          color: #ffff;
        }
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: transparent;
      border-radius: 30px;
      border: 1px solid #ffff;
    }

    .completed {
      background: ${(props) => props.theme.colorPrimary} !important;
      border: none;
    }
  }
`;
export default TaskItem;
