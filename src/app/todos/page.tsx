"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Row, Col, Typography, Form, notification } from "antd";
import { createTodo, deleteTodo, getTodoList, updateTodo } from "@/api/todo";
import ModalFrom from "@/components/ModalForm";
import TodoList from "@/components/TodoList";

const { Content } = Layout;

interface TodoItem {
  title: string;
  description: string;
  _id: string;
  updatedAt: string;
}

const Todos = () => {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [titleTodoUpdate, setTitleTodoUpdate] = useState<string>("");

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
  };

  // list todo
  const fetchTodoData = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data }: any = await getTodoList();
      setTodoList(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodoData();
  }, [fetchTodoData]);

  // create todo
  const createNewTodo = async (params: any) => {
    try {
      const response: any = await createTodo(params);

      if (response) {
        notification.success({
          message: "Created Todo Successfully",
          description: `Title: ${response.title}`,
        });

        setTodoList((prev) => {
          if (prev) {
            return [...prev, response];
          }
          return response;
        });
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setIsModalOpen(false);
    }
  };

  // delete todo
  const deleteSelectedTodo = async (title: string) => {
    try {
      const response: any = await deleteTodo(title);

      if (response) {
        notification.success({
          message: "Deleted Todo Successfully",
        });

        const updatedTodoList = todoList.filter((todo) => todo.title !== title);
        setTodoList(updatedTodoList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // update todo
  const handleEditClick = (item: TodoItem) => {
    fetchSpecificTodo(item);
    setIsEditing(true);
  };

  const fetchSpecificTodo = async (item: TodoItem) => {
    setIsModalOpen(true);
    setTitleTodoUpdate(item.title);

    try {
      form.setFieldsValue({
        title: item.title,
        description: item.description,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateSelectedTodo = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    try {
      const response: any = await updateTodo({
        title,
        description,
      });

      if (response) {
        notification.success({
          message: "Updated Todo Successfully",
          description: `Title: ${response.title}`,
        });

        setTodoList((prevTodoList) => {
          const updatedTodoList = prevTodoList.map((todo) =>
            todo.title === titleTodoUpdate ? response : todo
          );

          return updatedTodoList;
        });
      }

      setIsEditing(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setIsModalOpen(false);
    }
  };

  return (
    <Layout>
      <Content>
        <Typography.Title
          level={3}
          className="text-center"
          style={{ textAlign: "center" }}
        >
          TODO LIST
        </Typography.Title>
        <Row className="fixed bottom-0 left-0 z-10 pb-16 flex justify-center w-full">
          <Button
            danger
            type="primary"
            icon={<PlusOutlined />}
            className="!w-12 !h-12"
            shape="circle"
            onClick={openModal}
          />
        </Row>
        <Row justify="center">
          <Col xs={24} xl={7}>
            <TodoList
              todoList={todoList}
              isLoading={isLoading}
              onDeleteTodo={deleteSelectedTodo}
              onEditTodo={handleEditClick}
            />
          </Col>
        </Row>
      </Content>

      <ModalFrom
        form={form}
        isOpen={isModalOpen}
        isEditing={isEditing}
        handleCreate={createNewTodo}
        handleUpdate={updateSelectedTodo}
        handleCancel={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
      />
    </Layout>
  );
};

export default Todos;
