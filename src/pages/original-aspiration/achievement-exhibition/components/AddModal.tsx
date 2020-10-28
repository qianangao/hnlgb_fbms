import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import AchievementForm from './form/AchievementForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = AchievementForm.useForm();
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
            type: `oaAchievementExhibition/addAchievement`,
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
      title="新增成果信息"
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
      <AchievementForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaAchievementExhibition/addAchievement'],
}))(AddModal);
