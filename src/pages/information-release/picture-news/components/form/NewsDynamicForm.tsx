import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const NewsDynamicForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '标题',
      name: 'headline',
      rules: [{ required: true, message: '请输入标题!', whitespace: true }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },

    {
      key: 'secondLine',
      type: 'segmentation',
    },
    {
      label: '内容',
      name: 'context',
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
      span: 2,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'pictureNews/detailNewsDynamic',
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

NewsDynamicForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.pictureNews,
}))(NewsDynamicForm);
