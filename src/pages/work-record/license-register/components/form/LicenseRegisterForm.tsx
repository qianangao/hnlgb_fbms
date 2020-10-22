import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions } from 'antd';
import { connect } from 'umi';
import LgbSelectInput from '@/components/LgbSelectInput';

const LicenseRegisterFrom = ({ form, id, dispatch, loading }) => {
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'licenseRegister/detailLicenseRegisterInfo',
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
  const selectLgbInput = (
    // 显示老干部信息-公共组件
    <>
      <Form.Item name="userId" rules={[{ required: true, message: '请选择老干部!' }]}>
        <LgbSelectInput />
      </Form.Item>
      <Descriptions title="证照登记" />
    </>
  );
  const formItems = [
    {
      label: '港澳台通行证照片id',
      name: 'passCheckPhotoId',
      rules: [{ required: true, message: '港澳台通行证照片id!' }],
    },
    {
      label: '港澳台通行证照片名字',
      name: 'passportPhotoFileName',
      rules: [{ required: true, message: '港澳台通行证照片id!' }],
    },
    {
      label: '附件',
      name: 'file',
      type: 'image',
      rules: [{ required: true, message: '请上传附件!' }],
    },
    {
      label: '护照照片id',
      name: 'passportPhotoId',
      rules: [{ required: false, message: '护照照片id!' }],
    },
    {
      label: '护照照片名字',
      name: 'passportPhotoFileName',
      rules: [{ required: true, message: '港澳台通行证照片id!' }],
    },
    {
      label: '附件',
      name: 'file',
      type: 'image',
      rules: [{ required: true, message: '请上传附件!' }],
    },
  ];
  return id ? (
    <AdvancedForm form={form} fields={formItems} loading={loading} />
  ) : (
    <AdvancedForm form={form} loading={loading} headerRender={selectLgbInput} fields={formItems} />
  );
};

LicenseRegisterFrom.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.licenseRegister,
}))(LicenseRegisterFrom);
