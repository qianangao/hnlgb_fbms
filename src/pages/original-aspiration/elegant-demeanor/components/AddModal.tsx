import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import ElegantDemeanorForm from './form/ElegantDemeanorForm';

const AddModal = ({ dispatch, addModalVisible, actionRef, loading }) => {
  const [form] = ElegantDemeanorForm.useForm();
  const showModal = () => {
    dispatch({
      type: 'oaElegantDemeanor/save',
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
      type: 'oaElegantDemeanor/save',
      payload: {
        addModalVisible: false,
      },
    });

    form.resetFields();
  };

  const handleOk = publishStatus => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `oaElegantDemeanor/addElegantDemeanor`,
          payload: {
            title: values.title,
            type: values.type,
            context: values.context,
            fileId: values.uploadInfo.uid,
            fileUrl: values.uploadInfo.url,
            publishStatus: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
          },
        });
        form.resetFields();
      })
      .catch(info => {
        console.error('新增错误', info);
      });
  };

  return (
    <Modal
      title="新增五老风采"
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
      <ElegantDemeanorForm form={form} />
    </Modal>
  );
};

export default connect(({ oaElegantDemeanor, loading }) => ({
  addModalVisible: oaElegantDemeanor.addModalVisible,
  loading: loading.effects['oaElegantDemeanor/addElegantDemeanor'],
}))(AddModal);
