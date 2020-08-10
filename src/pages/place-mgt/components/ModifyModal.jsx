import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { connect } from 'umi';

const INIT_FORM_DATA = {
  placeName: '', // 地点名称
  placePosition: '', // 位置
  describe: '', // 地点描述
};

const ModifyModal = ({ dispatch, placeMgt, actionRef, loading }) => {
  const { modifyModalVisible } = placeMgt;
  const [form] = Form.useForm();

  const [type, setType] = useState('add');

  const showModal = item => {
    setType(item ? 'edit' : 'add');
    form.setFieldsValue(item || INIT_FORM_DATA);

    dispatch({
      type: 'placeMgt/save',
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
      type: 'placeMgt/save',
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
          type: `placeMgt/${type === 'add' ? 'addPlace' : 'updatePlace'}`,
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
      title={type === 'add' ? '新增地点' : '编辑地点信息'}
      width={640}
      visible={modifyModalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
      destroyOnClose
    >
      <Form form={form} {...formItemLayout} initialValues={INIT_FORM_DATA}>
        <Form.Item
          label="地点名称"
          name="placeName"
          rules={[
            { required: true, message: '请输入地点名称!', whitespace: true },
            { max: 50, message: '地点名称长度请小于50位!', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="位置"
          name="placePosition"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: '请输入地点位置!', whitespace: true },
            { max: 80, message: '地点位置描述长度请小于80位!', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="地点描述"
          name="describe"
          validateTrigger="onBlur"
          rules={[{ max: 100, message: '地点描述长度请小于100位!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ placeMgt, loading }) => ({
  placeMgt,
  loading: loading.effects['placeMgt/addPlace'] || loading.effects['placeMgt/updatePlace'],
}))(ModifyModal);
