# PREMIUM LEARNING CLASSES WEBSITE — MASTER DESIGN & DEVELOPMENT PROMPT

Act as a **Senior Front-End Developer, UI/UX Designer, Motion Designer, Creative Web Designer, and Educational Website Specialist**.

Your task is to design and develop a **PREMIUM, MODERN, HIGHLY INTERACTIVE, RESPONSIVE learning/classes website homepage** for an educational institute.

The website must feel like a **premium international learning platform / modern education brand**, NOT like a generic coaching-class template.

Use:

- HTML5
- CSS3
- Vanilla JavaScript
- Swiper.js
- AOS.js
- Font Awesome
- Google Fonts
- Custom SVG graphics
- CSS animations
- JavaScript micro-interactions

---

# 1. REFERENCE WEBSITES

Use these websites as **design and UX references only**:

Reference 1:
https://knowlytutorials.com/teams/

Reference 2:
https://knowly-learning.kompatriot.chatgpt.site

Study the references for:

- Overall visual hierarchy
- Education-focused layouts
- Typography
- Navigation structure
- Section spacing
- Card design
- Learning/course presentation
- CTA placement
- User experience
- Modern animation ideas

IMPORTANT:

Do NOT simply copy the reference websites.

Create a **new, original premium design** inspired by their modern educational approach.

The final website should look more polished, modern, interactive and visually memorable.

---

# 2. WEBSITE OBJECTIVE

The website is for **learning classes / educational courses / training programs**.

The design should immediately communicate:

- Learning
- Knowledge
- Growth
- Career development
- Skills
- Expert teaching
- Student success
- Modern education
- Technology
- Confidence
- Professional development

The overall visual feeling should be:

**Modern  
Premium  
Smart  
Educational  
Friendly  
Professional  
Interactive  
Trustworthy  
Youthful but sophisticated**

Avoid making the website look like:

- Old-style coaching classes
- Generic school website
- Basic Bootstrap template
- Overly colorful children's website
- Corporate consulting website

---

# 3. DESIGN CONCEPT

Create a unique visual identity around the idea:

## "LEARN → BUILD → GROW"

Use this concept throughout the website.

Possible visual language:

- Floating learning cards
- Abstract 3D shapes
- Gradient blobs
- Knowledge nodes
- Connecting lines
- Floating icons
- Course cards
- Student avatars
- Animated statistics
- Skill progress indicators
- Interactive illustrations
- Learning-path graphics
- Abstract education-related SVG graphics

The design should feel like a combination of:

**Modern EdTech + Premium Coaching Institute + SaaS-style UI + Creative Learning Platform**

---

# 4. COLOR SYSTEM

Analyze the provided logo if available and derive the brand colors.

Create CSS variables:

```css
:root {
    --primary: ...;
    --secondary: ...;
    --accent: ...;
    --dark: ...;
    --light: ...;
    --surface: ...;
    --text: ...;
    --muted: ...;
    --border: ...;
}
```

Use a sophisticated color palette.

Prefer:

- Clean white backgrounds
- Soft neutral sections
- Dark navy/charcoal sections
- One strong brand color
- One vibrant accent
- Premium gradients

Avoid excessive colors.

Gradients should be subtle and modern.

---

# 5. TYPOGRAPHY

Use premium Google Fonts.

Recommended:

- Inter
- Manrope
- Plus Jakarta Sans
- Poppins

Use:

- 700–800 weight for major headings
- 500–600 for subheadings
- 400–500 for body text

Hero typography should be large and confident.

Example visual hierarchy:

```text
Learn Better.
Build Skills.
Grow Faster.
```

Use animated text reveal for major headings.

---

# 6. PROJECT STRUCTURE

Create:

```text
/
│
├── index.html
│
└── assets/
    ├── style.css
    ├── script.js
    │
    └── images/
        ├── logo.webp
        ├── hero-main.webp
        ├── hero-student.webp
        ├── about.webp
        ├── course-1.webp
        ├── course-2.webp
        ├── course-3.webp
        ├── course-4.webp
        ├── service-1.webp
        ├── service-2.webp
        ├── service-3.webp
        └── ...
```

