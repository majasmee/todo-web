import React from "react";
import { Modal, Form, Input, FormInstance, Button, Col, Row } from "antd";
import { Store } from "antd/lib/form/interface";

interface Props {
  form: FormInstance;
  isOpen: boolean;
  isEditing: boolean;
  handleCreate: (values: any) => void;
  handleUpdate: (values: any) => void;
  handleCancel: () => void;
}

const ModalFrom = ({
  form,
  isOpen,
  isEditing,
  handleCancel,
  handleCreate,
  handleUpdate,
}: Props) => {
  const onSubmit = (values: Store) => {
    const { title, description } = values;

    if (isEditing) {
      handleUpdate({ title, description });
    } else {
      handleCreate({ title, description });
    }

    form.resetFields();
  };

  return (
    <Modal
      title={isEditing ? "Edit Todo" : "New Todo"}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        handleCancel();
      }}
      footer={null}
    >
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        <Col span={24}>
          <Row justify="center" gutter={8}>
            <Col>
              <Button type="primary" danger htmlType="submit">
                {isEditing ? "Update" : "Create"}
              </Button>
            </Col>
            <Col>
              <Button type="default" htmlType="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};

export default ModalFrom;
