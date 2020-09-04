import React from 'react';
import { connect } from 'umi';
import { Form, Input, Select, Switch, DatePicker, TimePicker, Col, Row, Spin } from 'antd';
import { formatDate } from '@/utils/format';

const AdvancedFormInstance = ({
  form,
  fields = [],
  headerRender,
  footerRender,
  initialValues,
  enums,
  loading,
}) => {
  const renderField = field => {
    const {
      type,
      span = 1,
      render,
      enumsLabel,
      switchEnums,
      hidden,
      disabled,
      ...resField
    } = field;

    let fieldInput = <Input disabled={disabled} />;

    if (hidden) {
      return (
        <Form.Item hidden {...resField}>
          {fieldInput}
        </Form.Item>
      );
    }

    if (render) {
      fieldInput = render;
    } else if (enumsLabel) {
      fieldInput = (
        <Select disabled={disabled}>
          {enums[enumsLabel] &&
            Object.keys(enums[enumsLabel]).map(key => (
              <Select.Option key={key} value={key}>
                {enums[enumsLabel][key]}
              </Select.Option>
            ))}
        </Select>
      );
    } else if (type === 'date') {
      resField.valuePropName = 'value';
      resField.getValueFromEvent = value => (value ? value.format('YYYY-MM-DD') : '');
      resField.getValueProps = str => ({ value: formatDate(str) });

      fieldInput = <DatePicker disabled={disabled} style={{ width: '100%' }} format="YYYY-MM-DD" />;
    } else if (type === 'time') {
      resField.valuePropName = 'value';
      resField.getValueFromEvent = value => (value ? value.format('HH:mm:ss') : '');
      resField.getValueProps = str => ({ value: formatDate(str) });

      fieldInput = <TimePicker disabled={disabled} style={{ width: '100%' }} format="HH:mm:ss" />;
    } else if (type === 'switch') {
      resField.valuePropName = 'checked';

      if (switchEnums) {
        resField.getValueFromEvent = checked => (checked ? switchEnums[1] : switchEnums[0]);
        resField.getValueProps = value => ({ checked: value === switchEnums[1] });
      } else {
        resField.getValueFromEvent = checked => (checked ? 1 : 0);
        resField.getValueProps = value => ({ checked: value === 1 });
      }

      fieldInput = <Switch disabled={disabled} checkedChildren="是" unCheckedChildren="否" />;
    } else {
      fieldInput = <Input disabled={disabled} />;
    }

    return (
      <Col key={field.key || field.name} lg={12 * span} xl={8 * span} xxl={6 * span}>
        <Form.Item {...resField}>{fieldInput}</Form.Item>
      </Col>
    );
  };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      <Spin spinning={loading}>
        {headerRender || null}
        <Row gutter={24}>{fields.map(field => renderField(field) || null)}</Row>
        {footerRender || null}
      </Spin>
    </Form>
  );
};

AdvancedFormInstance.useForm = Form.useForm;

const AdvancedForm = connect(({ global }) => ({
  enums: global.enums,
}))(AdvancedFormInstance);

export default AdvancedForm;