Use `.webp` images for performance.

If actual images are not available, use clearly structured placeholder `.webp` paths that can easily be replaced.

---

# 7. REQUIRED CDN LIBRARIES

Include:

Google Fonts

Font Awesome Free

Swiper.js

AOS.js

Do not use unnecessary frameworks.

Use Vanilla JavaScript for custom interactions.

---

# 8. TOP INFORMATION BAR

Create a thin premium top information bar.

Include where applicable:

- Welcome message
- Phone
- Email
- Location
- Social media icons

Example:

```text
Empowering Learners. Building Better Futures.
```

Keep it minimal.

On mobile, simplify the information instead of creating clutter.

---

# 9. MAIN NAVIGATION

Create a premium sticky navigation.

Left:

- Logo

Center/right:

- Home
- About
- Courses
- Services
- Why Choose Us
- Contact

CTA:

**Join / Enquire Now**

Navbar behavior:

### At top

Clean transparent/white appearance.

### On scroll down

Navbar smoothly hides upward.

### On scroll up

Navbar appears again and becomes sticky.

### Sticky state

Use:

- backdrop blur
- subtle shadow
- slight background opacity
- smooth transition

Navigation links should have animated underline effects.

---

# 10. MOBILE NAVIGATION

Create a premium animated mobile menu.

Hamburger:

→ transforms into X

Menu:

→ slides from right

Overlay:

→ dark translucent background

Menu items:

→ appear sequentially

Dropdowns:

→ accordion animation

Close menu when:

- X clicked
- Overlay clicked
- Link clicked

Prevent background scrolling while menu is open.

---

# 11. HERO SECTION

Create a **FULL-SCREEN PREMIUM EDUCATION HERO**.

Use Swiper.js.

Create 3 slides.

Possible themes:

### Slide 1

**Learn Skills That Shape Your Future**

Supporting text:

Professional learning programs designed to help students build practical knowledge and confidence.

CTA:

**Explore Courses**

Secondary CTA:

**Talk to Us**

---

### Slide 2

**Turn Knowledge Into Real Skills**

Show:

- Student
- Laptop
- Course interface
- Floating skill cards

CTA:

**View Programs**

---

### Slide 3

**Your Learning Journey Starts Here**

Show an inspiring learning environment.

CTA:

**Start Learning**

IMPORTANT:

Only use factual claims supplied by the client.

Do NOT invent:

- placement percentages
- student numbers
- years of experience
- awards
- rankings
- certifications

---

# 12. HERO VISUAL DESIGN

Do NOT use a simple background image with text.

Create an advanced composition.

Hero can include:

- Large student image
- Floating course cards
- Floating book/laptop icons
- Skill tags
- Circular gradient shapes
- Animated SVG lines
- Small floating notification cards
- Abstract geometric elements

Example floating cards:

```text
✓ Practical Learning
✓ Expert Guidance
✓ Skill Development
```

Only include claims that are actually supported.

---

# 13. HERO ANIMATIONS

Swiper transition:

1000–1400ms

Background:

Slow cinematic zoom.

Heading:

```text
opacity: 0
transform: translateY(40px)
```

→ reveal upward.

Description:

Delayed fade-up.

CTA:

Fade + scale.

Floating elements:

Continuous subtle floating animation.

Decorative SVG:

Slow movement.

Do not make the animation distracting.

---

# 14. HERO INTERACTIVE PARALLAX

On desktop:

Move selected floating elements according to mouse position.

Example:

```text
Mouse movement
      ↓
Background: subtle movement
Student image: medium movement
Floating cards: stronger movement
Decorative shapes: very subtle movement
```

Disable heavy parallax on mobile.

---

# 15. SCROLL INDICATOR

Add:

**Scroll to Explore**

with an animated vertical line.

Line continuously moves downward.

---

# 16. TRUST / QUICK HIGHLIGHTS

Immediately below the hero, create a premium trust strip.

Possible items:

