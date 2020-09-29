import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import ModifyModal from './components/ModifyModal';
// import SelectModal from './components/SelectModal';
import AddModal from './components/AddModal';
import Table from './components/Table';
import DetailModal from './components/DetailModal';

const OnlineRegistrationInfo = ({ dispatch, tableRef }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  // const selectModalRef = useRef({});
  const [publishStatus, setPublishStatus] = useState(1);
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictSex'],
      },
    });
  }, []);

  const orgChangeHander = orgId => {
    dispatch({
      type: 'onlineRegistration/selectOrgChange',
      payload: orgId,
    });
  };

  const openAddModal = item => {
    addModelRef.current.showModal(item);
  };
  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };
  const openDetailModal = item => {
    detailModalRef.current.showModal(item);
  };
  // const openSelectModal = item => {
  //   selectModalRef.current.showModal(item);
  // };
  const onPublishStatusChange = statusChange => {
    // 控制：新增、编辑按钮
    // publishStatus 0 草稿箱 ， 1 已发布
    setPublishStatus(statusChange);
    tableRef.current.reload();
  };
  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout onPublishStatusChange={onPublishStatusChange}>
        <Table
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          openDetailModal={openDetailModal}
          // openSelectModal={openSelectModal}
          publishStatus={publishStatus}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
      {/* <SelectModal actionRef={selectModalRef} /> */}
    </OrgTreeLayout>
  );
};

export default connect(({ onlineRegistration }) => ({
  tableRef: onlineRegistration.tableRef,
}))(OnlineRegistrationInfo);
