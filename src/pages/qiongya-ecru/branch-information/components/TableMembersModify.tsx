import { message } from 'antd';
import React from 'react';
import { connect } from 'umi';
import PartyLgbSyncMultiSelect from '@/components/PartyLgbSyncMultiSelect';

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
  const addMemberLgb = params =>
    new Promise(resolve => {
      if (params.userIds.length === 0) {
        message.error('请选择人员');
      } else {
        dispatch({
          type: 'branchInformation/addPartyUser',
          payload: { ...params, partyId: id, dictPartyUserRole: '8adcf7cc77faf37a0177faf530ca' },
          resolve,
        });
      }
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
  // const getUsersNoParty = politicalStatusParam =>
  //   new Promise(resolve => {
  //     dispatch({
  //       type: 'branchInformation/getUsersNoParty',
  //       payload: {
  //         ...politicalStatusParam,
  //       },
  //       resolve,
  //     });
  //   });
  const getLgbOuterList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getLgbOuterList',
        payload: { ...params, partyId: id },
        resolve,
      });
    });
  const addLgbOuter = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/addLgbOuter',
        payload: { ...params, partyId: id },
        resolve,
      });
    });
  const updateLgbOuter = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/updateLgbOuter',
        payload: { ...params },
        resolve,
      });
    });
  const deleteLgbOuter = deleteMemberParam =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/deleteLgbOuter',
        payload: { ...deleteMemberParam },
        resolve,
      });
    });

  return (
    <PartyLgbSyncMultiSelect
      getLgbs={getMemberList}
      getLgbsOuter={getLgbOuterList}
      addLgb={addMemberLgb}
      addLgbOuter={addLgbOuter}
      deleteLgb={deleteMemberLgb}
      updateLgbOuter={updateLgbOuter}
      deleteLgbOuter={deleteLgbOuter}
      // getSelectLgbs={getUsersNoParty}
    />
  );
};

export default connect(({ branchInformation, global }) => ({
  branchInformation,
  enums: global.enums,
}))(TableCommunityMember);
