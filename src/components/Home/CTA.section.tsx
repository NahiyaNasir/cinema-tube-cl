import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"; 

export default function CinemaCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-20 px-6 rounded-3xl mx-4 my-12">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Your Front Row Seat <br /> <span className="text-primary">Is Waiting.</span>
        </motion.h2>
        
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Stream the latest blockbusters or rent your favorite classics. 
          Start your cinematic journey today with instant access.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105">
            Get Started Now
          </Button>
          <Button variant="outline" size="lg" className="border-gray-700 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
            Browse Library
          </Button>
        </div>
      </div>
    </section>
  );
}