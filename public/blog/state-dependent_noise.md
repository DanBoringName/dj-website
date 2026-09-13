---
title: "State-dependent noise revives curiosity"
author: "Dan Corva"
date: 2026-05-31
tags:
  [
    tutorial,
    derivation,
    active-inference,
    state-dependent,
    bayesian-inference,
    predictive-coding,
    computational-neuroscience,
    python,
  ]
math: true # enable KaTeX/MathJax
toc: true # auto table of contents
---

# State-dependent noise revives curiosity

### Introduction

Imagine for a second your eyes fail to be eyes like mine, and you require a high prescription pair of glasses to see anything more than a few inches from your face. Now imagine no matter what prescription you wore, those squiggly letters at the opticians remained the exact same blurriness and more importantly, walking closer or further away from them made no difference. Might seem a bit of an odd thought but bear with me. This is exactly how we've been programming robot sensors since the 60s. We (humans) have been assuming that the noise (the blurriness) is perfectly uniform regardless of state. Where you are, at what time, and under what conditions - we will simplify this concept to spatial for the remainder of this blog, but I wanted to make it clear that state doesn't have to refer to a spatial location.

### Background - cpomdp and curiosity

Active Inference is a process theory under the Free Energy Principle, which is a very technical way of saying that it combines the ability to infer the "world" with the ability to act upon it by doing something called minimising surprise. Without going into too much technical detail (there is plenty of that to come yet) surprise here basically refers to how much something was unexpected (or surprising), it is a divergence from what your brain thinks the world should be, and what actually happened.

<details>

<summary>

FEP surprise example

</summary>

Imagine you walk into your kitchen and see a kettle. Minimal surprise. Your model of a kitchen is very familiar with the concept of a kitchen and therefore you barely pay attention to it. Now imagine you walk into your kitchen and see a tiger. Huge surprise. Your body now does a lot of work to try and minimise that huge surprise it just received. Your fight or flight instincts kick in and you probably run. A bit jokey and the complexity can grow but I think it does the job we need of it today.

</details>

In my spare time I am building active inference agents. Agents that follow this minimising surprise mechanism to infer and act their world. `pymdp` is a tool that already does this very well, created by Conor Heins, it has been used far and wide within the active inference community. However, it has one very real limitation. It contains itself to discrete-space. I, being the ever inquisitive person I am, thought about expanding these type of agents to continuous-space. `cpomdp` was built and at the time of writing it is at v0.4.4.

Creating `cpomdp` at the start had many teething issues but none quite like something I have come to coin **the Koudahl Collapse** (with Koudahl's blessing). For those readers who are less concerned with technicalities the Koudahl collapse can be thought of _a lack of curiosity_ regardless of an action. The more technical explanation needs a little more background.

Most people when starting to simulate complex continuous mathematics (unless you enjoy self-flagellation) start with the **linear-Gaussian regime**. What this means in layman's terms is the variables of the world act in easy to compute and predictable ways. Gaussian - they have an average value and the variance is equal in both directions centred on that mean forming the classic "bell shape" curve. Linear - the maths is linear, meaning double the input and you double the output, no curves, no thresholds, nothing that bends. Together these two keep everything a Gaussian all the way through. The problem is, in 2021, Koudahl and his team proved that in the linear-Gaussian regime, active inference returns a flat epistemic (mathematical form of curiosity) value regardless of action. Meaning choosing to do one thing revealed the exact same amount of information as any other choice you could have made. Think back to our eye test example in the introduction. Any step you take tells you nothing about which letters are written on the board, and therefore you have no incentive to move closer. This is synonymous with a lack of curiosity.

Somewhat ironically this left me in a tricky spot. Give up making linear-Gaussian agents and move onto something more complex. Or figure out the smallest mathematical change I could to get around the Koudahl collapse without being disloyal to biology. See my goal with all of this is to explore the viability of biology "doing" active inference. That has been a core driving philosophy when building towards v1 of `cpomdp`. If biology has no viable way of doing something then I'm not interested in introducing it into the code, yet. That would be a post v1 goal. This led me down the route of what I think is quite an elegant solution (although of course I would think that, I came up with it ugh). Make the noise of the sensor, depend on where the agent is. Essentially give the agent a set of working glasses and biologically accurate eyes. That way when an agent moves towards the letters on the board they become clearer, move away, they become noisier. You now share my state of mind going into my first paper (1 of 4 planned) **State-Dependent Observation Noise Reintroduces Epistemic Value in Linear-Gaussian Active Inference** (Corva, 2026), [arXiv:2607.20306](https://arxiv.org/abs/2607.20306)

### Why the collapse happens

I threatened technical writing so here we go, starting with the Koudahl collapse. To understand where the flatness comes from you need to know how a linear-Gaussian agent keeps track of the world. It does so with a very old and very well loved piece of maths called the **Kalman filter**. Don't let the name put you off. A Kalman filter is just a loop of three steps that runs every time the agent gets a new observation from the world.

1. **Predict.** Based on what I believed a moment ago, and what I just did, where do I think the world is now? Because the maths is linear my belief stays a bell curve, it just slides along and gets a little wider, because moving always adds a bit of uncertainty. Think of this as being blindfolded. You start knowing where you are exactly even though you can't see, but each step you take makes you incrementally less certain.
2. **Observe.** Take a look. The sensor hands back a reading, and the reading comes with its own bell curve of blurriness. In the maths this blurriness has a name, $R$, the observation noise. In blindfold terms this is like hearing your microwave beep. Your hearing has just helped you place yourself slightly better in your house, but for most of us mere mortals it isn't 100% exact.
3. **Update.** Blend the prediction with the observation. How much you trust the reading over the prediction is set by a number called the Kalman gain, and the gain is decided entirely by how wide your predicted bell curve is against how blurry the sensor is. My wife, who can never tell where a noise is coming from, has a low gain. When I drop a glass in the kitchen she leans on her prediction of where I probably am and waits for a second clue, because her hearing "noise" is a wide bell curve. Mine is pointier, so one crash is enough. Love you honey ;). Note that her hearing is exactly as bad from every room in the house. Hold onto that.

