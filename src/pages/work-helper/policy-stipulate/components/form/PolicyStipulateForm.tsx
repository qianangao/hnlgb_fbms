import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const PolicyStipulateForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '标题',
      name: 'title',
      rules: [{ required: true, message: '请输入标题!', whitespace: true }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '附件',
      name: 'attachmentInfo',
      type: 'upload',
    },
    {
      key: 'secondLine',
      type: 'segmentation',
    },
    {
      label: '内容',
      name: 'content',
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
      span: 2,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'policyStipulate/detailPolicyStipulate',
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

PolicyStipulateForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.policyStipulate,
}))(PolicyStipulateForm);
