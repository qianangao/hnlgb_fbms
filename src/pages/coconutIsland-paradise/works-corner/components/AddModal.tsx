import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button } from 'antd';
import WorksCornerForm from './form/WorksCornerForm';

const AddModal = ({ dispatch, actionRef, loading }) => {
  const [form] = WorksCornerForm.useForm();
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
            type: `worksCorner/addWorksCornerInfo`,
            payload: {
              headline: values.headline,
              context: values.context,
              type: values.type,
              attachmentId: values.attachmentInfo.uid,
              status: publishStatus ? 0 : 1, // 状态 0：保存 1：发布
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
      title="新增作品园地"
      centered
      width="95vw"
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
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <WorksCornerForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.worksCorner,
}))(AddModal);
