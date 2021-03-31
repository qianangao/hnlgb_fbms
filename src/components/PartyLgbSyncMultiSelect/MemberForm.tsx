import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const MemberForm = ({ form, formData, type }) => {
  const formItems = [
    {
      label: '姓名',
      name: 'realName',
      span: 4,
      disabled: type === 1,
      rules: [{ required: true, message: '请输入姓名!', whitespace: true }],
    },
    {
      label: '性别',
      span: 4,
      visible: type !== 1,
      name: 'dictSex',
      enumsLabel: 'dictSex',
    },
    {
      label: '出生日期',
      span: 4,
      visible: type !== 1,
      name: 'dateOfBirth',
      type: 'date',
    },
    {
      label: '政治面貌',
      span: 4,
      visible: type !== 1,
      name: 'dictPoliticalStatus',
      enumsLabel: 'dictPoliticalStatus',
    },
    {
      label: '民族',
      span: 4,
      visible: type !== 1,
      name: 'dictNation',
      enumsLabel: 'dictNation',
    },
    {
      label: '籍贯',
      visible: type !== 1,
      span: 4,
      name: 'nativePlace',
      rules: [{ max: 50, message: '籍贯长度请小于50位!', whitespace: true }],
    },
    {
      label: '离退休类型',
      span: 4,
      visible: type !== 1,
      name: 'dictRetirementType',
      enumsLabel: 'dictRetirementType',
    },
    {
      label: '联系电话',
      span: 4,
      visible: type !== 1,
      name: 'phoneNumber',
      // rules: [{ max: 50, message: '籍贯长度请小于50位!', whitespace: true }],
    },
    {
      label: '原工作单位及职务',
      span: 4,
      visible: type !== 1,
      name: 'originalUnitAndPosition',
      // rules: [{ max: 50, message: '籍贯长度请小于50位!', whitespace: true }],
    },
    {
      label: '现居住地址',
      span: 4,
      visible: type !== 1,
      name: 'homeAddress',
      // rules: [{ max: 50, message: '籍贯长度请小于50位!', whitespace: true }],
    },
    {
      label: '备注',
      span: 4,
      visible: type !== 1,
      name: 'remarks',
      // rules: [{ max: 50, message: '籍贯长度请小于50位!', whitespace: true }],
    },
    {
      label: '人员类别',
      span: 4,
      visible: type === 1,
      name: 'dictPartyUserCategory',
      enumsLabel: 'dictPartyUserCategory',
    },
    {
      label: '人员角色',
      span: 4,
      visible: type === 1,
      name: 'dictPartyUserRole',
      enumsLabel: 'dictPartyUserRole',
    },
  ];

  useEffect(() => {
    if (type !== 2) {
      form.setFieldsValue(formData.formData);
    }

    // console.log('formData', formData);
  }, [formData]);

  return <AdvancedForm form={form} loading={false} fields={formItems} />;
};

MemberForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(MemberForm);
