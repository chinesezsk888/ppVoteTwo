
let apiUrl = ''
let voteLink = ''
if (process.env.VUE_APP_ENV === 'dev') {
	apiUrl = 'http://10.10.4.134:9192/'
	voteLink = 'http://10.10.4.134:9192/vote/www_vote.html'
} else if (process.env.VUE_APP_ENV === 'prod') {
	// 线上环境地址
	apiUrl = 'http://activity.thepaper.cn/vote/'
	voteLink = 'http://activity.thepaper.cn/vote/www_vote.html'
}else if (process.env.VUE_APP_ENV === 'test') {
	apiUrl = 'http://139.196.248.235:8089/vote/'
	voteLink = 'http://139.196.248.235:8089/vote/www_vote.html'
}else if (process.env.VUE_APP_ENV === 'local') {
	apiUrl = 'http://127.0.0.1:9192/'
	voteLink = 'http://139.196.248.235:8089/vote/www_vote.html'
}

export {
	apiUrl,
	voteLink
}
