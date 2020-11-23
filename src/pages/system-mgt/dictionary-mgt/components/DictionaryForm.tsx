import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const DictionaryForm = ({ form, data }) => {
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '字典代码',
      name: 'name',
      disabled: true,
      span: 4,
      rules: [{ required: true, message: '请输入字典名称!', whitespace: true }],
    },
    {
      label: '类型名称',
      name: 'chineseName',
      disabled: true,
      span: 4,
      rules: [{ max: 180, message: '请输入字段类型!', whitespace: true }],
    },
    {
      label: '字段名称',
      name: 'remarks',
      span: 4,
      rules: [{ max: 180, message: '请输入字段名称!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return <AdvancedForm form={form} fields={formItems} />;
};

DictionaryForm.useForm = AdvancedForm.useForm;

export default connect(({ smDictionaryMgt }) => ({
  roleData: smDictionaryMgt.roleData,
}))(DictionaryForm);
