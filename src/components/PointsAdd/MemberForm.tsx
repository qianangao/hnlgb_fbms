import React from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const MemberForm = ({ form }) => {
  const formItems = [
    {
      label: '积分（正数为添加，负数为扣减）',
      name: 'integral',
      type: 'number',
      span: 4,
      rules: [{ required: true, message: '请输入积分!' }],
    },
    {
      label: '积分类型',
      name: 'dictIntegralType',
      enumsLabel: 'dictIntegralType',
      span: 4,
      rules: [{ required: true, message: '请选择类型积分类型!', whitespace: true }],
    },
    {
      label: '说明',
      span: 4,
      type: 'textarea',
      name: 'remarks',
      rules: [
        { required: true, message: '请输入说明!', whitespace: true },
        { max: 150, message: '说明长度请小于150位!', whitespace: true },
      ],
    },
  ];

  return <AdvancedForm form={form} loading={false} fields={formItems} />;
};

MemberForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(MemberForm);
