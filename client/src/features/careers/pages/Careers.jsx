import { useEffect, useState } from "react";
import { getJobs } from "@/features/careers/services/jobsService";
import JobList from "@/features/careers/components/JobList";

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

  if (loading) {
    return <h2>Loading jobs...</h2>;
  }

  return (
    <div>
      <h1>Careers</h1>

      <JobList jobs={jobs} />
    </div>
  );
}
