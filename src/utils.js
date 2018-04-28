///////////////
// polyfills //
///////////////


// 获取系统时间戳的函数
let getTimeNow = null;

// @NOTE: chrome的Worker里也是有process的!!!
// 			而且和node的process不一样!!!
if (typeof (window) === 'undefined' &&
	typeof (process) !== 'undefined' &&
	process.hrtime !== undefined) {

	getTimeNow = function () {
		const time = process.hrtime();
		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};

} else if (typeof (this) !== 'undefined' &&
			this.performance !== undefined &&
			this.performance.now !== undefined) {

	// In a browser, use window.performance.now if it is available.
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	getTimeNow = window.performance.now.bind(window.performance);

} else if (Date.now !== undefined) {

	// Use Date.now if it is available.
	getTimeNow = Date.now;

} else {

	// Otherwise, use 'new Date().getTime()'.
	getTimeNow = function () {
		return new Date().getTime();
	};

}

//  raf
let raf, cancelRaf;

// NOTE 在Worker和node环境中不存在raf，因此可以使用setTimeout替代
if (typeof requestAnimationFrame !== 'undefined') {
	raf = requestAnimationFrame;
	cancelRaf = cancelAnimationFrame;
} else {
	raf = cbk => setTimeout(cbk, 20);
	cancelRaf = clearTimeout;
}

export { getTimeNow, raf, cancelRaf };