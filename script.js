/* ==============================
   Bright Tech Education JS
   ============================== */



    /* ==============================
       MOBILE MENU
    ============================== */

    document.addEventListener("DOMContentLoaded", () => {
    });

    window.toggleMenu = function () {
        const nav = document.getElementById("nav");
        const menu = document.querySelector(".menu");

        nav.classList.toggle("open");
        menu.classList.toggle("open");
    };


    /* ==============================
       TYPING EFFECT (BANNER)
    ============================== */
    const h1 = document.querySelector(".hero h1");
    const p = document.querySelector(".hero p");
    const typed1 = document.getElementById("typed1");
    const typed2 = document.getElementById("typed2");

    function typeText(element, text, speed, callback) {
        if (!element) return;

        let i = 0;
        element.textContent = "";

        const interval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, speed);
    }

    // Start typing animation
    if (h1 && p) {
        const h1Text = h1.textContent;
        const pText = p.textContent;

        h1.textContent = "";
        p.textContent = "";

        typeText(h1, h1Text, 50, () => {
            typeText(p, pText, 70, () => {

                // LOOP TEXT
                const lines = [
                    "Transforming Learning with ICT, Coding & Robotics",
                    "Helping Students Explore Web Development & Graphic Design"
                ];

                let index = 0;

                function loopTyping() {
                    if (!typed1 || !typed2) return;

                    typed1.textContent = "";
                    typed2.textContent = "";

                    typeText(typed1, lines[index], 60, () => {
                        setTimeout(() => {
                            index = (index + 1) % lines.length;
                            loopTyping();
                        }, 2000);
                    });
                }

                loopTyping();
            });
        });
    }


    /* ==============================
       IMAGE SLIDER
    ============================== */
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    if (slides.length > 0) {
        showSlide(currentSlide);

        setInterval(() => {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 2000); // speed
    }


    /* ==============================
       SMOOTH SCROLL
    ============================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

/* ==============================
   ENROLLMENT FORM (FIXED)
============================== */
const enrollForm = document.querySelector(".enrollment-form");

if (enrollForm) {
    enrollForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const child = this.child_name.value;
        const parent = this.parent_name.value;
        const email = this.email.value;
        const phone = this.phone.value;
        const message = this.message.value;

        const text =
            "Enrollment Request:%0A" +
            "Child Name: " + child + "%0A" +
            "Parent Name: " + parent + "%0A" +
            "Email: " + email + "%0A" +
            "Phone: " + phone + "%0A" +
            "Message: " + message;

        // WhatsApp
        window.open(
            "https://wa.me/2348146018803?text=" + encodeURIComponent(text),
            "_blank"
        );

        // Email
        window.location.href =
            "mailto:brighttecheducation@gmail.com?subject=Enrollment Request&body=" +
            encodeURIComponent(text);
    });
}

function switchTab(tab) {
    // Hide all contents
    document.querySelectorAll(".tab-content").forEach(el => {
        el.classList.remove("active");
    });

    // Remove active from all buttons
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    // Show selected tab
    document.getElementById(tab).classList.add("active");

    // Activate correct button
    if (tab === "signin") {
        document.querySelectorAll(".tab-btn")[0].classList.add("active");
    } else {
        document.querySelectorAll(".tab-btn")[1].classList.add("active");
    }
}
    
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorMsg = document.getElementById("loginError");

    // FAKE LOGIN CHECK (you can change later)
    const correctEmail = "admin@gmail.com";
    const correctPassword = "1234";

    if (email === correctEmail && password === correctPassword) {
        errorMsg.style.color = "green";
        errorMsg.textContent = "Login successful!";
    } else {
        errorMsg.style.color = "red";
        errorMsg.textContent = "Incorrect email or password";
    }
});