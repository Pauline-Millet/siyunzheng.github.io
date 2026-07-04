/**
 * app.js — renders project cards and detail overlay.
 * No build step required.
 */
(function () {
  "use strict";

  var workGrid      = document.getElementById("work-grid");
  var overlay       = document.getElementById("detail-overlay");
  var detailContent = document.getElementById("detail-content");
  var closeBtn      = document.getElementById("detail-close");
  var lastFocused   = null;

  var HOMEPAGE_IDS = [
    "extra-vertebra",
    "echoes-of-the-heart-sea",
    "mossmate",
    "eternal-echoes",
    "visual-communication-archive",
    "independent-practice",
  ];

  /* ── work card ── */
  function workCard(project) {
    var btn = document.createElement("button");
    btn.className = "work-card";
    btn.type = "button";
    btn.setAttribute("aria-haspopup", "dialog");

    var thumb = document.createElement("div");
    if (project.cover) {
      thumb.className = "work-thumb";
      thumb.style.backgroundImage = "url(" + project.cover + ")";
      thumb.style.backgroundSize = "cover";
      thumb.style.backgroundPosition = "center";
    } else {
      thumb.className = "work-thumb " + project.placeholderTone;
    }
    thumb.setAttribute("role", "img");
    thumb.setAttribute("aria-label", project.title);
    if (project.video) {
      var vid = document.createElement("video");
      vid.className = "thumb-video";
      vid.src = project.video;
      vid.muted = true;
      vid.loop = true;
      vid.playsinline = true;
      vid.preload = "none";
      thumb.appendChild(vid);

      btn.addEventListener("mouseenter", function () { vid.play(); });
      btn.addEventListener("mouseleave", function () { vid.pause(); vid.currentTime = 0; });
    }

    var cat = document.createElement("div");
    cat.className = "work-cat";
    cat.textContent = project.category;

    var title = document.createElement("div");
    title.className = "work-title";
    title.textContent = project.title;

    var meta = document.createElement("div");
    meta.className = "work-meta";
    if (project.year && project.projectType) {
      meta.textContent = project.year + " \u00b7 " + project.projectType;
    } else if (project.year) {
      meta.textContent = project.year;
    }

    var oneliner = document.createElement("div");
    oneliner.className = "work-oneliner";
    oneliner.textContent = project.oneLiner;

    btn.appendChild(thumb);
    btn.appendChild(cat);
    btn.appendChild(title);
    if (meta.textContent) btn.appendChild(meta);
    btn.appendChild(oneliner);

    btn.addEventListener("click", function () { openDetail(project.id); });
    return btn;
  }

  /* ── render grid ── */
  function renderGrid() {
    workGrid.innerHTML = "";
    HOMEPAGE_IDS.forEach(function (id) {
      var p = PROJECTS.find(function (x) { return x.id === id; });
      if (p) workGrid.appendChild(workCard(p));
    });
  }

  /* ── detail text row ── */
  function detailRow(label, value) {
    if (!value) return "";
    return '<dl class="detail-row"><dt>' + label + '</dt><dd><p>' + value + '</p></dd></dl>';
  }

  /* ── open detail ── */
  function openDetail(id) {
    var p = PROJECTS.find(function (x) { return x.id === id; });
    if (!p) return;
    lastFocused = document.activeElement;

    /* collect all media */
    var mediaItems = [];
    if (p.cover)  mediaItems.push({ type: "image", src: p.cover });
    if (p.images) p.images.forEach(function (src) { mediaItems.push({ type: "image", src: src }); });
  
    var currentIndex = 0;
    var autoTimer    = null;

    /* build one slide element */
    function buildSlide(item) {
      var div = document.createElement("div");
      div.className = "detail-slide";
      if (item.type === "video") {
        div.innerHTML = '<video controls playsinline><source src="' + item.src + '" type="video/mp4"></video>';
      } else {
        div.innerHTML = '<img src="' + item.src + '" alt="" loading="lazy">';
      }
      return div;
    }

    /* update active/prev/next classes and dots */
    function updateCarousel() {
      var track = document.getElementById("detail-track");
      if (!track) return;
      var slides = track.querySelectorAll(".detail-slide");
      var dots   = document.querySelectorAll(".carousel-dot");
      var total  = mediaItems.length;
      slides.forEach(function (slide, i) {
        slide.classList.remove("is-active", "is-prev", "is-next");
        if (i === currentIndex) {
          slide.classList.add("is-active");
        } else if (i === (currentIndex - 1 + total) % total) {
          slide.classList.add("is-prev");
        } else if (i === (currentIndex + 1) % total) {
          slide.classList.add("is-next");
        }
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === currentIndex);
      });
    }

    function goTo(index) {
      currentIndex = (index + mediaItems.length) % mediaItems.length;
      updateCarousel();
    }

    function startAuto() {
      autoTimer = setInterval(function () { goTo(currentIndex + 1); }, 2000);
    }

    function stopAuto() { clearInterval(autoTimer); }

    /* ── build html string ── */
    var html = "";

    /* carousel or placeholder */
    if (mediaItems.length > 0) {
      html += '<div class="detail-carousel">';
      html += '  <div class="detail-carousel-track" id="detail-track"></div>';
      html += '  <div class="detail-carousel-controls">';
      html += '    <button class="carousel-btn" id="c-prev">&larr;</button>';
      html += '    <div class="carousel-dots" id="c-dots"></div>';
      html += '    <button class="carousel-btn" id="c-next">&rarr;</button>';
      html += '  </div>';
      html += '</div>';
    } else {
      html += '<div class="detail-hero-thumb ' + (p.placeholderTone || "") + '"></div>';
    }

    /* title block */
    html += '<div class="detail-eyebrow"><span>' + p.category + '</span></div>';
    html += '<h1 class="detail-title" id="detail-title">' + p.title + '</h1>';
    if (p.year || p.projectType) {
      html += '<div class="detail-meta">' + [p.year, p.projectType].filter(Boolean).join(" \u00b7 ") + '</div>';
    }
    html += '<p class="detail-oneliner">' + p.oneLiner + '</p>';

    /* Project Evolution stages */
    if (p.stages && p.stages.length) {
      html += '<div class="project-evolution">';
      html += '<h2 class="evolution-heading">' + (p.evolutionTitle || "Project Evolution") + '</h2>';
      html += '<div class="evolution-grid">';
      p.stages.forEach(function (stage) {
        html += '<div class="evolution-stage">';
        /* stage image */
        if (stage.image) {
          html += '<div class="evolution-img" style="background-image:url(' + stage.image + ');background-size:cover;background-position:center;"></div>';
        } else {
          html += '<div class="evolution-img evolution-img--placeholder"></div>';
        }
        html += '<div class="evolution-meta">';
        html += '<span class="evolution-number">' + stage.number + '</span>';
        html += '<span class="evolution-year">' + stage.year + '</span>';
        html += '</div>';
        html += '<div class="evolution-title">' + stage.title + '</div>';
        html += '<p class="evolution-description">' + stage.description + '</p>';
        html += '</div>';
        /* transition sentence between stages */
        if (stage.number === "01" && p.evolutionTransition) {
          html += '<p class="evolution-transition">' + p.evolutionTransition + '</p>';
        }
      });
      html += '</div>';
      html += '</div>';
    }

    /* text rows */
    html += detailRow("Context",          p.context);
    html += detailRow("Design question",  p.designQuestion);
    html += detailRow("Process",          p.process);
    html += detailRow("Key decisions",    p.keyDecisions);
    html += detailRow("Outcome",          p.outcome);
    html += detailRow("Reflection",       p.reflection);

    /* tools */
    if (p.tools && p.tools.length) {
      html += '<div class="detail-tools">' +
        p.tools.map(function (t) { return "<span>" + t + "</span>"; }).join("") +
        '</div>';
    }

    /* inject everything */
    detailContent.innerHTML = html;

    /* set up carousel interactivity */
    if (mediaItems.length > 0) {
      var track        = document.getElementById("detail-track");
      var dotsContainer = document.getElementById("c-dots");

      mediaItems.forEach(function (item, i) {
        track.appendChild(buildSlide(item));
        var dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Go to " + (i + 1));
        dot.addEventListener("click", function () { stopAuto(); goTo(i); startAuto(); });
        dotsContainer.appendChild(dot);
      });

      updateCarousel();
      if (mediaItems.length > 1) startAuto();

      document.getElementById("c-prev").addEventListener("click", function () { stopAuto(); goTo(currentIndex - 1); startAuto(); });
      document.getElementById("c-next").addEventListener("click", function () { stopAuto(); goTo(currentIndex + 1); startAuto(); });

      track.addEventListener("mouseenter", stopAuto);
      track.addEventListener("mouseleave", function () { if (mediaItems.length > 1) startAuto(); });
    }

    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  /* ── close detail ── */
  function closeDetail() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    detailContent.innerHTML = "";
    if (lastFocused) lastFocused.focus();
  }

  closeBtn.addEventListener("click", closeDetail);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeDetail();
  });

  renderGrid();

})();
