import React, { useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { Form, Descriptions } from 'antd';
import { connect } from 'umi';
import moment from 'moment';
import LgbSelectInput from '@/components/LgbSelectInput';

const VisitForm = ({ form, id, dispatch, loading, tableType }) => {
  const disabledDate = current => {
    return current && current > moment().endOf('day');
  };
  const formItems1 = [
    {
      label: '看望时间',
      name: 'time',
      type: 'date',
      extraProps: {
        disabledDate,
      },
      rules: [{ required: true, message: '请选择时间!' }],
    },
    {
      label: tableType === '生日看望' ? '看望地点' : '看望医院',
      name: 'address',
      rules: [
        { max: 64, message: `${tableType === '生日看望' ? '看望地点' : '看望医院'}不超过64个字` },
      ],
    },
    {
      label: '看望领导',
      name: 'leader',
      rules: [{ max: 64, message: `看望领导不超过64个字` }],
    },
    {
      label: '陪同人员',
      name: 'entourage',
      rules: [{ max: 64, message: `陪同人员不超过64个字` }],
    },

    {
      label: '慰问品',
      name: 'consolationGoods',
      rules: [{ max: 64, message: `慰问品不超过64个字` }],
    },
    {
      label: '老同志反馈信息',
      name: 'feedback',
      type: 'textarea',
    },
    {
      label: '照片信息',
      name: 'picAttachmentInfo',
      type: 'image',
    },
  ];
  const formItems2 = [
    {
      label: tableType === '日常走访' ? '走访时间' : '慰问时间',
      name: 'time',
      type: 'date',
      rules: [{ required: true, message: '请选择时间!' }],
    },
    {
      label: tableType === '日常走访' ? '走访地点' : '慰问地点',
      name: 'address',
      rules: [
        { max: 64, message: `${tableType === '日常走访' ? '走访地点' : '慰问地点'}不超过64个字` },
      ],
    },
    {
      label: tableType === '日常走访' ? '走访领导' : '慰问领导',
      name: 'leader',
      rules: [
        { max: 64, message: `${tableType === '日常走访' ? '走访领导' : '慰问领导'}不超过64个字` },
      ],
    },
    {
      label: '陪同人员',
      name: 'entourage',
      rules: [{ max: 64, message: `陪同人员不超过64个字` }],
    },

    {
      label: '慰问品',
      name: 'consolationGoods',
      rules: [{ max: 64, message: `慰问品不超过64个字` }],
    },
    {
      label: '照片信息',
      name: 'picAttachmentInfo',
      type: 'image',
    },
  ];
  const getMemberList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'wrVisitsCondolences/getDeathMemberList',
        payload: { ...params },
        resolve,
      });
    });
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
          picAttachmentInfo:
            data.picAttachmentInfo && data.picAttachmentInfo.id
              ? {
                  uid: data.picAttachmentInfo.id,
                  name: data.picAttachmentInfo.fileName,
                  url: data.picAttachmentInfo.url,
                  status: 'done',
                }
              : null,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  const selectLgbInput = (
    // 显示老干部信息-公共组件
    <>
      <Form.Item name="userId" rules={[{ required: true, message: '请选择老干部!' }]}>
        {tableType === '遗属慰问' ? (
          <LgbSelectInput getLgbs={getMemberList} selectItem />
        ) : (
          <LgbSelectInput />
        )}
      </Form.Item>
      <Descriptions title={`${tableType}详情`} />
    </>
  );

  return id ? (
    <AdvancedForm
      form={form}
      loading={loading}
      fields={tableType === '生日看望' || tableType === '住院看望' ? formItems1 : formItems2}
    />
  ) : (
    <AdvancedForm
      form={form}
      loading={loading}
      fields={tableType === '生日看望' || tableType === '住院看望' ? formItems1 : formItems2}
      headerRender={selectLgbInput}
    />
  );
};

VisitForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.wrVisitsCondolences,
}))(VisitForm);
