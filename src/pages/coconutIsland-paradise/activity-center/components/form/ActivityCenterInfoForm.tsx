import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const ActivityCenterInfoForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '活动中心名称',
      name: 'title',
      rules: [
        { required: true, message: '请输入活动中心名称!', whitespace: true },
        { max: 32, message: '活动中心名称请小于32位!', whitespace: true },
      ],
    },
    {
      label: '活动中心地址',
      name: 'coreAdd',
      type: 'input',
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '附件',
      name: 'file',
      type: 'upload',
      rules: [{ required: true, message: '请上传附件!' }],
    },
    {
      label: '缩略图',
      name: 'image',
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
          type: 'activityCenter/detailActivityCenterInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          file: {
            url: data.fileUrl,
            uid: data.id,
            name: data.fileName,
            status: 'done',
          },
          image: {
            url: data.url,
            uid: data.urlId,
            name: data.urlName,
            status: 'done',
          },
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

ActivityCenterInfoForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.activityCenter,
}))(ActivityCenterInfoForm);
