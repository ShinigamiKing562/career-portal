import { motion } from "framer-motion";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";

import heroBg from "@/assets/hero.svg";

export default function Hero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-slate-50">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="
            h-full
            w-full
            object-contain object-right
            object-right
            pointer-events-none
            select-none
          "
        />
        </div>

      <Container className="relative z-10 flex min-h-[720px] items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            We're Hiring
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-7xl">
            Build the Future of Financial Technology
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-600">
            Join passionate engineers, designers and innovators building secure
            financial solutions that empower businesses throughout Africa.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">
            <Button>View Open Positions</Button>

            <Button variant="secondary">Life at Company</Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
