(function () {
    var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
    var cardsRoot = document.getElementById("project-cards");
    var filtersRoot = document.getElementById("filters");
    var totalStat = document.getElementById("stat-total");
    var domainStat = document.getElementById("stat-domains");

    if (!cardsRoot || !filtersRoot || !totalStat || !domainStat) {
        return;
    }

    totalStat.textContent = String(projects.length);

    var domains = [];
    projects.forEach(function (item) {
        if (domains.indexOf(item.domain) === -1) {
            domains.push(item.domain);
        }
    });
    domainStat.textContent = String(domains.length);

    var activeDomain = "All";
    renderFilters(["All"].concat(domains));
    renderCards(projects);

    function renderFilters(items) {
        filtersRoot.innerHTML = "";

        items.forEach(function (name) {
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "filter" + (name === activeDomain ? " active" : "");
            btn.textContent = name;
            btn.addEventListener("click", function () {
                activeDomain = name;
                renderFilters(items);
                var filtered = name === "All"
                    ? projects
                    : projects.filter(function (p) { return p.domain === name; });
                renderCards(filtered);
            });
            filtersRoot.appendChild(btn);
        });
    }

    function renderCards(items) {
        cardsRoot.innerHTML = "";

        if (!items.length) {
            var empty = document.createElement("p");
            empty.textContent = "No projects found for this category.";
            cardsRoot.appendChild(empty);
            return;
        }

        items.forEach(function (project) {
            var card = document.createElement("article");
            card.className = "card";

            var badge = document.createElement("span");
            badge.className = "badge " + normalizeColor(project.color);
            badge.textContent = project.domain;
            badge.style.backgroundColor = colorValue(project.color);

            var title = document.createElement("h3");
            title.textContent = project.title;

            var summary = document.createElement("p");
            summary.textContent = project.summary;

            var meta = document.createElement("div");
            meta.className = "meta";
            [].concat(project.stack || [], project.modules || []).forEach(function (item) {
                var tag = document.createElement("span");
                tag.textContent = item;
                meta.appendChild(tag);
            });

            var actions = document.createElement("div");
            actions.className = "actions";

            if (project.liveUrl) {
                actions.appendChild(link("Live", project.liveUrl));
            }
            if (project.codeUrl) {
                actions.appendChild(link("Code", project.codeUrl));
            }

            card.appendChild(badge);
            card.appendChild(title);
            card.appendChild(summary);
            card.appendChild(meta);
            card.appendChild(actions);
            cardsRoot.appendChild(card);
        });
    }

    function link(label, href) {
        var anchor = document.createElement("a");
        anchor.textContent = label;
        anchor.href = href;
        if (/^https?:\/\//i.test(href)) {
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
        }
        return anchor;
    }

    function normalizeColor(name) {
        if (name === "clinic" || name === "restaurant" || name === "retail" || name === "platform") {
            return name;
        }
        return "platform";
    }

    function colorValue(name) {
        var map = {
            clinic: "#0f766e",
            restaurant: "#b45309",
            retail: "#be123c",
            platform: "#1d4ed8"
        };
        return map[name] || map.platform;
    }
})();
