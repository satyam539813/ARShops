import {
    FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, FaTwitter, FaDiscord
} from "react-icons/fa";
import { FiMapPin, FiClock, FiStar } from "react-icons/fi";
import ContactCard from "./ContactCard";
import { motion } from "framer-motion";

export default function Contact() {
    const contacts = [
        {
            icon: FaEnvelope,
            title: "Email",
            desc: "Professional inquiries and collaboration",
            subtext: "satyam@example.com",
            href: "mailto:satyam@example.com",
            badge: "Primary",
            gradient: "from-red-500 to-pink-600",
            isActive: true,
            responseTime: "~2 hours",
        },
        {
            icon: FaPhoneAlt,
            title: "Phone",
            desc: "Direct line for urgent matters",
            subtext: "+91 9876543210",
            href: "tel:+919876543210",
            badge: "Urgent",
            gradient: "from-green-500 to-emerald-600",
            responseTime: "Available 9AM-6PM IST",
        },
        {
            icon: FaLinkedin,
            title: "LinkedIn",
            desc: "Professional network & career updates",
            subtext: "Connect and follow my journey",
            href: "https://linkedin.com/in/satyam",
            badge: "Professional",
            gradient: "from-blue-600 to-blue-700",
            isActive: true,
            responseTime: "~1 day",
        },
        {
            icon: FaGithub,
            title: "GitHub",
            desc: "Open source projects & contributions",
            subtext: "Explore my code repositories",
            href: "https://github.com/satyam",
            badge: "Code",
            gradient: "from-gray-700 to-gray-900",
            responseTime: "Always active",
        },
        {
            icon: FaTwitter,
            title: "Twitter",
            desc: "Tech thoughts and quick updates",
            subtext: "Follow for daily insights",
            href: "https://twitter.com/satyam",
            badge: "Social",
            gradient: "from-sky-400 to-blue-500",
            responseTime: "~30 mins",
        },
        {
            icon: FaDiscord,
            title: "Discord",
            desc: "Real-time chat and community",
            subtext: "Join tech discussions",
            href: "https://discord.gg/satyam",
            badge: "Chat",
            gradient: "from-indigo-500 to-purple-600",
            isActive: true,
            responseTime: "Online now",
        },
    ];

    const stats = [
        { icon: FiMapPin, label: "Based in", value: "Ghaziabad, India" },
        { icon: FiClock, label: "Timezone", value: "UTC +5:30" },
        { icon: FiStar, label: "Response Rate", value: "98%" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-black py-24 px-6 overflow-hidden">
            {/* Floating gradient blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-28 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.5, 0.25] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-24 right-16 w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
          <span className="px-5 py-2 bg-indigo-500/10 text-indigo-300 text-sm font-medium rounded-full border border-indigo-500/20 shadow-sm">
            Let’s Connect
          </span>
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mt-6 mb-6">
                        Get in{" "}
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Touch
            </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        I love collaborating on exciting projects. Choose the way you’d like to connect, and let’s make something amazing together.
                    </p>

                    {/* Stats */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-8 mt-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 shadow-sm"
                                whileHover={{ scale: 1.05 }}
                            >
                                <stat.icon className="text-indigo-400 text-lg" />
                                <div>
                                    <div className="text-gray-400 text-xs">{stat.label}</div>
                                    <div className="text-white text-sm font-medium">{stat.value}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Contact Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {contacts.map((contact, i) => (
                        <motion.div key={i} variants={itemVariants}>
                            <ContactCard {...contact} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call-to-action box */}
                <motion.div
                    className="relative text-center max-w-2xl mx-auto bg-gradient-to-r from-indigo-500/10 to-purple-500/10
                     border border-white/10 rounded-2xl p-10 backdrop-blur-md shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Prefer a Quick Message?
                    </h3>
                    <p className="text-gray-300 mb-6">
                        Drop me a direct email and I’ll respond as soon as I can.
                    </p>
                    <motion.a
                        href="mailto:satyam@example.com?subject=Hello%20from%20your%20portfolio"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold
                       bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl
                       transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaEnvelope />
                        Send a Message
                    </motion.a>
                </motion.div>

                {/* Availability Badge */}
                <motion.div
                    className="fixed bottom-6 right-6 bg-green-500/20 backdrop-blur-lg border border-green-500/30
                     rounded-full px-4 py-2 flex items-center gap-2 shadow-md"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                >
                    <motion.div
                        className="w-3 h-3 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <span className="text-green-300 text-sm font-medium">Available for Work</span>
                </motion.div>
            </div>
        </section>
    );
}
