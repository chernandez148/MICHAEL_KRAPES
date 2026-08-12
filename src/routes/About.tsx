import ContactForm from "../components/ui/forms/ContactForm";
import Header from "../components/ui/Header";
import ArtistAbout from "../sections/About/ArtistAbout";
import Bio from "../sections/About/Bio";
import Education from "../sections/About/Education";

function About() {
  return (
    <main className="About relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-28 flex flex-col gap-20 md:gap-32">
      {/* ── MAIN BIOGRAPHY CONTAINER ── */}
      <Header breadcrumbs="05 / BIOGRAPHY" title="MEET MICHAEL KRAPES" />
      <Bio />
      <Education />
      <ContactForm />
    </main>
  );
}

export default About;
