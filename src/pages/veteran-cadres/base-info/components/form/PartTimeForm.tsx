import React, { useEffect } from 'react';
import { connect } from 'umi';

import AdvancedForm from '@/components/AdvancedForm';
import ProvinceCascaderInput from '@/components/ProvinceCascaderInput';

const PartTimeForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '单位名称',
      name: 'socialGroups',
      rules: [
        { message: '请输入社会团体名称!', whitespace: true },
        { max: 120, message: '社会团体名称请小于120位!', whitespace: true },
      ],
    },
    {
      label: '职务',
      name: 'post',
      rules: [
        { message: '请输入职务名称!', whitespace: true },
        { max: 120, message: '职务名称请小于120位!', whitespace: true },
      ],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '兼职常驻地',
      name: 'residence',
      render: <ProvinceCascaderInput />,
    },
    {
      label: '详细地址',
      name: 'detailedAddress',
      span: 2,
      rules: [{ max: 120, message: '兼职常驻地详细地址请小于120位!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'vcBasicInfo/getPartTimeLgb',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };

        fields.residence = data.placeOfResidence
          ? {
              value: data.placeOfResidence,
              label: data.placeOfResidenceName,
            }
          : null;

        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

PartTimeForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.vcBasicInfo,
}))(PartTimeForm);
