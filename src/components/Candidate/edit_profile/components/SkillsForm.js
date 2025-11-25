"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function SkillsForm({ initialData, onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills:
        initialData && Array.isArray(initialData) && initialData.length > 0
          ? initialData
          : [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  const handleFormSubmit = (getValues) => {
    const data = {
      skills: getValues.skills?.filter((s) => s.name?.trim() !== "")?.map((skill) => skill.name),
    };
    if(data.skills.length === 0) {
      toast.error("Please add at least one skill.");
      return
    }
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="profile-form">
      <div className="form-group">
        <label className="form-label">Skills</label>
        <div className="skills-field-container">
          {fields.map((field, index) => (
            <div key={field.id} className="skill-input-group">
              <input
                {...register(`skills.${index}.name`)}
                type="text"
                className="form-input"
                placeholder={`Skill ${index + 1}`}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn btn-icon btn-danger"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ name: "" })}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
}
