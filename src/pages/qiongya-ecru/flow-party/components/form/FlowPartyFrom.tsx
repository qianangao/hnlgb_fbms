import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const FlowPartyFrom = ({ form, id, dispatch, loading, partyData }) => {
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

      // 支部-列表
      dispatch({
        type: 'branchInformation/branchInformationList',
        payload: { current: 1, pageSize: 10000 },
      });
    }
  }, [id]);
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
      enumsItems: partyData,
      rules: [{ required: true, message: '请选择支部名称!' }],
    },
  ];
  return <AdvancedForm form={form} fields={formItems} loading={loading} />;
};

FlowPartyFrom.useForm = AdvancedForm.useForm;

export default connect(({ loading, branchInformation }) => ({
  loading: loading.models.flowParty,
  partyData: branchInformation.partyData,
}))(FlowPartyFrom);
