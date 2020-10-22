import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions } from 'antd';
import { connect } from 'umi';
import LgbSelectInput from '@/components/LgbSelectInput';

const OutRegisterFrom = ({ form, id, dispatch, loading }) => {
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'outRegister/detailOutRegisterInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);
  const selectLgbInput = (
    // 显示老干部信息-公共组件
    <>
      <Form.Item name="userId" rules={[{ required: true, message: '请选择老干部!' }]}>
        <LgbSelectInput />
      </Form.Item>
      <Descriptions title="外出登记" />
    </>
  );
  const formItems = [
    {
      label: '目的地',
      name: 'destination',
      rules: [{ required: true, message: '请输入目的地!' }],
    },
    {
      label: '申请时间',
      name: 'applicationTime',
      type: 'date',
      rules: [{ required: true, message: '请选择出院时间!' }],
    },
    {
      label: '返回时间',
      name: 'returnTime',
      type: 'date',
      rules: [{ required: false }],
    },
    {
      label: '事由',
      name: 'reason',
      rules: [{ required: false }],
    },
  ];
  return id ? (
    <AdvancedForm form={form} fields={formItems} loading={loading} />
  ) : (
    <AdvancedForm form={form} loading={loading} headerRender={selectLgbInput} fields={formItems} />
  );
};

OutRegisterFrom.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.outRegister,
}))(OutRegisterFrom);
