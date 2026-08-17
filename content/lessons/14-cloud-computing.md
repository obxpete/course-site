# Cloud Computing: Renting the Internet's Infrastructure

*Foundations · About 45 minutes*

<div class="lesson-audio">
  <audio controls preload="metadata" src="../../audio/14.mp3">
    Your browser does not support the audio element.
  </audio>
  <span class="lesson-audio__label">Lesson overview · ~75 sec</span>
</div>

## Where we're headed

Almost nothing you build in this course will run on a computer you own. It'll run on someone else's server, rented by the hour or the request, somewhere you'll probably never see. This lesson slows down on that idea — what "the cloud" actually is, the layers of service it comes in, and the tradeoffs every team makes when they choose to rent instead of own.

## Concepts & Terminology

**Cloud computing** means running software and storing data on someone else's servers, accessed over the internet, rather than on hardware you own and maintain. It's less about *where* the computing physically happens — it still happens on a physical machine, in a physical building, somewhere — and more about *how* you pay for and access it: on demand, elastically, and only for what you use, instead of buying and maintaining your own equipment.

**On-premises** ("on-prem") is the alternative: an organization owns and operates its own servers, in its own building or a rented rack in a data center. Before cloud computing was mainstream, this was the *only* option — every company, from a five-person startup to a bank, ran its own hardware.

Owning your own servers comes with overhead most organizations would rather not manage directly:

- **Capital cost** — servers are expensive, and you pay for peak capacity even when you're not using it.
- **Physical security & facilities** — power, cooling, fire suppression, and a locked room to put it all in.
- **Staffing** — someone has to rack the hardware, replace failed drives, and patch operating systems at 2 a.m.
- **Scaling lag** — if traffic triples overnight, on-prem hardware doesn't just appear; you wait weeks for a new server to arrive and get installed.

Cloud providers absorb all of that and resell computing capacity as a metered service — the same underlying idea as an electric utility. You don't own a power plant to run a lamp; you pay for the electricity you use, and someone else handles generation, transmission, and failures.

## The Service Layers: IaaS, PaaS, SaaS

Cloud services aren't one-size-fits-all — they're usually described as three layers, each handing you more finished infrastructure in exchange for less control.

<figure class="lesson-figure" role="img" aria-label="Diagram comparing what you manage versus what the provider manages across on-premises, IaaS, PaaS, and SaaS">
  <svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">WHO MANAGES EACH LAYER</text>
    <text x="0" y="55" font-size="12" fill="var(--ink-soft)">Application</text>
    <text x="0" y="85" font-size="12" fill="var(--ink-soft)">Data</text>
    <text x="0" y="115" font-size="12" fill="var(--ink-soft)">Runtime</text>
    <text x="0" y="145" font-size="12" fill="var(--ink-soft)">Middleware</text>
    <text x="0" y="175" font-size="12" fill="var(--ink-soft)">Operating System</text>
    <text x="0" y="205" font-size="12" fill="var(--ink-soft)">Virtualization</text>
    <text x="0" y="235" font-size="12" fill="var(--ink-soft)">Servers &amp; Storage</text>
    <text x="0" y="265" font-size="12" fill="var(--ink-soft)">Networking</text>
    <g font-size="12" font-family="var(--font-mono)" text-anchor="middle" fill="var(--ink)">
      <text x="210" y="30">On-Prem</text>
      <text x="335" y="30">IaaS</text>
      <text x="455" y="30">PaaS</text>
      <text x="575" y="30">SaaS</text>
    </g>
    <g>
      <rect x="150" y="42" width="120" height="228" fill="var(--accent-berry-soft)" rx="4"/>
    </g>
    <rect x="280" y="42" width="120" height="132" fill="var(--accent-berry-soft)" rx="4"/>
    <rect x="280" y="174" width="120" height="96" fill="var(--accent-sage-soft)" rx="4"/>
    <rect x="400" y="42" width="120" height="72" fill="var(--accent-berry-soft)" rx="4"/>
    <rect x="400" y="114" width="120" height="156" fill="var(--accent-sage-soft)" rx="4"/>
    <rect x="520" y="42" width="120" height="228" fill="var(--accent-sage-soft)" rx="4"/>
    <g stroke="var(--paper)" stroke-width="2">
      <line x1="150" y1="72" x2="640" y2="72"/>
      <line x1="150" y1="102" x2="640" y2="102"/>
      <line x1="150" y1="132" x2="640" y2="132"/>
      <line x1="150" y1="162" x2="640" y2="162"/>
      <line x1="150" y1="192" x2="640" y2="192"/>
      <line x1="150" y1="222" x2="640" y2="222"/>
      <line x1="150" y1="252" x2="640" y2="252"/>
    </g>
    <g font-size="11" fill="var(--ink-soft)">
      <rect x="150" y="284" width="14" height="14" fill="var(--accent-berry-soft)" rx="3"/>
      <text x="170" y="295">You manage</text>
      <rect x="280" y="284" width="14" height="14" fill="var(--accent-sage-soft)" rx="3"/>
      <text x="300" y="295">Provider manages</text>
    </g>
  </svg>
  <figcaption>As you move from on-prem toward SaaS, the provider absorbs more of the stack — and you give up a proportional amount of control.</figcaption>
