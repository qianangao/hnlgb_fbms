import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions, Input, Upload, Button, Icon } from 'antd';
import { connect } from 'umi';
import LgbSelectInput from '@/components/LgbSelectInput';

const { TextArea } = Input;
const PhotoInfoForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '附件',
      name: 'fileIds',
      rules: [{ required: true, message: '请上传附件!' }],
      render: (
        // 附件上传-公共组件
        <Upload
          name="fileIds"
          action="global/uploadFile"
          method="post"
          onChange={() => {}}
          onRemove={() => {}}
        >
          <Button>
            <Icon type="upload" /> 上传附件
          </Button>
        </Upload>
      ),
    },
    {
      label: '描述',
      name: 'remark',
      rules: [{ required: true, message: '请输入描述!', whitespace: true }],
      render: <TextArea name="remark" placeholder="请输入描述" />,
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
