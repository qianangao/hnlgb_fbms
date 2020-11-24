import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Descriptions, Modal } from 'antd';
import LgbBasicInfo from '@/components/LgbBasicInfo';
import DeathInfoForm from './DeathInfoForm';

const ModifyModal = ({ enums, surviviorValues, dispatch, actionRef, loading }) => {
  const [form] = DeathInfoForm.useForm();
  const [deathValues, setDeathValues] = useState();
  const [modifyModalVisible, setModifyModalVisible] = useState(false);

  const showModal = deathFormValues => {
    setDeathValues(deathFormValues);

    dispatch({
      type: 'vcDeathInfo/getSpouseInfo',
      payload: {
        userId: deathFormValues.userId,
      },
    });

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
    dispatch({
      type: 'vcDeathInfo/save',
      payload: {
        surviviorValues: {},
      },
    });

    setDeathValues(undefined);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `vcDeathInfo/updateLgb`,
            payload: {
              ...values,
              id: deathValues.id,
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
      title="编辑离世信息"
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
      <LgbBasicInfo userId={deathValues && deathValues.userId} />

      <Descriptions title="遗属信息" size="middle">
        <Descriptions.Item label="遗属姓名">{surviviorValues.spouseName}</Descriptions.Item>
        <Descriptions.Item label="遗属性别">
          {enums.dictSpouseSex && enums.dictSpouseSex[surviviorValues.dictSpouseSex]}
        </Descriptions.Item>
        <Descriptions.Item label="遗属出生日期">
          {surviviorValues.spouseBirthOfDate}
        </Descriptions.Item>
        <Descriptions.Item label="遗属工作单位及职务">
          {surviviorValues.spouseUnit}
        </Descriptions.Item>
        <Descriptions.Item label="遗属手机号码">{surviviorValues.spousePhone}</Descriptions.Item>
        <Descriptions.Item label="遗属健康状态">
          {enums.dictSpouseHealth && enums.dictSpouseHealth[surviviorValues.dictSpouseHealth]}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="离世信息" size="middle" />
      <DeathInfoForm form={form} deathValues={deathValues} />
    </Modal>
  );
};

export default connect(({ global, vcDeathInfo, loading }) => ({
  enums: global.enums,
  surviviorValues: vcDeathInfo.surviviorValues,
  loading: loading.models.vcDeathInfo,
}))(ModifyModal);
