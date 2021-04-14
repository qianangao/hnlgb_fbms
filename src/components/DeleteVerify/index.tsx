import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Input } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';
import md from 'utility';

const DeleteVerify = ({ dispatch, actionRef }) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [ids, setIds] = useState();
  const [form] = AdvancedForm.useForm();
  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);
  const showModal = id => {
    setIds(id);
    setAddModalVisible(true);
  };
  const deleteReturnworkPerson = id => {
    dispatch({
      type: 'vcBasicInfo/deleteLgb',
      payload: {
        ids: id,
      },
    });
  };
  const hideModal = () => {
    setAddModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const params = { password: values.password ? md.md5(values.password) : '' };
      new Promise(resolve => {
        dispatch({
          type: `vcBasicInfo/checkPassword`,
          payload: params,
          resolve,
        });
      }).then(data => {
        if (data) {
          deleteReturnworkPerson(ids);
          hideModal();
        }
      });
    });
  };

  const formItems = [
    {
      label: '校验密码',
      name: 'password',
      rules: [{ required: true, message: '请输入校验密码!', whitespace: true }],
      render: <Input.Password placeholder="请输入校验密码" />,
      span: 3,
    },
  ];
  return (
    <Modal
      title="校验"
      width="27vw"
      style={{ paddingBottom: 0 }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      onCancel={hideModal}
    >
      <AdvancedForm form={form} fields={formItems} />
    </Modal>
  );
};

export default connect(({ vcBasicInfo }) => ({
  vcBasicInfo,
}))(DeleteVerify);
