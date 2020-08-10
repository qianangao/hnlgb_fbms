import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { connect } from 'umi';
import { checkPhone } from '@/utils/validators';

const INIT_FORM_DATA = {
  name: '', // 巡检姓名
  phone: '', // 巡检电话
  password: '123456&*(', // 巡检密码
};

const ModifyModal = ({ dispatch, inspectionMgt, actionRef, loading }) => {
  const { modifyModalVisible } = inspectionMgt;
  const [form] = Form.useForm();

  const [type, setType] = useState('add');

  const showModal = item => {
    setType(item ? 'edit' : 'add');
    form.setFieldsValue(item || INIT_FORM_DATA);

    dispatch({
      type: 'inspectionMgt/save',
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
      type: 'inspectionMgt/save',
      payload: {
        modifyModalVisible: false,
      },
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: `inspectionMgt/${type === 'add' ? 'addInspection' : 'updateInspection'}`,
          payload: {
            ...values,
          },
        });
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 18,
      },
    },
  };

  return (
    <Modal
      title={type === 'add' ? '新增巡检' : '编辑巡检信息'}
      width={640}
      visible={modifyModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
      destroyOnClose
    >
      <Form form={form} {...formItemLayout} initialValues={INIT_FORM_DATA}>
        <Form.Item
          label="姓名"
          name="name"
          rules={[
            { required: true, message: '请输入巡检姓名!', whitespace: true },
            { max: 50, message: '姓名长度请小于50位!', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="phone"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: '请输入巡检联系电话!', whitespace: true },
            { validator: checkPhone },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="登录密码"
          name="password"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: '请输入巡检登录密码!', whitespace: true },
            { max: 20, message: '密码长度请小于20位!', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ inspectionMgt, loading }) => ({
  inspectionMgt,
  loading:
    loading.effects['inspectionMgt/addInspection'] ||
    loading.effects['inspectionMgt/updateInspection'],
}))(ModifyModal);
