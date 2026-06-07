---
title: "How to derive Variational Free Energy"
author: "Dan Corva"
date: 2026-05-31
tags: [tutorial, derivation, <!-- ... -->]
math: true # enable KaTeX/MathJax
toc: true # auto table of contents
---

# How to derive Variational Free Energy: A Software Engineers Guide.

## Abstract - OI prick! make this more accessible

Variational Free Energy (VFE) is the single scalar quantity that an active inference agent minimises in order to perceive, learn, and act. It acts as a tractable upper bound on "surprise" that lets a generative model infer the hidden causes of its sensory data without ever computing an intractable integral. This post derives VFE from first principles and shows why it is the objective function you actually implement when building active inference agents over Partially Observable Markov Decision Processes (POMDPs): get the free energy term right and perception, learning, and action selection all fall out of it. Written from the perspective of a software engineer, it follows the structure of Rafal Bogacz's _"A tutorial on the free-energy framework for modelling perception and learning"_ (2017) but demonstrates dense variational calculus for runnable Python and plain variable names, aiming to make the framework accessible to anyone who wants to _build_ these models. This post is the first in a series of texts designed to widen the accessibility of these Active Inference Machines.

[Skip my ramblings, this isn't some hippy cookbook.](#2-the-simplest-case)

## 1. Introduction

If you've ever been like me, laying awake at night contemplating how to implement continuous generative models within the framework of Active Inference (**ActInf** - I wanted to use AI but this doesn't need to be any more confusing than it already is) then I'm genuinely surprised because I thought I was weird. In my spare time I am building Active Inference POMDP models with my partner in crime Kev, mostly using the [pymdp](https://github.com/infer-actively/pymdp) python toolbox. Although this toolbox is brilliant and has been a joy to use it currently doesn't support creation of Continuous Generative Models (CGMs). Which makes my current ultimate goal of creating a Mixed Generative Model (MGM) somewhat more difficult. To do this I need to understand how the fundamental equations of these models are derived, hence this post and subsequent posts. Due to it's nature, there isn't large amounts of easily accessible content on Active Inference in general so whilst learning how to code this stuff I thought I might as well document it as I go.

> _Note_: There will be a lot of acronyms and symbols to deal with in this post. There is an appendix for both.

Our goal is to go from first principles, based on a simple organism, to this monstrosity:

