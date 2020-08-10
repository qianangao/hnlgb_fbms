import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Cascader } from 'antd';
import { connect } from 'umi';
// import styles from './style.less';

const EnterpriseInfoForm = ({
  dispatch,
  returnworkPetitionDetails,
  returnworkGlobal,
  actionRef,
  loading,
  form,
}) => {
  const { enterpriseModalVisable } = returnworkPetitionDetails;
  const { organizations } = returnworkGlobal;

  const INIT_FORM_DATA = {
    businessLicenses: '', // 商铺名称
    creditCode: '', // 统一社会信用码
    personInCharge: '', // 负责人
    legalPersonIdCard: '', // 法人身份证
    phone: '', // 联系电话
    managementType: '', // 经营类型
    gridsGroup: '', // 所属网格联动数据
    businessAddress: '', // 经营地址
  };
  const [companyId, setCompanyId] = useState('');
  const [formData, setFormData] = useState(INIT_FORM_DATA);
  const [gridOptions, setGridOptions] = useState(organizations[0]);
  const [selectGrid, setSelectGrid] = useState([]); // 选择的网格联动数据

  const showModal = (id, detailData) => {
    const { regionId, committeesId, gridId, region, committees, grid } = detailData;
    setCompanyId(id);

    let gridsGroup = [];

    if (regionId && committeesId && gridId) {
      gridsGroup = [regionId, committeesId, gridId];

      setSelectGrid([
        { label: region, value: regionId },
        { label: committees, value: committeesId },
        { label: grid, value: gridId },
      ]);
    }

    setFormData({
      ...detailData,
      gridsGroup,
    });

    dispatch({
      type: 'returnworkPetitionDetails/changeEnterpriseModalVisable',
      payload: {
        visible: true,
      },
    });
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    dispatch({
      type: 'returnworkPetitionDetails/changeEnterpriseModalVisable',
      payload: {
        visible: false,
      },
    });
  };

  const handleOk = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const gridValue = {
          region: selectGrid[0].label,
          regionId: selectGrid[0].value,
          committees: selectGrid[1].label,
          committeesId: selectGrid[1].value,
          grid: selectGrid[2].label,
          gridId: selectGrid[2].value,
        };

        dispatch({
          type: 'returnworkPetitionDetails/editReturnworkEnterprise',
          payload: {
            ...values,
            ...gridValue,
            id: companyId,
          },
        });
      }
    });
  };

  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const gridDisplayRender = label => {
    if (!label.length || label.length < selectGrid.length) {
      if (selectGrid.length > 0) {
        return selectGrid.map(item => item.label).join(' / ');
      }
    }
    return label.join(' / ');
  };

  const onGridChange = (value, selectedOptions) => {
    setSelectGrid(selectedOptions);
  };

  const loadGridData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    dispatch({
      type: 'returnworkGlobal/getOrganization',
      payload: {
        id: targetOption.value,
      },
      callback: opts => {
        targetOption.loading = false;
        targetOption.children = opts;

        setGridOptions([...gridOptions]);
      },
    });
  };

  return (
    <Modal
      title="编辑商铺信息"
      width={640}
      visible={enterpriseModalVisable}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <Form {...formItemLayout}>
        <Form.Item label="商铺名称">
          {getFieldDecorator('businessLicenses', {
            initialValue: formData.businessLicenses || '',
            rules: [{ required: true, message: '请输入商铺名称!' }],
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="统一社会信用码">
          {getFieldDecorator('creditCode', {
            initialValue: formData.creditCode || '',
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: '请输入统一社会信用码!', whitespace: true },
              // { validator: checkCreditCode, },// TODO 用户体系问题，暂时禁止修改
            ],
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="负责人">
          {getFieldDecorator('personInCharge', {
            initialValue: formData.personInCharge || '',
            rules: [{ required: true, message: '请输入负责人名称!' }], // TODO 用户体系问题，暂时禁止修改
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="法人身份证">
          {getFieldDecorator('legalPersonIdCard', {
            initialValue: formData.legalPersonIdCard || '',
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: '请输入法人身份证号!', whitespace: true },
              // { validator: checkIdCard, }, // TODO 用户体系问题，暂时禁止修改
            ],
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="联系电话">
          {getFieldDecorator('phone', {
            initialValue: formData.phone || '',
            validateTrigger: 'onBlur',
            rules: [
              { required: true, message: '请输入联系电话!', whitespace: true },
              // { validator: checkPhone, },// TODO 用户体系问题，暂时禁止修改
            ],
          })(<Input disabled />)}
        </Form.Item>
        <Form.Item label="经营类型">
          {getFieldDecorator('managementType', {
            initialValue: formData.managementType || '',
            rules: [{ required: true, message: '请输入经营类型!' }],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="区块信息">
          {getFieldDecorator('gridsGroup', {
            initialValue: formData.gridsGroup || [],
            rules: [{ required: true, message: '请选择区块信息!' }],
          })(
            <Cascader
              options={gridOptions}
              loadData={loadGridData}
              onChange={onGridChange}
              displayRender={gridDisplayRender}
              changeOnSelect
            />,
          )}
        </Form.Item>
        <Form.Item label="经营地址">
          {getFieldDecorator('businessAddress', {
            initialValue: formData.businessAddress || '',
            rules: [{ required: true, message: '请输入经营地址!' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ returnworkPetitionDetails, returnworkGlobal, loading }) => ({
  returnworkPetitionDetails,
  returnworkGlobal,
  loading: loading.effects['returnworkPetitionDetails/editReturnworkEnterprise'],
}))(
  Form.create({
    name: 'enterprise-info-form',
  })(EnterpriseInfoForm),
);
