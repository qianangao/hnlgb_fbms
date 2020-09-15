import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MemberForm from './MemberForm';

const MemberAddModal = ({ dispatch, memberAddModalVisible, actionRef, loading }) => {
  const [form] = MemberForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        memberAddModalVisible: true,
      },
    });
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
    dispatch({
      type: 'oaCaresNext/save',
      payload: {
        memberAddModalVisible: false,
      },
    });
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `oaCaresNext/addMember`,
          payload: {
            ...values,
          },
        });
      })
      .catch();
  };

  return (
    <Modal
      title="新增成员信息"
      centered
      width="400px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: '400px',
        overflow: 'auto',
      }}
      visible={memberAddModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <MemberForm size="middle" column={1} form={form} formData={{}} />
    </Modal>
  );
};

export default connect(({ oaCaresNext, loading }) => ({
  memberAddModalVisible: oaCaresNext.memberAddModalVisible,
  loading: loading.effects['oaCaresNext/addCares'],
}))(MemberAddModal);
