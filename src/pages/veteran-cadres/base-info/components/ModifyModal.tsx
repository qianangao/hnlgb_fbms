import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Steps, Button } from 'antd';
import BasicInfoForm from './form/BasicInfoForm';

const ModifyModal = ({ dispatch, modifyModalVisible, actionRef, loading }) => {
  const [form] = BasicInfoForm.useForm();
  const [stepCurrent, setCurrent] = useState(0);
  const [lgbId, setLgbId] = useState('');

  const showModal = id => {
    setLgbId(id);
    dispatch({
      type: 'vcBasicInfo/save',
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
      type: 'vcBasicInfo/save',
      payload: {
        modifyModalVisible: false,
      },
    });
    setCurrent(0);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `vcBasicInfo/${steps[stepCurrent].effect}`,
          payload: {
            ...values,
          },
        });
        if (stepCurrent < steps.length - 1) {
          setCurrent(stepCurrent + 1);
        } else {
          dispatch({
            type: 'vcBasicInfo/save',
            payload: {
              modifyModalVisible: false,
            },
          });
        }
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  const steps = [
    {
      title: '基本信息',
      effect: 'updateLgb',
      StepsForm: BasicInfoForm,
    },
    {
      title: '家庭信息',
      content: 'Second-content',
      StepsForm: BasicInfoForm,
    },
    {
      title: '工作信息',
      content: 'Last-content',
      StepsForm: BasicInfoForm,
    },
    {
      title: '健康档案',
      content: 'Last-content',
      StepsForm: BasicInfoForm,
    },
  ];

  const { StepsForm } = steps[stepCurrent];

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
        stepCurrent < steps.length - 1 && (
          <Button key="next" onClick={() => setCurrent(stepCurrent + 1)}>
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
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <StepsForm form={form} id={lgbId} />
      </div>
    </Modal>
  );
};

export default connect(({ vcBasicInfo, loading }) => ({
  modifyModalVisible: vcBasicInfo.modifyModalVisible,
  loading: loading.models.vcBasicInfo,
}))(ModifyModal);
