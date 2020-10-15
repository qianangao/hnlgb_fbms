import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form } from 'antd';
import { connect } from 'umi';
import LgbSelectInput from '@/components/LgbSelectInput';

const FlowPartyFrom = ({ form, id, dispatch, loading }) => {
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'flowParty/detailFlowParty',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        fields.address = data.addressCode
          ? {
              value: data.addressCode,
              label: data.address,
            }
          : null;
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
    </>
  );
  const formItems = [
    {
      label: '开始流动时间',
      type: 'date',
      name: 'startTime',
      rules: [{ required: true, message: '请选择开始流动时间!' }],
    },
    {
      label: '支部名称',
      name: 'partyId',
      enumsLabel: 'dictPoliticalStatus',
      rules: [{ required: true, message: '请选择支部名称!' }],
    },
  ];
  return id ? (
    <AdvancedForm form={form} fields={formItems} loading={loading} />
  ) : (
    <AdvancedForm form={form} loading={loading} headerRender={selectLgbInput} fields={formItems} />
  );
};

FlowPartyFrom.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.flowParty,
}))(FlowPartyFrom);
