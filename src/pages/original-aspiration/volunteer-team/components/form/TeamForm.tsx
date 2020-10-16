import React, { useEffect } from 'react';
import { TreeSelect } from 'antd';

import AdvancedForm from '@/components/AdvancedForm';
import { connect } from 'umi';

const { TreeNode } = TreeSelect;

const TeamForm = ({ form, id, dispatch, loading }) => {
  const formItems = [
    {
      label: '团队名称',
      name: 'teamName',
      span: 2,
      rules: [{ required: true, message: '请输入标题!', whitespace: true }],
    },
    {
      label: '团队类型',
      name: 'teamType',
      rules: [{ required: true, message: '请选择团队类型!' }],
      render: (
        <TreeSelect style={{ width: '100%' }} allowClear multiple treeDefaultExpandAll>
          <TreeNode value="1" title="基本志愿团队" selectable={false}>
            <TreeNode value="1-1" title="党内关怀" />
            <TreeNode value="1-2" title="联系群众" />
          </TreeNode>
          <TreeNode value="2" title="专项志愿服务" selectable={false}>
            <TreeNode value="2-1" title="红色传承" selectable={false}>
              <TreeNode value="2-1-1" title="红色宣传" />
              <TreeNode value="2-1-2" title="党建指导" />
              <TreeNode value="2-1-3" title="成长关爱" />
            </TreeNode>
            <TreeNode value="2-2" title="文明引导" selectable={false}>
              <TreeNode value="2-2-1" title="交通疏导" />
              <TreeNode value="2-2-2" title="卫生整治" />
              <TreeNode value="2-2-3" title="生态保护" />
            </TreeNode>
            <TreeNode value="2-3" title="专业帮扶" selectable={false}>
              <TreeNode value="2-3-1" title="科技下乡" />
              <TreeNode value="2-3-2" title="法律援助" />
              <TreeNode value="2-3-3" title="义诊咨询" />
            </TreeNode>
            <TreeNode value="2-4" title="乐龄共享" selectable={false}>
              <TreeNode value="2-4-1" title="消费扶贫" />
              <TreeNode value="2-4-2" title="文墨传香" />
              <TreeNode value="2-4-3" title="文体展演" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      ),
    },
    {
      label: '团队负责人',
      name: 'chargePerson',
      rules: [{ required: true, message: '请输入团队负责人!', whitespace: true }],
    },
    {
      label: '联系电话',
      name: 'phoneNumber',
      rules: [{ required: true, message: '请输入联系电话!', whitespace: true }],
    },
    {
      label: '成立时间',
      name: 'createDate',
      type: 'date',
      rules: [{ required: true, message: '请选择成立时间!', whitespace: true }],
    },
    {
      label: '团队简介',
      name: 'teamContext',
      type: 'editor',
      rules: [{ required: true, message: '请输入团队简介!', whitespace: true }],
      span: 4,
    },
  ];
  useEffect(() => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'oaVolunteerTeam/detailTeam',
          payload: { id },
          resolve,
        });
      }).then(data => {
        const fields = {
          ...data,
        };
        form.setFieldsValue(fields);
      });
    }
  }, [id]);

  return <AdvancedForm form={form} loading={loading} fields={formItems} />;
};

TeamForm.useForm = AdvancedForm.useForm;

export default connect(({ loading }) => ({
  loading: loading.models.oaVolunteerTeam,
}))(TeamForm);