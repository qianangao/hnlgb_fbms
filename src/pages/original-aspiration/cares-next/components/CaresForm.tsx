import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { checkPhone } from '@/utils/validators';

const CaresForm = ({ form, dispatch, id }) => {
  const formItems = [
    {
      label: '组织名称',
      name: 'mechanismName',
      span: 2,
      rules: [
        { required: true, message: '请输入组织名称!', whitespace: true },
        { max: 64, message: '组织名称不超过64个字!' },
      ],
    },
    {
      label: '联系人',
      name: 'contactPerson',
    },
    {
      label: '联系方式',
      name: 'contactInformation',
      rules: [{ validator: checkPhone }],
    },
    {
      label: '简介',
      name: 'introduction',
      type: 'textarea',
      span: 4,
      rules: [{ required: true, message: '请输入简介!', whitespace: true }],
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'oaCaresNext/getCaresDetail',
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

  return <AdvancedForm form={form} loading={false} fields={formItems} />;
};

CaresForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.specialty,
}))(CaresForm);
