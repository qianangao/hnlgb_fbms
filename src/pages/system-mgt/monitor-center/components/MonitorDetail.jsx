import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';

const MonitorDetail = ({ getRef, enums, getDetailData }) => {
  const personListColumns = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'index',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName' },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    { title: '出生日期', align: 'center', dataIndex: 'dateOfBirth', hideInSearch: true },
    {
      title: '民族',
      align: 'center',
      dataIndex: 'dictNation',
      valueEnum: enums.dictNation,
      hideInSearch: true,
    },
    {
      title: '政治面貌',
      align: 'center',
      dataIndex: 'dictPoliticalStatus',
      valueEnum: enums.dictPoliticalStatus,
      hideInSearch: true,
    },
    {
      title: '原工作单位及职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
      width: 255,
      hideInSearch: true,
    },
    { title: '联系电话', align: 'center', dataIndex: 'phonenumber', hideInSearch: true },
  ];

  const actionRef = useRef();
  const formRef = useRef();
  const [listTitle, setListTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (actionRef && typeof actionRef !== 'function') {
      getRef.current = {
        actionRef,
        formRef,
        showModal: item => {
          setListTitle(item.title);
          setModalVisible(true);
        },
      };
    }
  }, []);

  const closeDetailDataModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      title={listTitle}
      centered
      width="95vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modalVisible}
      destroyOnClose
      onCancel={closeDetailDataModal}
      footer={[
        <Button key="confirm" type="primary" onClick={closeDetailDataModal}>
          确认
        </Button>,
      ]}
    >
      <ProTable
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        request={params => getDetailData(params)}
        columns={personListColumns}
        pagination={{
          showSizeChanger: true,
        }}
      />
    </Modal>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(MonitorDetail);
