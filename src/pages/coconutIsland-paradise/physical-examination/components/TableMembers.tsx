import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { Modal } from 'antd';
import AdvancedForm from '@/components/AdvancedForm';

const TableMembers = ({ opPhysicalExamination, enums, loading, dispatch, id }) => {
  const { membersTableRef } = opPhysicalExamination;
  const [form] = AdvancedForm.useForm();
  const [physicalModalVisible, setPhysicalModalVisible] = useState(false);
  const [userId, setUserId] = useState();

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName', hideInSearch: true },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    { title: '联系电话', align: 'center', dataIndex: 'phonenumber', hideInSearch: true },
    {
      title: '体检报告',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, Data) => [
        Data.isReport === 1 ? (
          <a key={`${Data.id}up`} onClick={() => window.open(Data.attachmentInfo.url)}>
            已上传 | 查看
          </a>
        ) : (
          <a
            key={`${Data.id}up`}
            onClick={() => {
              setPhysicalModalVisible(true);
              setUserId(Data.id);
            }}
          >
            未上传 | 点击上传
          </a>
        ),
      ],
    },
  ];
  const formItems = [
    {
      label: '体检报告',
      name: 'attachmentId',
      type: 'upload',
      rules: [{ required: true, message: '请上传体检报告!' }],
    },
  ];

  const getMemberList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'opPhysicalExamination/getMemberList',
        payload: { ...params, id },
        resolve,
      });
    });
  const hideModal = () => {
    setPhysicalModalVisible(false);
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `opPhysicalExamination/addPhysicalReport`,
            payload: {
              noticeId: id,
              userId,
              reportId: values.attachmentId ? values.attachmentId.uid : undefined,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch();
  };

  return (
    <>
      <ProTable
        headerTitle="报名列表"
        actionRef={membersTableRef}
        options={false}
        search={false}
        scroll={{ x: 'max-content' }}
        request={async params => getMemberList(params)}
        columns={columns}
      />
      <Modal
        title="上传体检报告"
        centered
        width="600px"
        style={{ paddingBottom: 0 }}
        bodyStyle={{
          height: '400px',
          overflow: 'auto',
        }}
        destroyOnClose
        onOk={handleOk}
        confirmLoading={loading}
        visible={physicalModalVisible}
        onCancel={hideModal}
      >
        <AdvancedForm form={form} loading={false} fields={formItems} />
      </Modal>
    </>
  );
};

export default connect(({ opPhysicalExamination, global, loading }) => ({
  opPhysicalExamination,
  enums: global.enums,
  loading: loading.effects['opPhysicalExamination/addPhysicalReport'],
}))(TableMembers);
