import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';

const SiteForm = ({ form, siteData }) => {
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '地点名称',
      name: 'name',
      span: 4,
      rules: [
        { required: true, message: '请输入地点名称!', whitespace: true },
        { max: 80, message: '地点名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '地点地址',
      name: 'address',
      span: 4,
    },
    {
      label: '备注',
      name: 'remarks',
      span: 4,
    },
    {
      label: '是否共享',
      name: 'isShare',
      type: 'switch',
      initialValue: 0,
      rules: [{ required: false, message: '请选择是否共享!' }],
    },
  ];

  useEffect(() => {
    if (siteData) {
      form.setFieldsValue({ ...siteData });
    }
  }, [siteData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

SiteForm.useForm = AdvancedForm.useForm;

export default SiteForm;
