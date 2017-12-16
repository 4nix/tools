class Form {
  contructor () {

  }

  // ---- File ---
  // min 5k, max 2M
  static checkFileSize (file, maxSize = 2097152, minSize = 5120) {
    return file.size >= minSize && file.size <= maxSize
  }

  static checkFileType (file) {
    return file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png'
  }

  // -- String --
  static checkEmpty (val) {
    return val.trim() ? true : false
  }

  static checkLength (val, min = 2, max = 50) {
    return val.length >= min && val.length <= max
  }

  // 长度, 中文2个字符, 其它1个字符
  static checkBLength (val, min = 2, max = 50) {
    let match = val.match(/[^\x00-\xff]/g)
    let len = val.length + (!match ? 0 : match.length)

    return len >= min && len <= max
  }

  // 检查真实姓名, 不支持\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}范围的字符
  static checkRealname (val) {
    // return Form.checkBLength(val, 4, 30) && /^[\u4e00-\u9fa5\u9FA6-\u9FCB\u3400-\u4DB5\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}]{2,6}$/u.test(val)
    // return Form.checkBLength(val, 4, 30) && /^[\u4e00-\u9fa5\u9FA6-\u9FCB\u3400-\u4DB5]{2,6}$/.test(val)
    return /^[\u4e00-\u9fa5\u9FA6-\u9FCB\u3400-\u4DB5]{2,6}$/.test(val)
  }

  static checkChineseame (val) {
    return /^[\u4e00-\u9fa5\u9FA6-\u9FCB\u3400-\u4DB5]{2,4}$/.test(val)
  }

  static checkTel (val) {
    return /^1[3|4|5|7|8][0-9]{9}$/.test(val)
  }

  static checkIde (val) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
  }

  static check (value, type, tips, msg, ...args) {
    let test = args ? eval('Form.check' + type.replace(/\w/, L => L.toUpperCase()) + '(value, ...args)') : eval('Form.check' + type.replace(/\w/, L => L.toUpperCase()) + '(value)')

    if (test) {
      // yes 
    } else {
      // no
    }

    return test
  }

}