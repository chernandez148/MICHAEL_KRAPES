import ContactForm from "../components/ui/forms/ContactForm";
import Header from "../components/ui/Header";
import Bio from "../sections/About/Bio";
import Education from "../sections/About/Education";

function About() {
  return (
    <>
      {/* ── MAIN BIOGRAPHY CONTAINER ── */}
      <Header breadcrumbs="05 / BIOGRAPHY" title="MEET MICHAEL KRAPES" />
      <Bio />
      <Education />
      <ContactForm />
    </>

  );
}

export default About;
