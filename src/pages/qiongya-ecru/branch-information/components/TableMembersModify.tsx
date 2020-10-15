import React from 'react';
import { connect } from 'umi';
import LgbSyncMultiSelect from '@/components/LgbSyncMultiSelect';

const TableCommunityMember = ({ dispatch, id }) => {
  const getMemberList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getPartyUserList',
        payload: { ...params, id },
        resolve,
      });
    });
  const addLgb = param =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/addPartyUser',
        payload: { clubId: id, ...param },
        resolve,
      });
    });

  return <LgbSyncMultiSelect getLgbs={getMemberList} addLgb={addLgb} />;
};

export default connect(({ branchInformation }) => ({
  branchInformation,
}))(TableCommunityMember);
