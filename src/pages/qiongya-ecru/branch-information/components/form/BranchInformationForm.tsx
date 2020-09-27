import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const BranchInformationForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '支部名称',
      name: 'partyName',
      rules: [{ required: true, message: '请输入支部名称!', whitespace: true }],
    },
    {
      label: '支部类型',
      name: 'dictPartyType',
      enumsLabel: 'dictPartyType',
      rules: [{ required: true, message: '请输入支部类型!', whitespace: true }],
    },
    {
      label: '支部类别',
      name: 'dictPartyCategory',
      enumsLabel: 'dictPartyCategory',
      rules: [{ required: true, message: '请输入支部类别!', whitespace: true }],
    },
    {
      label: '支部活动地点',
      name: 'venues',
      rules: [{ required: true, message: '请输入支部活动地点!', whitespace: true }],
    },
    {
      label: '换届时间',
      name: 'venues',
      type: 'date',
    },
    {
      label: '书记',
      name: 'branchSecretaryId',
    },
    {
      label: '副书记',
      name: 'branchDeputySecretaryOneName',
    },
    {
      label: '纪检委员',
      name: 'disciplineCommissaryId',
    },
    {
      label: '组织委员',
      name: 'organCommissaryId',
    },
    {
      label: '宣传委员',
      name: 'publicityCommissaryId',
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'branchInformation/detailBranchInformation',
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

BranchInformationForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.branchInformation,
}))(BranchInformationForm);
