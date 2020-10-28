import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import DeedsForm from './form/DeedsForm';

const AddModal = ({ dispatch, actionRef, loading, deedsType }) => {
  const [form] = DeedsForm.useForm();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const showModal = () => {
    setAddModalVisible(true);
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
    setAddModalVisible(false);
    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaAdvancedDeeds/${deedsType === 'personal' ? 'addPersonal' : 'addCollective'}`,
            payload: {
              ...values,
              isPublished: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
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
      title={deedsType === 'personal' ? '新增个人先进事迹' : '新增集体先进事迹'}
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

export default connect(({ loading }) => ({
  loading:
    loading.effects['oaAdvancedDeeds/addPersonal'] ||
    loading.effects['oaAdvancedDeeds/addCollective'],
}))(AddModal);
