import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const HelpElderlyForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '标题',
      name: 'title',
      rules: [
        { required: true, message: '请输入标题!', whitespace: true },
        { max: 32, message: '活动中心名称请小于32位!', whitespace: true },
      ],
    },
    {
      label: '附件',
      name: 'file',
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
          type: 'helpElderly/detailHelpElderlyInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          file: {
            url: data.attachmentInfo.url,
            uid: data.attachmentInfo.id,
            name: data.attachmentInfo.fileName,
            status: 'done',
          },
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

HelpElderlyForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.helpElderly,
}))(HelpElderlyForm);
