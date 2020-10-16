import React from 'react';
import { connect } from 'umi';
import LgbSyncMultiSelect from '@/components/LgbSyncMultiSelect';

const TableCommunityMember = ({ dispatch, id }) => {
  const getMemberList = getMemberParams =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getPartyUserList',
        payload: { ...getMemberParams, id },
        resolve,
      });
    });
  const addMemberLgb = addMemberParam =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/addPartyUser',
        payload: { id, ...addMemberParam },
        resolve,
      });
    });
  const deleteMemberLgb = deleteMemberParam =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/deletePartyUser',
        payload: { id, ...deleteMemberParam },
        resolve,
      });
    });

  return (
    <LgbSyncMultiSelect getLgbs={getMemberList} addLgb={addMemberLgb} deleteLgb={deleteMemberLgb} />
  );
};

export default connect(({ branchInformation }) => ({
  branchInformation,
}))(TableCommunityMember);
