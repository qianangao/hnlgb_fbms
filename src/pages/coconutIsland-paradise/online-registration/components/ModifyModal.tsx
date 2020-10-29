import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import OnlineRegistrationForm from './form/OnlineRegistrationForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = OnlineRegistrationForm.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [lgbId, setLgbId] = useState();
  const showModal = item => {
    setLgbId(item.id);
    setModifyModalVisible(true);
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
    setModifyModalVisible(false);
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `onlineRegistration/updateOnlineRegistrationInfo`,
            payload: {
              title: values.title,
              context: values.context,
              coreAdd: values.coreAdd,
              fileId: values.attachmentInfo.uid,
              urlId: values.attachmentInfo2.uid,
              id: lgbId,
              pushStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
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
      title="修改网络报名信息"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      forceRender
      footer={[
        <Button loading={loading} onClick={() => handleOk(true)}>
          保存
        </Button>,
        <Button loading={loading} onClick={() => handleOk(false)}>
          发布
        </Button>,
      ]}
      maskClosable={false}
      destroyOnClose
      onCancel={hideModal}
    >
      <OnlineRegistrationForm form={form} id={lgbId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.onlineRegistration,
}))(ModifyModal);
