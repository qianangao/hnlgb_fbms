import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import SiteForm from './SiteForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = SiteForm.useForm();
  const [siteData, setSiteData] = useState(null);
  const [modifyModalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    setSiteData(items || null);
    setModalVisible(true);
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
    setModalVisible(false);
    setSiteData(null);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `qeActivitySite/${siteData ? 'updateSite' : 'addSite'}`,
            payload: {
              ...values,
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
      title={siteData ? '编辑活动地点信息' : '新增动地点'}
      centered
      width={680}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <SiteForm form={form} siteData={siteData} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.qeActivitySite,
}))(ModifyModal);
