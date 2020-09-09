import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions } from 'antd';
import { connect } from 'umi';
import LgbSelectInput from '@/components/LgbSelectInput';

const PhotoInfoForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      name: 'id',
      hidden: true,
    },
    {
      label: '附件',
      name: 'file',
      type: 'image',
      rules: [{ required: true, message: '请上传附件!' }],
    },
    {
      label: '描述',
      name: 'remark',
      type: 'textarea',
      rules: [{ required: true, message: '请输入描述!', whitespace: true }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'photoInfo/detailPhotoInfo',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          file: {
            uid: data.fileId,
            name: data.fileName,
            url: data.fileUrl,
            status: 'done',
          },
        };

        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  const selectLgbInput = (
    // 显示老干部信息-公共组件
    <>
      <Form.Item name="userId" rules={[{ required: true, message: '请选择老干部!' }]}>
        <LgbSelectInput />
      </Form.Item>
      <Descriptions title="照片信息" />
    </>
  );

  return id ? (
    <AdvancedForm form={form} loading={loading} fields={formItems} />
  ) : (
    <AdvancedForm form={form} loading={loading} fields={formItems} headerRender={selectLgbInput} />
  );
};

PhotoInfoForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.photoInfo,
}))(PhotoInfoForm);
