import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';

const CommunityForm = ({ form, communityFormData }) => {
  const formItems = [
    {
      label: '社团名称',
      name: 'clubName',
      span: 2,
      rules: [{ required: true, message: '请输入社团名称!', whitespace: true }],
    },
    {
      label: '社团类型',
      name: 'dictClubType',
      enumsLabel: 'dictClubType',
      rules: [{ required: true, message: '请选择社团类型!', whitespace: true }],
    },
    {
      label: '社团简介',
      name: 'clubIntroduction',
      type: 'textArea',
      span: 4,
    },
    {
      label: '社团成员',
      name: 'memberItems',
      span: 4,
      render: <LgbMultiSelectInput />,
    },
  ];

  useEffect(() => {
    form.setFieldsValue(communityFormData);
  }, [communityFormData]);

  return (
    <>
      <AdvancedForm form={form} loading={false} fields={formItems} />
    </>
  );
};

CommunityForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(CommunityForm);
