import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';

const WorksCornerForm = ({ id, loading, dispatch, form }) => {
  const formItems = [
    // 名称是否为选择
    {
      label: '标题',
      name: 'headline',
      rules: [
        { required: true, message: '请输入标题!', whitespace: true },
        { max: 128, message: '标题请小于128位!', whitespace: true },
      ],
    },
    {
      label: '作品类型',
      name: 'type',
      enumsLabel: 'type',
      rules: [{ required: true, message: '请选择作品类型!' }],
    },
    {
      label: '缩略图',
      name: 'attachmentInfo',
      type: 'image',
      rules: [{ required: true, message: '请上传图片!' }],
    },
    {
      label: '内容',
      name: 'context',
      span: 4,
      type: 'editor',
      rules: [{ required: true, message: '请输入作品内容!' }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'worksCorner/detailWorksCornerInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          attachmentInfo: {
            uid: data.attachmentInfo.id,
            name: data.attachmentInfo.fileName,
            url: data.attachmentInfo.url,
            status: 'done',
          },
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm loading={loading} fields={formItems} form={form} />;
};

WorksCornerForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.worksCorner,
}))(WorksCornerForm);
