import { setLocale } from 'yup'



export default setLocale({
  mixed: {
    default: (params) => `Enter valid value`,
    required: (params) => `Required *`,
    notType: (params) => {
      if (params.type === 'number' && `${params.value}` === 'NaN') return `Required *`
      return `Enter valid value`
    },
    notOneOf: (params) => `Enter valid value`,
  },
  string: {
    min: (params) => `Enter valid value`,
    max: (params) => `Enter valid value`,
    matches: (params) => `Enter valid value`,
    email: 'Enter valid email',
    url: (params) => `Enter valid URL`,
  },
  number: {
    min: (params) => `Enter valid value`,
    max: (params) => `Enter valid value`,
    moreThan: (params) => `Enter valid value`,
    positive: (params) => `Enter valid value`,
  },
})