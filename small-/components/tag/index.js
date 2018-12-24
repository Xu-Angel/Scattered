Component({
	properties: {
		msg: {
		  type: String,
		  value: '标签'
		}
	},
	data: {
		message: 'test'
	},
	methods: {
		onBtnTap (e) {
			this.triggerEvent('btnTap', {param: e.target})
		}
	}
})