- Courses
- Learning Support
- Practical Training
- Expert Guidance

Only use information actually provided by the client.

Do not invent numerical statistics.

Use animated icons and subtle hover effects.

---

# 17. ABOUT SECTION

Do NOT create a boring standard two-column layout.

Create an asymmetric premium layout.

Left:

Large image.

Small overlapping image/card.

Floating knowledge card.

Right:

Eyebrow:

**ABOUT US**

Large heading:

**Learning Designed Around Your Growth**

Content:

Use actual company information provided by the client.

CTA:

**Know More**

---

# 18. ABOUT IMAGE ANIMATION

When entering viewport:

Main image:

→ clip-path reveal

Secondary image:

→ slide from opposite direction

Floating card:

→ scale + fade

Decorative circle:

→ rotate slowly

Use subtle parallax.

---

# 19. COURSES / PROGRAMS SECTION

Create one of the most visually important sections.

Heading:

**Explore Our Learning Programs**

Subheading:

Help users quickly understand the available learning options.

Create premium course cards.

Each card:

- Course image
- Category
- Course title
- Short description
- Duration if provided
- Level if provided
- CTA
- Arrow

Do NOT invent course names or technical information.

Use only actual course information provided by the client.

---

# 20. COURSE CARD DESIGN

Do NOT use plain rectangular cards.

Create sophisticated cards using:

- Large image
- Rounded corners
- Gradient overlay
- Floating category badge
- Course number
- Hover glow
- Decorative line
- Arrow animation

Hover:

Image:

→ scale(1.08)

Card:

→ translateY(-10px)

Overlay:

→ gradient intensifies

Arrow:

→ translateX(8px)

Border:

→ animated accent

---

# 21. COURSE FILTER

If multiple course categories exist, create:

```text
All
School
College
Professional
Technical
Other
```

Only show categories that actually exist.

Use Vanilla JavaScript.

When category changes:

Cards:

fade out

→ rearrange

→ fade in

No page reload.

---

# 22. ⭐ UNIQUE SERVICES SECTION ⭐

THIS SECTION MUST BE ONE OF THE MOST CREATIVE PARTS OF THE WEBSITE.

Do NOT create a normal 3-column service card layout.

Create a **premium interactive "Learning Experience" section**.

Heading:

**More Than Classes. A Complete Learning Experience.**

Create a large interactive visual area.

---

# 23. SERVICES — INTERACTIVE STACKED CARDS

Create 4–6 service/learning experience cards.

Example structure:

```text
01
Learning Programs

02
Personal Guidance

03
Practical Learning

04
Doubt Support

05
Skill Development
```

ONLY use services that are genuinely offered by the institute.

---

# 24. SERVICES — UNIQUE HORIZONTAL SCROLL EFFECT

Desktop:

Create a horizontal scrolling/pinned section.

As the user scrolls vertically:

The service cards move horizontally.

Each card enters the viewport with:

- scale
- blur reduction
- opacity
- translate
- image reveal

Active card becomes larger.

Inactive cards remain slightly smaller.

Example:

```text
       ┌──────────────┐
       │ SERVICE 01   │
       │              │
       └──────────────┘

             ↓

       ┌──────────────────┐
       │   SERVICE 02     │
       │                  │
       └──────────────────┘

                    ↓

       ┌──────────────────┐
       │   SERVICE 03     │
       └──────────────────┘
```

Use CSS + Vanilla JavaScript.

Do not use GSAP.

---

# 25. SERVICES — ALTERNATIVE MOBILE EXPERIENCE

On mobile:

Do NOT force horizontal scrolling.

Convert services into vertical interactive cards.

On scroll:

Card enters with:

- fade-up
- scale
- clip-path reveal

Cards should remain easy to read and touch.

---

# 26. SERVICES — ANIMATED ICONS

Each service should have a custom SVG icon.

Icons should animate on hover.

Examples:

Learning:

→ book opens

Guidance:

→ user/mentor connection

Skills:

→ progress line

Practice:

→ cursor/check animation

Support:

