import { Input, Form } from 'antd';
import React from 'react'; // useCallback
// 暂无验证码
// import omit from 'omit.js';
// import { getFakeCaptcha } from '@/services/login';

import ItemMap from './map';
import LoginContext from './LoginContext';

const FormItem = Form.Item;

const getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }) => {
  const options = {
    rules: rules || customProps.rules,
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const LoginItem = props => {
  // const [count, setCount] = useState(props.countDown || 0);
  // const [timing, setTiming] = useState(false);
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabutil
  const {
    customProps,
    name,
    // getCaptchaButtonText,
    // getCaptchaSecondText,
    // updateActive,
    // type,
    // tabutil,
    ...restProps
  } = props;

  // 暂无验证码
  // const onGetCaptcha = useCallback(async mobile => {
  //   const result = await getFakeCaptcha(mobile);
  //   if (result === false) {
  //     return;
  //   }
  //   message.success('获取验证码成功！');
  //   setTiming(true);
  // }, []);

  // 验证码倒计时
  // useEffect(() => {
  //   let interval = 0;
  //   const { countDown } = props;
  //   if (timing) {
  //     interval = window.setInterval(() => {
  //       setCount(preSecond => {
  //         if (preSecond <= 1) {
  //           setTiming(false);
  //           clearInterval(interval);
  //           // 重置秒数
  //           return countDown || 60;
  //         }
  //         return preSecond - 1;
  //       });
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [timing]);

  if (!name) {
    return null;
  }
  // get getFieldDecorator props
  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  // 暂无验证码
  // if (type === 'Captcha') {
  //   const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

  //   return (
  //     <FormItem shouldUpdate noStyle>
  //       {({ getFieldValue }) => (
  //         <Row gutter={8}>
  //           <Col span={16}>
  //             <FormItem name={name} {...options}>
  //               <Input {...customProps} {...inputProps} />
  //             </FormItem>
  //           </Col>
  //           <Col span={8}>
  //             <Button
  //               disabled={timing}
  //               className={styles.getCaptcha}
  //               size="large"
  //               onClick={() => {
  //                 const value = getFieldValue('mobile');
  //                 onGetCaptcha(value);
  //               }}
  //             >
  //               {timing ? `${count} 秒` : '获取验证码'}
  //             </Button>
  //           </Col>
  //         </Row>
  //       )}
  //     </FormItem>
  //   );
  // }
  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const LoginItems = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItems[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <LoginItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}

        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItems;
