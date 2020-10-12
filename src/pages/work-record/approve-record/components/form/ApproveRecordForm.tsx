import React, { useEffect } from 'react';
import { connect } from 'umi';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions } from 'antd';
import LgbSelectInput from '@/components/LgbSelectInput';

const ApproveRecordForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '备案时间',
      name: 'recordDate',
      type: 'date',
    },
    {
      label: '备案事项',
      name: 'recordItems',
      enumsLabel: 'recordItems',
      rules: [{ required: true, message: '请选择备案事项!', whitespace: true }],
    },
    {
      label: '备注',
      name: 'remark',
    },
  ];

  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'wrApproveRecord/detailApproveRecord',
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
      <Descriptions title="审批备案" />
    </>
  );
  return id ? (
    <AdvancedForm form={form} loading={loading} fields={formItems} />
  ) : (
    <AdvancedForm form={form} loading={loading} fields={formItems} headerRender={selectLgbInput} />
  );
};

ApproveRecordForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.wrApproveRecord,
}))(ApproveRecordForm);
