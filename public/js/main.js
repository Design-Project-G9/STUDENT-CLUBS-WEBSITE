const CLUB_JOIN_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzpoAXmJA8kzGxAWUg_CYDL_YMqR9ujNJR5xs7iWmWvIMKniUsnGIst7Omu1VNSJ6d7Tw/exec";
const ABOUT_CONTACT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxe22Q0SEuQoLBh8pnhQegOxmkym8kZ-aitsy6XArC0j_n5noVdtEfR8rVyKJ5O0YMClw/exec";

function initClubJoinForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const clubVal = document.getElementById("user-club")?.value || "";
    const yearVal = document.getElementById("user-year")?.value || "";

    if (!clubVal || !yearVal) {
      alert("Please select both a Club and a Year.");
      return;
    }

    const formData = {
      name: document.getElementById("user-name")?.value || "",
      email: document.getElementById("user-email")?.value || "",
      club: clubVal,
      year: yearVal,
      message: document.getElementById("user-message")?.value || "",
    };

    try {
      const response = await fetch(CLUB_JOIN_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      alert("Submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Club join form error:", error);
      alert("An error occurred while submitting.");
    }
  });
}

function initAboutContactForm() {
  const form = document.getElementById("about-contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("about-submit-btn");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameVal = document.getElementById("name")?.value.trim() || "";
    const emailVal = document.getElementById("email")?.value.trim() || "";
    const yearVal = document.getElementById("subject")?.value || "";
    const clubVal = document.getElementById("club")?.value || "";
    const messageVal = document.getElementById("message")?.value.trim() || "";

    if (!yearVal || !clubVal) {
      alert("Please select both a Year and a Club.");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }

    const formData = {
      name: nameVal,
      email: emailVal,
      club: clubVal,
      year: yearVal,
      message: messageVal,
    };

    try {
      const response = await fetch(ABOUT_CONTACT_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      if (result.result === "success") {
        alert("Submitted successfully!");
        form.reset();
      } else {
        alert("Error submitting form: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("About contact form error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      }
    }
  });
}

function initSearchSystem() {
  const searchData = [
    {
      type: "club",
      name: "Sports Club",
      category: "Sports",
      description:
        "Weekly games, team sports, fitness activities, and friendly matches.",
      page: "clubs.html",
      id: "sport-club",
    },
    {
      type: "club",
      name: "Cooking",
      category: "Cook & Dessert",
      description: "Cooking lessons, international food, and shared meals.",
      page: "clubs.html",
      id: "cooking",
    },
    {
      type: "club",
      name: "Music Club",
      category: "Music",
      description: "Instruments, music genres, and live student performances.",
      page: "clubs.html",
      id: "music",
    },
    {
      type: "club",
      name: "Yoga Club",
      category: "Yoga",
      description: "Stretching, mindfulness, meditation, and relaxation.",
      page: "clubs.html",
      id: "yoga",
    },
    {
      type: "club",
      name: "Design Club",
      category: "Design",
      description:
        "UI/UX design, graphic creation, branding, and digital artwork.",
      page: "clubs.html",
      id: "design-club",
    },
    {
      type: "club",
      name: "Promoting Integrity & Dignity Club",
      category: "Community",
      description: "Ethical values, human dignity, and moral principles.",
      page: "clubs.html",
      id: "integrity-club",
    },
    {
      type: "club",
      name: "Film Club",
      category: "Arts",
      description:
        "Movie screenings, film analysis, video editing, and short films.",
      page: "clubs.html",
      id: "film-club",
    },
    {
      type: "club",
      name: "Photography Club",
      category: "Arts",
      description: "Camera techniques, photo editing, and campus photowalks.",
      page: "clubs.html",
      id: "photography-club",
    },
    {
      type: "club",
      name: "Student Association Club",
      category: "Leadership",
      description:
        "Represent students, organize campus events, and develop leadership.",
      page: "clubs.html",
      id: "student-association-club",
    },
    {
      type: "club",
      name: "IT Awareness Club",
      category: "Technology",
      description:
        "Digital literacy, cybersecurity awareness, and technology trends.",
      page: "clubs.html",
      id: "it-awareness-club",
    },
    {
      type: "club",
      name: "Robotics Club",
      category: "Technology",
      description: "Robots, microcontrollers, programming, and automation.",
      page: "clubs.html",
      id: "robotics-club",
    },
    {
      type: "club",
      name: "Library Club",
      category: "Education",
      description:
        "Reading, book reviews, study circles, and learning resources.",
      page: "clubs.html",
      id: "library-club",
    },
    {
      type: "club",
      name: "Aerobic Club",
      category: "Sports",
      description: "Cardio workouts, music fitness, and group exercise.",
      page: "clubs.html",
      id: "aerobic-club",
    },
    {
      type: "club",
      name: "Public Speaking Club",
      category: "Education",
      description: "Communication, speech delivery, confidence, and debate.",
      page: "clubs.html",
      id: "public-speaking-club",
    },
    {
      type: "club",
      name: "Web Club",
      category: "Technology",
      description:
        "Frontend and backend web development and collaborative projects.",
      page: "clubs.html",
      id: "web-club",
    },
    {
      type: "club",
      name: "Gender Awareness Club",
      category: "Community",
      description: "Gender equality, inclusivity, and respectful dialogue.",
      page: "clubs.html",
      id: "gender-awareness-club",
    },
    {
      type: "event",
      name: "Campus Sports & Fitness Showcase",
      category: "Sports",
      description:
        "Sports showcase with team games, fitness activities, and tournaments.",
      page: "events.html",
      id: "sport",
    },
    {
      type: "event",
      name: "Culinary Masterclass & Taste Workshop",
      category: "Cooking",
      description: "A hands-on cooking masterclass and taste workshop.",
      page: "events.html",
      id: "cooking",
    },
    {
      type: "event",
      name: "Acoustic Jam Night & Open Mic",
      category: "Music",
      description: "Live acoustic performances and an open mic for students.",
      page: "events.html",
      id: "music",
    },
    {
      type: "event",
      name: "Morning Sunrise Yoga & Mindfulness Flow",
      category: "Yoga",
      description:
        "A sunrise yoga session focused on flexibility and wellbeing.",
      page: "events.html",
      id: "yoga",
    },
  ];

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (!searchForm || !searchInput) return;

  const searchWrapper = searchInput.parentElement || searchInput.closest("div");
  if (!searchWrapper) return;

  const resultsBox = document.createElement("div");
  resultsBox.id = "searchResults";
  resultsBox.className = [
    "absolute",
    "top-full",
    "left-0",
    "right-0",
    "mt-2",
    "bg-gray-100",
    "rounded-sm",
    "shadow-lg",
    "border",
    "border-gray-200",
    "z-50",
    "hidden",
    "max-h-48",
    "overflow-y-auto",
  ].join(" ");
  resultsBox.setAttribute("role", "listbox");
  resultsBox.setAttribute("aria-live", "polite");

  searchWrapper.classList.add("relative");
  searchWrapper.appendChild(resultsBox);

  function normalizeText(value) {
    return String(value ?? "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlightMatch(text, keyword) {
    const safeText = escapeHtml(text);
    if (!keyword) return safeText;

    const pattern = new RegExp(`(${escapeRegExp(keyword)})`, "gi");
    return safeText.replace(
      pattern,
      '<mark class="bg-indigo-100 text-indigo-700 rounded px-0.5">$1</mark>',
    );
  }

  function getSearchableText(item) {
    return [item.name, item.category, item.description].join(" ").toLowerCase();
  }

  function hideResults() {
    resultsBox.innerHTML = "";
    resultsBox.classList.add("hidden");
  }

  function renderResults(results, keyword) {
    resultsBox.innerHTML = "";

    if (results.length === 0) {
      resultsBox.innerHTML = `
                <div class="p-4 text-center flex flex-col items-center justify-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    
                    <h3 class="font-semibold text-gray-800 text-sm">No results found</h3>
                    <p class="text-xs text-gray-500 mt-1">
                        We couldn't find anything for <strong>${escapeHtml(keyword)}</strong>
                    </p>
                </div>
            `;
      resultsBox.classList.remove("hidden");
      return;
    }

    const header = document.createElement("div");
    header.className = "px-3 py-2 bg-gray-50 border-b border-gray-100";
    header.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Search Results</span>
                <span class="text-[10px] text-gray-400">${results.length}</span>
            </div>
        `;
    resultsBox.appendChild(header);

    results.forEach((item) => {
      const link = document.createElement("a");
      link.href = `${item.page}#${item.id}`;
      link.className =
        "flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-indigo-50 transition border-b border-gray-100 last:border-b-0";

      link.innerHTML = `
                <div class="flex items-center gap-2 min-w-0">
                    <span class="text-sm font-semibold text-gray-800 truncate">${highlightMatch(item.name, keyword)}</span>
                    <span class="shrink-0 text-[10px] uppercase text-gray-500">${item.type}</span>
                </div>
                <span class="text-gray-400 text-lg leading-none">→</span>
            `;

      link.addEventListener("click", () => {
        if (!window.location.pathname.endsWith(item.page)) return;

        if (item.type === "club") {
          const clubFilter = document.getElementById("clubFilter");
          if (clubFilter) {
            clubFilter.value = "All";
            clubFilter.dispatchEvent(new Event("change"));
          }
        } else {
          document.querySelector('.filter-btn[data-category="All"]')?.click();
        }
      });

      resultsBox.appendChild(link);
    });

    resultsBox.classList.remove("hidden");
  }

  function performSearch(keyword) {
    const normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) {
      hideResults();
      return;
    }

    const results = searchData.filter((item) =>
      getSearchableText(item).includes(normalizedKeyword),
    );
    renderResults(results, normalizedKeyword);
  }

  searchInput.addEventListener("input", (event) => {
    performSearch(event.target.value);
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    performSearch(searchInput.value);
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim()) {
      performSearch(searchInput.value);
    }
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideResults();
      searchInput.blur();
    }
  });

  document.addEventListener("click", (event) => {
    if (!searchWrapper.contains(event.target)) {
      hideResults();
    }
  });
}

function initClubFilter() {
  const clubFilter = document.getElementById("clubFilter");
  if (!clubFilter) return;

  clubFilter.addEventListener("change", function () {
    const selectedClubId = this.value;
    const clubCards = document.querySelectorAll(".club-card");

    clubCards.forEach((card) => {
      const shouldShow = selectedClubId === "All" || card.id === selectedClubId;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
}

function initEventFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;

  const cards = document.querySelectorAll(".event-card");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => {
        btn.classList.remove("bg-[#4C4DFF]", "text-white", "shadow-md");
        btn.classList.add(
          "bg-white",
          "text-gray-700",
          "border",
          "border-gray-300",
        );
      });

      this.classList.remove(
        "bg-white",
        "text-gray-700",
        "border",
        "border-gray-300",
      );
      this.classList.add("bg-[#4C4DFF]", "text-white", "shadow-md");

      const selectedCategory = this.getAttribute("data-category");

      cards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        const shouldShow =
          selectedCategory === "All" || cardCategory === selectedCategory;
        card.style.display = shouldShow ? "block" : "none";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initClubJoinForm();
  initAboutContactForm();
  initSearchSystem();
  initClubFilter();
  initEventFilters();
});
