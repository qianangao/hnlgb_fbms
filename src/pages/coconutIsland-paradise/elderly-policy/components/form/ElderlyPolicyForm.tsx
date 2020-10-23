import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const ElderPolicyForm = ({ id, loading, dispatch, form }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '标题',
      name: 'title',
      rules: [
        { required: true, message: '请输入标题名称!', whitespace: true },
        { max: 128, message: '涉老政策名称请小于128位!', whitespace: true },
      ],
    },
    {
      label: '附件',
      name: 'attachmentInfo',
      type: 'upload',
      rules: [{ required: true, message: '请上传附件!' }],
    },
    {
      label: '内容',
      name: 'context',
      span: 4,
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'elderlyPolicy/detailElderlyPolicyInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          attachmentInfo: {
            uid: data.attachmentInfo && data.attachmentInfo.id,
            name: data.attachmentInfo && data.attachmentInfo.fileName,
            url: data.attachmentInfo && data.attachmentInfo.url,
            status: 'done',
          },
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

ElderPolicyForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.elderlyPolicy,
}))(ElderPolicyForm);
