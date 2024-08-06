import { TestConfig } from 'yup'



export const stringTest = (value: string | undefined | null) => value ? value.match(/\d+/g)?.join('') !== value.replace(/\s/g, '') : true

export const onlyNumberTest = (value: number | string | null | undefined) => !!Number(value) ? /^[0-9]+$/.test(String(value)) : true

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const emailTest = (value: string) => emailRegex.test(value)


export const passwordTest = (isNewPassword: boolean): TestConfig<string> => {
  return {
    name: 'validate',
    test: (value) => {
      if (value.length < 6) return false
      return true
    },
    message: isNewPassword ? 'Enter strong password' : 'Incorrect password'
  }
}


export const fileExtensionTest = (file: string | File | undefined, extensions: string[]): boolean => {
  if (!file) return true
  const fileName = file instanceof File ? file.name : file
  const validExtensionsRegex = new RegExp('\\.(' + extensions.map(item => item.substring(1)).join('|') + ')$', 'i')
  return validExtensionsRegex.test(fileName)
}


export const fileSizeTest = ({ value, size }: { value: string | File | undefined, size: number }) => {
  if (value instanceof File) return value.size < (size * 1024 * 1024)
  return true
}
