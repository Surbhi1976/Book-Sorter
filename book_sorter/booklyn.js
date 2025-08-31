const quotes=[
  "The person who deserves most pity is a lonesome one on a rainy day who doesn’t know how to read.",
  "Make each day count by setting specific goals to succeed, then putting forth every effort to exceed your own expectations.",
  "I find television very educating. Every time somebody turns on the set, i go into the other room and read a book.",
  "my alma mater is books, a good library...I could spend the rest of my life reading,just satisfying my curiosity.",
  "Show me a family of readers, and I will show you the people who move the world.",
  "The more you read, the more things you will know. The more that you learn, the more places you'll go.",
  "Every book you read becomes a brick in the home you're building inside your mind — a shelter of wisdom, wonder, and whispered dreams."
  ,"Books don’t just tell stories — they store souls. The pages remember what we forget, and sometimes, they heal what we hide.",
  "The more you read, the more silent your fears become—because knowledge whispers courage."
];

function showrandomquote(){
  const quote=quotes[Math.floor(Math.random()*quotes.length)];
  document.getElementById('dynamicquote').textContent=quote;
}

function goToLogin(){
  window.location.href='login.html';
}
const fictionDropdown =document.querySelector('.fiction');
const nonFictionDropdown = document.querySelector('.non-fiction');
const bookList=document.getElementById('book-list');

function fetchbooksbygenre(genre){
  fetch(`http://localhost:5000/api/books/genre/${genre}`)
    .then(response => response.json())
    .then(books => {
      bookList.innerHTML ='';
      books.forEach(book=>{
        const card=document.createElement('div');
        card.className='book-card';
        card.innerHTML=`
          <img src="${book.image_url}" alt="${book.title}" height="200px">
          <h4>${book.title}</h4>
          <p><strong>Author :</strong> ${book.author}</p>
          <p>${book.description}</p>
          <div class="tracker-icons">
    <span title="Read & Relived" onclick="addToTracker('${book.title}', 'Read & Relived')">✔️</span>
    <span title="Currently Immersed" onclick="addToTracker('${book.title}', 'Currently Immersed')">⌛</span>
    <span title="Wishlist Reads" onclick="addToTracker('${book.title}', 'Wishlist Reads')">💭</span>
  </div>
`;
          bookList.appendChild(card);
      });
    })
    .catch(err=>{
      console.log('error fetching books:',err);
    });
}

fictionDropdown.addEventListener('change',() =>{
  const genre=fictionDropdown.value;
  if(genre){
    fetchbooksbygenre(genre);
  }
});

nonFictionDropdown.addEventListener('change',() =>{
  const genre=nonFictionDropdown.value;
  if(genre){
    fetchbooksbygenre(genre);
  }
});
 
window.addEventListener('load', function () {
  showrandomquote();

  const username = localStorage.getItem('username');
  const signinBtn = document.getElementById('signin-btn');
  if (username) {
    signinBtn.innerText = "👋 Hi, " + username;
    signinBtn.disabled = true;
  }
});

function addToTracker(bookTitle, category) {
  const username = localStorage.getItem('username');
  if (!username) {
    alert("Please login to keep track of your books.");
    return;
  }

  const card = [...document.querySelectorAll('.book-card')].find(card =>
    card.querySelector('h4').textContent === bookTitle
  );
  const author = card.querySelectorAll('p')[0]?.textContent.replace("Author :", "").trim() || "Unknown";
  const description = card.querySelectorAll('p')[1]?.textContent || "";

  const key = `${username}-${category}`;
  let tracker = JSON.parse(localStorage.getItem(key)) || [];

  if (!tracker.some(book => book.title === bookTitle)) {
    const book = {
      title: bookTitle,
      author: author,
      description: description
    };
    tracker.push(book);
    localStorage.setItem(key, JSON.stringify(tracker));
    alert(`'${bookTitle}' added to '${category}'`);
  } else {
    alert(`'${bookTitle}' already exists in '${category}'`);
  }
}


function toggleDictionary(){
  const box=document.getElementById('dictionary-box');
  box.classList.toggle("hidden");
}

function lookupWord(){
  const word=document.getElementById('word-input').value;
  const result=document.getElementById('result');
  if(!word) return;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(res=>res.json())
  .then(data=>{
    if(data[0]){
      const meaning=data[0].meanings[0].definitions[0];
      result.innerHTML=`<strong>${word}:</strong> ${meaning.definition}<br><em>Example:</em> ${meaning.example || 'N/A'}`;
    }
    else{
      result.innerHTML="Word not found.";
    }
  })
  .catch(err=>{
    result.innerHTML="error fetching word";
  });
}

function checkLogin(trackerType){
  const isLoggedIn=true;
  if(!isLoggedIn){
    alert("please login to access this feature.");
    return;
  }
  if(trackerType==='Read & Relived'){
    window.location.href='read&relived.html';
  }
  else if (trackerType === 'Currently Immersed') {
    window.location.href = 'current.html';
  } else if (trackerType === 'Wishlist Reads') {
    window.location.href = 'wishlist.html';
  }
}