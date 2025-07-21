import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/data";
const InfoCard = () => {
  return (
    <div className={`transition-all duration-300 text-slate-50`}>
      <div className="sidebar bg-surface border border-border rounded-2xl shadow p-6 lg:p-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Avatar */}
          <div className="avatar-box text-center mb-4">
            <div className="w-28 h-28 mx-auto rounded">
              <div className="w-full h-full bg-neutral-700 rounded-3xl flex items-center shadow justify-center">
                <img
                  src={"/my-avatar.png"}
                  alt={`${personalInfo.name}'s Avatar`}
                  className="w-full h-full object-cover scale-110 rounded"
                />
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-medium mb-2 capitalize">{personalInfo.name}</h1>
            <p className="bg-stone-700/50 text-[.65rem] font-medium uppercase tracking-wide py-2 px-4 shadow-xl rounded-full inline-block">
              {personalInfo.title}
            </p>
          </div>

          {/* Separator */}
          <div className="separator bg-accent w-12 h-[1px] mx-auto mb-7"></div>

          {/* Contact Info */}
          <div className="flex flex-col items-center">
            <div className=" space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="icon-box relative bg-border w-7 h-7 rounded-md flex justify-center items-center text-accent shadow-[var(--shadow-1)] z-[1]">
                  <Mail size={15} />
                </div>
                {/* <p className="title text-muted-foreground text-[.7rem] uppercase]">Email</p> */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="info-text text-white text-sm hover:text-accent transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="icon-box relative bg-border w-7 h-7 rounded-md flex justify-center items-center text-accent shadow-[var(--shadow-1)] z-[1]">
                  <Phone size={15} />
                </div>
                {/* <p className="title text-white-alpha-50 text-[11px] uppercase mb-[2px]">Phone</p> */}
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="info-text text-white text-[13px] hover:text-accent transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="icon-box relative bg-border w-7 h-7 rounded-md flex justify-center items-center text-accent shadow-[var(--shadow-1)] z-[1]">
                  <MapPin size={15} />
                </div>
                {/* <p className="title text-white-alpha-50 text-[11px] uppercase mb-[2px]">Location</p> */}
                <address className="info-text text-white text-[13px] not-italic">{personalInfo.location}</address>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="separator bg-accent w-12 h-[1px] mx-auto mb-7"></div>

          {/* Social Links */}
          <div className="flex justify-center gap-3 mb-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-border rounded-full flex items-center justify-center text-light-gray hover:text-accent hover:bg-opacity-10 transition-all duration-300 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <span className="sr-only">{link.name}</span>
                <link.icon className="w-[14px] h-[14px]" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InfoCard;
