import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import SeniorUniversityForm from './form/SeniorUniversityForm';

const ModifyModal = ({ dispatch, modifyModalVisible, actionRef, loading }) => {
  const [form] = SeniorUniversityForm.useForm();
  const [lgbId, setLgbId] = useState();

  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'seniorUniversity/save',
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
      type: 'seniorUniversity/save',
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
          type: `seniorUniversity/updateSeniorUniversityInfo`,
          payload: {
            ...values,
            id: lgbId,
            pushStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          },
        });
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="修改老年大学信息"
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
        <Button key="cancel" onClick={hideModal}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          保存
        </Button>,
      ]}
      maskClosable={false}
      destroyOnClose
      onCancel={hideModal}
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <SeniorUniversityForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ seniorUniversity, loading }) => ({
  modifyModalVisible: seniorUniversity.modifyModalVisible,
  loading: loading.models.seniorUniversity,
}))(ModifyModal);
