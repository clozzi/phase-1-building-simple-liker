// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
let glyphs = document.querySelectorAll(".like-glyph")



function likedHeart(event) {
  glyph = event.target;
    if (glyph.textContent === EMPTY_HEART) {
      mimicServerCall()
        .then(function() {
          glyph.classList.add('activated-heart')
          glyph.textContent = FULL_HEART;
        })
    } else if (glyph.textContent === FULL_HEART) {
      mimicServerCall()
      .then(function() {
        glyph.classList.remove('activated-heart')
        glyph.textContent = EMPTY_HEART;
      })
    .catch(function(failedServer) {
      if (failedServer) {
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('modal-message').innerHTML = failedServer;
        setTimeout(function() {
          document.getElementById('modal').classList.add('hidden');
        }, 3000);
      }
    })
  }
}


for (glyph of glyphs) {
  glyph.addEventListener('click', likedHeart)
};

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
