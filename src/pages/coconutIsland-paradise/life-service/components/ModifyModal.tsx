import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import LifeServiceForm from './form/LifeServiceForm';

const ModifyModal = ({ dispatch, modifyModalVisible, actionRef, loading }) => {
  const [form] = LifeServiceForm.useForm();
  const [lgbId, setLgbId] = useState();

  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'lifeService/save',
      payload: {
        modifyModalVisible: true,
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
      type: 'lifeService/save',
      payload: {
        modifyModalVisible: false,
      },
    });
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `lifeService/updateLifeServiceInfo`,
          payload: {
            ...values,
            id: lgbId,
            pushStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
            isLgb: 1, // 用户类型：0-老干部，1-工作人员
          },
        });
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="修改生活服务信息"
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
      <LifeServiceForm form={form} id={lgbId} />
    </Modal>
  );
};

export default connect(({ lifeService, loading }) => ({
  modifyModalVisible: lifeService.modifyModalVisible,
  loading: loading.models.lifeService,
}))(ModifyModal);
