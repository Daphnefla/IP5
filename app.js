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
			results: [],
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

			axios.get('https://vuetv.acmoore.co.uk/search/'+search).then(function (response) {
				//self.loadVideo(response.data[0].video_id);
				//self.cueVideo(second_result.video_id);
				var i = 0;
				while (i < 10) {
					self.results.push(response.data[i]);
					i++
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

      if (this.queue.length > 0) {
				this.queue.push(this.queue.shift());
        this.loadVideo(this.queue[0].video_id);
			} else if (this.queue.length <= 0) {
        console.log("There is no next video. Add more if you like.");
      }

		},

		cueVideo: function(videoComp) {
			this.queue.push(videoComp);

			if (this.queue.length === 1) {
				this.loadVideo(this.queue[0].video_id);
			}
		},

		ended: function() {
			this.nextVideo();
		},

		removeVideo: function(index) {
			console.log(index);
			this.queue.splice(index, 1);
		},

		previousVideo: function() {
			var prev_video = this.queue.pop();
			this.queue.unshift(prev_video);
			this.loadVideo(prev_video.video_id);
		},


	}
});
