import React from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const SilhouetteForm = ({ form, loading }) => {
  const formItems = [
    {
      label: '剪影内容',
      name: 'silhouette',
      span: 4,
      type: 'editor',
      rules: [{ required: true, message: '请输入剪影内容!', whitespace: true }],
    },
  ];

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

SilhouetteForm.useForm = AdvancedForm.useForm;

export default SilhouetteForm;
