import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Steps, Button } from 'antd';
import BasicInfoForm from './form/BasicInfoForm';
import FamilyForm from './form/FamilyForm';
import PartTimeForm from './form/PartTimeForm';
import HealthyForm from './form/HealthyForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = BasicInfoForm.useForm();
  const [stepCurrent, setCurrent] = useState(0);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [lgbId, setLgbId] = useState('');

  const showModal = id => {
    setLgbId(id);
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

  const changeCurrent = index => {
    form.resetFields();
    setCurrent(index);
  };

  const hideModal = () => {
    setModifyModalVisible(false);
    changeCurrent(0);
  };
  const steps = [
    {
      title: '基本信息',
      effect: 'updateLgb',
      StepsForm: BasicInfoForm,
      dataFormat: values => ({ ...values, id: lgbId }),
    },
    {
      title: '家庭信息',
      effect: 'updateFamilyLgb',
      StepsForm: FamilyForm,
      dataFormat: values => ({
        ...values,
        id: lgbId,
        residentAddressVillage: values.residentAddress.value,
        residentAddressList: values.residentAddress.label,
        homeAddressVillage: values.homeAddress.value,
        homeNameList: values.homeAddress.label,
      }),
    },
    {
      title: '社会兼职',
      effect: 'updatePartTimeLgb',
      StepsForm: PartTimeForm,
      dataFormat: values => ({
        ...values,
        id: lgbId,
        placeOfResidence: values.residence && values.residence.value,
        placeOfResidenceName: values.residence && values.residence.label,
      }),
    },
    {
      title: '健康档案',
      effect: 'updateHealthyLgb',
      StepsForm: HealthyForm,
      dataFormat: values => ({
        ...values,
        id: lgbId,
      }),
    },
  ];

  const { StepsForm } = steps[stepCurrent];

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `vcBasicInfo/${steps[stepCurrent].effect}`,
            payload: steps[stepCurrent].dataFormat(values),
            resolve,
          });
        });
      })
      .then(_ => {
        if (stepCurrent < steps.length - 1) {
          changeCurrent(stepCurrent + 1);
        } else {
          hideModal();
        }
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="修改老干部信息"
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
        stepCurrent !== 0 && (
          <Button key="pre" onClick={() => changeCurrent(stepCurrent - 1)}>
            上一步
          </Button>
        ),
        stepCurrent < steps.length - 1 && (
          <Button key="next" onClick={() => changeCurrent(stepCurrent + 1)}>
            跳过
          </Button>
        ),
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          保存
        </Button>,
      ]}
      maskClosable={false}
      destroyOnClose
      onCancel={hideModal}
    >
      <Steps current={stepCurrent}>
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div
        style={{
          height: 'calc(100% - 36px)',
          padding: '20px 0',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <StepsForm key={`form${stepCurrent}`} name="modify" form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.vcBasicInfo,
}))(ModifyModal);
