import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions } from 'antd';
import { connect } from 'umi';
import LgbSelectInput from '@/components/LgbSelectInput';

const StatisticsForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '慰问时间',
      name: 'time',
      type: 'date',
      rules: [{ required: true, message: '请选择慰问时间!' }],
    },
    {
      label: '慰问地点',
      name: 'address',
    },
    {
      label: '慰问领导',
      name: 'leader',
    },
    {
      label: '陪同人员',
      name: 'entourage',
    },

    {
      label: '慰问品',
      name: 'consolationGoods',
    },
    {
      label: '照片信息',
      name: 'photoAttachmentId',
      type: 'image',
      rules: [{ required: true, message: '请上传照片信息!' }],
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: `wrVisitsCondolences/detailVisit`,
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
      <Descriptions title="慰问详情" />
    </>
  );

  return id ? (
    <AdvancedForm form={form} loading={loading} fields={formItems} />
  ) : (
    <AdvancedForm form={form} loading={loading} fields={formItems} headerRender={selectLgbInput} />
  );
};

StatisticsForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.wrVisitsCondolences,
}))(StatisticsForm);
