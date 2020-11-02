import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import SilhouetteForm from './form/SilhouetteForm';

const AddSilhouetteModal = ({ dispatch, actionRef, loading }) => {
  const [form] = SilhouetteForm.useForm();
  const [addSilhouetteModalVisible, setAddSilhouetteModalVisible] = useState(false);
  const [activityId, setActivityId] = useState();

  const showModal = id => {
    setActivityId(id);
    setAddSilhouetteModalVisible(true);
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
    setAddSilhouetteModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `activityCenter/addSilhouette`,
            payload: {
              ...values,
              id: activityId,
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
      title="发布剪影"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={addSilhouetteModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <SilhouetteForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.activityCenter,
}))(AddSilhouetteModal);
