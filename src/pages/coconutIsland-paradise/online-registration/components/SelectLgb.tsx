import React from 'react';
import { connect } from 'umi';
import LgbSyncMultiSelect from '@/components/LgbSyncMultiSelect';

const SelectLgb = ({ id, dispatch }) => {
  const getMemberList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'onlineRegistration/getMemberList',
        payload: { ...params, activityId: id },
        resolve,
      });
    });

  const getMemberIds = () =>
    new Promise(resolve => {
      dispatch({
        type: 'onlineRegistration/getMemberIds',
        payload: { activityId: id },
        resolve,
      });
    });
  const addLgb = value =>
    new Promise(resolve => {
      dispatch({
        type: 'onlineRegistration/addMember',
        payload: { activityId: id, ...value },
        resolve,
      });
    });
  const deleteLgb = param =>
    new Promise(resolve => {
      dispatch({
        type: 'onlineRegistration/deleteMember',
        payload: { activityId: id, ...param },
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

export default connect(({ onlineRegistration }) => ({
  onlineRegistration,
}))(SelectLgb);
