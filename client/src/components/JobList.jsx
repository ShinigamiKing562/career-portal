import JobCard from "./jobCard";

export default function JobList({ jobs }) {
  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
}
