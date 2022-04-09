(function() {
	const stateLinks = document.querySelectorAll('#states a.hint');
	const countDisplay = document.querySelector('.state-count');
	const countVal = document.querySelector('.state-count-val');
	const spinner = document.querySelector('.spinner-grow');
	const btnReset = document.querySelector('.btn-reset');
	const btnShare = document.querySelector('.btn-share');
	const statesArr = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
	'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
	'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
	'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
	'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
	'West Virginia', 'Wisconsin', 'Wyoming'];
	const stateCount = [];
	const selectedStates = [];

/*	if (document.cookie) querySavedStates();

	function querySavedStates() {
		const cookieValue = document.cookie
		  .split('; ')
		  .find(row => row.startsWith('states='))
		  .split('=')[1];

		if (cookieValue) {
			const savedStates = statesArr
				.filter(element => cookieValue.split(',')
				.includes(element));

			stateLinks.forEach(function(state, idx) {
				const index = savedStates.indexOf(state.getAttribute('title'));

				if (index > -1) {
					state.classList.toggle('state-active');
					stateCount.push(savedStates[index]);
				}

				if (countDisplay.classList.contains('hidden'))
					countDisplay.classList.remove('hidden');

				countUpdate(stateCount);		
			}); 		
		}
	}*/

	btnShare.addEventListener('click', function() {
		createFinalImage();
		//document.cookie = "states="+stateCount+"; SameSite=None; Secure";
	});

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
			btnReset.classList.remove('hidden');
		  btnShare.classList.remove('hidden');
		}
		else {
			countDisplay.classList.add('hidden');		
			btnReset.classList.add('hidden');
		  btnShare.classList.add('hidden');
		}
	}

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
			text: `I've visited ${countVal.textContent} states in the U.S.`,
    };

    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
      navigator.share(shareData);
      spinner.classList.add('hidden');
    } else {
      console.log(`Your system doesn't support sharing files.`);
      spinner.classList.add('hidden');
    }
	}
})();

