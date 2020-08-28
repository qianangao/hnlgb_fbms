import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { connect } from 'umi';

const INIT_FORM_DATA = {
  name: '', // 姓名
  phoneNumber: '', // 联系电话
  IdNumber: '', // 身份证号
  employeeID: '', // 员工id
  accessControlStrateg: '', // 门禁状态
  registrationStatus: 0, // `1：已注册，0：未注册
  departmentId: '', // 部门id
};

const ModifyModal = ({ dispatch, vcBasicInfo, deptList, actionRef, loading, deptLoading }) => {
  const { modifyModalVisible } = vcBasicInfo;
  const [form] = Form.useForm();

  const showModal = item => {
    form.setFieldsValue({ ...INIT_FORM_DATA, ...item });

    dispatch({
      type: 'staffMgt/save',
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
      type: 'staffMgt/save',
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
          type: `staffMgt/updateEmployee`,
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
      title="编辑人员信息"
      width={640}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Form form={form} {...formItemLayout} initialValues={INIT_FORM_DATA}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="姓名" name="name">
          <Input disabled />
        </Form.Item>

        <Form.Item label="联系电话" name="phoneNumber">
          <Input disabled />
        </Form.Item>

        <Form.Item label="身份证号" name="IdNumber">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="员工id"
          name="employeeID"
          rules={[
            { required: true, message: '请输入员工id!', whitespace: true },
            { max: 30, message: '员工id长度请小于30位!', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="部门"
          name="departmentId"
          validateTrigger="onBlur"
          rules={[{ required: true, message: '请选择所属物业!' }]}
        >
          <Select loading={deptLoading}>
            {deptList.map(item => (
              <Select.Option key={item.departmentId}>{item.departmentName}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ vcBasicInfo, loading }) => ({
  vcBasicInfo,
  loading: loading.models.vcBasicInfo,
  deptLoading: loading.effects['deptMgt/getList'],
}))(ModifyModal);
