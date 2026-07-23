import JobCard from "@/features/careers/components/JobCard";

export default function JobList({ jobs }) {
  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
}
