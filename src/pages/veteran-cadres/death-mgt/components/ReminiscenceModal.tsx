import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Select, Modal } from 'antd';

const ReminiscenceModal = ({ enums, dispatch, actionRef, loading }) => {
  const [form] = Form.useForm();
  const [lgbId, setLgbId] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = id => {
    setLgbId(id);
    setModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: 'vcDeathInfo/initReminiscence',
            payload: {
              userId: lgbId,
              reminiscenceType: values.reminiscenceType,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="发起追思缅怀"
      centered
      style={{ paddingBottom: 0 }}
      visible={modalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="缅怀类型"
          name="reminiscenceType"
          rules={[{ required: true, message: '请选择缅怀类型!' }]}
        >
          <Select>
            {enums.dictReminiscenceType &&
              Object.keys(enums.dictReminiscenceType).map(key => (
                <Select.Option key={key} value={key}>
                  {enums.dictReminiscenceType[key]}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ global, loading }) => ({
  enums: global.enums,
  loading: loading.models.vcDeathInfo,
}))(ReminiscenceModal);
