let initBaseMethod = {
  getQueryString: function (name) {
    let reg = new RegExp(name + '=([^&#]*)', 'i')
    let value = reg.exec(window.location.href)
    if (value == null) return null
    return decodeURI(value[1])
  },
  errorPrompt: function (msg, that) {
    that.showPopsData = msg
  }
}
export {
  initBaseMethod
}
