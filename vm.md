---
layout: post
date: 2022-06-10 12:00:00-0400
title: Software Supply Chain Security
tag: project
---
### Overview

<p>
<b>Motivation:</b> Modern software development involves the heavy use of APIs and third-party components. The reliance increase security risks of software system as the API and third-party components can contain exploitable vulnerabilities. 
</p>
<p>
<b>Approach:</b> This theme aim to mitigate these  risk by creating an advanced software composition analysis solution that scans dependency hierarchies and builds new deep learning architectures to analyse code and document repository data and flag vulnerabilities. 
Towards this goal, my colleagues and I have designed a comprehensive array of novel automated solutions that leveraged data-driven approaches to support developers and security practitioners in various tasks including: 
<li>
    <b>Identifying vulnerability-fixing commits</b>: In practice, there is often a delay between the time a vulnerability is fixed and the time it is publicly disclosed, leading to a risk that OSS users are unaware of vulnerabilities in their applications. We proposed to automatically identify vulnerability-fixing commits by analyzing the commit <b>broadly</b>, e.g., using multiple information sources [<a href="./pdf/VulCurator.pdf">VulCurator (ESEC/FSE'22)</a>] and  <b>deeply</b>, e.g., using multiple granularities of code changes<a href="./pdf/TSE_Midas.pdf"> [Midas (TSE'23)</a>]. 
</li>

<li>
    <b> Identifying affected libraries from vulnerability reports</b>: To improve the security of software supply chains, developers must be alerted about vulnerable dependencies or libraries. However, vulnerability reports may not always explicitly list these affected libraries, requiring manual analysis. To automate this process, researchers have proposed using extreme multi-label learning (XML) to automatically identify libraries from vulnerability reports. However, we have found that previous studies did not consider the chronological order of reports, which can lead to a decline in performance when dealing with unseen libraries. To address this issue, we propose [<a href="./pdf/ICSE_Chronos.pdf">Chronos (ICSE'23)</a>], which utilizes a zero-shot learning model, ZestXML, along with a domain-specific data enhancement and time-aware adjustment to automatically identify affected libraries from vulnerability reports.
</li>
<li>
<b>Call graph analysis</b>: Call Graph Analysis is crucial to analyze the propagation of software vulnerabilities in software supply chain. Unfortunately, program analysis techniques for constructing call graphs are usually imprecise, causing a high false-positive rate on call graph analyses. To address this issue, we propose a novel technique, [<a href="./pdf/FSE_AutoPruner.pdf">AutoPruner (ESEC/FSE'22)</a>], that incorporates both structural information extracted from original call graph and statistical semantic information extracted from a large language model, i.e., CodeBERT, to learn how to effectively prune false positives in call graphs. 
</li>
</p>

### Related Publications

1. **[TSE'23] MiDas: Multi-Granularity Detector for Vulnerability Fixes**
   - **Authors**: Truong Giang Nguyen, <strong style="color: black;">Thanh Le-Cong</strong>, Hong Jin Kang, Ratnadira Widyasari, Chengran Yang, Zhipeng Zhao, Bowen Xu, Jiayuan Zhou, Xin Xia, Ahmed E. Hassan, Bach Le, and David Lo
   - **Venue**: IEEE Transactions on Software Engineering 
   - **Links**: <a href="https://ieeexplore.ieee.org/document/10138621/">[DOI]</a> <a href="./pdf/TSE_Midas.pdf">[PDF]</a>  <a href="https://github.com/soarsmu/midas">[Code]</a>
   - ****One-line Abstract:**** Identifying vulnerability fixes by analyzing multi-granularity of code changes. 

3. **[ICSE'23] Chronos: Time-Aware Zero-Shot Identification of Libraries from Vulnerability Reports** <img src="./assets/images/artifacts_available-removebg-preview.png"  width="50" height="50"> <img src="./assets/images/artifacts_evaluated_functional-removebg-preview.png"  width="50" height="50">
   - **Authors**: Yunbo Lyu<sup>+</sup>, <strong style="color: black;">Thanh Le-Cong</strong><sup>+</sup>, Hong Jin Kang, Ratnadira Widyasari, Zhao Zhipeng, Bach Le, Ming Li, and David Lo
   - **Venue**: IEEE/ACM 45th International Conference on Software Engineering (ICSE) 2023, Technical Track
   - **Links**: [[DOI]](https://ieeexplore.ieee.org/document/10172641) [[PDF]](./pdf/ICSE_Chronos.pdf)  [[Code]](https://github.com/soarsmu/Chronos)
   - **Acceptance Rate:** 26%
   - **One-line Abstract:** Practically identifying vulnerable libraries from vulnerability reports via zero-shot learning and domain-specific pre/post-processing.

4. **[ESEC/FSE'22] AutoPruner: Transformer-Based Call Graph Pruning** <img src="./assets/images/artifacts_available-removebg-preview.png"  width="50" height="50"> <img src="./assets/images/artifacts_evaluated_functional-removebg-preview.png"  width="50" height="50">
   - **Authors**: <strong style="color: black;">Thanh Le-Cong</strong>, Hong Jin Kang, Truong Giang Nguyen, Stefanus Agus Haryono, David Lo, Bach Le, and Thang Huynh Quyet
   - **Venue**: ACM 30th Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering (ESEC/FSE) 2022, Research Track
   - **Links**: [[DOI]](https://dl.acm.org/doi/abs/10.1145/3540250.3549175) [[PDF]](./pdf/FSE_AutoPruner.pdf)  [[Code]](https://github.com/soarsmu/AutoPruner)
   - **Acceptance Rate:** 22%
   - **One-line Abstract:** Pruning false positives in static call graph via code features learned by Large Language Model and syntactic features extracted from original call graph.

2. **[ESEC/FSE'22] VulCurator: A Vulnerability-Fixing Commit Detector**
   - **Authors**: Truong Giang Nguyen, <strong style="color: black;">Thanh Le-Cong</strong>, Hong Jin Kang, Bach Le, and David Lo
   - **Venue**: ACM 30th Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering (ESEC/FSE) 2022, Tool Demos Track
   - **Links**: [[DOI]](https://dl.acm.org/doi/abs/10.1145/3540250.3558936) [[PDF]](./pdf/VulCurator.pdf)  [[Code]](https://github.com/ntgiang71096/VFDetector)
   - **Acceptance Rate:** 56%
   - **One-line Abstract:** Identifying vulnerability-fixing commits by applying Large Language Model on multiple sources including code changes, commit messages, and related issues.