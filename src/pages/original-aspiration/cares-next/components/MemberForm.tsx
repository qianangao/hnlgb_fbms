import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const MemberForm = ({ form, formData }) => {
  const formItems = [
    {
      label: '姓名',
      name: 'memberName',
      span: 4,
      rules: [{ required: true, message: '请输入姓名!', whitespace: true }],
    },
    {
      label: '性别',
      span: 4,
      name: 'dictSex',
      enumsLabel: 'dictSex',
    },
    {
      label: '联系电话',
      span: 4,
      name: 'phoneNumber',
    },
  ];

  useEffect(() => {
    form.setFieldsValue(formData.formData);
  }, [formData]);

  return <AdvancedForm form={form} loading={false} fields={formItems} />;
};

MemberForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(MemberForm);
