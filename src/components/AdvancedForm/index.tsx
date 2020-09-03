import React from 'react';
import { connect } from 'umi';
import { Form, Input, Select, Switch, DatePicker, TimePicker, Col, Row } from 'antd';

const AdvancedFormInstance = ({
  form,
  fields = [],
  headerRender,
  footerRender,
  initialValues,
  enums,
}) => {
  const renderField = field => {
    const { type, span = 1, render, enumsLabel, switchEnums, ...resField } = field;

    let fieldInput = <Input />;

    if (render) {
      fieldInput = render;
    } else if (enumsLabel) {
      fieldInput = (
        <Select>
          {enums[enumsLabel] &&
            Object.keys(enums[enumsLabel]).map(key => (
              <Select.Option key={key} value={key}>
                {enums[enumsLabel][key]}
              </Select.Option>
            ))}
        </Select>
      );
    } else if (type === 'date') {
      fieldInput = <DatePicker style={{ width: '100%' }} />;
    } else if (type === 'time') {
      fieldInput = <TimePicker style={{ width: '100%' }} />;
    } else if (type === 'switch') {
      resField.valuePropName = 'checked';

      if (switchEnums) {
        resField.getValueFromEvent = checked => (checked ? switchEnums[1] : switchEnums[0]);
        resField.getValueProps = value => ({ checked: value === switchEnums[1] });
      } else {
        resField.getValueFromEvent = checked => (checked ? 1 : 0);
        resField.getValueProps = value => ({ checked: value === 1 });
      }

      fieldInput = <Switch checkedChildren="是" unCheckedChildren="否" />;
    } else {
      fieldInput = <Input />;
    }

    return (
      <Col key={field.key || field.name} lg={12 * span} xl={8 * span} xxl={6 * span}>
        <Form.Item {...resField}>{fieldInput}</Form.Item>
      </Col>
    );
  };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      {headerRender || null}
      <Row gutter={24}>{fields.map(field => renderField(field) || null)}</Row>
      {footerRender || null}
    </Form>
  );
};

AdvancedFormInstance.useForm = Form.useForm;

const AdvancedForm = connect(({ global }) => ({
  enums: global.enums,
}))(AdvancedFormInstance);

export default AdvancedForm;
