var vm = new Vue({
	el: '#app',


	data: function () {
		return {
			search: null,
			video_id: null,
			playerVars: {
				autoplay: 1
			},
			queue: [],
			object: [],
		};
	},



	computed: {
		player() {
			return this.$refs.youtube.player
		}
	},

	methods: {
		searchVideos: function() {
			var self = this;
			var search = encodeURI(this.search);
			var results;

			axios.get('https://vuetv.acmoore.co.uk/search/'+search).then(function (response) {
				self.loadVideo(response.data[0].video_id);
				//self.cueVideo(second_result.video_id);
				var i = 0;
				while (i < 10) {
					self.object.push(response.data[i]);
					i++
				}
				var t = 1;
				while (t < 10) {
					self.cueVideo(response.data[t].video_id);
					t++
				}
			});
		},

		loadVideo: function (video_id) {
			this.player.loadVideoById(video_id);
		},

		playVideo: function () {
			this.player.playVideo();
		},

		pauseVideo: function () {
			this.player.pauseVideo();
		},

		nextVideo: function() {
			var next_video = this.queue.shift();
			this.loadVideo(next_video);
		},

		cueVideo: function(video_id) {
			this.queue.push(video_id);
		},

		ended: function() {
			this.nextVideo();
		},

		removeVideo: function() {
			this.queue.shift();
		},

		previousVideo: function() {
			var prev_video = this.queue.unshift();
			this.loadVideo(prev_video);
		},


	}
});
