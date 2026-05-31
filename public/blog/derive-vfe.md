---
title: "How to derive Variational Free Energy"
author: "Dan Elliott"
date: 2026-05-31
tags: [tutorial, derivation, <!-- ... -->]
math: true # enable KaTeX/MathJax
toc: true # auto table of contents
---

<!--
  STYLE NOTES (delete before publishing)
  - Build the model incrementally: each section adds ONE new complication.
  - State each result equation, THEN derive it line by line.
  - One logical step per displayed equation.
  - Number every equation you refer back to:  $$ ... \tag{n} $$
  - End each conceptual unit with an Exercise + boxed Answer.
  - Keep a running Notation table; introduce no symbol without defining it.
-->

# How to derive Variational Free Energy: A Software Engineers Guide.

## Abstract

Variational Free Energy (VFE) is the single scalar quantity that an active inference agent minimises in order to perceive, learn, and act. It acts as a tractable upper bound on "surprise" that lets a generative model infer the hidden causes of its sensory data without ever computing an intractable integral. This post derives VFE from first principles and shows why it is the objective function you actually implement when building active inference agents over Partially Observable Markov Decision Processes (POMDPs): get the free energy term right and perception, learning, and action selection all fall out of it. Written from the perspective of a software engineer, it follows the structure of Rafal Bogacz's _"A tutorial on the free-energy framework for modelling perception and learning"_ (2017) but demonstrates dense variational calculus for runnable Python and plain variable names, aiming to make the framework accessible to anyone who wants to _build_ these models. This post is the first in a series of texts designed to widen the accessibility of these Active Inference Machines.

## 1. Introduction

<!-- Motivation, the problem, the final equation previewed, roadmap of sections. -->

If you've ever been like me, laying awake at night contemplating how to implement continuous generative models within the framework of Active Inference (**ActInf** - I wanted to use AI but this doesn't need to be any more confusing than it already is) then I'm genuinely surprised because I thought I was weird. In my spare time I am building Active Inference POMDP models with my partner in crime Kev, mostly using the [pymdp](https://github.com/infer-actively/pymdp) python toolbox. Although this toolbox is brilliant and has been a joy to use it currently doesn't support creation of Continuous Generative Models (CGMs). Which makes my current ultimate goal of creating a Mixed Generative Model (MGM) someone more difficult. To do this I need to understand how the fundamental equations of these models are derived, hence this post and subsequent posts. Due to it's nature, there isn't large amounts of easily accessible content on this stuff of Active Inference in general so whilst learning how to code this stuff I thought I might as well document it as I go.

> _Note_: There will be a lot of acronyms to deal with in this post. Please remember ctrl+F/cmd+F exists if you forget. It's taken me a long time to commit them to memory.

Our goal is to go from first principles, based on a simple organism, to this monstrosity:

$$
\dot{\phi} \;=\; -\frac{\partial F}{\partial \phi} \;=\; \frac{\big(u - g(\phi)\big)\,g'(\phi)}{\Sigma_u} \;-\; \frac{\phi - v_p}{\Sigma_p}
$$

---

## 2. The Simplest Case

<!-- Minimal version of the problem: one observation, one variable. -->

### 2.1 Setting up the problem

<!-- Define variables, assumptions, generative model. -->

> **Notation**
> | Symbol | Meaning |
> |--------|---------|
> | $x$ | <!-- ... --> |
> | $v$ | <!-- ... --> |

### 2.2 Stating the result

The quantity we want is

$$
% result equation here
\tag{1}
$$

### 2.3 Derivation

<!-- Sentence. Then a line. Sentence. Then a line. -->

$$
% step
\tag{2}
$$

> **Box 1 — <!-- key idea / intuition -->**
>
> <!-- A boxed aside: intuition, alternative view, or caveat. -->

> **Exercise 1.** <!-- prompt -->
>
> <details><summary>Answer</summary>
>
> <!-- worked solution -->
>
> </details>

---

## 3. Adding the Next Complication

<!-- e.g. nonlinearity, prior, uncertainty — one new thing. -->

### 3.1 Why the simple case isn't enough

### 3.2 The extended result

$$
\tag{3}
$$

### 3.3 Derivation

> **Exercise 2.** <!-- ... -->
>
> <details><summary>Answer</summary>
>
> </details>

---

## 4. A Possible Neural Implementation

<!-- Map the equations onto a circuit / mechanism / algorithm. -->

![Figure 1. <!-- caption: nodes, connections, what each represents -->](figs/fig1.png)

> **Exercise 3.** <!-- implement / simulate -->
>
> <details><summary>Answer</summary>
>
> ```python
> # reference implementation
> ```
>
> </details>

---

## 5. Learning the Parameters

<!-- Generalize from inference to learning; derive the update rules. -->

### 5.1 The objective

### 5.2 Update rule

$$
\tag{4}
$$

---

## 6. Scaling Up / The General Case

<!-- Multiple variables, hierarchy, vector/matrix form. -->

$$
\tag{5}
$$

---

## 7. Discussion

<!-- Relation to other frameworks, limitations, extensions, open questions. -->

---

## Appendix A — <!-- e.g. background math / derivation details -->

## Appendix B — Exercise Solutions

<!-- Optional: collected full solutions if not inlined above. -->

---

## Notation Summary

| Symbol | Meaning | First used |
| ------ | ------- | ---------- |
|        |         | §          |

## References

1. <!-- Bogacz, R. (2017). A tutorial on the free-energy framework... -->
2.
