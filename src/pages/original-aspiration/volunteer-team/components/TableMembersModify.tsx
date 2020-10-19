import React from 'react';
import { connect } from 'umi';
import LgbSyncMultiSelect from '@/components/LgbSyncMultiSelect';

const TableMember = ({ dispatch, id }) => {
  const getMemberList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaVolunteerTeam/getMemberList',
        payload: { ...params, teamId: id },
        resolve,
      });
    });
  const getMemberIds = () =>
    new Promise(resolve => {
      dispatch({
        type: 'oaVolunteerTeam/getMemberIds',
        payload: { teamId: id },
        resolve,
      });
    });
  const addLgb = param =>
    new Promise(resolve => {
      dispatch({
        type: 'oaVolunteerTeam/addMember',
        payload: { teamId: id, ...param },
        resolve,
      });
    });
  const deleteLgb = param =>
    new Promise(resolve => {
      dispatch({
        type: 'oaVolunteerTeam/deleteMember',
        payload: { teamId: id, ...param },
        resolve,
      });
    });

  return (
    <LgbSyncMultiSelect
      getLgbs={getMemberList}
      getSelectIds={getMemberIds}
      addLgb={addLgb}
      deleteLgb={deleteLgb}
    />
  );
};

export default connect(({ oaVolunteerTeam }) => ({
  oaVolunteerTeam,
}))(TableMember);
