import React from "react";
import { Modal, Button, Form, Input } from "antd";
import useNotify from "../useNotify";

interface NotifyProps {
  showNotify: boolean;
  closeNotify: (close: boolean) => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required!",
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: "${label} is not a valid email!",
  },
};
const Notify = ({ showNotify, closeNotify }: NotifyProps) => {
  const { onCancel, onFinish } = useNotify(closeNotify);

  return (
    <Modal
      title="Notify"
      visible={showNotify}
      onCancel={onCancel}
      footer={[
        <Button key="cancelButton" onClick={onCancel}>
          Cancel
        </Button>,
        <Button type="primary" form="notifyForm" key="submit" htmlType="submit">
          Submit
        </Button>,
      ]}
    >
      <Form
        {...layout}
        key="notifyForm"
        id="notifyForm"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["notify", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["notify", "email"]}
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["notify", "repoUrl"]}
          label="repoUrl"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["notify", "massage"]}
          label="Massage"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
// const areEqual = (prevProps: any, nextProps: any) => {
//   console.log(prevProps, typeof prevProps, nextProps, typeof nextProps);
//   if (prevProps.showNotify === nextProps.showNotify) {
//     return true;
//   } else {
//     return false;
//   }
// };
const MemoizedNotify = React.memo(Notify);
export default MemoizedNotify;
