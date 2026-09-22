const questionInput =
    document.getElementById("question");

const askButton =
    document.getElementById("askButton");

const answer =
    document.getElementById("answer");

const loading =
    document.getElementById("loading");


askButton.addEventListener("click", askAI);


async function askAI() {

    const question = questionInput.value.trim();

    if (!question) {
        alert("Please enter a question.");
        return;
    }

    loading.style.display = "block";
    answer.textContent = "";
    askButton.disabled = true;

    try {

        const response = await fetch("/api/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });


        const data = await response.json();


        if (!response.ok) {
            throw new Error(
                data.error || "Something went wrong"
            );
        }


        answer.textContent = data.answer;

    }

    catch (error) {

        answer.textContent =
            "Error: " + error.message;

    }


    loading.style.display = "none";
    askButton.disabled = false;
}