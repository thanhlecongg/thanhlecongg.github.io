---
layout: post
date: 2022-06-10 12:00:00-0400
title: Software Supply Chain Security
tag: project
---

<p>Modern software development involves the heavy use of APIs and third-party components. The reliance increase security risks of software system as the API and third-party components can contain exploitable vulnerabilities. 
The goal of this theme is to mitigate these  risk by creating an advanced software composition analysis solution that scans dependency hierarchies and builds new deep learning architectures to analyse code and document repository data and flag vulnerabilities. 
Towards this goal, my colleagues and I have designed a comprehensive array of novel automated solutions that leveraged data-driven approaches to support developers and security practitioners in various tasks including: 
</p>
<p>
    <b>Identifying vulnerability-fixing commits</b>: In practice, there is often a delay between the time a vulnerability is fixed and the time it is publicly disclosed, leading to a risk that OSS users are unaware of vulnerabilities in their applications. We proposed to automatically identify vulnerability-fixing commits by analyzing the commit <b>broadly</b>, e.g., using multiple information sources [<a href="./pdf/VulCurator.pdf">VulCurator (ESEC/FSE'22)</a>] and  <b>deeply</b>, e.g., using multiple granularities of code changes<a href="./pdf/TSE_Midas.pdf"> [Midas (TSE'23)</a>]. 
</p>

<p>
    <b> Identifying affected libraries from vulnerability reports</b>: To improve the security of software supply chains, developers must be alerted about vulnerable dependencies or libraries. However, vulnerability reports may not always explicitly list these affected libraries, requiring manual analysis. To automate this process, researchers have proposed using extreme multi-label learning (XML) to automatically identify libraries from vulnerability reports. However, we have found that previous studies did not consider the chronological order of reports, which can lead to a decline in performance when dealing with unseen libraries. To address this issue, we propose [<a href="./pdf/ICSE_Chronos.pdf">Chronos (ICSE'23)</a>], which utilizes a zero-shot learning model, ZestXML, along with a domain-specific data enhancement and time-aware adjustment to automatically identify affected libraries from vulnerability reports.
</p>
<p>
<b>Call graph analysis</b>: Call Graph Analysis is crucial to analyze the propagation of software vulnerabilities in software supply chain. Unfortunately, program analysis techniques for constructing call graphs are usually imprecise, causing a high false-positive rate on call graph analyses. To address this issue, we propose a novel technique, [<a href="./pdf/FSE_AutoPruner.pdf">AutoPruner (ESEC/FSE'22)</a>], that incorporates both structural information extracted from original call graph and statistical semantic information extracted from a large language model, i.e., CodeBERT, to learn how to effectively prune false positives in call graphs. 
</p>