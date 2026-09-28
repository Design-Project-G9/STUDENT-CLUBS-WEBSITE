const CLUB_JOIN_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzpoAXmJA8kzGxAWUg_CYDL_YMqR9ujNJR5xs7iWmWvIMKniUsnGIst7Omu1VNSJ6d7Tw/exec";
const ABOUT_CONTACT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxe22Q0SEuQoLBh8pnhQegOxmkym8kZ-aitsy6XArC0j_n5noVdtEfR8rVyKJ5O0YMClw/exec";

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
            message: document.getElementById("user-message")?.value || ""
        };

        try {
            const response = await fetch(CLUB_JOIN_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "text/plain;charset=utf-8" }
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
            message: messageVal
        };

        try {
            const response = await fetch(ABOUT_CONTACT_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "text/plain;charset=utf-8" }
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
            name: "Sport Club",
            category: "Sports",
            description: "A club for students who enjoy sports, teamwork, and physical activities.",
            activities: "Volleyball, Football, Basketball, Friendly Matches",
            page: "clubs.html"
        },
        {
            type: "club",
            name: "Cooking Club",
            category: "Cook & Dessert",
            description: "Learn cooking skills and discover new recipes with other students.",
            activities: "Cooking, Baking, Dessert, Food Sharing",
            page: "clubs.html"
        },
        {
            type: "club",
            name: "Music Club",
            category: "Music",
            description: "A place for students who love music, singing, and playing instruments.",
            activities: "Singing, Guitar, Piano, Music Show",
            page: "clubs.html"
        },
        {
            type: "club",
            name: "Yoga Club",
            category: "Yoga",
            description: "Improve your health, flexibility, and relaxation through yoga.",
            activities: "Yoga, Meditation, Stretching, Fitness",
            page: "clubs.html"
        },
        {
            type: "event",
            name: "Volleyball Friendly Match",
            category: "Sports",
            description: "Join students for a friendly volleyball match.",
            activities: "Volleyball, Teamwork, Competition",
            date: "October 15",
            page: "events.html"
        },
        {
            type: "event",
            name: "Savor the Taste",
            category: "Cook & Dessert",
            description: "Enjoy delicious food and cooking activities with students.",
            activities: "Cooking, Food, Dessert",
            date: "October 20",
            page: "events.html"
        },
        {
            type: "event",
            name: "Stay Active",
            category: "Yoga",
            description: "Join a fun activity to stay healthy and active.",
            activities: "Fitness, Yoga, Exercise",
            date: "October 25",
            page: "events.html"
        },
        {
            type: "event",
            name: "Student Music Night",
            category: "Music",
            description: "Enjoy live music and student performances.",
            activities: "Music, Singing, Performance",
            date: "November 5",
            page: "events.html"
        }
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
        "overflow-y-auto"
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
        return safeText.replace(pattern, '<mark class="bg-indigo-100 text-indigo-700 rounded px-0.5">$1</mark>');
    }

    function getSearchableText(item) {
        return [
            item.name,
            item.category,
            item.description,
            item.activities,
            item.date || ""
        ].join(" ").toLowerCase();
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
            link.href = item.page;
            link.className = "flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-indigo-50 transition border-b border-gray-100 last:border-b-0";

            link.innerHTML = `
                <div class="flex items-center gap-2 min-w-0">
                    <span class="text-sm font-semibold text-gray-800 truncate">${highlightMatch(item.name, keyword)}</span>
                </div>
                <span class="text-gray-400 text-lg leading-none">→</span>
            `;

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

        const results = searchData.filter((item) => getSearchableText(item).includes(normalizedKeyword));
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
        const selectedCategory = this.value;
        const clubCards = document.querySelectorAll(".club-card");

        clubCards.forEach((card) => {
            const category = card.dataset.category || "";
            const shouldShow = selectedCategory === "All" || category === selectedCategory;
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
                btn.classList.add("bg-white", "text-gray-700", "border", "border-gray-300");
            });

            this.classList.remove("bg-white", "text-gray-700", "border", "border-gray-300");
            this.classList.add("bg-[#4C4DFF]", "text-white", "shadow-md");

            const selectedCategory = this.getAttribute("data-category");

            cards.forEach((card) => {
                const cardCategory = card.getAttribute("data-category");
                const shouldShow = selectedCategory === "All" || cardCategory === selectedCategory;
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
