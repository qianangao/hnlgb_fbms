import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const PartyRecordForm = ({ form, id, dispatch, loading, partyData }) => {
  const formItems = [
    {
      label: '支部名称',
      name: 'partyId',
      enumsItems: partyData,
      rules: [{ required: true, message: '请选择支部名称!', whitespace: true }],
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
    {
      label: '缴费金额',
      name: 'paymentAmount',
      type: 'number',
      rules: [{ required: true, message: '请输入缴费金额!' }],
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

  useEffect(() => {
    // 支部-列表
    dispatch({
      type: 'branchInformation/branchInformationList',
      payload: { current: 1, pageSize: 10000 },
    });
  }, []);

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

PartyRecordForm.useForm = AdvancedForm.useForm;

export default connect(({ loading, branchInformation }) => ({
  loading: loading.models.partyRecord,
  partyData: branchInformation.partyData,
}))(PartyRecordForm);