Here is the part that matters. Look at what goes into the update step and, more importantly, what doesn't. The width of your belief after a look depends on the width before the look and on $R$. Your action is nowhere in those three steps. Moving changes _where_ your bell curve sits, but the schedule by which it narrows is fixed the moment you write down the model. Every look shrinks your uncertainty by exactly the same amount, and it would have done so from any chair in the room.

> I apologise for the different analogies in this section. Human senses, as it turns out, are quite complicated making it hard to analogise to one mathematical process cleanly. The alternative of closing your eyes and taking quick rapid glances works but most people's eyes work well enough that they localise themselves almost perfectly at each glance, especially in a small world. Hearing is a bit more noisy.

<details>

<summary>

Side box - what is expected free energy?

</summary>

If you've read my [VFE derivation](/blog/derive-vfe) you know that variational free energy is a score for how well your current beliefs explain what you have _already_ seen. It looks backwards. Expected free energy (EFE) is its forward looking sibling. It scores an action you _haven't taken yet_ by imagining what you would see if you took it, and an active inference agent picks whichever action gets the lowest score.

The useful thing about EFE is that it splits into two halves, which I covered briefly in [Part 2 of the Active Inference series](/blog/active-inference-part-2):

- **Pragmatic value.** Will this action take me towards the outcomes I prefer? This is the goal chasing half. Cold, hungry, in the wrong room, this is the term that gets you out of it.
- **Epistemic value.** Will this action teach me something? This is the curiosity half. It is scored as how much I expect my uncertainty to shrink after I see the result, which is the same as asking how much information the observation will hand me.

Written loosely, the agent wants to minimise

$$
\text{EFE(action)} \approx -\,\text{pragmatic value} - \text{epistemic value}
$$

so it likes actions that are both useful and informative, and when the two disagree it balances them automatically.

For a bell-curve agent the epistemic half has a very concrete form. Uncertainty is the width of the bell curve, so "how much will my uncertainty shrink" becomes

$$
\text{epistemic value} = \tfrac{1}{2}\ln\frac{\text{width before the look}}{\text{width after the look}}
$$

and that ratio is set entirely by the Kalman filter's update step. Hold that thought, because you have just watched that update step ignore your action completely.

</details>

Now, recall what curiosity really means in active inference. The epistemic part of expected free energy is asking one question of every possible action: _if I do this, how much will my uncertainty shrink?_ We have just seen that the answer is the same for every action. So the epistemic value is a constant, and a constant that is identical across all your options has no say in which one you pick. It doesn't get cancelled out by anything clever, it just never varied in the first place. What is left is the agent chasing its preferred outcomes and nothing else, which is why Koudahl and his team could show that active inference in this regime is exactly equivalent to a much older and much less curious method called KL control.

Back at the opticians. Your eyes (with or without glasses) blur the letters by the same fixed amount from every chair. You can predict that a look from the front row and a look from the back row will leave you equally sure of what the letters are, so there is no point in standing up. That is not a bug in your motivation, it is an honest answer from the maths. Your model of the world literally has no way to express the idea that some positions give better looks than others.

Which tells us exactly where the fix has to go.
