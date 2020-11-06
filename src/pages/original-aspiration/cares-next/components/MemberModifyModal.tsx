import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MemberForm from './MemberForm';

const MemberModifyModal = ({ dispatch, actionRef, loading, mechanismId }) => {
  const [form] = MemberForm.useForm();
  const [formData, setformData] = useState();
  const [memberModifyModalVisible, setMemberModifyModalVisible] = useState(false);
  const showModal = formValues => {
    setformData(formValues);
    setMemberModifyModalVisible(true);
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
    setMemberModifyModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaCaresNext/updateMember`,
            payload: {
              ...values,
              id: formData.id,
              mechanismId,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };

  return (
    <Modal
      title="编辑成员信息"
      centered
      width="400px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: '400px',
        overflow: 'auto',
      }}
      visible={memberModifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <MemberForm size="middle" column={1} form={form} formData={{ formData }} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaCaresNext/addCares'],
}))(MemberModifyModal);
