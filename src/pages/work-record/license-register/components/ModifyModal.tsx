import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import LicenseRegisterForm from './form/LicenseRegisterForm';

const ModifyModal = ({ dispatch, loading, actionRef }) => {
  const [form] = LicenseRegisterForm.useForm();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);

  const [lgbId, setLgbId] = useState('');
  const [licenseId, setLicenseId] = useState('');
  const showModal = item => {
    setLicenseId(item.id);
    setLgbId(item.userId);
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
    setLicenseId('');
    setLgbId('');
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `licenseRegister/updateLicenseRegisterInfo`,
            payload: {
              ...values,
              passCheckPhotoId: values.passCheckPhoto && values.passCheckPhoto.uid,
              passportPhotoId: values.passportPhoto && values.passportPhoto.uid,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('修改错误', info);
      });
  };
  return (
    <Modal
      title="修改证照登记"
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <LgbBasicInfo userId={lgbId} />
        <Descriptions title="证照登记" size="middle" />
        <LicenseRegisterForm form={form} id={licenseId} />
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.licenseRegister,
}))(ModifyModal);
