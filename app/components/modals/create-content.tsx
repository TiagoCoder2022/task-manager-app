"use client";
// import { useGlobalState } from "@/app/context/globalProvider";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
// import Button from "../Button/Button";
import { add, close } from "@/app/utils/icons";
import { useGlobalState } from "@/app/context/global-provider";
import Button from "../button/button";

function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { theme, allTasks, closeModal, isEditing, taskToEdit } =
    useGlobalState();

  useEffect(() => {
    if (isEditing && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDate(taskToEdit.date);
      setCompleted(taskToEdit.isCompleted);
      setImportant(taskToEdit.important || false);
    } else {
      // Resetar campos ao abrir para criar uma nova tarefa
      setTitle("");
      setDescription("");
      setDate("");
      setCompleted(false);
      setImportant(false);
    }
  }, [isEditing, taskToEdit]);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      let res;
      if (isEditing && taskToEdit) {
        res = await axios.put(`/api/tasks/${taskToEdit.id}`, task);
      } else {
        res = await axios.post("/api/tasks", task);
      }

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success(
          `Task ${isEditing ? "updated" : "created"} successfully.`
        );
        allTasks();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <div className="flex justify-between">
        <h1 className="text-[1.6rem] font-bold">
          {isEditing ? "Edit Task" : "Create a Task"}
        </h1>
        <button className="text-[1.6rem]" onClick={closeModal}>
          {close}
        </button>
      </div>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g, Watch a video from Fireship."
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="e.g, Watch a video about Next.js Auth"
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          value={date}
          onChange={handleChange("date")}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          value={completed.toString()}
          onChange={handleChange("completed")}
          type="checkbox"
          name="completed"
          id="completed"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          value={important.toString()}
          onChange={handleChange("important")}
          type="checkbox"
          name="important"
          id="important"
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name={isEditing ? "Edit Task" : "Create Task"}
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 0.5rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;
