import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import TypeSelectLayout from '@/layouts/TypeSelectLayout';
import AddModal from './components/AddModal';
import Table from './components/Table';
import ModifyModal from './components/ModifyModal';
import DetailModal from './components/DetailModal';

const NewsDynamic = ({ dispatch, tableRef }) => {
  const addModelRef = useRef({});
  const modifyModelRef = useRef({});
  const detailModalRef = useRef({});
  const [publishStatus, setPublishStatus] = useState(1);
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
      type: 'pictureNews/selectOrgChange',
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

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <TypeSelectLayout onPublishStatusChange={onPublishStatusChange}>
        <Table
          openAddModal={openAddModal}
          openModifyModal={openModifyModal}
          opendetailModal={opendetailModal}
          publishStatus={publishStatus}
        />
      </TypeSelectLayout>
      <AddModal actionRef={addModelRef} />
      <ModifyModal actionRef={modifyModelRef} />
      <DetailModal actionRef={detailModalRef} />
    </OrgTreeLayout>
  );
};

export default connect(({ pictureNews }) => ({
  pictureNews,
  tableRef: pictureNews.tableRef,
}))(NewsDynamic);
