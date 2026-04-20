import type { Rule } from 'antd/es/form';

// 通用验证规则
export const FormRules = {
  // 必填项
  required: (message?: string): Rule => ({
    required: true,
    message: message || '此项为必填项',
  }),

  // 邮箱验证
  email: (): Rule => ({
    type: 'email',
    message: '请输入正确的邮箱格式',
  }),

  // 手机号验证
  phone: (): Rule => ({
    pattern: /^1[3-9]\d{9}$/,
    message: '请输入正确的手机号',
  }),

  // 密码验证
  password: (min = 6, max = 20): Rule => ({
    pattern: new RegExp(`^.{${min},${max}}$`),
    message: `密码长度应为${min}-${max}个字符`,
  }),

  // 强密码验证
  strongPassword: (): Rule => ({
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    message: '密码必须包含大小写字母和数字，至少8位',
  }),

  // 长度限制
  length: (min?: number, max?: number): Rule => {
    if (min && max) {
      return {
        min,
        max,
        message: `长度应为${min}-${max}个字符`,
      };
    }
    if (min) {
      return {
        min,
        message: `最少${min}个字符`,
      };
    }
    if (max) {
      return {
        max,
        message: `最多${max}个字符`,
      };
    }
    return {};
  },

  // 数字验证
  number: (min?: number, max?: number): Rule => {
    const rule: Rule = {
      type: 'number',
      message: '请输入有效数字',
    };
    if (min !== undefined) rule.min = min;
    if (max !== undefined) rule.max = max;
    return rule;
  },

  // URL验证
  url: (): Rule => ({
    type: 'url',
    message: '请输入正确的URL格式',
  }),

  // 正整数验证
  positiveInteger: (): Rule => ({
    pattern: /^\d+$/,
    message: '请输入正整数',
  }),

  // 中文姓名验证
  chineseName: (): Rule => ({
    pattern: /^[\u4e00-\u9fa5]{2,6}$/,
    message: '请输入2-6位中文姓名',
  }),

  // 自定义验证
  validator: (validatorFn: (rule: Rule, value: any) => Promise<void>): Rule => ({
    validator: validatorFn,
  }),

  // 组合验证规则
  combine: (...rules: Rule[]): Rule[] => rules,

  // 确认密码验证
  confirmPassword: (passwordField: string): Rule => ({
    validator: (rule, value) => {
      void rule;
      void value;
      // 这里需要在使用时传入form实例进行验证
      // passwordField参数用于指定需要比较的密码字段
      console.log('Compare with field:', passwordField);
      return Promise.resolve();
    },
    message: '两次输入的密码不一致',
  }),
};

// 常用表单规则组合
export const CommonFormRules = {
  // 用户名
  username: FormRules.combine(
    FormRules.required('请输入用户名'),
    FormRules.length(3, 20)
  ),

  // 邮箱 (必填)
  requiredEmail: FormRules.combine(
    FormRules.required('请输入邮箱'),
    FormRules.email()
  ),

  // 手机号 (必填)
  requiredPhone: FormRules.combine(
    FormRules.required('请输入手机号'),
    FormRules.phone()
  ),

  // 密码 (必填)
  requiredPassword: FormRules.combine(
    FormRules.required('请输入密码'),
    FormRules.password()
  ),

  // 强密码 (必填)
  requiredStrongPassword: FormRules.combine(
    FormRules.required('请输入密码'),
    FormRules.strongPassword()
  ),
};

export default FormRules;
