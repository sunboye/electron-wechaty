/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-11 09:10:13
 * @LastEditTime: 2023-06-05 14:00:55
 * @LastEditors: yangss
 */

function validatorNotNull(rule, value, callback) {
  if (value || value === 0) {
    if (typeof value === 'string' && !value.trim()) {
      callback(new Error('不能为空'));
    } else {
      callback();
    }
  } else {
    callback(new Error('不能为空'));
  }
}
function validatorSelectNotNull(rule, value, callback) {
  if (value && value.length) {
    callback();
  } else {
    callback(new Error('不能为空'));
  }
}
function validatorSelectNumNotNull(rule, value, callback) {
  if (value !== '') {
    callback();
  } else {
    callback(new Error('不能为空'));
  }
}

// 单个校验ipv4
function ValidatorIPv4(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  let regIpv4 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if (!regIpv4.test(value)) {
    callback(new Error('IPV4格式不正确'));
  }
  callback();
}
// 单个校验ipv6
function ValidatorIPv6(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  var regIpv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  if (!regIpv6.test(value)) {
    callback(new Error('IPV6格式不正确'));
  }
  callback();
}
function oneValidatorIP(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  let regIpv4 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  var regIpv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  if (value.indexOf(',') !== -1) {
    callback(new Error('只能输入一个IP地址'));
  } else {
    if (!regIpv4.test(value) && !regIpv6.test(value)) {
      callback(new Error('IP格式不正确'));
    }
  }
  callback();
}

// function isIpv4(value) {
//   let flag = true;
//   let reg = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/;
//   if (value.indexOf(',') !== -1) {
//     let arr = value.split(',');
//     for (let i = 0; i < arr.length; i++) {
//       if (!reg.test(arr[i])) {
//         flag = false;
//       }
//     }
//   } else {
//     if (!reg.test(value)) {
//       flag = false;
//     }
//   }
//   return flag;
// }
// function isIpv6(ip){
//   var str = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^:((:[0-9a-fA-F]{1,4}){1,6}|:)$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,5}|:)$|^([0-9a-fA-F]{1,4}:){2}((:[0-9a-fA-F]{1,4}){1,4}|:)$|^([0-9a-fA-F]{1,4}:){3}((:[0-9a-fA-F]{1,4}){1,3}|:)$|^([0-9a-fA-F]{1,4}:){4}((:[0-9a-fA-F]{1,4}){1,2}|:)$|^([0-9a-fA-F]{1,4}:){5}:([0-9a-fA-F]{1,4})?$|^([0-9a-fA-F]{1,4}:){6}:$/;
//   if( str.test(ip) ){
//     return true;
//   }else{
//     return false;
//   }
// }
// function isIp(value) {
//   if (!value) return true;
//   if (isIpv4(value) || isIpv6(value)) {
//     return true;
//   }
//   return false;
// }

function validatorIsNumber(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  let reg = /^\d+$/;
  if (!reg.test(value)) {
    callback(new Error('请输入整数'));
  }
  callback();
}

function validatorIntegerNum(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  let reg = /^[1-9]\d*$/
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('请输入正整数'))
    }
  }
  callback();
}

// function isNum(value) {
//   if (!value) return true;
//   let reg = /^\d+$/;
//   if (!reg.test(value)) {
//     return false;
//   }
//   return true;
// }

function validatorMaxNum(num) {
  return function (rule, value, callback) {
    if (!value) {
      callback();
      return;
    }
    if (value - 0 > num) {
      callback(new Error(`最大值为${num}`));
    } else {
      callback();
    }
  }
}

function validatorMinNum(num) {
  return function (rule, value, callback) {
    if (!value) {
      callback();
      return;
    }
    if (value - 0 < num) {
      callback(new Error(`最小值为${num}`));
    } else {
      callback();
    }
  }
}

function validHasPort(rule, value, callback) {
  let reg = /(^[0-9]\d{0,3}$)|(^[1-5]\d{4}$)|(^6[0-4]\d{3}$)|(^65[0-4]\d{2}$)|(^655[0-2]\d$)|(^6553[0-5]$)/;
  if (!reg.test(value)) {
    callback(new Error('请输入0-65535之间的整数'));
  }
  callback();
}

