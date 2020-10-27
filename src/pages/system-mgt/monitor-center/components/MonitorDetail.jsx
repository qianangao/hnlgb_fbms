import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import styles from '../style.less';

const MonitorDetail = ({ getRef, getDetailData }) => {
  const personListColumns = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'index',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', dataIndex: 'realName' },
    { title: '性别', dataIndex: 'dictSexRemarks', hideInSearch: true },
    { title: '出生日期', dataIndex: 'dateOfBirth', hideInSearch: true },
    { title: '民族', dataIndex: 'dictNationRemarks', hideInSearch: true },
    { title: '政治面貌', dataIndex: 'dictPoliticalStatusRemarks', hideInSearch: true },
    {
      title: '原工作单位及职务',
      dataIndex: 'originalUnitAndPosition',
      width: 255,
      hideInSearch: true,
    },
    { title: '联系电话', dataIndex: 'phonenumber', hideInSearch: true },
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
        className={styles.countDetail}
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

export default MonitorDetail;
