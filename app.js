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
			playlist: [],
			volume: 50,
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
			self.results = [];
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

		previousVideo: function() {
			var prev_video = this.queue.pop();
			this.queue.unshift(prev_video);
			this.loadVideo(prev_video.video_id);
		},

		nextVideo: function() {

      if (this.queue.length > 0) {
				this.queue.push(this.queue.shift());
        this.loadVideo(this.queue[0].video_id);
			} else if (this.queue.length <= 0) {
        console.log("There is no next video. Add more if you like.");
      }
		},

		increaseVolume: function() {
			console.log(this.volume);
			this.player.setVolume(this.volume);
			if (this.volume >= 0 && this.volume < 100 ){
				this.volume = this.volume + 10;
				this.player.setVolume(this.volume);
			}
		},

		decreaseVolume: function() {
			console.log(this.volume);
			this.player.setVolume(this.volume);
			if (this.volume > 0 && this.volume <= 100 ){
				this.volume = this.volume - 10;
				this.player.setVolume(this.volume);
			}
		},

		ended: function() {
			this.nextVideo();
		},

		error: function(index) {
			this.queue.splice(index,1);
			this.nextVideo();

		},

		cueVideo: function(videoComp) {
			this.queue.push(videoComp);

			if (this.queue.length === 1) {
				this.loadVideo(this.queue[0].video_id);
			}
		},

		firstInCue: function(videoComp, index) {
			//this.queue.splice(index, 1);
			//this.queue.splice(0, 0, videoComp);
			this.queue.unshift(videoComp);
			this.loadVideo(this.queue[0].video_id);
		},

		firstInPlay: function(videoComp, index) {
			this.queue.splice(index, 1);
			this.queue.splice(0, 0, videoComp);
			this.loadVideo(this.queue[0].video_id);
		},

		removeVideo: function(index) {
			console.log(index);
			this.queue.splice(index, 1);
		},

		moveDown: function(videoComp, index) {
			this.queue.splice(index, 1);
			var new_index = index+1;
			this.queue.splice(new_index,0,videoComp);
			if(new_index != 0) {
				this.loadVideo(this.queue[0].video_id);
			}
		},

		moveUp: function(videoComp, index) {
			this.queue.splice(index, 1);
			var new_index = index-1;
			this.queue.splice(new_index,0,videoComp);
			if (new_index === 0) {
				this.loadVideo(videoComp.video_id);
			}
		},

		savePlaylist: function() {
			this.playlist.push(queue);
		},



	}
});