$$
\dot{\phi} \;=\; -\frac{\partial F}{\partial \phi} \;=\; \frac{\big(u - g(\phi)\big)\,g'(\phi)}{\Sigma_u} \;-\; \frac{\phi - v_p}{\Sigma_p}
$$

It looks frightening now. By the end it'll look like an old friend who happens to own you money. The whole thing is just two competing pulls wearing the latest greek-algebra collection, and once you've seen what each piece is doing, the rest is bookkeeping. We'll build it up one honest step at a time, the same way I did in my notebook (mistakes and false starts included, because pretending I got it first try would be dishonest and hopefully you can laugh at me to give you brain a break).

Here's the roadmap. We set up a simple organism trying to guess one number, in this case the size of a food item. We write down the textbook-correct way to solve it, notice that the textbook-correct way involves an integral nobody wants to compute, and then quietly walk away from it. We then do the thing the brain (allegedly) actually does, which is find the single best guess instead of the whole distribution. That shortcut is what gives us Free Energy. Then we differentiate it, get an update rule, and start at the two terms until they make sense.

---

## 2. The Simplest Case

### 2.1 Setting up the problem

Bogacz starts with a single value of a single variable being inferred by a single observation. One number in, one number out.

The story is this. We have a simple animal (Bogacz uses "animal" so I will too to keep it consistent, but I find "animal" does a lot of heavy lifting) that wants to infer the **size of a food item**. We'll call this size $v$. The animal can't see size directly. What it _can_ do is sense **light intensity**, because it has a single light-sensitive receptor, and bigger things reflect more light. The sensed light intensity is $u$, and crucially $u$ has **noise**.

So our two characters:

- $v$ -- the **size** of the food (the hidden cause we want to infer)
- $u$ -- the **noisy light intensity** the receptor actually reports (the observation)

Now we need to connect them. Light reflected off an object scales with it's **area**, so Bogacz picks a nice clean non-linear function relating average light intensity to size:

$$
g(v) = v^2
$$

Keep an eye on that $g$. It's the animal's internal model of "how my sensor responds to the world".

Next, the noise. The animal's receptor doesn't report $g(v)$ exactly; it reports something scattered around it. Bogacz assumes the perceived light intensity is **normally distributed** with mean $g(v)$ and variance $\Sigma_u$. In symbols, the likelihood of an observation given a size is:

$$
p(u \mid v) = f\big(u; \, g(v),\,\Sigma_u\big) \tag{1}
$$

where $f(x; \mu, \Sigma)$ is the density of a **normal distribution** which is shown with this formula:

$$
f(x; \mu, \Sigma) = \frac{1}{\sqrt{2\pi\Sigma}} \, \exp\!\left(-\frac{(x-\mu)^2}{2\Sigma}\right) \tag{2}
$$

Read $f(x; \mu, \Sigma)$ as "the bell curve evaluated at $x$, for a distribution whose mean is $\mu$ and whose variance is $\Sigma$". The semicolon is just separating the value we're plugging in (on the left) from the two settings that define the curve's shape and position (on the right). I'll use the $f$ notation throughout - whenever you see it, it's the same formula, just with different things slotted into the blanks.

> _Side note for Bogacz, and worth repeating here_: a Gaussian isn't really the _right_ distribution for light intensity, because Gaussian happily applies probabilities to negative numbers and there's no such thing as negative brightness. But it's clean, its tractable, and it makes the maths behave, so lets just agree to look the other way, for now. This is a recurring theme in modelling: pick the distribution that lets you finish the derivation, apologise in the footnotes.

<details>
<summary>Extra: Why is the mean just g(v)?</summary>

Before moving on I want to justify that "mean $g(v)$" claim, because I'm not a professional academic and it wasn't intuitive to me.

The noisy observation is really the clean prediction $g(v)$ plus some noise, which we notate with an $\omega$:

$$
u = g(v) + \omega, \qquad \omega \sim \mathcal{N}(0, \Sigma_u)
$$

> Don't be fooled by the $\mathcal{N}$, it means the same thing as the $f$ notation, just with the distribution named outright — where $f(x; \mu, \Sigma)$ leaves the distribution generic, $\mathcal{N}(\mu, \Sigma)$ is us saying explicitly "and the distribution here is the Normal (Gaussian) one."

For a fixed $v$, the term $g(v)$ is just a **constant**. There's a handy fact about Gaussians: Adding a constant to a Gaussian random variable just **shifts the mean** by that constant. Formally, if $\omega \sim \mathcal{N}(0, \Sigma_u)$ then $c + \omega \sim \mathcal{N}(c, \Sigma_u)$

So:

$$
\omega \sim \mathcal{N}(0, \Sigma_u) \;\Rightarrow\; g(v) + \omega \sim \mathcal{N}\big(g(v), \Sigma_u\big)
$$

which is exactly equation (1). In plain English: _"a normal distribution over the variable $u$, with mean $g(v)$ and variance $\Sigma_u$"_. Good. Moving on.

</details>

Last important piece that we need for set up is the idea of prior knowledge. A habitual expectation of how big food usually is, before it sees anything at all. This is the bit that makes it Bayesian rather than just "trust the wonky sensor blindly".

For simplicity we assume the animal expects size to be normally distributed too, with mean $v_p$ and variance $\Sigma_p$, where the subscript $p$ stands for **prior**:

$$
p(v) = f(v;\, v_p,\, \Sigma_p) \tag{3}
$$

So now we have both parts that Bayes needs: a **likelihood** $p(u \mid v)$ (how observations relate to causes) and a **prior** $p(v)$ (what we believe before looking).

### 2.2 Stating the result

Here's where we're headed, so you know what the destination looks like before we start the journey.

The exact answer to "given what I saw, how likely us each possible size?" is the **posterior** $p(v \mid u)$, delivered by Bayes' theorem:

$$
p(v \mid u) = \frac{p(v)\, p(u \mid v)}{p(u)} \tag{4}
$$

That's the honest, complete, textbook-correct answer. And as we'll see in a second, it contains a landmine in the denominator. So instead of computing the whole posterior, we'll settle for finding the single **most likely** size (the peak of the posterior) which we'll call $\phi$. The quantity we maximise to find $\phi$ turns out to be (the log of) the numerator of Bayes' rule, and that quantity is what gets called **Free Energy**:

$$
F = \ln p(\phi) + \ln p(u \mid \phi) \tag{5}
$$

Maximise $F$, find your best guess. If your head hurts, don't worry mine did too, first deriving it myself, then secondly trying to think of how to write about how I derived it. I've got double your headaches...loser.

### 2.3 Derivation

#### The exact solution, and the integral that we run away from

To work out how likely the range of different sizes $v$ is, given the observed input $u$, we use Bayes' theorem, equation (4) above. The numerator, $p(v)\,p(u \mid v)$, is just prior multiplied by likelihood. The problem is the denominator, $p(u)$.

The denominator is the **normaliser**. It guarantees that the posterior probabilities over all possible sizes integrate to 1. To achieve it, you have to integrate the numerator over every possible size:

$$
p(u) = \int p(v)\, p(u \mid v)\, dv \tag{6}
$$

<details><summary>

Extra: Why do we integrate the numerator to find $p(u)$?

</summary>

$p(u)$ is the probability of receiving that amount of light across every possible cause (in this case size of food $v$). Importantly the numerator is just the for a single food size. The denominator is across every possible food size, hence the integration. It appears circular but it's not.

</details>

This is the landmine. For our manufactured simple case with friendly Guassians it's doable. _Try Example (1) in the Bogacz paper, python solution is added at appendix ... if you get stuck_. In any realistic model (many variables, non-linear $g$) this integral is **intractable** (meaning very difficult or impossible to control, manage, or solve). It's the wall the entire free-energy framework exists to climb over. So rather than smashing our heads against it, we change the question.

#### Finding the most likely value (the MAP shortcut)

Instead of finding the whole curve $p(v \mid u)$, we go after the single value of $v$ that **maximises** $p(v \mid u)$. We call that value $\phi$, our best-guess size, and we call $p(\phi \mid u)$ the **posterior probability density at that point**.

Bogacz notes (and it's a fairly heavy assumption) that it's reasonable to think the brain represents, at any given moment, only the _most likely_ values of features rather than full distributions. The single best guess, not the entire belief. Bogacz uses binocular rivalry as an evidence of this assumption. If you don't know what that is expand the section below.

<details>
<summary>

Extra: Binocular rivalry

</summary>

Here's a rundown of the experiment. You show each eye a _different_ image, say, vertical stripes to the left eye and horizontal stripes to the right eye, at the same time. Crucially, the two images cannot both be true of the same patch of the world. Your brain is now stuck with contradictory evidence and has to make sense of it.

![Each eye is shown a different, incompatible image, and the brain has to pick one interpretation.](../assets/binocular_rivalry_setup.svg)

Now, if your brain were tracking the _full distribution_ you'd expect to perceive some sensible average of the two. A blurry grey chequerboard.

**That is not what happens**. What people actually report is that perception _flips_. For a few seconds you see only the vertical strips, then (without doing anything) it switches and you see only the horizontal stripes, then back again, continuously. You never see the averaged image. Your brain literally picks a winner, commits to it fully, then changes its mind.

![Perception alternates between one image and the other over time, and never settles on a blended average.](../assets/rivalry_flips_not_blends.svg)

That flipping is the tell. It's exactly what you'd expect from a system that represents the single _most likely_ interpretation rather than the whole probability distribution. When the evidence is genuinely ambiguous, there are two roughly-equally-good "best guesses", and the brain ping-pongs between them. It only ever holds _one at a time_.

</details>

This next bit is the pivot the whole derivation hinges on, so I'm going to lay it out slowly. Here's the logic, lightly paraphrased and then broken down:

> We look for the value $\phi$ which maximises the posterior $p(\phi \mid u)$. By equation (4), that posterior depends on a ratio of two quantities, but the denominator $p(u)$ does not depend on $\phi$. Therefore the value of $\phi$ that maximises the posterior is the same value that maximises the **numerator**. We denote the logarithm of that numerator by $F$ (it's related to negative free energy, as we'll see).

Let me unpack that, because it's doing three separate clever things at once:

- **"We look for a value which maximises..."** - The animal wants it's single best guess for food size. This is the peak of the curve from before. Instead of calculating the whole curve, it just wants to know _where the top is_.

- **"The posterior depends on a ratio, but the denominator doesn't depend on $\phi$."** - Bayes' rule is `prior x likelihood / normaliser`. That normaliser, $p(u)$, is the integral. But **it does not depend on the guess $\phi$.** It's a fixed number once $u$ is observed.

- **"Thus the value which maximises it is the same one which maximises the numerator."** - This is the crux. Dividing everything by the same constant just **rescales** the curve; it doesn't move where the peak _is_. Like that one friend at a party that's a downer. They don't change the location of the party but they bring everybody down. So we can completely ignore that friend, I mean, the hard-to-compute denominator $p(u)$ and just maximise the numerator, keeping the party alive. The location of the maximum is unchanged.

Then one final convenience: we take the **log** of the numerator before maximising. This is safe because log is **monotonic** (a fancy way of saying it never reorders things, so it also doesn't move the peak). Like everyone wearing a hat at the party...something something...worn out party analogy. If $a > b$ then $\ln a > \ln b$, always. Taking logs also turns all our products into sums (via $\ln(ab) = \ln a + \ln b$), which is going to make the calculus nicer in about thirty seconds.

**In summary:** the denominator is fixed scaling that does not affect where the peak is, so we throw it away. We take the log of what's left (products become sums, peak stays put), and we call the result $F$, for Free Energy, and we maximise that.

That gives us equation (6):

$$
F = \ln p(\phi) + \ln p(u \mid \phi) \tag{6}
$$

Two terms: the log-prior and the log-likelihood. That's the whole objective. Now we substitute in the actual Gaussians and grind.

#### Substituting in the Gaussians (a wall of maths, honestly)

<aside>

**Log identities (recall)**

- Product rule: $\ln(ab) = \ln a + \ln b$
- Power rule: $\ln(b^x) = x \ln b$
- Quotient rule: $\ln\!\left(\frac{x}{y}\right) = \ln x - \ln y$

</aside>

The plan: Take equation (6), sub in the prior (3) and the likelihood (1), each of which is the Gaussian density (2), and simplify using log rules until something clean falls out. Bogacz basically says "do this" and then shows a wall of algebra. So here's that wall. Feel free to try it out yourself.

Starting from (6) and substituting the two Gaussian densities:

$$
F = \ln\!\left[\frac{1}{\sqrt{2\pi\Sigma_p}} \exp\!\left(-\frac{(\phi - v_p)^2}{2\Sigma_p}\right)\right] + \ln\!\left[\frac{1}{\sqrt{2\pi\Sigma_u}} \exp\!\left(-\frac{(u - g(\phi))^2}{2\Sigma_u}\right)\right]
$$

Each $\ln$ of a product splits into a log of the front fraction plus a log of the exponential. The log of an exponential is just it's exponent, so the $\exp$ and $\ln$ annihilate and leave the quadratic behind:

$$
F = \ln\!\left(\frac{1}{\sqrt{2\pi\Sigma_p}}\right) - \frac{(\phi - v_p)^2}{2\Sigma_p} \;+\; \ln\!\left(\frac{1}{\sqrt{2\pi\Sigma_u}}\right) - \frac{(u - g(\phi))^2}{2\Sigma_u}
$$

Now look at those two leftover log terms, $\ln\!\left(\frac{1}{\sqrt{2\pi\Sigma_p}}\right)$ and $\ln\!\left(\frac{1}{\sqrt{2\pi\Sigma_u}}\right)$. We're eventually going to **differentiate $F$ with respect to $\phi$**. Neither of those terms contain a $\phi$. So when we differentiate, they vanish.

So Bogacz groups them into a single constant term $C$:

$$
F = \frac{1}{2}\left[-\ln\Sigma_p - \frac{(\phi - v_p)^2}{\Sigma_p} - \ln\Sigma_u - \frac{(u - g(\phi))^2}{\Sigma_u}\right] + C \qquad \textbf{7}
$$

<details>
<summary>

Extra: If you want to see where that $\tfrac12$ and the $-\ln\Sigma$ bits come from

</summary>

$\ln\!\left(\frac{1}{\sqrt{2\pi\Sigma}}\right) = \ln(2\pi\Sigma)^{-1/2} = -\tfrac{1}{2}\ln(2\pi\Sigma) = -\tfrac12\ln(2\pi) - \tfrac12\ln\Sigma$, and the $-\tfrac12\ln(2\pi)$ part is a pure constant that disappears into $C$. The $-\tfrac12\ln\Sigma$ terms stick around in the expression but, since the variances are fixed in our case, they're also constant with respect to $\phi$ The full expanded form with the $\Sigma$-logs get written out properly in the [appendix](#appendix-a--the-full-alegbra) for everyone who wants every step.

</details>

That's our objective function. A log-prior penalty, a log-likelihood penalty, and a constant we'll never think about again. Well done, go grab a drink.

> _Confession_: the first time I did this I tried to expand all the $\ln\!\left(\frac{1}{\sqrt{2\pi\Sigma}}\right)$ terms out fully — splitting them into $-\tfrac{1}{2}\ln(2\pi\Sigma)$, then into $-\tfrac{1}{2}\ln(2\pi) - \tfrac{1}{2}\ln\Sigma$, and so on, dragging every $2\pi$ along for the ride. I filled half a page, wrote "**Wrong, started again**" in big letters, and underlined it. It wasn't actually _wrong_, it was just a waste of effort, because all those $2\pi$ bits are about to get swept into a constant anyway. Learn from my pain: don't expand things you're about to throw away.

#### Differentiating to get the update rule

We've got $F$ as a function of our guess $\phi$. To find the $\phi$ that maximises it, we need the gradient $\frac{\partial F}{\partial \phi}$. The constant $C$ goes away. The two $-\ln\Sigma$ terms also go, since they don't contain a $\phi$ either. That leaves the two quadratics.

Differentiating $-\frac{(\phi - v_p)^2}{2\Sigma_p}$ with respect to $\phi$ gives $-\frac{(\phi - v_p)}{\Sigma_p}$, which flips to $\frac{v_p - \phi}{\Sigma_p}$.

The second term, $-\frac{(u - g(\phi))^2}{2\Sigma_u}$, needs the **chain rule**, because $g(\phi)$ is a function tucked inside another function.

<aside>
When you differentiate a function-of-a-function, you multiply by the derivation of the inner one. 
</aside>

The inner function is $g(\phi)$, so its derivative $g'(\phi)$ gets pulled out front. Working it through gives $\frac{(u - g(\phi))}{\Sigma_u} \cdot g'(\phi)$.

Putting both together:

$$
\frac{\partial F}{\partial \phi} = \frac{v_p - \phi}{\Sigma_p} + \frac{u - g(\phi)}{\Sigma_u}\, g'(\phi) \tag{8}
$$

> Quick note on that $g'(\phi)$ - it matters _enormously_. Remember the animal's sensor model was $g(v) = v^2$. So:
>
> $$
> g(\phi) = \phi^2 \quad\Rightarrow\quad g'(\phi) = 2\phi
> $$
>
> This is the **only place** the specific shape of the sensor enters the update. Swap in a different $g$ and _only_ $g'(\phi)$ changes - everything else in the equation is structural.

#### Gradient ascent: letting the guess move

Equation (8) tells us the slope of $F$ at our current guess. To actually _find_ the peak, we apply **gradient ascent**. Bogacz writes it about as simple as it can be written:

$$
\dot{\phi} = \frac{\partial F}{\partial \phi}
$$

In english this means "let your guess $\phi$ change over time at the rate of the gradient". If $F$ slopes upwards at your current guess, $\dot\phi$ is positive and $\phi$ moves in the upward direction. At the peak, $\frac{\partial F}{\partial\phi} = 0$, so $\dot\phi = 0$, and the guess stops moving. It's settled on the best estimate.

![A ball climbing the free-energy curve via gradient ascent: it moves fast where the slope is steep, slows as the gradient flattens, and comes to rest at the peak where ∂F/∂φ = 0.](../assets/gradient_ascent.gif)

## Appendix A — <!-- e.g. background math / derivation details -->

## Appendix B — Exercise Solutions

## Notation Summary

## References

1. <!-- Bogacz, R. (2017). A tutorial on the free-energy framework... -->
2. $$
