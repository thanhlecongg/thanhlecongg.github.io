---
layout: page
permalink: /publications/
title: Publications 
description: (*) denotes equal contribution. 
years: [Ongoing, 2022,2021]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">
Summary: ICSE (1), ESEC/FSE (2)
{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
