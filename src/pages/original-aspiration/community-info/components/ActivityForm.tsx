import React from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const ActivityForm = ({ form }) => {
  const formItems = [
    {
      label: '主题',
      name: 'theme',
      span: 4,
      rules: [{ required: true, message: '请输入主题!', whitespace: true }],
    },

    {
      label: '内容',
      name: 'content',
      type: 'editor',
      span: 4,
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
    },
  ];

  return <AdvancedForm form={form} loading={false} fields={formItems} />;
};

ActivityForm.useForm = AdvancedForm.useForm;

export default connect()(ActivityForm);
