import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import PhotoInfoForm from './form/PhotoInfoForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = PhotoInfoForm.useForm();

  const showModal = () => {
    dispatch({
      type: 'photoInfo/save',
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
      type: 'photoInfo/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `photoInfo/addPhotoInfo`,
          payload: {
            ...values,
          },
        });
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增照片信息"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <PhotoInfoForm form={form} />
    </Modal>
  );
};

export default connect(({ photoInfo, loading }) => ({
  addModalVisible: photoInfo.addModalVisible,
  loading: loading.models.photoInfo,
}))(AddModal);
