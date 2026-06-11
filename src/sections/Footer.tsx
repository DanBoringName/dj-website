// Public contact address — intentionally empty until the dedicated
// contact email exists; the mailto link renders as soon as this is set.
const CONTACT_EMAIL: string = "";

const Footer = () => {
  return (
    <footer className="c-space mt-20 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-400">
        <p>Dan Elliott — software engineer writing about Active Inference.</p>
        {CONTACT_EMAIL ? (
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-300 hover:text-blue-200 transition-colors">
            {CONTACT_EMAIL}
          </a>
        ) : (
          <p className="text-neutral-500">Contact details coming soon.</p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
