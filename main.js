document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const memberList = document.getElementById("memberList");
  const formMsg = document.getElementById("formMsg"); // Get the form message element once

  // Function to render and remove members
  function renderMembers() {
    const members = JSON.parse(localStorage.getItem("members") || "[]");
    memberList.innerHTML = ""; // Clear existing list

    members.forEach((member, index) => {
      const li = document.createElement("li");
      li.classList.add("member");

      const display = document.createElement("span");
      // Display only the username, as creationName and rank are no longer used
      display.innerHTML = `<strong>${member.username}</strong>`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.dataset.index = index; // Store index for removal

      removeBtn.addEventListener("click", () => {
        const confirmDelete = confirm(
          `Are you sure you wanna kick ${member.username} from the Coffee Gang?`
        );
        if (confirmDelete) {
          // Remove member from the array
          members.splice(index, 1);
          // Update localStorage
          localStorage.setItem("members", JSON.stringify(members));
          // Re-render the list to reflect changes
          renderMembers();
        }
      });

      li.appendChild(display);
      li.appendChild(removeBtn);
      memberList.appendChild(li);
    });
  }

  // === Handle sign-ups ===
  if (signupForm) { // Check if signupForm exists before adding event listener
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission

      // Only get the username, as creationName and rank are not present in your form
      const username = signupForm.querySelector("[name='Username']").value.trim();

      // Basic validation: Check only if username is empty
      if (!username) { // THIS IS THE CORRECTED LINE!
        if (formMsg) {
          formMsg.textContent = "Please enter a username.";
          formMsg.style.color = "red"; // Make error message red
          setTimeout(() => {
            formMsg.textContent = "";
            formMsg.style.color = ""; // Reset color
          }, 3000);
        }
        return; // Stop execution if validation fails
      }

      // Create new member object with only the username
      const newMember = { username };

      // Retrieve existing members, or initialize an empty array if none
      const members = JSON.parse(localStorage.getItem("members") || "[]");
      members.push(newMember); // Add new member
      localStorage.setItem("members", JSON.stringify(members)); // Save updated list

      // Display success message and clear after a delay
      if (formMsg) {
        formMsg.textContent = "You're in!";
        formMsg.style.color = "green"; // Make success message green
        setTimeout(() => {
          formMsg.textContent = "";
          formMsg.style.color = ""; // Reset color
        }, 3000); // Clear after 3 seconds
      }

      signupForm.reset(); // Clear the form fields
      renderMembers(); // Re-render the list to show the new member
    });
  }

  // Initial render of members when the page loads
  if (memberList) {
    renderMembers();
  }
});
