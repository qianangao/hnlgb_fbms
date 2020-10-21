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
  // 获取所以党员
  const getPoliticalStatusLgbs = politicalStatusParam =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/politicalStatusLgbs',
        payload: {
          ...politicalStatusParam,
          current: 1,
          pageSize: 20,
          currentPage: 1,
          dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283',
        },
        resolve,
      });
    });
  return (
    <LgbSyncMultiSelect
      getLgbs={getMemberList}
      addLgb={addMemberLgb}
      deleteLgb={deleteMemberLgb}
      getSelectLgbs={getPoliticalStatusLgbs}
    />
  );
};

export default connect(({ branchInformation }) => ({
  branchInformation,
}))(TableCommunityMember);
