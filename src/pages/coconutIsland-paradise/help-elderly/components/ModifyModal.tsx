import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import HelpElderlyForm from './form/HelpElderlyForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = HelpElderlyForm.useForm();
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
            type: `helpElderly/updateHelpElderlyInfo`,
            payload: {
              ...values,
              fileId: values.attachmentInfo.uid,
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
      title="修改助老志愿信息"
      centered
      width="900px"
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
      <HelpElderlyForm form={form} id={lgbId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.helpElderly,
}))(ModifyModal);
