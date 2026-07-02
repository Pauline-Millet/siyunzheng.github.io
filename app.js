/**
 * app.js — bilingual (EN / ZH) portfolio renderer. 
 * No build step required; open index.html directly in a browser.
 */
(function () {
  "use strict";

  /* ── state ── */
  var lang = localStorage.getItem("sz-lang") || "en";

  /* ── static translations ── */
  var T = {
    en: {
      navWork: "Work",
      navAbout: "About",
      navCV: "CV",
      navContact: "Contact",
      heroEyebrow: "Visual designer & creative practitioner",
      heroTagline: "Visual designer and creative practitioner working across image, interaction, space and emerging technology.",
      heroBasedLabel: "Based in",
      heroBasedVal: "London / Beijing",
      heroBgLabel: "Background",
      heroBgVal: "Product Design (BA) — Creative Robotics (MSc)",
      heroFocusLabel: "Current focus",
      heroFocusVal: "Image Experience Design",
      workEyebrow: "Selected Works",
      workTitle: "Five projects across image, interaction and space",
      workNote: "Click a project to read its full process, key decisions and reflection.",
      aboutEyebrow: "About",
      aboutTitle: "Working across image, interaction and physical making",
      aboutP1: "I am a visual designer and creative practitioner with a background in product design and creative robotics. My work moves across image, interaction, space and physical prototyping. I am interested in how visual systems and emerging technologies shape the way people perceive, navigate and experience information.",
      aboutP2: "My current research, based at the Central Academy of Fine Arts School of Design, focuses on image experience design — looking at visual culture, typography, viewing order and garden inscriptions alongside emerging technology. This is a distinct, current research context, separate from my earlier work in brain–computer interaction and creative robotics, which remains part of my background rather than my present research direction.",
      aboutP3: "I'm not looking to be defined as a single discipline. My longer-term interest is in roles that combine visual design with research, space and prototyping — work where a complex idea needs to become something clear and experienced, rather than just illustrated.",
      eduTitle: "Education",
      edu1: "Central Academy of Fine Arts — BA Product Design, 2020–2024",
      edu2: "Outstanding Graduate, 2024 · Second-Class Scholarship, 2023",
      edu3: "University of the Arts London, Creative Computing Institute — MSc Creative Robotics, 2024–2025",
      edu4: "Current research — Central Academy of Fine Arts, School of Design: Image Experience Design",
      skillsTitle: "Core skills",
      skillCat1: "Visual & Graphic",
      skillCat2: "Interaction & Technology",
      skillCat3: "Product & Spatial",
      skillCat4: "Photography",
      recogTitle: "Recognition",
      recog1: "Central Academy of Fine Arts, Outstanding Graduate, 2024",
      recog2: "Second-Class Scholarship, 2023",
      recog3: "\"九张牌\" 48-hour board game competition, winner, 2023",
      recog4: "Volunteer, Future Academic Forum (未·未来论坛)",
      contactTitle: "Open to early-career roles in visual, interaction and experience design.",
      linkedinLabel: "LinkedIn",
      cvLabel: "Download CV",
      footerRight: "London / Beijing",
      detailCloseLabel: "Close",
      detailRoleLabel: "My role",
      detailContextLabel: "Context",
      detailQLabel: "Design question",
      detailProcessLabel: "Process",
      detailDecisionsLabel: "Key decisions",
      detailOutcomeLabel: "Outcome",
      detailReflLabel: "Reflection",
      placeholder: "Placeholder — image to be replaced",
    },
    zh: {
      navWork: "作品",
      navAbout: "关于",
      navCV: "简历",
      navContact: "联系",
      heroEyebrow: "视觉设计师 / 创意实践者",
      heroTagline: "跨越图像、交互、空间与新兴技术的设计实践。",
      heroBasedLabel: "所在地",
      heroBasedVal: "伦敦 / 北京",
      heroBgLabel: "教育背景",
      heroBgVal: "产品设计（本科）— 创意机器人（硕士）",
      heroFocusLabel: "当前研究方向",
      heroFocusVal: "图像体验设计",
      workEyebrow: "精选作品",
      workTitle: "五个项目，跨越图像、交互与空间",
      workNote: "点击项目查看完整过程、关键决策与反思。",
      aboutEyebrow: "关于",
      aboutTitle: "在图像、交互与实体制作之间工作",
      aboutP1: "我是一位视觉设计师和创意实践者，具有产品设计与创意机器人背景。我的工作跨越图像、交互、空间和实体原型制作。我关注视觉系统和新兴技术如何塑造人们感知、导航和体验信息的方式。",
      aboutP2: "我目前在中央美术学院设计学院从事图像体验设计研究，关注视觉文化、文字设计、观看秩序和园林题字，以及它们与新兴技术的关系。这是我当前独立的研究方向，与我早期在脑机交互和创意机器人方面的工作有所不同——后者是我的背景，而非现在的研究重点。",
      aboutP3: "我不希望把自己局限在单一的学科定义里。长期来看，我对那些将视觉设计与研究、空间和原型制作相结合的工作感兴趣——在那里，复杂的想法需要被转化为清晰的、可体验的东西，而不仅仅是一张效果图。",
      eduTitle: "教育背景",
      edu1: "中央美术学院 — 产品设计学士，2020–2024",
      edu2: "优秀毕业生，2024 · 二等奖学金，2023",
      edu3: "伦敦艺术大学创意计算研究所 — 创意机器人硕士，2024–2025",
      edu4: "当前研究 — 中央美术学院设计学院：图像体验设计",
      skillsTitle: "核心技能",
      skillCat1: "视觉与平面设计",
      skillCat2: "交互与创意技术",
      skillCat3: "产品与空间设计",
      skillCat4: "摄影",
      recogTitle: "荣誉与经历",
      recog1: "中央美术学院优秀毕业生，2024",
      recog2: "二等奖学金，2023",
      recog3: "「九张牌」48 小时桌游设计竞赛，获奖，2023",
      recog4: "未·未来学术论坛 志愿者",
      contactTitle: "欢迎联系，探讨视觉、交互与体验设计领域的机会。",
      linkedinLabel: "LinkedIn",
      cvLabel: "下载简历",
      footerRight: "伦敦 / 北京",
      detailCloseLabel: "关闭",
      detailRoleLabel: "我的角色",
      detailContextLabel: "项目背景",
      detailQLabel: "设计问题",
      detailProcessLabel: "过程",
      detailDecisionsLabel: "关键决策",
      detailOutcomeLabel: "成果",
      detailReflLabel: "反思",
      placeholder: "占位图 — 待替换为实际项目图片",
    }
  };

  /* ── DOM refs ── */
  var workGrid     = document.getElementById("work-grid");
  var overlay      = document.getElementById("detail-overlay");
  var detailContent= document.getElementById("detail-content");
  var closeBtn     = document.getElementById("detail-close");
  var langBtn      = document.getElementById("lang-toggle");
  var lastFocused  = null;

  var HOMEPAGE_IDS = [
    "extra-vertebra",
    "echoes-of-the-heart-sea",
    "mossmate",
    "touring-rebuild",
    "visual-graphic-selected",
  ];

  /* ── helpers ── */
  function t(key) { return T[lang][key] || T.en[key] || key; }

  function pick(enVal, zhVal) {
    return lang === "zh" && zhVal ? zhVal : enVal;
  }

  function renderConfirm(val) {
    if (typeof val === "string" && val.indexOf("[TO CONFIRM") === 0) {
      return '<span class="confirm">TO CONFIRM</span>';
    }
    return val || "";
  }

  /* ── static text update ── */
  function updateStatic() {
    document.querySelectorAll("[data-t]").forEach(function(el) {
      var key = el.getAttribute("data-t");
      el.innerHTML = t(key);
    });
    closeBtn.textContent = t("detailCloseLabel") + " ✕";
    langBtn.textContent  = lang === "en" ? "中文" : "English";
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }

  /* ── work card ── */
  function workCard(project) {
    var card = document.createElement("button");
    card.className = "work-card";
    card.type = "button";
    card.setAttribute("data-id", project.id);
    card.setAttribute("aria-haspopup", "dialog");

    var thumb = document.createElement("div");
    thumb.className = "work-thumb " + project.placeholderTone;
    thumb.setAttribute("role", "img");
    thumb.setAttribute("aria-label", pick(project.title, project.titleZh) + " — cover image placeholder");
    var pLabel = document.createElement("span");
    pLabel.className = "placeholder-label";
    pLabel.textContent = t("placeholder");
    thumb.appendChild(pLabel);

    var metaRow = document.createElement("div");
    metaRow.className = "work-meta-row";
    var catSpan = document.createElement("span");
    catSpan.textContent = pick(project.category, project.categoryZh);
    var yearSpan = document.createElement("span");
    yearSpan.innerHTML = renderConfirm(project.year);
    metaRow.appendChild(catSpan);
    metaRow.appendChild(yearSpan);

    var titleEl = document.createElement("div");
    titleEl.className = "work-title";
    titleEl.textContent = pick(project.title, project.titleZh);

    var oneliner = document.createElement("div");
    oneliner.className = "work-oneliner";
    oneliner.textContent = pick(project.oneLiner, project.oneLinerZh);

    card.appendChild(thumb);
    card.appendChild(metaRow);
    card.appendChild(titleEl);
    card.appendChild(oneliner);

    card.addEventListener("click", function () { openDetail(project.id); });
    return card;
  }

  /* ── render grid ── */
  function renderGrid() {
    workGrid.innerHTML = "";
    workGrid.className = "work-grid";
    HOMEPAGE_IDS.forEach(function (id) {
      var p = PROJECTS.find(function (x) { return x.id === id; });
      if (p) workGrid.appendChild(workCard(p));
    });
  }

  /* ── detail row ── */
  function detailRow(label, value) {
    if (!value) return "";
    return '<dl class="detail-grid"><dt>' + label + '</dt><dd><p>' + value + '</p></dd></dl>';
  }

  /* ── open detail ── */
  function openDetail(id) {
    var p = PROJECTS.find(function(x) { return x.id === id; });
    if (!p) return;
    lastFocused = document.activeElement;

    var titleText = lang === "zh" && p.titleZh ? p.titleZh : p.title;
    var subTitle  = lang === "zh" && p.titleZh && p.title !== p.titleZh
      ? '<span class="zh">' + p.title + '</span>'
      : (p.titleZh && p.title !== p.titleZh ? '<span class="zh">' + p.titleZh + '</span>' : "");

    var html = "";
    html += '<div class="detail-hero-thumb ' + p.placeholderTone + '" role="img" aria-label="' + titleText + '"></div>';
    html += '<div class="detail-eyebrow"><span>' + pick(p.category, p.categoryZh) + '</span>'
      + '<span>' + renderConfirm(p.year) + '</span>'
      + '<span>' + renderConfirm(pick(p.teamType, p.teamTypeZh)) + '</span></div>';
    html += '<h1 class="detail-title" id="detail-title">' + titleText + subTitle + '</h1>';
    html += '<p class="detail-oneliner">' + pick(p.oneLiner, p.oneLinerZh) + '</p>';

    html += detailRow(t("detailRoleLabel"),      renderConfirm(pick(p.role, p.roleZh)));
    html += detailRow(t("detailContextLabel"),   pick(p.context,      p.contextZh));
    html += detailRow(t("detailQLabel"),         pick(p.designQuestion, p.designQuestionZh));
    html += detailRow(t("detailProcessLabel"),   pick(p.process,      p.processZh));
    html += detailRow(t("detailDecisionsLabel"), pick(p.keyDecisions, p.keyDecisionsZh));
    html += detailRow(t("detailOutcomeLabel"),   pick(p.outcome,      p.outcomeZh));
    html += detailRow(t("detailReflLabel"),      pick(p.reflection,   p.reflectionZh));

    if (p.tools && p.tools.length) {
      html += '<div class="detail-tools">' +
        p.tools.map(function(t) { return "<span>" + t + "</span>"; }).join("") +
        "</div>";
    }

    detailContent.innerHTML = html;
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

  /* ── full page refresh ── */
  function applyLang() {
    updateStatic();
    renderGrid();
    if (overlay.classList.contains("is-open")) {
      var id = detailContent.querySelector("[id='detail-title']");
      if (id) {
        var card = document.querySelector('[data-id]');
        if (card) openDetail(card.getAttribute("data-id"));
      }
    }
  }

  /* ── lang toggle ── */
  langBtn.addEventListener("click", function() {
    lang = lang === "en" ? "zh" : "en";
    localStorage.setItem("sz-lang", lang);
    applyLang();
  });

  /* ── close handlers ── */
  closeBtn.addEventListener("click", closeDetail);
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeDetail();
  });

  /* ── init ── */
  applyLang();

})();