→ chat bubble pulse

Use stroke animations:

```css
stroke-dasharray
stroke-dashoffset
```

---

# 27. SERVICES — CENTER VISUAL

Place a large central animated illustration.

Concept:

**Learning Journey**

Create SVG nodes:

```text
Discover
   ↓
Learn
   ↓
Practice
   ↓
Improve
   ↓
Grow
```

Animate connecting lines as the user scrolls.

The central graphic should look like a premium EdTech product interface.

---

# 28. SERVICES — MOUSE INTERACTION

Desktop:

When mouse moves over service cards:

- Card tilts very slightly
- Background gradient moves
- Icon reacts
- Decorative particles move
- Arrow moves
- Border glow follows cursor

Keep movement subtle.

No excessive 3D effects.

---

# 29. WHY CHOOSE US

Create a dark premium section.

Heading:

**Why Learn With Us?**

Use only genuine differentiators provided by the client.

Potential categories:

- Expert Guidance
- Practical Learning
- Personalized Support
- Structured Learning
- Skill Development
- Student-Focused Approach

Do not make unsupported claims.

Cards should include:

- Number
- Icon
- Heading
- Description

Hover:

Card lifts.

Icon scales.

Accent line animates.

Background gradient appears.

---

# 30. LEARNING JOURNEY SECTION

Create a unique visual timeline.

Heading:

**Your Learning Journey**

Example:

```text
01 Discover
      ↓
02 Learn
      ↓
03 Practice
      ↓
04 Improve
      ↓
05 Grow
```

Use animated SVG path connecting each stage.

As user scrolls:

The path progressively draws.

Each stage activates.

Active stage:

- icon glow
- number scale
- text reveal

This should feel like a premium interactive product journey.

---

# 31. STUDENT / LEARNING ENVIRONMENT SECTION

Create a visually rich section showcasing learning.

Use:

- Student imagery
- Laptop
- Books
- Classroom imagery
- Learning environment

Use only real images or replaceable `.webp` placeholders.

Add floating cards:

```text
Learning
Practice
Progress
Growth
```

Use subtle parallax.

---

# 32. INDUSTRIES / CAREER APPLICATIONS

If relevant to the institute, create:

**Where These Skills Can Take You**

Create interactive cards.

Possible categories should be based ONLY on the actual courses.

Examples:

- Technology
- Business
- Design
- Finance
- Communication

Do not add irrelevant categories.

Hover:

Image zoom.

Text moves upward.

Arrow slides right.

---

# 33. RESULTS / HIGHLIGHTS

If actual statistics are provided, create animated counters.

Example:

```text
00+
Courses
00+
Students
00+
Years
00+
Programs
```

IMPORTANT:

Never invent numbers.

If numbers are unavailable, replace counters with qualitative highlights.

---

# 34. TESTIMONIALS

Create premium Swiper testimonial section.

Each card:

- Quote icon
- Testimonial
- Person name
- Designation if actually known
- Rating only if genuine/approved

If testimonials are not provided:

Use clearly marked placeholder content such as:

**Student testimonial to be added**

Do not fabricate realistic testimonials and present them as genuine.

---

# 35. TESTIMONIAL VISUAL

Use:

- Large quotation mark
- Soft gradient background
- Student image/avatar if available
- Animated decorative circles
- Swiper pagination
- Navigation arrows

Transition:

Smooth fade/slide.

---

# 36. FAQ SECTION

Create premium accordion FAQ.

Questions should be based on actual information.

Example categories:

- Courses
- Admissions
- Learning format
- Duration
- Support
- Fees

Only include answers when actual information is available.

Accordion animation:

Height transition.

Plus icon:

→ rotates into X.

---

# 37. CTA SECTION

Create a visually powerful final CTA.

Heading:

**Ready to Start Your Learning Journey?**

Supporting text:

A short professional message.

Buttons:

**Explore Courses**

**Enquire Now**

Optional:

WhatsApp

Call

Email

Only use contact information provided by the client.

---

# 38. CONTACT SECTION

