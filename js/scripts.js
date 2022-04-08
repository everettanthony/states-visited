(function() {
	const stateLinks = document.querySelectorAll('#states a.hint');
	const countDisplay = document.querySelector('.state-count');
	const countVal = document.querySelector('.state-count-val');
	const btnReset = document.querySelector('.btn-reset');
	const btnShare = document.querySelector('.btn-share');
	let px_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
	const stateCount = [];

	$(window).resize(function(){isZooming();});

	btnReset.addEventListener('click', function() {
		stateLinks.forEach(function(state) {
			state.classList.remove('state-active');
			stateCount.splice(0, stateCount.length);
			countUpdate(stateCount);
		});	
	});

	stateLinks.forEach(function(state) {
		state.addEventListener('click', function(e) {
			const selectedState = this.getAttribute('title');
			const index = stateCount.indexOf(selectedState);
			this.classList.toggle('state-active');

			if (this.classList.contains('state-active')) {
				stateCount.push(selectedState);
			}
			else if (index > -1) {		
				stateCount.splice(index, 1);
			}

			if (countDisplay.classList.contains('hidden'))
				countDisplay.classList.remove('hidden');

			countUpdate(stateCount);
		});
	});

	function isZooming(){
    let newPx_ratio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
    if(newPx_ratio != px_ratio){
      px_ratio = newPx_ratio;
      countDisplay.classList.add('hidden');	
      return true;
    }
    else {
      return false;
    }
	}

	function countUpdate(arr) {	
		if (arr.length > 0) {
			countVal.textContent = arr.length;
			btnReset.classList.remove('hidden');
			btnShare.classList.remove('hidden');
		}
		else {
			countDisplay.classList.add('hidden');		
			btnReset.classList.add('hidden');
			btnShare.classList.add('hidden');
		}
	}
})();

