import React from 'react';
import { connect } from 'umi';
import LgbSyncMultiSelect from '@/components/LgbSyncMultiSelect';

const TableCommunityMember = ({ dispatch, id }) => {
  const getMemberList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCommunity/getMemberList',
        payload: { ...params, clubId: id },
        resolve,
      });
    });
  const getMemberIds = () =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCommunity/getMemberIds',
        payload: { clubId: id },
        resolve,
      });
    });
  const addLgb = param =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCommunity/addMember',
        payload: { clubId: id, ...param },
        resolve,
      });
    });

  return <LgbSyncMultiSelect getLgbs={getMemberList} getSelectIds={getMemberIds} addLgb={addLgb} />;
};

export default connect(({ oaCommunity }) => ({
  oaCommunity,
}))(TableCommunityMember);
