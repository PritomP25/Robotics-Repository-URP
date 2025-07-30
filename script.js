// header
class THeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <div class="nav-div">
                <ul id="nav-sidebar" class="nav-links">
                    <li onclick="hideSidebar()">
                        <a href="#"
                            ><span class="material-symbols-outlined">
                                close
                            </span></a
                        >
                    </li>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="index.html#Robot">Robotics</a></li>
                    <li><a href="about.html">About</a></li>
                </ul>
                <ul class="nav-links">
                    <li>
                        <a href="index.html"
                            ><img src="assets/images/logo-1.png" alt="logo" class="logo-img"
                        /></a>
                    </li>
                    <li class="hideOnMobile"><a href="index.html">Home</a></li>
                    <li class="hideOnMobile"><a href="index.html#Robot">Robotics</a></li>
                    <li class="hideOnMobile"><a href="about.html">About</a></li>
                    <li class="menu-button" onclick="showSidebar()">
                        <a href="#"
                            ><span class="material-symbols-outlined">
                                menu
                            </span></a
                        >
                    </li>
                </ul>
            </div>
        </header>
        `;
    }
}
customElements.define("t-header", THeader);

// hero
class THero extends HTMLElement {
    connectedCallback() {
        const heading = this.getAttribute("heading");
        const details = this.getAttribute("details");
        const subtext = this.getAttribute("subtext");
        const img = this.getAttribute("img");
        this.innerHTML = `
        <section class="hero" style="
                background: linear-gradient(rgba(4,9,30,0.7), rgba(4,9,30,0.7)), 
                            url('${img}') no-repeat center / cover;">
            <div class="hero_container">
                <div class="info">
                    <h1>${heading}</h1>
                    <p class="hero-main-text">${details}</p>
                    <p class="hero-subtext">${subtext}</p>
                </div>
            </div>
        </section>
        `;
    }
}
customElements.define("t-hero", THero);

// footer
class TFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="footer-container">
                <div class="footer-content-title">
                    <h4>
                        Electrical, Computer, and Systems Engineering Department
                    </h4>
                </div>

                <div class="footer-content-address">
                    <div class="inline-address">
                        <span class="material-symbols-outlined">
                            location_on
                        </span>
                        <p>JEC 6049, 6th Fl - Jonsson Engineering Center,</p>
                    </div>
                    <div class="address-text">
                        <p>
                            Rensselaer Polytechnic Institute - Troy, New York
                            12180-3590
                        </p>
                    </div>
                </div>
            </div>

            <div class="footer-bottom_bar">
                <h4>
                    &copy; 2025 Rensselaer, made by Pritom Paul. Last updated on
                    Jul 23, 2025.
                </h4>
            </div>
        </footer>
        `;
    }
}
customElements.define("t-footer", TFooter);

//nav-bar code
function showSidebar() {
    const sidebar = document.querySelector("#nav-sidebar");
    sidebar.style.display = "flex";
}
function hideSidebar() {
    const sidebar = document.querySelector("#nav-sidebar");
    sidebar.style.display = "none";
}

// sidebar code
const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");

    closeAllSubMenus();
}

function toggleSubMenu(button) {
    if (!button.nextElementSibling.classList.contains("show")) {
        closeAllSubMenus();
    }

    button.nextElementSibling.classList.toggle("show");
    button.classList.toggle("rotate");

    if (sidebar.classList.contains("close")) {
        sidebar.classList.toggle("close");
        toggleButton.classList.toggle("close");
    }
}

function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
        ul.classList.remove("show");
        ul.previousElementSibling.classList.remove("rotate");
    });
}

// Show the content by the id to display the content in the .content-container
document.querySelectorAll("#sidebar a[data-target]").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("data-target");

        // Hide all content containers
        document.querySelectorAll(".content-container").forEach((div) => {
            div.style.display = "none";
        });

        // Show the selected container
        const targetDiv = document.getElementById(targetId);
        if (targetDiv) {
            targetDiv.style.display = "block";
        }

        // Update active class
        document.querySelectorAll("#sidebar ul li").forEach((li) => {
            li.classList.remove("active");
        });

        const parentLi = link.closest("li");
        if (parentLi) {
            parentLi.classList.add("active");
        }
        window.location.hash = '#' + targetId;
    });
});

// show first content section by default
window.addEventListener("DOMContentLoaded", () => {
    const allSections = document.querySelectorAll(".content-container");
    const hash = window.location.hash.slice(1);
    let targetDiv;
    if (hash) {
        targetDiv = document.getElementById(hash);
    }
    else {
        targetDiv = document.querySelector(".content-container");
    }
    if (targetDiv) {
        allSections.forEach((div) => (div.style.display = "none"));
        targetDiv.style.display = "block";
        // Set active class on sidebar link
        const activeLink = document.querySelector(`#sidebar a[data-target="${hash}"]`);
        if (activeLink) {
            document.querySelectorAll("#sidebar ul li").forEach((li) => {
                li.classList.remove("active");
            });
            const parentLi = activeLink.closest("li");
            if (parentLi) {
                parentLi.classList.add("active");
            }
        }
    }
});
