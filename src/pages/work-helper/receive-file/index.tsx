import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import TableReceive from './components/TableReceive';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';

const ReceiveFile = ({ dispatch, tableRef }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  const [publishStatus, setPublishStatus] = useState(1);
  const [tableType, setTableType] = useState('send');
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictSex',
          'dictNation',
          'dictPoliticalStatus',
          'dictRetirementLevel',
          'dictRetirementType',
          'dictTreatmentNow',
        ],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'receiveFile/selectOrgChange',
      payload: orgId,
    });
  };
  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = ids => {
    modifyModelRef.current.showModal(ids);
  };
  const opendetailModal = ids => {
    detailModalRef.current.showModal(ids);
  };
  const onPublishStatusChange = changeStatus => {
    // 控制：新增、编辑按钮
    // changeStatus 0 草稿箱 ， 1 已发布
    setPublishStatus(changeStatus);
    tableRef.current.reload();
  };
  const onTabChange = id => {
    setTableType(id);
    tableRef.current.reload();
  };
  const tabs = [
    {
      id: 'send',
      label: '发送文件',
    },
    {
      id: 'receive',
      label: '接收文件',
    },
  ];
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout
        tabs={tabs}
        onTabChange={onTabChange}
        onPublishStatusChange={onPublishStatusChange}
        hidePublish={tableType !== 'send'}
      >
        {tableType === 'receive' ? (
          <TableReceive
            openAddModal={openAddModal}
            openModifyModal={openModifyModal}
            opendetailModal={opendetailModal}
            publishStatus={publishStatus}
            tableType={tableType === 'send' ? 0 : 1}
          />
        ) : (
          <Table
            openAddModal={openAddModal}
            openModifyModal={openModifyModal}
            opendetailModal={opendetailModal}
            publishStatus={publishStatus}
            tableType={tableType}
          />
        )}
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ receiveFile }) => ({
  receiveFile,
  tableRef: receiveFile.tableRef,
}))(ReceiveFile);
