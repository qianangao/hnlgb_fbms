import React, { useState, useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import { Radio } from 'antd';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';

const NoticeAnnouncementForm = ({ form, id, dispatch, loading }) => {
  const [receivedType, setReceivedType] = useState();
  const formItems = [
    {
      label: '通知主题',
      name: 'subject',
      rules: [{ required: true, message: '请输入通知主题!', whitespace: true }],
    },
    {
      label: '通知类型',
      name: 'dictNoticeType',
      enumsLabel: 'dictNoticeType',
      rules: [{ required: true, message: '请选择通知类型!', whitespace: true }],
    },
    {
      key: 'firstLine',
      type: 'segmentation',
    },
    {
      label: '接收方式',
      name: 'receivedType',
      rules: [{ required: true, message: '请选择接收方式!' }],
      render: (
        <Radio.Group>
          <Radio value={0}>单位</Radio>
          <Radio value={1}>个人</Radio>
        </Radio.Group>
      ),
    },
    {
      key: 'thirdlyLine',
      type: 'segmentation',
    },
    {
      label: '接收单位',
      name: 'orgList',
      rules: [{ required: true, message: '请选择接收单位!' }],
      render: <OrgMultiSelectInput />,
      visible: receivedType === 0,
    },
    {
      label: '接收人员',
      name: 'userList',
      rules: [{ required: true, message: '请选择接收人员!' }],
      render: <LgbMultiSelectInput />,
      visible: receivedType === 1,
    },
    {
      key: 'threeLine',
      type: 'segmentation',
    },
    {
      label: '附件',
      name: 'attachmentinfo',
      type: 'upload',
    },
    {
      key: 'fourLine',
      type: 'segmentation',
    },
    {
      label: '内容',
      name: 'content',
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
      span: 2,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'noticeAnnouncement/detailNoticeAnnouncement',
          payload: { id, isApp: 0 },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
          attachmentinfo:
            data.cephFile && data.cephFile.id && data.cephFile.fileName
              ? {
                  uid: data.cephFile.id,
                  name: data.cephFile.fileName,
                  url: data.cephFile.url,
                  status: 'done',
                }
              : null,
        };
        setReceivedType(fields.receivedType); // 接收类型初始化

        // 接收单位-数据转化
        if (fields.getOrgInformation) {
          const orgObj = JSON.parse(
            JSON.stringify(
              JSON.parse(JSON.stringify(fields.getOrgInformation).replace(/getOrgId/g, 'id')),
            ).replace(/getOrgName/g, 'name'),
          );
          form.setFieldsValue(fields);
          form.setFieldsValue({ orgList: orgObj });
        } else {
          form.setFieldsValue(fields);
        }

        // 接收人员-数据转化
        if (fields.getUserInformations) {
          const userObjs = JSON.parse(
            JSON.stringify(
              JSON.parse(JSON.stringify(fields.getUserInformations).replace(/getUserId/g, 'id')),
            ).replace(/getUserName/g, 'realName'),
          );
          form.setFieldsValue(fields);
          form.setFieldsValue({ userList: userObjs });
        } else {
          form.setFieldsValue(fields);
        }
      });
    }
  }, [id]);

  // 拿到-接收类型--0：按单位选  1：按人选
  const fieldChangeHander = (label, value) => {
    if (label === 'receivedType') {
      setReceivedType(value);
      form.setFieldsValue({ orgList: [] }); // 切换类型清空单位
      form.setFieldsValue({ userList: [] }); // 切换类型清空人员
    }
  };

  return (
    <>
      <AdvancedForm
        form={form}
        loading={loading}
        fields={formItems}
        fieldChange={fieldChangeHander}
      />
    </>
  );
};

NoticeAnnouncementForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.noticeAnnouncement,
}))(NoticeAnnouncementForm);
