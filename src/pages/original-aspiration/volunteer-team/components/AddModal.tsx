import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import DeedsForm from './form/DeedsForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading, deedsType }) => {
  const [form] = DeedsForm.useForm();
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

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type:
            deedsType === 'personal'
              ? 'oaVolunteerTeam/addPersonal'
              : 'oaVolunteerTeam/addCollective',
          payload: {
            ...values,
            isPublished: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
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
      title={deedsType === 'personal' ? '新增基本志愿服务' : '新增专项志愿服务'}
      centered
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      onCancel={hideModal}
    >
      <DeedsForm form={form} deedsType={deedsType} />
    </Modal>
  );
};

export default connect(({ oaVolunteerTeam, loading }) => ({
  addModalVisible: oaVolunteerTeam.addModalVisible,
  loading:
    loading.effects['oaVolunteerTeam/addPersonal'] ||
    loading.effects['oaVolunteerTeam/addCollective'],
}))(AddModal);