Create a premium contact-information layout.

Possible cards:

### Visit Us

Address

### Call Us

Phone

### Email Us

Email

### WhatsApp

WhatsApp

Use clickable:

```html
tel:
mailto:
https://wa.me/
```

No contact form unless specifically requested.

---

# 39. FOOTER

Create a premium multi-column footer.

Column 1:

Logo

Short educational brand description.

Column 2:

Quick Links

- Home
- About
- Courses
- Services
- Why Choose Us
- Contact

Column 3:

Courses

Populate dynamically from actual course data.

Column 4:

Contact

Address

Phone

Email

Social media.

Add subtle background pattern.

---

# 40. COPYRIGHT

If required by the client, preserve the provided copyright wording exactly.

If the website is being developed by Mesotek, use:

```html
<a href="https://www.mesotek.com/" target="_blank" rel="noopener">
    Designed by Mesotek
</a>
```

Do not alter the wording.

---

# 41. CUSTOM CURSOR

Desktop only.

Normal:

Small circular cursor.

Hover over:

- Button
- Card
- Image
- Link

Cursor expands.

Optional text:

```text
VIEW
```

or

```text
EXPLORE
```

Disable completely on touch devices.

---

# 42. BACK TO TOP

Create floating circular back-to-top button.

Initially hidden.

After scrolling:

→ appears.

Click:

→ smooth scroll.

Add circular progress indicator using SVG.

---

# 43. ADVANCED SCROLL ANIMATIONS

Use AOS for primary reveal.

Implement additional CSS/JS animations:

1. Fade-up
2. Fade-left
3. Fade-right
4. Scale reveal
5. Clip-path reveal
6. Parallax
7. Floating elements
8. Counter animation
9. SVG line drawing
10. Course-card stagger
11. Service-card animation
12. Navbar hide/show
13. Image zoom
14. Text reveal
15. Background movement
16. Interactive hover effects
17. Scroll-based learning journey animation

Animations should feel:

**Premium + Smooth + Intentional**

Never animate everything simultaneously.

---

# 44. TEXT REVEAL

Major headings should use line-by-line reveal.

Initial:

```css
opacity: 0;
transform: translateY(30px);
```

Final:

```css
opacity: 1;
transform: translateY(0);
```

Use staggered timing.

Do not aggressively animate body paragraphs.

---

# 45. IMAGE ANIMATIONS

Use:

- clip-path
- scale
- translate
- opacity
- blur
- parallax

Images should feel cinematic.

Avoid excessive movement.

---

# 46. MICRO INTERACTIONS

Buttons:

- Shine effect
- Arrow movement
- Scale
- Shadow
- Gradient transition

Links:

Animated underline.

Cards:

Lift.

Icons:

Scale/rotate.

Images:

Zoom.

Navigation:

Smooth indicator.

---

# 47. PREMIUM SVG GRAPHICS

Create custom SVG graphics for:

- Learning path
- Connecting lines
- Background patterns
- Service icons
- Decorative circles
- Progress indicators
- Technical/learning nodes

Do not rely only on stock icons.

Use SVG stroke animations where suitable.

---

# 48. PERFORMANCE

The website must remain fast.

Use:

- WebP
- Lazy loading
- CSS transforms
- IntersectionObserver
- requestAnimationFrame where required
- Minimal DOM manipulation
- Event delegation where appropriate

Avoid unnecessary JavaScript loops.

No heavy animation libraries other than:

- Swiper
- AOS

Respect:

```css
prefers-reduced-motion
```

Users who prefer reduced motion should receive simplified animations.

---

# 49. RESPONSIVE DESIGN

Perfectly support:

```text
320px
375px
414px
768px
1024px
1280px
1440px
1920px+
```

Pay special attention to:

- Hero
- Navigation
- Mobile drawer
- Course cards
- Services section
- Horizontal service animation
- Typography
- Images
- Footer
- CTA
- Touch interactions

No horizontal overflow.

The unique desktop service animation must gracefully transform into a mobile vertical layout.

---

# 50. ACCESSIBILITY

