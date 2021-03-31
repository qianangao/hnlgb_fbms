import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import DetailTable from './DetailTable';
import SelectTable from './SelectTable';
import MemberModifyModal from './MemberModifyModal';

const PartyLgbSyncMultiSelect = ({
  orgTree = false,
  dispatch,
  addLgb,
  deleteLgb,
  getLgbs,
  getLgbsOuter,
  updateLgbOuter,
  deleteLgbOuter,
  addLgbOuter,
  getSelectLgbs,
  getSelectIds,
}) => {
  // console.log('getLgbsOuter2', getLgbsOuter);
  const selectRef = useRef({});
  const detailTableRef = useRef({});
  const memberModifyModelRef = useRef({});
  const [checkedIds, setCheckedIds] = useState([]);
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [
          'dictSex',
          'dictNation',
          'dictRetirementType',
          'dictPoliticalStatus',
          'dictTreatmentNow',
          'dictPartyUserCategory', // 人员分类
          'dictPartyUserRole', // 人员角色
        ],
      },
    });

    getCheckedIds();
  }, []);

  const getCheckedIds = () => {
    getSelectIds &&
      getSelectIds().then(data => {
        setCheckedIds(data);
      });
  };
  const reloadData = () => {
    detailTableRef.current.reload();
    getCheckedIds();
  };
  const openMemberModifyModel = (item, type) => {
    memberModifyModelRef.current.showModal(item, type);
  };

  return (
    <>
      <DetailTable
        actionRef={detailTableRef}
        openAddModal={() => {
          selectRef.current.showModal();
        }}
        openMemberModifyModel={openMemberModifyModel}
        reloadDataHandler={reloadData}
        getLgbs={getLgbs}
        getLgbsOuter={getLgbsOuter}
        deleteLgb={deleteLgb}
        deleteLgbOuter={deleteLgbOuter}
      />
      <SelectTable
        actionRef={selectRef}
        orgTree={orgTree}
        addLgb={addLgb}
        reloadDataHandler={reloadData}
        checkedIds={checkedIds}
        getSelectLgbs={getSelectLgbs}
      />
      <MemberModifyModal
        actionRef={memberModifyModelRef}
        reloadDataHandler={reloadData}
        addLgbOuter={addLgbOuter}
        updateLgbOuter={updateLgbOuter}
      />
    </>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(PartyLgbSyncMultiSelect);
