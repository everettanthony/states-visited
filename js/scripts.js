(function() {
	const stateLinks = document.querySelectorAll('#states a.hint');
	const countDisplay = document.querySelector('.state-count');
	const countVal = document.querySelector('.state-count-val');
	const mobileCountVal = document.querySelector('.mobile-count');
	const spinner = document.querySelector('.spinner-grow');
	const btnReset = document.querySelector('.btn-reset');
	const btnShare = document.querySelector('.btn-share');
	const stateCount = [];
	const screenShotArr = ['https://everettanthony.github.io/states-visited/img/states.jpg'];

	btnShare.addEventListener('click', function() {
		createFinalImage();
	});

	function createFinalImage() {
		const screenshotContainer = document.querySelector('.stage');
		spinner.classList.remove('hidden');

		html2canvas(screenshotContainer).then(canvas => {
			try {
				var finalScreenshot = canvas.toDataURL('image/jpeg', 1);

				shareScreenshot(finalScreenshot);
			}
			catch (e) {
				console.log("Screenshot failed: " + e);
				spinner.classList.add('hidden');
			}
		});
	}

	async function shareScreenshot(finalScreenshot) {
    const blob = await (await fetch(finalScreenshot)).blob();

    const filesArray = [
      new File(
        [blob],
        `states-visited${Date.now()}.jpg`,
        {
          type: blob.type,
          lastModified: new Date().getTime()
        }
      )
    ];

    const shareData = {
      files: filesArray,
      title: document.title,
			text: `I've visited ${mobileCountVal} states in the U.S.`,
    };

    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
      navigator.share(shareData);
      spinner.classList.add('hidden');
    } else {
      console.log(`Your system doesn't support sharing files.`);
      spinner.classList.add('hidden');
    }
	}

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

	function countUpdate(arr) {	
		if (arr.length > 0) {
			countVal.textContent = arr.length;
			mobileCountVal.textContent = arr.length;
			btnReset.classList.remove('hidden');
		  btnShare.classList.remove('hidden');
			mobileCountVal.classList.remove('hidden');
		}
		else {
			countDisplay.classList.add('hidden');		
			btnReset.classList.add('hidden');
		  btnShare.classList.add('hidden');
			mobileCountVal.classList.add('hidden');
		}
	}
})();

