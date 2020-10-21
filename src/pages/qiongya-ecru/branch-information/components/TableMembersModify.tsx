import React from 'react';
import { connect } from 'umi';
import LgbSyncMultiSelect from '@/components/LgbSyncMultiSelect';

const TableCommunityMember = ({ dispatch, id }) => {
  // 获取支部成员
  const getMemberList = getMemberParams =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getPartyUserList',
        payload: { ...getMemberParams, id },
        resolve,
      });
    });
  const addMemberLgb = parme =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/addPartyUser',
        payload: { ...parme, partyId: id },
        resolve,
      });
    });
  const deleteMemberLgb = deleteMemberParam =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/deletePartyUser',
        payload: { ...deleteMemberParam, partyId: id },
        resolve,
      });
    });
  // 获取所以党员
  const getUsersNoParty = politicalStatusParam =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getUsersNoParty',
        payload: {
          ...politicalStatusParam,
        },
        resolve,
      });
    });

  return (
    <LgbSyncMultiSelect
      getLgbs={getMemberList}
      addLgb={addMemberLgb}
      deleteLgb={deleteMemberLgb}
      getSelectLgbs={getUsersNoParty}
    />
  );
};

export default connect(({ branchInformation }) => ({
  branchInformation,
}))(TableCommunityMember);
