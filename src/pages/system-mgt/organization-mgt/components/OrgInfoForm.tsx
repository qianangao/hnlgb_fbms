import React, { useEffect, useRef } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import OrgSelectInput from '@/components/OrgSelectInput';

const OrgInfoForm = ({ form, orgInfoData }) => {
  const orgSelect = useRef({});
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '单位名称',
      name: 'organizationName',
      span: 4,
      rules: [
        { required: true, message: '请输入单位名称!', whitespace: true },
        { max: 80, message: '单位名称长度请小于80位!', whitespace: true },
      ],
    },
    {
      label: '单位性质',
      name: 'dictOrganizationType',
      span: 4,
      enumsLabel: 'dictOrganizationType',
      rules: [{ required: true, message: '请选择单位性质!' }],
    },
    {
      label: '上级单位',
      span: 4,
      name: 'parentEmployerId',
      rules: [{ required: true, message: '请选择上级单位!' }],
      render: <OrgSelectInput actionRef={orgSelect} />,
    },
  ];

  useEffect(() => {
    if (orgInfoData) {
      orgSelect.current.setLabel(orgInfoData.parentOrganizationName || '');
      form.setFieldsValue({ ...orgInfoData });
    }
  }, [orgInfoData]);

  return <AdvancedForm form={form} fields={formItems} />;
};

OrgInfoForm.useForm = AdvancedForm.useForm;

export default OrgInfoForm;
