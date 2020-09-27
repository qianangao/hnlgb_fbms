import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import WorksCornerForm from './form/WorksCornerForm';

const ModifyModal = ({ dispatch, modifyModalVisible, actionRef, loading }) => {
  const [form] = WorksCornerForm.useForm();
  const [lgbId, setLgbId] = useState();

  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'worksCorner/save',
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
      type: 'worksCorner/save',
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
          type: `worksCorner/updateWorksCornerInfo`,
          payload: {
            ...values,
            id: lgbId,
            status: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          },
        });
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="修改作品园地信息"
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
      <WorksCornerForm form={form} id={lgbId} />
    </Modal>
  );
};

export default connect(({ worksCorner, loading }) => ({
  modifyModalVisible: worksCorner.modifyModalVisible,
  loading: loading.models.worksCorner,
}))(ModifyModal);
