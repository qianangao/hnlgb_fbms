import React from 'react';
import { connect } from 'umi';
import LgbSyncMultiSelect from '@/components/LgbSyncMultiSelect';

const TableCommunityMember = ({ dispatch, id }) => {
  // 获取-学习记录成员
  const getMemberList = getMemberParams =>
    new Promise(resolve => {
      dispatch({
        type: 'studyRecord/getStudyRecordUser',
        payload: { ...getMemberParams, id },
        resolve,
      });
    });
  const addMemberLgb = parme =>
    new Promise(resolve => {
      dispatch({
        type: 'studyRecord/addStudyRecordUser',
        payload: { ...parme, learnId: id },
        resolve,
      });
    });
  const deleteMemberLgb = deleteMemberParam =>
    new Promise(resolve => {
      dispatch({
        type: 'studyRecord/deleteStudyRecordUser',
        payload: { ...deleteMemberParam, partyId: id },
        resolve,
      });
    });
  const getMemberIds = () =>
    new Promise(resolve => {
      dispatch({
        type: 'studyRecord/getMemberIds',
        payload: { id },
        resolve,
      });
    });
  return (
    <LgbSyncMultiSelect
      getLgbs={getMemberList}
      addLgb={addMemberLgb}
      deleteLgb={deleteMemberLgb}
      getSelectIds={getMemberIds}
    />
  );
};

export default connect(({ studyRecord }) => ({
  studyRecord,
}))(TableCommunityMember);
