import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Form() {
  const [success, setSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      // Trigger immediate feedback for form submission
      setServerMessage("Form submitted successfully!");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      // Send POST request to the server
      const response = await axios.post("http://localhost:5000/submit", data);
      console.log("Server Response:", response.data);

      // Update state with server's response for resume generation
      setServerMessage(response.data.message);
      setGeneratedResume(response.data.resume); // Set the generated resume
      setSuccess(true); // Re-trigger popup for the generated message if needed
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting data:", error);
      setServerMessage("Error submitting the form. Please try again.");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <Fragment>
      <h1>Fill the form below to generate your resume!!</h1>
      <div className="container py-5">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="shadow-lg p-4 bg-white rounded"
        >
          {/* Personal Information */}
          <h3 className="mb-4">Personal Information</h3>

          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone.message}</div>
            )}
          </div>

          {/* Education Section */}
          <h3 className="mb-4">Education</h3>
          <div className="mb-3">
            <label htmlFor="degree" className="form-label">
              Highest Degree
            </label>
            <input
              type="text"
              id="degree"
              className={`form-control ${errors.degree ? "is-invalid" : ""}`}
              {...register("degree", { required: "Degree is required" })}
            />
            {errors.degree && (
              <div className="invalid-feedback">{errors.degree.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="institution" className="form-label">
              Institution
            </label>
            <input
              type="text"
              id="institution"
              className={`form-control ${
                errors.institution ? "is-invalid" : ""
              }`}
              {...register("institution", {
                required: "Institution name is required",
              })}
            />
            {errors.institution && (
              <div className="invalid-feedback">
                {errors.institution.message}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="graduationYear" className="form-label">
              Year of Graduation
            </label>
            <input
              type="number"
              id="graduationYear"
              className={`form-control ${
                errors.graduationYear ? "is-invalid" : ""
              }`}
              {...register("graduationYear", {
                required: "Graduation year is required",
                min: { value: 1900, message: "Enter a valid year" },
                max: {
                  value: new Date().getFullYear(),
                  message: "Year can't be in the future",
                },
              })}
            />
            {errors.graduationYear && (
              <div className="invalid-feedback">
                {errors.graduationYear.message}
              </div>
            )}
          </div>

          {/* Work Experience Section */}
          <h3 className="mb-4">Work Experience</h3>
          <div className="mb-3">
            <label htmlFor="company" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              className={`form-control ${errors.company ? "is-invalid" : ""}`}
              {...register("company", { required: "Company name is required" })}
            />
            {errors.company && (
              <div className="invalid-feedback">{errors.company.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="jobTitle" className="form-label">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              className={`form-control ${errors.jobTitle ? "is-invalid" : ""}`}
              {...register("jobTitle", { required: "Job title is required" })}
            />
            {errors.jobTitle && (
              <div className="invalid-feedback">{errors.jobTitle.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="jobDuration" className="form-label">
              Duration (e.g., Jan 2020 - Dec 2022)
            </label>
            <input
              type="text"
              id="jobDuration"
              className={`form-control ${
                errors.jobDuration ? "is-invalid" : ""
              }`}
              {...register("jobDuration", { required: "Duration is required" })}
            />
            {errors.jobDuration && (
              <div className="invalid-feedback">
                {errors.jobDuration.message}
              </div>
            )}
          </div>

          {/* Skills Section */}
          <h3 className="mb-4">Skills</h3>
          <div className="mb-3">
            <label htmlFor="skills" className="form-label">
              List Your Skills (comma-separated)
            </label>
            <textarea
              id="skills"
              className={`form-control ${errors.skills ? "is-invalid" : ""}`}
              rows="4"
              {...register("skills", { required: "Skills are required" })}
            ></textarea>
            {errors.skills && (
              <div className="invalid-feedback">{errors.skills.message}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>

        {success && (
          <div className="popup alert alert-success mt-3" role="alert">
            {serverMessage}
          </div>
        )}

        {/* Render the generated resume */}
        {generatedResume && (
          <div className="mt-4">
            <h4>Generated Resume</h4>
            <pre className="bg-light p-3">{generatedResume}</pre>
          </div>
        )}

        {generatedResume && (
          <div className="mt-4">
            <h4>Generated Resume</h4>
            <pre className="bg-light p-3">{generatedResume}</pre>
            <button
              className="btn btn-success mt-2"
              onClick={() => {
                const blob = new Blob([generatedResume], {
                  type: "text/plain",
                });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "resume.txt";
                link.click();
              }}
            >
              Download Resume
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Form;