function validateAllSpace(rule, value, callback) { // 不能全为空格
  if (value.match(/^[ ]*$/)) {
    callback(new Error('不能全为空格'));
  } else {
    callback();
  }
}

function validateSpace(rule, value, callback) { // 空格验证
  var space = /\s/;
  if (space.test(value)) {
    callback(new Error('不能包含空格'));
  } else {
    callback();
  }
}

function validateInt(rule, value, callback) { // 整数验证
  let reg = /^\d+$/;
  if (!reg.test(value)) {
    callback(new Error('请输入整数'));
  } else {
    callback()
  }
}
function macReg(rule, value, callback) {
  // eslint-disable-next-line no-useless-escape
  let reg = /^[0-9a-fA-F]{2}((:[0-9a-fA-F]{2}){5}|(\-[0-9a-fA-F]{2}){5})$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的Mac地址'));
  } else {
    callback()
  }
}
function mobilePhoneReg(rule, value, callback) {
  let reg = /^\d+$/;
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的电话号码'));
    } else if (value.length > 20) {
      callback(new Error('最大长度超过20位'));
    } else {
      callback()
    }
  } else {
    callback()
  }
}
function telePhoneReg(rule, value, callback) {
  let reg = /^0\d{2,3}-\d{7,8}$|\d{7,8}$/;
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的电话号码'));
    } else if (value.length > 20) {
      callback(new Error('最大长度超过20位'));
    } else {
      callback()
    }
  } else {
    callback()
  }
}
function isEmail(rule, value, callback) {
  // eslint-disable-next-line no-useless-escape
  let reg = /^[\w|\-|\$|\.]([-.\\\s\$]*\w+)*@\w+([-.\\\$\s]*\w+)*\.\w+[\w|-|.|\\|\$]*$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的Email地址'));
  } else {
    callback()
  }
}
function idCardReg(rule, value, callback) {
  let reg = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确的ID'));
  } else {
    callback()
  }
}
/**
 *  方法属性以is开头，可供外部直接使用方法
 *  注意： Max、Min是检测字符串长度，MaxNum、MinNum是检测数值大小
 */
export default {
  NotNull: { required: true, validator: validatorNotNull, trigger: 'blur' },
  SelectValNotNull: { required: true, validator: validatorNotNull, trigger: 'change' },
  SelectArrNotNull: { required: true, validator: validatorSelectNotNull, trigger: 'change' },
  SelectNumNotNull: { required: true, validator: validatorSelectNumNotNull, trigger: 'change' },
  NotSpace: { validator: validateSpace, trigger: 'blur' },
  NotAllSpace: { validator: validateAllSpace, trigger: 'blur' },
  Int: { validator: validateInt, trigger: 'blur' },
  IPv4: { validator: ValidatorIPv4, trigger: 'blur' },
  IPv6: { validator: ValidatorIPv6, trigger: 'blur' },
  oneIP: { validator: oneValidatorIP, trigger: 'blur' },
  Mac: { validator: macReg, trigger: 'blur' },
  Number: { validator: validatorIsNumber, trigger: 'blur' },
  integerNum: { validator: validatorIntegerNum, trigger: 'blur' },
  Max(num) {
    return { max: num, message: `最大值为${num}`, trigger: 'blur' };
  },
  Min(num) {
    return { min: num, message: `最小值为${num}`, trigger: 'blur' };
  },
  MaxNum(num) {
    return { validator: validatorMaxNum(num), trigger: 'blur' }
  },
  MinNum(num) {
    return { validator: validatorMinNum(num), trigger: 'blur' }
  },
  // 国内移动电话
  MobilePhone: { validator: mobilePhoneReg, trigger: 'blur' },
  // 国内固定电话
  TelePhone: { validator: telePhoneReg, trigger: 'blur' },
  Email: { validator: isEmail, trigger: 'blur' },
  IdCard: { validator: idCardReg, trigger: 'blur' },
  // 端口0-65535 的数字校验
  Port: { validator: validHasPort, trigger: 'blur' }
}
