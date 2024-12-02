const JobListing = ({ title, type, description, company }) => {
  return (
    <div className="job-preview">
      <h2>{title}</h2>
      <div>Type: {type}</div>
      <div>Description: {description}</div>
      <div>Company: {company.name}</div>
    </div>
  );
};

export default JobListing;
