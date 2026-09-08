import { publications } from "../constants";

const ExternalLink = ({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) => (
  <a
    className={`flex items-center gap-2 transition-colors ${
      primary ? "text-white hover:text-[#afb0b6]" : "text-neutral-400 hover:text-white"
    }`}
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    <p>{label}</p>
    <img src="/assets/arrow-up.png" className="w-3 h-3" alt="" aria-hidden="true" />
  </a>
);

const Publications = () => {
  return (
    <section className="c-space my-20" id="publications">
      <p className="head-text">Publications</p>
      <div className="flex flex-col gap-5 mt-12 w-full">
        {publications.map((paper) => (
          <article
            key={paper.arxivId}
            className="flex flex-col gap-4 rounded-2xl border border-neutral-700 bg-neutral-900/60 p-6 sm:p-8 font-sans"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                {paper.venue} · {paper.year}
              </p>
              <h3 className="text-white text-2xl font-semibold mt-2">{paper.title}</h3>
            </div>
            <p className="text-[#afb0b6]">{paper.summary}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <ExternalLink href={`https://arxiv.org/abs/${paper.arxivId}`} label="Read on arXiv" primary />
              <ExternalLink href={`https://arxiv.org/pdf/${paper.arxivId}`} label="PDF" />
              <ExternalLink href={`https://doi.org/${paper.doi}`} label={`doi:${paper.doi}`} />
              {paper.related && <ExternalLink href={paper.related.href} label={paper.related.label} />}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Publications;
