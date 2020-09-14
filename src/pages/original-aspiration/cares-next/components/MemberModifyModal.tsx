import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import MemberForm from './MemberForm';

const MemberModifyModal = ({ dispatch, memberModifyModalVisible, actionRef, loading }) => {
  const [form] = MemberForm.useForm();
  const [formData, setformData] = useState();
  const showModal = formValues => {
    setformData(formValues);
    dispatch({
      type: 'vcCaresNext/save',
      payload: {
        memberModifyModalVisible: true,
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
      type: 'vcCaresNext/save',
      payload: {
        memberModifyModalVisible: false,
      },
    });
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `vcCaresNext/updateMember`,
          payload: {
            ...values,
            id: formData.id,
          },
        });
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

export default connect(({ vcCaresNext, loading }) => ({
  memberModifyModalVisible: vcCaresNext.memberModifyModalVisible,
  loading: loading.effects['vcCaresNext/addCares'],
}))(MemberModifyModal);