</figure>

**Infrastructure as a Service (IaaS)** rents you raw computing building blocks — virtual servers, storage, and networking — and leaves everything installed on top of them up to you. You still install and patch the operating system, the runtime, and the application. It's the closest cloud equivalent to on-prem hardware, just rented instead of owned. *Examples: Amazon EC2, DigitalOcean Droplets.*

**Platform as a Service (PaaS)** goes a layer higher: the provider manages the operating system and runtime, and you just deploy your application code. No servers to patch, no runtime to install — you push code, and it runs. *Examples: Heroku, Google App Engine, Vercel.*

**Software as a Service (SaaS)** is the top layer: a complete, ready-to-use application delivered over the internet, with the provider managing everything underneath — infrastructure, code, and data. You don't deploy anything; you just use it. *Examples: Gmail, Slack, Salesforce.*

A useful shortcut: **IaaS rents you a plot of land, PaaS rents you a furnished apartment, and SaaS rents you a hotel room.** Each one trades control for convenience.

## Deployment Models: Public, Private & Hybrid

Beyond service layers, cloud infrastructure also varies in *who it's shared with*:

- **Public cloud** — infrastructure owned by a third-party provider (AWS, Azure, Google Cloud) and shared across many customers, isolated from each other by software. This is the default for most new projects, including everything in this course.
- **Private cloud** — cloud-style infrastructure (self-service, elastic, virtualized) dedicated to a single organization, often for compliance or security reasons — common in banking, healthcare, and government.
- **Hybrid cloud** — a mix of both, where some workloads run on-prem or in a private cloud and others run in the public cloud, connected together. Common when an organization is migrating gradually, or needs to keep specific data on infrastructure it fully controls.

## Elasticity & the Cost Model

The feature that makes cloud computing different from just "renting a server" is **elasticity** — the ability to scale capacity up or down automatically, in response to real demand, without a human provisioning new hardware.

