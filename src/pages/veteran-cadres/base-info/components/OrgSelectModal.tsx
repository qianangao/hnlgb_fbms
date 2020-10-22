import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { connect } from 'umi';
import OrgTree from '@/components/OrgTree';

const OrgSelectModal = ({ dispatch, actionRef, loading }) => {
  const [form] = Form.useForm();
  const [orgSelectModalVisible, setOrgSelectModalVisible] = useState(false);

  const showModal = userIdList => {
    form.setFieldsValue({ userIdList });
    setOrgSelectModalVisible(true);
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
    setOrgSelectModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `vcBasicInfo/updateLgbOrg`,
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
      title="修改人员单位"
      width={640}
      visible={orgSelectModalVisible}
      onOk={handleOk}
      centered
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Form form={form}>
        <Form.Item name="userIdList" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="orgId" rules={[{ required: true, message: '请选择具体单位!' }]}>
          <OrgTree />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.vcBasicInfo,
}))(OrgSelectModal);
