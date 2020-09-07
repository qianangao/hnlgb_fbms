import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import PhotoInfoForm from './form/PhotoInfoForm';
const ModifyModal = ({ dispatch, modifyModalVisible, loading, actionRef }) => {
  const [form] = PhotoInfoForm.useForm();
  const [lgbId, setLgbId] = useState('');
  const showModal = item => {
    setLgbId(item.id);
    dispatch({
      type: 'photoInfo/save',
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
      type: 'photoInfo/save',
      payload: {
        modifyModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    console.log(lgbId);
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `photoInfo/updatePhotoInfo`,
          payload: {
            ...values,
            id: lgbId,
          },
        });
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改照片信息"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <PhotoInfoForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ photoInfo, loading }) => ({
  modifyModalVisible: photoInfo.modifyModalVisible,
  loading: loading.models.photoInfo,
}))(ModifyModal);