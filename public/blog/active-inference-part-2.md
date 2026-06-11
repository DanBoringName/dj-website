# Active Inference, Part 2: From Survival Equations to the Living Brain

This post continues my work with Durham University on Active Inference. [Part 1](/blog/active-inference) gave the brain's-eye view: the brain as a prediction engine, prediction error, precision, and a handful of clinical examples. But it took one thing on faith—it simply assumed brains go around minimising surprise. Part 2 is where that assumption gets paid off. The slide deck embedded below is a guided tour of Da Costa, Parr, Sajid, Veselic, Neacsu & Friston (2020), "Active inference on discrete state-spaces: a synthesis", and it is the best place to explore the full visuals and examples.

The question this time is the harder one: *why* must anything minimise surprise at all? The answer comes from physics and the mathematics of staying alive—and once you look closely, the line between a living organism and a statistical equation starts to dissolve.

## Why Model the World at All?

Life is a localised rebellion against physics. The second law of thermodynamics says everything tends toward disorder—drop ink into water and it spreads until you cannot tell ink from water. That evened-out state is equilibrium, and for a living thing, blending into your environment like that has a simpler name: death.

To stay alive, a system has to refuse to dissipate, holding its temperature, pH, and structure inside a narrow range. The deck frames this as a **non-equilibrium steady state (NESS)**: a pattern that stays the same on the outside while constantly working on the inside, like a whirlpool that keeps its shape only because water keeps rushing through it. Because survival *is* a NESS, the physics of "not dissipating" becomes the foundation everything else is built on. Biology becomes a special case of statistics.

## The Markov Blanket

If a thing is sealed off from the world, how does it know what is out there? Any system that resists its environment needs a formal boundary, described by four kinds of state:

- **External**: the world you cannot touch.
- **Sensory**: what comes in (receptors).
- **Internal**: the protected machinery.
- **Active**: what goes out (movement).

The **Markov blanket** is the sensory and active states together—the only two channels across the boundary. The rule that does all the work: internal states never touch external states directly, only ever meeting through the blanket. The deck illustrates this by going from a bacterium to a submarine, two very different things with the exact same four-box structure.

This raises a wall: if the inside is completely cut off from the outside, how does it ever come to "know" what is out there? The resolution is that the inside is *forced* to mirror the outside. Like two pendulum clocks on the same wall syncing through tiny vibrations, an organism's internal states become a model of the world purely as a consequence of not dying. It models the world not because it is smart, but because anything that didn't was destroyed.

## Perception: Aligning to the Past

Perception is updating yourself so the world stops surprising you. First the deck pins down one word: **surprise** is not the feeling, it is a number—how improbable an observation is given your model of the world. High surprise is exactly the kind of state that gets you killed.

The catch is that surprise cannot be computed directly; doing so honestly would mean summing over every possible cause, action, and parameter—an intractable integral. The fix is **free energy**, which is built only from what the system already has (its current beliefs and latest sensory data) and is provably never smaller than the true surprise. Push that ceiling down and the surprise underneath has nowhere to go but down too.

The elegant part is that the system never reads off a number. It simply adjusts its beliefs in the direction that lowers free energy, and that adjustment *is* perception. This is exactly Part 1's "update the model to reduce prediction error"—now derived rather than assumed.

## Action: Bending the Future

If perception makes the model fit the world, action makes the world fit the model. The whole loop is two directions:

- **Perception** minimises *variational* free energy: change the model to match the world.
- **Action** minimises *expected* free energy: change the world to match the model.

Action has a direction because the model is biased toward survival—the organism expects hospitable states and acts to bring them about. The deck calls this **self-evidencing**: each organism is a living hypothesis ("a thing like me exists here"), and the action–perception loop is the endless gathering of evidence for it.

Expected free energy splits cleanly into two parts: an **epistemic** term (explore—reduce uncertainty) and a **pragmatic** term (exploit—reach your goals). Minimise the parent and the balance is automatic. Strip out a source of uncertainty and the same quantity collapses into a famous existing theory—Bayesian decision theory, reinforcement learning, KL control, infomax, the maximum-entropy principle. They were special cases all along.

## From Math to Meat

How does a wet, squishy brain run any of this with no CPU? The deck's closing move lines up the algorithm and the biology and shows they are the same operation: a belief is a neuron's firing rate, nudging beliefs downhill is membrane voltages relaxing, the likelihood matrix is synaptic strength, learning is plasticity, and confidence in a policy is a dopamine signal. The deep reason they match is that free-energy minimisation *is* message-passing—one set of equations describing both the algorithm and the wiring.

## Summary

The line never really existed. A living organism and a statistical equation are two descriptions of the same thing: a pattern that survives by predicting its world well enough not to dissolve back into it. Part 1 showed *that* the brain predicts; Part 2 traces *why* it must, following one thread from the second law of thermodynamics, through the Markov blanket, to the firing of real neurons.

> Want the full narrative? Browse the embedded slide deck below and follow the controls to step through each slide.
