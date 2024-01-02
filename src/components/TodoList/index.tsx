import React from "react";
import { Avatar, Button, List, Popconfirm, Row, Typography } from "antd";
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import $moment from "@/plugins/moment";

interface TodoType {
  title: string;
  description: string;
  _id: string;
  updatedAt: string;
}

interface Props {
  todoList: TodoType[];
  isLoading: boolean;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (item: TodoType) => void;
}

const TodoList = ({ todoList, isLoading, onDeleteTodo, onEditTodo }: Props) => {
  return (
    <List
      className={styles.listWrapper}
      loading={isLoading}
      dataSource={todoList}
      itemLayout="horizontal"
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <Row className="gap-2">
              <Button
                size="small"
                shape="circle"
                icon={<FormOutlined />}
                onClick={() => onEditTodo(item)}
              />
              <Popconfirm
                title="Delete"
                description={`Want delete ${item.title} ?`}
                onConfirm={() => onDeleteTodo(item.title)}
                okText="Confirm"
                cancelText="Cancel"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button
                  danger
                  size="small"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Row>,
            <Typography.Text className="text-[10px] text-gray-500">
              {$moment(item.updatedAt).format("DD-MM-YYYY")}
            </Typography.Text>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
              />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default TodoList;
