import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { connect } from 'umi';
import OrgTree from '@/components/OrgTree';

const OrgSelectModal = ({ dispatch, vcBasicInfo, actionRef, loading }) => {
  const { orgSelectModalVisible } = vcBasicInfo;
  const [form] = Form.useForm();

  const showModal = userIdList => {
    form.setFieldsValue({ userIdList });

    dispatch({
      type: 'vcBasicInfo/save',
      payload: {
        orgSelectModalVisible: true,
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
        orgSelectModalVisible: false,
      },
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `vcBasicInfo/updateLgbOrg`,
          payload: {
            ...values,
          },
        });
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

export default connect(({ vcBasicInfo, loading }) => ({
  vcBasicInfo,
  loading: loading.models.vcBasicInfo,
}))(OrgSelectModal);
