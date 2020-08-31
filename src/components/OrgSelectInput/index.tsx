import React, { useState } from 'react';
import { Form, Modal, Mentions } from 'antd';
import OrgTree from '@/components/OrgTree';

let tempName = '';

const OrgSelectInput = ({ value, defaultLabel, onChange }) => {
  const [orgSelectModalVisible, setVisible] = useState(false);
  const [valueName, setValueName] = useState(defaultLabel || '');
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue({ organizationId: value });
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        setValueName(tempName);
        onChange && onChange(values.organizationId);
        setVisible(false);
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <>
      <Mentions readOnly value={valueName} onClick={showModal} />
      <Modal
        title="选择单位"
        width={640}
        visible={orgSelectModalVisible}
        onOk={handleOk}
        centered
        bodyStyle={{
          height: 'calc(95vh - 108px)',
          overflow: 'auto',
        }}
        forceRender
        onCancel={hideModal}
      >
        <Form form={form}>
          <Form.Item
            name="organizationId"
            rules={[{ required: true, message: '请选择具体单位!' }]}
            getValueFromEvent={item => {
              tempName = item.title;
              return item.key;
            }}
          >
            <OrgTree allInValue />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrgSelectInput;