Use:

- Semantic HTML5
- Correct heading hierarchy
- Alt attributes
- ARIA labels
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Accessible mobile menu
- Good contrast
- Reduced-motion support

---

# 51. SEO

Include:

- Title
- Meta description
- Keywords naturally in content
- Open Graph
- Canonical URL
- Semantic headings
- Image alt text
- Organization schema JSON-LD
- EducationalOrganization schema where appropriate

Do not add unsupported claims to schema.

---

# 52. JAVASCRIPT ARCHITECTURE

Use modular Vanilla JavaScript functions.

Example structure:

```javascript
initNavigation();
initMobileMenu();
initHeroSlider();
initCourseFilter();
initServiceInteraction();
initCounters();
initScrollAnimations();
initParallax();
initCustomCursor();
initBackToTop();
initFAQ();
initLearningJourney();
```

Avoid global variables wherever possible.

Use:

- IntersectionObserver
- requestAnimationFrame
- passive event listeners where appropriate

---

# 53. ACCESSIBLE MOBILE SERVICE EXPERIENCE

IMPORTANT:

The desktop Services section can use advanced scroll interaction.

But mobile must remain:

- Touch friendly
- Fast
- Easy to understand
- Vertically scrollable
- No forced horizontal scrolling

---

# 54. CONTENT RULE

CRITICAL:

Use only information provided by the client.

Do NOT invent:

- Courses
- Course duration
- Fees
- Student numbers
- Placement percentages
- Certifications
- Awards
- Partnerships
- Client names
- Faculty credentials
- Rankings
- Reviews
- Statistics

If information is missing:

Use clearly identifiable placeholders such as:

```text
Course information to be added
```

or

```text
Service details to be provided
```

Do not create fake information.

---

# 55. FINAL VISUAL EXPERIENCE

The final homepage should feel like:

### A PREMIUM MODERN EDTECH BRAND

The visual hierarchy should guide the visitor through:

```text
HERO
  ↓
TRUST / HIGHLIGHTS
  ↓
ABOUT
  ↓
COURSES
  ↓
SERVICES / LEARNING EXPERIENCE
  ↓
WHY CHOOSE US
  ↓
LEARNING JOURNEY
  ↓
APPLICATION / CAREER
  ↓
TESTIMONIALS
  ↓
FAQ
  ↓
CTA
  ↓
CONTACT
  ↓
FOOTER
```

The **Services / Learning Experience section should be the signature interactive section of the website**.

It should be memorable enough that the visitor feels:

> "This is not a normal coaching-class website."

---

# 56. CODE QUALITY

Write complete production-quality code.

Use:

- CSS variables
- Reusable classes
- Semantic section IDs
- Modular JavaScript
- Clear comments
- No unnecessary duplication
- No inline CSS unless absolutely necessary
- No unnecessary frameworks

Every section should have clear HTML comments.

Example:

```html
<!-- =========================
     HERO SECTION
========================= -->
```

---

# 57. FINAL OUTPUT

Provide complete working code for:

### 1. index.html

### 2. assets/style.css

### 3. assets/script.js

The HTML must include all required CDN links.

The files must work by simply placing them in:

```text
/
├── index.html
└── assets/
    ├── style.css
    ├── script.js
    └── images/
```

Do not provide pseudo-code.

Do not provide incomplete snippets.

Do not say:

```text
add your code here
```

Provide actual working HTML, CSS and JavaScript.

The final result should look like a:

**PREMIUM INTERNATIONAL LEARNING / EDUCATION WEBSITE**

with:

- Sophisticated UI
- Unique Services section
- Interactive learning journey
- Cinematic hero
- Premium course cards
- Smooth scroll animations
- SVG animations
- Parallax effects
- Interactive micro-interactions
- Responsive mobile navigation
- Custom cursor
- Smooth Swiper sliders
- AOS reveals
- Performance optimization
- Accessibility
- SEO
- Modern EdTech visual language

The design should be **original, premium, highly interactive and significantly more sophisticated than a standard coaching-class website**.