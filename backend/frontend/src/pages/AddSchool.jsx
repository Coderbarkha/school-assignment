import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);

      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await axios.post("http://localhost:5000/schools", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("School added successfully!");
      reset();
      navigate("/show");
    } catch (error) {
      console.error(error);
      alert("Error adding school");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Add School</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="p-4 border rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label className="form-label">School Name*</label>
          <input
            className="form-control"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea className="form-control" {...register("address")} />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input className="form-control" {...register("city")} />
        </div>

        <div className="mb-3">
          <label className="form-label">State</label>
          <input className="form-control" {...register("state")} />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input
            className="form-control"
            {...register("contact", {
              pattern: {
                value: /^[0-9+\- ]{6,20}$/,
                message: "Invalid contact number",
              },
            })}
          />
          {errors.contact && <div className="text-danger">{errors.contact.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            {...register("email_id", {
              pattern: {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Invalid email address",
}
,
            })}
          />
          {errors.email_id && <div className="text-danger">{errors.email_id.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Image*</label>
          <input
            type="file"
            className="form-control"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && <div className="text-danger">{errors.image.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>

      <div className="text-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/show")}
        >
          Show Schools
        </button>
      </div>
    </div>
  );
}
