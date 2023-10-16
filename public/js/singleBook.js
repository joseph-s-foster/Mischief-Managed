const triviaContainer = document.querySelector(".trivia");

const handleMilestone = async (e) => {
  const milestone = e.target.value;
  const book_id = document.querySelector("#book-id").value;
  
  // Try to get the previously saved trivia data from localStorage
  const savedTrivia = JSON.parse(localStorage.getItem(`trivia_${book_id}_${milestone}`));

  if (savedTrivia) {
    // Trivia data for this milestone has been saved in localStorage
    renderTrivia(savedTrivia);
  } else {
    const response = await fetch(`/api/books/trivia/${book_id}/${milestone}`, {
      method: "GET",
    });

    if (!response.ok) {
      alert("You have already saved this milestone!");
    } else {
      const trivia = await response.json();
      saveTriviaToStorage(book_id, milestone, trivia[0]);
      renderTrivia(trivia[0]);
    }
  }
};

const renderTrivia = (triviaData) => {
  const elem = document.createElement("div");
  elem.classList.add("clr");
  elem.textContent = triviaData.content;

  const existingTrivias = triviaContainer.getElementsByClassName("clr");
  if (existingTrivias.length > 0) {
    triviaContainer.removeChild(existingTrivias[0]);
  }

  triviaContainer.appendChild(elem);
};

const saveTriviaToStorage = (book_id, milestone, triviaData) => {
  // Save trivia data to localStorage
  localStorage.setItem(`trivia_${book_id}_${milestone}`, JSON.stringify(triviaData));
};

document.querySelector("#milestone").addEventListener("change", handleMilestone);