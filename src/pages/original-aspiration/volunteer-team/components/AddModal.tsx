import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TeamForm from './form/TeamForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading, deedsType }) => {
  const [form] = TeamForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'oaVolunteerTeam/save',
      payload: {
        addModalVisible: true,
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
      type: 'oaVolunteerTeam/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: 'oaVolunteerTeam/addTeam',
          payload: {
            ...values,
          },
        });
        form.resetFields();
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增志愿团队"
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <TeamForm form={form} deedsType={deedsType} />
    </Modal>
  );
};

export default connect(({ oaVolunteerTeam, loading }) => ({
  addModalVisible: oaVolunteerTeam.addModalVisible,
  loading: loading.effects['oaVolunteerTeam/addTeam'],
}))(AddModal);
