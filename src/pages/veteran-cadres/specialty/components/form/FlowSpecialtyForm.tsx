import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { checkAllTel } from '@/utils/validators';

const SpecialtyForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '姓名',
      name: 'realName',
      disabled: !!id,
      rules: [
        { required: true, message: '请输入姓名!', whitespace: true },
        { max: 30, message: '姓名长度请小于30位!', whitespace: true },
      ],
    },
    {
      label: '性别',
      name: 'dictSex',
      enumsLabel: 'dictSex',
      rules: [{ required: true, message: '请选择性别!' }],
    },
    {
      label: '民族',
      name: 'dictNation',
      enumsLabel: 'dictNation',
    },
    {
      label: '籍贯',
      name: 'nativePlace',
      rules: [{ max: 50, message: '籍贯长度请小于50位!', whitespace: true }],
    },
    {
      label: '文化程度',
      name: 'dictDegree',
      enumsLabel: 'dictDegree',
    },
    {
      label: '出生日期',
      name: 'dateOfBirth',
      type: 'date',
      rules: [{ required: true, message: '请选择出生日期!' }],
    },
    {
      label: '离退休时间',
      name: 'retirementDate',
      type: 'date',
      rules: [{ required: false, message: '请选择离退休时间!' }],
    },
    {
      label: '政治面貌',
      name: 'dictPoliticalStatus',
      enumsLabel: 'dictPoliticalStatus',
      rules: [{ required: true, message: '请选择政治面貌!' }],
    },
    {
      label: '职级',
      name: 'dictRetirementLevel',
      enumsLabel: 'dictRetirementLevel',
      rules: [{ required: false, message: '请选择职级!' }],
    },
    {
      label: '原工作单位及职务',
      name: 'originalUnitAndPosition',
      rules: [{ required: false, message: '请输入原工作单位及职务!' }],
    },
    {
      label: '现居住地址',
      name: 'homeAddress',
      rules: [{ max: 120, message: '家庭详细地址请小于120位!', whitespace: true }],
    },
    {
      label: '联系电话',
      name: 'phoneNumber',
      rules: [{ required: true, message: '请输入联系电话!' }, { validator: checkAllTel }],
    },
    {
      label: '备注',
      name: 'remarks',
      type: 'textarea',
      rules: [{ max: 120, message: '备注内容请小于120位!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'specialty/detailSpecialtyFlow',
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

SpecialtyForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(SpecialtyForm);
