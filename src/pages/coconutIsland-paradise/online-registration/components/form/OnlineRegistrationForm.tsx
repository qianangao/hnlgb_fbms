import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { checkUrl } from '@/utils/validators';

const OnlineRegistrationForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '网络报名名称',
      name: 'title',
      rules: [
        { required: true, message: '请输入网络报名名称!', whitespace: true },
        { max: 32, message: '网络报名名称请小于32位!', whitespace: true },
      ],
    },
    {
      label: '网络报名地址',
      name: 'coreAdd',
      type: 'input',
      rules: [{ validator: checkUrl }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '附件',
      name: 'attachmentInfo',
      type: 'upload',
      rules: [{ required: true, message: '请上传附件!' }],
    },
    {
      label: '缩略图',
      name: 'attachmentInfo2',
      type: 'image',
      rules: [{ required: true, message: '请上传缩略图!' }],
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
          type: 'onlineRegistration/detailOnlineRegistrationInfo',
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
          attachmentInfo2: {
            uid: data.attachmentInfo2 && data.attachmentInfo2.id,
            name: data.attachmentInfo2 && data.attachmentInfo2.fileName,
            url: data.attachmentInfo2 && data.attachmentInfo2.url,
            status: 'done',
          },
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

OnlineRegistrationForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.onlineRegistration,
}))(OnlineRegistrationForm);
