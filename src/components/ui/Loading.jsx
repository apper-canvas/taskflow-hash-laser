import { motion } from "framer-motion";

const Loading = ({ type = "list" }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (type === "list") {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-white rounded-lg p-4 shadow-sm border border-neutral-200"
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-neutral-200 rounded shimmer"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-neutral-200 rounded shimmer flex-1"></div>
                  <div className="w-16 h-6 bg-neutral-200 rounded-full shimmer"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-3 bg-neutral-200 rounded shimmer"></div>
                  <div className="w-24 h-3 bg-neutral-200 rounded shimmer"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (type === "card") {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-white rounded-lg p-4 shadow-sm border border-neutral-200"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-neutral-200 rounded-full shimmer"></div>
                <div className="h-5 bg-neutral-200 rounded shimmer flex-1"></div>
              </div>
              <div className="h-3 bg-neutral-200 rounded shimmer w-3/4"></div>
              <div className="h-3 bg-neutral-200 rounded shimmer w-1/2"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-32"
    >
      <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </motion.div>
  );
};

export default Loading;