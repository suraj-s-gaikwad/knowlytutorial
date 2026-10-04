/* ==========================================================================
   KNOWLY — Interactions
   Vanilla JS modules. Libraries: Swiper, AOS.
   ========================================================================== */
(() => {
    "use strict";

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const lerp = (a, b, t) => a + (b - a) * t;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* Shared scroll loop — every scroll-driven module registers a callback,
       and all run once per animation frame. */
    const scrollCallbacks = [];
    let scrollTicking = false;
    const onScroll = (fn) => scrollCallbacks.push(fn);
    const runScroll = () => {
        scrollTicking = false;
        const y = window.scrollY;
        scrollCallbacks.forEach((fn) => fn(y));
    };
    window.addEventListener("scroll", () => {
        if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(runScroll); }
    }, { passive: true });

    /* =========================
       IMAGE FALLBACK — local assets/images/* first, stock photo until it's added
    ========================= */
    function initImageFallback() {
        $$("img[data-fallback]").forEach((img) => {
            const swap = () => {
                if (img.dataset.fallbackUsed) return;
                img.dataset.fallbackUsed = "1";
                img.src = img.dataset.fallback;
            };
            img.addEventListener("error", swap, { once: true });
            // Already failed before this script ran
            if (img.complete && img.naturalWidth === 0) swap();
        });
    }

    /* =========================
       NAVIGATION (hide on scroll down / show on scroll up)
    ========================= */
    function initNavigation() {
        const header = $("#header");
        if (!header) return;
        let lastY = window.scrollY;

        onScroll((y) => {
            header.classList.toggle("is-scrolled", y > 10);
            const goingDown = y > lastY;
            if (y > 200 && goingDown && !document.body.classList.contains("no-scroll")) {
                header.classList.add("is-hidden");
            } else if (!goingDown || y <= 200) {
                header.classList.remove("is-hidden");
            }
            lastY = y;
        });

        // Active link highlighting
        const links = $$(".nav__link");
        const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = "#" + entry.target.id;
                links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === id));
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach((s) => io.observe(s));
    }

    /* =========================
       MOBILE MENU
    ========================= */
    function initMobileMenu() {
        const burger = $("#burger");
        const drawer = $("#drawer");
        const overlay = $("#drawerOverlay");
        const closeBtn = $("#drawerClose");
        if (!burger || !drawer) return;

        const open = () => {
            overlay.hidden = false;
            requestAnimationFrame(() => overlay.classList.add("is-open"));
            drawer.classList.add("is-open");
            drawer.setAttribute("aria-hidden", "false");
            burger.classList.add("is-open");
            burger.setAttribute("aria-expanded", "true");
            burger.setAttribute("aria-label", "Close menu");
            document.body.classList.add("no-scroll");
            setTimeout(() => closeBtn.focus(), 300);
        };
        const close = () => {
            overlay.classList.remove("is-open");
            drawer.classList.remove("is-open");
            drawer.setAttribute("aria-hidden", "true");
            burger.classList.remove("is-open");
            burger.setAttribute("aria-expanded", "false");
            burger.setAttribute("aria-label", "Open menu");
            document.body.classList.remove("no-scroll");
            setTimeout(() => { overlay.hidden = true; }, 400);
        };

        burger.addEventListener("click", () => (drawer.classList.contains("is-open") ? close() : open()));
        closeBtn.addEventListener("click", () => { close(); burger.focus(); });
        overlay.addEventListener("click", close);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && drawer.classList.contains("is-open")) { close(); burger.focus(); }
        });

        // Close on link click (event delegation)
        drawer.addEventListener("click", (e) => {
            if (e.target.closest("a")) close();
        });

        // Accordion dropdowns
        $$(".drawer__acc-btn", drawer).forEach((btn) => {
            const sub = btn.nextElementSibling;
            btn.addEventListener("click", () => {
                const expanded = btn.getAttribute("aria-expanded") === "true";
                btn.setAttribute("aria-expanded", String(!expanded));
                sub.style.height = expanded ? "0px" : sub.scrollHeight + "px";
            });
        });
    }

    /* =========================
       HERO SLIDER
    ========================= */
    function initHeroSlider() {
        if (typeof Swiper === "undefined" || !$(".hero__slider")) return;
        new Swiper(".hero__slider", {
            effect: "fade",
            fadeEffect: { crossFade: true },
            speed: 1200,
            loop: true,
            autoplay: reducedMotion ? false : { delay: 6500, disableOnInteraction: false },
            pagination: { el: ".hero__pagination", clickable: true },
            navigation: { nextEl: ".hero__next", prevEl: ".hero__prev" },
            keyboard: { enabled: true, onlyInViewport: true },
            a11y: { enabled: true },
        });
    }

    /* =========================
       HERO MOUSE PARALLAX (desktop)
       Uses the CSS `translate` property so it never fights keyframe transforms.
    ========================= */
    function initParallax() {
        const hero = $(".hero");
        if (!hero || reducedMotion || !finePointer) return;
        const layers = $$("[data-depth]", hero);
        let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

        const render = () => {
            cx = lerp(cx, tx, 0.08);
            cy = lerp(cy, ty, 0.08);
            layers.forEach((el) => {
                const d = parseFloat(el.dataset.depth) * 40;
                el.style.translate = `${(cx * d).toFixed(2)}px ${(cy * d).toFixed(2)}px`;
            });
            raf = Math.abs(cx - tx) > 0.001 || Math.abs(cy - ty) > 0.001 ? requestAnimationFrame(render) : null;
        };

        hero.addEventListener("mousemove", (e) => {
            const r = hero.getBoundingClientRect();
            tx = (e.clientX - r.left) / r.width - 0.5;
            ty = (e.clientY - r.top) / r.height - 0.5;
            if (!raf) raf = requestAnimationFrame(render);
        });
        hero.addEventListener("mouseleave", () => {
            tx = 0; ty = 0;
            if (!raf) raf = requestAnimationFrame(render);
        });
    }

    /* =========================
       SCROLL PARALLAX ([data-speed])
    ========================= */
    function initScrollParallax() {
        if (reducedMotion) return;
        const els = $$("[data-speed]");
        if (!els.length) return;
        const visible = new Set();
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        }, { rootMargin: "100px 0px" });
        els.forEach((el) => io.observe(el));

        onScroll(() => {
            if (window.innerWidth < 768) return;
            const vh = window.innerHeight / 2;
            visible.forEach((el) => {
                const r = el.getBoundingClientRect();
                const offset = (r.top + r.height / 2 - vh) * parseFloat(el.dataset.speed);
                el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
            });
        });
    }

    /* =========================
       REVEALS (text lines, clip images, slides, pops)
    ========================= */
    function initScrollAnimations() {
        const targets = $$(".text-reveal, .reveal-clip, .reveal-slide, .reveal-pop");
        if (reducedMotion) { targets.forEach((t) => t.classList.add("is-in")); return; }
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-in");
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
        targets.forEach((t) => io.observe(t));

        if (typeof AOS !== "undefined") {
            AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 60, disable: reducedMotion });
        }
    }

    /* =========================
       COUNTERS
    ========================= */
    function initCounters() {
        const counters = $$("[data-count]");
        const animate = (el) => {
            const end = parseInt(el.dataset.count, 10);
            if (reducedMotion) { el.textContent = end; return; }
            const dur = 1400;
            const start = performance.now();
            const step = (now) => {
                const t = clamp((now - start) / dur, 0, 1);
                el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
                if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((e) => {
                if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
            });
        }, { threshold: 0.6 });
        counters.forEach((c) => io.observe(c));
    }

    /* =========================
       PROGRAMS EXPLORER
       Desktop: hovering a row swaps the stage image + details.
       Tablet/mobile (no stage): rows open as a click accordion.
    ========================= */
    function initPrograms() {
        const section = $(".prog");
        if (!section) return;
        const items = $$(".prog__item", section);
        const slides = $$(".prog__slide", section);
        const stage = $(".prog__stage", section);
        const boards = $$(".prog__board", section);
        const counter = $(".prog__counter b", section);
        const bignum = $(".prog__bignum", section);
        const infoIcon = $(".prog__info-icon i", section);
        const infoLabel = $(".prog__info-text small", section);
        const infoName = $(".prog__info-text strong", section);
        const infoDesc = $(".prog__info-desc", section);
        const infoTags = $(".prog__info-tags", section);
        let current = 0;
        let textTimer = null;
        let slideTimer = null;

        const pad = (n) => String(n).padStart(2, "0");
        const stageVisible = () => !!stage && getComputedStyle(stage).display !== "none";

        const setBoards = (index) => {
            const cats = items[index].dataset.cat.split(" ");
            boards.forEach((b) => b.classList.toggle("is-current", cats.includes(b.dataset.jump)));
        };

        const setStage = (index, prev) => {
            if (!stage) return;
            slides.forEach((s, i) => {
                s.classList.toggle("is-active", i === index);
                s.classList.toggle("was-active", i === prev && i !== index);
            });
            clearTimeout(slideTimer);
            slideTimer = setTimeout(() => slides.forEach((s) => s.classList.remove("was-active")), 1150);

            const item = items[index];
            stage.classList.add("is-swapping");
            clearTimeout(textTimer);
            textTimer = setTimeout(() => {
                if (counter) counter.textContent = pad(index + 1);
                if (bignum) bignum.textContent = pad(index + 1);
                if (infoIcon) infoIcon.className = `fa-solid ${item.dataset.icon}`;
                if (infoLabel) infoLabel.textContent = item.dataset.label;
                if (infoName) infoName.textContent = $(".prog__name", item).textContent;
                if (infoDesc) infoDesc.innerHTML = $(".prog__panel-body p", item).innerHTML;
                if (infoTags) infoTags.innerHTML = $(".prog__panel-body .tags", item).innerHTML;
                stage.classList.remove("is-swapping");
            }, reducedMotion ? 0 : 220);
        };

        const setOpen = (item, open) => {
            item.classList.toggle("is-active", open);
            $(".prog__btn", item).setAttribute("aria-expanded", String(open));
        };

        const activate = (index, { toggle = false } = {}) => {
            const isOpen = items[index].classList.contains("is-active");

            // On mobile/tablet (no stage) the open row can be collapsed again
            if (toggle && index === current && isOpen && !stageVisible()) {
                setOpen(items[index], false);
                return;
            }
            if (index === current && isOpen) return;

            const prev = current;
            current = index;
            items.forEach((it, i) => setOpen(it, i === index));
            setStage(index, prev);
            setBoards(index);
        };

        items.forEach((item, i) => {
            const btn = $(".prog__btn", item);
            // Desktop: hover (or keyboard focus) previews the program
            item.addEventListener("pointerenter", (e) => {
                if (e.pointerType === "mouse" && stageVisible()) activate(i);
            });
            btn.addEventListener("focus", () => { if (stageVisible()) activate(i); });
            // Touch / small screens: tap opens the accordion row
            btn.addEventListener("click", () => activate(i, { toggle: true }));
        });

        const jumpTo = (cat, scroll) => {
            const index = items.findIndex((it) => it.dataset.cat.split(" ").includes(cat));
            if (index < 0) return;
            activate(index);
            if (scroll && !stageVisible()) {
                setTimeout(() => items[index].scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" }), 450);
            }
        };

        boards.forEach((b) => b.addEventListener("click", () => jumpTo(b.dataset.jump, true)));

        // Nav / drawer links can pre-select a curriculum
        document.addEventListener("click", (e) => {
            const link = e.target.closest("[data-filter-link]");
            if (link) jumpTo(link.dataset.filterLink, false);
        });

        window.addEventListener("resize", () => {
            // Coming back to desktop: make sure the stage has an active row to mirror
            if (stageVisible() && !items[current].classList.contains("is-active")) setOpen(items[current], true);
        });

        setBoards(0);
    }

    /* =========================
       SERVICES — pinned horizontal scroll (desktop) / vertical reveal (mobile)
    ========================= */
    function initServiceInteraction() {
        const section = $(".services");
        if (!section) return;
        const viewport = $(".services__viewport", section);
        const track = $(".services__track", section);
        const cards = $$(".svc-card", section);
        const nodes = $$(".journey-ui__nodes li", section);
        const fill = $(".journey-ui__fill", section);
        const pct = $(".journey-ui__pct", section);
        const current = $(".services__current", section);
        const bar = $(".services__progress span", section);
        const desktop = window.matchMedia("(min-width: 1024px)");
        const FOCUS = 0.38; // focus point, as a fraction of the viewport width
        let distance = 0;
        let pinned = false;

        // Mobile: reveal cards as they enter
        const cardIO = new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-in"); });
        }, { threshold: 0.2 });

        const measure = () => {
            pinned = desktop.matches && !reducedMotion;
            section.classList.toggle("is-pinned", pinned);
            if (pinned) {
                // Scroll far enough for the LAST card to reach the focus point (and become sharp)
                const last = cards[cards.length - 1];
                distance = Math.max(0, last.offsetLeft + last.offsetWidth / 2 - viewport.clientWidth * FOCUS);
                section.style.height = `${window.innerHeight + distance + window.innerHeight * 0.15}px`;
                cards.forEach((c) => cardIO.unobserve(c));
                update();
            } else {
                section.style.height = "";
                track.style.transform = "";
                cards.forEach((c) => {
                    ["--s", "--o", "--b", "--clip"].forEach((p) => c.style.removeProperty(p));
                    if (reducedMotion) c.classList.add("is-in"); else cardIO.observe(c);
                });
            }
        };

        const update = () => {
            if (!pinned) return;
            const rect = section.getBoundingClientRect();
            const total = section.offsetHeight - window.innerHeight;
            const p = clamp(-rect.top / total, 0, 1);
            const x = -distance * p;
            track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;

            // Focus point sits a little left of the viewport centre
            const vw = viewport.clientWidth;
            const focus = vw * FOCUS;
            let activeIdx = 0, best = Infinity;
            cards.forEach((card, i) => {
                const center = card.offsetLeft + card.offsetWidth / 2 + x;
                const d = (center - focus) / vw;
                const ad = Math.min(Math.abs(d), 1);
                card.style.setProperty("--s", (1 - ad * 0.14).toFixed(3));
                card.style.setProperty("--o", (1 - ad * 0.6).toFixed(3));
                card.style.setProperty("--b", (ad * 4).toFixed(2) + "px");
                card.style.setProperty("--clip", clamp(d, 0, 1).toFixed(3));
                if (Math.abs(d) < best) { best = Math.abs(d); activeIdx = i; }
            });
            cards.forEach((c, i) => c.classList.toggle("is-active", i === activeIdx));

            // Sync the central learning-journey visual
            nodes.forEach((n, i) => {
                n.classList.toggle("is-active", i === activeIdx);
                n.classList.toggle("is-done", i < activeIdx);
            });
            if (fill) fill.style.strokeDashoffset = (1 - p).toFixed(3);
            if (pct) pct.textContent = Math.round(p * 100);
            if (current) current.textContent = String(activeIdx + 1).padStart(2, "0");
            if (bar) bar.style.transform = `scaleX(${p.toFixed(3)})`;
        };

        onScroll(update);
        let resizeTimer;
        window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 150); });
        desktop.addEventListener ? desktop.addEventListener("change", measure) : desktop.addListener(measure);
        window.addEventListener("load", measure);
        measure();

        // Mouse interaction: subtle tilt + cursor-following glow (desktop only)
        if (!finePointer || reducedMotion) return;
        cards.forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                card.style.setProperty("--mx", `${px * 100}%`);
                card.style.setProperty("--my", `${py * 100}%`);
                card.style.setProperty("--ry", `${((px - 0.5) * 6).toFixed(2)}deg`);
                card.style.setProperty("--rx", `${((0.5 - py) * 6).toFixed(2)}deg`);
            });
            card.addEventListener("mouseleave", () => {
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
            });
        });
    }

    /* =========================
       PATHWAYS — staggered wipe reveal + 3D tilt / glare
    ========================= */
    function initPathways() {
        const grid = $(".paths__grid");
        if (!grid) return;
        const cards = $$(".path-card", grid);

        if (!reducedMotion && "IntersectionObserver" in window) {
            grid.classList.add("is-ready");
            const io = new IntersectionObserver((entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                cards.forEach((card, i) => {
                    card.style.setProperty("--d", `${i * 140}ms`);
                    card.classList.add("is-in");
                    // Once revealed, drop the stagger so hover feels instant
                    setTimeout(() => card.classList.add("is-done"), 1700 + i * 140);
                });
                io.disconnect();
            }, { threshold: 0.2 });
            io.observe(grid);
        }

        if (!finePointer || reducedMotion) return;
        cards.forEach((card) => {
            card.addEventListener("pointermove", (e) => {
                const r = card.getBoundingClientRect();
                const x = clamp((e.clientX - r.left) / r.width, 0, 1);
                const y = clamp((e.clientY - r.top) / r.height, 0, 1);
                card.classList.add("is-tilting");
                card.style.setProperty("--mx", `${x * 100}%`);
                card.style.setProperty("--my", `${y * 100}%`);
                card.style.setProperty("--ry", `${((x - 0.5) * 10).toFixed(2)}deg`);
                card.style.setProperty("--rx", `${((0.5 - y) * 10).toFixed(2)}deg`);
            });
            card.addEventListener("pointerleave", () => {
                card.classList.remove("is-tilting");
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
            });
        });
    }

    /* =========================
       LEARNING JOURNEY (scroll-drawn SVG path)
    ========================= */
    function initLearningJourney() {
        const wrap = $(".journey__wrap");
        if (!wrap) return;
        const path = $(".journey__path", wrap);
        const steps = $$(".jstep", wrap);
        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = reducedMotion ? 0 : len;

        const update = () => {
            const r = wrap.getBoundingClientRect();
            const trigger = window.innerHeight * 0.62;
            const p = clamp((trigger - r.top) / r.height, 0, 1);
            if (!reducedMotion) path.style.strokeDashoffset = (len * (1 - p)).toFixed(1);
            steps.forEach((s) => {
                const m = s.querySelector(".jstep__marker").getBoundingClientRect();
                s.classList.toggle("is-active", reducedMotion || m.top + m.height / 2 < trigger);
            });
        };
        onScroll(update);
        update();
    }

    /* =========================
       CUSTOM CURSOR (desktop only)
    ========================= */
    function initCustomCursor() {
        const cursor = $(".cursor");
        if (!cursor || !finePointer || reducedMotion) return;
        document.documentElement.classList.add("has-cursor");
        const label = $(".cursor__label", cursor);
        let mx = -100, my = -100, x = -100, y = -100;

        document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
        const loop = () => {
            x = lerp(x, mx, 0.22);
            y = lerp(y, my, 0.22);
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            requestAnimationFrame(loop);
        };
        loop();

        const hoverSel = "a, button, [data-cursor], img, .path-card";
        document.addEventListener("mouseover", (e) => {
            const target = e.target.closest(hoverSel);
            if (!target) return;
            const labelled = e.target.closest("[data-cursor]");
            if (labelled && !e.target.closest("button, .btn")) {
                label.textContent = labelled.dataset.cursor;
                cursor.classList.add("is-label");
            } else {
                cursor.classList.add("is-hover");
            }
        });
        document.addEventListener("mouseout", (e) => {
            if (e.target.closest(hoverSel)) cursor.classList.remove("is-hover", "is-label");
        });
        document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
        document.addEventListener("mouseenter", () => cursor.classList.remove("is-hidden"));
    }

    /* =========================
       BACK TO TOP (with SVG progress ring)
    ========================= */
    function initBackToTop() {
        const btn = $("#toTop");
        if (!btn) return;
        const ring = $(".to-top__ring", btn);
        onScroll((y) => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? y / max : 0;
            ring.style.strokeDashoffset = (1 - p).toFixed(3);
            btn.classList.toggle("is-visible", y > 600);
        });
        btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));
    }

    /* =========================
       FAQ ACCORDION
    ========================= */
    function initFAQ() {
        const items = $$(".faq-item");
        const setOpen = (item, open) => {
            const q = $(".faq-item__q", item);
            const a = $(".faq-item__a", item);
            item.classList.toggle("is-open", open);
            q.setAttribute("aria-expanded", String(open));
            a.style.height = open ? a.scrollHeight + "px" : "0px";
        };
        items.forEach((item) => {
            $(".faq-item__q", item).addEventListener("click", () => {
                const willOpen = !item.classList.contains("is-open");
                items.forEach((other) => other !== item && setOpen(other, false));
                setOpen(item, willOpen);
            });
        });
        if (items[0]) setOpen(items[0], true);
        window.addEventListener("resize", () => {
            items.filter((i) => i.classList.contains("is-open")).forEach((i) => {
                const a = $(".faq-item__a", i);
                a.style.height = a.scrollHeight + "px";
            });
        });
    }

    /* =========================
       TESTIMONIALS
    ========================= */
    function initTestimonials() {
        const el = $(".t-slider");
        if (typeof Swiper === "undefined" || !el) return;
        const DELAY = 7000;
        const voices = $$(".t-voice");
        el.style.setProperty("--t-delay", DELAY + "ms");

        const syncVoices = (index) => voices.forEach((v, i) => v.classList.toggle("is-active", i === index));

        const swiper = new Swiper(el, {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 30,
            speed: 900,
            rewind: true,
            grabCursor: true,
            slideToClickedSlide: true,
            autoplay: reducedMotion ? false : { delay: DELAY, disableOnInteraction: false, pauseOnMouseEnter: true },
            pagination: { el: ".t-pagination", clickable: true },
            navigation: { nextEl: ".t-next", prevEl: ".t-prev" },
            a11y: { enabled: true },
            on: {
                slideChange: (s) => syncVoices(s.activeIndex),
                autoplayPause: () => el.classList.add("is-paused"),
                autoplayResume: () => el.classList.remove("is-paused"),
            },
        });

        voices.forEach((v) => v.addEventListener("click", () => swiper.slideTo(Number(v.dataset.slide))));
    }

    /* =========================
       FOOTER — courses list from course cards
    ========================= */
    function initFooter() {
        const list = $("#footerCourses");
        if (list) {
            const frag = document.createDocumentFragment();
            $$(".prog__name").forEach((h) => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = "#courses";
                a.textContent = h.textContent;
                li.appendChild(a);
                frag.appendChild(li);
            });
            list.appendChild(frag);
        }
        const year = $("#year");
        if (year) year.textContent = new Date().getFullYear();
    }

    /* =========================
       BOOT
    ========================= */
    document.addEventListener("DOMContentLoaded", () => {
        initImageFallback();
        initNavigation();
        initMobileMenu();
        initHeroSlider();
        initParallax();
        initScrollParallax();
        initScrollAnimations();
        initCounters();
        initPrograms();
        initServiceInteraction();
        initLearningJourney();
        initPathways();
        initCustomCursor();
        initBackToTop();
        initFAQ();
        initTestimonials();
        initFooter();
        runScroll();
    });
})();
