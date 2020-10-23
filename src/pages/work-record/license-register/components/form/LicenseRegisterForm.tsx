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

        data.passCheckPhoto &&
          (fields.passCheckPhoto = {
            url: data.passCheckPhoto.url,
            uid: data.passCheckPhoto.id,
            name: data.passCheckPhoto.fileName,
            status: 'done',
          });

        data.passportPhoto &&
          (fields.passportPhoto = {
            url: data.passportPhoto.url,
            uid: data.passportPhoto.id,
            name: data.passportPhoto.fileName,
            status: 'done',
          });
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
      name: 'id',
      hidden: true,
    },
    {
      label: '港澳台通行证照片',
      name: 'passCheckPhoto',
      type: 'image',
    },
    {
      label: '护照照片',
      name: 'passportPhoto',
      type: 'image',
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
