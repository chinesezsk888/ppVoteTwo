
let apiUrl = ''

if (process.env.VUE_APP_ENV === 'dev') {
	apiUrl = 'http://10.10.4.134:9192/'
} else if (process.env.VUE_APP_ENV === 'prod') {
	// 线上环境地址
	apiUrl = ''
}else if (process.env.VUE_APP_ENV === 'test') {
  // 线上环境地址
	apiUrl = 'http://127.0.0.1:9192/'
}else if (process.env.VUE_APP_ENV === 'local') {
  // 线上环境地址
	apiUrl = 'http://127.0.0.1:9192/'
}

export {
  apiUrl
}
