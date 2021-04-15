class Match{
  constructor (totalTime, cards){
	this.cardsArray = cards;
	this.totalTime = totalTime;
	this.timeRemaining = totalTime;
	this.timer = document.getElementById("time-remaining");
	this.clock = document.getElementById("flips");
}
  startGame() {
	this.checkCard = null;
	this.totalClicks = 0;
	this.timeRemaining = this.totalTime;
	this.matchedCards = [];
	this.busy = true;

	setTimeout(() => {
		this.shuffleCards();
		this.countDown = this.startCountDown();
		this.busy = false;
	}, 500);
	this.hideCards();
	this.timer.innerText = this.timeRemaining;
	this.clock.innerText = this.totalClicks;
	let scoreDisplay = document.getElementById("score");
	scoreDisplay.innerText = localStorage.getItem("flips");
 }
  hideCards(){
		this.cardsArray.forEach(card => {
			card.classList.remove("visible");
		})
	}

  startCountDown(){
  	return setInterval(() => {
  		this.timeRemaining--;
  		this.timer.innerText = this.timeRemaining;
  		if(this.timeRemaining === 0){
  			this.gameOver();
  		}
  	},1000);
  }

  gameOver(){
  	clearInterval(this.countDown);
  	document.getElementById("game-over-text").classList.add("visible");
  }

  victory(){
  	clearInterval(this.countDown);
  	document.getElementById("victory-text").classList.add("visible");
  }

  flipCard(card){
	if(this.canFlipCard(card)){
		this.totalClicks++;
		this.clock.innerText = this.totalClicks;
		card.classList.add("visible");

		if(this.checkCard){
			this.checkForCardMatch(card);
		}else{
			this.checkCard = card;
		}
	}
 }

   checkForCardMatch(card){
   	  if(this.getCardType(card) === this.getCardType(this.checkCard)){
   	  	this.cardMatch(card, this.checkCard);
   	  }else{
   	  	this.misMatch(card, this.checkCard);
   	  }
   	  this.checkCard = null;
   }

   cardMatch(card1, card2){
   	  this.matchedCards.push(card1);
   	  this.matchedCards.push(card2);
   	  if(this.matchedCards.length === this.cardsArray.length){
   	  	this.victory();
   	  	let score = JSON.stringify(this.totalClicks);
        saveInLocalStorage('flips', score);
   	  }
   }

   misMatch(card1, card2){
   	 this.busy = true;
     setTimeout(() => {
        card1.classList.remove('visible');
        card2.classList.remove('visible');
        this.busy = false;
        }, 1000);
   }

   getCardType(card){
	  return card.getElementsByClassName("image")[0].src;
	}

   shuffleCards(){
  	  for(let i = this.cardsArray.length - 1; i > 0; i--){
  		let index = Math.floor(Math.random() * (i+1));
  		// swaping css styles of cards
  		this.cardsArray[index].style.order = i;
  		this.cardsArray[i].style.order = index;
  	}
  }

  canFlipCard(card){
    if(!this.busy && !this.matchedCards.includes(card) && card !== this.checkCard){
    	return true;
    }
 }
}

function ready() {
	let overlays = Array.from(document.getElementsByClassName("overlay-text"));
	let cards = Array.from(document.getElementsByClassName("card"));
	let game = new Match(100, cards);

	overlays.forEach(overlay => {
		overlay.addEventListener("click", () => {
			overlay.classList.remove("visible");
			   game.startGame();
		})
	})
	cards.forEach(card => {
		card.addEventListener("click", () => {
			game.flipCard(card);
		})
	})
}


if (!document.readyState === "loading") {
	document.addEventListener("DomContentLoaded", ready())
}else {
	ready();
}

