import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';

import DetailTable from './DetailTable';
import SelectTable from './SelectTable';

const LgbSyncMultiSelect = ({
  orgTree = false,
  dispatch,
  addLgb,
  deleteLgb,
  getLgbs,
  getSelectLgbs,
  getSelectIds,
}) => {
  const selectRef = useRef({});
  const detailTableRef = useRef({});

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

  return (
    <>
      <DetailTable
        actionRef={detailTableRef}
        openAddModal={() => {
          selectRef.current.showModal();
        }}
        reloadDataHandler={reloadData}
        getLgbs={getLgbs}
        deleteLgb={deleteLgb}
      />
      <SelectTable
        actionRef={selectRef}
        orgTree={orgTree}
        addLgb={addLgb}
        reloadDataHandler={reloadData}
        checkedIds={checkedIds}
        getSelectLgbs={getSelectLgbs}
      />
    </>
  );
};

export default connect(({ global }) => ({
  enums: global.enums,
}))(LgbSyncMultiSelect);
