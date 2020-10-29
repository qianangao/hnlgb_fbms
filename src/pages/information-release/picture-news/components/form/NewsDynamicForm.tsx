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
      label: '缩略图',
      name: 'attachmentInfo',
      type: 'image',
      rules: [{ required: true, message: '请上传缩略图!' }],
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
          attachmentInfo:
            data.cephFile && data.cephFile.id && data.cephFile.fileName
              ? {
                  uid: data.cephFile.id,
                  name: data.cephFile.fileName,
                  url: data.cephFile.url,
                  status: 'done',
                }
              : null,
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
