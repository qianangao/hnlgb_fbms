import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions } from 'antd';
import { connect } from 'umi';
import LgbSelectInput from '@/components/LgbSelectInput';

const SupportDifficultForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '帮扶时间',
      name: 'helpDate',
      type: 'date',
      rules: [{ required: true, message: '请选择帮扶时间!' }],
    },
    {
      label: '帮扶原因',
      name: 'helpReason',
      enumsLabel: 'helpReason',
      rules: [{ required: true, message: '请选择帮扶原因!' }],
    },
    {
      label: '帮扶金额',
      name: 'helpMoney',
      rules: [{ required: true, message: '请填写帮扶金额!', whitespace: true }],
    },
    {
      label: '发放人',
      name: 'helpPeople',
      rules: [{ required: true, message: '请填写发放人!', whitespace: true }],
    },
    {
      label: '帮扶单位',
      name: 'helpOrganization',
      rules: [{ required: true, message: '请填写帮扶单位!', whitespace: true }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: `wrSupportDifficult/detailSupportDifficult`,
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
      <Descriptions title="困难帮扶" />
    </>
  );

  return id ? (
    <AdvancedForm form={form} loading={loading} fields={formItems} />
  ) : (
    <AdvancedForm form={form} loading={loading} fields={formItems} headerRender={selectLgbInput} />
  );
};

SupportDifficultForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.wrSupportDifficult,
}))(SupportDifficultForm);
