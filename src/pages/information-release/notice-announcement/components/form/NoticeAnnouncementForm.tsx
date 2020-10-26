import React, { useState, useEffect } from 'react';
import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';
import { Radio } from 'antd';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';
import OrgMultiSelectInput from '@/components/OrgMultiSelectInput';

const NoticeAnnouncementForm = ({ form, id, dispatch, loading, getUserId, receivedTypeFn }) => {
  const [receivedType, setReceivedType] = useState('false');
  const [userObj, setUserObj] = useState([]);
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
      rules: [{ required: true, message: '请输入通知主题!', whitespace: true }],
    },
    {
      label: '附件',
      name: 'attachmentId',
      type: 'upload',
    },
    {
      key: 'thirdlyLine',
      type: 'segmentation',
    },
    {
      label: '内容',
      name: 'content',
      type: 'editor',
      rules: [{ required: true, message: '请输入内容!', whitespace: true }],
      span: 2,
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
      key: 'threeLine',
      type: 'segmentation',
    },
    {
      label: receivedType === 0 ? '接收单位' : null,
      name: 'orgList',
      rules: [{ required: receivedType === 0, message: '请选择接收单位!' }],
      render: receivedType === 0 ? <OrgMultiSelectInput /> : <span style={{ display: 'none' }} />,
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
          attachmentId:
            data.cephFile && data.cephFile.id && data.cephFile.fileName
              ? {
                  uid: data.cephFile.id,
                  name: data.cephFile.fileName,
                  url: data.cephFile.fileUrl,
                  status: 'done',
                }
              : null,
        };
        setReceivedType(fields.receivedType); // 接收类型

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
          setUserObj(userObjs);
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
      form.setFieldsValue({ orgList: [] }); // 切换类型清空
      setUserObj([]);
      receivedTypeFn(value); // 接收类型
    }
  };

  // 拿到-选择人员id
  const onChange = keys => {
    getUserId(keys);
    setUserObj(keys);
  };

  return (
    <>
      <AdvancedForm
        form={form}
        loading={loading}
        fields={formItems}
        fieldChange={fieldChangeHander}
      />
      {receivedType === 1 ? <LgbMultiSelectInput onChange={onChange} value={userObj} /> : null}
    </>
  );
};

NoticeAnnouncementForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.noticeAnnouncement,
}))(NoticeAnnouncementForm);
