import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const PartyRecordForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '支部名称',
      name: 'partyId',
      enumsLabel: 'dictPoliticalStatus',
      rules: [{ required: true, message: '请选择支部名称!' }],
    },
    {
      label: '缴纳年月',
      name: 'paymentTime',
      type: 'date',
      rules: [{ required: true, message: '请输入学习时间!', whitespace: true }],
    },
    {
      label: '缴纳状态',
      name: 'dictPaymentState',
      enumsLabel: 'dictPartyType',
      rules: [{ required: true, message: '请输入缴纳状态!', whitespace: true }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'partyRecord/detailPartyRecord',
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

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

PartyRecordForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.partyRecord,
}))(PartyRecordForm);
