(function () {
  "use strict";

  const research = window.NICKEL_RESEARCH;
  const spatial = window.NICKEL_SPATIAL;
  const sna = window.NICKEL_SNA;
  const international = window.NICKEL_INTERNATIONAL_SHARES;
  const flags = window.NICKEL_FLAGS;

  const state = {
    mapSiteId: "imip",
    networkLayer: "all",
    networkNodeId: "EXEC",
    mapLayers: {
      mining: true,
      industry: true,
      capital: true,
      environment: true
    }
  };

  const elements = {
    internationalGraph: document.getElementById("internationalGraph"),
    exposureAnalysis: document.getElementById("exposureAnalysis"),
    mapLayerControls: document.getElementById("mapLayerControls"),
    mapStats: document.getElementById("mapStats"),
    indonesiaMap: document.getElementById("indonesiaMap"),
    chartSummary: document.getElementById("chartSummary"),
    policyChart: document.getElementById("policyChart"),
    forecastStrip: document.getElementById("forecastStrip"),
    eventExplainer: document.getElementById("eventExplainer"),
    networkLayerTabs: document.getElementById("networkLayerTabs"),
    relationshipNetwork: document.getElementById("relationshipNetwork"),
    networkSidePanel: document.getElementById("networkSidePanel")
  };

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function average(values) {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function linePath(points) {
    return points
      .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
      .join(" ");
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
    }
  }

  function renderInternationalGraph() {
    const width = 1120;
    const height = 650;
    const suppliers = international.suppliers;
    const consumers = international.consumers;
    const supplyX = 235;
    const demandX = 885;
    const supplierTop = 92;
    const consumerTop = 105;
    const supplierGap = 59;
    const consumerGap = 76;
    const radius = (share) => 15 + Math.sqrt(share) * 3.05;
    const supplierNodes = suppliers.map((item, index) => ({
      ...item,
      x: supplyX,
      y: supplierTop + index * supplierGap,
      r: radius(item.share)
    }));
    const consumerNodes = consumers.map((item, index) => ({
      ...item,
      x: demandX,
      y: consumerTop + index * consumerGap,
      r: radius(item.share)
    }));

    const pairings = [];
    supplierNodes.forEach((supplier) => {
      consumerNodes.forEach((consumer) => {
        if (supplier.id === consumer.id) return;
        pairings.push({
          supplier,
          consumer,
          strength: (supplier.share * consumer.share) / 100
        });
      });
    });
    const strongest = pairings
      .sort((left, right) => right.strength - left.strength)
      .slice(0, 20);
    const maxStrength = strongest[0]?.strength || 1;

    const edgeSvg = strongest
      .map(({ supplier, consumer, strength }) => {
        const startX = supplier.x + supplier.r;
        const endX = consumer.x - consumer.r;
        const bend = 52 + Math.abs(supplier.y - consumer.y) * 0.12;
        return `
          <path
            class="trade-edge"
            d="M${startX},${supplier.y} C${startX + bend},${supplier.y} ${
              endX - bend
            },${consumer.y} ${endX},${consumer.y}"
            stroke-width="${0.55 + Math.sqrt(strength / maxStrength) * 5.4}"
            opacity="${0.16 + Math.sqrt(strength / maxStrength) * 0.45}"
          >
            <title>${escapeHTML(supplier.name)} → ${escapeHTML(
              consumer.name
            )}：份额乘积 ${strength.toFixed(2)}（结构性关联，不是实际双边贸易额）</title>
          </path>
        `;
      })
      .join("");

    const supplierSvg = supplierNodes
      .map(
        (node) => `
          <g class="trade-node supply">
            <circle class="trade-node-outline" cx="${node.x}" cy="${
              node.y
            }" r="${node.r}"></circle>
            <image
              href="${flags[node.flag]}"
              x="${node.x - node.r}"
              y="${node.y - node.r}"
              width="${node.r * 2}"
              height="${node.r * 2}"
              preserveAspectRatio="xMidYMid slice"
              clip-path="url(#flag-supply-${node.id})"
            ></image>
            <text class="trade-node-name" x="${node.x - node.r - 12}" y="${
              node.y - 2
            }" text-anchor="end">${escapeHTML(node.name)}</text>
            <text class="trade-node-share" x="${node.x - node.r - 12}" y="${
              node.y + 13
            }" text-anchor="end">${node.share.toFixed(1)}%</text>
          </g>
        `
      )
      .join("");
    const consumerSvg = consumerNodes
      .map(
        (node) => `
          <g class="trade-node demand">
            <circle class="trade-node-outline" cx="${node.x}" cy="${
              node.y
            }" r="${node.r}"></circle>
            <image
              href="${flags[node.flag]}"
              x="${node.x - node.r}"
              y="${node.y - node.r}"
              width="${node.r * 2}"
              height="${node.r * 2}"
              preserveAspectRatio="xMidYMid slice"
              clip-path="url(#flag-demand-${node.id})"
            ></image>
            <text class="trade-node-name" x="${node.x + node.r + 12}" y="${
              node.y - 2
            }" text-anchor="start">${escapeHTML(node.name)}</text>
            <text class="trade-node-share" x="${node.x + node.r + 12}" y="${
              node.y + 13
            }" text-anchor="start">${node.share.toFixed(1)}%</text>
          </g>
        `
      )
      .join("");

    elements.internationalGraph.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="全球镍生产国与消费国供需关系图谱">
        <defs>
          ${supplierNodes
            .map(
              (node) => `
                <clipPath id="flag-supply-${node.id}">
                  <circle cx="${node.x}" cy="${node.y}" r="${node.r}"></circle>
                </clipPath>
              `
            )
            .join("")}
          ${consumerNodes
            .map(
              (node) => `
                <clipPath id="flag-demand-${node.id}">
                  <circle cx="${node.x}" cy="${node.y}" r="${node.r}"></circle>
                </clipPath>
              `
            )
            .join("")}
        </defs>
        <line class="trade-divider" x1="${(supplyX + demandX) / 2}" y1="46" x2="${
          (supplyX + demandX) / 2
        }" y2="${height - 38}"></line>
        <text class="trade-column-title supply" x="${supplyX}" y="42" text-anchor="middle">供给方 · 全球产量份额</text>
        <text class="trade-column-title demand" x="${demandX}" y="42" text-anchor="middle">需求方 · 全球消费份额</text>
        ${edgeSvg}
        ${supplierSvg}
        ${consumerSvg}
        <text class="trade-center-label" x="560" y="${height - 18}" text-anchor="middle">
          线宽 = 生产份额 × 消费份额 · 非实际双边贸易额
        </text>
      </svg>
    `;
    renderExposureAnalysis();
  }

  function renderExposureAnalysis() {
    const supplierById = new Map(
      international.suppliers.map((item) => [item.id, item])
    );
    const consumerById = new Map(
      international.consumers.map((item) => [item.id, item])
    );
    const ids = [
      ...new Set([
        ...international.suppliers.map((item) => item.id),
        ...international.consumers.map((item) => item.id)
      ])
    ];
    const rows = ids
      .map((id) => {
        const supplier = supplierById.get(id);
        const consumer = consumerById.get(id);
        const production = supplier?.share || 0;
        const consumption = consumer?.share || 0;
        return {
          id,
          name: supplier?.name || consumer?.name,
          flag: supplier?.flag || consumer?.flag,
          production,
          consumption,
          net: production - consumption
        };
      })
      .sort((left, right) => right.net - left.net);
    const winners = rows.filter((row) => row.net > 0);
    const losers = rows.filter((row) => row.net < 0);

    elements.exposureAnalysis.innerHTML = `
      <div class="exposure-summary">
        <div class="benefit">
          <span class="micro-label">RELATIVE BENEFICIARIES</span>
          <h4>供给收紧下的相对受益方</h4>
          <p>净供给份额为正，若政策收紧推动价格上升，资源出口国通常获得更多租金；但实际利润仍取决于成本、税费和项目股权。</p>
          <div class="exposure-tags">
            ${winners
              .map(
                (row) => `
                  <span>
                    <img src="${flags[row.flag]}" alt="" />
                    ${escapeHTML(row.name)}
                    <b>+${row.net.toFixed(1)} pp</b>
                  </span>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="loss">
          <span class="micro-label">RELATIVE LOSERS</span>
          <h4>价格上涨下的相对受损方</h4>
          <p>净需求份额为负，进口成本更高；如果企业拥有海外矿山或长期承购，实际损失会被部分抵消。</p>
          <div class="exposure-tags">
            ${losers
              .map(
                (row) => `
                  <span>
                    <img src="${flags[row.flag]}" alt="" />
                    ${escapeHTML(row.name)}
                    <b>${row.net.toFixed(1)} pp</b>
                  </span>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
      <div class="exposure-table-wrap">
        <table class="exposure-table">
          <thead>
            <tr><th>国家/地区</th><th>生产份额</th><th>消费份额</th><th>净头寸</th><th>价格上行时的相对影响</th></tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr class="${row.net >= 0 ? "benefit-row" : "loss-row"}">
                    <td><span class="country-cell"><img src="${
                      flags[row.flag]
                    }" alt="" />${escapeHTML(row.name)}</span></td>
                    <td>${row.production.toFixed(1)}%</td>
                    <td>${row.consumption.toFixed(1)}%</td>
                    <td><b>${row.net >= 0 ? "+" : ""}${row.net.toFixed(
                      1
                    )} pp</b></td>
                    <td>${
                      row.net > 0
                        ? "相对受益，但受成本与股权结构约束"
                        : row.net < 0
                          ? "相对受损，进口成本上升"
                          : "大致中性"
                    }</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <p class="exposure-note">
        净头寸 = 生产份额 − 消费份额，单位百分点。该指标只描述价格上行时的结构性暴露，不代表企业利润或国家总福利。印尼虽然净供给为正，但本国冶炼厂仍会因矿石配额和 HPM 成本上升而承压。
      </p>
    `;
  }

  function mapGeometryPath(geometry, projectX, projectY) {
    const polygons =
      geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    return polygons
      .map((polygon) =>
        polygon
          .map((ring) =>
            ring
              .map(
                ([longitude, latitude], index) =>
                  `${index === 0 ? "M" : "L"}${projectX(
                    longitude
                  )},${projectY(latitude)}`
              )
              .join(" ")
          )
          .join(" ")
      )
      .join(" ");
  }

  function renderMapControls() {
    elements.mapLayerControls.innerHTML = spatial.layers
      .map(
        (layer) => `
          <button
            class="layer-button ${state.mapLayers[layer.id] ? "is-active" : ""}"
            type="button"
            data-map-layer="${escapeHTML(layer.id)}"
            aria-pressed="${state.mapLayers[layer.id]}"
            title="${escapeHTML(layer.description)}"
          >
            ${escapeHTML(layer.label)}
          </button>
        `
      )
      .join("");
    elements.mapLayerControls.querySelectorAll("[data-map-layer]").forEach((button) => {
      button.addEventListener("click", () => {
        state.mapLayers[button.dataset.mapLayer] =
          !state.mapLayers[button.dataset.mapLayer];
        renderMap();
      });
    });
  }

  function renderMap() {
    const width = 840;
    const height = 470;
    const bounds = { minLon: 94, maxLon: 142, minLat: -11.5, maxLat: 6.5 };
    const frame = { left: 42, top: 96, width: 650, height: 270 };
    const x = (longitude) =>
      frame.left +
      ((longitude - bounds.minLon) / (bounds.maxLon - bounds.minLon)) *
        frame.width;
    const y = (latitude) =>
      frame.top +
      ((bounds.maxLat - latitude) / (bounds.maxLat - bounds.minLat)) *
        frame.height;
    const siteById = new Map(spatial.sites.map((site) => [site.id, site]));
    const boundary = spatial.boundary.features
      .map((feature) => mapGeometryPath(feature.geometry, x, y))
      .join(" ");
    const labels = [
      ["苏门答腊", 102.2, -1.1],
      ["加里曼丹", 113.4, 0.1],
      ["爪哇", 110.2, -7.4],
      ["苏拉威西", 121.2, -1.7],
      ["马鲁古", 128.2, -3.2],
      ["巴布亚", 137.6, -4.5]
    ]
      .map(
        ([label, longitude, latitude]) =>
          `<text class="map-region-label" x="${x(
            longitude
          )}" y="${y(latitude)}" text-anchor="middle">${label}</text>`
      )
      .join("");

    const environment = state.mapLayers.environment
      ? spatial.sites
          .map(
            (site) => `
              <circle class="environment-zone" cx="${x(site.lon)}" cy="${y(
                site.lat
              )}" r="${18 + site.intensity * 9}">
                <title>${escapeHTML(site.name)}：环境压力示意</title>
              </circle>
            `
          )
          .join("")
      : "";
    const heat = state.mapLayers.mining
      ? spatial.sites
          .map(
            (site) => `
              <circle class="mine-heat" cx="${x(site.lon)}" cy="${y(
                site.lat
              )}" r="${10 + site.intensity * 8}" opacity="${
                0.34 + site.intensity * 0.08
              }"></circle>
            `
          )
          .join("")
      : "";
    const capital = state.mapLayers.capital
      ? `
        <g class="map-external">
          <rect x="38" y="24" width="154" height="40" rx="6"></rect>
          <text x="115" y="41" text-anchor="middle">中国资本与技术</text>
          <text class="map-external-subtitle" x="115" y="55" text-anchor="middle">来源位置为示意外插</text>
        </g>
        ${["imip", "iwip"]
          .map((id) => {
            const site = siteById.get(id);
            return `<path
              class="capital-flow"
              d="M122,66 Q${(122 + x(site.lon)) / 2},${y(site.lat) - 34} ${x(
                site.lon
              )},${y(site.lat)}"
              marker-end="url(#capitalArrow)"
            ></path>`;
          })
          .join("")}
        <g class="map-external">
          <rect x="674" y="384" width="130" height="46" rx="6"></rect>
          <text x="739" y="402" text-anchor="middle">非洲替代方向</text>
          <text class="map-external-subtitle" x="739" y="417" text-anchor="middle">战略示意，未核实项目边</text>
        </g>
        <path
          class="diversification-flow"
          d="M${x(siteById.get("iwip").lon)},${y(
            siteById.get("iwip").lat
          )} Q800,268 739,380"
          marker-end="url(#diversificationArrow)"
        ></path>
      `
      : "";
    const visibleSites = spatial.sites.filter(
      (site) =>
        (site.type === "工业园" && state.mapLayers.industry) ||
        (site.type !== "工业园" && state.mapLayers.mining)
    );
    const sites = visibleSites
      .map((site) => {
        const industrial = site.type === "工业园";
        const labelX = x(site.lon) + site.labelDx;
        const labelY = y(site.lat) + site.labelDy;
        return `
          <g
            class="map-site ${industrial ? "industrial" : "mining"} ${
              state.mapSiteId === site.id ? "is-selected" : ""
            }"
            data-map-site="${escapeHTML(site.id)}"
            tabindex="0"
            role="button"
            aria-label="${escapeHTML(site.name)}"
          >
            <title>${escapeHTML(site.name)}：${escapeHTML(
              site.control
            )}；环境压力为示意</title>
            ${
              industrial
                ? `<rect x="${x(site.lon) - 5}" y="${
                    y(site.lat) - 5
                  }" width="10" height="10" rx="1"></rect>`
                : `<circle cx="${x(site.lon)}" cy="${y(site.lat)}" r="${
                    4 + site.intensity
                  }"></circle>`
            }
            <circle class="map-site-ring" cx="${x(site.lon)}" cy="${y(
              site.lat
            )}" r="13"></circle>
            <text class="map-site-label" x="${labelX}" y="${labelY}" text-anchor="${
              site.labelDx < 0 ? "end" : "start"
            }">${escapeHTML(site.shortName)}</text>
            ${
              industrial
                ? `<text class="map-control-label" x="${labelX}" y="${
                    labelY + 12
                  }" text-anchor="${site.labelDx < 0 ? "end" : "start"}">${
                    site.id === "imip" ? "青山系项目链" : "Weda Bay 项目群"
                  }</text>`
                : ""
            }
          </g>
        `;
      })
      .join("");

    elements.indonesiaMap.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="印尼镍矿区、工业园和资本方向地图">
        <defs>
          <radialGradient id="mineHeat">
            <stop offset="0%" stop-color="#b75a33" stop-opacity="0.72"></stop>
            <stop offset="55%" stop-color="#d19a71" stop-opacity="0.28"></stop>
            <stop offset="100%" stop-color="#d19a71" stop-opacity="0"></stop>
          </radialGradient>
          <pattern id="environmentHatch" width="7" height="7" patternUnits="userSpaceOnUse">
            <path d="M0,7 L7,0" stroke="#9b3c32" stroke-width="1" opacity="0.35"></path>
          </pattern>
          <marker id="capitalArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#176b5a"></path>
          </marker>
          <marker id="diversificationArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#9b3c32"></path>
          </marker>
        </defs>
        <rect class="map-ocean" width="${width}" height="${height}"></rect>
        <line class="map-equator" x1="${frame.left}" y1="${y(
          0
        )}" x2="${frame.left + frame.width}" y2="${y(0)}"></line>
        <text class="map-equator-label" x="${frame.left + 4}" y="${
          y(0) - 5
        }">赤道</text>
        <path class="map-country" d="${boundary}" fill-rule="evenodd"></path>
        ${labels}
        ${environment}
        ${heat}
        ${capital}
        ${sites}
        <g class="map-scale">
          <line x1="44" y1="446" x2="134" y2="446"></line>
          <text x="44" y="438">约 1,000 km（示意）</text>
        </g>
        <text class="map-boundary-credit" x="828" y="454" text-anchor="end">底图：country boundary GeoJSON · 仅作可视化</text>
      </svg>
    `;
    elements.mapStats.textContent = `${visibleSites.length} 个可见节点 · 2 个工业园`;
    renderMapControls();

    elements.indonesiaMap.querySelectorAll("[data-map-site]").forEach((node) => {
      const select = () => {
        state.mapSiteId = node.dataset.mapSite;
        renderMap();
      };
      node.addEventListener("click", select);
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          select();
        }
      });
    });
  }

  function monthNumber(month) {
    const [year, value] = month.split("-").map(Number);
    return year * 12 + value - 1;
  }

  function numberToMonth(value) {
    return `${Math.floor(value / 12)}-${String((value % 12) + 1).padStart(
      2,
      "0"
    )}`;
  }

  function addMonths(month, count) {
    return numberToMonth(monthNumber(month) + count);
  }

  function median(values) {
    return quantile(values, 0.5);
  }

  function quantile(values, probability) {
    const ordered = [...values].sort((left, right) => left - right);
    const position = (ordered.length - 1) * probability;
    const low = Math.floor(position);
    const high = Math.ceil(position);
    if (low === high) return ordered[low];
    return (
      ordered[low] * (high - position) + ordered[high] * (position - low)
    );
  }

  function solveLinearSystem(matrix, vector) {
    const size = vector.length;
    const coefficients = matrix.map((row) => [...row]);
    const result = [...vector];
    for (let column = 0; column < size; column += 1) {
      let pivot = column;
      for (let row = column + 1; row < size; row += 1) {
        if (
          Math.abs(coefficients[row][column]) >
          Math.abs(coefficients[pivot][column])
        ) {
          pivot = row;
        }
      }
      if (Math.abs(coefficients[pivot][column]) < 1e-12) return null;
      [coefficients[column], coefficients[pivot]] = [
        coefficients[pivot],
        coefficients[column]
      ];
      [result[column], result[pivot]] = [result[pivot], result[column]];
      const divisor = coefficients[column][column];
      for (let index = column; index < size; index += 1) {
        coefficients[column][index] /= divisor;
      }
      result[column] /= divisor;
      for (let row = 0; row < size; row += 1) {
        if (row === column) continue;
        const factor = coefficients[row][column];
        for (let index = column; index < size; index += 1) {
          coefficients[row][index] -= factor * coefficients[column][index];
        }
        result[row] -= factor * result[column];
      }
    }
    return result;
  }

  function ridgeFit(design, target, weights, alpha) {
    const width = design[0].length;
    const matrix = Array.from({ length: width }, () => Array(width).fill(0));
    const vector = Array(width).fill(0);
    design.forEach((row, rowIndex) => {
      const weight = weights[rowIndex];
      for (let left = 0; left < width; left += 1) {
        vector[left] += weight * row[left] * target[rowIndex];
        for (let right = 0; right < width; right += 1) {
          matrix[left][right] += weight * row[left] * row[right];
        }
      }
    });
    for (let index = 1; index < width; index += 1) {
      matrix[index][index] += alpha;
    }
    return solveLinearSystem(matrix, vector);
  }

  function fitHuberRidge(records, horizon, alpha = 5) {
    const featureCount = records[0].features.length;
    const means = Array(featureCount).fill(0);
    const scales = Array(featureCount).fill(0);
    records.forEach((record) =>
      record.features.forEach((value, index) => {
        means[index] += value;
      })
    );
    means.forEach((_, index) => {
      means[index] /= records.length;
    });
    records.forEach((record) =>
      record.features.forEach((value, index) => {
        scales[index] += (value - means[index]) ** 2;
      })
    );
    scales.forEach((_, index) => {
      scales[index] = Math.sqrt(scales[index] / records.length) || 1;
    });
    const design = records.map((record) => [
      1,
      ...record.features.map(
        (value, index) => (value - means[index]) / scales[index]
      )
    ]);
    const target = records.map((record) => record.targets[horizon]);
    let weights = Array(records.length).fill(1);
    let coefficients = ridgeFit(design, target, weights, alpha);
    for (let iteration = 0; iteration < 18; iteration += 1) {
      const residuals = target.map(
        (value, rowIndex) =>
          value -
          design[rowIndex].reduce(
            (sum, feature, index) => sum + feature * coefficients[index],
            0
          )
      );
      const center = median(residuals);
      const scale =
        1.4826 *
        median(residuals.map((value) => Math.abs(value - center)));
      const threshold = 1.345 * Math.max(scale, 1e-6);
      weights = residuals.map((value) =>
        Math.abs(value) <= threshold ? 1 : threshold / Math.abs(value)
      );
      const next = ridgeFit(design, target, weights, alpha);
      const change = coefficients.reduce(
        (sum, value, index) => sum + Math.abs(value - next[index]),
        0
      );
      coefficients = next;
      if (change < 1e-7) break;
    }
    return (features) =>
      [1, ...features.map((value, index) => (value - means[index]) / scales[index])]
        .reduce(
          (sum, value, index) => sum + value * coefficients[index],
          0
        );
  }

  function buildForecastRecords() {
    const priceByMonth = new Map(
      research.priceSeries.map((point) => [point.month, point])
    );
    const riskByMonth = new Map(
      research.riskSeries.map((point) => [point.month, point])
    );
    const eventByMonth = new Map();
    research.events
      .filter((event) => event.role === "main")
      .forEach((event) => {
        const month = event.date.slice(0, 7);
        const counts = eventByMonth.get(month) || { tighten: 0, ease: 0 };
        if (event.direction === "收紧") counts.tighten += 1;
        if (event.direction === "放松") counts.ease += 1;
        eventByMonth.set(month, counts);
      });
    const records = [];
    let previousRisk = null;
    research.priceSeries.forEach((point, index) => {
      const risk = riskByMonth.get(point.month);
      if (!risk) return;
      if (index >= 12) {
        const events = eventByMonth.get(point.month) || {
          tighten: 0,
          ease: 0
        };
        records.push({
          month: point.month,
          index,
          price: point.lmePriceUsdT,
          features: [
            Math.log(point.lmePriceUsdT / research.priceSeries[index - 1].lmePriceUsdT),
            Math.log(point.lmePriceUsdT / research.priceSeries[index - 2].lmePriceUsdT),
            Math.log(point.lmePriceUsdT / research.priceSeries[index - 3].lmePriceUsdT),
            Math.log(point.lmePriceUsdT / research.priceSeries[index - 12].lmePriceUsdT),
            risk.index / 100,
            previousRisk ? (risk.index - previousRisk.index) / 100 : 0,
            Math.min(1, events.tighten),
            Math.min(1, events.ease)
          ],
          targets: {}
        });
      }
      previousRisk = risk;
    });
    records.forEach((record) => {
      [1, 2, 3].forEach((horizon) => {
        const future = priceByMonth.get(addMonths(record.month, horizon));
        if (future) {
          record.targets[horizon] = Math.log(future.lmePriceUsdT / record.price);
        }
      });
    });
    return records;
  }

  function evaluateForecast(records, horizon) {
    const results = [];
    records
      .filter(
        (record) =>
          record.month >= "2024-01" &&
          record.targets[horizon] !== undefined
      )
      .forEach((origin) => {
        const training = records.filter(
          (record) =>
            record.targets[horizon] !== undefined &&
            record.index + horizon <= origin.index
        );
        if (training.length < 24) return;
        const model = fitHuberRidge(training, horizon);
        const predictedReturn = model(origin.features);
        results.push({
          actual: origin.price * Math.exp(origin.targets[horizon]),
          predicted: origin.price * Math.exp(predictedReturn),
          baseline: origin.price,
          residual: origin.targets[horizon] - predictedReturn
        });
      });
    const absErrors = results.map((row) => Math.abs(row.actual - row.predicted));
    const baselineErrors = results.map((row) => Math.abs(row.actual - row.baseline));
    const correctDirection = results.filter(
      (row) =>
        Math.sign(row.actual - row.baseline) ===
        Math.sign(row.predicted - row.baseline)
    ).length;
    return {
      horizon,
      mae: average(absErrors),
      baselineMae: average(baselineErrors),
      direction: correctDirection / Math.max(1, results.length),
      residuals: results.map((row) => row.residual),
      samples: results.length
    };
  }

  function getForecastBundle() {
    const records = buildForecastRecords();
    const latest = records[records.length - 1];
    const diagnostics = {
      1: evaluateForecast(records, 1),
      2: evaluateForecast(records, 2),
      3: evaluateForecast(records, 3)
    };
    const points = [1, 2, 3].map((horizon) => {
      const training = records.filter(
        (record) =>
          record.targets[horizon] !== undefined &&
          record.index + horizon <= latest.index
      );
      const model = fitHuberRidge(training, horizon);
      const predictedReturn = model(latest.features);
      const lowResidual = quantile(diagnostics[horizon].residuals, 0.025);
      const highResidual = quantile(diagnostics[horizon].residuals, 0.975);
      return {
        month: addMonths(latest.month, horizon),
        central: latest.price * Math.exp(predictedReturn),
        lower: latest.price * Math.exp(predictedReturn + lowResidual),
        upper: latest.price * Math.exp(predictedReturn + highResidual)
      };
    });
    return { records, latest, diagnostics, points };
  }

  function buildProfitPressureSeries() {
    const priceByMonth = new Map(
      research.priceSeries.map((point) => [point.month, point])
    );
    return research.riskSeries
      .map((risk) => {
        const pricePoint = priceByMonth.get(risk.month);
        if (!pricePoint) return null;
        const index = research.priceSeries.findIndex(
          (point) => point.month === risk.month
        );
        const rollingMean = average(
          research.priceSeries
            .slice(Math.max(0, index - 11), index + 1)
            .map((point) => point.lmePriceUsdT)
        );
        const inputCost =
          0.5 * risk.quotaComponent + 0.5 * risk.hpmComponent;
        const priceWeakness =
          clamp(
            (rollingMean - pricePoint.lmePriceUsdT) /
              Math.max(1, rollingMean * 0.25),
            0,
            1
          ) * 100;
        return {
          month: risk.month,
          pressure: risk.index,
          price: pricePoint.lmePriceUsdT,
          profitPressure: 0.65 * inputCost + 0.35 * priceWeakness
        };
      })
      .filter(Boolean);
  }

  function renderPolicyChart() {
    const width = 940;
    const height = 450;
    const margin = { top: 56, right: 62, bottom: 38, left: 52 };
    const pressureBottom = 266;
    const profitTop = 306;
    const profitHeight = 80;
    const plotWidth = width - margin.left - margin.right;
    const pressureHeight = pressureBottom - margin.top;
    const prices = research.priceSeries;
    const profitSeries = buildProfitPressureSeries();
    const months = prices.map((point) => point.month);
    const forecast = getForecastBundle();
    const chartMonths = months.concat(
      forecast.points.map((point) => point.month)
    );
    const riskByMonth = new Map(
      research.riskSeries.map((point) => [point.month, point])
    );
    const priceValues = prices.map((point) => point.lmePriceUsdT);
    const forecastValues = forecast.points.flatMap((point) => [
      point.lower,
      point.upper
    ]);
    const minPrice = Math.min(...priceValues, ...forecastValues) * 0.94;
    const maxPrice = Math.max(...priceValues, ...forecastValues) * 1.05;
    const x = (month) =>
      margin.left +
      (chartMonths.indexOf(month) / Math.max(1, chartMonths.length - 1)) *
        plotWidth;
    const yPressure = (value) =>
      margin.top + (1 - clamp(value, 0, 100) / 100) * pressureHeight;
    const yPrice = (value) =>
      margin.top +
      (1 - (value - minPrice) / (maxPrice - minPrice)) * pressureHeight;
    const yProfit = (value) =>
      profitTop + (1 - clamp(value, 0, 100) / 100) * profitHeight;

    const pressureGrid = [0, 25, 50, 75, 100]
      .map(
        (tick) => `
          <line class="chart-grid" x1="${margin.left}" y1="${yPressure(
            tick
          )}" x2="${width - margin.right}" y2="${yPressure(tick)}"></line>
          <text class="axis-label" x="${margin.left - 8}" y="${
            yPressure(tick) + 3
          }" text-anchor="end">${tick}</text>
        `
      )
      .join("");
    const priceTicks = Array.from({ length: 5 }, (_, index) => {
      const value = maxPrice - ((maxPrice - minPrice) / 4) * index;
      return { value, y: yPrice(value) };
    });
    const priceGrid = priceTicks
      .map(
        (tick) => `
          <line class="chart-grid" x1="${margin.left}" y1="${
            tick.y
          }" x2="${width - margin.right}" y2="${tick.y}"></line>
          <text class="axis-label" x="${width - margin.right + 8}" y="${
            tick.y + 3
          }">$${(tick.value / 1000).toFixed(0)}k</text>
        `
      )
      .join("");
    const yearTicks = [];
    let previousYear = "";
    chartMonths.forEach((month) => {
      const year = month.slice(0, 4);
      if (year !== previousYear) {
        yearTicks.push({ year, month });
        previousYear = year;
      }
    });
    const xLabels = yearTicks
      .map(
        (tick) =>
          `<text class="axis-label" x="${x(
            tick.month
          )}" y="${height - 8}" text-anchor="middle">${tick.year}</text>`
      )
      .join("");
    const profitGrid = [0, 50, 100]
      .map(
        (tick) => `
          <line class="chart-grid" x1="${margin.left}" y1="${yProfit(
            tick
          )}" x2="${width - margin.right}" y2="${yProfit(tick)}"></line>
          <text class="axis-label" x="${margin.left - 8}" y="${
            yProfit(tick) + 3
          }" text-anchor="end">${tick}</text>
        `
      )
      .join("");

    const pricePath = linePath(
      prices.map((point) => ({
        x: x(point.month),
        y: yPrice(point.lmePriceUsdT)
      }))
    );
    const pressurePath = linePath(
      research.riskSeries.map((point) => ({
        x: x(point.month),
        y: yPressure(point.index)
      }))
    );
    const profitPoints = profitSeries.map((point) => ({
      x: x(point.month),
      y: yProfit(point.profitPressure)
    }));
    const profitPath = linePath(profitPoints);
    const profitArea = `M${profitPoints[0].x},${yProfit(0)} ${profitPoints
      .map((point) => `L${point.x},${point.y}`)
      .join(" ")} L${profitPoints[profitPoints.length - 1].x},${yProfit(0)} Z`;
    const lastHistory = prices[prices.length - 1];
    const forecastLine = linePath([
      { x: x(lastHistory.month), y: yPrice(lastHistory.lmePriceUsdT) },
      ...forecast.points.map((point) => ({
        x: x(point.month),
        y: yPrice(point.central)
      }))
    ]);
    const forecastBandPoints = [
      { x: x(lastHistory.month), y: yPrice(lastHistory.lmePriceUsdT) },
      ...forecast.points.map((point) => ({
        x: x(point.month),
        y: yPrice(point.upper)
      })),
      ...[...forecast.points].reverse().map((point) => ({
        x: x(point.month),
        y: yPrice(point.lower)
      })),
      { x: x(lastHistory.month), y: yPrice(lastHistory.lmePriceUsdT) }
    ];
    const forecastBand = `${linePath(forecastBandPoints)} Z`;
    const forecastDots = forecast.points
      .map(
        (point) => `
          <circle class="forecast-dot" cx="${x(point.month)}" cy="${yPrice(
            point.central
          )}" r="3">
            <title>${point.month}：中枢 $${point.central.toLocaleString(
              "en-US",
              { maximumFractionDigits: 0 }
            )}/吨；95% 区间 $${point.lower.toLocaleString("en-US", {
              maximumFractionDigits: 0
            })}–$${point.upper.toLocaleString("en-US", {
              maximumFractionDigits: 0
            })}/吨</title>
          </circle>
        `
      )
      .join("");
    const annotations = [
      ["2020-01", "2020 禁矿", "policy"],
      ["2022-03", "2022 价格异动", "market"],
      ["2024-10", "2024 政权更替", "politics"],
      ["2026-03", "2026 配额收紧", "policy"],
      ["2026-07", "2026 商会抗议", "friction"]
    ]
      .map(([month, label, type], index) => {
        const labelWidth = Math.max(78, label.length * 9 + 14);
        const labelX = clamp(
          x(month) - labelWidth / 2,
          margin.left,
          width - margin.right - labelWidth
        );
        const row = index % 2;
        const labelY = 8 + row * 24;
        return `
          <line class="event-line ${type}" x1="${x(month)}" y1="${
            labelY + 18
          }" x2="${x(month)}" y2="${pressureBottom}"></line>
          <g class="event-label ${type}">
            <rect x="${labelX}" y="${labelY}" width="${labelWidth}" height="18" rx="3"></rect>
            <text x="${labelX + labelWidth / 2}" y="${
              labelY + 12
            }" text-anchor="middle">${escapeHTML(label)}</text>
          </g>
        `;
      })
      .join("");

    elements.policyChart.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="政策压力、LME镍价和企业压力代理趋势图">
        ${pressureGrid}
        ${priceGrid}
        <line class="chart-axis-line" x1="${margin.left}" y1="${pressureBottom}" x2="${
          width - margin.right
        }" y2="${pressureBottom}"></line>
        ${annotations}
        <path class="forecast-band" d="${forecastBand}"></path>
        <path class="forecast-line" d="${forecastLine}"></path>
        <path class="price-line" d="${pricePath}"></path>
        <path class="policy-line" d="${pressurePath}"></path>
        ${forecastDots}
        <line class="forecast-start" x1="${x(
          lastHistory.month
        )}" y1="${margin.top}" x2="${x(lastHistory.month)}" y2="${yProfit(
          0
        )}"></line>
        <text class="forecast-label mono" x="${x(
          lastHistory.month
        )}" y="${pressureBottom - 5}" text-anchor="end">预测</text>
        <text class="subplot-label" x="${margin.left}" y="${
          profitTop - 12
        }">企业利润压力代理</text>
        ${profitGrid}
        <path class="profit-area" d="${profitArea}"></path>
        <path class="profit-line" d="${profitPath}"></path>
        ${xLabels}
      </svg>
      <div class="map-key chart-key">
        <span><i class="edge-swatch structural"></i>政策压力指数</span>
        <span><i class="edge-swatch" style="background: var(--copper)"></i>LME 镍价</span>
        <span><i class="edge-swatch negative"></i>企业利润压力代理</span>
        <span><i class="edge-swatch forecast"></i>Huber-Ridge 预测与 95% 情景区间</span>
      </div>
    `;

    const latestProfit = profitSeries[profitSeries.length - 1];
    elements.chartSummary.textContent = `2026-09 · 政策 100/100 · LME $${prices[
      prices.length - 1
    ].lmePriceUsdT.toLocaleString("en-US", {
      maximumFractionDigits: 0
    })}/吨 · 企业压力代理 ${latestProfit.profitPressure.toFixed(0)}/100`;
    elements.forecastStrip.innerHTML = `
      <div class="forecast-title">
        <span class="micro-label">3-MONTH MODEL SCENARIO</span>
        <strong>Huber-Ridge ARX 镍价情景</strong>
      </div>
      ${forecast.points
        .map(
          (point) => `
            <div>
              <span>${escapeHTML(point.month)}</span>
              <b>$${point.central.toLocaleString("en-US", {
                maximumFractionDigits: 0
              })}/吨</b>
              <small>95%：$${point.lower.toLocaleString("en-US", {
                maximumFractionDigits: 0
              })}–$${point.upper.toLocaleString("en-US", {
                maximumFractionDigits: 0
              })}</small>
            </div>
          `
        )
        .join("")}
      <p>
        1 个月样本外 MAE：$${forecast.diagnostics[1].mae.toLocaleString(
          "en-US",
          { maximumFractionDigits: 0 }
        )}；上期值基准：$${forecast.diagnostics[1].baselineMae.toLocaleString(
          "en-US",
          { maximumFractionDigits: 0 }
        )}。预测为模型情景，不是高置信价格保证。
      </p>
    `;
  }

  function renderEventExplainer() {
    const priceByMonth = new Map(
      research.priceSeries.map((point) => [point.month, point.lmePriceUsdT])
    );
    const events = [
      {
        date: "2020-01",
        title: "印尼全面禁止镍矿原矿出口",
        fact:
          "政策从出口矿石转为要求在本土加工，目标是留下冶炼环节、就业和资源租金。",
        from: "2020-01",
        to: "2020-04",
        reason:
          "禁矿没有立即推高全球镍价。随后疫情冲击不锈钢和工业需求，LME 月均价从 13,507 美元跌至 11,804 美元。"
      },
      {
        date: "2022-03",
        title: "镍价出现历史级异常波动",
        fact:
          "俄乌冲突、低库存和 LME 交易机制压力叠加，镍市场出现逼空和交易暂停。",
        from: "2022-02",
        to: "2022-03",
        reason:
          "LME 月均价从 24,016 美元升至 33,924 美元。该上涨主要是国际金融和地缘冲击放大，不能归因于印尼禁矿一项政策。"
      },
      {
        date: "2024-10",
        title: "印尼完成政权更替",
        fact:
          "新政府上台改变联盟关系和政策执行风格，但既有下游化、配额和资源控制方向总体延续。",
        from: "2024-09",
        to: "2024-10",
        reason:
          "价格从 16,168 美元升至 16,766 美元，短期变化有限。市场更关注全球供应过剩和需求预期，而非领导人更替本身。"
      },
      {
        date: "2026-03",
        title: "2026 年矿业配额大幅收紧",
        fact:
          "RKAB 获批进度偏慢，配额目标下降；4 月政策压力指数升至 100/100。",
        from: "2025-12",
        to: "2026-03",
        reason:
          "供应收紧预期推动月均价从 14,879 美元升至 17,076 美元，但 7 月又回落至 16,632 美元，说明政策控制未能持续抬价。"
      },
      {
        date: "2026-07",
        title: "商会公开抗议与投资摩擦上升",
        fact:
          "这不是正式政策事件，不进入压力指数；它反映企业对配额、成本和政策可信度的担忧。",
        from: "2026-06",
        to: "2026-07",
        reason:
          "月均价从 17,588 美元降至 16,632 美元。价格回落仍由全球供需和弱需求主导，抗议信主要通过投资风险溢价影响企业预期。"
      }
    ];
    elements.eventExplainer.innerHTML = `
      <div class="event-explainer-heading">
        <span class="micro-label">KEY EVENTS</span>
        <h3>关键政治事件与镍价变化</h3>
      </div>
      <div class="event-story-list">
        ${events
          .map((event, index) => {
            const startPrice = priceByMonth.get(event.from);
            const endPrice = priceByMonth.get(event.to);
            const change = (endPrice / startPrice - 1) * 100;
            return `
              <article class="event-story">
                <div class="event-story-index">${String(index + 1).padStart(
                  2,
                  "0"
                )}</div>
                <div>
                  <span class="event-story-date">${escapeHTML(event.date)}</span>
                  <h4>${escapeHTML(event.title)}</h4>
                  <p>${escapeHTML(event.fact)}</p>
                  <div class="event-price-change">
                    <span>${event.from} → ${event.to}</span>
                    <strong>$${startPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 0
                    })} → $${endPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 0
                    })}/吨</strong>
                    <b class="${change >= 0 ? "up" : "down"}">${
                      change >= 0 ? "+" : ""
                    }${change.toFixed(1)}%</b>
                  </div>
                  <p class="event-reason">${escapeHTML(event.reason)}</p>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderNetworkTabs() {
    elements.networkLayerTabs.innerHTML = sna.layers
      .map(
        (layer) => `
          <button
            class="network-layer-button ${
              state.networkLayer === layer.id ? "is-active" : ""
            }"
            type="button"
            data-network-layer="${escapeHTML(layer.id)}"
          >
            ${escapeHTML(layer.label)}
          </button>
        `
      )
      .join("");
    elements.networkLayerTabs
      .querySelectorAll("[data-network-layer]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          state.networkLayer = button.dataset.networkLayer;
          renderRelationshipNetwork();
        });
      });
  }

  function renderNetworkSidePanel(edges, nodeById, weightedDegree) {
    const layer =
      sna.layers.find((item) => item.id === state.networkLayer) || sna.layers[0];
    const node = nodeById.get(state.networkNodeId) || sna.nodes[0];
    const coreEdges = edges.filter((edge) => edge.includeCore);
    const strongestRelations = edges
      .filter((edge) => edge.from === node.id || edge.to === node.id)
      .sort((left, right) => right.weight - left.weight)
      .slice(0, 4)
      .map((edge) => {
        const outgoing = edge.from === node.id;
        const other = nodeById.get(outgoing ? edge.to : edge.from);
        return `
          <li>
            <span>${outgoing ? "发出" : "接收"} · ${escapeHTML(
              edge.label.split("：").slice(-1)[0]
            )}</span>
            <strong>${escapeHTML(other?.name || "未知主体")}</strong>
            <b>${edge.sign > 0 ? "合作/授权" : "压力/约束"} · ${edge.weight.toFixed(
              1
            )}</b>
          </li>
        `;
      })
      .join("");

    elements.networkSidePanel.innerHTML = `
      <span class="micro-label">NETWORK LAYER</span>
      <h3>${escapeHTML(layer.label)}</h3>
      <p>${escapeHTML(layer.description)}</p>
      <div class="network-layer-stats">
        <div><span>可见关系</span><b>${edges.length}</b></div>
        <div><span>核心关系</span><b>${coreEdges.length}</b></div>
      </div>
      <div class="network-node-profile">
        <span class="micro-label">SELECTED ACTOR</span>
        <h4>${escapeHTML(node.name)}</h4>
        <div class="network-role-line">
          <span>${escapeHTML(node.role)}</span>
          <b>加权度 ${(weightedDegree.get(node.id) || 0).toFixed(1)}</b>
        </div>
        <p>${escapeHTML(node.framing)}</p>
        <div class="network-interest">
          <span>核心利益</span>
          <strong>${escapeHTML(node.keyInterest || "未标注")}</strong>
        </div>
      </div>
      <div class="network-relations">
        <span class="micro-label">STRONGEST RELATIONS</span>
        <ul>${strongestRelations || "<li>当前层无直接关系</li>"}</ul>
      </div>
    `;
  }

  function renderRelationshipNetwork() {
    const width = 980;
    const height = 500;
    const nodes = sna.nodes;
    const nodeById = new Map(nodes.map((node) => [node.id, node]));
    const edges = sna.edges.filter(
      (edge) => state.networkLayer === "all" || edge.layer === state.networkLayer
    );
    const weightedDegree = new Map(nodes.map((node) => [node.id, 0]));
    edges.forEach((edge) => {
      weightedDegree.set(
        edge.from,
        (weightedDegree.get(edge.from) || 0) + edge.weight
      );
      weightedDegree.set(
        edge.to,
        (weightedDegree.get(edge.to) || 0) + edge.weight
      );
    });
    const project = (node) => ({
      x: 70 + (node.map.x / 100) * (width - 140),
      y: 45 + (node.map.y / 100) * (height - 90)
    });

    const dots = [];
    for (let x = 28; x < width; x += 28) {
      for (let y = 25; y < height; y += 28) {
        dots.push(`<circle class="graph-grid-dot" cx="${x}" cy="${y}" r="0.9"></circle>`);
      }
    }

    const edgeSvg = edges
      .map((edge) => {
        const source = nodeById.get(edge.from);
        const target = nodeById.get(edge.to);
        if (!source || !target) return "";
        const start = project(source);
        const end = project(target);
        const bend = edge.from === "EXEC" || edge.to === "EXEC" ? 18 : -16;
        const middleX = (start.x + end.x) / 2;
        const middleY = (start.y + end.y) / 2 + bend;
        const background = !edge.includeCore || edge.confidence === "C";
        const sign = edge.sign < 0 ? "negative" : "positive";
        return `
          <path
            class="network-edge ${sign} ${background ? "background" : ""}"
            d="M${start.x},${start.y} Q${middleX},${middleY} ${end.x},${end.y}"
            stroke-width="${1.2 + edge.weight * 0.75}"
            marker-end="url(#network-arrow-${sign})"
          >
            <title>${escapeHTML(source.name)} → ${escapeHTML(
              target.name
            )}：${escapeHTML(edge.label)}（${escapeHTML(edge.confidence)} 级）</title>
          </path>
        `;
      })
      .join("");

    const nodeSvg = nodes
      .map((node) => {
        const point = project(node);
        const radius =
          14 + Math.sqrt(weightedDegree.get(node.id) || 0) * 4.2;
        return `
          <g
            class="network-node ${
              state.networkNodeId === node.id ? "is-selected" : ""
            }"
            data-network-node="${escapeHTML(node.id)}"
            tabindex="0"
            role="button"
            aria-label="${escapeHTML(node.name)}"
          >
            <circle cx="${point.x}" cy="${point.y}" r="${radius}"></circle>
            <text x="${point.x}" y="${point.y + radius + 16}">${escapeHTML(
              node.short
            )}</text>
          </g>
        `;
      })
      .join("");

    elements.relationshipNetwork.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="印尼镍矿国内治理关系网络">
        <defs>
          <marker id="network-arrow-positive" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#176b5a"></path>
          </marker>
          <marker id="network-arrow-negative" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#9b3c32"></path>
          </marker>
        </defs>
        ${dots.join("")}
        ${edgeSvg}
        ${nodeSvg}
      </svg>
    `;
    renderNetworkSidePanel(edges, nodeById, weightedDegree);
    renderNetworkTabs();

    elements.relationshipNetwork
      .querySelectorAll("[data-network-node]")
      .forEach((node) => {
        const select = () => {
          state.networkNodeId = node.dataset.networkNode;
          renderRelationshipNetwork();
        };
        node.addEventListener("click", select);
        node.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            select();
          }
        });
      });
  }

  function init() {
    renderInternationalGraph();
    renderMap();
    renderPolicyChart();
    renderEventExplainer();
    renderRelationshipNetwork();
    refreshIcons();
  }

  init();
})();
