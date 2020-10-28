import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ElegantDemeanorForm from './form/ElegantDemeanorForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = ElegantDemeanorForm.useForm();
  const [elegantDemeanorId, setElegantDemeanorId] = useState('');
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const showModal = id => {
    setElegantDemeanorId(id);
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
    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `oaElegantDemeanor/updateElegantDemeanor`,
            payload: {
              title: values.title,
              type: values.type,
              context: values.context,
              fileId: values.attachmentInfo && values.attachmentInfo.uid,
              pushStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
              id: elegantDemeanorId,
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
      title="编辑五老风采"
      centered
      destroyOnClose
      width="900px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
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
      <ElegantDemeanorForm form={form} id={elegantDemeanorId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['oaElegantDemeanor/updateElegantDemeanor'],
}))(ModifyModal);
