export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>

      <p>
        <strong>Department:</strong> {job.department}
      </p>

      <p>
        <strong>Location:</strong> {job.location}
      </p>

      <p>
        <strong>Employment:</strong> {job.employment_type}
      </p>

      <button>View Details</button>
    </div>
  );
}
