/* Main site JavaScript for Bright Tech Education
	 - toggleMenu(): open/close mobile nav
	 - typing effect for #typing
	 - simple slider for .slide elements
	 - smooth scrolling for internal anchors
	 - contact form submit handling
*/

document.addEventListener('DOMContentLoaded', () => {
	// Mobile menu toggle
	window.toggleMenu = function toggleMenu() {
		const nav = document.getElementById('nav');
		const menu = document.querySelector('.menu');
		if (!nav || !menu) return;
		nav.classList.toggle('open');
		menu.classList.toggle('open');
	};


		// Generic typing helper: types `text` into element `el` at `speed` ms per char
		function typeText(el, text, speed, cb) {
			if (!el) { if (cb) cb(); return; }
			el.textContent = '';
			let i = 0;
			const t = setInterval(() => {
				el.textContent += text.charAt(i);
				i++;
				if (i >= text.length) {
					clearInterval(t);
					if (cb) cb();
				}
			}, speed);
		}

		function eraseText(el, speed, cb) {
			if (!el) { if (cb) cb(); return; }
			const start = el.textContent || '';
			let i = start.length;
			const t = setInterval(() => {
				i--;
				el.textContent = start.slice(0, i);
				if (i <= 0) {
					clearInterval(t);
					if (cb) cb();
				}
			}, speed);
		}

		// Elements for sequencing
		const h1 = document.querySelector('h1');
		const p = document.querySelector('.hero .overlay p');
		const typed1 = document.getElementById('typed1');
		const typed2 = document.getElementById('typed2');

		const h1Text = h1 ? h1.textContent.trim() : '';
		const pText = p ? p.textContent.trim() : '';

		function startTypedLinesLoop() {
			if (!typed1 || !typed2) return;
			const lines = [
				'Transforming Learning with ICT, Coding & Robotics',
				'helping students Explore Web Development & Graphic Design'
			];

			// ensure cleared
			typed1.textContent = '';
			typed2.textContent = '';

			(function loop() {
				typeText(typed1, lines[0], 90, () => {
					setTimeout(() => {
						typeText(typed2, lines[1], 90, () => {
							setTimeout(() => {
								// erase both and repeat
								eraseText(typed1, 40, () => {
									eraseText(typed2, 40, () => {
										setTimeout(loop, 700);
									});
								});
							}, 1600);
						});
					}, 700);
				});
			})();
		}

		// Start the sequence: H1 (fast) -> paragraph (slower) -> typed lines loop
		if (h1) h1.textContent = '';
		if (p) p.textContent = '';

		if (h1Text) {
			typeText(h1, h1Text, 60, () => {
				if (pText) {
					typeText(p, pText, 120, startTypedLinesLoop);
				} else {
					startTypedLinesLoop();
				}
			});
		} else if (pText) {
			typeText(p, pText, 120, startTypedLinesLoop);
		} else {
			startTypedLinesLoop();
		}

	// Close mobile menu when a nav link is clicked
	document.querySelectorAll('#nav a').forEach(a => {
		a.addEventListener('click', () => {
			const nav = document.getElementById('nav');
			const menu = document.querySelector('.menu');
			if (nav && menu && nav.classList.contains('open')) {
				nav.classList.remove('open');
				menu.classList.remove('open');
			}
		});
	});

	// NOTE: removed the separate looping typing effect that showed individual words
	// (e.g., "ICT", "Coding", "Robotics") under the hero. The hero paragraph
	// itself now types in with a single, slower typing effect above the buttons.

	// Simple slider: rotates '.slide' elements by toggling .active
	(function slider() {
		const slides = Array.from(document.querySelectorAll('.slider .slide'));
		if (!slides.length) return;
		let current = slides.findIndex(s => s.classList.contains('active'));
		if (current < 0) current = 0;

		// ensure only one active
		slides.forEach((s, i) => s.classList.toggle('active', i === current));

		const interval = 1500; // faster slide interval (ms)
		let timer = setInterval(next, interval);

		function next() {
			slides[current].classList.remove('active');
			current = (current + 1) % slides.length;
			slides[current].classList.add('active');
		}

		// pause on hover
		const sliderEl = document.querySelector('.slider');
		if (sliderEl) {
			sliderEl.addEventListener('mouseenter', () => clearInterval(timer));
			sliderEl.addEventListener('mouseleave', () => timer = setInterval(next, interval));
		}
	})();

	// Smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href === '#' || href === '') return;
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Contact form handler: prevent actual submit and show a friendly message
	const contactForm = document.querySelector('.contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', (e) => {
			e.preventDefault();
			// Simple UX: replace with a thank you message
			const parent = contactForm.parentElement;
			const msg = document.createElement('p');
			msg.textContent = 'Thanks — your message has been received. We will get back to you soon.';
			msg.style.fontWeight = '600';
			parent.replaceChild(msg, contactForm);
		});
	}

});

