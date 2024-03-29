"use client";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/global-provider";
import CreateContent from "../modals/create-content";
import TaskItem from "../taskItem/task-item";
import { plus } from "@/app/utils/icons";
import Modal from "../modals/modal";

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({ title, tasks }: Props) => {
  const { theme, isLoading, openModal, modal } = useGlobalState();

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>

      <button className="btn-rounded" onClick={openModal}>
        {plus}
      </button>

      <div className="tasks grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
          />
        ))}
        <button className="create-task" onClick={openModal}>
          {plus}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
};

const TaskStyled = styled.div`
  padding: 2rem;
  width: 100%;
  background-color: #202020;
  border-radius: 1rem;
  height: 100%;
  box-shadow: #090909;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};

    box-shadow: 6px 0 5px -2px #090909;
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: none;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      display: flex;
      top: 3rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimary};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export default Tasks;
