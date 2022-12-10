---
layout: post
title: Research
description: Peer-reviewed papers, Talks, and Open sources
image: assets/images/253418.jpg
nav-menu: true
---

## Publications
*<sup>+</sup> denotes equal contribution*

### 2023
1. Yunbo Lyu<sup>+</sup>, **Thanh Le-Cong**<sup>+</sup>, Hong Jin Kang, Ratnadira Widyasari, Zhao Zhipeng, Bach Le, Ming Li, David Lo, *"Chronos: Time-Aware Zero-Shot Identification of Libraries from Vulnerability Reports"*, In the IEEE/ACM 45th International Conference on Software Engineering (ICSE) 2023, Technical Track ([PDF](), [Code](https://github.com/soarsmu/Chronos) [Dataset](https://figshare.com/articles/software/Chronos-ICSE23/20787805)).

### 2022
1. **Thanh Le-Cong**, Hong Jin Kang, Truong Giang Nguyen, Stefanus Agus Haryono, David Lo, Bach Le, Thang Huynh Quyet, *"AutoPruner: Transformer-Based Call Graph Pruning"*, In the ACM 30th Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering (ESEC/FSE), Research Track 2022 ([PDF](./pdf/FSE_AutoPruner.pdf), [Code](https://github.com/soarsmu/AutoPruner) [Dataset](https://zenodo.org/record/6369874#.YjWzmi8RppR)).

2. Truong Giang Nguyen, **Thanh Le-Cong**, Hong Jin Kang, and Bach Le, David Lo, *"VulCurator: A Vulnerability-Fixing Commit Detector"*, In the ACM 30th Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering (ESEC/FSE) 2022, Tool Demos Track ([PDF](./pdf/VulCurator.pdf), [Code and Dataset](https://github.com/ntgiang71096/VFDetector)).

3. Thanh-Dat Nguyen, **Thanh Le-Cong**, Duc-Minh Luong, and Van-Hai Duong, Bach Le, David Lo, Quyet-Thang Huynh, *"FFL: Fine grained Fault Localization for Student Programs via Syntactic and Semantic Reasoning"*, In the IEEE 38th International Conference on Software Maintenance and Evolution (ICSME) 2022, Research Track ([PDF](./pdf/ICSME_FFL.pdf), [Code and Dataset](https://github.com/FFL2022/FFL)).

4. Thanh-Dat Nguyen<sup>+</sup>, <strong>Thanh Le-Cong</strong><sup>+</sup>, ThanhVu H. Nguyen, and Bach Le, Quyet-Thang Huynh, *"Toward the Analysis of Graph Neural Networks"*, In the IEEE/ACM 44th International Conference on Software Engineering (ICSE) 2022, New Ideas and Emerging Results (NIER) Track, ([PDF](./pdf/ICSE_GNNInfer.pdf)). 

### 2021
1. **Thanh Le-Cong**, Bach Le, Quyet-Thang Huynh, and Phi Le Nguyen, *"Usability and Aesthetics: Better Together for Automated Repair of Web Pages"*, In the ACM 30th Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering (ISSRE) 2021, Research Track ([PDF](./pdf/ISSRE21.pdf))


### Prior

1. Bao Hieu Tran, **Thanh Le-Cong**, Huu Manh Nguyen, Duc Anh Le, Thanh Hung Nguyen, Phi Le Nguyen. *“SAFL: A Self-Attention Scene Text Recognizer with Focal Loss.”* In the 19th IEEE International Conference on Machine Learning and Applications (ICMLA) 2020, Special Issues on Deep Learning. 

2. Thi Thanh Binh Huynh, Dinh Thanh Pham, Ba Trung Tran, **Thanh Le-Cong**, Minh Hai Phong Le, Ananthram Swami, Thu Lam Bui. *“A multifactorial optimization paradigm for linkage tree genetic algorithm”*, Information Sciences (2020). 

## Open Sources
1. "Chronos: Zero-Shot Identification of Libraries from Vulnerability Reports". [Code](https://github.com/soarsmu/Chronos) [Dataset](https://figshare.com/articles/software/Chronos-ICSE23/20787805)
2. "AutoPruner: Transformer-based Call Graph Pruning". [Code](https://github.com/soarsmu/AutoPruner) [Dataset](https://zenodo.org/record/6369874#.YjWzmi8RppR)
3. "Invalidator: Automated Patch Correctness Assessment via Semantic and Syntactic Reasoning" [Code and Dataset](https://github.com/thanhlecongg/Invalidator)


## Talks

### Property Inference for DNN - [BK.AI Seminar Series](https://bkai.ai/seminar-property-inference-for-dnn/)/[VNU-UET RD320 Seminar Series](https://www.facebook.com/rd320uet/) - August 2022

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/ysF-mC566js" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

Deep Neural Networks (DNNs) have recently emerged as a powerful framework for solving complex real-world problems, including safety-critical tasks such as autonomous driving, finance, and medical diagnosis. Despite their popularity, it has been shown that DNNs can be vulnerable and unreliable. Ensuring the reliability and trustworthiness of DNNs thus becomes an increasingly challenging and essential task. Towards this, researchers recently have developed DNNs analyses, e.g., verification or testing, to provide insights into the behaviors of DNNs.
In this talk, we will study property inference – a new research direction on DNNs analysis. First, I introduce the property inference for deep neural networks. Then, I present the first work on the research direction, Prophecy, which automatically infers the formal properties of feed-forward neural networks and gets introduced at ASE 2019. Finally, GNN-Infer, a new property inference technique introduced at ICSE 2022, is presented towards discovering formal properties for graph neural networks.

### AutoPruner: Transformer-based Call Graph Pruning - [SOLA Weekly Seminars](https://www.software-lab.org/) - November 2022

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/VP6535R2QvQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

Constructing a static call graph requires trade-offs between soundness and precision. Program analysis techniques for constructing call graphs are unfortunately usually imprecise. To address this problem, researchers have recently proposed call graph pruning empowered by machine learning to post-process call graphs constructed by static analysis. A machine learning model is built to capture information from the call graph by extracting structural features for use in a random forest classifier. It then removes edges that are predicted to be false positives. Despite the improvements shown by machine learning models, they are still limited as they do not consider the source code semantics and thus often are not able to effectively distinguish true and false positives. In this talk, I presents AutoPruner, a novel call graph pruning technique introduced at ESEC/FSE 2022 for eliminating false positives in call graphs via both
statistical semantic and structural analysis.


