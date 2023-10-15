const triviaContainer = document.querySelector(".trivia");
const fetchedTrivia = {}; // Object to store fetched trivia data

const handleMilestone = async (e) => {
  const milestone = e.target.value;
  const book_id = document.querySelector("#book-id").value;

  if (fetchedTrivia[milestone]) {
    // Trivia data for this milestone has already been fetched
    const elem = document.createElement("div");
    elem.classList.add("clr");
    elem.textContent = fetchedTrivia[milestone].content;
    document.querySelector(".trivia").append(elem);

    const existingTrivias = triviaContainer.getElementsByClassName("clr");
    if (existingTrivias.length > 0) {
      triviaContainer.removeChild(existingTrivias[0]);
    }

    triviaContainer.appendChild(elem);
  } else {
    const response = await fetch(`/api/books/trivia/${book_id}/${milestone}`, {
      method: "GET",
    });

    if (!response.ok) {
      alert("You have already saved this milestone!");
    } else {
      const trivia = await response.json();
      fetchedTrivia[milestone] = trivia[0]; // Store the fetched trivia data

      const elem = document.createElement("div");
      elem.classList.add("clr");
      elem.textContent = trivia[0].content;
      document.querySelector(".trivia").append(elem);

      const existingTrivias = triviaContainer.getElementsByClassName("clr");
      if (existingTrivias.length > 0) {
        triviaContainer.removeChild(existingTrivias[0]);
      }

      triviaContainer.appendChild(elem);
    }
  }
};

document.querySelector("#milestone").addEventListener("change", handleMilestone);
