import { useEffect, useState } from "react";

import Layout from "@/layouts/layouts.jsx";

import Hero from "@/features/careers/components/Hero";
import JobList from "@/features/careers/components/JobList";
import { getJobs } from "@/features/careers/services/jobsService";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  return (
    <Layout>
      <Hero />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-4xl font-bold">Open Positions</h2>

          {loading ? <p>Loading jobs...</p> : <JobList jobs={jobs} />}
        </div>
      </section>
    </Layout>
  );
}
