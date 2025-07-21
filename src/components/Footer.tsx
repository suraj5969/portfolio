import { personalInfo } from "@/lib/data";

const Footer = () => {
  // const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-slate-900 text-white py-12">
      <div className="container">


        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300">
            Made By <span className="gradient-text"> {personalInfo.name}</span> with help of{" "}
            <a href="https://claude.ai/" className="text-primary underline" target="_blank">
              Claude
            </a>{" "}
            and{"  "}
            <a
              href="https://github.com/codewithsadee/vcard-personal-portfolio"
              className="text-primary underline"
              target="_blank"
            >
              Vcard
            </a>
          </p>

          <p className="text-slate-300 mt-4 md:mt-0">No rights reserved. Copy It</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