<figure class="lesson-figure" role="img" aria-label="Line chart comparing fixed on-premises capacity against elastic cloud capacity that follows a spiky traffic demand curve">
  <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-body);">
    <text x="0" y="16" font-size="11" fill="var(--ink-faint)" font-family="var(--font-mono)">CAPACITY vs. DEMAND OVER A WEEK</text>
    <line x1="40" y1="180" x2="620" y2="180" stroke="var(--line)" stroke-width="1.5"/>
    <line x1="40" y1="30" x2="40" y2="180" stroke="var(--line)" stroke-width="1.5"/>
    <text x="10" y="35" font-size="10" fill="var(--ink-faint)">high</text>
    <text x="10" y="180" font-size="10" fill="var(--ink-faint)">low</text>
    <line x1="40" y1="45" x2="620" y2="45" stroke="var(--accent-berry)" stroke-width="2" stroke-dasharray="5 4"/>
    <text x="460" y="40" font-size="11" fill="var(--accent-berry)">fixed on-prem capacity (provisioned for peak)</text>
    <path d="M40,150 C80,145 100,150 130,140 C160,130 175,60 200,55 C225,50 245,140 270,145 C300,150 330,148 360,150 C390,152 410,70 440,50 C465,35 485,140 510,148 C540,155 560,150 585,152 L620,152" fill="none" stroke="var(--accent-sage)" stroke-width="2.5"/>
    <text x="205" y="45" font-size="11" fill="var(--accent-sage)">actual demand</text>
    <text x="40" y="200" font-size="11" fill="var(--ink-faint)">Mon</text>
    <text x="130" y="200" font-size="11" fill="var(--ink-faint)">Tue</text>
    <text x="220" y="200" font-size="11" fill="var(--ink-faint)">Wed</text>
    <text x="310" y="200" font-size="11" fill="var(--ink-faint)">Thu</text>
    <text x="400" y="200" font-size="11" fill="var(--ink-faint)">Fri</text>
    <text x="490" y="200" font-size="11" fill="var(--ink-faint)">Sat</text>
    <text x="580" y="200" font-size="11" fill="var(--ink-faint)">Sun</text>
  </svg>
  <figcaption>On-prem capacity has to be provisioned for the worst day (a product launch, a Black Friday spike) and sits mostly idle the rest of the time. Elastic cloud capacity tracks actual demand instead.</figcaption>
</figure>

This changes the underlying cost model:

- **On-prem** is largely **CapEx (capital expenditure)** — a large upfront purchase, depreciated over years, sized for your *worst* day.
- **Cloud** is largely **OpEx (operating expenditure)** — a recurring, usage-based bill, sized for your *actual* traffic, that a team can adjust in real time.

This is also why a badly designed system can produce a shockingly large cloud bill: elasticity cuts both ways. A traffic spike, a bug causing an infinite loop of API calls, or a forgotten test server left running can scale costs up automatically, with no human noticing until the invoice arrives. "Pay only for what you use" is a benefit and a risk in the same sentence.

## The Major Providers

Three providers dominate the public cloud market: **Amazon Web Services (AWS)**, **Microsoft Azure**, and **Google Cloud Platform (GCP)**. They compete on the same basic layers described above — compute, storage, databases, networking — but with different pricing, tooling, and strengths (AWS's breadth, Azure's enterprise/Microsoft ecosystem integration, GCP's data and machine learning tooling). For projects in this course, the specific provider matters far less than the concepts: once you understand IaaS/PaaS/SaaS and elastic pricing on one provider, the same mental model transfers directly to the others.

Smaller, developer-focused platforms — Vercel, Netlify, Render, Railway — sit on top of these providers and repackage them as a much simpler PaaS experience aimed specifically at web developers. They're often the fastest path from `git push` to a live URL, which is why the deployment lesson later in the course uses them as the default recommendation.

## Soft Skills

Cost and infrastructure decisions aren't purely technical — they're business decisions a developer is often the first to flag:

- Treat cloud spend like any other budget line. "It's easy to add more capacity" doesn't mean it's free — flag unexpectedly high usage the same way you'd flag a bug.
- When a client or manager asks "should we host this ourselves or use the cloud?", the honest answer is almost always "it depends on your traffic pattern and your team's ops capacity" — resist the urge to give a one-size-fits-all answer.
- Vendor lock-in is a real tradeoff, not just a buzzword: the more provider-specific services you build on top of, the harder (and more expensive) it is to switch providers later. That's a conversation worth having early, not after the fact.

## Try It

Sort each scenario below into IaaS, PaaS, or SaaS based on how much of the stack the provider is managing versus how much you'd be responsible for yourself.

## Recap

- Cloud computing means renting computing capacity on demand instead of owning and maintaining your own hardware.
- IaaS, PaaS, and SaaS each hand you a different amount of the stack already managed — more convenience, less control, as you move up.
- Public, private, and hybrid cloud describe *who* the infrastructure is shared with, independent of which service layer you're using.
- Elasticity — scaling automatically with real demand — is what separates cloud computing from simply renting a fixed server, and it changes the cost model from CapEx to OpEx.
- The specific provider (AWS, Azure, GCP) matters less than understanding the concepts, which transfer across all of them.
