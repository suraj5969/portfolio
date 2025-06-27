import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/data";
const InfoCard = () => {
  return (
    <div className={`transition-all duration-300 text-slate-50`}>
      <div className="sidebar bg-surface border border-border rounded-md shadow p-6 lg:p-8 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Avatar */}
          <div className="avatar-box text-center mb-6">
            <div className="w-36 h-36 mx-auto rounded">
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
            <h1 className="text-3xl font-medium  mb-4 capitalize">
              {personalInfo.name}
            </h1>
            <p className="bg-stone-700/50 text-xs font-medium uppercase tracking-wide py-2 px-6 shadow-xl rounded-xl inline-block">
              {personalInfo.title}
            </p>
          </div>

          {/* Separator */}
          <div className="separator bg-accent w-[32px] h-[1px] mx-auto mb-[30px]"></div>

          {/* Contact Info */}
          <div className="space-y-[20px] mb-[30px]">
            <div className="info-item flex items-center gap-[16px]">
              <div className="icon-box relative bg-border w-[48px] h-[48px] rounded-[12px] flex justify-center items-center text-accent shadow-[var(--shadow-1)] z-[1] before:content-[''] before:absolute before:inset-[1px] before:bg-card-bg before:rounded-[inherit] before:z-[-1]">
                <Mail size={16} />
              </div>
              <div className="info-content">
                <p className="title text-white-alpha-50 text-[11px] uppercase mb-[2px]">Email</p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="info-text text-white text-[13px] hover:text-accent transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="info-item flex items-center gap-[16px]">
              <div className="icon-box relative bg-border w-[48px] h-[48px] rounded-[12px] flex justify-center items-center text-accent shadow-[var(--shadow-1)] z-[1] before:content-[''] before:absolute before:inset-[1px] before:bg-card-bg before:rounded-[inherit] before:z-[-1]">
                <Phone size={16} />
              </div>
              <div className="info-content">
                <p className="title text-white-alpha-50 text-[11px] uppercase mb-[2px]">Phone</p>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="info-text text-white text-[13px] hover:text-accent transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            <div className="info-item flex items-center gap-[16px]">
              <div className="icon-box relative bg-border w-[48px] h-[48px] rounded-[12px] flex justify-center items-center text-accent shadow-[var(--shadow-1)] z-[1] before:content-[''] before:absolute before:inset-[1px] before:bg-card-bg before:rounded-[inherit] before:z-[-1]">
                <MapPin size={16} />
              </div>
              <div className="info-content">
                <p className="title text-white-alpha-50 text-[11px] uppercase mb-[2px]">Location</p>
                <address className="info-text text-white text-[13px] not-italic">{personalInfo.location}</address>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="separator bg-accent w-[32px] h-[1px] mx-auto mb-[30px]"></div>

          {/* Social Links */}
          <div className="flex justify-center gap-[15px] mb-[30px]">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] bg-border rounded-[8px] flex items-center justify-center text-light-gray hover:text-accent hover:bg-accent hover:bg-opacity-10 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <span className="sr-only">{link.name}</span>
                <div className="w-[16px] h-[16px] bg-current rounded"></div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InfoCard;
