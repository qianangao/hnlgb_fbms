import React from 'react';
import { connect } from 'umi';
import LgbMultiSelectInput from '@/components/LgbMultiSelectInput';

const TableCommunityMember = ({ dispatch, id }) => {
  // 获取-当前支部人员列表
  const getPoliticalStatusLgbs = getMemberParams =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getPartyUserList',
        payload: { ...getMemberParams, id },
        resolve,
      });
    });
  const onChange = keys => {
    return keys;
  };
  return <LgbMultiSelectInput getUrl={getPoliticalStatusLgbs} onChange={onChange} />;
};

export default connect(({ branchInformation }) => ({
  branchInformation,
}))(TableCommunityMember);
